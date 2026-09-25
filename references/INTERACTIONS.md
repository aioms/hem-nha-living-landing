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

