# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Active State & Wayfinding
**Learning:** Navigation bars without active state indicators cause user disorientation and fail WCAG criteria for understanding location.
**Action:** Always use `usePathname` (Client Component) to apply distinct visual styles and `aria-current="page"` to the active navigation item.
