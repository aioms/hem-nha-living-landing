---
name: nagicreative-design
description: Design system skill for nagicreative. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX. Includes ultra-mode visual journey: read references/ANIMATIONS.md, references/LAYOUT.md, references/COMPONENTS.md, and references/INTERACTIONS.md for full motion and layout details.
---

# nagicreative Design System

You are building UI for **nagicreative**. Light-themed, neutral palette, serif typography (Jost), compact density on a 4px grid.

## Visual Reference

**IMPORTANT**: Study ALL screenshots below before writing any UI. Match colors, typography, spacing, layout, and motion exactly as shown.

### Homepage

![nagicreative Homepage](screenshots/homepage.png)

### Scroll Journey (Cinematic Visual States)

> These screenshots capture the website at different scroll depths. The design changes dramatically as you scroll — each frame shows a different cinematic state. Replicate these exact visual transitions.

#### 0% — Hero / Above the fold

![Scroll 0%](screens/scroll/scroll-000.png)

#### 17% — Mid-page at 17% scroll

![Scroll 17%](screens/scroll/scroll-017.png)

#### 33% — Mid-page at 33% scroll

![Scroll 33%](screens/scroll/scroll-033.png)

#### 50% — Mid-page at 50% scroll

![Scroll 50%](screens/scroll/scroll-050.png)

#### 67% — Mid-page at 67% scroll

![Scroll 67%](screens/scroll/scroll-067.png)

#### 83% — Mid-page at 83% scroll

![Scroll 83%](screens/scroll/scroll-083.png)

#### 100% — Footer / End of page

![Scroll 100%](screens/scroll/scroll-100.png)

> Read `references/DESIGN.md` for full token details. Read `references/ANIMATIONS.md` for motion specs. Read `references/LAYOUT.md` for layout structure. Read `references/COMPONENTS.md` for component patterns.

## Ultra Reference Files

This package includes extended documentation. **Read these files before implementing:**

| File | Contents |
|------|----------|
| `references/DESIGN.md` | Full design system tokens, colors, typography, spacing |
| `references/VISUAL_GUIDE.md` | **START HERE** — Master visual guide with all screenshots embedded |
| `references/ANIMATIONS.md` | CSS keyframes, scroll triggers, motion library stack, video specs |
| `references/LAYOUT.md` | Flex/grid containers, page structure, spacing relationships |
| `references/COMPONENTS.md` | DOM component patterns, HTML structure, class fingerprints |
| `references/INTERACTIONS.md` | Hover/focus states with before/after style diffs |
| `screens/scroll/` | 7 scroll journey screenshots showing cinematic states |

### Animation Stack Detected

- **Web Animations API (1 active)** — animation

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Type pairing** — Jost for body/UI text, Cormorant Garamond for headings/display. Never introduce a third typeface.
- **compact density** — 4px base grid. Every dimension is a multiple of 4.
- **neutral palette** — the color temperature runs neutral, matching the serif typography.
- **Subtle motion** — transitions smooth state changes. Keep durations under 300ms, use ease-out curves.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Surface | `--surface` | `#22303f` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#f2e9da` | Headings, body text |
| Text Muted | `--text-muted` | `#364252` | Captions, placeholders |
| Border | `--border` | `#6f6559` | Dividers, card borders |

### Status Colors

| Status | Hex | Use |
|--------|-----|-----|
| Warning | `#866437` | Caution states, pending items |

### Extended Palette

- `#4e5765`
- **muted:** `#8e8474` — Secondary text, placeholder text
- `#be9a66`
- `#d8bc8e`
- `#cfcfcc`
- `#c8c4bd`
- `#7a746c`
- `#121a2a` — Deep background layer or shadow color

### CSS Variable Tokens

```css
--font-accent: "Pinyon Script",cursive;
--muted: #8e8474;
--card: #f8f1e3;
--card-edge: #22303f1a;
--card: #fbf5e8;
--muted: #79683f;
--card: #f4e8d2;
--card-edge: #2d33421f;
--muted: #a6aec1;
--card: #3a4b6a;
--card-edge: #f0e7d524;
--muted: #8e97ad;
--card: #1a2438;
--card-edge: #ede3cf21;
```

## Typography

### Font Stack

- **Jost** — Heading 1, Heading 2, Heading 3
- **Cormorant Garamond** — Body, Caption

### Font Sources

```css
@font-face {
  font-family: "Cormorant Garamond";
  src: url("fonts/CormorantGaramond-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Cormorant Garamond";
  src: url("fonts/CormorantGaramond-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Jost";
  src: url("fonts/Jost-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Jost";
  src: url("fonts/Jost-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Pinyon Script";
  src: url("fonts/PinyonScript-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | Jost | 360px | 700 |
| Heading 2 | Jost | 300px | 700 |
| Heading 3 | Jost | 240px | 700 |
| Body | Cormorant Garamond | 11px | 400 |
| Caption | Cormorant Garamond | 15px | 400 |

### Typography Rules

- Body/UI: **Jost**, Headings: **Cormorant Garamond** — these are the only display fonts
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 4px

Every dimension (margin, padding, gap, width, height) must be a multiple of **4px**.

### Spacing Scale

`2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 4-8px | Tight: related items (icon + label, avatar + name) |
| 12-16px | Medium: between groups within a section |
| 24-32px | Wide: between distinct sections |
| 48px+ | Vast: major page section breaks |

### Border Radius

Scale: `3px, 9px, 10px, 12px, 14px, 16px, 999px`
Default: `12px`

### Container

Max-width: `1280px`, centered with auto margins.

## Component Patterns

### Card

