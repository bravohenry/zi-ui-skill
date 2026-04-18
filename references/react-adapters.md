# React Adapters — on-demand wrapper recipes

> **When to read this:** Load only when the target project is React / Next.js / Vite. Skip for HTML-only projects.

Zi UI is a CSS system. When using it in a React/Next.js/Vite project, **do not write raw `className="button button--primary"` strings everywhere**. Instead, generate thin wrapper components **on demand** — only the ones this specific project needs.

---

## Core principle

> CSS is the truth. React components are a disposable wrapper.

Wrappers should be:
- **Thin** — they compose class names and pass props through. No logic, no styled-components, no emotion.
- **Project-shaped** — TypeScript if the project uses it; JavaScript/JSX otherwise. Match file layout, naming, and export style.
- **Replaceable** — if a wrapper is wrong, delete it. The CSS still works.

---

## Decision tree: do I generate a wrapper?

```
Is this component used in 3+ places in the project?
├─ No  → Use raw className. Move on.
└─ Yes → Generate a wrapper.
          └─ Does the project have tsconfig.json?
              ├─ Yes → .tsx with TypeScript types
              └─ No  → .jsx with JSDoc (optional)
```

**Default location:** `components/ui/` (or wherever the project keeps shared UI). One file per component.

---

## Standard wrapper template

Use this shape for every wrapper. Only the `variant`/`size` lists and the class prefix change.

### TSX

```tsx
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "ghost"
             | "outline" | "danger" | "danger-soft";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = [
    "button",
    `button--${variant}`,
    size !== "md" && `button--${size}`,
    icon && "button--icon",
    className,
  ].filter(Boolean).join(" ");

  return <button className={classes} {...rest} />;
}
```

### JSX (no TypeScript)

```jsx
export function Button({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...rest
}) {
  const classes = [
    "button",
    `button--${variant}`,
    size !== "md" && `button--${size}`,
    icon && "button--icon",
    className,
  ].filter(Boolean).join(" ");

  return <button className={classes} {...rest} />;
}
```

---

## Per-component recipes

Every wrapper maps React props onto CSS modifier classes. Here's the mapping for each primitive.

### Button

| Prop | Value | Class added |
|---|---|---|
| `variant` | `"primary"` / `"secondary"` / `"tertiary"` / `"ghost"` / `"outline"` / `"danger"` / `"danger-soft"` | `button--{variant}` |
| `size` | `"sm"` / `"md"` (default) / `"lg"` | `button--sm` / `button--lg` (skip for `md`) |
| `icon` | `true` | `button--icon` |

### Input

```tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  secondary?: boolean;
}

export function Input({ invalid, secondary, className = "", ...rest }: InputProps) {
  const classes = [
    "input",
    secondary && "input--secondary",
    className,
  ].filter(Boolean).join(" ");

  return <input className={classes} data-invalid={invalid || undefined} {...rest} />;
}
```

### FieldGroup (label + input + helper)

```tsx
interface FieldGroupProps {
  label: string;
  helper?: string;
  children: ReactNode;
}

export function FieldGroup({ label, helper, children }: FieldGroupProps) {
  return (
    <div className="field-group">
      <label className="label">{label}</label>
      {children}
      {helper && <span className="label-helper">{helper}</span>}
    </div>
  );
}
```

### Chip

```tsx
type ChipIntent = "accent" | "success" | "warning" | "danger";
type ChipStyle = "soft" | "primary";

interface ChipProps {
  intent?: ChipIntent;
  style?: ChipStyle;           // "soft" = passive, "primary" = emphatic
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  children: ReactNode;
}

export function Chip({ intent, style = "soft", size = "md", dot, children }: ChipProps) {
  const classes = [
    "chip",
    intent && `chip--${style}`,
    intent && `chip--${intent}`,
    size !== "md" && `chip--${size}`,
  ].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}
```

### Card

```tsx
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "secondary" | "tertiary";
}

export function Card({ tone = "default", className = "", ...rest }: CardProps) {
  const classes = [
    "card",
    tone !== "default" && `card--${tone}`,
    className,
  ].filter(Boolean).join(" ");
  return <div className={classes} {...rest} />;
}

export function CardTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={`card__title ${props.className ?? ""}`} />;
}
export function CardDescription(props: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={`card__description ${props.className ?? ""}`} />;
}
export function CardFooter(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`card__footer ${props.className ?? ""}`} />;
}
```

### Switch (controlled)

