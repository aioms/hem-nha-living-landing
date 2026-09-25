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
  src: url("https://www.nagicreative.com/fonts/CormorantGaramond-Medium.otf") format("opentype");
  font-weight: 500;
}
@font-face {
  font-family: "Jost";
  src: url("https://www.nagicreative.com/fonts/Jost-400-Book.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Pinyon Script";
  src: url("https://www.nagicreative.com/fonts/PinyonScript-Regular.ttf") format("truetype");
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
