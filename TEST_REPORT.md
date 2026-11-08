# CafePilot QA report

Date: 2026-11-08

## Verification performed

- Repaired the workspace layout: frontend sources are now under `client/src`, backend under `server/src`, and Prisma files under `server/prisma`, matching the root npm workspaces and deployment scripts.
- Added the Netlify SPA fallback file under `client/public/_redirects` and retained the Vercel rewrite configuration.

- ZIP package created and integrity-checked after source updates.
- Reference video was available and reviewed; a contact sheet is included at `docs/reference-contact-sheet.jpg` for visual context.
- Source inspection completed for client routes, API handlers, Prisma schema, environment templates and workspace scripts.
- Coupon management API and owner UI added: list, create, pause and reactivate coupons, with cafe scoping and input validation.
- Production startup now refuses the development JWT fallback when `NODE_ENV=production` and a strong `JWT_SECRET` is absent.

## Automated checks

| Check | Result | Notes |
|---|---|---|
| `npm install` | Not completed | Dependency installation timed out in this environment; offline retry confirmed the npm cache does not contain the required packages. |
| Client/server typecheck | Blocked | Dependencies were not installed; TypeScript reported missing packages/types. |
| Vitest | Not run | Dependencies unavailable. |
| Production build | Not run | Dependencies unavailable. |
| PostgreSQL migrations | Not run | No configured PostgreSQL service/credentials in this environment. |
| Browser E2E/mobile tests | Not run | No running app/database/browser test environment. |

## Known incomplete work — do not advertise as live

- Coupon records can be created and paused, but coupon application at customer checkout and atomic redemption/use-count enforcement are not implemented.
- Reward catalogue, redemption codes and redemption workflow remain incomplete.
- Staff invitation and fine-grained staff permission UI remain incomplete.
- Inventory decrement and low-stock notification workflow remain incomplete.
- Payment gateway and subscription billing are not connected; no payment success is simulated.
- WhatsApp Business API is not connected; no messages are sent.
- Super-admin endpoints exist, but a complete super-admin management UI and subscription revenue ledger are not finished.
- Production-grade cookie sessions, CSRF protection, email verification, password reset, MFA, monitoring and automated tenant-isolation security tests remain launch requirements.

## Release recommendation

This package is a development-stage SaaS starter. Do not onboard paying cafes until dependencies install cleanly, migrations are applied to staging, the full test matrix is completed, security review passes, and the unfinished workflows above are either implemented or clearly excluded from the commercial plan.
