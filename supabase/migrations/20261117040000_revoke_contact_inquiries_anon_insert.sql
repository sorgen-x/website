-- Public booking form must go through the submit-booking edge function
-- (service role insert + rate limit + email). Do not apply this migration
-- until that function is deployed and the frontend no longer inserts
-- into contact_inquiries directly.
-- Deploy order: (1) submit-booking function, (2) frontend, (3) this migration.

DROP POLICY IF EXISTS "Anyone can submit contact inquiry" ON public.contact_inquiries;

REVOKE INSERT ON public.contact_inquiries FROM anon;
REVOKE INSERT ON public.contact_inquiries FROM authenticated;
REVOKE INSERT ON public.contact_inquiries FROM PUBLIC;

CREATE INDEX IF NOT EXISTS contact_inquiries_phone_created_at_idx
  ON public.contact_inquiries (phone, created_at DESC);
