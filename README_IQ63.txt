IQ63 WEBSITE — GITHUB / RENDER

Included:
- Separate Home, Promotion, Invite, Wallet, Account pages
- Server-side registration/login with scrypt password hashing
- Name, unique UID, invite code and referral link
- Password show/hide controls
- Coin Flip heads/tails game using server-side random result and balance ledger
- Wallet history and deposit request queue
- Admin panel: user list, pending deposit review, add/subtract demo credits

IMPORTANT SETUP
1. Upload the EXTRACTED files to your GitHub repository (not the ZIP itself).
2. Render Build Command: npm install
3. Render Start Command: npm start
4. Health Check Path: /healthz
5. In Render -> Environment, set:
   ADMIN_PASSWORD = a strong private password of your own
   SESSION_SECRET = a long random secret string
   DATA_DIR = /var/data (only if you attach a persistent disk mounted at /var/data)
6. For permanent users and balances, add a Render persistent disk mounted at /var/data and set DATA_DIR=/var/data. Without persistent storage, local JSON data may be lost during redeploy/restart.
7. Open the website, scroll to footer, select Admin, and log in with ADMIN_PASSWORD.

WALLET/PAYMENT LIMITATIONS
- Deposit form creates a pending request after user enters amount and a payment UTR/reference. It does not process payment, create a UPI intent, or charge money. Admin must independently verify actual payment before approving.
- Only approve a request after checking the payment in your own payment account. Approval adds virtual credits equal to the requested rupee amount; these are demo credits, not a cash balance.
- No payment gateway, automatic deposit verification, or cash withdrawal is integrated. Do not represent this demo as real-money gambling or a live payment service.
- Admin balance controls are for virtual demo credits.

Security notes: Use a strong ADMIN_PASSWORD and SESSION_SECRET, do not share them, and use persistent storage for production. This has been syntax/API smoke-tested, but no software can be guaranteed bug-free.


LATEST UI UPDATE: Home contains only the Game Lobby. Open a game card to enter its separate game page. Included games: Coin Flip, Dice Roll, Lucky Number, and Rock Paper Scissors (virtual demo credits only). Promotion, Invite, Wallet, Account and Admin are separate views. Admin login URL: /admin.
