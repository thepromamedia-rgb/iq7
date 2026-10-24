# ReferKaro 1.2.0 — audit and fix report

## Included changes

- Preserved the latest phone-login feature: new registrations require a valid Indian 10-digit mobile number; duplicate normalized mobile numbers are rejected; login accepts email or mobile number; admin user listing displays mobile numbers.
- Made the backend Supabase-only. The app no longer reads or writes Upstash, so Upstash environment variables are not required by this build.
- Kept the default Supabase target at `public.app_state`, row `id = referkaro_main`, matching the configured migration target described in the previous project notes.
- Added a fail-closed storage check: if the configured Supabase row is missing/invalid, startup stops instead of silently creating an empty state that could make existing data appear lost.
- Added an explicit `ALLOW_EMPTY_SUPABASE_INIT=true` opt-in for a genuinely new, empty Supabase project only. The README warns to remove it immediately after initial creation.
- Updated deployment instructions for Hostinger + Supabase-only storage and documented required variables, checks, and limits.
- Added automated checks for server syntax, inline browser JavaScript syntax, health/homepage responses, registration, duplicate-phone rejection, session state, and email/mobile login.

## Validation performed

- `node --check server.js`: passed.
- Inline JavaScript syntax: passed (2 inline script blocks).
- `npm test`: passed.
- Smoke tests passed: health endpoint, homepage HTTP 200, registration, duplicate mobile rejection, session state, phone login, and email login.

## Not verified from a local ZIP

- Live Supabase credentials, the exact production row contents, and the runtime behavior of the deployed Hostinger instance.
- Live Razorpay capture/webhook/refund/payout behavior and provider configuration.
- Password-reset email delivery without configured mail credentials.
- Persistent storage for uploaded media in Hostinger; uploads require separate persistent storage if used.
- Full load testing and all production business flows.

## Critical deployment note

This ZIP intentionally does not import from Upstash. Before deploying it, confirm the populated state row exists at `public.app_state` with `id = referkaro_main` (or set `SUPABASE_ROW_ID` to the exact populated row). If the row is missing, the app will stop safely rather than create a blank one. Back up the current site and data before replacing the deployed files.

## Referral discount update (2026-10-20)
- Added an admin-only `admin/referral-discount` endpoint with a 0–100% discount setting and enable/disable toggle.
- Discount is calculated server-side for accounts registered with a valid referrer and applies to the task unlock base price; service fee remains separate.
- Both Razorpay orders and QR/UTR payment records store the applied discount, percentage, and referrer ID for auditability. Razorpay amount verification continues to compare against the server-stored payment amount.
- Existing direct referral commission on verified payments is retained as the referrer's reward. No old user/payment records were intentionally altered.
- Validation run: `npm test` passed (server syntax, inline JS syntax, health/homepage/registration/duplicate phone/state/session/phone/email login smoke tests).
- Not verified against live hosting or a live Razorpay/Supabase account in this environment. Test in staging and back up production Supabase data before deploying.

## Version 1.3.0 — requested features and follow-up fixes (2026-10-21)

### Added
- Admin can issue a per-user bonus with an amount and required reason. It appears on that user's Home page as a claimable bonus; server-side claiming is one-time only. Pending bonuses can be cancelled, and the admin user card shows bonus history/status.
- Added per-user daily referral target configuration. Admin can add/remove targets and choose each target's registration threshold and reward amount. Targets are cumulative (3, then 5 total, then 10 total); each has a separate claim. Eligible count includes only direct referrals registered on the current India-time date whose task access is unlocked, and excludes blocked/admin/demo accounts. Daily progress/claim eligibility rolls over automatically by date while claim history stays stored.
- Connected the existing admin “Open UPI App” setting to the QR checkout as “Pay via UPI”. When enabled, the button launches a UPI URI with the configured UPI ID/payee and checkout amount prefilled. When disabled, the button is hidden and QR/manual UTR remains available.
- Added claimed bonus and daily referral rewards to wallet earnings/history. Demo-account wallet totals are updated if these rewards are claimed by a managed demo account.

### Fixes
- Referral-page discount promo is hidden when the discount is disabled or no positive discount applies; it no longer shows an “admin has not set” placeholder.
- Live refresh now notices pending bonuses, daily referral progress, and UPI/discount setting changes even when the main DB object itself has not changed.
- Prevents duplicate claims server-side and keeps payment approval restricted to pending records.

### Validation
- `npm test` passes: server syntax, inline browser JavaScript syntax, existing registration/login/state smoke tests, and new feature tests.
- Feature tests verify bonus reason/claim and duplicate-claim rejection, daily target count only after referral task unlock, target reward credit and duplicate protection, and admin UPI toggle propagation.
- Live hosting/Supabase production data, real QR payment, UPI app handoff across devices, and payment provider credentials cannot be verified from this local ZIP. QR/UTR mode remains admin-manual verification; a UPI deep link does not itself verify payment.


## Version 1.3.1 — Admin visibility correction (2026-10-21)
- Added a dedicated Admin Panel tab: “Referral & Bonuses”.
- This tab visibly lists each real user with direct actions to give a reasoned bonus, add cumulative daily targets, set a per-user referral discount, and review/cancel pending bonus or remove targets.
- Added shortcuts to the existing global discount and Pay via UPI settings.
- Re-ran the full automated test suite after the UI change.