```css
.card {
  background: #22303f;
  border: 1px solid #6f6559;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 0 0 6px color-mix(in srgb,var(--gold) 18%,transparent);
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #cccccc;
  color: #f2e9da;
  border-radius: 12px;
  padding: 8px 16px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #6f6559;
  color: #f2e9da;
  border-radius: 12px;
  padding: 8px 16px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #cccccc;
  border: 1px solid #6f6559;
  border-radius: 12px;
  padding: 8px 12px;
  color: #f2e9da;
  font-size: 14px;
}
.input:focus { border-color: var(--accent); outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #22303f;
  color: #364252;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #22303f;
  border: 1px solid #6f6559;
  border-radius: 999px;
  padding: 24px;
  max-width: 480px;
  width: 90vw;
  box-shadow: 0 0 18px #d8bc8ea6;
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 12px;
  color: #364252;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #6f6559;
}
.table td {
  padding: 12px;
  border-bottom: 1px solid #6f6559;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #6f6559;
}
.nav-link {
  color: #364252;
  padding: 8px 12px;
  border-radius: 12px;
  transition: color 150ms;
}
.nav-link:hover { color: #f2e9da; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

## Animation & Motion

This project uses **subtle motion**. Transitions smooth state changes without calling attention.

### CSS Animations

- `nagiRipple`
- `_sheenSweep_5qldj_1`
- `_tickerDrift_1l1jo_1`

### Motion Tokens

- **Duration scale:** `300ms`, `350ms`, `400ms`, `450ms`, `500ms`, `550ms`, `600ms`, `800ms`, `1100ms`
- **Easing functions:** `cubic-bezier(.2,.7,.2,1)`
- **Animated properties:** `background-color`, `color`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (300ms) for micro-interactions, long (1100ms) for page transitions
- **Easing:** Use `cubic-bezier(.2,.7,.2,1)` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Subtle: `0 1px 0 var(--hair)`
- Subtle: `0 1px 0 0 var(--gold)`
- Raised (cards, buttons): `0 0 0 6px color-mix(in srgb,var(--gold) 18%,transparent)`
- Raised (cards, buttons): `color(srgb 0.745098 0.603922 0.4 / 0.18) 0px 0px 0px 6px`
- Floating (dropdowns, popovers): `0 0 18px #d8bc8ea6`
- Floating (dropdowns, popovers): `rgba(216, 188, 142, 0.65) 0px 0px 18px 0px`

### Z-Index Scale

`1, 2, 3, 4, 190, 200, 240, 300`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 4px
- **No extra fonts** — only Jost and Cormorant Garamond are allowed
- **No arbitrary border-radius** — use the scale: 3px, 9px, 10px, 12px, 14px, 16px, 999px
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — Jost, Cormorant Garamond only, using the type scale
4. **Build layout** on the 4px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/favicon.ico`
- **Site URL:** `https://www.nagicreative.com/`
- **Brand typeface:** Jost

## Quick Reference

```
Background:     (not extracted)
Surface:        #22303f
Text:           #f2e9da / #364252
Accent:         (not extracted)
Border:         #6f6559
Font:           Jost
Spacing:        4px grid
Radius:         12px
Components:     0 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for nagicreative
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "nagicreative" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

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

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| card-edge | `#22303f` | surface | Card and panel backgrounds |
| card | `#fbf5e8` | surface | Card and panel backgrounds |
| card | `#1a2438` | surface | Card and panel backgrounds |
| theme-color | `#f2e9da` | text-primary | Headings and body text |
| text-primary | `#444444` | text-primary | Headings and body text |
| text-muted | `#364252` | text-muted | Captions, placeholders, secondary info |
| border | `#6f6559` | border | Dividers, card borders, outlines |
| warning | `#866437` | warning | Warning states, caution indicators |
| info | `#121a2a` | info | Informational highlights |
| unknown | `#4e5765` | unknown | Palette color |
| muted | `#8e8474` | unknown | Palette color |
| unknown | `#be9a66` | unknown | Palette color |
| unknown | `#d8bc8e` | unknown | Palette color |
| unknown | `#cfcfcc` | unknown | Palette color |
| unknown | `#c8c4bd` | unknown | Palette color |
| unknown | `#7a746c` | unknown | Palette color |
| unknown | `#000000` | unknown | Palette color |
| unknown | `#e4e4e2` | unknown | Palette color |
| unknown | `#e9ddca` | unknown | Palette color |
| unknown | `#8089a0` | unknown | Palette color |

### CSS Variable Tokens

```css
--font-accent: "Pinyon Script",cursive;
--muted: #8e8474;
--card: #f8f1e3;
--card-edge: #22303f1a;
--card: #fbf5e8;
--muted: #79683f;
--card: #f4e8d2;
--card-edge: #2d33421f;
--muted: #a6aec1;
--card: #3a4b6a;
--card-edge: #f0e7d524;
--muted: #8e97ad;
--card: #1a2438;
--card-edge: #ede3cf21;
```


---

## 3. Typography Rules

**Font Stack:**
- **Jost** — Heading 1, Heading 2, Heading 3
- **Cormorant Garamond** — Body, Caption

**Font Sources:**

```css
@font-face {
  font-family: "Cormorant Garamond";
  src: url("fonts/CormorantGaramond-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Cormorant Garamond";
  src: url("fonts/CormorantGaramond-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Jost";
  src: url("fonts/Jost-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Jost";
  src: url("fonts/Jost-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Pinyon Script";
  src: url("fonts/PinyonScript-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Jost | 360px | 700 |
| Heading 2 | Jost | 300px | 700 |
| Heading 3 | Jost | 240px | 700 |
| Body | Cormorant Garamond | 11px | 400 |
| Caption | Cormorant Garamond | 15px | 400 |

**Typographic Rules:**
- Limit to 2 font families max per screen
- Use **Jost** for body/UI text, **Cormorant Garamond** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


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

## Visual Guide — Screenshots (VISUAL_GUIDE.md)

# nagicreative — Visual Guide

> Master visual reference. Study every screenshot carefully before implementing any UI.
> Match colors, layout, typography, spacing, and motion states exactly.

**Motion Stack:** **Web Animations API (1 active)**

## Scroll Journey

The page has cinematic scroll animations. Each screenshot below shows the exact visual state at that scroll depth.
**Replicate these transitions precisely** — the design changes dramatically as you scroll.

### Hero — Above the fold

*Scroll position: 0px of 13088px total*

![Hero — Above the fold](../screens/scroll/scroll-000.png)

### 17% scroll depth

*Scroll position: 2072px of 13088px total*

![17% scroll depth](../screens/scroll/scroll-017.png)

### 33% scroll depth

*Scroll position: 4022px of 13088px total*

![33% scroll depth](../screens/scroll/scroll-033.png)

### 50% scroll depth

*Scroll position: 6094px of 13088px total*

![50% scroll depth](../screens/scroll/scroll-050.png)

### 67% scroll depth

*Scroll position: 8166px of 13088px total*

![67% scroll depth](../screens/scroll/scroll-067.png)

### 83% scroll depth

*Scroll position: 10116px of 13088px total*

![83% scroll depth](../screens/scroll/scroll-083.png)

### Footer — End of page

*Scroll position: 12188px of 13088px total*

![Footer — End of page](../screens/scroll/scroll-100.png)

## Full Page Screenshots

### Nagi Creative | Hospitality Web Design Studio

*URL: `https://www.nagicreative.com/`*

![Nagi Creative | Hospitality Web Design Studio](../screens/pages/home.png)

### Free Tools for Restaurants and Cafes | Nagi Creative

