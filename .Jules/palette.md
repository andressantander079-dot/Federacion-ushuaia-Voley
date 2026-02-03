# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Active Link Precision
**Learning:** Navigation relies on `usePathname` and strict equality (`===`) to apply active styles, ensuring users know exactly where they are.
**Action:** Always extract links to constants and use `aria-current="page"` with strict path matching for navigation.
