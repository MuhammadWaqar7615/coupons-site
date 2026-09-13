# Project Overview

This project is a frontend UI clone of:

https://www.codicesconto.com/

The goal is to reproduce the CodiceSconto website UI as closely as possible using:

- Next.js
- React
- JSX
- Tailwind CSS
- JavaScript

This is a frontend-only UI cloning project.

Do not treat this as a generic coupon website. The implementation must follow the actual CodiceSconto homepage structure, hierarchy, spacing, layout, and visual style discovered through browser inspection.

# Tech Stack

Use:

- Next.js
- React
- JavaScript
- JSX
- Tailwind CSS

Explicitly:

- No TypeScript
- No backend
- No database
- No Redux unless explicitly requested later
- No unnecessary libraries
- Keep the implementation simple

Prefer simple React components and Tailwind utility classes.

# Reference Website

Reference:

[https://www.codicesconto.com/](https://www.codicesconto.com/)

The homepage has been inspected using browser/Playwright tools.

The actual homepage structure discovered during inspection includes:

1. Navbar
2. Hero Section (Purple background, featured card overlapping hero image, horizontal row of store logos)
3. Full-Width Illustrative Banner
4. "Offerte in evidenza" Grid (White background, 3x3 cards, no CTA buttons)
5. Secondary Offers Grid (Dark grey background, image-top cards)
6. Promo Banner (Backpack illustration, newsletter text)
7. Code Lists Section (Purple background, two columns: new and expiring codes)
8. Newsletter Subscribe Bar (Light grey)
9. Footer (Dark grey)

Future agents must inspect the actual current implementation before making changes and must not assume that the project is a generic coupon website.

The reference website contains:

- CodiceSconto branding/logo area
- Search field in the header
- Navigation items:
  - Negozi
  - Offerte
  - Blog
  - Aggiungi negozio
  - Accedi (Purple button)
- Mobile navigation toggle/offcanvas-style menu
- Purple hero section with overlapping featured card
- Horizontal row of store logos below hero
- Minimalist offer cards (Logo, discount, dotted line separator, title, NO BUTTONS)
- Image-top offer cards in dark sections
- Vertical list view for new and expiring codes
- Responsive mobile layout stacking these sections
- Footer containing grouped links and CodiceSconto information

The exact styling should be reproduced as closely as practical.

# Important UI Findings

From inspection, the important visual patterns are:

- Navbar structure with white search bar and purple "ACCEDI" button
- Hero section on a purple background with a prominent overlapping white featured card
- Horizontal row of store logos below the hero
- Clean, buttonless offer cards for "Offerte in evidenza" (Logo, large discount, dotted horizontal separator, title)
- Secondary offer grid on dark grey with image-top cards
- Full-width promotional and illustrative banners
- Vertical list layouts for new and expiring discount codes
- Mobile behavior that stacks content vertically and compresses the header into a compact layout with a toggle
- Strong visual separation between sections using purple, white, light grey, and dark grey backgrounds
- Footer with grouped links for stores, offers, and CodiceSconto information

# Image Policy

This is very important.

The original website images must NOT be:

- downloaded
- scraped
- copied
- generated
- recreated

Instead, all original images/logos should use:

`/public/images/placeholder.png`

Every placeholder image should have a TODO comment such as:

```jsx
{/* TODO: Replace placeholder with original image */}
```

The developer will replace these images later.

Do not remove this strategy.

# Component Structure

The intended scalable route architecture is used. Reusable components are separated by feature:

```text
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── negozi/
│   │   └── page.js
│   ├── offerte/
│   │   └── page.js
│   ├── blog/
│   │   └── page.js
│   ├── aggiungi-negozio/
│   │   └── page.js
│   └── account/
│       └── login/
│           └── page.js
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── home/
│   │   ├── HeroSection.jsx
│   │   ├── MerchantSlider.jsx
│   │   ├── Banner.jsx
│   │   ├── MosaicGrid.jsx
│   │   ├── DealCard.jsx
│   │   ├── ImageOfferCard.jsx
│   │   ├── SecondaryOffers.jsx
│   │   ├── RemainingDealsSection.jsx
│   │   ├── PromoBanner.jsx
│   │   ├── CodeLists.jsx
│   │   └── Newsletter.jsx
│   │
│   ├── stores/
│   ├── offers/
│   ├── blog/
│   ├── add-store/
│   └── account/
│
├── data/
│   ├── home/
│   ├── stores/
│   ├── offers/
│   └── blog/
```

# Mock Data

Merchant and deal information should be represented using JavaScript arrays and `.map()` instead of duplicating JSX. Examples exist in `src/data/`.

# Responsive Requirements

The UI must work correctly on:

- Desktop
- Laptop
- Tablet
- Mobile

Use Tailwind responsive utilities.

# Development Rules

Future agents must:

- Inspect existing code before changing it
- Preserve working functionality
- Keep JSX simple
- Prefer Tailwind CSS
- Avoid unnecessary dependencies
- Avoid overengineering
- Reuse components where appropriate
- Never replace placeholder images with downloaded or generated originals
- Keep the visual design close to the reference
- Fix errors instead of hiding them
- Ensure future pages scale inside `src/app/`, use page-specific component directories (`src/components/<page_name>/`) and data directories (`src/data/<page_name>/`).

# Current Progress

Implementation has started.

Current state in the repository:

- Next.js app directory structure exists under `src/app`
- JavaScript-only setup is in place
- Tailwind CSS is configured
- A placeholder image exists at `public/images/placeholder.png`
- Homepage components exist in `src/components/home/` and `src/components/layout/`
- Navigation structure is complete (`/negozi`, `/offerte`, `/blog`, `/aggiungi-negozio`, `/account/login`)
- Placeholder dummy data exist in `src/data/`

Do not pretend something has been completed.

# Remaining Tasks

Create and maintain this checklist as work is completed:

- [x] Inspect the current implementation
- [x] Refactor architecture into app routing and feature-based component organization
- [x] Replace starter/default content in `src/app/page.js`
- [x] Wire homepage components together cleanly
- [ ] Implement/refine the other routes (/negozi, /offerte, /blog, /aggiungi-negozio, /account/login)
- [ ] Implement/refine the navbar (Mobile layout toggle etc)
- [ ] Implement/refine the merchant showcase
- [ ] Implement/refine the dark merchant/hero section
- [ ] Implement/refine the "Offerte in evidenza" mosaic/grid
- [ ] Implement remaining homepage sections
- [ ] Implement footer
- [ ] Ensure placeholder image usage is consistent
- [ ] Add TODO comments beside placeholder images
- [ ] Implement responsive behavior
- [ ] Test desktop layout
- [ ] Test mobile layout
- [ ] Run the project and fix errors
- [ ] Perform visual comparison against the reference website
- [ ] Fix major visual differences
- [ ] Final cleanup

Update this checklist when tasks are actually completed.

# Important Instruction For Future Agents

Before making significant changes, read this AGENTS2.md file and inspect the current project state. Do not assume that previous tasks are incomplete or complete without checking the actual code.

The actual project files are always the source of truth.

Do not unnecessarily restart or rebuild the project from scratch.

Continue from the current implementation.
