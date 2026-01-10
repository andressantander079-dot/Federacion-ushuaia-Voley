# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-23 - Mobile Navigation Pattern
**Learning:** Adding a responsive mobile menu requires managing state (`isOpen`) and toggling visibility. Accessibility requires `aria-expanded` and `aria-controls` on the toggle button.
**Action:** For simple navbars, use a local `isOpen` state and inline SVG icons to avoid dependency overhead when quick prototyping. Ensure the hamburger button is accessible.
