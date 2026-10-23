CRYPTO BRIDGE — CREDITS-ONLY BUILD

IMPORTANT
This is a virtual-credit demo. Credits have no cash value and cannot be purchased, withdrawn, transferred for cash, or redeemed. Real-money deposit, payout, and payment endpoints are disabled by default. Do not set CREDITS_ONLY=false on a public deployment.

WINDOWS QUICK START
1. Extract the complete ZIP (do not run files from inside the ZIP preview).
2. Install Node.js 18 or newer from https://nodejs.org/ if it is not already installed.
3. Double-click start.bat.
4. Open http://localhost:3000 in your browser. Leave the terminal window open while using the site.
5. Admin panel: http://localhost:3000/admin

MAC / LINUX QUICK START
1. Extract the ZIP.
2. Open a terminal in the extracted folder.
3. Run: ./start.sh
4. Open http://localhost:3000. Keep the terminal open.

DO NOT double-click index.html or open it using file://. The app requires its Node.js API server. If you do, it will show setup instructions instead of a blank screen.

ADMIN ACCOUNT
For local testing, the server creates admin@cryptobridge.local with a randomly generated password when ADMIN_PASSWORD is not set. The password is printed once in the terminal at startup. For a chosen local admin, set environment variables before starting:
  Windows CMD: set ADMIN_EMAIL=admin@example.com && set ADMIN_PASSWORD=choose-a-strong-password && node server.js
  PowerShell: $env:ADMIN_EMAIL='admin@example.com'; $env:ADMIN_PASSWORD='choose-a-strong-password'; node server.js
  Mac/Linux: ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD='choose-a-strong-password' node server.js

TESTS
Node.js 18+ required. Run npm test from this folder to run server and credits-only regression tests.

FEATURES
- Crypto Bridge login/registration and admin panel.
- Admin > Users > Add Credit: only authenticated admins can grant positive whole-number credits, with a required audit reason.
- Game Zone: Coin Flip, Dice Roll, Lucky Number, Rock Paper Scissors, and Aviator-style multiplier. Game outcomes and balance settlement run on the server; game records and audit events are saved.
- Simulated market buy/sell and bonus features use virtual credits only.
- Admin can enable or disable Game Zone.

STORAGE
By default local data is stored in crypto/data/db.json. Keep the folder and back it up. Some cloud hosts use ephemeral storage; configure a persistent disk or the documented Redis settings before deployment.

SECURITY
Use a unique strong admin password. Do not expose the local server to the public internet. Do not add payment credentials to this credits-only build.

RENDER DEPLOYMENT (CREDITS-ONLY)
1. Upload the extracted project contents to a GitHub repository (render.yaml must be at repository root).
2. In Render, choose New > Blueprint and connect the repository, or create a Web Service with Build Command `npm install` and Start Command `npm start`.
3. Set ADMIN_EMAIL and ADMIN_PASSWORD in Render Environment. Use a unique, strong password; do not commit secrets to GitHub.
4. For persistent data on Render, create an Upstash Redis REST database and set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Render Environment. Without Redis or a persistent disk, local JSON data may be lost when the instance restarts/redeploys.
5. Keep CREDITS_ONLY=true. This deployment is virtual credits only; do not configure live payment or cash-out endpoints.
6. Health endpoint: /healthz. Render assigns PORT automatically; the server listens on it.
