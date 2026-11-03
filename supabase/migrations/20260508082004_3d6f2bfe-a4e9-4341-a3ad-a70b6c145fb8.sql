-- Ensure user_id can never be null
ALTER TABLE public.saved_configurations ALTER COLUMN user_id SET NOT NULL;

-- Drop existing permissive (public role) policies
DROP POLICY IF EXISTS "Users can view their own saved configuration" ON public.saved_configurations;
DROP POLICY IF EXISTS "Users can create their own saved configuration" ON public.saved_configurations;
DROP POLICY IF EXISTS "Users can update their own saved configuration" ON public.saved_configurations;
DROP POLICY IF EXISTS "Users can delete their own saved configuration" ON public.saved_configurations;

-- Recreate scoped strictly to authenticated role
CREATE POLICY "Authenticated users can view their own saved configuration"
ON public.saved_configurations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create their own saved configuration"
ON public.saved_configurations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own saved configuration"
ON public.saved_configurations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own saved configuration"
ON public.saved_configurations
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Explicitly deny anonymous access
REVOKE ALL ON public.saved_configurations FROM anon;
