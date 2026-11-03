-- Remove anon visibility for all user-owned tables (REST + GraphQL)
REVOKE SELECT ON public.saved_configurations FROM anon;
REVOKE SELECT ON public.appointments FROM anon;
REVOKE SELECT ON public.health_profiles FROM anon;
REVOKE SELECT ON public.intervention_recommendations FROM anon;
REVOKE SELECT ON public.orders FROM anon;
REVOKE SELECT ON public.profiles FROM anon;
REVOKE SELECT ON public.contact_inquiries FROM anon;
-- Anon retains INSERT on contact_inquiries (unchanged)
