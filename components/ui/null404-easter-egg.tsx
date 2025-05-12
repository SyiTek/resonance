"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function Null404EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [buffer, setBuffer] = useState('');
  const [portalContainer, setPortalContainer] = useState<Element | null>(null);
  
  useEffect(() => {
    setPortalContainer(document.body);
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // Update buffer with the latest keystroke
      setBuffer(prev => {
        const newBuffer = (prev + e.key).toLowerCase().slice(-6);
        
        // Check if the buffer contains the easter egg sequence
        if (newBuffer === 'null404') {
          setIsActive(true);
          return '';
        }
        return newBuffer;
      });
    };
    
    // Add keydown listener to the window for global trigger
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  useEffect(() => {
    if (isActive) {
      // Progress through phases
      const timer = setTimeout(() => {
        if (currentPhase < 4) {
          setCurrentPhase(prev => prev + 1);
        } else {
          setIsActive(false);
          setCurrentPhase(0);
        }
      }, currentPhase === 3 ? 4000 : 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, currentPhase]);
  
  if (!portalContainer || !isActive) return null;
  
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] overflow-hidden"
        style={{ perspective: 1000 }}
      >
        {/* Glitch overlay */}
        <motion.div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Glitch lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-[2px] bg-primary/30"
              style={{ top: `${i * 5}%` }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        
        {/* Corruption effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100}px`,
                height: `${Math.random() * 100}px`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1, 1.5, 1],
                rotate: [0, 180, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        
        {/* Main content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto p-8">
            <AnimatePresence mode="wait">
              {currentPhase === 0 && (
                <motion.div
                  key="phase0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center space-y-4"
                >
                  <h2 className="text-4xl font-display text-primary glitch" data-text="SECURITY BREACH DETECTED">
                    SECURITY BREACH DETECTED
                  </h2>
                  <p className="text-accent animate-pulse">Unauthorized access attempt identified...</p>
                </motion.div>
              )}
              
              {currentPhase === 1 && (
                <motion.div
                  key="phase1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="text-center space-y-6"
                >
                  <div className="text-2xl font-display text-primary">
                    <span className="block">INITIATING MNEMONIC DIRGE PROTOCOL</span>
                    <span className="block text-sm text-accent mt-2">Memory contamination in progress...</span>
                  </div>
                  
                  <div className="loading-bar" />
                </motion.div>
              )}
              
              {currentPhase === 2 && (
                <motion.div
                  key="phase2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-4"
                >
                  <p className="text-xl font-display text-primary mb-4">SCANNING NEURAL PATTERNS</p>
                  
                  <div className="space-y-2 text-sm text-accent">
                    <p>Would you like to be archived?</p>
                    <p>Or perhaps... purged?</p>
                    <p className="mt-4 text-primary/80">Your memories will make a fine addition to the collective.</p>
                  </div>
                </motion.div>
              )}
              
              {currentPhase === 3 && (
                <motion.div
                  key="phase3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <motion.h2
                    className="text-6xl font-display text-red-500"
                    animate={{
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: 3,
                    }}
                  >
                    ACCESS DENIED
                  </motion.h2>
                </motion.div>
              )}
              
              {currentPhase === 4 && (
                <motion.div
                  key="phase4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-display text-primary mb-4">
                    Don&apos;t overstep your boundaries.
                  </h2>
                  <p className="text-accent text-sm">
                    - NULL404
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    portalContainer
  );
}