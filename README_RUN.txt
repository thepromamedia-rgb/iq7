IQ63 — Coin Flip demo app

Included:
- Server-side registration and login using Node crypto scrypt password hashing.
- HttpOnly signed session cookie; login works across browsers while the server database persists.
- Server-side account balance and transaction history.
- One working Coin Flip game (Heads/Tails) using demo credits only.
- 1,000 virtual demo credits for a new account; winning returns 2x the bet.
- Input validation, basic request throttling, security headers and /healthz endpoint.
- Responsive IQ63 frontend and account/wallet history.

Run locally:
1. Install Node.js 18 or newer.
2. Open a terminal in this folder.
3. Run: npm install
4. Run: npm start
5. Open http://localhost:4173

Render:
- Build Command: npm install
- Start Command: npm start
- Health Check Path: /healthz
- Set SESSION_SECRET to a long random secret (Blueprint requests a generated value).

IMPORTANT STORAGE LIMITATION:
The account database is stored as data/iq63-data.json by default. Render's free filesystem is ephemeral; it can be reset during redeploy/restart. For durable accounts, attach a persistent disk on a paid Render instance and set DATA_DIR=/var/data, or connect a managed database before accepting real users.

WALLET / GAME SAFETY:
Credits are virtual demo points only. There is no real-money deposit, payment gateway, betting with cash, or withdrawal. Never advertise these demo credits as money. The coin flip uses server-side randomness and the server calculates the outcome/balance.

This is a tested starter app, not a guarantee of zero bugs or a production financial system. Before real users, use persistent managed storage, add monitoring/backups, review security, and obtain any required legal approvals for the intended product.
