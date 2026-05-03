import { motion } from 'framer-motion';
import { Settings, Trophy, Cloud, User } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ASSETS } from '../../config/assets';
import { RESEARCH_STAGE_LABELS } from '../../data/researchStages';
import { Stage } from '../layout/Stage';
import { TopBar, type TopBarAction } from '../layout/TopBar';
import { TitleBlock } from '../ui/TitleBlock';
import './Chapter1Screen.css';

const leftActions: TopBarAction[] = [
  { id: 'settings', label: 'Opciones', icon: Settings },
];

const rightActions: TopBarAction[] = [
  { id: 'trophy', label: 'Logros', icon: Trophy },
  { id: 'cloud', label: 'Guardado en la nube', icon: Cloud },
  { id: 'profile', label: 'Perfil', icon: User },
];

export function Chapter1Screen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const selectedResearchStage = useGameStore((s) => s.selectedResearchStage);

  return (
    <Stage ariaLabel="Capítulo 1 — El campus">
      <div
        className="chapter1-bg"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.introCampus})` }}
      />

      <TopBar left={leftActions} right={rightActions} />

      <div className="chapter1-content">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.55 }}
        >
          <TitleBlock
            title={'CAPÍTULO 1\nEL CAMPUS'}
            subtitle="Aquí comienza tu recorrido. Más escenas se sumarán a este capítulo."
            subtitleStyle="italic-small"
          />
          {selectedResearchStage && (
            <p className="chapter1-focus">
              Etapa en foco: {RESEARCH_STAGE_LABELS[selectedResearchStage]}
            </p>
          )}
        </motion.div>

        <motion.nav
          className="chapter1-actions"
          aria-label="Acciones del capítulo"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.5 }}
        >
          <button
            type="button"
            className="chapter1-actions__btn chapter1-actions__btn--primary"
            onClick={() => setScreen('levelSelect')}
          >
            Seleccionar nivel
          </button>
          <button
            type="button"
            className="chapter1-actions__btn chapter1-actions__btn--ghost"
            onClick={() => setScreen('intro')}
          >
            Menú principal
          </button>
        </motion.nav>
      </div>
    </Stage>
  );
}
