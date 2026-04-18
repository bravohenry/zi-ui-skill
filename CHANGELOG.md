# Changelog

All notable changes to Zi UI Skill will be documented here. The format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this
skill adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Token changes are versioned here because changes to `assets/tokens.css` are
breaking contracts for every downstream consumer — including agents relying
on a stable semantic name, designers relying on a stable palette, and
engineers relying on a stable class set.

---

## [0.2.0] — 2026-04-17

### Added — two-layer token architecture

- **L1 primitive layer** (`--palette-*`): introduced a full primitive palette
  with neutral (`gray-50` through `gray-950`), blue (`400-600`), green
  (`400-600`), amber (`400-600`), red (`400-600`), plus `white`, `black`,
  `snow`, radius/spacing base units. Purely physical values — components
  must not reference these directly.
- **L2 semantic layer** (`--color-*`, `--radius-*`, `--space-*`,
  `--shadow-*`, `--ease-*`): the semantic map that was already partially
  present is now the full API surface. Components, agents, and downstream
  consumers only ever reference this layer.
- **Brand axis** via `[data-brand="..."]`: add a `[data-brand="yourname"]`
  block to `tokens.css` to ship a new brand. Template included at the
  bottom of the file. Default brand is `zi`.
- **High-contrast axis** via `[data-contrast="high"]`: opt-in WCAG
  AAA-compliant overrides for accent, status, border, and muted tokens.
  Orthogonal to brand and theme — combine freely.
- **OKLCH fallback for older browsers**: every palette value ships with a
  hex fallback behind `@supports not (color: oklch(0 0 0))`. Safari < 15.4
  and Chrome < 111 now render with close-approximation hex values.

### Changed

- `SKILL.md` frontmatter now declares `version: 0.2.0` and describes the
  two-layer, three-axis architecture. A new **Token architecture** section
  explains the iron rule (`never reference --palette-*` in components).
- **Hard rule 3** now prefers semantic names (`--color-accent`) over legacy
  aliases (`--accent`). New **hard rule 3b** forbids palette references.
- **Intake question 7** updated: adding a brand now means appending a
  `[data-brand]` block, not editing a separate `brand.css`. **Question 8**
  added for high-contrast mode.

### Migration from 0.1.0 — **no changes required**

All 24 legacy aliases (`--accent`, `--foreground`, `--background`,
`--radius`, etc.) remain defined and now alias to the semantic layer:

```css
/* in v0.1.0 */
--accent: oklch(0.62 0.195 253.83);

/* in v0.2.0 — same visual result, new structure */
--palette-blue-500: oklch(0.62 0.195 253.83);
--color-accent:     var(--palette-blue-500);
--accent:           var(--color-accent);  /* legacy alias */
```

**Existing HTML and CSS using `var(--accent)` continues to work unchanged.**
New code should prefer `var(--color-accent)`.

### Why this matters

Before 0.2.0, changing the brand color meant a global find-and-replace on
`--accent`'s value — affecting every consumer simultaneously. After 0.2.0,
shipping a new brand is additive (add a `[data-brand]` block) and swapping
the default brand is one-line (change the palette mapping of
`--color-accent`). This is the architecture any production design system
needs to support multi-product, multi-brand, multi-theme, multi-contrast
deployment — the pattern GitHub Primer, Adobe Spectrum, and Salesforce
SLDS have used internally for years.

---

## [0.1.0] — 2026-04-17

### Initial release

- `SKILL.md` spec with activation rules, hard rules, scenario map
- `assets/tokens.css` + `assets/components.css` — single-layer tokens
  (now legacy, still accessible via aliases)
- `examples/*.html` — seven standalone style anchors (button, card, chip,
  color, input, table, typography) + `settings.tsx` React sample
- `references/` — six judgment docs (component-api, color-guide,
  token-dimensions, scenario-patterns, do-dont, react-adapters)
- `docs/` — full GitHub Pages documentation site with bilingual
  introduction, 6 foundation pages, 18 component pages
- Published to GitHub Pages at
  <https://bravohenry.github.io/zi-ui-skill/>
- Installable as a Vercel Skills agent skill via
  `npx skills add bravohenry/zi-ui-skill`
