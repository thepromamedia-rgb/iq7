IQ63 WEBSITE — LOCAL RUN

1. Install Node.js 18 or newer.
2. Run `npm install`
3. Run `npm start`
4. Open http://localhost:4173

Render:
- Build: npm install
- Start: npm start
- Health: /healthz
- Set ADMIN_PASSWORD and SESSION_SECRET in Render Environment.
- Admin mobile: 1234567890
- Admin URL: /admin

Home contains only Game Lobby. Coin Flip, Dice Roll, Lucky Number and Rock Paper Scissors open as separate game pages. Registration creates an account with zero starting credits; no demo accounts are preloaded.

The app stores data in a JSON file by default. Render's ephemeral filesystem can lose it on restart/redeploy. Attach persistent storage or use a managed database for durable user accounts.

Wallet requests are manual and do not charge or verify payments automatically. Approved requests add account credits, not cash. There is no cash withdrawal or real-money game payout integration. Credits have no cash value.

This app has passed basic syntax and API smoke tests, not a complete external security audit. Zero bugs cannot be guaranteed.
