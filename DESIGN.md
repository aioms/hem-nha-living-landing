# nagicreative DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 2 · Components: 0
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: subtle

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![nagicreative Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a neutral, approachable feel. The light background emphasizes content clarity. Typography pairs **Cormorant Garamond** for display/headings with **Jost** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. Motion is subtle — smooth transitions (150-300ms) ease state changes without drawing attention.

---

## 2. Color Palette & Roles (Official Guideline)

### Primary Colors
| Color | Hex | Role | Meaning |
|---|---|---|---|
| **Deep Slate** | `#4F6B73` | primary | The primary brand color, representing stability, tranquility, and trust. |
| **Sage Green** | `#79A594` | primary-accent | Inspired by nature, bringing freshness, balance, and a slower pace of living. |
| **Terracotta** | `#AE7055` | primary-accent | Reflects the warmth of clay, traditional rooftops, and the timeless charm of old Saigon. |

### Supporting Colors
| Color | Hex | Role | Meaning |
|---|---|---|---|
| **Warm Sand** | `#D9C7B0` | surface-warm | Adds softness, warmth, and an inviting atmosphere. |
| **Soft Concrete** | `#9A958F` | text-muted / border | Inspired by weathered concrete walls found throughout Saigon's alleyways. |
| **Misty Blue** | `#6D82B1` | secondary-accent | A subtle accent that introduces depth, serenity, and visual balance. |

### Surface & Functional Roles
| Token | Hex | Role | Use |
|---|---|---|---|
| `page-bg` | `#FAF6F0` | surface | Page canvas and light section backgrounds |
| `card-bg` | `#F4ECE1` | surface | Card, modal and panel backgrounds |
| `dark-section` | `#1E2A2E` | surface | Cafe Hẻm, Night Room, and Footer backgrounds |
| `text-dark` | `#223035` | text-primary | Headings and high-contrast titles |
| `text-body` | `#2B383C` | text-body | Standard body text |
| `text-muted` | `#9A958F` | text-muted | Secondary labels, captions, metadata |



---

## 3. Typography Rules

**Font Stack:**
- **Be Vietnam Pro** (`Be Vietnam`) — Heading 1, Heading 2, Heading 3, Section Titles, Buttons, Navigation, Labels, and UI
- **Cormorant Garamond** — Optional editorial accents / quotes
- **Pinyon Script** — Decorative cursive badges

**Font Sources:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
```

| Role | Font | Weight |
|---|---|---|
| Heading 1 (Hero & Main Display) | Be Vietnam Pro | 400 - 600 |
| Heading 2 (Section Headers) | Be Vietnam Pro | 500 - 600 |
| Heading 3 (Card Titles) | Be Vietnam Pro | 500 - 600 |
| Buttons & Interactive CTAs | Be Vietnam Pro | 500 |
| Navigation & Tags | Be Vietnam Pro | 400 - 500 |
| Body Text | Be Vietnam Pro | 400 |

**Typographic Rules (Fixed Standard):**
- Headers, Titles, and Buttons **must permanently use Be Vietnam Pro** across all landing page sections and modals.
- Maintain clear visual hierarchy with consistent weight and line heights (1.1–1.2 for headings, 1.6 for body).


---

## 4. Component Stylings

No components detected. Scan `src/components/` or `components/` to populate this section.

---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** 3px, 9px, 10px, 12px, 14px, 16px, 999px
- **Max content width:** 1280px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Flat — subtle depth hints

- `0 1px 0 var(--hair)`
- `0 1px 0 0 var(--gold)`

### Raised — cards, buttons, interactive elements

- `0 0 0 6px color-mix(in srgb,var(--gold) 18%,transparent)`
- `color(srgb 0.745098 0.603922 0.4 / 0.18) 0px 0px 0px 6px`

### Floating — dropdowns, popovers, modals

- `0 0 18px #d8bc8ea6`
- `rgba(216, 188, 142, 0.65) 0px 0px 18px 0px`

### Overlay — full-screen overlays, top-level dialogs

- `0 10px 28px -12px #0a101c8c`
- `0 16px 34px -12px #0a101c99`
- `0 34px 70px -32px #22303f75`

### Z-Index Scale

`1, 2, 3, 4, 190, 200, 240, 300`



---

## 7. Animation & Motion

This project uses **subtle motion**. Transitions smooth state changes without demanding attention.

### CSS Animations

- `@keyframes nagiRipple`
- `@keyframes _sheenSweep_5qldj_1`
- `@keyframes _tickerDrift_1l1jo_1`

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Pair **Jost** (body) with **Cormorant Garamond** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: 3px, 9px, 10px, 12px, 14px

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Jost and Cormorant Garamond
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

No breakpoints detected. Consider adding responsive breakpoints to the design system.

---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #22303f
Border: 1px solid #6f6559
Radius: 12px
Padding: 16px
Font: Jost
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg var(--accent), text white
Ghost: bg transparent, border #6f6559
Padding: 8px 16px
Radius: 12px
Hover: opacity 0.9 or lighter shade
Focus: ring with var(--accent)
```

### Build a Page Layout

```
Background: var(--background)
Max-width: 1280px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #22303f
Label: #364252 (muted, 12px, uppercase)
Value: #f2e9da (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: var(--background)
Input border: 1px solid #6f6559
Focus: border-color var(--accent)
Label: #364252 12px
Spacing: 16px between fields
Radius: 12px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Jost, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```
