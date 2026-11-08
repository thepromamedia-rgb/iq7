# CafePilot — white-screen deployment fix

The frontend is a Vite app inside `client/`. The root of this ZIP is a workspace, not a ready-made static folder. Deploying the ZIP contents as a static site, or publishing the repository root, produces a blank/incorrect page.

## Render Static Site (frontend)
- Create a **Static Site** (not a Docker service).
- Root Directory: leave blank.
- Build Command: `npm install --no-audit --no-fund && npm run build -w client`
- Publish Directory: `client/dist`
- Add rewrite: source `/*`, destination `/index.html`, action `Rewrite`.
- Set `VITE_API_URL` to the deployed backend URL ending in `/api` before building. If API is served on the same domain, use `/api`.

A matching `render.yaml` is included.

## Vercel
Import the ZIP's extracted project root. The included `vercel.json` explicitly builds the client workspace and publishes `client/dist`; set `VITE_API_URL` in Project Settings → Environment Variables and redeploy.

## Backend requirement
The API is a separate Express service in `server/`. Deploy it as a Node web service with build command `npm install && npm run build -w server`, start command `npm run start -w server`, and PostgreSQL plus `DATABASE_URL`, `JWT_SECRET`, and `CLIENT_ORIGIN`. Run Prisma generation/migrations as described in README. A static frontend alone cannot provide login/database APIs.

## What changed in this patch
- Explicit Vercel build/output settings for the nested Vite app.
- Render Static Site blueprint with SPA route fallback.
- Frontend build runs TypeScript checking then Vite build.
- Existing app source, API, schema, and UI are retained.

## Verification status
ZIP structure and configuration were checked. `npm install` timed out in this environment, so a production build/browser test could not be completed here. If the page is still blank after deploying with the exact settings above, share the live URL and the first red error from browser DevTools → Console.
