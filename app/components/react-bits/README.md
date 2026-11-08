# React Bits adaptations for FRO Solar

Source: https://reactbits.dev/ and https://github.com/DavidHDev/react-bits
Retrieved 8 November 2026 from the official TypeScript/CSS registry. Copyright (c) 2026 David Haz. See LICENSE.md for MIT + Commons Clause terms.

- **PillNav** — https://reactbits.dev/r/PillNav-TS-CSS.json — retained the pill fill and rolling-label interaction; reduced to desktop anchor navigation with Motion's shared-layout active indicator. FRO's existing mobile drawer, focus containment, and scroll locking are retained. Active section follows a requestAnimationFrame-batched passive scroll listener, including on viewport resize.
- **SpotlightCard** — https://reactbits.dev/r/SpotlightCard-TS-CSS.json — retained pointer-relative lighting; simplified to local pointer events and CSS paint, semantic articles, no grain, ambient loops, or global proximity listeners. Touch and reduced-motion visitors receive static styling.
- **CountUp** — https://reactbits.dev/r/CountUp-TS-CSS.json — retained Motion's animate/useInView count interaction; removed rolling-digit and compact-format modes. Final figures render on the server, screen readers receive stable final labels, and reduced-motion preference changes stop animation immediately.

The implementation is adapted source, rather than an unchanged vendor copy. Existing `motion` is used; no new runtime dependency or router is required. Original registry payloads are retained locally under the Git-ignored `source-photos/react-bits` folder.

## Page-specific adaptation

The navigation uses FRO's 12px outer / 8px inner corners. Spotlight service panels use a 4-column photographic layout on desktop, 2 columns on tablet, and 1 column on phones. SystemEnquiry connects each card to the contact section through a small client context around server-rendered main content: selecting a system displays it in the enquiry and prefills the email draft. Clearing selection restores the generic email action and keyboard focus. No email is sent by the page, and no backend or extra package is needed.
