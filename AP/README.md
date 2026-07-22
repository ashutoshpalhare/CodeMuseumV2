# Code Museum — GitHub Pages Edition

> A framework-free, zero-dependency recreation of the [Code Museum](../) portfolio.

Pure HTML5, CSS3, and vanilla JavaScript (ES6+). No React, no Next.js, no TypeScript, no Tailwind, no Framer Motion, no build tools, no npm install. Just open a static server and go.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Adding Projects](#adding-projects)
- [How It Works](#how-it-works)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## Overview

This is a standalone version of the Code Museum portfolio designed for static hosting on GitHub Pages. It preserves every aspect of the original Next.js design — the museum aesthetic, 3D tilt cards, cursor spotlights, category filtering, and premium animations — rebuilt entirely with vanilla web technologies.

The entire portfolio is data-driven. All project content lives in a single JSON file. Adding a new project is as simple as editing `data/projects.json` — no code changes required.

---

## Features

### Design

- **Museum palette** — deep black `#0a0a0a` background, antique gold `#c9a227` accents, ivory `#f4ecd8` text, muted green ambient glows
- **Typography** — Cormorant Garamond (serif headings), JetBrains Mono (labels & artifact IDs), Inter (body), loaded via Google Fonts
- **Ambient backdrop** — layered radial blur glows in green and gold
- **Gold gradient title** — "Code Museum" rendered with a clipped linear gradient

### Interactions

- **3D tilt cards** — `rotateX`/`rotateY` driven by pointer position, smoothed with a custom spring physics loop using `requestAnimationFrame` (replaces Framer Motion's `useSpring`/`useTransform`)
- **Cursor spotlight** — radial gradient that follows the pointer across each card, set via inline CSS
- **Hover state** — image zoom (scale 1.08), dark gradient overlay, gold border glow, top shimmer line, description fade
- **Dust particles** — animated radial-gradient pseudo-elements with drift keyframes
- **Scanline texture** — repeating linear gradient for the "under glass" exhibit feel
- **Glassmorphism buttons** — backdrop-blur with gold border, appearing on hover or keyboard focus

### Functionality

- **Category filtering** — 9 categories with animated pill tabs and CSS keyframe card transitions (replaces Framer Motion's `AnimatePresence`)
- **Tech stack badges** — color-coded per technology with matching brand colors and inline SVG icons
- **Preview fallback** — View Preview buttons fall back to the curator's YouTube channel when no deployment URL is provided
- **Scroll reveal** — `IntersectionObserver`-based entrance animations for sections
- **Keyboard navigation** — focus activates the same hover state; all interactive elements have `aria-label`s
- **Reduced motion** — respects `prefers-reduced-motion: reduce`

---

## Folder Structure

```
AP/
├── index.html              # Single-page HTML entry point
├── css/
│   ├── style.css           # Design tokens, reset, typography, layout shells
│   ├── components.css      # Cards, filter tabs, buttons, badges, spotlight
│   ├── responsive.css      # Mobile-first breakpoints (380px → 1280px+)
│   └── animations.css      # Keyframes, entrance animations, scroll reveals
├── js/
│   ├── main.js             # Entry point — bootstraps all modules on DOMContentLoaded
│   ├── projects.js         # Fetches projects.json, renders hero + cards, manages transitions
│   ├── filters.js          # Category filter state, tab rendering, count computation
│   ├── animations.js       # IntersectionObserver scroll reveal, card exit/enter orchestration
│   └── tilt.js             # 3D tilt + spotlight with spring physics via requestAnimationFrame
├── assets/
│   ├── images/             # Local image assets (currently using Pexels CDN)
│   ├── icons/              # Custom icon assets (currently using inline SVG)
│   └── fonts/              # Local font files (currently using Google Fonts CDN)
├── data/
│   └── projects.json       # All project + curator data — the single source of truth
└── README.md               # You are here
```

---

## Getting Started

### Prerequisites

None. No Node.js, no npm, no build step.

### Local Preview

Because the project uses `fetch()` to load `projects.json`, you need a local web server (opening `index.html` directly via `file://` will fail due to browser CORS restrictions).

```bash
# Option 1: Python 3 (preinstalled on most systems)
cd AP
python3 -m http.server 8000

# Option 2: Node.js (no global install needed)
cd AP
npx serve .

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## Adding Projects

Edit [`data/projects.json`](data/projects.json) and add a new entry to the `projects` array:

```json
{
  "artifactId": "CM-014",
  "title": "Your Project",
  "description": "A one-line description of the project.",
  "image": "https://example.com/thumbnail.jpg",
  "imageAlt": "Alt text for accessibility",
  "year": 2026,
  "previewUrl": "https://your-demo-url.com",
  "repoUrl": "https://github.com/you/repo",
  "techStack": [{ "name": "React" }, { "name": "TypeScript" }],
  "categories": ["Frontend", "Full Stack"]
}
```

### Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `artifactId` | string | Yes | Unique exhibit ID (e.g. `CM-014`) |
| `title` | string | Yes | Project name |
| `description` | string | Yes | One-line description |
| `image` | string | Yes | Thumbnail URL (Pexels, Unsplash, or local) |
| `imageAlt` | string | No | Alt text for the thumbnail (defaults to `"<title> project thumbnail"`) |
| `year` | number | Yes | Year displayed on the card |
| `previewUrl` | string\|null | Yes | Live demo URL. Set to `null` if no deployment — falls back to YouTube |
| `repoUrl` | string | Yes | GitHub repository URL |
| `techStack` | array | Yes | Array of `{ "name": "TechName" }` objects |
| `categories` | array | Yes | Array of category strings (must match entries in the top-level `categories` array) |

### Editing the Curator Profile

Update the `curator` object at the top of `data/projects.json`:

```json
"curator": {
  "name": "Your Name",
  "handle": "yourhandle",
  "tagline": "Your tagline here.",
  "bio": "Your bio here.",
  "location": "Your City, Country",
  "company": "@yourcompany",
  "github": "https://github.com/you",
  "twitter": "https://twitter.com/you",
  "site": "https://your-site.com",
  "avatar": "https://your-avatar-url.com/photo.jpg"
}
```

---

## How It Works

### Architecture

The JavaScript is organized into small, single-responsibility modules exposed on a global `window.Museum*` namespace. No module bundler needed.

| Module | Global | Responsibility |
|--------|--------|----------------|
| `main.js` | — | Entry point. Calls `MuseumProjects.init()` on `DOMContentLoaded` |
| `projects.js` | `MuseumProjects` | Fetches JSON, populates hero, renders cards, coordinates filter callbacks |
| `filters.js` | `MuseumFilters` | Manages active category state, computes counts, renders filter tabs |
| `animations.js` | `MuseumAnimations` | `IntersectionObserver` scroll reveal, card exit/enter orchestration |
| `tilt.js` | `MuseumTilt` | Spring physics 3D tilt + cursor spotlight per card |

### 3D Tilt (Replacing Framer Motion)

The original Next.js card uses Framer Motion's `useSpring` and `useTransform` for smooth tilt. This version reimplements the same spring physics model (stiffness 150, damping 20, mass 0.4) in vanilla JS:

1. `pointermove` sets target values (0..1) for X and Y
2. A `SpringValue` class integrates the spring equation each frame via `requestAnimationFrame`
3. The resulting `rotateX`/`rotateY` and spotlight gradient position are applied as inline styles

### Card Transitions (Replacing AnimatePresence)

Filter changes animate cards out (CSS `card-exit` keyframe), wait for `animationend`, then render new cards with a staggered `card-enter` keyframe. A safety timeout ensures the flow never hangs.

---

## Deploying to GitHub Pages

### Option A: Folder as publishing source

1. Push your repository to GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment → Source**, select **Deploy from a branch**
4. Select your branch (e.g. `main`) and set the **folder** to `/AP`
5. Save — your site will be live at `https://<username>.github.io/<repo>/AP/`

### Option B: Dedicated repository

1. Copy the contents of the `AP/` folder into the root of a new repository named `<username>.github.io`
2. Go to **Settings → Pages** and deploy from the `main` branch root
3. Your site will be live at `https://<username>.github.io/`

### Option C: GitHub Actions (optional)

For automatic deployment on push, add a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy AP to Pages
on:
  push:
    branches: [main]
    paths: ['AP/**']
permissions:
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./AP
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## Tech Stack

| Technology | Used |
|------------|------|
| HTML5 | Yes |
| CSS3 (custom properties, grid, flexbox, backdrop-filter) | Yes |
| Vanilla JavaScript (ES6+, fetch, IntersectionObserver, requestAnimationFrame) | Yes |
| React | No |
| Next.js | No |
| TypeScript | No |
| Tailwind CSS | No |
| Framer Motion | No |
| npm dependencies | None |
| Build tools | None |
| Bundler | None |

---

## License

Open source. Feel free to fork, adapt, and use for your own portfolio.
