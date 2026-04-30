import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { IntroScreen } from './screens/IntroScreen';

export const ScreenManager: React.FC = () => {
  const currentScreen = useGameStore((state) => state.currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'intro':
        return <IntroScreen />;
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
