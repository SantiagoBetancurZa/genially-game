# Asset pipeline

## Filosofía

- **`raw_assets/`** (gitignored) guarda las fuentes pesadas: PSD, AI, PNGs 4K. Nunca se commitea ni se sirve al navegador.
- **`public/assets/`** guarda lo optimizado que sí se sirve: WebP/PNG/JPEG bajo 2MB, organizados por categoría.
- **`src/config/assets.ts`** registra las rutas. **Los componentes nunca hardcodean paths**.

## Naming convention

Todo en `kebab-case`. Sin espacios, sin acentos, sin mayúsculas.

| Categoría | Ubicación | Patrón | Ejemplo |
|---|---|---|---|
| Personajes | `public/assets/characters/<nombre>/` | `<nombre>-<pose>.<ext>` | `aya-level-intro.webp` |
| Fondos | `public/assets/backgrounds/` | `<escena>-bg.<ext>` | `level-intro-bg.webp` |
| UI | `public/assets/ui/` | `ui-<elemento>.<ext>` | `ui-arrow-right.webp` |
| Items | `public/assets/items/` | `item-<nombre>.<ext>` | `item-card-quantitative.webp` |
| Audio | `public/assets/audio/` | `<categoria>-<nombre>.<ext>` | `sfx-coin-pickup.mp3` |

## Tamaños target

| Tipo | Target | Hard limit |
|---|---|---|
| Personaje (full body, transparente) | <2.5MB | 3MB |
| Fondo (16:9 1920px, opaco) | <800KB | 1.5MB |
| UI element | <50KB | 200KB |
| Item icon | <80KB | 200KB |

Si te pasás del hard limit, considerá:
- Reducir el ancho máx (de 1920 a 1600 si la calidad alcanza).
- Bajar la calidad JPEG (de 85 a 75-80).
- Para personajes: recortar área transparente innecesaria antes de pasar por el script.

## Pipeline de optimización

`scripts/optimize-assets.mjs` lee `raw_assets/` y escribe a `public/assets/`. Usa `sips` (incluido en macOS, zero npm install).

```bash
node scripts/optimize-assets.mjs
```

El script:
1. Lee la tabla `RAW_TO_PUBLIC` (al inicio del script) que mapea cada archivo fuente a su destino final + tipo (`opaque` | `transparent`).
2. Para `opaque` (fondos): redimensiona a 1920px max y convierte a JPEG calidad 85.
3. Para `transparent` (personajes): redimensiona a 1920px max y mantiene PNG.
4. Escribe el resultado en `public/assets/<dest>`.
5. **No** borra los originales — viven en `raw_assets/` (gitignored) como fuente de verdad.

**Si añadís un asset nuevo a `raw_assets/`:** registrá una entrada en `RAW_TO_PUBLIC` del script con su destino y tipo, luego corré `node scripts/optimize-assets.mjs`.

## Por qué JPEG + PNG y no WebP

`sips` (macOS) puede leer WebP pero **no escribirlo**. Para no añadir una dependencia npm (`sharp`, `cwebp`) por 5-10 imágenes, usamos:
- **JPEG quality 85** para fondos opacos: compresión equiparable a WebP en este rango (~96% reducción real medida).
- **PNG downscaled** para personajes con transparencia: ~70% reducción solo bajando a 1920px.

Si en el futuro hay decenas de assets y la diferencia importa, instalá `sharp` y refactorizá el script para producir WebP/AVIF.

## Por qué `raw_assets/` está gitignored

- Pesa decenas de MB; clonar el repo se vuelve lento.
- El navegador nunca los carga; viven en `public/assets/`.
- Si necesitás versionar las fuentes, usá un bucket externo (S3, Drive, Dropbox) o `git-lfs` en un repo separado.

## Checklist al añadir un asset nuevo

- [ ] Fuente está en `raw_assets/` (no commiteada).
- [ ] Nombre del archivo final sigue la convention `kebab-case`.
- [ ] Optimizado <hard limit (`sips` o `optimize-assets.mjs`).
- [ ] Path registrado en `src/config/assets.ts` bajo la categoría correcta.
- [ ] Componente lo importa vía `ASSETS.<categoria>.<nombre>`, no string literal.
