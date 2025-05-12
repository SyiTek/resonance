"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Eye, Database, Clock } from 'lucide-react';

const GuildFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Information Gathering",
      description: "Our guild specializes in collecting intel on targets, whether they're players, guilds, or events."
    },
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: "Surveillance",
      description: "Discreet monitoring of targets to gather behavioral patterns and strategic information."
    },
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: "Data Analysis",
      description: "Converting raw intelligence into actionable insights and strategic advantages."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Temporal Flexibility",
      description: "Operating outside conventional timeframes, we're always watching, always listening."
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section ref={ref} className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-bold mb-12 text-center"
        >
          <span className="relative">
            Our Specialties
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary/50"></span>
          </span>
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative holographic-card p-6 bg-card/30 backdrop-blur-sm rounded-lg transition-all hover:transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 relative">
                  {feature.icon}
                  <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md -z-10"></div>
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GuildFeatures;