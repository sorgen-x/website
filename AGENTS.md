# Architecture rules

- This is a public marketing site for Aether / SORGEN. Do not reintroduce `/auth`, `/user`, shopping, health-profile, or other leftover app surfaces.
- Contact submits bookings only through the `submit-booking` edge function (validate, rate-limit by phone, insert with the service role, then email). If email fails, the row is still saved and the UI must not show an unqualified success. Do not insert into `contact_inquiries` from the browser. Keep `notify-booking` as an email-only compatibility function; do not add inserts there.
- Legal dates are fixed strings, never `new Date().getFullYear()`. Public contact is `business@sorgenx.com` only.
- Deploy (GitHub Pages): `npm run build` runs `scripts/spa-fallback.mjs`, which writes `dist/404.html`, `dist/<route>.html` and `dist/<route>/index.html` for every static route in `src/App.tsx`, rewrites per-route titles and canonicals, and fails the build if any expected shell is missing or if `/auth` or `/user` would be emitted. Deploy with `scripts/deploy-gh-pages.sh` (builds, then fast-forward pushes `dist/` to gh-pages).
- Booking rollout order: (1) deploy the `submit-booking` function, (2) deploy the frontend, (3) apply the migration that revokes anon/authenticated INSERT on `contact_inquiries`.
- Edge function tests: `deno test supabase/functions/notify-booking/handler.test.ts supabase/functions/submit-booking/handler.test.ts`.
