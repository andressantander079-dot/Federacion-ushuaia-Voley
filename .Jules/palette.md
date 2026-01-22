# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Navigation Feedback & Mobile First
**Learning:** Initial prototypes often skip mobile navigation and active states, leaving users lost. Implementing these early with simple logic (usePathname) and standard patterns (hamburger) drastically improves usability without complex dependencies.
**Action:** Always check for mobile menu implementation in "responsive" layouts and verify active link states are visual, not just functional.
