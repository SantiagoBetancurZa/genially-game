# Design system

Todas las decisiones visuales del juego viven en `src/index.css` como tokens (`--color-*`, `--radius-*`, `--shadow-*`, `--duration-*`). Esta página los documenta.

## Paleta

| Token | HEX | Uso |
|---|---|---|
| `--color-bg-primary` | `#F7F5F0` | Fondo principal (crema claro) |
| `--color-bg-secondary` | `#EBE6DF` | Fondo secundario (crema más oscuro) |
| `--color-text-primary` | `#1A1A1A` | Texto de títulos y body principal |
| `--color-text-secondary` | `#4A4A4A` | Texto de soporte, descripciones |
| `--color-primary-dark` | `#2A2A30` | Botones primarios (charcoal) |
| `--color-button-hover` | `#404046` | Hover de botones primarios |
| `--color-accent` | `#D9C5B2` | Crema cálido (NO es el dorado del UI — es decorativo suave) |
| `--color-gold` | `#d6aa4d` | **Dorado real** del UI: rule debajo del título, highlights en diálogo, badge "TÚ", botón "Continuar" |
| `--color-gold-soft` | `#e8c989` | Hover/glow del dorado |
| `--color-gold-deep` | `#b8923a` | Active/pressed del dorado |

> Si necesitás un color nuevo, **añadí el token primero** en `src/index.css`. Nunca hardcodees HEX en componentes.

## Tipografía

- **Headings (`h1`–`h6`):** `Playfair Display`, serif. Peso 400 por defecto. Letter-spacing 0.
- **Body:** `Inter`, sans-serif. Peso 400, italic permitido para subtítulos.
- **Tamaños:** todos con `clamp()` para escalar dentro del canvas 16:9. Ver `IntroScreen.css` y `LevelIntroScreen.css` para ejemplos.

## Radii

| Token | Valor | Uso |
|---|---|---|
| `--radius-card` | `18px` | Cards de diálogo, contenedores blandos |
| `--radius-pill` | `999px` | Badges (TÚ, AYA), pills |

## Sombras

| Token | Uso |
|---|---|
| `--shadow-card` | Cards de UI (DialogBox) |
| `--shadow-card-strong` | Stage frame, contenedores grandes |

## Animación

| Token | Valor | Uso |
|---|---|---|
| `--duration-fast` | `180ms` | Hover, focus, micro-interacciones |
| `--duration-base` | `450ms` | Entradas de pantalla, transiciones de screen |
| `--easing-standard` | `cubic-bezier(.2,.7,.3,1)` | Easing por defecto |

Convención `framer-motion`:
- Duraciones 0.4–0.6s para entradas.
- Delays escalonados (0.1, 0.2, 0.4s) para cascada.
- Respetar `prefers-reduced-motion` (CSS deshabilita transitions automáticamente).

## Componentes primitivos

### `<Stage>` — `src/components/layout/Stage.tsx`

Wrapper 16:9 con borde, sombra, overlays decorativos (gradiente y sparkles). **Toda pantalla del juego se monta dentro de un `<Stage>`**.

Props: `children: ReactNode`.

### `<TopBar>` — `src/components/layout/TopBar.tsx`

Barra de iconos en las esquinas superiores del Stage. La izquierda suele tener Settings; la derecha suele tener Logros / Cloud / Perfil.

Props:
```ts
type TopBarAction = { id: string; label: string; icon: LucideIcon; onClick?: () => void };
type TopBarProps = { left?: TopBarAction[]; right?: TopBarAction[] };
```

### `<TitleBlock>` — `src/components/ui/TitleBlock.tsx`

Bloque de título con `h1`, rule dorada opcional, subtítulo opcional. El estilo del subtítulo varía:
- `'normal'`: tamaño normal, color `--color-text-secondary` (usado en IntroScreen).
- `'italic-small'`: italic, más chico, color text-secondary (usado en LevelIntroScreen para "Elige tu siguiente nivel").

Props:
```ts
type TitleBlockProps = {
  title: string;          // soporta '\n' para line break
  rule?: boolean;         // default true
  subtitle?: string;
  subtitleStyle?: 'normal' | 'italic-small';
};
```

### `<DialogBox>` — `src/components/ui/DialogBox.tsx`

Caja de diálogo con badge de speaker, card con texto multi-línea, caret expandible y botón Continuar opcional.

Props:
```ts
type DialogBoxProps = {
  content: DialogContent;
  onContinue?: () => void;
  continueLabel?: string;     // default "Continuar"
  showCaret?: boolean;        // default true
};
```

`DialogContent` y `DialogSegment` están definidos en `src/types/game.ts`. Ver [docs/screen-flow.md](./screen-flow.md) para cómo encadenar diálogos en una pantalla.
