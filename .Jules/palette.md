# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Navigation State & Accessibility
**Learning:** Next.js App Router navigation links do not have built-in active states. Converting to Client Component (`usePathname`) is required for visual feedback and `aria-current`.
**Action:** Always implement `aria-current="page"` on active navigation links to ensure screen readers announce the current page context.
