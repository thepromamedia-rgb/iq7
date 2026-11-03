-- Read-only check: verify which app_state rows exist before deploying the Supabase-only ZIP.
SELECT id, updated_at, jsonb_typeof(data) AS data_type,
       jsonb_array_length(COALESCE(data->'users', '[]'::jsonb)) AS users_count,
       jsonb_array_length(COALESCE(data->'pays', '[]'::jsonb)) AS payments_count,
       jsonb_array_length(COALESCE(data->'wd', '[]'::jsonb)) AS withdrawals_count
FROM public.app_state
ORDER BY updated_at DESC;
