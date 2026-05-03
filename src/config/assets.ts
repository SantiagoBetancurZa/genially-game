// Asset registry. Ningún componente debe hardcodear paths — siempre referenciar
// vía ASSETS.<categoria>.<nombre>. Pipeline de optimización: scripts/optimize-assets.mjs.
// Convención de naming y ubicación: docs/asset-pipeline.md.

export const ASSETS = {
  characters: {
    aya: {
      introStanding: '/assets/characters/aya/aya-intro-standing.png',
      levelIntro: '/assets/characters/aya/aya-level-intro.png',
      standingPen: '/assets/characters/aya/aya-standing-pen.png',
      standingPenAlt: '/assets/characters/aya/aya-standing-pen-alt.png',
      magnifyingGlass: '/assets/characters/aya/aya-magnifying-glass.png',
      magnifyingGlassV2: '/assets/characters/aya/aya-magnifying-glass-v2.png',
      magnifyingGlassV3: '/assets/characters/aya/aya-magnifying-glass-v3.png',
      standingFolder: '/assets/characters/aya/aya-intro-standing.png',
      levelSelect: '/assets/characters/aya/aya-level-select.png',
    },
  },
  backgrounds: {
    introCampus: '/assets/backgrounds/intro-campus.jpg',
    introBg: '/assets/backgrounds/intro-campus.jpg',
    levelIntro: '/assets/backgrounds/level-intro-bg.jpg',
    levelSelect: '/assets/backgrounds/level-select-bg.jpg',
  },
  levelSelect: {
    thumbs: [
      '/assets/level-select/thumb-01.png',
      '/assets/level-select/thumb-02.png',
      '/assets/level-select/thumb-03.png',
      '/assets/level-select/thumb-04.png',
      '/assets/level-select/thumb-05.png',
      '/assets/level-select/thumb-06.png',
      '/assets/level-select/thumb-07.png',
      '/assets/level-select/thumb-08.png',
    ] as const,
  },
  ui: {
    // Reservado: paths a iconos custom / botones cuando se añadan.
  },
  items: {
    // Reservado: cards / collectibles del gameplay.
  },
  audio: {
    // Reservado: SFX y música.
  },
};
