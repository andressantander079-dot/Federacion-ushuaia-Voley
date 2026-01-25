# Palette's Journal

## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Motion Safety for Live Indicators
**Learning:** The "En Vivo" pulsing indicator needs `motion-reduce:animate-none` to respect user motion preferences.
**Action:** Always pair `animate-pulse` (or other animations) with `motion-reduce:animate-none`.
