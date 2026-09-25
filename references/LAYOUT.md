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

