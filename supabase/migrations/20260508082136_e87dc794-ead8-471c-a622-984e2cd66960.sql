-- App uses PostgREST, not GraphQL. Disable GraphQL exposure entirely.
REVOKE USAGE ON SCHEMA graphql_public FROM anon, authenticated;
REVOKE USAGE ON SCHEMA graphql FROM anon, authenticated;
