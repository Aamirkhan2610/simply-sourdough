# Simply Sourdough — Modern Storefront + Admin CRM

A brand-new rebuild of [simplysourdough.shop](https://simplysourdough.shop/) using **Next.js**, **React**, and **Tailwind CSS** — artisan bakery online ordering with a built-in CRM.

## Features

- **Nordic editorial storefront** — home, shop, product detail, about, contact, cart
- **Admin CRM** at `/admin` with products prefilled from the live shop catalogue
- **Email settings** at `/admin/settings` — choose which inbox receives orders, no redeploy needed
- Product CRUD (create / edit / delete)
- Instagram highlights (@simplysourdough2023)
- Google review highlights with link to live Google listing
- Client-side cart (localStorage)
- Vercel-ready (in-memory CRM store on serverless)

## Quick start

```bash
cd simply-sourdough
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/shop` | Product catalogue |
| `/shop/[slug]` | Product detail |
| `/cart` | Cart / pickup checkout demo |
| `/about` | Story |
| `/contact` | Contact + WhatsApp |
| `/admin` | CRM dashboard |
| `/admin/products` | Product admin |
| `/admin/reviews` | Featured Google reviews |
| `/admin/instagram` | Instagram gallery |
| `/admin/orders` | Sample orders |
| `/admin/settings` | Order email recipient + Zoho SMTP account |

## Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS 4
- File-backed CRM locally · in-memory on Vercel (`src/lib/store.ts`)
- Seed data: `src/data/seed.ts`

## Deploy on Vercel

```bash
npx vercel
```

Or connect the GitHub repo in the Vercel dashboard and deploy.

## Order emails

One Zoho account, set in the admin panel at **`/admin/settings`**, is used
everywhere: it signs in to send mail, it is the From address, and it is the
inbox every website order lands in. No code change or redeploy required to
change it. The page also has an optional CC list and a **Send test** button
to confirm the inbox actually works.

Settings are stored in Postgres (`app_settings` table, created automatically on
first use) so they survive restarts and redeploys. To connect a database:

```bash
vercel integration add neon      # or supabase / prisma-postgres
vercel env pull .env.local
```

That sets `DATABASE_URL`. Until a database is connected the page still works,
but a banner warns that changes are held in memory only and will be lost when
the site restarts.

The `SMTP_*` environment variables remain the defaults used before an admin
saves anything, so order delivery is unchanged until the settings are edited:

| Variable | Purpose |
|----------|---------|
| `SMTP_HOST` / `SMTP_PORT` | Zoho SMTP server, defaults `smtp.zoho.com` / `465` |
| `SMTP_USER` / `SMTP_PASS` | The Zoho account used until one is saved in the admin panel |
| `ORDER_EMAIL_CC` | Default CC list before one is saved in the admin panel |
| `ADMIN_SESSION_SECRET` | Signs the admin session cookie — set this in production |

## Notes

- Product images load from `simplysourdough.shop` CDN paths.
- Currency displayed as AUD (Lismore NSW).
- CRM writes persist to `data/crm-store.json` in local dev; on Vercel they use in-memory storage for the demo.
