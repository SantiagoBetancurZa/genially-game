import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Trophy, Cloud, User } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ASSETS } from '../../config/assets';
import type { DialogContent } from '../../types/game';
import { Stage } from '../layout/Stage';
import { TopBar, type TopBarAction } from '../layout/TopBar';
import { TitleBlock } from '../ui/TitleBlock';
import { DialogBox } from '../ui/DialogBox';
import './LevelIntroScreen.css';

const leftActions: TopBarAction[] = [
  { id: 'settings', label: 'Opciones', icon: Settings },
];

const rightActions: TopBarAction[] = [
  { id: 'trophy', label: 'Logros', icon: Trophy },
  { id: 'cloud', label: 'Guardado en la nube', icon: Cloud },
  { id: 'profile', label: 'Perfil', icon: User },
];

const dialogs: DialogContent[] = [
  {
    speaker: { id: 'aya', label: 'AYA', tone: 'neutral' },
    segments: [
      {
        kind: 'text',
        value:
          'Este es tu primer día en el campus. Cada sala guarda una pista, y cada pista te acerca a ',
      },
      { kind: 'highlight', value: 'tu propio descubrimiento' },
      {
        kind: 'text',
        value: '. Respira hondo: la curiosidad es el mapa.',
      },
    ],
  },
  {
    speaker: { id: 'tu', label: 'TÚ', tone: 'gold' },
    segments: [
      { kind: 'text', value: 'Estoy lista. Quiero ver qué hay detrás de cada decisión, aunque ' },
      { kind: 'highlight', value: 'no todas sean fáciles' },
      { kind: 'text', value: '.' },
    ],
  },
  {
    speaker: { id: 'aya', label: 'AYA', tone: 'neutral' },
    segments: [
      {
        kind: 'text',
        value:
          'Perfecto. Cuando quieras, avanzamos al siguiente espacio. Por ahora, ',
      },
      { kind: 'highlight', value: 'fijate en los detalles' },
      {
        kind: 'text',
        value: ': ahí suelen esconderse las respuestas.',
      },
    ],
  },
];

export function LevelIntroScreen() {
  const setScreen = useGameStore((s) => s.setScreen);
  const [index, setIndex] = useState(0);
  const isLast = index === dialogs.length - 1;

  return (
    <Stage ariaLabel="Introducción al nivel">
      <div
        className="level-intro-bg"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.levelIntro})` }}
      />

      <motion.img
        src={ASSETS.characters.aya.levelIntro}
        alt="Aya"
        className="level-intro-character"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      />

      <TopBar left={leftActions} right={rightActions} />

      <div className="level-intro-content">
        <motion.div
          initial={{ x: -32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.55 }}
        >
          <TitleBlock
            title={'NIVEL 1\nEL DESPERTAR'}
            subtitle="Elige tu siguiente nivel"
            subtitleStyle="italic-small"
          />
        </motion.div>

        <motion.div
          key={index}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <DialogBox
            content={dialogs[index]}
            onContinue={
              isLast
                ? () => setScreen('chapter1')
                : () => setIndex((i) => i + 1)
            }
            continueLabel={isLast ? 'Entrar al campus' : 'Continuar'}
          />
        </motion.div>
      </div>
    </Stage>
  );
}
