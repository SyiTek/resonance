"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Clock, Bell, Search } from 'lucide-react';

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState('00:00');
  const [dateString, setDateString] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
      
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setDateString(now.toLocaleDateString('en-US', options));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-b from-background to-transparent py-6 px-4 fixed top-16 left-0 z-30"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-display tracking-wide">Guild Operations</h1>
              <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                SECURE
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Intelligence gathering and commission management</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{currentTime}</span>
            </div>
            
            <div className="hidden md:block text-xs text-muted-foreground">{dateString}</div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background transition-colors border border-border">
                <Search className="h-4 w-4" />
              </button>
              
              <button className="p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background transition-colors border border-border relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;