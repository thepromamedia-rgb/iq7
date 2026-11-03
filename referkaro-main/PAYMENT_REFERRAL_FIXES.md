# Referral and payment retry update

- The Refer & Earn section now explains that the Admin-configured percentage is a discount for the newly referred friend on task-unlock payment, not a discount for the referrer. It also explains that the referrer reward is credited only after the referred user's payment is verified.
- Checkout estimate now includes the server-configured referral discount for users whose account has a valid referrer.
- Added authenticated `razorpay/status` reconciliation. It checks the Razorpay order's payments on the server, verifies captured payments only when order, amount and INR currency match, and unlocks task access after verification.
- The cancel/failure path checks Razorpay server-side before marking an order failed/cancelled. If Razorpay cannot be reached, the payment remains pending until it can be checked; the UI advises the user to check status rather than risk duplicate payment.
- Confirmed failure/cancellation returns the user to a retryable state. Successful captured payments are verified and task access is unlocked automatically by the confirm route or webhook.

## Validation

`npm test` passes (Node syntax, inline JavaScript syntax, and the existing health/homepage/register/login smoke tests).

Live Razorpay, webhook delivery, Supabase persistence, and Hostinger deployment must still be tested using the site's real server credentials. Do not put secret keys in client-side files.
