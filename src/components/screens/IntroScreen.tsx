import { motion } from 'framer-motion';
import { Settings, Trophy, Cloud, User, ArrowRight } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ASSETS } from '../../config/assets';
import { Stage } from '../layout/Stage';
import { TopBar, type TopBarAction } from '../layout/TopBar';
import './IntroScreen.css';

const leftActions: TopBarAction[] = [
  { id: 'settings', label: 'Opciones', icon: Settings },
];

const rightActions: TopBarAction[] = [
  { id: 'trophy', label: 'Logros', icon: Trophy },
  { id: 'cloud', label: 'Guardado en la nube', icon: Cloud },
  { id: 'profile', label: 'Perfil', icon: User },
];

export function IntroScreen() {
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <Stage ariaLabel="Pantalla de inicio">
      <div
        className="intro-bg"
        style={{ backgroundImage: `url(${ASSETS.backgrounds.introBg})` }}
      />

      <motion.img
        src={ASSETS.characters.aya.standingFolder}
        alt="Aya"
        className="intro-character"
        initial={{ x: 36, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.65 }}
      />

      <TopBar left={leftActions} right={rightActions} />

      <div className="intro-content">
        <motion.div
          className="intro-title"
          initial={{ x: -36, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.6 }}
        >
          <h1>FUTURO EN<br />CONSTRUCCIÓN</h1>
          <span className="intro-title__rule" aria-hidden="true" />
          <p>Cada decisión te acerca<br />a tu descubrimiento.</p>
        </motion.div>

        <motion.nav
          className="intro-menu"
          aria-label="Menú principal"
          initial={{ x: -36, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.24, duration: 0.6 }}
        >
          <button
            className="intro-menu__btn intro-menu__btn--primary"
            onClick={() => setScreen('levelIntro')}
            type="button"
          >
            <span>NUEVA PARTIDA</span>
            <ArrowRight size={22} aria-hidden="true" />
          </button>
          <button className="intro-menu__btn intro-menu__btn--secondary" type="button">CARGAR PARTIDA</button>
          <button className="intro-menu__btn intro-menu__btn--secondary" type="button">OPCIONES</button>
          <button className="intro-menu__btn intro-menu__btn--secondary" type="button">CRÉDITOS</button>
        </motion.nav>
      </div>

      <motion.figure
        className="intro-quote"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.42, duration: 0.55 }}
      >
        <span className="intro-quote__mark" aria-hidden="true">&ldquo;</span>
        <blockquote>
          La curiosidad hoy,<br />
          <strong>el legado mañana.</strong>
        </blockquote>
      </motion.figure>
    </Stage>
  );
}
