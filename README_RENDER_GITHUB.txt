# SREGRR55 recovered frontend — Render/GitHub package

## What was fixed
- Replaced the captured, incomplete app entry page that was showing blank due to missing JavaScript chunks.
- Added a responsive frontend with visible home/lobby, login and register forms, promotional section, and mobile bottom navigation.
- Added a small dependency-free Node HTTP server and Render health endpoint.

## Deploy on Render
1. Extract this ZIP.
2. Upload all extracted files and folders to the root of a GitHub repository (not the ZIP itself).
3. Create a Render **Web Service** connected to that repository.
4. Runtime: Node. Build command: `npm install`. Start command: `npm start`. Health check: `/healthz`.

## Important limitations
This is a recovered **frontend preview**, not the original full project. The original site capture had missing JavaScript chunks and did not include backend source. The login/register forms only validate input in the browser; they do not create secure accounts. There is no real authentication, database, wallet, payments, referral ledger, admin panel, or server-side game functionality. Do not collect real user passwords or money until a proper backend, database, security controls and legal/compliance requirements are implemented.
