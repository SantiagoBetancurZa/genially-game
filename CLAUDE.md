# Working in this repo

Juego narrativo de decisiones para escritorio (visual-novel ~16:9). Stack: React 19 + Vite + TypeScript + Zustand + Framer Motion + Lucide React. CSS vanilla con design tokens.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor dev en http://localhost:5173 |
| `npm run build` | Typecheck (`tsc -b`) + bundle de producción |
| `npm run lint` | ESLint sobre `**/*.{ts,tsx}` |
| `node scripts/optimize-assets.mjs` | Optimiza PNGs de `raw_assets/` → JPEG (fondos) o PNG downscaled (personajes) en `public/assets/` |

## Convenciones que NO debes romper

- **Solo escritorio.** No añadas media queries para tablet/mobile. El `<Stage>` es 16:9 fijo y todo escala con `clamp()`. La única `@media` permitida es `prefers-reduced-motion`.
- **Una pantalla = un componente** en `src/components/screens/<Name>Screen.tsx` + `.css` co-located.
- **Pantallas se registran en dos sitios:** `src/types/game.ts` (union `Screen`) y `src/components/ScreenManager.tsx` (switch). TypeScript rompe el build si solo registrás en uno.
- **Usá los primitivos compartidos** en lugar de recrearlos: `<Stage>`, `<TopBar>`, `<DialogBox>`, `<TitleBlock>`. Si necesitás algo nuevo y reutilizable, vive en `src/components/layout/` o `src/components/ui/`.
- **Diálogos = datos.** Construí `DialogContent` con `segments: DialogSegment[]` (ver `src/types/game.ts`). No uses markdown ni JSX inline para texto narrativo — eventualmente la copy se mueve a JSON.
- **Assets se referencian vía `ASSETS`** de `src/config/assets.ts`. No hardcodees rutas en componentes.
- **Design tokens viven en `src/index.css`.** No introduzcas colores/radii/sombras nuevas sin añadirlos como `--*`. El dorado real de la UI es `var(--color-gold)` (#d6aa4d), NO `--color-accent` (que es un crema).
- **No commitees `raw_assets/`** — está en `.gitignore`. Las fuentes pesadas (PSD/AI/PNG 4K) viven ahí; lo que se sirve al navegador vive en `public/assets/`.
- **Optimizá assets >2MB** antes de commitear. Targets: personajes <2.5MB, fondos <1MB, UI <50KB. Usá `scripts/optimize-assets.mjs`.

## Patrones a seguir

- **Animaciones:** `framer-motion`, duraciones cortas (0.4–0.6s), delays escalonados (0.1, 0.2, 0.4s) para entradas en cascada.
- **Iconos:** `lucide-react`, tamaños 18–24px, color heredado del padre (no hardcodees).
- **Tipografía:** `Playfair Display` para `h1` (títulos), `Inter` para body. Ambas se cargan vía sistema/fallback.
- **Co-location:** `Component.tsx` + `Component.css` en la misma carpeta. Sin CSS Modules, sin Tailwind.
- **Naming CSS:** clases en `kebab-case` prefijadas con el nombre del componente (`.dialog-box`, `.dialog-card`, `.stage-frame`).

## Anti-patterns (no hagas)

- No añadir frameworks de CSS (Tailwind, styled-components, emotion).
- No añadir router (react-router, tanstack-router) — el screen state vive en Zustand a propósito.
- No commitear `raw_assets/` ni `*.psd`/`*.ai`/`*.fig`.
- No commitear PNGs >2MB sin optimizar a WebP.
- No tocar `IntroScreen.css` para arreglar layout responsive — el juego es **escritorio only**.

## Flujo para añadir una pantalla nueva

1. Añadir el ID al union `Screen` en `src/types/game.ts`.
2. Crear `src/components/screens/<Name>Screen.tsx` + `.css`.
3. Registrar el `case` en el switch de `ScreenManager.tsx`.
4. Si toma assets nuevos: optimizar con `scripts/optimize-assets.mjs` → registrar path en `ASSETS`.
5. Conectar la navegación desde la pantalla previa con `setScreen('<id>')`.
6. Actualizar `docs/screen-flow.md` con el nuevo nodo.

## Verificación visual

- `npm run dev`, abrir Chrome a 1920×1080.
- Probar también a 1366×768 (DevTools device toolbar custom).
- El layout debe verse proporcional, no roto. Si se rompe a 1366, ajustar `clamp()`, **no** añadir media query.
- Antes de mergear: `npm run lint && npm run build` verdes.

## Documentación adicional

- [docs/design-system.md](./docs/design-system.md) — tokens, tipografía, componentes primitivos.
- [docs/screen-flow.md](./docs/screen-flow.md) — diagrama del flujo de pantallas.
- [docs/asset-pipeline.md](./docs/asset-pipeline.md) — naming, optimización, targets de tamaño.
