# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Responsive Navigation State
**Learning:** Converting static navbars to responsive ones requires `'use client'`, state for visibility, and critical ARIA attributes (`aria-expanded`, `aria-controls`) to ensure accessibility.
**Action:** Always extract links to a constant (e.g., `NAV_LINKS`) to ensure consistency between desktop and mobile menus and simplify active state logic.
