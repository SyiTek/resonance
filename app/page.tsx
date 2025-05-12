'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import HeroAnimation from '@/components/home/hero-animation';
import GuildFeatures from '@/components/home/guild-features';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 hex-grid opacity-20 z-0"></div>
      
      {/* Digital noise overlay */}
      <div className="digital-noise"></div>
      
      {/* Hero section */}
      <section className="relative pt-20 pb-32 px-4 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Clock size={32} className="text-primary clock-pulse" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-accent/30 rounded-full blur-sm"
              />
            </div>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="ml-3 text-xl font-display tracking-wider text-muted-foreground"
            >
              GUILD
            </motion.h2>
          </div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-7xl md:text-8xl lg:text-9xl font-display font-bold mb-6 tracking-tight glitch"
            data-text="00:00"
          >
            00:00
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            A guild that trades in secrets, spying, and information gathering. We find what others wish to hide.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/login">
              <Button size="lg" className="px-8 py-6 text-lg font-display tracking-wide">
                LOGIN
              </Button>
            </Link>
            <Link href="/request-commission">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-display tracking-wide relative overflow-hidden group">
                <span className="relative z-10">REQUEST COMMISSION</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30"
                  initial={{ x: "100%" }}
                  animate={{ x: "-100%" }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <HeroAnimation />
      </section>

      {/* Guild information section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="relative py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
            <span className="text-gradient">But what would life be without choices?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 space-y-4">
                <div className="flex items-start group hover:bg-primary/5 p-3 rounded-lg transition-all duration-300">
                  <div className="mr-3 text-primary font-display text-xl group-hover:scale-110 transition-transform duration-300">⟩</div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Please keep staff updated on who is joining your group for organizational purposes.</p>
                </div>
                <div className="flex items-start group hover:bg-primary/5 p-3 rounded-lg transition-all duration-300">
                  <div className="mr-3 text-primary font-display text-xl group-hover:scale-110 transition-transform duration-300">⟩</div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">In order to submit you must have two other members interested in joining/making a character for this group.</p>
                </div>
                <div className="flex items-start group hover:bg-primary/5 p-3 rounded-lg transition-all duration-300">
                  <div className="mr-3 text-primary font-display text-xl group-hover:scale-110 transition-transform duration-300">⟩</div>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Once finished submit to the misc-submissions channel.</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-12">
                <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-6 space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-4 group hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                      <span className="text-primary font-display min-w-[120px]">Guild Name</span>
                      <span className="font-display text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient">00:00</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 group hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                      <span className="text-primary font-display min-w-[120px]">Leader</span>
                      <span className="font-semibold text-foreground/90">Jun Minamitake - <span className="text-accent">aurifleur</span></span>
                    </div>
                    
                    <div className="flex items-center space-x-4 group hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                      <span className="text-primary font-display min-w-[120px]">Members</span>
                      <div className="space-x-2">
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Aurora Jackson</span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Avani Mayan</span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Emmett Orian</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                      <span className="text-primary font-display min-w-[120px] mt-1">Location</span>
                      <p className="text-foreground/90">There isn&apos;t an HQ at all; the members can call a meeting anywhere they like, as long as it isn&apos;t too obvious that it is a guild meeting.</p>
                    </div>
                    
                    <div className="flex items-center space-x-4 group hover:bg-primary/5 p-2 rounded-lg transition-all duration-300">
                      <span className="text-primary font-display min-w-[120px]">Requirements</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">None</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-display mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  00:00 is a guild that sells info and spies on other guilds or games. There isn&apos;t a major goal nor any plan. Members can do whatever—just don&apos;t hurt the guild or ignore its main purpose: trading secrets, spying, or making money. Jun started it to find people like himself, people who just wanted to find a purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      <GuildFeatures />
    </div>
  );
}