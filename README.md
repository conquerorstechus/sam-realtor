# Tampa Realty Pros UI (Next.js)

High-energy real estate marketing site UI (mock data + backend-ready service layer).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint

## Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for absolute metadata/OG URLs in production.

## Backend integration

Swap implementations in `src/lib/api/*` to call your API while keeping the same typed contracts.
