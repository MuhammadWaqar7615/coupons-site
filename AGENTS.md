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

The intended reusable components are:

```text
components/
├── Navbar.jsx
├── HeroSection.jsx
├── Banner.jsx
├── DealCard.jsx
├── MosaicGrid.jsx
├── ImageOfferCard.jsx
├── SecondaryOffers.jsx
├── PromoBanner.jsx
├── CodeLists.jsx
├── Newsletter.jsx
└── Footer.jsx
```

The exact structure can be updated as the implementation evolves.

# Mock Data

Merchant and deal information should be represented using JavaScript arrays and `.map()` instead of duplicating JSX.

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

# Current Progress

Implementation has started.

Current state in the repository:

- Next.js app directory structure exists under `src/app`
- JavaScript-only setup is in place
- Tailwind CSS is configured
- A placeholder image exists at `public/images/placeholder.png`
- Homepage components already exist in `src/components`
- `Navbar.jsx` has a draft navbar implementation
- `MerchantSlider.jsx` has a draft merchant showcase implementation with mock merchant data
- `MosaicGrid.jsx` has a draft featured-offers grid implementation with mock deal data
- `RemainingDealsSection.jsx` has a draft follow-up deals section
- `src/app/page.js` still contains the default starter content and needs cleanup/integration

Do not pretend something has been completed.

# Remaining Tasks

Create and maintain this checklist as work is completed:

- [ ] Inspect the current implementation
- [ ] Replace starter/default content in `src/app/page.js`
- [ ] Wire homepage components together cleanly
- [ ] Implement/refine the navbar
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

Before making significant changes, read this AGENTS.md file and inspect the current project state. Do not assume that previous tasks are incomplete or complete without checking the actual code.

The actual project files are always the source of truth.

Do not unnecessarily restart or rebuild the project from scratch.

Continue from the current implementation.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# /negozi Page Logic & Behavior

The `/negozi` page has a complex, multi-tiered filtering system that MUST be preserved:

1. **Global Cashback Toggle (Sub-Navbar)**
   - The right side of the purple sub-navbar acts as a toggle between "All Stores" and "Cashback Stores".
   - Toggling this updates the entire dataset and dynamically changes the sub-navbar title and toggle button text.

2. **Preview Mode vs. Single-Letter Mode**
   - **Preview Mode (Default):** When no specific letter is selected, the page displays a vertical list of all alphabet sections. However, each section ONLY displays a preview (max 8 store badges). The section header right-side text (e.g., "Tutti i X negozi") acts as a clickable button to expand.
   - **Single-Letter Mode:** Clicking a letter in the left sidebar OR clicking the "Tutti i X negozi" button in a section header isolates that letter. 
     - All other alphabet sections are hidden.
     - The selected section expands to show ALL of its badges without the preview limit.
     - The sub-navbar title updates to reflect the filter (e.g., "Negozi cashback che iniziano per #").

### /negozi Page Edge Cases (Bug Fixes)
- **State Retention:** Toggling the global "All Stores" vs "Cashback Stores" filter MUST NOT reset the active alphabet filter (`selectedLetter`). The user should remain on the same letter they were viewing.
- **Mock Data Padding:** Because the mock data array is small, clicking to "expand" to 27 shops visually failed because there were only 8 shops available for that letter. The code must dynamically duplicate/pad the available mock stores up to the hardcoded `countsAll` and `countsCashback` numbers to ensure the UI visually renders the exact number of cards expected.

### Complete Reset Behavior
- Clicking the main title on the left side of the purple sub-navbar must act as a complete reset for the page. It MUST reset both `isCashbackOnly` to `false` and `selectedLetter` to `null`, instantly returning the user to the absolute default "Preview Mode" with all alphabets and all stores visible.

### Mock Data Padding & Dynamic Previews
- **Dynamic Preview Limits:** When rendering the preview mode (list of all alphabets), the number of badges shown per letter depends on the global filter:
  - If "All Shops" is active: max 8 badges per letter.
  - If "Cashback Shops" is active: max 4 badges per letter.
- **Universal Padding:** The available mock data for any given letter is often smaller than the hardcoded screenshot totals. The codebase must universally pad the array of stores (by looping existing items) up to the target `totalCountForLetter` BEFORE determining what to display. This guarantees that whether the user is in preview mode (sliced to 4 or 8) or expanded mode (showing all), the exact required visual number of cards will render on the screen.
