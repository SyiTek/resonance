"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LoginAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    let canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Create off-screen canvas for glow effects
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    offscreenCanvas.width = window.innerWidth;
    offscreenCanvas.height = window.innerHeight;
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      offscreenCanvas.width = window.innerWidth;
      offscreenCanvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Create magical runes
    class MagicalRune {
      x: number;
      y: number;
      size: number;
      opacity: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      pulsePhase: number;
      
      constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = getRandomColor();
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.02;
        this.opacity = 0.3 + Math.sin(this.pulsePhase) * 0.2;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw magical rune
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 * i) / 8;
          const radius = this.size * (1 + Math.sin(this.pulsePhase) * 0.2);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        
        // Add glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner details
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        
        ctx.restore();
      }
    }
    
    // Create energy particles
    class EnergyParticle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      angle: number;
      opacity: number;
      
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.color = getRandomColor();
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        if (this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
      }
    }
    
    // Get a random color (purple/blue hues)
    const getRandomColor = () => {
      const colors = [
        'rgba(147, 51, 234',   // Solo Leveling purple
        'rgba(88, 28, 135',    // Darker purple
        'rgba(67, 56, 202',    // Indigo
        'rgba(59, 130, 246',   // Blue
        'rgba(236, 72, 153',   // Pink
        'rgba(79, 70, 229',    // Bright indigo
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Create magical runes
    const runeSize = 30;
    const runes: MagicalRune[] = [];
    const numRunes = 12;
    
    for (let i = 0; i < numRunes; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      runes.push(new MagicalRune(x, y, runeSize));
    }
    
    // Create energy particles
    const particles: EnergyParticle[] = [];
    const numParticles = 100;
    
    for (let i = 0; i < numParticles; i++) {
      particles.push(new EnergyParticle());
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      const time = Date.now() * 0.001;
      gradient.addColorStop(0, `rgba(17, 24, 39, ${1 + Math.sin(time * 0.5) * 0.1})`);
      gradient.addColorStop(1, `rgba(9, 9, 11, ${1 + Math.cos(time * 0.5) * 0.1})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      // Draw magical runes
      runes.forEach(rune => {
        rune.update();
        rune.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 -z-10"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default LoginAnimation;