# Component API Reference

> **When to read this:** Load when composing a page with Zi UI. This is the closed set of classes the skill supports. If a need doesn't match anything here, reshape the layout — don't invent.

Complete inventory of classes. **This is a closed set** — if it's not listed here, it doesn't exist in Zi UI.

---

## Button

```html
<button class="button button--primary">Create</button>
<button class="button button--secondary">Save draft</button>
<button class="button button--tertiary">Maybe later</button>
<button class="button button--ghost">Cancel</button>
<button class="button button--outline">Learn more</button>
<button class="button button--danger">Delete</button>
<button class="button button--danger-soft">Remove</button>

<!-- Sizes -->
<button class="button button--primary button--sm">Small</button>
<button class="button button--primary button--lg">Large</button>

<!-- Icon only -->
<button class="button button--ghost button--icon" aria-label="Settings">
  <svg>...</svg>
</button>

<!-- Disabled -->
<button class="button button--primary" disabled>Working…</button>
```

---

## Input / Form fields

```html
<div class="field-group">
  <label class="label">Email</label>
  <input class="input" type="email" placeholder="you@company.com">
  <span class="label-helper">Helper text</span>
</div>

<!-- Invalid state -->
<input class="input" data-invalid value="not-an-email">

<!-- Secondary (no shadow, neutral bg) -->
<input class="input input--secondary">

<!-- Textarea -->
<textarea class="input textarea" rows="4"></textarea>

<!-- Input with leading icon -->
<div class="input-group">
  <svg>...</svg>
  <input placeholder="Search">
</div>
```

---

## Chip

```html
<!-- Soft (default for status) -->
<span class="chip chip--soft chip--success">
  <span class="dot"></span>Live
</span>
<span class="chip chip--soft chip--warning">Degraded</span>
<span class="chip chip--soft chip--danger">Offline</span>
<span class="chip chip--soft chip--accent">New</span>

<!-- Primary (solid, higher emphasis) -->
<span class="chip chip--primary chip--accent">Featured</span>

<!-- Neutral (no color modifier) -->
<span class="chip">Draft</span>

<!-- Sizes -->
<span class="chip chip--sm chip--soft chip--success">Live</span>
<span class="chip chip--lg chip--soft chip--success">Live</span>
```

---

## Badge

```html
<!-- On an avatar -->
<div class="badge-anchor">
  <div class="avatar">AK</div>
  <span class="badge badge--primary badge--danger badge--sm top-right">3</span>
</div>

<!-- Standalone -->
<span class="badge badge--soft badge--accent">12</span>
```

---

## Card

```html
<div class="card">
  <h3 class="card__title">Weekly digest</h3>
  <p class="card__description">Summary of activity across your workspaces.</p>
  <div class="card__footer">
    <button class="button button--primary button--sm">Read</button>
    <button class="button button--ghost button--sm">Dismiss</button>
  </div>
</div>

<!-- Nested / sunken -->
<div class="card card--secondary">...</div>
<div class="card card--tertiary">...</div>
```

---

## Alert

```html
<div class="alert alert--success">
  <svg class="icon">...</svg>
  <div class="content">
    <div class="t">Deployed successfully</div>
    <div class="d">Version 2.4.1 is live in production.</div>
  </div>
</div>
```

Variants: `alert--accent`, `alert--success`, `alert--warning`, `alert--danger`.

---

## Switch

```html
<label class="switch" data-selected="true">
  <input type="checkbox" checked>
  <span class="switch__control"><span class="switch__thumb"></span></span>
  <span class="switch__label">Email notifications</span>
</label>
```

Toggle `data-selected="true"` / `"false"` on the root to flip state.
Sizes: `switch--sm`, `switch--lg`.

---

## Checkbox / Radio

```html
<!-- Checkbox -->
<label class="check" data-selected="true">
  <input type="checkbox" checked>
  <span class="box">
    <svg viewBox="0 0 11 8"><polyline points="1 4 4 7 10 1"/></svg>
  </span>
  Receive updates
</label>

<!-- Radio -->
<label class="check" data-selected="true">
  <input type="radio" name="plan" checked>
  <span class="circle"></span>
  Pro plan
</label>
```

---

## Tabs

```html
<div class="tabs">
  <button class="active">Overview</button>
  <button>Activity</button>
  <button>Settings</button>
</div>
```

---

## Avatar

```html
<div class="avatar">AK</div>
<div class="avatar avatar--sm">A</div>
<div class="avatar avatar--lg gradient-2">JS</div>

<!-- Stacked -->
<div class="stack-h">
  <div class="avatar">AK</div>
  <div class="avatar">JS</div>
  <div class="avatar">MR</div>
</div>
```

Gradient variants: `gradient-1` (blue→pink), `gradient-2` (green→amber), `gradient-3` (red→orange).

---

## Menu

```html
<div class="menu">
  <div class="item">Profile <span class="kbd">⌘P</span></div>
  <div class="item">Settings <span class="kbd">⌘,</span></div>
  <div class="sep"></div>
  <div class="item danger">Sign out</div>
</div>
```

---

## Progress

```html
<!-- Linear -->
<div class="progress"><div style="width: 64%"></div></div>

<!-- Circular -->
<div class="progress-circle">
  <svg viewBox="0 0 48 48">
    <circle class="bg" cx="24" cy="24" r="20"/>
    <circle class="fg" cx="24" cy="24" r="20"
            stroke-dasharray="126" stroke-dashoffset="45"/>
  </svg>
</div>
```

---

## Slider

```html
<div class="slider">
  <div class="slider__track">
    <div class="slider__fill" style="width: 60%"></div>
    <div class="slider__thumb" style="left: 60%"></div>
  </div>
</div>
```

---

## Table

```html
<table class="tbl">
  <thead>
    <tr><th>Project</th><th>Status</th><th>Requests</th></tr>
  </thead>
  <tbody>
    <tr><td>Pulse Studio</td><td><span class="chip chip--soft chip--success">Live</span></td><td>284,921</td></tr>
  </tbody>
</table>
```

Wrap in a `.card` for the standard boxed look.

---

## Modal

```html
<div class="modal">
  <h4>Delete workspace?</h4>
  <p>This permanently removes all data. Cannot be undone.</p>
  <div style="display: flex; justify-content: flex-end; gap: 8px;">
    <button class="button button--ghost">Cancel</button>
    <button class="button button--danger">Delete</button>
  </div>
</div>
```

---

## Tooltip

```html
<span class="tip">Shift + Enter to submit</span>
```

Positioning is up to the consumer (use your own popover lib).