```tsx
interface SwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, size = "md", disabled }: SwitchProps) {
  const classes = ["switch", size !== "md" && `switch--${size}`]
    .filter(Boolean).join(" ");
  return (
    <label className={classes} data-selected={checked ? "true" : "false"}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="switch__control"><span className="switch__thumb" /></span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
}
```

### Checkbox

```tsx
interface CheckboxProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  children?: ReactNode;
}

export function Checkbox({ checked, onChange, children }: CheckboxProps) {
  return (
    <label className="check" data-selected={checked ? "true" : "false"}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="box">
        <svg viewBox="0 0 11 8">
          <polyline points="1 4 4 7 10 1" fill="none" />
        </svg>
      </span>
      {children}
    </label>
  );
}
```

### Radio (same shape, swap `.box` → `.circle`)

```tsx
export function Radio({ checked, onChange, name, children }) {
  return (
    <label className="check" data-selected={checked ? "true" : "false"}>
      <input type="radio" name={name} checked={checked} onChange={() => onChange(true)} />
      <span className="circle" />
      {children}
    </label>
  );
}
```

### Tabs

```tsx
interface TabsProps<T extends string> {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}

export function Tabs<T extends string>({ value, onChange, options }: TabsProps<T>) {
  return (
    <div className="tabs" role="tablist">
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          className={opt.value === value ? "active" : undefined}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
```

### Avatar

```tsx
interface AvatarProps {
  initials?: string;
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  gradient?: 1 | 2 | 3;
}

export function Avatar({ initials, src, alt, size = "md", gradient }: AvatarProps) {
  const classes = [
    "avatar",
    size !== "md" && `avatar--${size}`,
    gradient && `gradient-${gradient}`,
  ].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      {src ? <img src={src} alt={alt ?? ""} /> : initials}
    </div>
  );
}
```

### Alert

```tsx
interface AlertProps {
  intent: "accent" | "success" | "warning" | "danger";
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function Alert({ intent, title, description, icon }: AlertProps) {
  return (
    <div className={`alert alert--${intent}`} role="alert">
      {icon && <span className="icon">{icon}</span>}
      <div className="content">
        <div className="t">{title}</div>
        {description && <div className="d">{description}</div>}
      </div>
    </div>
  );
}
```

---

## Styling entry point

Set this up once in the project root.

### Next.js (app router)

```tsx
// app/layout.tsx
import "./globals.css";          // imports tokens.css + components.css
```

```css
/* app/globals.css */
@import "../styles/tokens.css";
@import "../styles/components.css";

body {
  margin: 0;
  background: var(--color-background);
  color: var(--color-foreground);
  font: 400 14px/1.5 "Geist", sans-serif;
}
```

### Vite

```tsx
// src/main.tsx
import "./styles/tokens.css";
import "./styles/components.css";
import "./index.css";
```

---

## Controlled vs uncontrolled

Zi UI's state components (switch, checkbox, radio) rely on the `data-selected` attribute for styling. **Always build controlled wrappers** — the parent owns the boolean, the wrapper reflects it. Uncontrolled is allowed only if the component doesn't need styling feedback (which, for Zi UI, is never).

---

## forwardRef (only when needed)

Add `forwardRef` only if a consumer asks for a ref. Don't ship it by default — premature generalization.

```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = "primary", ...rest }, ref) {
    // ... same as before
    return <button ref={ref} className={classes} {...rest} />;
  }
);
```

---

## What NOT to generate

- ❌ A `<Modal />` / `<Popover />` / `<Tooltip />` component with portal + focus trap logic.
  Zi UI only provides the visual shell. Use Radix UI / Ark UI headless primitives and apply the Zi UI class on their rendered element.
- ❌ A `<Table />` component with sorting/pagination.
  Table is just CSS. Use TanStack Table (headless) and style with `.tbl`.
- ❌ Styled-components / Emotion wrappers. Zi UI is class-based; don't re-invent.
- ❌ A kitchen-sink `<ZiProvider />`. No runtime needed; tokens are CSS variables.

---

## Example: building a settings screen

User says: "use Zi UI to build a settings page in my Next.js project".

Generated files:
```
components/ui/
  Button.tsx          ← used 4 times on the page
  Input.tsx           ← used 3 times
  FieldGroup.tsx      ← used 3 times
  Switch.tsx          ← used 2 times
  Card.tsx            ← used once — skip wrapper, use raw <div className="card">
app/settings/
  page.tsx            ← uses the wrappers above
app/globals.css       ← imports tokens.css + components.css
styles/
  tokens.css          ← copied from skill
  components.css      ← copied from skill
```

Only generate wrappers that earn their place. Everything else stays raw `className`.
