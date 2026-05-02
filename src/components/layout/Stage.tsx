import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import './Stage.css';

type StageProps = {
  children: ReactNode;
  ariaLabel?: string;
};

// Wrapper 16:9 con borde, sombra y overlays decorativos. Toda pantalla del
// juego se monta dentro de un <Stage>. Mantiene aspect-ratio fijo y escala
// con clamp() — no añadir media queries para mobile/tablet aquí.
export function Stage({ children, ariaLabel }: StageProps) {
  return (
    <motion.div
      className="stage-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <section className="stage-frame" aria-label={ariaLabel}>
        {children}
      </section>
    </motion.div>
  );
}
