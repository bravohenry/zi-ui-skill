// ROLE: React on-demand wrapper sample. Demonstrates: thin TSX wrappers (Button, Input, FieldGroup, Switch, Card, Chip) generated only for components used 3+ times, controlled state pattern with data-selected, inline styles for layout only. Use as the canonical shape for any wrapper you generate.

// Example: a Settings page in a React/Next.js project using Zi UI.
//
// This shows the "on-demand wrapper" approach from references/react-adapters.md.
// Components below would live in components/ui/ (one file each). Here they're
// inlined so you can see the full picture.
//
// Setup (done once at project root):
//   - Copy assets/tokens.css and assets/components.css into the project
//   - Import them in app/layout.tsx (or main.tsx for Vite)
//   - Load the Geist font

import { useState } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

/* ---------- Button wrapper ---------- */
type ButtonVariant =
  | "primary" | "secondary" | "tertiary"
  | "ghost" | "outline" | "danger" | "danger-soft";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

function Button({ variant = "primary", size = "md", className = "", ...rest }: ButtonProps) {
  const classes = [
    "button",
    `button--${variant}`,
    size !== "md" && `button--${size}`,
    className,
  ].filter(Boolean).join(" ");
  return <button className={classes} {...rest} />;
}

/* ---------- Input wrapper ---------- */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

function Input({ invalid, className = "", ...rest }: InputProps) {
  return (
    <input
      className={`input ${className}`.trim()}
      data-invalid={invalid || undefined}
      {...rest}
    />
  );
}

/* ---------- FieldGroup wrapper ---------- */
function FieldGroup({
  label, helper, children,
}: { label: string; helper?: string; children: ReactNode }) {
  return (
    <div className="field-group">
      <label className="label">{label}</label>
      {children}
      {helper && <span className="label-helper">{helper}</span>}
    </div>
  );
}

/* ---------- Switch wrapper (controlled) ---------- */
function Switch({
  checked, onChange, label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="switch" data-selected={checked ? "true" : "false"}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="switch__control">
        <span className="switch__thumb" />
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
}

/* ---------- Card wrappers ---------- */
function Card(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`card ${props.className ?? ""}`.trim()} />;
}
function CardTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className={`card__title ${props.className ?? ""}`.trim()} />;
}
function CardDescription(props: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className={`card__description ${props.className ?? ""}`.trim()} />;
}

/* ---------- Chip wrapper ---------- */
function Chip({
  intent, children,
}: { intent: "success" | "warning" | "danger" | "accent"; children: ReactNode }) {
  return (
    <span className={`chip chip--soft chip--${intent}`}>
      <span className="dot" />{children}
    </span>
  );
}

/* ========== The actual page ========== */
export default function SettingsPage() {
  const [email, setEmail] = useState("jamal@hero.ui");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px" }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: 0 }}>Settings</h1>
        <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
          Manage your account preferences.
        </p>
      </header>

      {/* Account section */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <CardTitle style={{ margin: 0 }}>Account</CardTitle>
          <Chip intent="success">Verified</Chip>
        </div>
        <CardDescription>Basic information about you.</CardDescription>

        <FieldGroup
          label="Email address"
          helper={emailInvalid ? "Must be a valid email." : "We use this to sign you in."}
        >
          <Input
            type="email"
            value={email}
            invalid={emailInvalid}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailInvalid(!e.target.value.includes("@"));
            }}
          />
        </FieldGroup>

        <div className="card__footer">
          <Button variant="primary" size="sm">Save</Button>
          <Button variant="ghost" size="sm">Cancel</Button>
        </div>
      </Card>

      {/* Notifications section */}
      <Card>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what lands in your inbox.</CardDescription>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
          <Switch
            checked={emailNotifs}
            onChange={setEmailNotifs}
            label="Email notifications"
          />
          <Switch
            checked={weeklyDigest}
            onChange={setWeeklyDigest}
            label="Weekly digest"
          />
        </div>
      </Card>
    </main>
  );
}

/*
Notes for the AI reading this example:

1. Wrappers are thin — they only compose class names and pass props through.
   No styled-components, no emotion, no CSS-in-JS.

2. Every state component (Switch, Checkbox, Radio) is controlled. The parent
   owns the boolean; the wrapper flips data-selected accordingly.

3. Invalid input uses data-invalid, not a className. Zi UI styles it via
   attribute selectors.

4. Card doesn't need many variants, so the wrapper is trivial. When a
   component is used ONCE, skip the wrapper and use <div className="card">
   directly — premature wrapping is a smell.

5. Inline styles (marginBottom, maxWidth, etc.) are used for *layout*, which
   Zi UI doesn't own. Don't invent new visual tokens here.

6. The Chip wrapper hard-codes chip--soft because in this project that's the
   only form used. If primary chips are also needed, add a `style` prop.
   Don't build a kitchen-sink API upfront.
*/
