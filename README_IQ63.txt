IQ63 WEBSITE — GITHUB / RENDER

What is included:
- Home shows ONLY the Game Lobby. No promotional sections or extra content below it.
- Separate Promotion, Invite, Wallet, Account and Games pages.
- Registration/login with name, mobile number, unique UID, invite code and referral link.
- Password show/hide eye controls; after login, Login/Register buttons are replaced by Logout.
- Five separate playable demo games: Coin Flip (Heads/Tails), Dice Roll, Lucky Number, Rock Paper Scissors and Aviator with animated plane/multiplier.
- Server-side game outcomes and account-credit ledger.
- Compact Admin Panel with Overview, Users, Deposits, Balance Control and Activity tabs.
- Admin controls: user search, approve/reject demo credit requests, approve/reject demo redemption requests, min/max redemption and wagering settings, add/remove virtual credits, delete user.
- No seeded demo accounts and no automatic starter credit balance.

Deploy:
1. Extract the ZIP and upload the extracted files to GitHub.
2. Render Build Command: npm install
3. Render Start Command: npm start
4. Health Check Path: /healthz
5. Render Environment variables:
   ADMIN_PASSWORD = your strong private admin password
   SESSION_SECRET = long random secret
   DATA_DIR = /var/data only if a persistent disk is attached and mounted at /var/data
6. Open https://YOUR-RENDER-SERVICE.onrender.com/admin.
   Admin mobile number is 1234567890. Enter the ADMIN_PASSWORD configured in Render.
   No Admin link is displayed to normal users.
7. For persistent users and balances, attach persistent storage or connect a managed database. Render's ephemeral filesystem may lose JSON data on restart/redeploy.

Important payment limits:
- Wallet requests are demo virtual-credit requests only. No UPI details, payment reference, payment processing or cash payouts are used.
- Admin approval adds virtual credits. Redemption approval removes virtual credits only; it never pays cash. Credits have no cash value.
- Games use account credits only; no real-money betting or cash payouts are enabled.

Security:
- Never share ADMIN_PASSWORD or SESSION_SECRET.
- This build has Node syntax checks and local API smoke tests. Browser/device coverage is limited; no build can be guaranteed bug-free. Review security and persistence before public use.
