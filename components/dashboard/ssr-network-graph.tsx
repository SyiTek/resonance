'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SSRNetworkGraph = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      {!isLoaded ? (
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading network data...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full max-h-[600px] overflow-hidden">
            {/* Static visualization fallback for SSR */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/50 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-xs font-medium">Guild 00:00</span>
            </div>
            
            {/* Connections */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${(i + 2) * 50}px`,
                  height: `${(i + 2) * 50}px`,
                  border: '1px solid rgba(168, 85, 247, 0.1)',
                  borderRadius: '50%',
                  opacity: 1 - (i * 0.15),
                  transform: `translate(-50%, -50%) rotate(${i * 15}deg)`
                }}
              />
            ))}
            
            {/* Nodes */}
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const distance = 100 + Math.random() * 80;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const size = 6 + Math.random() * 8;
              
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-accent/70 shadow-md shadow-accent/20"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    x: [0, Math.random() * 10 - 5, 0],
                    y: [0, Math.random() * 10 - 5, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
            
            {/* Floating text */}
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
              Network visualization loading...
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SSRNetworkGraph; 