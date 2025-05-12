"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const RequestCommissionAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Create data stream effect
    class DataStream {
      x: number;
      y: number;
      speed: number;
      fontSize: number;
      symbols: string[];
      text: string;
      opacity: number;
      hue: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 2 + 1;
        this.fontSize = Math.floor(Math.random() * 12) + 8;
        this.symbols = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("");
        this.text = "";
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hue = Math.random() > 0.7 ? 265 : 173; // Either purple or teal
        
        // Generate random symbols
        this.updateSymbols();
      }
      
      updateSymbols() {
        // Randomly change some symbols in the stream
        this.text = this.symbols[Math.floor(Math.random() * this.symbols.length)];
      }
      
      update() {
        // Move stream down
        this.y += this.speed;
        
        // Reset if out of screen
        if (this.y > canvas.height) {
          this.y = -this.fontSize * 2;
          this.x = Math.random() * canvas.width;
          this.updateSymbols();
        }
        
        // Randomly update symbols occasionally
        if (Math.random() > 0.95) {
          this.updateSymbols();
        }
      }
      
      draw() {
        ctx.font = `${this.fontSize}px monospace`;
        ctx.fillStyle = `hsla(${this.hue}, 70%, 70%, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
        
        // Add glow effect
        ctx.shadowColor = `hsla(${this.hue}, 70%, 50%, 0.5)`;
        ctx.shadowBlur = 5;
        ctx.fillText(this.text, this.x, this.y);
        ctx.shadowBlur = 0;
      }
    }
    
    // Create hexagonal nodes
    class HexNode {
      x: number;
      y: number;
      size: number;
      color: string;
      connections: HexNode[];
      pulseState: number;
      pulseSpeed: number;
      isActive: boolean;
      activationDelay: number;
      
      constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = Math.random() > 0.3 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(20, 184, 166, 0.4)';
        this.connections = [];
        this.pulseState = Math.random();
        this.pulseSpeed = 0.005 + Math.random() * 0.01;
        this.isActive = false;
        this.activationDelay = Math.random() * 5000;
        
        setTimeout(() => {
          this.isActive = true;
        }, this.activationDelay);
      }
      
      update() {
        this.pulseState += this.pulseSpeed;
        if (this.pulseState > 1) this.pulseState = 0;
      }
      
      draw() {
        if (!this.isActive) return;
        
        const pulseScale = 0.85 + Math.sin(this.pulseState * Math.PI * 2) * 0.15;
        const finalSize = this.size * pulseScale;
        
        ctx.beginPath();
        ctx.moveTo(this.x + finalSize * Math.cos(0), this.y + finalSize * Math.sin(0));
        
        for (let i = 1; i <= 6; i++) {
          const angle = (Math.PI / 3) * i;
          ctx.lineTo(this.x + finalSize * Math.cos(angle), this.y + finalSize * Math.sin(angle));
        }
        
        ctx.closePath();
        
        // Fill
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Stroke
        ctx.strokeStyle = this.color.replace('0.4', '0.6');
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      drawConnections() {
        if (!this.isActive) return;
        
        this.connections.forEach(node => {
          if (!node.isActive) return;
          
          const opacity = 0.2 + Math.sin(this.pulseState * Math.PI) * 0.1;
          
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          
          // Draw data packets traveling along connections occasionally
          if (Math.random() > 0.997) {
            animateDataPacket(this, node);
          }
        });
      }
    }
    
    // Data packets that travel along connections
    class DataPacket {
      startNode: HexNode;
      endNode: HexNode;
      progress: number;
      speed: number;
      color: string;
      size: number;
      
      constructor(startNode: HexNode, endNode: HexNode) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.progress = 0;
        this.speed = 0.01 + Math.random() * 0.01;
        this.color = Math.random() > 0.5 ? 'rgba(168, 85, 247, 1)' : 'rgba(20, 184, 166, 1)';
        this.size = 2 + Math.random() * 2;
      }
      
      update() {
        this.progress += this.speed;
        return this.progress < 1;
      }
      
      draw() {
        const x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
        const y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;
        
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        // Add glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      }
    }
    
    // Create initial data
    const numStreams = Math.floor(canvas.width * canvas.height / 20000);
    const streams: DataStream[] = [];
    for (let i = 0; i < numStreams; i++) {
      streams.push(new DataStream(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }
    
    // Create hex grid
    const hexSize = 30;
    const horizontalSpacing = hexSize * 1.8;
    const verticalSpacing = hexSize * 1.6;
    const hexNodes: HexNode[] = [];
    const dataPackets: DataPacket[] = [];
    
    // Position hex nodes in a grid
    const cols = Math.ceil(canvas.width / horizontalSpacing) + 1;
    const rows = Math.ceil(canvas.height / verticalSpacing) + 1;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * horizontalSpacing + ((row % 2) * horizontalSpacing / 2);
        const y = row * verticalSpacing;
        // Skip some nodes for more natural pattern
        if (Math.random() > 0.8) {
          hexNodes.push(new HexNode(x, y, hexSize));
        }
      }
    }
    
    // Create connections between nearby nodes
    hexNodes.forEach(node => {
      hexNodes.forEach(otherNode => {
        if (node === otherNode) return;
        
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < hexSize * 2.5) {
          node.connections.push(otherNode);
        }
      });
    });
    
    // Function to animate data packet traveling along a connection
    function animateDataPacket(startNode: HexNode, endNode: HexNode) {
      dataPackets.push(new DataPacket(startNode, endNode));
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(3, 7, 18, 1)');
      gradient.addColorStop(1, 'rgba(2, 6, 23, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw data streams
      streams.forEach(stream => {
        stream.update();
        stream.draw();
      });
      
      // Draw hex node connections
      hexNodes.forEach(node => {
        node.update();
        node.drawConnections();
      });
      
      // Draw hex nodes
      hexNodes.forEach(node => {
        node.draw();
      });
      
      // Update and draw data packets
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i];
        const active = packet.update();
        if (active) {
          packet.draw();
        } else {
          dataPackets.splice(i, 1);
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
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

export default RequestCommissionAnimation;