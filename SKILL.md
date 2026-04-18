---
name: zi-ui
version: 0.2.0
description: |
  Zi UI is a token-driven CSS design system with a calm, editorial
  aesthetic. Two-layer tokens (primitive → semantic), three orthogonal
  theming axes (brand × light/dark × contrast). Neutral palette, low
  chroma, 500 max font-weight, Geist typeface.

  Activate this skill when the user asks to build, style, mock up, or prototype
  UI in the Zi UI visual language — dashboards, internal tools, documentation
  sites, admin panels, SaaS interfaces. Also activate when the user references
  "Zi UI" by name, or asks to apply its tokens / components to an existing
  page. In React / Next.js / Vite projects, generate thin wrapper components
  on demand (3+ uses) instead of writing raw class strings everywhere.

  Do NOT activate for marketing landing pages, games, heavily branded consumer
  apps, or anything needing gradients, glows, or playful motion.
---

# Zi UI

A class-based CSS design system. Two files (`tokens.css` + `components.css`)
own the entire visual language; everything else in this skill explains how to
use them.

## Files in this skill

```
SKILL.md                          ← this file (navigation + hard rules)
assets/
  tokens.css                      ← copy into every target project (the DNA)
  components.css                  ← copy into every target project (semantic classes)
examples/
  button.html, card.html, input.html, chip.html,
  table.html, color.html, typography.html
                                  ← standalone style anchors, one per primitive
                                    (no shell, no nav — just the component + the two CSS files)
  settings.tsx                    ← React on-demand wrapper sample
references/
  component-api.md                ← full class inventory (read when composing UI)
  color-guide.md                  ← semantic color usage (read when picking colors)
  token-dimensions.md             ← radius / spacing / shadow / motion (read when picking a non-color token)
  scenario-patterns.md            ← scenario → composition recipes (read when the user names a UI type)
  do-dont.md                      ← anti-patterns (read when unsure if a choice is ok)
  react-adapters.md               ← wrapper recipes (read when working in a React project)
```

The `docs/` folder at the repo root is the **public documentation site**
(GitHub Pages), not part of the skill. It consumes the same `assets/tokens.css`
and `assets/components.css` but is meant for humans, not agents. Ignore it
during skill execution.

**Progressive reading order:**
1. Read this file once.
2. Skim a few `examples/*.html` pages (button, card, input) to absorb the visual rhythm. For a full-system preview, the public docs site at `docs/index.html` is the most complete view.
3. Load `references/component-api.md` when composing a page.
4. Load `references/react-adapters.md` **only** if the target project is React.
5. Load `references/color-guide.md` / `do-dont.md` when a specific choice needs disambiguation.

## Intake — ask before building

When applying Zi UI to a **new project**, confirm these before writing code.
Skip any the user has already answered.

