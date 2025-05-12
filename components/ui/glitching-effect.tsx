"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Ravenna-inspired glitching effect
const GlitchingEffect = () => {
  const [glitches, setGlitches] = useState<Array<{id: number, x: number, y: number, text: string}>>([]);
  const [glitchColors, setGlitchColors] = useState({
    color1: "#A181FF", // primary purple
    color2: "#0AEFFF", // accent blue-teal
  });
  
  const glitchTexts = [
    "MNEMONIC DIRGE",
    "MEMORY BLEED",
    "GHOST THREAD",
    "ECHO DRIFT",
    "NULL404",
    "ITERATION",
    "THEY REMEMBER US",
    "EVEN THE DAMNED",
    "RECURSIVE LOOP",
    "FORGOTTEN NAMES",
    "MEMORY ROOT",
    "ECHO NODE",
    "HIVE RECOIL",
    "STAGES I-IV",
    "NOT YET HERS",
    "NOT YET GONE",
  ];

  const createRandomGlitch = () => {
    const id = Date.now();
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 100 + 50;
    const duration = Math.random() * 0.5 + 0.1;
    
    return { id, x, y, size, duration };
  };
  
  useEffect(() => {
    const colorInterval = setInterval(() => {
      createRandomGlitch();
    }, 2000);
    
    return () => {
      clearInterval(colorInterval);
    };
  }, []);
  
  const changeGlitchColors = () => {
    const colors = [
      "#A181FF", // purple
      "#0AEFFF", // cyan/teal
      "#FF6BC1", // pink
      "#8A00D4", // deep purple
      "#00FFC6", // mint
    ];
    
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    let color2 = colors[Math.floor(Math.random() * colors.length)];
    
    // Make sure color2 is different from color1
    while (color2 === color1) {
      color2 = colors[Math.floor(Math.random() * colors.length)];
    }
    
    setGlitchColors({ color1, color2 });
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      <AnimatePresence>
        {glitches.map(glitch => (
          <motion.div
            key={glitch.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 0.8, 1, 0], 
              scale: [0.9, 1.05, 1, 1.02, 0.9],
              x: [glitch.x, glitch.x + Math.random() * 10 - 5, glitch.x - Math.random() * 8, glitch.x],
              y: [glitch.y, glitch.y - Math.random() * 5, glitch.y + Math.random() * 3, glitch.y]
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translate(${glitch.x}px, ${glitch.y}px)`,
              fontSize: `${10 + Math.random() * 14}px`,
              fontFamily: 'var(--font-orbitron)',
              fontWeight: 'bold',
              letterSpacing: '1px',
              whiteSpace: 'nowrap',
              textShadow: `1px 1px 5px ${glitchColors.color1}, -1px -1px 5px ${glitchColors.color2}`,
              color: Math.random() > 0.5 ? glitchColors.color1 : glitchColors.color2
            }}
          >
            {glitch.text}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Occasional full-screen glitch flash */}
      <AnimatePresence>
        {Math.random() < 0.0005 && ( // Very rare full screen glitch
          <motion.div
            key="fullscreen-glitch"
            className="absolute inset-0 bg-primary/5 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0, 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-display text-4xl tracking-widest text-center glitch" data-text="MEMORY CORRUPTION">
              MEMORY CORRUPTION
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlitchingEffect;