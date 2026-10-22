IQ63 WEBSITE — RENDER DEPLOYMENT

This ZIP keeps the recovered website folder as a base and adds an IQ63-branded responsive front end.

DEPLOY
1. Extract the ZIP.
2. Upload all extracted files and folders to a GitHub repository (index.html and package.json must be at the repository root).
3. In Render, create/update a Web Service connected to that repository.
4. Runtime: Node. Build command: npm install. Start command: npm start. Health check path: /healthz.

WHAT WORKS IN THIS PREVIEW
- IQ63 branding and responsive home page
- Register/login validation and session persistence in the current browser
- Account dashboard and logout
- Wallet display and local add-money/withdraw request history
- Invite code display/copy and navigation

IMPORTANT LIMITATIONS
This is a browser-only prototype. User accounts, password hashes, session and wallet request history are stored in the visitor's browser, not a server database. This is not secure production authentication. Wallet requests do not transfer money, the demo balance starts at ₹0, games are not connected, and there is no payment gateway or admin backend. Do not use real/reused passwords or enable real deposits/withdrawals until a secure backend, database, server-side sessions, rate limiting, and verified payment provider are implemented.

The recovered capture did not contain the original website's complete source/backend, so this ZIP cannot honestly restore those missing original services.
