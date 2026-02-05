# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Inline Icons & Dependency Constraints
**Learning:** Missing `package.json` prevents dependency resolution, so `lucide-react` imports are unavailable.
**Action:** Use inline SVGs for all icons. Ensure `aria-hidden="true"` on the SVG and provide a clear `aria-label` on the interactive parent element.
