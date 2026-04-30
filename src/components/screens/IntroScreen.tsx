import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Trophy, Cloud, User, ArrowRight } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ASSETS } from '../../config/assets';
import './IntroScreen.css';

const quickActions = [
  { label: 'Logros', icon: Trophy },
  { label: 'Guardado en la nube', icon: Cloud },
  { label: 'Perfil', icon: User },
];

export const IntroScreen: React.FC = () => {
  const { setScreen } = useGameStore();

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <section className="intro-stage" aria-label="Pantalla de inicio">
        <div
          className="intro-bg"
          style={{ backgroundImage: `url(${ASSETS.backgrounds.introBg})` }}
        />

        <motion.img
          src={ASSETS.characters.aya.standingFolder}
          alt="Aya"
          className="character-img"
          initial={{ x: 36, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.65 }}
        />

        <div className="top-left-actions">
          <button className="icon-btn" aria-label="Opciones">
            <Settings size={24} />
          </button>
        </div>

        <div className="top-right-actions" aria-label="Accesos rápidos">
          {quickActions.map(({ label, icon: Icon }) => (
            <button className="icon-btn" aria-label={label} key={label}>
              <Icon size={24} />
            </button>
          ))}
        </div>

        <div className="intro-content">
          <motion.div
            className="title-section"
            initial={{ x: -36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            <h1>FUTURO EN<br />CONSTRUCCIÓN</h1>
            <span className="title-rule" aria-hidden="true" />
            <p>Cada decisión te acerca<br />a tu descubrimiento.</p>
          </motion.div>

          <motion.nav
            className="menu-section"
            aria-label="Menú principal"
            initial={{ x: -36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.24, duration: 0.6 }}
          >
            <button
              className="menu-btn primary"
              onClick={() => setScreen('level1')}
            >
              <span>NUEVA PARTIDA</span>
              <ArrowRight size={22} aria-hidden="true" />
            </button>
            <button className="menu-btn secondary">CARGAR PARTIDA</button>
            <button className="menu-btn secondary">OPCIONES</button>
            <button className="menu-btn secondary">CRÉDITOS</button>
          </motion.nav>
        </div>

        <motion.figure
          className="quote-widget"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.55 }}
        >
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>
            La curiosidad hoy,<br />
            <strong>el legado mañana.</strong>
          </blockquote>
        </motion.figure>
      </section>
    </motion.div>
  );
};
