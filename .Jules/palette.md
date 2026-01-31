# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Motion & Mobile
**Learning:** `animate-pulse` can be distracting on full-width mobile menu items and may cause motion sickness.
**Action:** Use static color highlights for mobile menus and ensure `motion-reduce:animate-none` is always paired with animation classes on desktop.
