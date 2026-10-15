# FRO Solar — Build & Deployment Checklist

## Pages & Routes

| Route | Purpose | Status | Notes |
|---|---|---|---|
| `/` | Homepage (Hero, Proof, Systems, Projects, About, Process, Estimator, Credentials, Contact) | Ready | Full responsive redesign, Next.js static prerender |
| `/_not-found` | Custom 404 handler | Ready | Default Next.js prerendered 404 |

## Interactive Features & 3D Assets

| Feature | Component | Status | Notes |
|---|---|---|---|
| Solar System Estimator | `SolarEstimator.tsx` | Ready | Responsive worksheet with bespoke appliance SVGs, category/search filters, live load summary, validated custom appliances, editable results, disclosed assumptions, and prefilled estimate email |
| Navigation Header | `Navbar.tsx` | Ready | Lightweight sticky header, accessible mobile drawer, direct call and quote actions |
| Mobile Action Bar | `FloatingCTA.tsx` | Ready | Safe-area-aware persistent Call and Get a Quote actions below 760px |
| Legacy 3D Walkthrough | `SolarProcess3D.tsx`, `SolarProcessModal.tsx`, `RealisticSolarVilla.tsx` | Archived | Files retained but removed from the homepage critical path for mobile performance |
| Legacy Intro and Path Gallery | `SolarIntroAnimation.tsx`, `WhatWeInstallPathGallery.tsx` | Archived | Files retained but no longer shipped on the homepage |

## Credential & Data Audit (vs. `company-facts.md`)

- [x] Legal Entity & Business Permit: Digos LGU No. 2026-1102403000-3925 (Valid until 31 Dec 2026)
- [x] DTI Business Name Registration: No. 5981531 (2024–2029)
- [x] TESDA NC II Electrical Installation: Cert No. 24112402018725 (2024–2029)
- [x] IOSH Managing Safely: Cert No. 9826 (TWI Middle East)
- [x] Founder History: 28 years power industry, 17 years Middle East project management, plants up to 175 MW
- [x] Contact Info: Phone (`082-272-0011` / `0906-366-5473`), Email (`frosolar.energysolutions@gmail.com`), Address (`Sta. Ana Road, Tiguman, Digos City, Davao del Sur`)
- [x] Standard international dial URI (`tel:+639063665473`) across all interactive touchpoints

## Deployment Verification

- [x] TypeScript compiler (`tsc --noEmit`) passes with 0 errors
- [x] Next.js production build (`npm run build`) succeeds cleanly
- [x] All static routes prerendered
- [x] Responsive layout verified (mobile, tablet, desktop)

## Session Log

- **2026-09-09**: QA audit completed for initial deployment. Resolved 3D annotation collisions with staggered altitudes and leader pins. Verified phone dial formats, location links, metadata, and production build artifact generation.
- **2026-09-11**: Cross-platform responsiveness overhaul across mobile (320px–430px), tablet (768px–1024px), and desktop. Implemented fluid clamp typography, mobile touch-first header with 1-tap call button and auto-closing drawer, responsive 2x2 credentials stats cards, responsive grid wraps, mobile-adapted 3D modal HUD telemetry, and verified zero horizontal overflow across devices.
- **2026-09-11 (Path Gallery Transformation)**: Redesigned the "What We Install" (`#services`) section from a static 4-card grid into an interactive Path Gallery UI. Added an illuminated 4-waypoint energy conduit rail, dynamic dual-pane gallery stage with custom high-res jobsite photography, interactive 4-node power flow schematics, verified real-world project credentials (RJL Ricemill, Lt. Col. Solamo, Malita Elementary, Camp Sabros), and seamless integration with the 3D walkthrough feature banner.
- **2026-09-11 (Liquid Navbar Hover)**: Implemented an organic liquid hover system on the desktop navbar (`Navbar.tsx` & `globals.css`) with a sleek pill track container, Framer Motion shared layout spring indicator pill (`layoutId="fro-navbar-liquid-pill"`), specular glare highlight, core ambient glow, liquid glass phone action pill, brand aura, and reduced motion accommodation.
- **2026-09-11 (What We Install Phone Responsiveness & Visual Parity)**: Re-engineered `WhatWeInstallPathGallery.tsx` and `globals.css` so that on mobile phones (320px–430px) the section possesses identical visual completeness and structure to desktop. Replaced cut-off horizontal scrolling rail with a balanced 2×2 mobile selector grid ensuring all 4 paths are visible at once, added `shortTitle` tokens to prevent string truncation, calibrated photo aspect ratio and compact floating badges, introduced 2×2 connected energy circuit arrows (`1 → 2 ↓ 3 → 4`), balanced the 2×2 metrics grid, and converted the assessment button to a full-width mobile CTA.
- **2026-09-11 (Core Container Gutters & Feature Banner Phone Parity)**: Refactored `.fro-section` to vertical-only padding (`padding-top: 3.5rem; padding-bottom: 3.5rem;`) removing double horizontal gutter padding that robbed 32px of screen width on phones. Replaced fixed `minWidth: 260` with `minWidth: 0` in `app/page.tsx#L385` and eliminated a duplicate desktop-sized padding override (`2.25rem 2.75rem`) in `globals.css` on the 3D walkthrough feature banner, ensuring effortless edge-to-edge layout parity on all phones.
- **2026-10-14 (Full UI/UX & Responsive Redesign)**: Rebuilt the homepage around a trust-first conversion flow: concise image-led hero, proof strip, responsive system cards, real project evidence, founder experience, four-step process, estimator, verified credentials, and direct contact. Replaced the blocking splash, smooth-scroll provider, 3D walkthrough, and dense path gallery in the critical path with server-rendered content and small client boundaries. Added a lightweight accessible mobile drawer, safe-area mobile action bar, Lucide icon system, 320px responsive rules, reduced-motion handling, corrected estimator contact data, and verified lint, TypeScript, and the Next.js production build.
- **2026-10-14 (Estimator UI/UX)**: Replaced the cramped appliance grid with a responsive worksheet and selection summary, using bespoke appliance drawings and no emoji. Fixed custom appliance visibility/selection, unit counts, search trimming, reset, and result editing. Preserved sizing calculations and disclosed assumptions. Browser checks covered quantities, search/no-results, custom validation, three steps, email summary, reset, and 320px/390px/768px/1440px widths without overflow. TypeScript, targeted ESLint, calculation checks, and production build passed.
