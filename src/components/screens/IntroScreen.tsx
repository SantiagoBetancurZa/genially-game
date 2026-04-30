import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Trophy, Cloud, User, ArrowRight, FileText } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { ASSETS } from '../../config/assets';
import './IntroScreen.css';

export const IntroScreen: React.FC = () => {
  const { setScreen } = useGameStore();

  return (
    <motion.div 
      className="intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image */}
      <div 
        className="intro-bg" 
        style={{ backgroundImage: `url(${ASSETS.backgrounds.introBg})` }}
      />
      
      {/* Top Left Options */}
      <div className="top-left-actions">
        <button className="icon-btn" aria-label="Opciones">
          <Settings size={24} />
        </button>
      </div>

      {/* Top Right Actions */}
      <div className="top-right-actions">
        <button className="icon-btn" aria-label="Logros">
          <Trophy size={24} />
        </button>
        <button className="icon-btn" aria-label="Nube">
          <Cloud size={24} />
        </button>
        <button className="icon-btn" aria-label="Usuario">
          <User size={24} />
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="intro-content">
        
        {/* Left Column: Typography & Menu */}
        <div className="left-column">
          <motion.div 
            className="title-section"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1>FUTURO EN<br />CONSTRUCCIÓN</h1>
            <p>Cada decisión te acerca<br />a tu descubrimiento.</p>
          </motion.div>

          <motion.div 
            className="menu-section"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <button 
              className="menu-btn primary"
              onClick={() => setScreen('level1')} // Or the next screen ID
            >
              NUEVA PARTIDA
              <ArrowRight size={20} className="arrow-icon" />
            </button>
            <button className="menu-btn secondary">CARGAR PARTIDA</button>
            <button className="menu-btn secondary">OPCIONES</button>
            <button className="menu-btn secondary">CRÉDITOS</button>
          </motion.div>
        </div>

        {/* Right Column: Character */}
        <div className="right-column">
          <motion.img 
            src={ASSETS.characters.aya.standingFolder} 
            alt="Aya" 
            className="character-img"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </div>
      </div>

      {/* Bottom Bar Layout */}
      <motion.div 
        className="bottom-bar"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="news-widget">
          <div className="news-icon-wrapper">
            <FileText size={20} />
          </div>
          <div className="news-text">
            <span className="news-label">NUEVO CONTENIDO DISPONIBLE</span>
            <span className="news-title">Capítulo 2: El inicio de tu investigación</span>
          </div>
          <ArrowRight size={16} className="news-arrow" />
        </div>

        <div className="quote-widget">
          <p>
            <span className="quote-mark">"</span>
            La curiosidad hoy,<br/><strong>el legado mañana.</strong>
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
};
