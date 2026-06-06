create policy "fan-uploads admin delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'fan-uploads'
  and public.has_role(auth.uid(), 'admin')
);
