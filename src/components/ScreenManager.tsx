import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { IntroScreen } from './screens/IntroScreen';
import { LevelIntroScreen } from './screens/LevelIntroScreen';
import { Chapter1Screen } from './screens/Chapter1Screen';
import { LevelSelectScreen } from './screens/LevelSelectScreen';

export const ScreenManager: React.FC = () => {
  const currentScreen = useGameStore((state) => state.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'intro':
        return <IntroScreen />;
      case 'levelIntro':
        return <LevelIntroScreen />;
      case 'chapter1':
        return <Chapter1Screen />;
      case 'levelSelect':
        return <LevelSelectScreen />;
      default:
        return <div className="screen-placeholder">Escena No Encontrada</div>;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="screen-container"
      >
        {renderScreen()}
      </motion.div>
    </AnimatePresence>
  );
};
