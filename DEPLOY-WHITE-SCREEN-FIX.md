# CafePilot — white screen fix & deployment

I patched the frontend so production browsers no longer try to call `http://localhost:4000` when `VITE_API_URL` is missing. It now uses same-origin `/api` by default, Vite proxies `/api` during local development, and a React error boundary shows a useful error instead of silently leaving a blank screen. SPA fallback files are included for Netlify (`client/public/_redirects`) and Vercel (`vercel.json`).

## Important: deploy the correct folder

This repository is source code. Do **not** upload the ZIP itself or the `client` source folder as a static website. Build the frontend and publish the generated `client/dist` folder.

1. Use Node.js 20+ and run `npm install` from the extracted project root.
2. Set `VITE_API_URL` to your deployed backend API base URL, including `/api` (example shape: `https://YOUR-API-DOMAIN.example/api`). If frontend and API share one domain, `/api` is correct.
3. Run `npm run build -w client`.
4. Set your static host's publish/output directory to `client/dist` (the Vite app is in the `client` workspace).
5. Deploy the backend separately and configure its database, `JWT_SECRET`, and allowed frontend origin as described in `README.md`.

## If you use Vercel

Import the project root. Set the build command to `npm install && npm run build -w client` and output directory to `client/dist`. Add `VITE_API_URL` in Project Settings → Environment Variables, then redeploy. The included `vercel.json` handles client-side routes. The API server still needs a separate Node hosting service; this static build does not host the Express API.

## If you use Netlify

Set base directory to `client`, build command to `npm install --prefix .. && npm run build --prefix .. -w client`, and publish directory to `dist` (relative to base). Set `VITE_API_URL` in site environment variables. The included `_redirects` file handles client-side routes. Host the API separately.

## Verification limits

The source ZIP structure can be checked, but a successful production build was **not** verified here because dependency installation timed out in this environment. After deploying, open DevTools → Console and Network if an error remains; share the live URL and first red console error for a targeted fix.
