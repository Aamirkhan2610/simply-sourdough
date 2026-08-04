# Simply Sourdough — Modern Storefront + Admin CRM

A brand-new rebuild of [simplysourdough.shop](https://simplysourdough.shop/) using **Next.js**, **React**, and **Tailwind CSS** — artisan bakery online ordering with a built-in CRM.

## Features

- **Nordic editorial storefront** — home, shop, product detail, about, contact, cart
- **Admin CRM** at `/admin` with products prefilled from the live shop catalogue
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

## Notes

- Product images load from `simplysourdough.shop` CDN paths.
- Currency displayed as AUD (Lismore NSW).
- CRM writes persist to `data/crm-store.json` in local dev; on Vercel they use in-memory storage for the demo.
