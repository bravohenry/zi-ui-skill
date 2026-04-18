# Color Guide

> **When to read this:** Load when picking a color and unsure which semantic token applies (accent vs success for a save button, soft vs solid chip, etc.).

> ## Layer note
>
> All tokens below are **L2 semantic** (`--color-accent`, `--color-success`,
> etc.). The corresponding L1 primitives live as `--palette-blue-500`,
> `--palette-green-500`, etc. **Components consume semantic only.** If
> you reach for `--palette-*` to pick a color, you're at the wrong layer —
> step back and use the right `--color-*`.
>
> Legacy short names (`--accent`, `--success`, `--warning`, `--danger`)
> still work for backward compatibility. New code should prefer the full
> `--color-*` form.

## The four semantic colors

### Accent — `--color-accent` (blue by default)
Use for **one thing per screen**: the primary action. If everything is accent, nothing is.
- Primary buttons
- Active tab / selected state
- Links (sparingly)
- Focus rings (automatic — don't override)
- Progress bars, slider fills

### Success — `--color-success` (green)
For **states that confirm something is right**:
- "Live", "Synced", "Active", "Healthy"
- Completion confirmations
- Passing checks

Do **not** use success for "save" buttons — "save" is just the primary action (`--accent`).

### Warning — `--color-warning` (amber)
For **states that need attention but aren't broken**:
- "Degraded", "Pending review", "Rate-limited"
- Caution banners
- Billing reminders

### Danger — `--color-danger` (red)
For **destructive or error states**:
- Delete buttons (`button--danger`)
- Form validation errors (`data-invalid` on input)
- "Offline", "Failed", "Error"
- Alert boxes for real problems

## Solid vs soft

Every semantic color has two forms:

| Form | Token | When to use |
|---|---|---|
| **Solid** | `--color-accent` | The element itself is the thing (primary button, badge on avatar) |
| **Soft** | `--color-accent-soft` | The element is ambient/background (chip showing status, alert bg) |

Rule of thumb: **soft for passive indicators, solid for active elements**.

## Neutral palette

| Token | Purpose |
|---|---|
| `--background` | Page — the "floor" |
| `--surface` | Cards — elevated surfaces |
| `--surface-secondary` | Sunken panels inside cards |
| `--surface-tertiary` | Deepest nesting (rarely needed) |
| `--foreground` | Primary text |
| `--muted` | Secondary text, labels, placeholders |
| `--border` | Outlines |
| `--separator` | Hairlines between rows |
| `--default` | Inert button / chip background |

## What NOT to do

- ❌ `color: blue` — use `var(--color-accent)`
- ❌ `color: #999` — use `var(--color-muted)`
- ❌ `background: rgba(0,0,0,0.05)` — use `var(--color-surface-secondary)`
- ❌ Inventing a fifth semantic color — compose within the four
- ❌ Using `--accent` for error states "because red feels aggressive" — use `--danger`

## Dark mode

All colors auto-swap when `data-theme="dark"` is set on `<html>`. Never write dark-mode overrides in your own CSS — if something looks wrong in dark mode, you hard-coded a color somewhere.

## Multi-brand and high-contrast

Three orthogonal axes live on `<html>`:

- `data-brand="zi"` (default) or any custom brand you define
- `data-theme="light"` (default) or `dark`
- `data-contrast="high"` (opt-in, WCAG AAA)

Combine freely: `<html data-brand="yourbrand" data-theme="dark" data-contrast="high">` is valid.

**To add a new brand**, append to `assets/tokens.css`:

```css
[data-brand="yourbrand"] {
  --color-accent:            var(--palette-green-500);
  --color-accent-foreground: var(--palette-snow);
  --color-accent-hover:      var(--palette-green-600);
  --color-accent-soft:       color-mix(in oklab, var(--color-accent) 15%, transparent);
  --color-accent-soft-foreground: var(--color-accent);
  --color-focus:             var(--color-accent);
}
```

A brand override only remaps the semantic color map — radius, spacing,
shadows, motion, status colors are inherited unchanged. This keeps brand
work strictly about color identity, not geometry.

**High-contrast mode** automatically strengthens accent, status, border,
and muted tokens for accessibility. Always test dark + high-contrast in
combination before shipping to regulated markets (gov / medical / edu).
