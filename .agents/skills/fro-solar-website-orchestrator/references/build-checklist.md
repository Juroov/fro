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
| Interactive Cards & Animations | `InteractiveCards.tsx` | Ready | Motion / Framer Motion viewport reveal, reduced motion support |
| Smooth Scrolling | `SmoothScrollProvider.tsx` | Ready | Lenis smooth scroll provider |
| Navigation Header | `Navbar.tsx` | Ready | Sticky backdrop blur, mobile drawer, direct call CTA |

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
