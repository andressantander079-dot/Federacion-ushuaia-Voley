## 2024-05-23 - Active Navigation States
**Learning:** Users lack context of their current location without active visual cues on navigation links. Implementing `aria-current="page"` alongside visual changes provides a robust "wayfinding" experience for both visual and screen reader users.
**Action:** Always check navigation components for active state logic (`usePathname`) and ARIA attributes (`aria-current`). Refactor repetitive class strings into helper functions to keep code clean and maintainable.
