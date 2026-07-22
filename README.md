# Code Museum

> Every project tells a story. Welcome to the Code Museum.

A curated, museum-themed developer portfolio that presents software projects as gallery exhibits. Dark, premium aesthetic with antique gold accents, Cormorant Garamond serif typography, 3D tilt cards, cursor-following spotlights, and spring-physics animations.

Built with **Next.js 13**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Customization](#customization)
- [The AP Folder (GitHub Pages Edition)](#the-ap-folder-github-pages-edition)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

Code Museum turns a traditional developer portfolio into an immersive gallery experience. Each project is displayed as an exhibit card with:

- An artifact ID (e.g. `CM-013`)
- A curated thumbnail with scanline and dust-particle overlays
- A cursor-following spotlight gradient
- A 3D tilt that responds to pointer position with spring smoothing
- Glassmorphism action buttons that reveal on hover or keyboard focus

The portfolio is fully responsive, accessible, and data-driven — all project content is defined in a single array and can be swapped without touching the component layer.

---

## Features

### Visual Design

- **Museum palette** — deep black `#0a0a0a` background, antique gold `#c9a227` accents, ivory `#f4ecd8` text, muted green `#1f3d2f` ambient glows
- **Typography system** — Cormorant Garamond (serif headings), JetBrains Mono (labels & IDs), Inter (body)
- **Ambient backdrop** — layered radial blur glows in green and gold
- **Gold gradient text** — linear gradient clip on the "Code Museum" title

### Interactions

- **3D tilt cards** — `rotateX`/`rotateY` driven by pointer position, smoothed with Framer Motion springs (stiffness 150, damping 20, mass 0.4)
- **Cursor spotlight** — radial gradient that follows the pointer via `useMotionTemplate`
- **Hover state** — image zoom (scale 1.08), dark gradient overlay, gold border glow, top shimmer line, description fade
- **Dust particles** — animated radial-gradient pseudo-elements with drift keyframes
- **Scanline texture** — repeating linear gradient for the "under glass" exhibit feel

### Functionality

- **Category filtering** — 9 categories with animated pill tabs and `AnimatePresence` card transitions
- **Tech stack badges** — color-coded per technology with matching brand colors
- **Preview fallback** — View Preview buttons fall back to the curator's YouTube channel when no deployment URL is provided
- **Keyboard navigation** — focus activates the same hover state; all interactive elements have aria-labels
- **Reduced motion** — respects `prefers-reduced-motion`

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 13 (App Router) |
| Language | TypeScript 5.2 |
| UI Library | React 18 |
| Styling | Tailwind CSS 3.3 |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Components | Radix UI (shadcn/ui) |
| Fonts | Cormorant Garamond, JetBrains Mono, Inter (next/font) |
| Deployment | Netlify (via @netlify/plugin-nextjs) |

---

## Project Structure

```
.
├── app/
│   ├── globals.css         # Tailwind layers + museum CSS utilities
│   ├── layout.tsx          # Root layout with font variables
│   └── page.tsx            # Home page — hero + project showcase
├── components/
│   ├── museum/
│   │   ├── CategoryFilter.tsx      # Animated category pill tabs
│   │   ├── ExhibitGallery.tsx      # Gallery + filter state management
│   │   ├── ProjectExhibitCard.tsx  # 3D tilt exhibit card
│   │   ├── tech-icons.ts          # Tech name → icon + color resolver
│   │   ├── types.ts               # Shared TypeScript types
│   │   └── index.ts               # Barrel export
│   └── ui/                         # shadcn/ui component library
├── hooks/
│   └── use-toast.ts
├── lib/
│   └── utils.ts                    # cn() class merge utility
├── AP/                             # Standalone GitHub Pages edition (see below)
├── tailwind.config.ts
├── next.config.js
├── netlify.toml
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm)

### Install & Run

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler in no-emit mode |

---

## Customization

### Adding or Editing Projects

All project data lives in the `exhibits` array in [`app/page.tsx`](app/page.tsx). To add a new exhibit:

```tsx
{
  artifactId: 'CM-014',
  title: 'Your Project',
  description: 'A one-line description of the project.',
  image: 'https://images.pexels.com/photos/...',
  imageAlt: 'Alt text for the thumbnail',
  year: 2026,
  previewUrl: 'https://your-demo-url.com',  // null if no deployment
  repoUrl: 'https://github.com/you/repo',
  techStack: [{ name: 'React' }, { name: 'TypeScript' }],
  categories: ['Frontend', 'Full Stack'],
}
```

### Changing the Curator Profile

Edit the `CURATOR` object in [`app/page.tsx`](app/page.tsx) — name, tagline, bio, location, social links, and avatar URL.

### Adjusting the Color Palette

Museum color tokens are defined in both [`app/globals.css`](app/globals.css) (as CSS custom properties) and [`tailwind.config.ts`](tailwind.config.ts) (as Tailwind theme extensions under `colors.museum`).

---

## The AP Folder (GitHub Pages Edition)

The [`AP/`](AP/) folder contains a **completely standalone, framework-free** recreation of this portfolio using only HTML5, CSS3, and vanilla JavaScript (ES6+). It mirrors the full design — museum aesthetic, 3D tilt, spotlight, filters, animations — with zero dependencies.

- No React, Next.js, TypeScript, Tailwind, or Framer Motion
- No build tools or npm install required
- Deployable directly to GitHub Pages by selecting the `AP` folder as the publishing source
- Project data lives in [`AP/data/projects.json`](AP/data/projects.json) and is loaded dynamically via `fetch()`

See [`AP/README.md`](AP/README.md) for full documentation.

---

## Deployment

### Netlify (Next.js)

The project includes a [`netlify.toml`](netlify.toml) and uses `@netlify/plugin-nextjs` for SSR support. Connect the repository on Netlify and deploy — no additional configuration needed.

### GitHub Pages (AP folder)

The `AP/` folder can be deployed independently to GitHub Pages:

1. Go to **Settings → Pages** in your GitHub repository
2. Set **Source** to **Deploy from a branch**
3. Select the branch and set the folder to `/AP`
4. Your site will be live at `https://<username>.github.io/<repo>/AP/`

---

## License

This project is open source. Feel free to fork, adapt, and use it for your own portfolio.
