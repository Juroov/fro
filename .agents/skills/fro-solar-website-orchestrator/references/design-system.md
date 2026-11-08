# FRO Solar — Design System

Derived from the company's existing logo and company-profile deck. Apply
these consistently so pages built in different sessions still look like one
site. If the user later shares an official brand book, replace this file with
it wholesale rather than layering exceptions on top.

## Color tokens

| Token | Approx. hex | Use |
|---|---|---|
| `--fro-teal-dark` | #0E4B48 | Primary brand color — headers, hero backgrounds, footer |
| `--fro-green-accent` | #8DC63F | Buttons, highlights, icons, active states |
| `--fro-orange-accent` | #F7941D | Secondary accent — used sparingly (e.g. certifications/permits sections, badges) |
| `--fro-white` | #FFFFFF | Body backgrounds, text on dark |
| `--fro-ink` | #1A1A1A | Body text on light backgrounds |

Treat these as a starting point, not gospel — sample actual pixel values from
the logo file or profile PDF if precision matters, and confirm with the user
before shipping a final palette.

## Shape language

The brand deck uses **large soft-edged hexagons and rounded blob shapes** in
the accent green, often bleeding off the edge of the frame, plus a dotted
"stipple" pattern as a light textural accent. Carry this into the website as:

- A hexagon or rounded-blob shape breaking the edge of hero sections
- Dot-grid textures as subtle section dividers, not full backgrounds
- Rounded corners generally (cards, buttons, images) rather than sharp edges

## Typography

- **Headings:** a bold, rounded, geometric sans (e.g. Poppins, Montserrat,
  or system equivalent) — the logo/deck headings are heavy-weight and
  confident.
- **Body:** a clean, highly legible sans (e.g. Inter, Open Sans).
- Keep heading sizes large and confident on the homepage hero — the source
  deck uses oversized type ("Company Profile") as a design feature, not just
  informational text.

## Imagery style

- Real jobsite photography: installers on corrugated metal or concrete
  roofs, panels being wired, PPE/harnesses visible, tropical/Philippine
  setting (palm trees, provincial rooftops). Avoid generic stock-photo solar
  panel close-ups with no human presence — the existing brand deck leans on
  authentic field photos, which builds more trust for a small local
  installer.
- Use `image_search` for supporting stock imagery (e.g. a generic "family
  home rooftop solar Philippines" shot for a services page) but prefer the
  client's own project photos wherever the task provides them.

## Logo usage

- Logo mark: a stylized house/roof with solar panels and a rising sun, teal
  and green, with "FRO" wordmark and the tagline "SOLAR ENERGY SOLUTION /
  Empowering your home with Sun's brilliance" beneath it.
- Always pair the mark with the full company name on first appearance on a
  page ("Fro Solar Power Installation Services"), and the mark alone in
  repeated placements (nav bar, footer).

## Tone of voice

Confident and technically credible (28 years' experience, Middle East power
plant background) but warm and locally grounded (family homes, local
businesses, "empowering your home"). Avoid over-technical jargon on
homepage/marketing copy — save kW/kWh specifics for the Projects and
technical sections where credibility matters most.

## Current homepage refinements — 8 Nov 2026

Impeccable polish preserves the teal/green identity, Montserrat, existing facts, and project photography. Headings use 700 weight, restrained negative tracking (−0.025 to −0.035em), and wider measures; desktop display caps are 80px for H1 and 48px for H2. Supporting service text is 15px, fitting details 14px, and credential details 14px. The darker detail green is #47751B for text contrast on light surfaces.

Use direct headings without repeated eyebrow labels. Reserve numbers for meaningful sequences such as installation steps. Projects use image-led layouts with open captions rather than outer card borders. Preserve the native expandable albums, accessible photo viewer, 4K access, and AI-enhancement labels. The homepage opens directly without the splash overlay. Keep the skip link, keyboard-contained mobile menu, inert background, and focus restoration.

## React Bits interaction layer — 8 Nov 2026

Use the adapted PillNav for desktop section navigation, SpotlightCard for service panels, and CountUp for the existing experience figures. Keep FRO palette tokens, a stable accessible number label, reduced-motion/static fallbacks, no ambient motion or grain, and the existing mobile drawer behavior. Keep all contact and image-viewing paths explicit. No new runtime dependencies are required. Source adaptations and license are documented in app/components/react-bits.

### Page-specific React Bits behavior

Service panels lead with project photographs in four desktop, two tablet, and one phone column. Their Plan this system controls carry the choice into Contact and the email draft; visitors can clear or change it. Keep the enquiry visibly contextual without adding a modal or mandatory form. Navigation uses the page's 12px outer and 8px inner corner language. Preserve static/reduced-motion fallbacks and source-photo quality.
