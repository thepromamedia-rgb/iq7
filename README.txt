CRYPTO BRIDGE — CREDITS-ONLY BUILD

This build uses virtual, non-redeemable credits only. Credits have no cash value and cannot be purchased, withdrawn, transferred for cash, or redeemed. No INR/crypto payment flow is connected to game credits. Deposit, withdrawal, Razorpay order/verification, webhook, deposit approval, and payout endpoints are disabled by default. Do not set CREDITS_ONLY=false on a public deployment.

FEATURES
- Crypto Bridge login/registration and admin panel.
- Admin > Users > Add Credit: only authenticated admins can grant positive whole-number credits, with a required audit reason.
- Game Zone: Coin Flip, Dice Roll, Lucky Number, Rock Paper Scissors, and Aviator-style multiplier. Smooth reveal animations and responsive transitions are included. Stake validation and outcome settlement run on the server; game records and audit events are saved.
- Simulated market buy/sell and bonus features use the same virtual-credit balance. Live market prices are informational; balances are not money.
- Admin can enable or disable Game Zone.

RUN LOCALLY
1. Install Node.js 18 or later.
2. Run `npm start`.
3. Configure ADMIN_EMAIL and ADMIN_PASSWORD in the environment.
4. For durable deployment storage, configure Upstash or a persistent disk.
5. Run `npm test` for regression and credits-only tests.

DEPLOYMENT SAFETY
Keep CREDITS_ONLY unset or true. Credits-only mode is the default. Do not add payment credentials or claim cash value. This is a virtual-credit entertainment/testing build, not a real-money gambling product.
