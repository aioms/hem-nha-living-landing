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

