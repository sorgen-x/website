# Refactor roadmap

- [x] Stage 1: Product configuration extraction (previous stage).
- [x] Stage 2: FamilyLink reduced from 944 to 165 lines; extracted demo, simulator, chart views, data, and animation variants. Browser checks passed for sending/reset, both sliders, all tabs, repeated switches, and matching DOM/classes/copy; scoped lint and automatic build checks passed.
- [ ] Stage 3–7: Await user confirmation after Stage 2 before proceeding.

## Booking notification

- [x] Update business email and trigger a non-blocking notification after a successful booking insert; verified in preview and database, including the missing-secret failure path.
- [x] Implement, deploy, and test notify-booking validation and Beijing timestamps.
- [ ] Verify email delivery: blocked until RESEND_API_KEY is added and the sender is eligible to email business@sorgenx.com (verified domain, or Resend account-owner test recipient).
