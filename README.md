# Zi UI Skill

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

## Repository tour

```
zi-ui-skill/
├── SKILL.md              ← the spec: activation rules, hard rules, scenario → pattern map
├── README.md             ← this file
├── assets/
│   ├── tokens.css        ← THE DNA: colors, radius, spacing, shadows, motion
│   └── components.css    ← tokens projected into semantic classes (.button, .card, ...)
├── examples/
│   ├── index.html        ← full system overview
│   ├── button.html       ← style anchor for buttons
│   ├── card.html
│   ├── chip.html
│   ├── color.html
│   ├── input.html
│   ├── table.html
│   ├── typography.html
│   └── settings.tsx      ← React wrapper sample (on-demand, 3+ reuse rule)
└── references/
    ├── component-api.md       ← full class inventory
    ├── color-guide.md         ← when to use accent vs success vs warning vs danger
    ├── token-dimensions.md    ← radius / spacing / shadow / motion scales
    ├── scenario-patterns.md   ← dashboard? form? empty state? → canonical compositions
    ├── do-dont.md             ← anti-patterns with ✅ / ❌ examples
    └── react-adapters.md      ← how to build thin wrappers when the project is React
```

### Reading order (if you want to learn the architecture)

1. **`assets/tokens.css`** — 5 minutes. See the complete truth source.
2. **`assets/components.css`** — 10 minutes. See how tokens become classes.
3. **`examples/index.html`** — open in browser. Feel the system.
4. **`SKILL.md`** — 15 minutes. Read the rules the AI follows.
5. **`references/`** — skim. These are loaded on demand when composing UI.

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
