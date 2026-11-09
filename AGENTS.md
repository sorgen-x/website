# Architecture rules

- FamilyLink owns shared demo state, prediction effects, scroll visibility, and outer layout; family-link modules contain unchanged leaf UI, chart datasets, and motion variants so extraction preserves behavior and appearance.
- Keep causal chart TabsContent under Tabs without an AnimatePresence wrapper; Radix controls panel mounting and competing exit lifecycles previously caused DOM insertion errors.
- Contact saves bookings before invoking notify-booking without awaiting delivery; the function owns strict validation and server-only Resend access so email failures cannot invalidate saved leads.

- Deploy (GitHub Pages): `npm run build` runs `scripts/spa-fallback.mjs`, which writes `dist/404.html`, `dist/<route>.html` and `dist/<route>/index.html` for every static route in `src/App.tsx`, and fails the build if any is missing. Deploy with `scripts/deploy-gh-pages.sh` (builds, then fast-forward pushes `dist/` to gh-pages).
