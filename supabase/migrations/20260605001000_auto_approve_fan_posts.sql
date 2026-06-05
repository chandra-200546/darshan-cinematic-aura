alter table public.fan_posts
alter column status set default 'approved'::public.post_status;

update public.fan_posts
set status = 'approved'::public.post_status
where status = 'pending'::public.post_status;
