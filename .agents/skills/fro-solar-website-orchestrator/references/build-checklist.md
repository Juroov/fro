# FRO Solar — Build & Deployment Checklist

## Pages & Routes

| Route | Purpose | Status | Notes |
|---|---|---|---|
| `/` | Homepage (Hero, Stats, Services, 3D Installation Walkthrough, About, Projects, Certifications, Contact) | Ready | Fully styled, responsive, Next.js static prerender |
| `/projects` | Dedicated Portfolio / Installations index | Ready | Grid of commercial, residential, and remote projects |
| `/_not-found` | Custom 404 handler | Ready | Default Next.js prerendered 404 |

## Interactive Features & 3D Assets

| Feature | Component | Status | Notes |
|---|---|---|---|
| 3D Solar Villa & Process Walkthrough | `SolarProcess3D.tsx`, `SolarProcessModal.tsx`, `RealisticSolarVilla.tsx` | Ready | 8 installation phases, non-overlapping annotations, glowing beacon pins, orbit controls & reset |
| What We Install Path Gallery UI | `WhatWeInstallPathGallery.tsx` | Ready | 4-step energy conduit rail (01 Grid-Tied, 02 Hybrid, 03 Off-Grid, 04 Turnkey Electrical & Civil), animated power flow schematics, dual-pane showcase & real project credentials |
| Interactive Cards & Animations | `InteractiveCards.tsx` | Ready | Motion / Framer Motion viewport reveal, reduced motion support |
| Smooth Scrolling | `SmoothScrollProvider.tsx` | Ready | Lenis smooth scroll provider |
| Navigation Header | `Navbar.tsx` | Ready | Liquid gliding glass indicator pill (`layoutId` spring physics), pill track, liquid phone capsule, brand aura, sticky backdrop blur, mobile drawer, direct call CTA |

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
