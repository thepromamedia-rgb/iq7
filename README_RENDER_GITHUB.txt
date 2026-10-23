IQ63 WEBSITE — GITHUB / RENDER

- Home page contains only Game Lobby. Games open on their own page.
- Separate Promotion, Invite, Wallet and Account views.
- Name/mobile registration, hashed passwords, unique UID and referral link.
- Login/Register disappear after login; Logout appears.
- Four server-backed credit games: Coin Flip, Dice Roll, Lucky Number, Rock Paper Scissors.
- Admin panel at /admin with Overview, Users, Deposits, Balance Control and Activity sections.
- No seeded demo accounts and no automatic starter balance.

Render:
- Build Command: npm install
- Start Command: npm start
- Health Check Path: /healthz
- Set ADMIN_PASSWORD to your own strong password and SESSION_SECRET to a long random secret.
- Admin mobile is 1234567890. Open https://YOUR-RENDER-SERVICE.onrender.com/admin and enter the Render ADMIN_PASSWORD.
- No Admin option is displayed in the normal user interface.
- To keep data after restarts/redeploys, attach a persistent disk mounted at /var/data and set DATA_DIR=/var/data, or use a managed database.

Payments:
Deposit requests are not a payment gateway and are not automatically verified. Check payment independently before approving. Approved requests add account credits, not cash. No cash withdrawals or real-money betting/payouts are enabled. Game credits have no cash value.

Basic syntax and API smoke tests have been run; zero bugs cannot be guaranteed.
