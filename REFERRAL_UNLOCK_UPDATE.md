# Referral Wallet Unlock Update

- Wallet-funded direct-referral task unlock now credits referral commissions using the existing admin-configured Level 1, Level 2, and Level 3 reward values.
- Historical completed wallet-unlock records are backfilled idempotently into wallet earnings so prior referrers can see the missing commission.
- Wallet unlock now displays a confirmation modal with unlock amount, current balance, and post-unlock balance before processing.
- Completed referral tasks display `Unlocked` and cannot be unlocked or charged a second time.
- Existing QR/UTR submission and admin verification flow remains unchanged.
- Existing referral task completion rewards and other reward settings remain unchanged.

Validation: `npm test` passed (syntax, inline scripts, smoke tests, feature tests, referral unlock integration, PWA endpoint checks).