*URL: `https://www.nagicreative.com/tools/`*

![Free Tools for Restaurants and Cafes | Nagi Creative](../screens/pages/tools.png)

### Insights for Hospitality Owners | Nagi Creative

*URL: `https://www.nagicreative.com/insights/`*

![Insights for Hospitality Owners | Nagi Creative](../screens/pages/insights.png)

### Restaurant Website Check for US$35 | Nagi Creative

*URL: `https://www.nagicreative.com/website-check/`*

![Restaurant Website Check for US$35 | Nagi Creative](../screens/pages/website-check.png)

### How We Score Restaurant Websites | Nagi Creative

*URL: `https://www.nagicreative.com/insights/how-we-score-restaurant-websites/`*

![How We Score Restaurant Websites | Nagi Creative](../screens/pages/insights-how-we-score-restaurant-websites.png)

## Section Screenshots

Clipped sections showing individual components in context.

### Section 1 — `section`

*1440×900px*

![Section 1](../screens/sections/home-section-1.png)

### Section 1 — `section`

*1180×347px*

![Section 1](../screens/sections/tools-section-1.png)

### Section 2 — `section`

*1180×730px*

![Section 2](../screens/sections/tools-section-2.png)

### Section 1 — `section`

*1180×352px*

![Section 1](../screens/sections/insights-section-1.png)

### Section 2 — `section`

*1180×1200px*

![Section 2](../screens/sections/insights-section-2.png)

### Section 3 — `section`

*1180×912px*

![Section 3](../screens/sections/insights-section-3.png)

### Section 1 — `section`

*1180×913px*

![Section 1](../screens/sections/website-check-section-1.png)

### Section 1 — `main > div`

*1180×1200px*

![Section 1](../screens/sections/insights-how-we-score-restaurant-websites-section-1.png)

## Animations & Motion (ANIMATIONS.md)

# Animation Reference

> Cinematic motion design extracted from live DOM. Follow these specs exactly to recreate the experience.

## Motion Technology Stack

| Library | Type | Notes |
|---------|------|-------|
| **Web Animations API (1 active)** | animation |  |
| Canvas (1 elements) | 2D Canvas | 2D canvas rendering |

## Scroll Journey

The page is **13,088px** tall. Each frame below shows what the user sees at that scroll depth.

> **Use these screenshots to understand WHAT animates, WHEN it animates, and HOW it moves.**

### 0% — Top / Hero
Scroll position: 0px

![Scroll 0%](../screens/scroll/scroll-000.png)

### 17% — Opening Section
Scroll position: 2,072px

![Scroll 17%](../screens/scroll/scroll-017.png)

### 33% — First Feature Section
Scroll position: 4,022px

![Scroll 33%](../screens/scroll/scroll-033.png)

### 50% — Mid-Page
Scroll position: 6,094px

![Scroll 50%](../screens/scroll/scroll-050.png)

### 67% — Lower Content
Scroll position: 8,166px

![Scroll 67%](../screens/scroll/scroll-067.png)

### 83% — Near Footer
Scroll position: 10,116px

![Scroll 83%](../screens/scroll/scroll-083.png)

### 100% — Bottom / Footer
Scroll position: 12,188px

![Scroll 100%](../screens/scroll/scroll-100.png)

## Scroll Animation Patterns

| Pattern | Library | Element Count | Duration | Delay | Easing |
|---------|---------|---------------|----------|-------|--------|
| parallax / sticky scroll | CSS | 1 | — | — | — |

### CSS Implementation

## CSS Keyframes (3 extracted)

### `@keyframes nagiRipple`

