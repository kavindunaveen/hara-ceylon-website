# Hara Ceylon — E-Commerce

Premium Sri Lankan tea & coffee. Multi-currency (LKR / USD / GBP) e-commerce
on Next.js 14 + Postgres + Prisma + PayHere.

## Tech Stack

- **Next.js 14** (App Router, RSC, TypeScript)
- **Tailwind CSS** for styling (brand theme matches the original static site)
- **PostgreSQL** + **Prisma** ORM
- **NextAuth (Auth.js v5)** — email/password + Google OAuth
- **Zustand** for cart state (localStorage persisted)
- **PayHere** — Onsite Checkout + IPN webhook
- **Resend** for transactional email (Phase 4+)
- **UploadThing** for admin product image uploads (Phase 6)
- **Vercel** for hosting

## Getting Started (local dev)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then fill in:

- `DATABASE_URL` — Postgres connection string. Free options:
  - [Neon](https://neon.tech/) (recommended, serverless, free tier)
  - [Supabase](https://supabase.com/) (free tier)
  - Local: `docker run -d --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16`
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — your first admin login (seeded automatically)
- `PAYHERE_*` — leave blank for now; needed in Phase 4
- Other keys are needed in later phases — see `.env.example`

### 3. Set up the database

```bash
npm run db:push      # push schema to your Postgres
npm run db:seed      # seed categories, 4 products, shipping zones, sample coupon, admin user
```

### 4. Run dev server

```bash
npm run dev
```

Open http://localhost:3000

> The site will render even before the DB is configured — it falls back to a
> built-in seed of 4 products so you can preview the storefront immediately.

## Project Structure

```
hara-ceylon-website/
├── app/                       # Next.js App Router
│   ├── (storefront)
│   │   ├── page.tsx           # Home — hero, about, featured, contact
│   │   ├── shop/page.tsx      # Catalog with search/filters
│   │   ├── products/[slug]    # Product detail page
│   │   ├── cart/              # Cart (Phase 3)
│   │   ├── checkout/          # Checkout (Phase 3+4)
│   │   ├── account/           # Customer account (Phase 5)
│   │   └── auth/              # Login / register (Phase 5)
│   ├── admin/                 # Admin (Phase 2: products CRUD; later: full dashboard)
│   │   ├── layout.tsx         # Sidebar + auth gate; force-dynamic for CI builds
│   │   └── products/          # List, new, [id]/edit + server actions
│   ├── api/
│   │   ├── auth/[...nextauth] # Auth.js endpoints
│   │   ├── payhere/           # PayHere start endpoint (Phase 4)
│   │   └── webhooks/payhere   # PayHere IPN (Phase 4)
│   ├── privacy / terms / refund-policy / shipping-policy
│   └── layout.tsx
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── product-card.tsx
│   ├── currency-switcher.tsx
│   ├── cart-icon.tsx
│   ├── admin/                 # admin-sidebar, archive button
│   ├── auth/                  # login-form
│   └── providers/             # currency-provider, session-provider (next-auth/react)
├── lib/
│   ├── prisma.ts
│   ├── auth-credentials.ts
│   ├── currency.ts
│   ├── cart-store.ts          # Zustand
│   ├── products.ts            # Server-only product queries
│   ├── fallback-products.ts   # Used when DB not configured
│   └── site.ts
├── prisma/
│   ├── schema.prisma          # Full e-commerce schema
│   └── seed.ts                # Idempotent seed
├── auth.ts / auth.config.ts / middleware.ts
├── public/img/                # Brand assets + product photography
└── legacy/                    # Original static HTML — archived for reference
```

## Build Phases

This project is delivered in 7 phases. Each phase is functional and shippable.

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 1 | Foundation: Next.js, Tailwind, Prisma schema, Auth.js, layout, home, shop, PDP, legal | ✅ Done |
| 2 | Catalog: shop search/filters + slim admin Products CRUD (create/edit/archive/restore, 3-currency prices, image URLs) | ✅ Done |
| 3 | Cart & Checkout: full cart UX, multi-step checkout, shipping calc, coupons | ⏳ Next |
| 4 | PayHere: hash gen, IPN webhook, Onsite Checkout, success/cancel, emails | ⏳ |
| 5 | User Accounts: login, register, dashboard, orders, addresses, wishlist | ⏳ |
| 6 | Full Admin Dashboard: KPIs, products, orders, customers, coupons, shipping, reviews, settings | ⏳ |
| 7 | Polish & Launch: SEO, sitemap, JSON-LD, perf, live PayHere, deploy | ⏳ |

## PayHere Setup (Phase 4)

1. Sign up at [PayHere](https://www.payhere.lk/) (and [Sandbox](https://sandbox.payhere.lk/) for testing).
2. Get your `MERCHANT_ID` and `MERCHANT_SECRET` from the dashboard.
3. Set in `.env`:
   ```
   PAYHERE_MERCHANT_ID=...
   PAYHERE_MERCHANT_SECRET=...
   PAYHERE_MODE=sandbox
   ```
4. For local dev IPN testing, expose your server with ngrok:
   ```bash
   ngrok http 3000
   ```
   Use the ngrok URL as `NEXT_PUBLIC_SITE_URL`.

## Deploy to Vercel (Phase 7)

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add all env vars from `.env`.
4. After first deploy, point `haraceylon.com` DNS at Vercel.
5. Flip `PAYHERE_MODE=live` once your merchant account is approved.

## Useful Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run typecheck` | TypeScript check (no emit) |
| `npm run lint` | ESLint |
| `npm run db:push` | Push schema to DB (no migration history) |
| `npm run db:migrate` | Create + apply a migration |
| `npm run db:seed` | Seed initial data |
| `npm run db:studio` | Prisma Studio (GUI) |
| `npm run db:generate` | Regenerate Prisma client |

## License

© Hara Ceylon Ltd. All rights reserved.
