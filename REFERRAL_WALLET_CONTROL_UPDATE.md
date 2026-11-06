# Referral Wallet Recharge Control

- Admin ▸ Settings ▸ "Referral Wallet Unlock": ON/OFF switch + minimum verified referrals (default 3, editable).
- User ▸ Refer page: new card showing required / verified / pending-verification / payment-baaki counts and unlock status message.
- "Unlock with wallet" button appears only when user has permission (switch ON and verified >= minimum, or admin manual allow).
- Server enforces all rules (switch, minimum, existing checks) in `referral/wallet-unlock` and `referral/status`.
- Admin ▸ Referrals: per-referrer Verified / Pending / Total list, with "Allow unlock manually" / "Remove manual allow".
- Admin panel: 13 tabs reduced to 10 (Overview, Payments, Withdrawals, Users, Referrals, Settings, Rewards & Content, Bonus & Targets, Tickets, Demo). Bonuses / Daily Targets / Daily Task Links are sub-tabs under "Bonus & Targets".
- Tests extended (pending count, switch OFF, below-minimum block, manual allow). `npm test` passes.
