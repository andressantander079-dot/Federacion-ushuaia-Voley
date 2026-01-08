## 2024-05-23 - Discrete vs. Accessible
**Learning:** The "Acceso Clubes" link used `text-gray-300` to be "discrete", but this failed WCAG contrast guidelines.
**Action:** Use `text-gray-500` for "discrete" text to ensure minimum 4.5:1 contrast, or use opacity cautiously.

## 2024-05-24 - Dependency Uncertainty
**Learning:** When dependency installation cannot be verified (missing `package.json` or locked environment), relying on external icon libraries like `lucide-react` is risky.
**Action:** Use inline SVGs for critical UI elements like navigation icons to ensure functionality regardless of build environment state.