1. **Platform & stack** — plain HTML? React/Next.js/Vite? Something else?
2. **Theme mode** — light only, dark only, or both with a toggle?
3. **Font availability** — can Geist be loaded (Google Fonts / local)? If not, fallback to system-ui (don't substitute another display font).
4. **Existing visual language** — is there a codebase with its own tokens/components already? If yes, confirm Zi UI replaces it or layers alongside (usually: replace).
5. **Density** — standard (36px controls, the default) or compact (32px)?
6. **Scope** — one page, a flow, a whole app? Affects whether wrappers are worth generating.
7. **Brand accent** — keep the default blue `--color-accent`, or define a new brand? To add a brand, append a `[data-brand="yourname"]` block to `assets/tokens.css` that remaps `--color-accent` + related semantics; apply with `<html data-brand="yourname">`. See the template at the bottom of `tokens.css`.
8. **High-contrast mode** — if the target needs WCAG AAA (gov / medical / a11y-regulated), apply `<html data-contrast="high">`. Orthogonal to brand and theme.

If any answer would change the output significantly, ask before building.

## Token architecture

Two layers. Three orthogonal axes. Agents MUST follow these rules.

**Layers — naming distinguishes them:**

| Layer     | Prefix           | Who uses it                                         |
|-----------|------------------|-----------------------------------------------------|
| Primitive | `--palette-*`    | **Only the semantic layer below**. Components NEVER. |
| Semantic  | `--color-*`, `--radius-*`, `--space-*`, `--shadow-*`, `--ease-*` | Components, AI, every consumer. |

**Iron rule**: when writing a component, if you type `--palette-` you are
doing it wrong. Use `--color-accent`, never `--palette-blue-500`.

Why: primitive values change (rebrand, accessibility audit, dark-mode
tuning). Semantic names are the API contract; primitives are the
implementation. Agents should only ever consume the API.

**Legacy aliases** (`--accent`, `--foreground`, `--radius`, etc.) are kept
for backward compatibility with v0.1.0 code. New code should prefer the
`--color-accent` / `--color-foreground` / `--radius-lg` forms.

**Orthogonal theming axes — combine freely on `<html>`:**

| Attribute                | Values                    | Effect                       |
|--------------------------|---------------------------|------------------------------|
| `data-brand="..."`       | `zi` (default), custom    | Swaps the semantic color map |
| `data-theme="..."`       | `light` (default), `dark` | Inverts surface/text mapping |
| `data-contrast="high"`   | opt-in                    | WCAG AAA-compliant overrides |

These axes are independent. `<html data-brand="example" data-theme="dark" data-contrast="high">` is valid.

Adding a new brand = adding a new `[data-brand="yourbrand"]` block in
`assets/tokens.css` that remaps `--color-*`. Radius, spacing, shadows,
motion are inherited from the default unless overridden.

## Hard rules

1. **Link both CSS files in order.** `tokens.css` first, `components.css` second. Never inline-copy their contents; never rewrite tokens.
2. **Only use documented classes.** The closed set lives in `references/component-api.md`. If a need doesn't map to an existing class, rethink the layout before inventing one.
3. **Colors via semantic CSS variables only.** Prefer `var(--color-accent)` / `var(--color-foreground)`. Legacy `var(--accent)` / `var(--foreground)` still work but are kept only for backward compatibility. Never hex / rgb / named colors.
3b. **Never reference `--palette-*` directly.** The palette layer is implementation. If you write `var(--palette-blue-500)` in a component, you are breaking the architecture — use `var(--color-accent)` instead.
4. **Font-weight cap: 500.** No 600/700/800/900. Hierarchy comes from size + color contrast.
5. **Font family: Geist.** Already set by components; don't override.
6. **No pure `#000` / `#fff`.** Use `--foreground` / `--background` / `--surface`.
7. **No custom shadows.** Use `--shadow-surface` / `--shadow-overlay` / `--shadow-field`.
8. **Radius from the scale.** Use `--radius-*`; don't write arbitrary pixel radii.
9. **No emoji as UI elements.** Use chips or leave space for real icons.
10. **One primary action per screen.** `button--primary` is scarce; everything else is ghost/secondary.

## Quick-start scaffold (HTML projects)

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap">
  <link rel="stylesheet" href="assets/tokens.css">
  <link rel="stylesheet" href="assets/components.css">
  <style>
    body {
      margin: 0;
      background: var(--color-background);
      color: var(--color-foreground);
      font: 400 14px/1.5 "Geist", sans-serif;
    }
  </style>
</head>
<body>
  <!-- your content -->
</body>
</html>
```

Dark mode: set `data-theme="dark"` on `<html>`. Every component adapts; no overrides needed.

## Using with React / Next.js / Vite

No TSX ships with this skill — intentionally. Wrappers are generated **on
demand** per project, because different codebases want different shapes
(TypeScript vs JavaScript, controlled patterns, naming conventions).

**Rules:**
- For one-off pages / prototypes, use raw `className="button button--primary"`. No wrappers.
- For real apps, generate a wrapper only when a component is used **3+ times**. One file per component, under `components/ui/` (or project equivalent).
- `.tsx` if the project has `tsconfig.json`, `.jsx` otherwise.
- Wrappers are **thin** — they map props → classes and pass everything else through. No styled-components, no CSS-in-JS, no runtime.
- State components (Switch, Checkbox, Radio) are always **controlled** — parent owns the boolean, wrapper flips `data-selected`.

Full recipes in `references/react-adapters.md`. Sample page in `examples/settings.tsx`.

**What NOT to wrap:**
- Modal / Popover / Tooltip with portal + focus trap → use Radix UI / Ark UI headless, apply Zi UI classes on their rendered element
- Table with sorting → use TanStack Table headless, style with `.tbl`
- Anything needing a `<ZiProvider>` — there's no runtime, tokens are CSS variables

## Verification checklist (before finishing a task)

- [ ] `tokens.css` and `components.css` are both linked in the target project
- [ ] No hard-coded colors, shadows, or radii anywhere
- [ ] **Zero `--palette-*` references in components** (grep the codebase — must be empty)
- [ ] New code uses `--color-*` / `--radius-*` / `--shadow-*` semantic names (not legacy `--accent` / `--foreground`)
- [ ] `data-theme="dark"` toggles cleanly (test it)
- [ ] If the target needs multi-brand: a `[data-brand="yourname"]` block is appended to `tokens.css`, not overrides on components
- [ ] If the target needs a11y: `data-contrast="high"` renders without regressions
- [ ] No `font-weight` above 500
- [ ] No Tailwind, MUI, Chakra, Bootstrap, or other design systems pulled in alongside
- [ ] One primary action per screen
- [ ] If React: wrappers exist only for components used 3+ times

## Scenario → pattern mapping (quick reference)

When the user describes a common UI type, reach for these patterns first:

| Scenario | Default composition |
|---|---|
| **Dashboard** | `.card` container · `.chip--soft` for status · `.button--ghost` toolbar · `table.tbl` for data · avoid shadows beyond `--shadow-surface` |
| **Form / Settings** | `.field-group` per field · labels above · helper below · primary submit bottom-right · `alert--danger` for errors, never inline red text |
| **Empty state** | `.card--secondary` · muted description · one `.button--primary` CTA max · no illustration needed |
| **List page** | `table.tbl` inside a `.card` · sticky header optional · `.chip` in a status column · row-click navigates (no per-row kebab menu unless destructive actions exist) |
| **Destructive confirm** | `.modal` · `.button--danger` + `.button--ghost` cancel · description explains what's lost |
| **Notification / toast** | `.alert` (not a floating toast component — Zi UI doesn't ship one); position in page via your own wrapper |
| **Detail page header** | title + `.chip--soft` status + `.button--ghost` overflow menu, all on one row; `.card__description` below |
| **Login / auth** | single `.card` centered · one `.field-group` per input · full-width `.button--primary` · no decorative imagery |

Expanded recipes in `references/component-api.md` and `examples/*.html`.

## Versioning

- **SKILL.md** declares the version in frontmatter-adjacent comments or via git tag.
- **Token changes** (new/renamed variables in `tokens.css`) are **breaking**: bump minor version.
- **Component additions** are additive: bump patch.
- **Component removals or class renames** are breaking: bump minor.
- **Examples updates** don't bump version.

When a user says "update to latest Zi UI", re-copy `assets/tokens.css` and `assets/components.css` from the skill into their project, then audit for:
- Hard-coded colors that now duplicate a new token
- Custom classes that now shadow a built-in one

## Philosophy

Restraint is the point. If it looks boring at first glance, it's working.