Duration: `0.9s` · Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.nagi-ripple`

```css
@keyframes nagiRipple {
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}
```

> Fade + motion enter animation

### `@keyframes _sheenSweep_5qldj_1`

Duration: `1.1s` · Easing: `cubic-bezier(0.3, 0.6, 0.3, 1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `._row_5qldj_15:hover ._sheen_5qldj_66`

```css
@keyframes _sheenSweep_5qldj_1 {
  100% {
    transform: skew(-14deg) translate(420%);
  }
}
```

> Transform/motion animation

### `@keyframes _tickerDrift_1l1jo_1`

Duration: `60s` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `._tickerTrack_1l1jo_109`

```css
@keyframes _tickerDrift_1l1jo_1 {
  0% {
    transform: translate(0px);
  }
  100% {
    transform: translate(-50%);
  }
}
```

> Transform/motion animation

## Global Transition Declarations

These `transition` values were extracted from CSS rules across the site:

```css
transition: background-color 1.1s, color 1.1s;
transition: color 1.1s;
transition: transform 0.3s, background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s;
transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
transition: opacity 0.8s, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), background-color 0.5s, -webkit-backdrop-filter 0.5s, backdrop-filter 0.5s, box-shadow 0.5s, padding 0.5s;
transition: opacity 1.1s;
transition: color 0.3s;
transition: right 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
transition: opacity 0.5s, visibility 0.5s;
transition: opacity 0.55s, transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1);
```

## How to Recreate This Motion Design

### Step 1 — Install Dependencies

```bash
```

### Step 2 — Scroll-Reveal Pattern

Elements that animate into view follow this pattern:

```css
/* Initial hidden state */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1),
              transform 1.1s cubic-bezier(0.4, 0, 0.2, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Step 3 — Key Motion Principles

- **Canvas elements (1)** — animated via requestAnimationFrame loop. Use canvas for particle effects, gradient animations, and WebGL scenes
- **Duration scale:** `1.1s` · `0.3s` — use these values, never invent new durations
- **Always add** `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

### Step 4 — Scroll Journey Reference

Match what happens at each scroll position:

- **0%** (`0px`) → `screens/scroll/scroll-000.png`
- **17%** (`2072px`) → `screens/scroll/scroll-017.png`
- **33%** (`4022px`) → `screens/scroll/scroll-033.png`
- **50%** (`6094px`) → `screens/scroll/scroll-050.png`
- **67%** (`8166px`) → `screens/scroll/scroll-067.png`
- **83%** (`10116px`) → `screens/scroll/scroll-083.png`
- **100%** (`12188px`) → `screens/scroll/scroll-100.png`

## Layout & Grid (LAYOUT.md)

# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `header._nav_1ed75_1` | row | — | center | 36px | 4 |
| `section#top._hero_o5zyg_1` | row | — | center | — | 2 |
| `nav._sheetLinks_1ed75_139` | column | — | — | 6px | 7 |
| `div._card_wvrp3_28` | column | — | — | — | 5 |
| `div._card_wvrp3_28._featured_wvrp3_45` | column | — | — | — | 6 |
| `div._card_wvrp3_28` | column | — | — | — | 5 |
| `div._browserBar_o5zyg_121` | row | — | center | 18px | 2 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div._grid_wvrp3_21` | `374.656px 374.672px 374.656px` | 22px | 3 |
| `div._rows_ya89e_23` | `1168px` | 144px | 3 |
| `div._row_5qldj_15` | `72px 469.328px 554.672px` | 28px | 4 |
| `div._row_5qldj_15` | `72px 469.328px 554.672px` | 28px | 4 |
| `div._row_5qldj_15` | `72px 469.328px 554.672px` | 28px | 4 |
| `div._row_5qldj_15` | `72px 469.328px 554.672px` | 28px | 4 |
| `div._row_5qldj_15` | `72px 469.328px 554.672px` | 28px | 4 |
| `a._row_ya89e_23` | `639.328px 456.672px` | 72px | 2 |
| `a._row_ya89e_23._rowFlip_ya89e_34` | `456.656px 639.344px` | 72px | 2 |
| `a._row_ya89e_23` | `639.328px 456.672px` | 72px | 2 |

## Structural Containers

### `<header>` (`header._nav_1ed75_1`)

```
display:          flex
flex-direction:   row
justify-content:  —
align-items:      center
gap:              36px
padding:          20px 48px
children:         4
```

### `<footer>` (`footer._ft_1l1jo_1`)

```
display:          block
padding:          30px 0px 36px
children:         5
```

### `<section>` (`section#top._hero_o5zyg_1`)

```
display:          flex
flex-direction:   row
justify-content:  —
align-items:      center
padding:          140px 0px 86px
children:         2
```

### `<section>` (`section._sec_y2dy1_1`)

```
display:          block
children:         1
```

### `<section>` (`section#services._sec_5qldj_1`)

```
display:          block
padding:          140px 0px 120px
children:         1
```

### `<section>` (`section#work._sec_ya89e_1`)

```
display:          block
padding:          150px 0px 60px
children:         1
```

### `<section>` (`section._sec_1psd4_1`)

```
display:          block
padding:          130px 0px
children:         1
```

### `<section>` (`section._testi_1kw83_1`)

```
display:          block
padding:          150px 0px
children:         1
```

### `<section>` (`section#process._process_1ha7a_1`)

```
display:          block
padding:          130px 0px
children:         1
```

### `<section>` (`section#pricing._pricing_wvrp3_1`)

```
display:          block
padding:          140px 0px 120px
children:         1
```

### `<section>` (`section#insights._section_1vwkn_1`)

```
display:          block
padding:          150px 0px
children:         1
```

### `<section>` (`section#contact._contact_w820u_1`)

```
display:          block
padding:          60px 0px 150px
children:         1
```

## Layout Rules

- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

## Component Patterns (COMPONENTS.md)

# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **SheetKanji 1ed75 129** | unknown | 71× | `._sheetKanji_1ed75_129` |
| **DefText Y2dy1 102** | unknown | 26× | `._defText_y2dy1_102` |
| **Title 5qldj 38** | unknown | 16× | `._title_5qldj_38` |
| **Sec Y2dy1 1** | unknown | 9× | `._sec_y2dy1_1` |
| **Inner O5zyg 22** | unknown | 6× | `._inner_o5zyg_22`, `.wrap` |
| **Scriptline O5zyg 50** | unknown | 6× | `._scriptline_o5zyg_50`, `.script` |
| **Sticky Y2dy1 6** | unknown | 6× | `._sticky_y2dy1_6` |
| **FrameMorning O5zyg 166** | unknown | 5× | `._frameMorning_o5zyg_166`, `._smallFrame_o5zyg_99` |
| **H2 5qldj 5** | unknown | 5× | `._h2_5qldj_5` |
| **Row 5qldj 15** | unknown | 5× | `._row_5qldj_15` |
| **Body 5qldj 49** | unknown | 5× | `._body_5qldj_49` |
| **StudioNote O5zyg 182** | unknown | 4× | `._studioNote_o5zyg_182` |
| **TplGrid 1psd4 78** | unknown | 4× | `._tplGrid_1psd4_78` |
| **SheetMail 1ed75 156** | unknown | 3× | `._sheetMail_1ed75_156` |
| **Canvas O5zyg 92** | unknown | 3× | `._canvas_o5zyg_92` |
| **Head 5qldj 3** | unknown | 3× | `._head_5qldj_3` |
| **Row Ya89e 23** | unknown | 3× | `._row_ya89e_23` |
| **Copy Ya89e 81** | unknown | 3× | `._copy_ya89e_81` |
| **Features Wvrp3 118** | unknown | 3× | `._features_wvrp3_118` |
| **Field W820u 84** | form-field | 3× | `._field_w820u_84` |

## Form Fields

### Field W820u 84

**Instances found:** 3

**CSS classes:** `._field_w820u_84`

**HTML structure:**

```html
<label class="_field_w820u_84"><span>Name</span><input required="" autocomplete="name" type="text" name="name"></label>
```

**Base styles (from design tokens):**

```css
._field_w820u_84 {
  background: #22303f;
  padding: 4px;
}```

## Other Components

### SheetKanji 1ed75 129

**Instances found:** 71

**CSS classes:** `._sheetKanji_1ed75_129`

**HTML structure:**

```html
<span class="jp _sheetKanji_1ed75_129" aria-hidden="true">凪</span>
```

**Base styles (from design tokens):**

```css
._sheetKanji_1ed75_129 {
  background: #22303f;
  padding: 4px;
}```

### DefText Y2dy1 102

**Instances found:** 26

**CSS classes:** `._defText_y2dy1_102`

**HTML structure:**

```html
<p class="_defText_y2dy1_102">The moment the wind rests and the sea turns to glass. The calm we are named after, and the calm we build.</p>
```

**Base styles (from design tokens):**

```css
._defText_y2dy1_102 {
  background: #22303f;
  padding: 4px;
}```

### Title 5qldj 38

**Instances found:** 16

**CSS classes:** `._title_5qldj_38`

**HTML structure:**

```html
<h3 class="_title_5qldj_38">Website design</h3>
```

**Base styles (from design tokens):**

```css
._title_5qldj_38 {
  background: #22303f;
  padding: 4px;
}```

### Sec Y2dy1 1

**Instances found:** 9

**CSS classes:** `._sec_y2dy1_1`

**HTML structure:**

```html
<section class="_sec_y2dy1_1" data-theme="day" data-sea="settling"><div class="_sticky_y2dy1_6"><span class="jpRail _rail_y2dy1_16" aria-hidden="true">風がやみ、海が鏡になる時間。</span><div class="wrap _inner_y2dy1_24"><p class="_statement_y2dy1_32" aria-label="The market is loud. Crowded feeds, popups, templates shouting for attention. Your venue is not loud. It is a feeling, and a website should hold that feeling perfectly still."><span class="_word_y2dy1_41" aria-hidden="true" style="opacity: 0.13;">The&nbsp;</span><span class="_word_y2dy1_41" aria-hidden="true" style="opacity: 0.13;">market&nbsp;</span
```

**Base styles (from design tokens):**

```css
._sec_y2dy1_1 {
  background: #22303f;
  padding: 4px;
}```

### Inner O5zyg 22

**Instances found:** 6

**CSS classes:** `._inner_o5zyg_22` `.wrap`

**HTML structure:**

```html
<div class="wrap _inner_o5zyg_22"><div class="_copy_o5zyg_32"><p class="cap _kicker_o5zyg_38 undefined" style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);">Independent web design studio for hospit…</p><h1 class="_h1_o5zyg_40 undefined" style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);">Your venue,<br><span class="script _scriptline_o5zyg_50">felt online.</span></h1><p class="_lede_o5zyg_58 undefined" style="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);">Thoughtful 
```

**Base styles (from design tokens):**

```css
._inner_o5zyg_22 {
  background: #22303f;
  padding: 4px;
}```

### Scriptline O5zyg 50

**Instances found:** 6

**CSS classes:** `._scriptline_o5zyg_50` `.script`

**HTML structure:**

```html
<span class="script _scriptline_o5zyg_50">felt online.</span>
```

**Base styles (from design tokens):**

```css
._scriptline_o5zyg_50 {
  background: #22303f;
  padding: 4px;
}```

### Sticky Y2dy1 6

**Instances found:** 6

**CSS classes:** `._sticky_y2dy1_6`

**HTML structure:**

```html
<div class="_sticky_y2dy1_6"><span class="jpRail _rail_y2dy1_16" aria-hidden="true">風がやみ、海が鏡になる時間。</span><div class="wrap _inner_y2dy1_24"><p class="_statement_y2dy1_32" aria-label="The market is loud. Crowded feeds, popups, templates shouting for attention. Your venue is not loud. It is a feeling, and a website should hold that feeling perfectly still."><span class="_word_y2dy1_41" aria-hidden="true" style="opacity: 0.13;">The&nbsp;</span><span class="_word_y2dy1_41" aria-hidden="true" style="opacity: 0.13;">market&nbsp;</span><span class="_word_y2dy1_41" aria-hidden="true" style="opacity: 0.
```

**Base styles (from design tokens):**

```css
._sticky_y2dy1_6 {
  background: #22303f;
  padding: 4px;
}```

### FrameMorning O5zyg 166

**Instances found:** 5

**CSS classes:** `._frameMorning_o5zyg_166` `._smallFrame_o5zyg_99`

**HTML structure:**

```html
<div class="_smallFrame_o5zyg_99 _frameMorning_o5zyg_166" style="translate: none; rotate: none; scale: none; opacity: 1; transform: rotate(4.00022deg);"><img alt="Palm and Salt café website concept" src="/palm-salt.jpg"><span>Morning / Café</span></div>
```

**Base styles (from design tokens):**

```css
._frameMorning_o5zyg_166 {
  background: #22303f;
  padding: 4px;
}```

### H2 5qldj 5

**Instances found:** 5

**CSS classes:** `._h2_5qldj_5`

**HTML structure:**

```html
<h2 class="_h2_5qldj_5">We tune every layer<br>of the <span class="script">atmosphere.</span></h2>
```

**Base styles (from design tokens):**

```css
._h2_5qldj_5 {
  background: #22303f;
  padding: 4px;
}```

### Row 5qldj 15

**Instances found:** 5

**CSS classes:** `._row_5qldj_15`

**HTML structure:**

```html
<div class="_row_5qldj_15" data-reveal="true" style="transition-delay: 0ms;"><span class="_ix_5qldj_31">[01]</span><h3 class="_title_5qldj_38">Website design</h3><div class="_body_5qldj_49"><p class="_desc_5qldj_50">Custom, atmosphere-led websites with a c…</p><p class="_note_5qldj_57">The core of every project</p></div><span class="_sheen_5qldj_66" aria-hidden="true"></span></div>
```

**Base styles (from design tokens):**

```css
._row_5qldj_15 {
  background: #22303f;
  padding: 4px;
}```

### Body 5qldj 49

**Instances found:** 5

**CSS classes:** `._body_5qldj_49`

**HTML structure:**

```html
<div class="_body_5qldj_49"><p class="_desc_5qldj_50">Custom, atmosphere-led websites with a c…</p><p class="_note_5qldj_57">The core of every project</p></div>
```

**Base styles (from design tokens):**

```css
._body_5qldj_49 {
  background: #22303f;
  padding: 4px;
}```

### StudioNote O5zyg 182

**Instances found:** 4

**CSS classes:** `._studioNote_o5zyg_182`

**HTML structure:**

```html
<div class="_studioNote_o5zyg_182" aria-hidden="true"><span class="jp _noteKanji_o5zyg_196">凪</span><span>Hospitality<br>Design Studio</span></div>
```

**Base styles (from design tokens):**

```css
._studioNote_o5zyg_182 {
  background: #22303f;
  padding: 4px;
}```

### TplGrid 1psd4 78

**Instances found:** 4

**CSS classes:** `._tplGrid_1psd4_78`

**HTML structure:**

```html
<div class="_tplGrid_1psd4_78"><span></span><span></span><span></span></div>
```

**Base styles (from design tokens):**

```css
._tplGrid_1psd4_78 {
  background: #22303f;
  padding: 4px;
}```

### SheetMail 1ed75 156

**Instances found:** 3

**CSS classes:** `._sheetMail_1ed75_156`

**HTML structure:**

```html
<a class="_sheetMail_1ed75_156" href="mailto:hello@nagicreative.com">hello@nagicreative.com</a>
```

**Base styles (from design tokens):**

```css
._sheetMail_1ed75_156 {
  background: #22303f;
  padding: 4px;
}```

### Canvas O5zyg 92

**Instances found:** 3

**CSS classes:** `._canvas_o5zyg_92`

**HTML structure:**

```html
<div class="_canvas_o5zyg_92" role="img" aria-label="A selection of Nagi Creative hospitality website concepts" style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);"><div class="_studioNote_o5zyg_182" aria-hidden="true"><span class="jp _noteKanji_o5zyg_196">凪</span><span>Hospitality<br>Design Studio</span></div><div class="_mainFrame_o5zyg_98" style="translate: none; rotate: none; scale: none; opacity: 1; transform: rotate(-1.5deg);"><div class="_browserBar_o5zyg_121" aria-hidden="true"><span class="_dots_o5zyg_134"><i></i><i></i><i></i></span><span>Nagi Creative 
```

**Base styles (from design tokens):**

```css
._canvas_o5zyg_92 {
  background: #22303f;
  padding: 4px;
}```

### Head 5qldj 3

**Instances found:** 3

**CSS classes:** `._head_5qldj_3`

**HTML structure:**

```html
<div class="_head_5qldj_3" data-reveal="true"><span class="cap">What we do</span><h2 class="_h2_5qldj_5">We tune every layer<br>of the <span class="script">atmosphere.</span></h2></div>
```

**Base styles (from design tokens):**

```css
._head_5qldj_3 {
  background: #22303f;
  padding: 4px;
}```

### Row Ya89e 23

**Instances found:** 3

**CSS classes:** `._row_ya89e_23`

**HTML structure:**

```html
<a class="_row_ya89e_23 " href="https://palm-and-salt.netlify.app" target="_blank" rel="noopener noreferrer"><div class="_frame_ya89e_35" style="clip-path: inset(12% 6% 88% round 14px);"><img alt="Palm &amp; Salt, a beachfront café concept site by Nagi Creative" loading="lazy" src="/palm-salt.jpg" style="translate: none; rotate: none; scale: none; transform: translate(0%, -9%) scale(1.18, 1.18);"><img class="_frameLogo_ya89e_53" alt="" loading="lazy" src="/palm-salt-logo.png"><span class="_timeTag_ya89e_66">Morning</span></div><div class="_copy_ya89e_81"><span class="_ix_ya89e_83">[01]</span><
```

**Base styles (from design tokens):**

```css
._row_ya89e_23 {
  background: #22303f;
  padding: 4px;
}```

### Copy Ya89e 81

**Instances found:** 3

**CSS classes:** `._copy_ya89e_81`

**HTML structure:**

```html
<div class="_copy_ya89e_81"><span class="_ix_ya89e_83">[01]</span><h3 class="_name_ya89e_89" data-reveal="true">Palm &amp; Salt</h3><p class="_meta_ya89e_98">Beachfront Café · Concept build</p><p class="_blurb_ya89e_106">A beachfront café built to feel like nin…</p><span class="btnLink _visit_ya89e_114">Visit the live site<span class="icoArrow"><svg viewBox="0 0 16 12" width="14" height="11" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h14M10 1l5 5-5 5"></path></svg></span></span></div>
```

**Base styles (from design tokens):**

```css
._copy_ya89e_81 {
  background: #22303f;
  padding: 4px;
}```

### Features Wvrp3 118

**Instances found:** 3

**CSS classes:** `._features_wvrp3_118`

**HTML structure:**

```html
<ul class="_features_wvrp3_118"><li><span class="_check_wvrp3_134" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-7"></path></svg></span>Single-page website</li><li><span class="_check_wvrp3_134" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-7"></path></svg></span>Mobile-first, photography-led design</li><li><span class="_check_wvrp3_134" aria-hidden="tru
```

**Base styles (from design tokens):**

```css
._features_wvrp3_118 {
  background: #22303f;
  padding: 4px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#6f6559` for all dividers within components

## Interactions & States (INTERACTIONS.md)

# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Button | 1 | default, hover, focus |
| Link | 3 | default, focus |
| Input | 3 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: transform 0.3s, background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s;
transition: color 0.3s;
transition: border-color 0.35s;
```

Apply these to all interactive elements. Never invent new durations or easings.

## Button Interactions

### Button 1 — `SEND ENQUIRY`

**States:**

- Default: `../screens/states/button-1-default.png`
- Hover: `../screens/states/button-1-hover.png`
- Focus: `../screens/states/button-1-focus.png`

**On hover:**

```css
/* background-color: rgb(33, 54, 74) → */ background-color: rgb(213, 178, 123);
/* color: rgb(245, 237, 222) → */ color: rgb(26, 35, 50);
/* box-shadow: rgba(10, 16, 28, 0.55) 0px 10px 28px -12px → */ box-shadow: rgba(10, 16, 28, 0.6) 0px 16px 34px -12px;
/* transform: none → */ transform: matrix(1, 0, 0, 1, 0, -1);
/* outline: rgb(245, 237, 222) none 3px → */ outline: rgb(26, 35, 50) none 3px;
/* outline-color: rgb(245, 237, 222) → */ outline-color: rgb(26, 35, 50);
```

**On focus:**

```css
/* background-color: rgb(33, 54, 74) → */ background-color: rgb(201, 163, 106);
/* color: rgb(245, 237, 222) → */ color: rgb(22, 32, 47);
/* outline: rgb(245, 237, 222) none 3px → */ outline: rgb(0, 95, 204) auto 1px;
/* outline-color: rgb(245, 237, 222) → */ outline-color: rgb(0, 95, 204);
```

**Transition:** `transform 0.3s, background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s`

## Link Interactions

### Link 1 — `TOOLS`

**States:**

- Default: `../screens/states/link-1-default.png`
- Focus: `../screens/states/link-1-focus.png`

**On focus:**

```css
/* outline: rgb(180, 185, 199) none 3px → */ outline: rgb(0, 95, 204) auto 1px;
/* outline-color: rgb(180, 185, 199) → */ outline-color: rgb(0, 95, 204);
```

**Transition:** `color 0.3s`

### Link 2 — `INSIGHTS`

**States:**

- Default: `../screens/states/link-2-default.png`
- Focus: `../screens/states/link-2-focus.png`

**On focus:**

```css
/* outline: rgb(180, 185, 199) none 3px → */ outline: rgb(0, 95, 204) auto 1px;
/* outline-color: rgb(180, 185, 199) → */ outline-color: rgb(0, 95, 204);
```

**Transition:** `color 0.3s`

### Link 3 — `GET A WEBSITE CHECK`

**States:**

- Default: `../screens/states/link-3-default.png`
- Focus: `../screens/states/link-3-focus.png`

**On focus:**

```css
/* outline: rgb(22, 32, 47) none 3px → */ outline: rgb(0, 95, 204) auto 1px;
/* outline-color: rgb(22, 32, 47) → */ outline-color: rgb(0, 95, 204);
```

**Transition:** `transform 0.3s, background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s`

## Input Interactions

### Input 1 — `text`

**States:**

- Default: `../screens/states/input-1-default.png`
- Hover: `../screens/states/input-1-hover.png`
- Focus: `../screens/states/input-1-focus.png`

**On focus:**

```css
/* border-color: rgb(237, 227, 207) rgb(237, 227, 207) rgba(237, 227, 207, 0.2) → */ border-color: rgb(237, 227, 207) rgb(237, 227, 207) rgba(190, 154, 102, 0.984);
/* box-shadow: none → */ box-shadow: rgb(190, 154, 102) 0px 1px 0px 0px;
```

**Transition:** `border-color 0.35s`

### Input 2 — `email`

**States:**

- Default: `../screens/states/input-2-default.png`
- Hover: `../screens/states/input-2-hover.png`
- Focus: `../screens/states/input-2-focus.png`

**On focus:**

```css
/* border-color: rgb(237, 227, 207) rgb(237, 227, 207) rgba(237, 227, 207, 0.2) → */ border-color: rgb(237, 227, 207) rgb(237, 227, 207) rgba(190, 154, 102, 0.984);
/* box-shadow: none → */ box-shadow: rgb(190, 154, 102) 0px 1px 0px 0px;
```

**Transition:** `border-color 0.35s`

### Input 3 — `text`

**States:**

- Default: `../screens/states/input-3-default.png`
- Hover: `../screens/states/input-3-hover.png`
- Focus: `../screens/states/input-3-focus.png`

**On focus:**

```css
/* border-color: rgb(237, 227, 207) rgb(237, 227, 207) rgba(237, 227, 207, 0.2) → */ border-color: rgb(237, 227, 207) rgb(237, 227, 207) rgba(190, 154, 102, 0.984);
/* box-shadow: none → */ box-shadow: rgb(190, 154, 102) 0px 1px 0px 0px;
```

**Transition:** `border-color 0.35s`

## Interaction Rules

- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Transition durations in use: `0.3s`, `0.35s`
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

## Design Tokens — JSON Files

### tokens/colors.json
```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "core": {
    "surface": {
      "value": "#1a2438",
      "role": "surface",
      "name": "card"
    },
    "text-muted": {
      "value": "#364252",
      "role": "text-muted"
    },
    "border": {
      "value": "#6f6559",
      "role": "border"
    },
    "text-primary": {
      "value": "#444444",
      "role": "text-primary"
    }
  },
  "status": {
    "warning": {
      "value": "#866437",
      "role": "warning"
    }
  },
  "extended": {
    "color-4e5765": {
      "value": "#4e5765",
      "role": "unknown"
    },
    "muted": {
      "value": "#8e8474",
      "role": "unknown",
      "name": "muted"
    },
    "color-be9a66": {
      "value": "#be9a66",
      "role": "unknown"
    },
    "color-d8bc8e": {
      "value": "#d8bc8e",
      "role": "unknown"
    },
    "color-cfcfcc": {
      "value": "#cfcfcc",
      "role": "unknown"
    },
    "color-c8c4bd": {
      "value": "#c8c4bd",
      "role": "unknown"
    },
    "color-7a746c": {
      "value": "#7a746c",
      "role": "unknown"
    },
    "color-121a2a": {
      "value": "#121a2a",
      "role": "info"
    },
    "color-000000": {
      "value": "#000000",
      "role": "unknown"
    },
    "color-e4e4e2": {
      "value": "#e4e4e2",
      "role": "unknown"
    },
    "color-e9ddca": {
      "value": "#e9ddca",
      "role": "unknown"
    },
    "color-8089a0": {
      "value": "#8089a0",
      "role": "unknown"
    }
  },
  "meta": {
    "theme": "light",
    "extracted": "2026-09-13"
  }
}
```

### tokens/spacing.json
```json
{
  "base": {
    "value": "4px",
    "description": "Grid unit — all spacing must be multiples of this"
  },
  "unit": "px",
  "scale": {
    "xs": {
      "value": "2px",
      "px": 2
    },
    "sm": {
      "value": "4px",
      "px": 4
    },
    "md": {
      "value": "6px",
      "px": 6
    },
    "lg": {
      "value": "8px",
      "px": 8
    },
    "xl": {
      "value": "10px",
      "px": 10
    },
    "2xl": {
      "value": "12px",
      "px": 12
    },
    "3xl": {
      "value": "14px",
      "px": 14
    },
    "4xl": {
      "value": "16px",
      "px": 16
    },
    "5xl": {
      "value": "18px",
      "px": 18
    },
    "6xl": {
      "value": "20px",
      "px": 20
    }
  },
  "multipliers": {
    "1x": {
      "value": "4px",
      "raw": 4
    },
    "2x": {
      "value": "8px",
      "raw": 8
    },
    "3x": {
      "value": "12px",
      "raw": 12
    },
    "4x": {
      "value": "16px",
      "raw": 16
    },
    "5x": {
      "value": "20px",
      "raw": 20
    },
    "6x": {
      "value": "24px",
      "raw": 24
    },
    "7x": {
      "value": "28px",
      "raw": 28
    },
    "8x": {
      "value": "32px",
      "raw": 32
    },
    "9x": {
      "value": "36px",
      "raw": 36
    },
    "10x": {
      "value": "40px",
      "raw": 40
    },
    "11x": {
      "value": "44px",
      "raw": 44
    },
    "12x": {
      "value": "48px",
      "raw": 48
    },
    "13x": {
      "value": "52px",
      "raw": 52
    },
    "14x": {
      "value": "56px",
      "raw": 56
    },
    "15x": {
      "value": "60px",
      "raw": 60
    },
    "16x": {
      "value": "64px",
      "raw": 64
    }
  },
  "meta": {
    "totalValues": 15,
    "min": 2,
    "max": 30
  }
}
```

### tokens/typography.json
```json
{
  "families": [
    "Jost",
    "Cormorant Garamond"
  ],
  "scale": {
    "heading-1": {
      "fontFamily": "Jost",
      "fontSize": "360px",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "heading-2": {
      "fontFamily": "Jost",
      "fontSize": "300px",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "heading-3": {
      "fontFamily": "Jost",
      "fontSize": "240px",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "body": {
      "fontFamily": "Cormorant Garamond",
      "fontSize": "11px",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    },
    "caption": {
      "fontFamily": "Cormorant Garamond",
      "fontSize": "15px",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    }
  },
  "fontFaces": [
    {
      "family": "Cormorant Garamond",
      "src": "https://www.nagicreative.com/fonts/CormorantGaramond-Medium.otf",
      "format": "opentype",
      "weight": "500"
    },
    {
      "family": "Jost",
      "src": "https://www.nagicreative.com/fonts/Jost-400-Book.ttf",
      "format": "truetype",
      "weight": "400"
    },
    {
      "family": "Jost",
      "src": "https://www.nagicreative.com/fonts/Jost-600-Semi.ttf",
      "format": "truetype",
      "weight": "600"
    },
    {
      "family": "Pinyon Script",
      "src": "https://www.nagicreative.com/fonts/PinyonScript-Regular.ttf",
      "format": "truetype",
      "weight": "400"
    }
  ],
  "rules": {
    "maxSizesPerScreen": 4,
    "headingWeightRange": "600-700",
    "bodyWeight": 400,
    "lineHeightBody": 1.5,
    "lineHeightHeading": 1.2
  }
}
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/CormorantGaramond-Bold.ttf`
- `fonts/CormorantGaramond-Light.ttf`
- `fonts/CormorantGaramond-Medium.ttf`
- `fonts/CormorantGaramond-Regular.ttf`
- `fonts/CormorantGaramond-SemiBold.ttf`
- `fonts/Jost-Black.ttf`
- `fonts/Jost-Bold.ttf`
- `fonts/Jost-ExtraBold.ttf`
- `fonts/Jost-ExtraLight.ttf`
- `fonts/Jost-Light.ttf`
- `fonts/Jost-Medium.ttf`
- `fonts/Jost-Regular.ttf`
- `fonts/Jost-SemiBold.ttf`
- `fonts/Jost-Thin.ttf`
- `fonts/PinyonScript-Regular.ttf`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

## Screenshots Inventory (screens/)

> Study all screenshots carefully before implementing any UI. Match every visual detail exactly.

### Scroll Journey (screens/scroll/)

*Cinematic scroll states — page visual at each scroll depth*

![scroll-000.png](screens/scroll/scroll-000.png)

![scroll-017.png](screens/scroll/scroll-017.png)

![scroll-033.png](screens/scroll/scroll-033.png)

![scroll-050.png](screens/scroll/scroll-050.png)

![scroll-067.png](screens/scroll/scroll-067.png)

![scroll-083.png](screens/scroll/scroll-083.png)

![scroll-100.png](screens/scroll/scroll-100.png)

### Full Page Screenshots (screens/pages/)

*Full-page screenshots of each crawled URL*

![home.png](screens/pages/home.png)

![insights-how-we-score-restaurant-websites.png](screens/pages/insights-how-we-score-restaurant-websites.png)

![insights.png](screens/pages/insights.png)

![tools.png](screens/pages/tools.png)

![website-check.png](screens/pages/website-check.png)

### Section Clips (screens/sections/)

*Clipped individual sections and components*

![home-section-1.png](screens/sections/home-section-1.png)

![insights-how-we-score-restaurant-websites-section-1.png](screens/sections/insights-how-we-score-restaurant-websites-section-1.png)

![insights-section-1.png](screens/sections/insights-section-1.png)

![insights-section-2.png](screens/sections/insights-section-2.png)

![insights-section-3.png](screens/sections/insights-section-3.png)

![tools-section-1.png](screens/sections/tools-section-1.png)

![tools-section-2.png](screens/sections/tools-section-2.png)

![website-check-section-1.png](screens/sections/website-check-section-1.png)

### Interaction States (screens/states/)

*Hover, focus, and active state captures*

![button-1-default.png](screens/states/button-1-default.png)

![button-1-focus.png](screens/states/button-1-focus.png)

![button-1-hover.png](screens/states/button-1-hover.png)

![input-1-default.png](screens/states/input-1-default.png)

![input-1-focus.png](screens/states/input-1-focus.png)

![input-1-hover.png](screens/states/input-1-hover.png)

![input-2-default.png](screens/states/input-2-default.png)

![input-2-focus.png](screens/states/input-2-focus.png)

![input-2-hover.png](screens/states/input-2-hover.png)

![input-3-default.png](screens/states/input-3-default.png)

![input-3-focus.png](screens/states/input-3-focus.png)

![input-3-hover.png](screens/states/input-3-hover.png)

![link-1-default.png](screens/states/link-1-default.png)

![link-1-focus.png](screens/states/link-1-focus.png)

![link-2-default.png](screens/states/link-2-default.png)

![link-2-focus.png](screens/states/link-2-focus.png)

![link-3-default.png](screens/states/link-3-default.png)

![link-3-focus.png](screens/states/link-3-focus.png)

### Screenshot Index (screens/INDEX.md)

# Screenshot Index

## Scroll Journey

> Shows the cinematic state at each point of the page

| Scroll | Y Position | File |
|--------|-----------|------|
| 0% | 0px | `screens/scroll/scroll-000.png` |
| 17% | 2072px | `screens/scroll/scroll-017.png` |
| 33% | 4022px | `screens/scroll/scroll-033.png` |
| 50% | 6094px | `screens/scroll/scroll-050.png` |
| 67% | 8166px | `screens/scroll/scroll-067.png` |
| 83% | 10116px | `screens/scroll/scroll-083.png` |
| 100% | 12188px | `screens/scroll/scroll-100.png` |

## Pages

| Page | URL | File |
|------|-----|------|
| Nagi Creative | Hospitality Web Design Studio | `https://www.nagicreative.com/` | `screens/pages/home.png` |
| Free Tools for Restaurants and Cafes | Nagi Creative | `https://www.nagicreative.com/tools/` | `screens/pages/tools.png` |
| Insights for Hospitality Owners | Nagi Creative | `https://www.nagicreative.com/insights/` | `screens/pages/insights.png` |
| Restaurant Website Check for US$35 | Nagi Creative | `https://www.nagicreative.com/website-check/` | `screens/pages/website-check.png` |
| How We Score Restaurant Websites | Nagi Creative | `https://www.nagicreative.com/insights/how-we-score-restaurant-websites/` | `screens/pages/insights-how-we-score-restaurant-websites.png` |

## Sections

| Page | Section | File |
|------|---------|------|
| home | #1 (section) | `screens/sections/home-section-1.png` |
| tools | #1 (section) | `screens/sections/tools-section-1.png` |
| tools | #2 (section) | `screens/sections/tools-section-2.png` |
| insights | #1 (section) | `screens/sections/insights-section-1.png` |
| insights | #2 (section) | `screens/sections/insights-section-2.png` |
| insights | #3 (section) | `screens/sections/insights-section-3.png` |
| website-check | #1 (section) | `screens/sections/website-check-section-1.png` |
| insights-how-we-score-restaurant-websites | #1 (main > div) | `screens/sections/insights-how-we-score-restaurant-websites-section-1.png` |

## Homepage Screenshots (screenshots/)

![homepage.png](screenshots/homepage.png)

