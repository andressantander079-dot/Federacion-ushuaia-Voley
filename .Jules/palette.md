# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Responsive Dead Ends
**Learning:** Hiding desktop navigation (`hidden sm:flex`) without a mobile alternative creates a complete blockage for mobile users.
**Action:** Always pair responsive hiding with a `useState`-controlled mobile menu using accessible `aria-expanded` toggles.
