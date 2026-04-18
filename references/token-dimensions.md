# Token Dimensions — radius, spacing, shadow, motion

> **When to read this:** Load when picking a non-color token (radius, spacing, shadow, easing) and unsure which value applies.

All values live in `assets/tokens.css`. This file explains **when** to reach for which.

> ## Layer note
>
> Everything documented here is **L2 semantic** tokens — the API surface
> components consume. Behind each `--radius-lg` or `--space-base` sits an
> L1 primitive (e.g. `--palette-radius-base: 0.5rem`). **Never reference
> the L1 layer from a component.** If you're tempted to use
> `--palette-radius-base` directly, use `--radius-lg` instead. The
> primitive layer exists so we can retune the base unit (for a density
> change or brand variant) without editing a single component.

---

## Radius

| Token | Value | Use for |
|---|---|---|
| `--radius-xs` | 2px | Inline code, `.kbd` keyboard hints |
| `--radius-sm` | 4px | Tight badges, progress fills |
| `--radius-md` | 6px | Inputs (small), checkbox `.box` |
| `--radius-lg` | 8px | Menus, `.alert` (internal icon wells) |
| `--radius-xl` | 12px | `.tabs`, `.alert` outer, `.input-group` |
| `--radius-2xl` | 16px | `.alert`, `.chip--lg` |
| `--radius-3xl` | 24px | `.card`, `.modal`, `.button` (default) |
| `--radius-4xl` | 32px | Rarely; hero surfaces |
| `--radius-field` | `radius × 1.5` | `.input`, `.textarea`, `.input-group` |

**Rules:**
- Never write `border-radius: 7px` — always a token.
- Fields have their own radius (`--radius-field`) because they're tuned larger than surface cards for visual breathing room. Don't override.
- Buttons and chips are pill-shaped (`border-radius: 24px` / `16px`) — that's intentional, don't fall back to sharp corners.

---

## Spacing

Zi UI uses a **4px grid** via `--spacing: 0.25rem`.

| Multiplier | Value | Use for |
|---|---|---|
| `1` | 4px | Chip internal gap, dot indicator |
| `2` | 8px | Button gap (icon→label), menu item gap |
| `3` | 12px | Card internal gap, alert gap, tight sections |
| `4` | 16px | Card padding, section gap |
| `5` | 20px | Modal padding |
| `6` | 24px | Section separation inside a page |
| `8` | 32px | Major section separation |
| `12` | 48px | Page-level margins, hero blocks |

**Rules:**
- Writing `gap: 10px` is wrong — pick `8` or `12`, not in between.
- Inline styles for layout (`padding: 24px`) are fine **when writing a page**. They're wrong when writing shared components — those use var(`--spacing`) * N.
- Never use `margin: auto` for alignment inside cards. Use flex/grid.

---

## Shadow

Only three shadow tokens exist. Use them, nothing else.

| Token | Use for |
|---|---|
| `--shadow-surface` | `.card`, elevated blocks on page background |
| `--shadow-overlay` | `.modal`, `.menu`, `.tip` — things floating above other content |
| `--shadow-field` | `.input`, `.switch__thumb` — subtle inner/depth cue |

**Rules:**
- ❌ Don't write `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` — use a token.
- ❌ Don't stack shadows for "more depth". Tokens are already tuned.
- ❌ Don't add shadows to buttons or chips. They're flat by design.
- In dark mode, shadows automatically become lighter/flatter — don't override.

---

## Motion

| Token | Easing | Use for |
|---|---|---|
| `--ease-smooth` | `ease` (CSS default) | Hover color changes, subtle state |
| `--ease-out-fluid` | `cubic-bezier(0.32, 0.72, 0, 1)` | Switch thumb travel, things that "arrive" |
| `--ease-out-quart` | `cubic-bezier(0.165, 0.84, 0.44, 1)` | Entrance of larger elements |

**Durations (not tokenized — use these numbers):**
| Use case | Duration |
|---|---|
| Hover / focus tint | 100–150ms |
| Button press, scale feedback | 250ms |
| Switch thumb, checkbox fill | 300ms |
| Overlay open (modal, menu) | Skip — Zi UI doesn't animate open/close |

**Rules:**
- ❌ Don't add `@keyframes` for entrance animations. Zi UI is calm.
- ❌ Don't use durations over 300ms. Things that take longer feel laggy.
- ❌ Don't animate color with `ease-in-out` — `--ease-smooth` (`ease`) is tuned for it.

---

## What if a token doesn't fit?

If you feel the urge to write a raw pixel value, ask:
1. Am I at a **layout** level (page-specific spacing)? Then inline is fine.
2. Am I at a **component** level (padding of a reusable thing)? Use a token.
3. Does no token fit? Reshape the layout; don't invent a new scale value.

The scale is short on purpose. Every time you expand it, you dilute the system.
