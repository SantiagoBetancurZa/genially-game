# Genially

> Juego narrativo de decisiones para escritorio. Construí tu camino paso a paso.

**Stack:** React 19 · TypeScript · Vite · Zustand · Framer Motion · Lucide React

## Quick start

```bash
npm install
npm run dev    # http://localhost:5173
```

Construir para producción:

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├── components/
│   ├── layout/      # Stage, TopBar (primitivos compartidos)
│   ├── ui/          # DialogBox, TitleBlock (UI reutilizable)
│   └── screens/     # IntroScreen, LevelIntroScreen, …
├── store/           # Zustand
├── types/           # Tipos compartidos (Screen, DialogContent)
├── config/          # Asset registry
└── index.css        # Design tokens
public/assets/       # Imágenes, audio (servidos al navegador)
raw_assets/          # Fuentes sin optimizar (gitignored)
docs/                # Design system, screen flow, asset pipeline
scripts/             # Tooling (optimize-assets.mjs)
```

## Decisiones de diseño

- **Solo escritorio.** El juego corre en un canvas 16:9 que escala con `clamp()`. No hay layout mobile.
- **Sin router.** El estado de pantalla vive en Zustand (`useGameStore.currentScreen`). `ScreenManager` hace el switch.
- **Diálogos como datos.** Cada diálogo es un `DialogContent` con `segments: DialogSegment[]`. La copy se podrá mover a JSON sin tocar componentes.
- **CSS vanilla con tokens.** Sin Tailwind ni CSS-in-JS. Los tokens viven en `src/index.css`.

## Contribuir

Lee **[CLAUDE.md](./CLAUDE.md)** antes de tocar código. Todas las convenciones, anti-patterns y flujos viven ahí (aplica para humanos y para agentes).

Documentación detallada:
- [docs/design-system.md](./docs/design-system.md) — paleta, tipografía, componentes primitivos
- [docs/screen-flow.md](./docs/screen-flow.md) — diagrama del flujo de pantallas
- [docs/asset-pipeline.md](./docs/asset-pipeline.md) — cómo procesar imágenes nuevas

Pull requests: el [template](./.github/PULL_REQUEST_TEMPLATE.md) tiene el checklist obligatorio.

## Licencia

Privado.
