# ReferKaro — Supabase storage setup

This build supports **Supabase as the primary store**, with Upstash Redis as a fallback if Supabase is not configured. It stores the app's existing state document in a PostgreSQL `jsonb` row, avoiding a risky rewrite of the app's data model.

## 1. Create the table

1. Open the Supabase project dashboard.
2. Go to **SQL Editor** → **New query**.
3. Paste and run the contents of `SUPABASE_SETUP.sql`.

## 2. Configure Hostinger environment variables

Set these in the Node.js app's environment variables (do not put secrets in GitHub):

- `SUPABASE_URL` = Project URL from Supabase → Project Settings → API.
- `SUPABASE_SERVICE_ROLE_KEY` = service-role/secret server key from Supabase → Project Settings → API. Keep this private; never put it in browser code or commit it.
- `SUPABASE_TABLE` = `app_state` (optional; this is the default).
- `SUPABASE_ROW_ID` = `referkaro_data` (optional; this is the default).
- `REQUIRE_PERSISTENT_STORAGE` = `true`.

Do not rely on an anonymous/publishable key for this backend adapter. If Hostinger created environment variables with different names, add the two names above explicitly and copy the corresponding values in Hostinger only.

## 3. Migrate existing Upstash data

For the first deployment, keep `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `UPSTASH_REDIS_KEY` configured. If the Supabase row `id=referkaro_data` does not exist, this app loads the existing Upstash value and writes it to Supabase automatically. If the row already exists, Supabase is treated as the source of truth and is not overwritten by Upstash.

After first deployment, inspect the Hostinger runtime logs for `Storage: Supabase (migrated existing Upstash data; keep Upstash backup)` or `Storage: Supabase`. If logs show a table/permission/connection error, stop and fix it before testing the site.

## 4. Verify before removing Upstash

- Log in to admin and at least one existing user account.
- Verify referral counts/balances, payment records, withdrawal records, settings, QR configuration, and task progress.
- Make a small harmless setting change, restart/redeploy, and confirm it persists.
- Download a backup from the app's admin backup feature if available.
- Keep Upstash credentials and its data intact until all checks pass. Do not clear the Supabase row or delete the Upstash database during migration.

## Notes

- The adapter stores the whole app state in one JSONB row, matching the current app's single-document storage design. It is a practical migration bridge, not a normalized relational schema.
- Configure only one active production instance while using whole-document writes; multiple app instances can overwrite one another's changes.
- This migration does not move files stored in the app's local `uploads/` directory. Uploads need separate persistent storage if the app uses them in production.
