import { motion } from 'framer-motion';
import { Settings, Trophy, Cloud, User, Star } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ASSETS } from '../../config/assets';
import type { ResearchStageId } from '../../types/game';
import { RESEARCH_STAGE_LIST } from '../../data/researchStages';
import { Stage } from '../layout/Stage';
import { TopBar, type TopBarAction } from '../layout/TopBar';
import { TitleBlock } from '../ui/TitleBlock';
import './LevelSelectScreen.css';

const leftActions: TopBarAction[] = [
  { id: 'settings', label: 'Opciones', icon: Settings },
];

const rightActions: TopBarAction[] = [
  { id: 'trophy', label: 'Logros', icon: Trophy },
  { id: 'cloud', label: 'Guardado en la nube', icon: Cloud },
  { id: 'profile', label: 'Perfil', icon: User },
];

export function LevelSelectScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const selectedResearchStage = useGameStore((s) => s.selectedResearchStage);
  const setSelectedResearchStage = useGameStore((s) => s.setSelectedResearchStage);

  const selectStage = (id: ResearchStageId) => {
    setSelectedResearchStage(id);
  };

  return (
    <Stage ariaLabel="Selección de niveles">
      <div
        className="level-select-bg"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.levelSelect})` }}
      />

      <motion.img
        src={ASSETS.characters.aya.levelSelect}
        alt="Aya"
        className="level-select-character"
        initial={{ x: 36, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.58 }}
      />

      <TopBar left={leftActions} right={rightActions} />

      <div className="level-select-layout">
        <div className="level-select-main">
          <motion.div
            initial={{ x: -28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.06, duration: 0.52 }}
          >
            <TitleBlock
              title={'FUTURO EN\nCONSTRUCCIÓN'}
              subtitle="Elige tu siguiente nivel"
              subtitleStyle="italic-small"
            />
          </motion.div>

          <div className="level-select-grid" role="list">
            {RESEARCH_STAGE_LIST.map(({ id, label }, i) => (
              <motion.button
                key={id}
                type="button"
                role="listitem"
                className={`level-select-card${selectedResearchStage === id ? ' is-selected' : ''}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.04, duration: 0.42 }}
                onClick={() => selectStage(id)}
                aria-pressed={selectedResearchStage === id}
                aria-label={`Nivel ${id}: ${label}`}
              >
                <span className="level-select-card__num">{id}</span>
                <div className="level-select-card__thumb-wrap">
                  <img
                    className="level-select-card__thumb"
                    src={ASSETS.levelSelect.thumbs[id - 1]}
                    alt=""
                    draggable={false}
                  />
                </div>
                <span className="level-select-card__title">{label}</span>
                <Star
                  className="level-select-card__star"
                  size={16}
                  fill="currentColor"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </motion.button>
            ))}
          </div>

          <div className="level-select-footer">
            <div className="level-select-footer__banner">
              <span className="level-select-footer__kicker">NUEVO CONTENIDO DISPONIBLE</span>
              <p className="level-select-footer__text">
                Capítulo 2: El inicio de tu investigación
              </p>
            </div>
            <button
              type="button"
              className="level-select-back"
              onClick={() => setScreen('chapter1')}
            >
              Volver al campus
            </button>
          </div>
        </div>
      </div>
    </Stage>
  );
}
