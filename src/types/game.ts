// Tipos compartidos del juego. Si añadís una pantalla, añadila al union Screen.
// El switch en src/components/ScreenManager.tsx debe cubrirlo todo (TS rompe el
// build si te falta un case porque renderScreen() devolvería ReactNode | undefined).

export type Screen = 'intro' | 'levelIntro' | 'chapter1';

export type DialogSpeaker = {
  id: 'tu' | 'aya';
  label: string;             // "TÚ", "AYA"
  tone: 'gold' | 'neutral';  // estilo del badge en DialogBox
};

// Texto con resaltes inline. Estructurado, no markdown:
// el highlight es estilo del design system, no formato genérico.
// Tratar el diálogo como datos permite mover la copy a JSON sin tocar componentes.
export type DialogSegment =
  | { kind: 'text'; value: string }
  | { kind: 'highlight'; value: string };

export type DialogContent = {
  speaker: DialogSpeaker;
  segments: DialogSegment[];
};
