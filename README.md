# Sweet Delights

Sweet Delights is a premium, fully responsive cake shop e-commerce experience built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **PostgreSQL**, and **Drizzle ORM**.

## Features

- Luxury home page with premium hero, featured cakes, best sellers, testimonials, offers, and Instagram-style gallery
- Cake catalog with search, filters, sorting, pagination, and quick view modal
- Product detail pages with multiple images, reviews, ratings, and add-to-cart actions
- Custom cake builder with live price calculation
- Shopping cart with quantity controls, coupon validation, delivery, and tax summary
- Secure checkout flow with Stripe/Razorpay-ready payment selection
- Account dashboard with login, signup, forgot password, order history, wishlist, and addresses
- Order tracking timeline
- About and contact pages with WhatsApp and map integration
- Admin dashboard with analytics, products, orders, customers, coupons, inventory, and review management
- Dark/light mode, smooth animations, mobile-first responsive UI, and accessibility-friendly structure

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- PostgreSQL
- Drizzle ORM
- JWT authentication
- bcrypt password hashing

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`:

```bash
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
JWT_SECRET=replace-with-a-long-random-secret
```

3. Push the schema:

```bash
npx drizzle-kit push
```

4. Run the app locally:

```bash
npm run dev
```

## Validation

Recommended checks:

```bash
npx next typegen
npm exec tsc -- --noEmit --pretty false
npm run build
```

## Deployment

- Set the production `DATABASE_URL`
- Set a strong `JWT_SECRET`
- Run `npx drizzle-kit push` against the production database
- Deploy the Next.js application to your preferred platform

## Notes

- Product catalog content is seeded through demo data for a polished storefront experience.
- Auth, contact, newsletter, reviews, and orders are stored in PostgreSQL.
- Razorpay and Stripe are represented in the checkout flow and are ready for integration expansion.
