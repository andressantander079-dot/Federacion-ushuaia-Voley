# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Pulse Animation & Mobile
**Learning:** `animate-pulse` on text can be distracting on mobile devices where screen real estate is limited.
**Action:** Use `md:animate-pulse` to restrict the effect to desktop, keeping mobile UI static and clean.
