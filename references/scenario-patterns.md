# Scenario → Pattern Mapping

> **When to read this:** Load when the user describes a UI type (dashboard, settings, login, empty state, etc.) and you want the canonical Zi UI composition for it.

For each scenario: which primitives to compose, which to avoid, and a ready-to-adapt skeleton.

---

## Dashboard (overview of multiple resources)

**Compose:** `.card` container · `.chip--soft` for status · `.button--ghost` toolbar · `table.tbl` or grid of mini-cards · subtle `--shadow-surface` only.

**Avoid:** Tooltips on every metric, gradient backgrounds, icon-per-row decoration, sparkline noise.

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
  <div class="card">
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div class="card__description">Monthly requests</div>
      <span class="chip chip--soft chip--success"><span class="dot"></span>Healthy</span>
    </div>
    <div style="font-size: 32px; font-weight: 500;">284,921</div>
  </div>
  <!-- repeat -->
</div>
```

---

## Settings / Preferences

**Compose:** Stack of `.card` sections · each card has `.card__title` + `.card__description` · fields use `.field-group` · `.switch` for toggles · primary save at card footer.

**Avoid:** Tabs across sections (just scroll), modal popups for edits (inline instead), danger button without `.alert--warning` context above it.

```html
<div class="card">
  <div class="card__title">Account</div>
  <div class="card__description">Basic information about you.</div>
  <div class="field-group">
    <label class="label">Email</label>
    <input class="input" type="email" value="you@example.com">
  </div>
  <div class="card__footer">
    <button class="button button--primary button--sm">Save</button>
    <button class="button button--ghost button--sm">Cancel</button>
  </div>
</div>
```

---

## Empty state

**Compose:** `.card--secondary` · short muted description · **one** `.button--primary` CTA.

**Avoid:** Illustrations, multiple CTAs, exclamation marks, emoji. Empty is calm.

```html
<div class="card card--secondary" style="align-items: center; text-align: center; padding: 48px;">
  <div class="card__title">No projects yet</div>
  <div class="card__description">Create your first project to get started.</div>
  <button class="button button--primary" style="margin-top: 16px;">New project</button>
</div>
```

---

## List page (index of resources)

**Compose:** Optional header row (title + primary CTA) · `.card` wrapping a `table.tbl` · status column uses `.chip--soft` · name column can include `.avatar` + secondary line.

**Avoid:** Kebab menu on every row (only if destructive actions exist), checkbox column unless bulk actions are real, stripe rows (separator lines only).

```html
<div class="card" style="padding: 0; overflow: hidden;">
  <table class="tbl">
    <thead>
      <tr><th>Project</th><th>Status</th><th>Owner</th><th>Requests</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Pulse Studio</strong><div style="color: var(--color-muted); font-size: 12px;">pulse.zi.ui</div></td>
        <td><span class="chip chip--soft chip--success"><span class="dot"></span>Live</span></td>
        <td>Ana Kowalski</td>
        <td>284,921</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Destructive confirmation

**Compose:** `.modal` · title states the action clearly · description explains consequence · `.button--danger` + `.button--ghost` cancel · cancel is **left**, destructive is **right** (opposite of save/cancel convention for this reason).

**Avoid:** Red title color (the button carries the signal), cute copy ("oops!"), second destructive action in the same modal.

```html
<div class="modal">
  <h4>Delete workspace?</h4>
  <p>This permanently removes 284,921 records. Cannot be undone.</p>
  <div style="display: flex; justify-content: flex-end; gap: 8px;">
    <button class="button button--ghost">Cancel</button>
    <button class="button button--danger">Delete workspace</button>
  </div>
</div>
```

---

## Notification / status banner

**Compose:** `.alert` with intent matching the situation · icon + content pattern · never floating.

**Avoid:** Zi UI does NOT ship a toast component. Don't build floating dismissible toasts — use `.alert` inline at the top of the affected area.

```html
<div class="alert alert--warning">
  <svg class="icon">...</svg>
  <div class="content">
    <div class="t">Payment method expires soon</div>
    <div class="d">Update your card by April 30 to avoid service interruption.</div>
  </div>
</div>
```

---

## Detail page header

**Compose:** Single row: title + `.chip--soft` status (optional) + spacer + `.button--ghost` overflow · `.card__description` below if needed · no border-bottom (use whitespace).

**Avoid:** Breadcrumbs above the title (prefer a back button), tabs directly below header (put inside a card instead), hero images.

```html
<header style="display: flex; align-items: center; gap: 12px; padding: 24px 0;">
  <h1 style="margin: 0; font-size: 24px; font-weight: 500;">Pulse Studio</h1>
  <span class="chip chip--soft chip--success"><span class="dot"></span>Live</span>
  <div style="margin-left: auto; display: flex; gap: 8px;">
    <button class="button button--ghost button--sm">Share</button>
    <button class="button button--primary button--sm">Deploy</button>
  </div>
</header>
```

---

## Login / signup

**Compose:** Single centered `.card` (max-width ~360px) · `.field-group` per input · full-width `.button--primary` submit · secondary links below in muted text.

**Avoid:** Illustrations on one side, social login buttons as the primary option (put them below the form), remember-me checkbox (use session persistence instead).

```html
<main style="min-height: 100vh; display: grid; place-items: center; padding: 24px;">
  <div class="card" style="width: 100%; max-width: 360px;">
    <div class="card__title">Sign in</div>
    <div class="field-group">
      <label class="label">Email</label>
      <input class="input" type="email">
    </div>
    <div class="field-group">
      <label class="label">Password</label>
      <input class="input" type="password">
    </div>
    <button class="button button--primary" style="width: 100%;">Sign in</button>
    <div class="card__description" style="text-align: center;">
      Don't have an account? <a href="#" style="color: var(--color-foreground);">Create one</a>
    </div>
  </div>
</main>
```

---

## Search / filter bar

**Compose:** `.input-group` with leading search icon · `.tabs` for category filters · `.chip` for active filters (removable with × icon) · ghost button for "Clear all".

**Avoid:** Multiple rows of filters, disclosure panels, search-as-you-type without debouncing UX consideration.

---

## Data-free placeholder (loading)

**Compose:** Skeleton blocks using `--surface-secondary` background, same shape as the content that will replace them. Use `@keyframes` sparingly — a subtle opacity pulse, not a shimmer.

**Avoid:** Spinners (too jumpy), full-page loaders (load progressively instead).

---

## Quick decision tree

```
Is it…
├─ A single entity's detail page?     → Detail header + cards of sections
├─ A list of many entities?           → Table in a card (or grid of mini-cards if < 20)
├─ A configuration screen?            → Settings pattern (cards per section)
├─ An action confirmation?            → Modal (destructive) or inline alert (passive)
├─ An onboarding / empty state?       → Empty-state card with single CTA
└─ An auth screen?                    → Single centered card pattern
```

When in doubt: **one `.card` per logical section, separated by whitespace, no more than one primary action per screen.**
