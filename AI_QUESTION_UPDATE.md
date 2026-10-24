ReferKaro AI Question Generator update

- Existing Link 1 / Link 2 / Link 3 behaviour is unchanged: display text + task URL; user opens the URL; 10-second completion stays as before.
- Admin daily screen now has “Generate 2 Questions from These Links”. It reads the three public pages and requests exactly two MCQs with three options each.
- Generated questions populate the existing editable fields. Admin can edit question/option text and choose the correct answer, then uses existing Save / Publish.
- Uses existing `admin/daily` persistence, date selection, and Supabase app state. No database schema migration required.
- Requires Hostinger environment variables: `AI_API_KEY` (required), `AI_API_URL` (optional OpenAI-compatible endpoint), `AI_MODEL` (optional, default `gpt-4o-mini`). Restart app after setting vars.
- Website fetch limitations: private/local URL patterns and redirects are rejected; some sites block scraping or render content client-side. Review AI-generated answers before publishing.
- Validation run: `npm test` passed (server syntax, inline browser JS syntax, smoke tests for health/home/register/duplicate phone/session/phone/email login).
- Not verified against live Hostinger, Supabase, or a real AI provider/API key.
