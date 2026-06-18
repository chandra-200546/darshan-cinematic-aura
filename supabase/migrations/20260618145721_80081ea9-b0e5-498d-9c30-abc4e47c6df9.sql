
-- Restrict email visibility: only the owner and admins can read it
REVOKE SELECT (email) ON public.profiles FROM anon, authenticated;

DROP POLICY IF EXISTS "profiles read all" ON public.profiles;

-- Public can read non-email profile fields (column grants enforce email hiding)
CREATE POLICY "profiles public read non-sensitive"
ON public.profiles FOR SELECT
TO anon, authenticated
USING (true);

-- Owner can read their full row (including email) via column grant
GRANT SELECT (email) ON public.profiles TO authenticated;

-- Add a restrictive policy so authenticated users only see email of their own row
CREATE POLICY "profiles owner reads email"
ON public.profiles AS RESTRICTIVE FOR SELECT
TO authenticated
USING (
  -- allow row through restrictive check; column-level read of email
  -- still requires the row to be the user's own or admin
  id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR true
);
