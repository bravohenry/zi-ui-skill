# Do / Don't — expanded anti-patterns

> **When to read this:** Load when about to make a non-obvious choice (nesting cards, mixing variants, adding animations, writing dark-mode overrides) and want to double-check it's not an anti-pattern.

## Layout

### ❌ Don't nest cards deeply
```html
<div class="card">
  <div class="card card--secondary">
    <div class="card card--tertiary">   <!-- stop! -->
```
**Instead:** Use one `card` as the container, then `separator` lines or spacing to create sections inside.

### ❌ Don't build grids with inline flex soup
```html
<div style="display:flex;flex-wrap:wrap;gap:8px;...">
```
**Instead:** Use CSS Grid in your page stylesheet — Zi UI doesn't ship a grid, you own layout.

### ❌ Don't cram controls into one row
A card header with title + description + 4 buttons + a chip + a menu is too much. Split it.

---

## Color

### ❌ Don't invent colors
```css
.my-thing { background: #eef6ff; }   /* what semantic meaning? */
```
**Instead:** `background: var(--color-accent-soft)` — now it means "accent, passive".

### ❌ Don't use accent for everything
If every button is primary, nothing is primary. **One `--primary` per screen** (ideally per view).

### ❌ Don't mix semantic meanings
A "Confirm" button in green is wrong — confirm is the primary action, so it's `--accent` (blue). Green (`--success`) is for *state*, not *action*.

### ❌ Don't use `--muted` for headings
Muted is for secondary text. Headings use `--foreground`.

---

## Typography

### ❌ Don't write `font-weight: 700`
The system tops out at 500. Use size/color contrast for hierarchy.

### ❌ Don't use fonts other than Geist
If you need a monospace (keyboard shortcuts), components already use `"JetBrains Mono"` — don't add another.

### ❌ Don't set `letter-spacing` everywhere
Geist is tuned. `letter-spacing: -0.015em` is only on large display text (`modal h4`). Don't sprinkle.

---

## Buttons

### ❌ Don't use `.button` alone
```html
<button class="button">Click</button>   <!-- invisible -->
```
Always pair with a variant.

### ❌ Don't combine conflicting variants
```html
<button class="button button--primary button--danger">   <!-- which is it? -->
```
Pick one.

### ❌ Don't style buttons inline
```html
<button class="button button--primary" style="border-radius: 4px">
```
The whole point is consistency. Don't opt out.

### ❌ Don't use ghost buttons on busy backgrounds
Ghost is invisible until hover — fine on toolbars, bad on patterned surfaces.

---

## Forms

### ❌ Don't put labels inline with inputs
```html
<label>Email <input></label>   <!-- cramped -->
```
**Instead:** `.field-group` wrapper, label above, helper below.

### ❌ Don't show errors without context
A red border alone isn't enough. Pair `data-invalid` with helper text explaining *why*.

### ❌ Don't disable buttons without explanation
A grayed-out "Save" with no reason frustrates users. Either enable it and handle errors on click, or show a helper message.

---

## Icons

### ❌ Don't use emoji
`🚀 Launch` — no. Use a real icon, or leave icon-less.

### ❌ Don't mix icon styles
Pick one library (Lucide, Phosphor, Heroicons) for the whole project. Don't mix.

### ❌ Don't use icons without labels
Icon-only buttons are fine **with `aria-label`**. Never bare.

---

## Animation

### ❌ Don't add entrance animations
Cards don't fade in, buttons don't bounce. Zi UI is calm. Transitions on hover/focus are enough.

### ❌ Don't animate color changes longer than 250ms
The token set specifies transitions already. Don't override to 600ms "feel-good" durations.

---

## Dark mode

### ❌ Don't write dark-mode overrides
```css
[data-theme="dark"] .my-thing { color: white; }   /* wrong */
```
If the variable system is used correctly, this is never needed. If it *is* needed, you hard-coded a color somewhere — fix that instead.

### ❌ Don't test only in light mode
Always flip `data-theme="dark"` before shipping. Contrast bugs love to hide.

---

## Mixing with other systems

### ❌ Don't use Tailwind alongside Zi UI
Two token systems in one page guarantees drift. Pick one.

### ❌ Don't pull in Material, Chakra, Bootstrap components
Even one MUI component in a Zi UI page looks wrong — different radius, different type scale, different shadow rhythm.

### ❌ Don't override components.css
If a component needs changing for everyone, edit the source. If it needs changing just for you, compose a new class in your page — don't monkey-patch shared CSS.
