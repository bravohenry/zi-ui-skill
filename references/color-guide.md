# Color Guide

> **When to read this:** Load when picking a color and unsure which semantic token applies (accent vs success for a save button, soft vs solid chip, etc.).

## The four semantic colors

### Accent — `--accent` (blue)
Use for **one thing per screen**: the primary action. If everything is accent, nothing is.
- Primary buttons
- Active tab / selected state
- Links (sparingly)
- Focus rings (automatic — don't override)
- Progress bars, slider fills

### Success — `--success` (green)
For **states that confirm something is right**:
- "Live", "Synced", "Active", "Healthy"
- Completion confirmations
- Passing checks

Do **not** use success for "save" buttons — "save" is just the primary action (`--accent`).

### Warning — `--warning` (amber)
For **states that need attention but aren't broken**:
- "Degraded", "Pending review", "Rate-limited"
- Caution banners
- Billing reminders

### Danger — `--danger` (red)
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

- ❌ `color: blue` — use `var(--accent)`
- ❌ `color: #999` — use `var(--muted)`
- ❌ `background: rgba(0,0,0,0.05)` — use `var(--surface-secondary)`
- ❌ Inventing a fifth semantic color — compose within the four
- ❌ Using `--accent` for error states "because red feels aggressive" — use `--danger`

## Dark mode

All colors auto-swap when `data-theme="dark"` is set on `<html>`. Never write dark-mode overrides in your own CSS — if something looks wrong in dark mode, you hard-coded a color somewhere.
