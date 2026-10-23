IQ63 WEBSITE — GITHUB / RENDER

What is included:
- Home shows ONLY the Game Lobby. No promotional sections or extra content below it.
- Separate Promotion, Invite, Wallet, Account and Games pages.
- Registration/login with name, mobile number, unique UID, invite code and referral link.
- Password show/hide eye controls; after login, Login/Register buttons are replaced by Logout.
- Four separate playable games: Coin Flip (Heads/Tails), Dice Roll, Lucky Number and Rock Paper Scissors.
- Server-side game outcomes and account-credit ledger.
- Compact Admin Panel with Overview, Users, Deposits, Balance Control and Activity tabs.
- Admin controls: user search, deposit request review, add/remove account credits, delete user.
- No seeded demo accounts and no automatic starter credit balance.

Deploy:
1. Extract the ZIP and upload the extracted files to GitHub.
2. Render Build Command: npm install
3. Render Start Command: npm start
4. Health Check Path: /healthz
5. Render Environment variables:
   ADMIN_PASSWORD = your strong private admin password
   SESSION_SECRET = long random secret
   PAYMENT_UPI_ID = optional payment details shown to users
   PAYMENT_NAME = optional payee name
   DATA_DIR = /var/data only if a persistent disk is attached and mounted at /var/data
6. Open https://YOUR-RENDER-SERVICE.onrender.com/admin.
   Admin mobile number is 1234567890. Enter the ADMIN_PASSWORD configured in Render.
   No Admin link is displayed to normal users.
7. For persistent users and balances, attach persistent storage or connect a managed database. Render's ephemeral filesystem may lose JSON data on restart/redeploy.

Important payment limits:
- Deposit form submits a request and payment reference; it does not process payments or automatically verify a UPI transfer.
- Only approve after independently checking the payment in your payment account.
- Approved requests add account credits. These credits are not a cash balance, and cash withdrawal/payment gateway integration is not included.
- Games use account credits only; no real-money betting or cash payouts are enabled.

Security:
- Never share ADMIN_PASSWORD or SESSION_SECRET.
- This build has basic syntax and API smoke tests, but no build can be guaranteed bug-free. Review security and persistence before public production use.
