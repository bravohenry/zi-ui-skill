# Zi UI Skill

**English** · [中文](./README.zh-CN.md)

A portable, token-driven CSS design system — packaged as an agent skill
compatible with Claude Code, Cursor, GitHub Copilot, and 18+ other agents
via the [Vercel Skills](https://skills.sh) ecosystem.

**Two things at once:**

1. **A working design system** — drop two CSS files into any project and
   build calm, editorial UIs out of documented classes. No npm install, no
   build step, no React dependency.
2. **A reference implementation of the Claude Design architecture** — a
   concrete, readable example of the "tokens + semantic classes + visual
   proofs + skill packaging" pattern that Anthropic's Claude Design is built
   on. Clone it, read it, fork it, reshape it into your own system.

This repo was reverse-engineered from a Claude Design project to make that
architecture legible and reusable outside Claude Design itself.

---

## Install (as a skill)

```bash
npx skills add bravohenry/zi-ui-skill
```

This installs the skill into your local agent (Claude Code, Cursor, Copilot,
etc.). After installation, your agent can build Zi UI interfaces on demand —
just ask: _"build a settings page in Zi UI"_ and it will follow the
system's rules automatically.

Works with any agent listed at [skills.sh](https://skills.sh).

## Use (as raw CSS, no agent required)

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap">
<link rel="stylesheet" href="assets/tokens.css">
<link rel="stylesheet" href="assets/components.css">

<button class="button button--primary">Save changes</button>
<span class="chip chip--soft chip--success">Live</span>
```

That's it. Two stylesheets, a handful of semantic classes, and you're done.
Works with plain HTML, React, Vue, Svelte, Astro, Rails, email templates,
anything that speaks CSS.

---

## Why this exists — the Claude Design architecture, made portable

On April 17, 2026 Anthropic launched Claude Design, an AI design tool that
generates a complete design system for your project by reading your codebase
and brand. The output is deceptively simple: a folder containing

```
foundations/        visual proofs for each token category
ref/tokens.css      the DNA — every design decision lives here
ref/components.css  semantic classes built from tokens
components/         interaction demos
index.html          navigation shell
```

No TSX. No framework. No build step. The entire design system is **two CSS
files plus a browseable documentation site**.

This is not a regression — it's the architecture GitHub Primer, Adobe
Spectrum, and Salesforce SLDS have quietly used for years: a pure-CSS truth
source at the bottom, with framework-specific wrappers (React, Vue, etc.)
as optional upper layers. Claude Design's contribution is making this
architecture cheap enough that small teams can have it in an afternoon,
instead of needing a dedicated Design Systems team.

**Zi UI Skill is what that output looks like when you package it as a
reusable, distributable skill.** It shows, concretely:

- how `tokens.css` becomes the single source of truth (`--accent`, `--radius`, `--spacing`, ...)
- how `components.css` is the *first projection* of those tokens into semantic classes (`.button`, `.card`, `.field`)
- how `examples/*.html` act as **style anchors** — real compositions the AI learns visual rhythm from
- how `references/*.md` externalize the intelligence about *when* to use *which* class (color-guide, do-dont, scenario-patterns)
- how `SKILL.md` encodes hard rules so an AI agent can enforce consistency without human review

Read the source, and you'll see the pattern. Fork it, swap in your own
tokens, and you'll have your own Zi UI.

---

## Token architecture: two layers, three axes

**Two layers.** Every token belongs to exactly one:

```
L1  --palette-*    physical values (--palette-blue-500, --palette-gray-100, ...)
                   ONLY the semantic layer consumes these. Components never.

L2  --color-*      semantic meaning (--color-accent, --color-foreground, ...)
    --radius-*     (also --space-*, --shadow-*, --ease-*)
                   Components, agents, every downstream consumer reads here.
```

**Three orthogonal theming axes** on `<html>`:

```
data-brand="zi"              data-theme="light"          data-contrast="high"
(default, or custom brand)   (or "dark")                 (opt-in WCAG AAA)

<html data-brand="zi" data-theme="dark" data-contrast="high">
```

Axes compose freely. Dark mode and high-contrast work with any brand; a
new brand only needs to redefine semantic colors, inheriting everything
else.

**Adding a new brand** = appending one block to `assets/tokens.css`:

```css
[data-brand="yourbrand"] {
  --color-accent:       var(--palette-green-500);
  --color-accent-hover: var(--palette-green-600);
  /* ...other semantic overrides */
}
```

This is the architecture GitHub Primer, Adobe Spectrum, and Salesforce
SLDS have used for years — now packaged as a ~400-line CSS file you can
fork in an afternoon.

See [`CHANGELOG.md`](./CHANGELOG.md) for the 0.1.0 → 0.2.0 migration
(spoiler: no code changes required — 24 legacy aliases preserved).

---

## Repository roles: Skill vs Docs Site

The repo is split cleanly into **two folders with zero overlap**, both
pointing at the same truth source:

```
              assets/  (the ONE truth source — shared)
             ├ tokens.css
             └ components.css
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
   THE SKILL                THE DOCS SITE
   (at repo root)           (in docs/)
   ──────────────           ──────────────
   SKILL.md                 docs/index.html
   examples/*   (anchors)   docs/foundations/*.html
   references/*             docs/components/*.html
                            docs/assets/page.css   (shell)
                            docs/assets/shell.js   (shell)
                            docs/assets/nav2.js    (shell)
```

**The skill** lives at the repo root. `npx skills add` installs exactly
this: `SKILL.md`, `assets/`, `examples/`, `references/`. An AI agent
reading the skill never touches `docs/`.

**The docs site** lives entirely in `docs/` and is served at
[bravohenry.github.io/zi-ui-skill](https://bravohenry.github.io/zi-ui-skill/).
It has its own self-contained shell (`docs/assets/page.css` + two JS
files) used nowhere else. Humans browse it to validate the visual
language and learn the architecture.

**One authoritative truth source, multiple physical mirrors.** The
authoritative `tokens.css` + `components.css` live at the repo root in
`assets/`. The docs site keeps its own copies at `docs/assets/` because
GitHub Pages serves only the `/docs` subtree and can't reach out to the
repo root at runtime. A tiny script (`scripts/sync-docs-assets.sh`)
copies root → docs whenever you change the authoritative files.

This is not duplication — it's the **exact same pattern a React component
library would use**: wrap the truth source in the package's own `dist/`,
keep the authoritative version elsewhere, sync on build. The docs site is
just another downstream consumer of the design decisions encoded in
`assets/tokens.css`. A React library would be the third consumer. An
email template system the fourth. All of them mirror `tokens.css` into
their own deployment unit.

The architectural thesis this repo demonstrates: **one authoritative
truth source, many deployment-local mirrors, all semantically equivalent
because they derive mechanically from the same source.**

---

## Repository tour

```
zi-ui-skill/
│
├── SKILL.md                    ← skill spec: activation, hard rules, scenario map
├── README.md                   ← this file (English)
├── README.zh-CN.md             ← Chinese version
├── CHANGELOG.md                ← version history (semver), migration guides
│
├── assets/                     ← AUTHORITATIVE TRUTH SOURCE (used by skill)
│   ├── tokens.css              ←   the DNA — every design decision
│   └── components.css          ←   tokens → semantic classes (.button, .card, ...)
│
├── scripts/
│   └── sync-docs-assets.sh     ← mirrors the two truth files into docs/assets/
│
│   ─── SKILL ───
│
├── examples/                   ← SKILL: standalone style anchors (AI learns rhythm)
│   ├── button.html             ←   self-contained, loads only the two CSS above
│   ├── card.html · chip.html · color.html
│   ├── input.html · table.html · typography.html
│   └── settings.tsx            ←   React wrapper sample (3+ reuse rule)
│
├── references/                 ← SKILL: judgment externalized (AI loads on demand)
│   ├── component-api.md        ←   full class inventory
│   ├── color-guide.md          ←   accent vs success vs warning vs danger
│   ├── token-dimensions.md     ←   radius / spacing / shadow / motion scales
│   ├── scenario-patterns.md    ←   dashboard? form? empty state? → patterns
│   ├── do-dont.md              ←   ✅ / ❌ anti-pattern pairs
│   └── react-adapters.md       ←   thin wrapper recipes for React projects
│
│   ─── DOCS SITE (GitHub Pages) ───
│
└── docs/                       ← DOCS SITE: self-contained, served by Pages
    ├── index.html              ←   homepage with bilingual Skill Introduction
    ├── assets/                 ←   self-contained deployment unit
    │   ├── tokens.css          ←     SYNCED MIRROR of root assets/tokens.css
    │   ├── components.css      ←     SYNCED MIRROR of root assets/components.css
    │   ├── page.css            ←     docs-only: layout + chrome styles
    │   ├── shell.js            ←     docs-only: layout renderer
    │   └── nav2.js             ←     docs-only: sidebar navigation
    ├── foundations/            ←   token visual proofs
    │   ├── color.html · motion.html · radius.html
    │   └── shadow.html · spacing.html · typography.html
    └── components/             ←   exhaustive component pages
        ├── alert.html · avatar.html · badge.html · button.html
        ├── card.html · checkbox.html · chip.html · input.html
        ├── menu.html · modal.html · progress.html · radio.html
        ├── slider.html · switch.html · table.html · tabs.html
        └── textarea.html · tooltip.html
```

All 24 pages under `docs/foundations/` and `docs/components/` reference
`../assets/tokens.css` and `../assets/components.css` — they consume the
docs-local mirror of the truth source. The `docs/assets/` folder contains
both the docs-site-specific shell (page.css/shell.js/nav2.js) and the
synced mirrors of the authoritative CSS from the repo root. Run
`scripts/sync-docs-assets.sh` whenever you edit `assets/tokens.css` or
`assets/components.css` to propagate changes into the docs site.

### Reading order (if you want to learn the architecture)

1. **Visit [the docs site](https://bravohenry.github.io/zi-ui-skill/)** — 5 minutes. Feel the system as a user.
2. **`assets/tokens.css`** — 5 minutes. See the complete truth source.
3. **`assets/components.css`** — 10 minutes. See how tokens become classes.
4. **`SKILL.md`** — 15 minutes. Read the rules the AI follows.
5. **`examples/` and `references/`** — skim. These are the standalone style anchors and judgment docs the AI loads on demand.

One hour and you'll understand the whole thing.

---

## Design philosophy

Zi UI's visual language, in one paragraph:

> Flat. Neutral palette with one restrained accent (default OKLCH blue).
> Low chroma, high contrast. Font-weight cap at 500 — hierarchy comes from
> size and color, never from bold. Geist typeface. No gradients, no glows,
> no decorative shadows. One primary action per screen. If it looks boring
> at first glance, it's working.

This aesthetic is **one instance** of the architecture. The architecture
itself is agnostic — swap `tokens.css` for playful colors, rounded radii,
and bold weights, and you get a playful system on the same bones.

---

## Customize it for your own brand

The skill is designed to be forked.

1. Fork this repo.
2. Edit `assets/tokens.css` — change `--accent`, `--radius-*`, `--spacing`,
   typography scales. **This is the one file that defines your brand.**
3. (Optional) Add/remove classes in `assets/components.css` to match your
   component vocabulary.
4. Update `examples/*.html` so the style anchors reflect your new tokens.
5. Rewrite `SKILL.md` frontmatter (`name`, `description`) to identify your
   system.
6. Push. Now `npx skills add <yourname>/<your-repo>` installs your system.

The `tokens.css` file is the only thing you truly have to change. Everything
else flows from it.

---

## What this skill does **not** include

By design, this skill does not ship:

- A React component library (`.tsx` files). Wrappers are generated
  on-demand per project because different codebases want different shapes.
  See `references/react-adapters.md` for the generation pattern.
- A Tailwind preset / shadcn registry. Those would couple the design
  system to a specific framework. The point of the CSS-first approach is
  framework independence.
- A Figma plugin. The `foundations/*.html` visual proofs are the designer
  handoff — designers open them in a browser to validate the visual
  language, without needing Figma access.
- A runtime JavaScript bundle. There is no `ZiProvider`, no theme hook,
  no JS dependency. Dark mode is `data-theme="dark"` on `<html>`, handled
  entirely in CSS.

This is intentional restraint. The less this skill ships, the more places
it can go.

---

## Credits & inspiration

- **Claude Design** ([anthropic.com/news/claude-design-anthropic-labs](https://www.anthropic.com/news/claude-design-anthropic-labs))
  — the architecture pattern this skill demonstrates.
- **shadcn/ui** — for proving copy-paste beats npm install, and for
  popularizing CSS-variable-driven theming.
- **GitHub Primer / Adobe Spectrum / Salesforce SLDS** — for maintaining,
  long before AI made it cheap, the two-layer architecture (pure CSS
  truth source + optional framework wrappers) this skill reproduces.
- **BEM** — for the semantic class naming convention that makes
  `components.css` legible to both humans and language models.
- **Vercel Skills** ([skills.sh](https://skills.sh)) — for the open skill
  ecosystem that makes distribution this easy.

---

## License

MIT. Fork it, ship it, rename it, sell it — no attribution required (but
appreciated).

If you build something with it, or extend the architecture in an
interesting direction, open an issue or PR. I'd love to see it.
