# Production release checklist

- [ ] Configure production PostgreSQL and secret manager.
- [ ] Apply and verify Prisma migrations on staging.
- [ ] Configure HTTPS, exact CORS origin, rate limits and backups.
- [ ] Add secure HttpOnly cookie sessions, CSRF defence, MFA and password recovery.
- [ ] Add staff invitation and permission matrix tests.
- [ ] Add customer self-service order history and loyalty account lookup verification.
- [ ] Complete reward redemption and coupon validation as atomic database transactions.
- [ ] Render downloadable table QR labels using the final public domain.
- [ ] Implement payment gateway orders, signed webhooks, idempotency and reconciliation.
- [ ] Implement WhatsApp opt-in, templates, webhook validation and delivery tracking.
- [ ] Complete inventory decrement/restock and low-stock notifications.
- [ ] Complete refund workflow with gateway reconciliation.
- [ ] Add super-admin plan editor, subscription ledger, support requests and audit UI.
- [ ] Run tenant isolation, API, browser, accessibility and mobile tests.
- [ ] Remove demo data and rotate all credentials.
