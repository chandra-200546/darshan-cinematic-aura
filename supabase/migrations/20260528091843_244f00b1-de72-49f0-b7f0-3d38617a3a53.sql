-- Enums
create type public.app_role as enum ('admin','fan');
create type public.post_type as enum ('photo','video','message','edit','birthday');
create type public.post_status as enum ('pending','approved','rejected');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  district text not null,
  avatar_url text,
  fan_club_name text,
  created_at timestamptz not null default now()
);
grant select on public.profiles to anon, authenticated;
grant insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles read all" on public.profiles for select using (true);
create policy "profiles insert own" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles update own" on public.profiles for update to authenticated using (auth.uid() = id);

-- User roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  unique(user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "roles read own" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "admins read all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(),'admin'));

-- Auto-create profile + assign role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, district, avatar_url, fan_club_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'district',''),
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'fan_club_name'
  );
  if lower(new.email) = 'chandrashekharkumbarias8055@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin') on conflict do nothing;
  else
    insert into public.user_roles (user_id, role) values (new.id, 'fan') on conflict do nothing;
  end if;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Fan posts
create table public.fan_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  type post_type not null,
  caption text,
  district text,
  tags text[] default '{}',
  media_url text,
  status post_status not null default 'pending',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);
create index on public.fan_posts (status, created_at desc);
create index on public.fan_posts (user_id);
create index on public.fan_posts (district);
grant select on public.fan_posts to anon, authenticated;
grant insert, update, delete on public.fan_posts to authenticated;
grant all on public.fan_posts to service_role;
alter table public.fan_posts enable row level security;
create policy "posts read approved" on public.fan_posts for select using (status = 'approved');
create policy "posts read own" on public.fan_posts for select to authenticated using (user_id = auth.uid());
create policy "posts read admin" on public.fan_posts for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "posts insert own" on public.fan_posts for insert to authenticated with check (user_id = auth.uid());
create policy "posts update own" on public.fan_posts for update to authenticated using (user_id = auth.uid());
create policy "posts update admin" on public.fan_posts for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "posts delete own" on public.fan_posts for delete to authenticated using (user_id = auth.uid());
create policy "posts delete admin" on public.fan_posts for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- Likes
create table public.post_likes (
  user_id uuid not null references auth.users(id) on delete cascade,
  post_id uuid not null references public.fan_posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);
grant select on public.post_likes to anon, authenticated;
grant insert, delete on public.post_likes to authenticated;
grant all on public.post_likes to service_role;
alter table public.post_likes enable row level security;
create policy "likes read all" on public.post_likes for select using (true);
create policy "likes insert own" on public.post_likes for insert to authenticated with check (user_id = auth.uid());
create policy "likes delete own" on public.post_likes for delete to authenticated using (user_id = auth.uid());

-- Reactions (Jai DBoss)
create table public.post_reactions (
  user_id uuid not null references auth.users(id) on delete cascade,
  post_id uuid not null references public.fan_posts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);
grant select on public.post_reactions to anon, authenticated;
grant insert, delete on public.post_reactions to authenticated;
grant all on public.post_reactions to service_role;
alter table public.post_reactions enable row level security;
create policy "reactions read all" on public.post_reactions for select using (true);
create policy "reactions insert own" on public.post_reactions for insert to authenticated with check (user_id = auth.uid());
create policy "reactions delete own" on public.post_reactions for delete to authenticated using (user_id = auth.uid());

-- Comments
create table public.post_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  post_id uuid not null references public.fan_posts(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
create index on public.post_comments (post_id, created_at desc);
grant select on public.post_comments to anon, authenticated;
grant insert, delete on public.post_comments to authenticated;
grant all on public.post_comments to service_role;
alter table public.post_comments enable row level security;
create policy "comments read all" on public.post_comments for select using (true);
create policy "comments insert own" on public.post_comments for insert to authenticated with check (user_id = auth.uid());
create policy "comments delete own" on public.post_comments for delete to authenticated using (user_id = auth.uid());
create policy "comments delete admin" on public.post_comments for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- Storage buckets
insert into storage.buckets (id, name, public) values ('avatars','avatars',true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('fan-uploads','fan-uploads',true) on conflict (id) do nothing;

-- Storage policies: public read; authenticated upload/modify in own folder (folder = user id)
create policy "avatars public read" on storage.objects for select using (bucket_id = 'avatars');
create policy "avatars user write" on storage.objects for insert to authenticated with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars user update" on storage.objects for update to authenticated using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars user delete" on storage.objects for delete to authenticated using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "fan-uploads public read" on storage.objects for select using (bucket_id = 'fan-uploads');
create policy "fan-uploads user write" on storage.objects for insert to authenticated with check (bucket_id = 'fan-uploads' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "fan-uploads user update" on storage.objects for update to authenticated using (bucket_id = 'fan-uploads' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "fan-uploads user delete" on storage.objects for delete to authenticated using (bucket_id = 'fan-uploads' and (storage.foldername(name))[1] = auth.uid()::text);