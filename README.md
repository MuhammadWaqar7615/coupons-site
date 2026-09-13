# CodiceSconto

Frontend and admin application for a CodiceSconto-style coupon directory, built with Next.js App Router, React, Tailwind CSS, MongoDB, and JavaScript.

## Project Structure

```text
src/
├── app/          # Routes, layouts, server pages, API route handlers
├── components/   # Shared and feature UI components
├── data/         # Static catalog fixtures used by the UI and seed scripts
├── lib/           # Server-only infrastructure: database and authentication
└── models/        # Mongoose schemas and model definitions
public/            # Static assets and placeholder images
scratch/           # Local maintenance and data-seeding scripts
```

Route-specific client components remain next to their route. Reusable UI belongs in `src/components`, while database access and authentication must stay in `src/lib` and `src/models` so server-only code is not imported into client components.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application uses the App Router under `src/app`. The production build is validated with `npm run build`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
