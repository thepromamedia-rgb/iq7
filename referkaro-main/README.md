# ReferKaro

Node.js website with a built-in HTTP server. Requires Node.js 18.18 or newer. No runtime npm dependencies are required.

## Hostinger + Supabase (Supabase-only build)

This ZIP intentionally **does not read or write Upstash Redis**. The app's persistent state is stored as one JSON document in `public.app_state`, row `id = referkaro_main` by default.

### Required Hostinger environment variables

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | Your Supabase project URL, e.g. `https://PROJECT.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase secret/service key; never put it in browser code or GitHub |
| `SUPABASE_TABLE` | `app_state` (optional; default `app_state`) |
| `SUPABASE_ROW_ID` | `referkaro_main` (optional; default `referkaro_main`) |
| `REQUIRE_PERSISTENT_STORAGE` | `true` |
| `APP_URL` | Your full public website URL including `https://` |
| `ADMIN_EMAIL` | Your admin email, lower-case recommended |
| `ADMIN_PASSWORD` | Unique strong admin password; required for production admin creation |
| `NODE_ENV` | `production` |

Optional variables:

- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`: required for Razorpay mode. Configure webhook URL as `https://YOUR-DOMAIN/api/razorpay/webhook` and test in Razorpay test mode first.
- `RESEND_API_KEY`, `MAIL_FROM`: needed for real password-reset email delivery.
- `ANTHROPIC_API_KEY`, `AI_MODEL`, `AI_DAILY_MSGS`: optional AI feature configuration.
- `ENABLE_MANAGED_DEMO_ACCOUNTS=true`: explicitly enables synthetic demo accounts. Leave unset for production.
- `ALLOW_EMPTY_SUPABASE_INIT=true`: **only** for the first start of a genuinely new empty project. Remove this variable immediately after that initial row is created. Never use it to fix a missing row in a database that already has production data.

### Required Supabase schema

Run in Supabase SQL Editor if the table does not already exist:

```sql
CREATE TABLE IF NOT EXISTS public.app_state (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.app_state ENABLE ROW LEVEL SECURITY;
```

### Deploy safely

1. Download/retain a backup of the current project and the app's admin backup JSON before deployment.
2. Confirm the existing state row is `public.app_state` with `id = referkaro_main` (or set `SUPABASE_ROW_ID` to the exact existing row ID). Do not guess this value.
3. Add the required Supabase variables in Hostinger. Keep the service key server-side only.
4. Upload this ZIP, install dependencies if Hostinger asks (there are no runtime dependencies), and restart the Node app.
5. Check startup logs. They should say `Storage: Supabase (app_state, row referkaro_main)`. If the row is missing or invalid, startup deliberately stops rather than silently creating an empty state.
6. Test login with an existing email and mobile number, registration, admin panel, referral/balance totals, payment history, QR settings, withdrawals, task progress, and a harmless setting change. Restart and verify the change remains.
7. Only after those checks pass, remove `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `UPSTASH_REDIS_KEY` from Hostinger. This ZIP ignores them already, so they are not needed at runtime.

### Important storage behavior

- This build reads/writes only the configured Supabase row when Supabase credentials are configured.
- If the row is missing, the app fails closed by default. It does not create a blank row that could make existing data appear lost.
- For local development only, if Supabase is not configured and `REQUIRE_PERSISTENT_STORAGE` is not `true`, state is saved to `data.json`. Do not use local-file storage for production.
- State is stored as a whole JSON document. Run one production app instance while using this storage design to reduce the risk of concurrent whole-document overwrites.
- This does not migrate files from a local `uploads/` folder. Verify upload persistence separately if the app uses uploads in production.

## Local development

```bash
npm start
```

Open `http://localhost:3000`. Local development can use `data.json` if Supabase is not configured. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` to seed an admin account.

## Checks

```bash
npm test
```

`GET /health` returns `ok` when the server is running.

## Production reminders

- Never commit service keys, passwords, Razorpay secrets, or API keys to GitHub.
- Test Razorpay with test credentials before live use. Live payment capture, webhook delivery, refunds, and payouts must be verified in the provider dashboard.
- Configure valid task links and correct Telegram/support links in admin settings before launch.
- Review applicable laws, payment-provider rules, terms, privacy policy, refund policy, and payout operations before accepting real customers.

## Optional AI-generated daily questions

The daily-task admin screen keeps the existing three link tasks unchanged: each link still has its own display title, users open it, and the task completes after 10 seconds. The admin can click **Generate 2 Questions from These Links** to fetch readable text from the three public pages and generate two multiple-choice questions with three options each. Review/edit both questions and select the correct answer before clicking **Save / Publish**. Existing daily task API and Supabase app-state persistence are used.

To enable generation, add these Hostinger environment variables and restart the Node app:
- `AI_API_KEY` — API key for an OpenAI-compatible chat-completions provider (keep it server-side; never put it in browser code or GitHub).
- `AI_API_URL` — optional; defaults to `https://api.openai.com/v1/chat/completions`.
- `AI_MODEL` — optional; defaults to `gpt-4o-mini`.

The feature only fetches public HTTP(S) HTML/plain-text pages and rejects obvious private/local IP URL patterns and redirects. Some sites block automated access or render content only in JavaScript; those links may not generate questions. Admin can still enter/edit questions manually. Do not treat generated answers as authoritative without reviewing them.

## 1.3.0 features (2026-10-21)
- Referral discount remains controlled by the admin ON/OFF setting; the referral-page offer message is hidden when disabled or when no positive discount is configured.
- Admin can create a one-time user bonus with an amount and reason. The user claims it from Home; the server credits the wallet exactly once. Pending bonuses can be cancelled by the admin.
- Admin can configure cumulative daily referral targets per user (for example 3, 5, 10). Only direct referrals registered during the current India-time day and whose task access is unlocked count. Each target reward can be claimed once per day; progress resets at the India-time day boundary while claim history remains.
- Admin can toggle the Pay via UPI button independently of QR/UTR mode. The UPI link pre-fills the current checkout amount; manual UTR payment requests still require admin verification.
- Added feature smoke tests for bonus claiming, daily target completion/claim idempotency, and UPI button setting propagation.

Before deploying, back up the production Supabase row and test with staging credentials. The UPI deep link opens a payment app but cannot itself confirm payment; QR/UTR payments remain manual admin verification unless a bank/provider verification integration is configured.
