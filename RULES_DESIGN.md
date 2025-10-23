# Sahayata UI Rules (Concise, Tailwind-first)

## Core Principles
- Purpose over decoration. Remove non-essential elements.
- Calm visuals. Prefer neutrals, subtle motion, clear hierarchy.
- Accessibility by default (WCAG 2.1 AA, keyboard-first, screen readers).
- Progressive disclosure. One primary action per view.

## Do/Don’t (enforced)
- Use only the tokens above. No custom RGB/A or arbitrary px.
- Max 4 font sizes and 2 weights. Line length ≤ 75ch.
- Neutrals for 90% of UI; `primary` only for key actions.
- No glass, parallax, multi-layer glows, or decorative animations.
- Touch targets ≥ 44px; visible focus rings; logical tab order.

## Component Guidelines (no code)
- Buttons: provide three variants only — Primary (single prominent action), Secondary (default alternative), Ghost (subtle). Each supports hover, focus, disabled states. Use concise labels and adequate spacing. Avoid icon-only buttons unless accompanied by accessible labels.
- Cards: use simple containers with subtle elevation and clear spacing. Avoid decorative shadows and complex backgrounds. Keep content hierarchy clear.
- Inputs: full-width by default where appropriate, clear labels, helpful placeholders, visible focus states, and clear error messaging. Avoid using placeholder text as a label.

## Motion
- Defaults: `duration-200 ease-out`, hover lifts `hover:-translate-y-0.5`.
- Respect `prefers-reduced-motion`. Avoid animating more than 2 props, ≤ 300ms.

## Accessibility Checklist
- Contrast: 7:1 body, 4.5:1 large text.
- Keyboard: focusable, visible `ring-2`, logical order.
- Semantics: headings, labels, `alt`, ARIA only when needed.
- Motor: spacing between controls; no time-limited tasks.

## Responsive
- Mobile-first. Use `sm/md/lg/xl` utilities; avoid fixed widths and horizontal scroll.
- Keep spacing ratios across breakpoints; text stays readable without zoom.

## Pre-merge Checks
- Visual: clear primary action, whitespace, consistent hierarchy.
- Tokens: only approved colors, spacing, type.
- A11y: keyboard + SR pass, focus visible.
- Perf: minimal DOM, no decorative motion, optimized assets.

—
Doc v1.1 · Updated Sep 2025 · Owner: Design System
