-- Create contact_inquiries table for storing contact form submissions
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "Anyone can submit contact inquiry"
ON public.contact_inquiries
FOR INSERT
WITH CHECK (true);

-- Only allow reading own submissions or admin access (for future admin panel)
CREATE POLICY "Users cannot read inquiries"
ON public.contact_inquiries
FOR SELECT
USING (false);
