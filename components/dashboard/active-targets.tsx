"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, User, Eye, FileText, ArrowRight, Lock } from 'lucide-react';

const TargetCard = ({ target, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className="holographic-card bg-card/30 backdrop-blur-sm overflow-hidden cursor-pointer"
        onClick={() => router.push('/targets')}
      >
        {/* Card content remains the same */}
        
        {/* Add hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Add pulsing ring effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
          >
            <div className="pulse-ring" />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

const activeTargets = [
  {
    id: 'TG-001',
    name: 'Shadow Hunters Guild',
    type: 'Organization',
    status: 'Under Surveillance',
    riskLevel: 'High',
    lastUpdated: '3 hours ago',
    infoCount: 12,
    image: 'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'TG-002',
    name: 'Eden Project',
    type: 'Location',
    status: 'Data Collection',
    riskLevel: 'Medium',
    lastUpdated: '1 day ago',
    infoCount: 8,
    image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'TG-003',
    name: 'Euphemia Followers',
    type: 'Religious Group',
    status: 'Infiltrated',
    riskLevel: 'Low',
    lastUpdated: '5 hours ago',
    infoCount: 15,
    image: 'https://images.pexels.com/photos/1730341/pexels-photo-1730341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'TG-004',
    name: 'Divine Artifacts',
    type: 'Objects',
    status: 'Research',
    riskLevel: 'Critical',
    lastUpdated: '12 hours ago',
    infoCount: 6,
    image: 'https://images.pexels.com/photos/2127969/pexels-photo-2127969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const ActiveTargets = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const router = useRouter();
  
  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical':
        return 'bg-red-500/20 text-red-500 border-red-500/50';
      case 'high':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/50';
      case 'medium':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'low':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      default:
        return 'bg-primary/20 text-primary border-primary/50';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under surveillance':
        return <Eye className="h-4 w-4 text-blue-400" />;
      case 'data collection':
        return <FileText className="h-4 w-4 text-purple-400" />;
      case 'infiltrated':
        return <User className="h-4 w-4 text-green-400" />;
      case 'research':
        return <FileText className="h-4 w-4 text-amber-400" />;
      default:
        return <Target className="h-4 w-4 text-primary" />;
    }
  };
  
  const handleTargetClick = (targetId: string) => {
    router.push(`/targets/${targetId}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Target className="mr-2 h-4 w-4 text-primary" />
          <h2 className="text-lg font-display">Active Targets</h2>
        </div>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => router.push('/targets')}>
          View All <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeTargets.map((target, index) => (
          <motion.div
            key={target.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredCard(target.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative overflow-hidden"
            onClick={() => handleTargetClick(target.id)}
          >
            <Card className={`holographic-card h-full bg-card/30 backdrop-blur-sm border-primary/20 overflow-hidden transition-all duration-300 cursor-pointer ${hoveredCard === target.id ? 'z-10 scale-105' : 'z-0'}`}>
              <div className="absolute inset-0 overflow-hidden z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                  style={{ 
                    backgroundImage: `url(${target.image})`,
                    filter: 'blur(8px) brightness(0.2)',
                    transform: hoveredCard === target.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />
              </div>
              
              <div className="relative z-10">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2 bg-black/50 backdrop-blur-sm">
                      {target.type}
                    </Badge>
                    <Badge variant="outline" className={`${getRiskLevelColor(target.riskLevel)} bg-black/50 backdrop-blur-sm`}>
                      {target.riskLevel}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{target.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    {getStatusIcon(target.status)}
                    <span className="ml-1">{target.status}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>ID: {target.id}</span>
                    <span>Updated: {target.lastUpdated}</span>
                  </div>
                  
                  {/* Expanded content on hover */}
                  <AnimatePresence>
                    {hoveredCard === target.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 text-xs border-t border-primary/20 pt-2"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Assignment:</span>
                            <span>Guild 00:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Files:</span>
                            <span>{target.infoCount} documents</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Progress:</span>
                            <span className="text-primary">{Math.floor(Math.random() * 100)}%</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
                
                <CardFooter className="pt-2">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-xs flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      {target.infoCount} files
                    </span>
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-black/50 backdrop-blur-sm">
                      <Lock className="h-3 w-3 mr-1" />
                      Access
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </Card>
            
            {/* Add pulsing ring effect on hover */}
            {hoveredCard === target.id && (
              <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
              >
                <div className="pulse-ring" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActiveTargets;