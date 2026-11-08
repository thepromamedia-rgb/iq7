# CafePilot — multi-cafe QR ordering & loyalty SaaS

A mobile-first cafe operations platform inspired by the supplied reference video. The reference's core loop—QR menu → order → loyalty stamp → reward → owner dashboard—is retained and expanded with a tenant-aware API, kitchen queue, customer records, table tokens, reports, and a separate super-admin API.

> **Delivery status:** This is a source-code implementation, not a hosted production service. Database migrations, dependency installation, and the end-to-end checklist must be completed in your environment before taking paying cafes live. Do not treat seeded demo data as real cafe activity.

## Stack
- React + TypeScript + Vite + Tailwind CSS
- Node.js + Express API
- PostgreSQL + Prisma ORM
- bcrypt password hashing, signed JWT sessions, Helmet, CORS and API rate limiting
- Zod request validation, Recharts, QR token generation

## Project layout
```
client/                 React customer and cafe dashboard application
  src/App.tsx           Auth, owner routes, public QR menu, order tracking
  src/api.ts            Authenticated API client
  src/styles.css        Responsive design system
server/
  src/index.ts          API, auth, tenant isolation, orders, reports
  src/core.test.ts      Order arithmetic tests
  prisma/schema.prisma  Relational database schema
  prisma/seed.ts        Clearly labelled demo cafe and plans
.env.example            Environment variable template
```

## Local setup
Requirements: Node.js 20+, npm 10+, PostgreSQL 15+.

1. Create a PostgreSQL database named `cafepilot`.
2. Copy `.env.example` to `.env` in the project root. Set `DATABASE_URL` and a unique random `JWT_SECRET` (32+ characters). Never commit `.env`.
3. Install dependencies from the project root:
   ```bash
   npm install
   ```
4. Generate Prisma client and apply the initial migration:
   ```bash
   npm run db:generate -w server
   npm run db:migrate -w server -- --name init
   ```
5. Add demo data only to a development database:
   ```bash
   npm run db:seed -w server
   ```
6. Start the API and web client:
   ```bash
   npm run dev
   ```
   Client: http://localhost:5173 · API: http://localhost:4000/api/health

Demo owner (development seed only): `owner@cafepilot.demo` / `ChangeMe123!`. Change or remove this account before any shared or production deployment. The seeded cafe is explicitly named `(DEMO DATA)`.

## Production deployment
- Provision managed PostgreSQL, a Node hosting service for `server`, and static hosting for `client`.
- Configure the same `DATABASE_URL`, strong `JWT_SECRET`, `CLIENT_ORIGIN` and `VITE_API_URL` for the deployed API origin at client build time.
- Run `prisma migrate deploy` during release; do not run seed in production.
- Build with `npm run build`; serve the API with `npm run start -w server` and publish `client/dist` on a static host.
- Use HTTPS, restrict CORS to the exact app domain, configure backups, monitoring, log retention, database connection pooling and image object storage.
- For production, replace browser-local JWT storage with secure HttpOnly SameSite cookies plus CSRF protection, add email verification/password reset, MFA for privileged users, and managed secret storage.

## Features currently implemented in source
- Cafe registration/login, password hashing and cafe-scoped JWT claims.
- Cafe public menu, category filters, search, cart, QR-token validation and persistent order creation.
- Cafe dashboard metrics computed from database orders; sales chart and best seller aggregation.
- Product/category CRUD, order listing/status transitions, kitchen queue, table creation and QR tokens.
- Customer profiles, marketing consent field, completed-order loyalty stamp issuance with unique order constraint, loyalty configuration.
- Cafe branding/tax settings, CSV export, audit log writes, super-admin overview/cafe endpoints and plan schema.
- Responsive customer menu and cafe owner interface.

## Integrations and honest limitations
- **Payments:** No gateway is connected. Checkout is marked pay-at-counter; no payment success is fabricated. To enable online subscriptions, configure a provider such as Razorpay, verify webhook signatures server-side, store provider IDs and reconcile payment state from verified webhooks.
- **WhatsApp:** Not connected. The interface explicitly reports that messages are not sent. Configure WhatsApp Business Cloud API credentials, templates, opt-in checks, webhook verification and delivery status handling before enabling.
- **QR printing:** Table tokens are persisted and links can be copied. A production release should render printable SVG/PNG QR labels and verify the public URL against the deployed domain.
- **Rewards/coupons:** Loyalty stamps are issued for newly completed eligible orders and protected by a unique order reference. Reward catalogue, one-time redemption and coupon application workflows remain follow-on implementation items; do not advertise these as live until completed.
- **Super admin:** Endpoints require the `SUPER_ADMIN` role. Promote a trusted account manually using a secure database procedure; never expose self-service super-admin registration. Full plan editor, MRR ledger, support console and subscription lifecycle UI remain to be completed.
- **Refunds, inventory, staff invitation/permissions, image uploads and automated notifications:** Schema groundwork exists for several of these, but the full workflows are not yet implemented.

## Tests and verification
Run:
```bash
npm run typecheck
npm test
npm run build
```
The included Vitest tests cover order arithmetic only. Before production, add API integration tests for tenant boundary enforcement, auth expiry, product CRUD, QR order creation, kitchen transitions, duplicate loyalty issuance, concurrent coupon redemption, refund state, exports, super-admin authorization, and browser/mobile flows. Run migration validation and security review against a staging database.

## Security notes
All cafe data queries in the API are scoped by the authenticated cafe ID. Never trust a cafe ID supplied by the browser. Public QR ordering resolves cafe by public slug and validates any supplied table token against that cafe. The super-admin role is checked separately. Keep secrets out of the client bundle. For commercial launch, add automated authorization tests and security review; this starter is not a compliance certification.

## SaaS pricing defaults
Suggested plan prices are Starter ₹499/month, Pro ₹999/month and Business ₹1,499/month. Plans are seeded as editable database records, but live subscription billing and entitlements are not active until gateway/webhook and plan enforcement are implemented.

## Latest build notes (2026-11-08)
- Offers page now supports creating, listing, pausing and reactivating cafe-scoped coupons. Coupon checkout application and redemption accounting are not yet implemented.
- Production startup refuses to use the development JWT secret fallback.
- `docs/reference-contact-sheet.jpg` contains sampled frames from the supplied reference video to keep the visual/product direction with the source package.
- See `TEST_REPORT.md` for exact verification results and unfinished launch requirements. Automated build/typecheck could not be completed in the authoring environment because npm dependency installation timed out.
