IQ63 BUGFIX UPDATE

Fixes in this build:
- Fixed CSS that hid the entire app when opening /admin; the admin login and dashboard are now visible.
- Added an explicit /admin route that serves the app shell with no-cache headers.
- Home remains a clean Game Lobby; selecting any game opens its own page with bet controls.
- Coin Flip, Dice Roll, Lucky Number and Rock Paper Scissors use server-generated outcomes and server-side credit checks.
- Fixed registration success text to accurately state that the new account starts with 0 credits.
- Improved insufficient-credit message.

Admin login:
- URL: /admin
- Mobile: 1234567890
- Password: the ADMIN_PASSWORD value set in Render Environment.

Render settings:
- Build: npm install
- Start: npm start
- Health check: /healthz
- Ensure ADMIN_PASSWORD is set in Render Environment.

New accounts have 0 credits. To play, first have the admin add virtual credits in Admin Panel, or submit a deposit request and only have the admin approve it after independently verifying payment. No real-money payouts or cash withdrawals are enabled. Game credits have no cash value.

Basic server/API checks passed, including /admin HTTP route, admin login, user registration, admin credit adjustment, Coin Flip, Dice Roll, Lucky Number and Rock Paper Scissors. These smoke tests are not a guarantee of zero bugs.
