"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Target, 
  User, 
  Clock, 
  AlertTriangle, 
  FileText,
  Shield,
  Eye,
  Map,
  Briefcase,
  MessageSquare,
  Zap,
  Bookmark,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PowerStatProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

// Define interfaces for your data
interface Document {
  id: string;
  title: string;
  date: string;
  type: string;
}

interface Activity {
  date: string;
  description: string;
  agent: string;
}

interface Target {
  id: string;
  name: string;
  type: string;
  status: string;
  riskLevel: string;
  lastUpdated: string;
  infoCount?: number;
  assignedAgents?: string[];
  progress: number;
  image?: string;
  description: string;
  location?: string;
  knownMembers?: number;
  documents?: Document[];
  activities?: Activity[];
  [key: string]: any; // For any additional properties
}

interface MockTargets {
  [key: string]: Target;
}

const PowerStat = ({ label, value, maxValue, color }: PowerStatProps) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium">{label}</span>
        <span className="text-xs font-bold">{value}/{maxValue}</span>
      </div>
      <div className="h-2 bg-black/30 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} rounded-full glow-${color.split('-')[1]}`}
        />
      </div>
    </div>
  );
};

export default function TargetDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const targetId = params.targetId as string;
  const [loaded, setLoaded] = useState(false);
  const [target, setTarget] = useState<Target | null>(null);
  const [showRankAnimation, setShowRankAnimation] = useState(true);
  
  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setLoaded(true);
      
      // Find the target by ID - mock data
      // In a real app, this would be an API call
      const mockTargets: MockTargets = {
        'TG-001': {
          id: 'TG-001',
          name: 'Shadow Hunters Guild',
          type: 'Organization',
          status: 'Under Surveillance',
          riskLevel: 'High',
          lastUpdated: '3 hours ago',
          infoCount: 12,
          assignedAgents: ['Jun Minamitake', 'Agent 4'],
          progress: 68,
          image: 'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          description: 'Elite combat unit with suspected black market connections. Known for their efficiency in artifact retrieval and territorial operations.',
          location: 'North District, Eden Sector',
          knownMembers: 24,
          documents: [
            { id: 'DOC-001', title: 'Operation Report: Market Infiltration', date: '2 days ago', type: 'Report' },
            { id: 'DOC-002', title: 'Member Identification: Upper Echelon', date: '1 week ago', type: 'Intelligence' },
            { id: 'DOC-003', title: 'Asset Tracking: Weapon Cache Delta', date: '3 days ago', type: 'Surveillance' },
          ],
          activities: [
            { date: 'Today, 08:23', description: 'Unusual movement detected at East Perimeter', agent: 'Jun Minamitake' },
            { date: 'Yesterday, 22:17', description: 'Meeting with Divine Artifacts dealer observed', agent: 'Agent 4' },
            { date: '3 days ago', description: 'Combat training exercise with enhanced equipment', agent: 'Surveillance System' },
          ]
        },
        'TG-002': {
          id: 'TG-002',
          name: 'Eden Project',
          type: 'Location',
          status: 'Data Collection',
          riskLevel: 'Medium',
          lastUpdated: '1 day ago',
          infoCount: 8,
          assignedAgents: ['Agent 3'],
          progress: 42,
          image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          description: 'Experimental ecosystem with terraforming capabilities. Origin and purpose remain unclear.',
          location: 'Eastern Territory, Restricted Zone',
          documents: [
            { id: 'DOC-101', title: 'Environmental Analysis: Sector 7', date: '5 days ago', type: 'Report' },
            { id: 'DOC-102', title: 'Energy Signature Mapping', date: '2 weeks ago', type: 'Research' },
          ],
          activities: [
            { date: '2 days ago', description: 'Anomalous energy spike recorded', agent: 'Agent 3' },
            { date: '1 week ago', description: 'New structure identified in northern quadrant', agent: 'Surveillance System' },
          ]
        },
        'TG-003': {
          id: 'TG-003',
          name: 'Euphemia Followers',
          type: 'Religious Group',
          status: 'Infiltrated',
          riskLevel: 'Low',
          lastUpdated: '5 hours ago',
          infoCount: 15,
          assignedAgents: ['Ravenna Nemesyn'],
          progress: 87,
          image: 'https://images.pexels.com/photos/1730341/pexels-photo-1730341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          description: 'Religious organization devoted to the worship of Euphemia, the supposed deity of light and memory.',
          location: 'Multiple locations, primarily Central District',
          followers: 156,
          documents: [
            { id: 'DOC-201', title: 'Ritual Documentation: Dawn Prayer', date: '3 days ago', type: 'Observation' },
            { id: 'DOC-202', title: 'Hierarchy Analysis', date: '1 month ago', type: 'Intelligence' },
            { id: 'DOC-203', title: 'Artifact Catalog: Light Crystals', date: '2 weeks ago', type: 'Research' },
          ],
          activities: [
            { date: 'Yesterday', description: 'Large gathering observed at Central Temple', agent: 'Ravenna Nemesyn' },
            { date: '4 days ago', description: 'New recruit initiation ceremony', agent: 'Ravenna Nemesyn' },
            { date: '2 weeks ago', description: 'Unusual light phenomena during midnight ritual', agent: 'Surveillance System' },
          ]
        },
        'TG-004': {
          id: 'TG-004',
          name: 'Divine Artifacts',
          type: 'Objects',
          status: 'Research',
          riskLevel: 'Critical',
          lastUpdated: '12 hours ago',
          infoCount: 6,
          assignedAgents: ['Jun Minamitake', 'Ravenna Nemesyn'],
          progress: 23,
          image: 'https://images.pexels.com/photos/2127969/pexels-photo-2127969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          description: 'Collection of artifacts with unknown origins and capabilities. Potentially dangerous.',
          location: 'Secure Storage, Guild Headquarters',
          objects: 7,
          documents: [
            { id: 'DOC-301', title: 'Analysis Report: Memory Crystal', date: '1 week ago', type: 'Research' },
            { id: 'DOC-302', title: 'Containment Protocols', date: '3 days ago', type: 'Procedure' },
          ],
          activities: [
            { date: 'Today', description: 'Containment breach in sector 3, resolved', agent: 'Security Team' },
            { date: '2 days ago', description: 'Energy output increased by 27%', agent: 'Monitoring System' },
          ]
        }
      };
      
      setTarget(mockTargets[targetId] || {
        id: targetId,
        name: 'Unknown Target',
        type: 'Unclassified',
        status: 'Pending',
        riskLevel: 'Unknown',
        lastUpdated: 'Never',
        description: 'No data available for this target.',
        progress: 0
      });
    }, 800);
  }, [targetId]);
  
  const getRiskLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
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
    switch (status?.toLowerCase()) {
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
  
  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background/10 to-background">
        <motion.div 
          className="text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="loading-sequence relative">
            <motion.div 
              className="absolute -inset-10 rounded-full"
              animate={{ 
                boxShadow: ['0 0 20px rgba(168, 85, 247, 0.4)', '0 0 40px rgba(168, 85, 247, 0.6)', '0 0 20px rgba(168, 85, 247, 0.4)']
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <Target className="mx-auto mb-4 h-12 w-12 text-primary" />
            <span className="text-lg font-display">INITIALIZING TARGET SCAN</span>
            <div className="flex justify-center mt-2">
              <motion.span 
                className="dot text-primary text-2xl"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
              >.</motion.span>
              <motion.span 
                className="dot text-primary text-2xl"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
              >.</motion.span>
              <motion.span 
                className="dot text-primary text-2xl"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
              >.</motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-16 relative">
      {/* Animated background effects - reuse from hub */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/50 to-background pointer-events-none">
        <div className="absolute inset-0 circuit-pattern opacity-10"></div>
        <div className="absolute inset-0 hex-grid opacity-5"></div>
      </div>
      
      {/* Scanline effect */}
      <motion.div 
        className="scanline"
        animate={{ 
          top: ["-100%", "200%"],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "linear"
        }}
      />
      
      {/* Digital noise overlay */}
      <div className="digital-noise"></div>
      
      <div className="container px-4 mx-auto max-w-7xl pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              className="mr-4 hover:bg-primary/20 transition-colors" 
              onClick={() => router.push('/hub')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="tracking-wider">RETURN TO HUB</span>
            </Button>
            
            <div className="h-6 w-px bg-primary/30 mr-4"></div>
            
            <motion.div
              animate={{ 
                textShadow: ['0 0 8px rgba(168, 85, 247, 0.7)', '0 0 16px rgba(168, 85, 247, 0.9)', '0 0 8px rgba(168, 85, 247, 0.7)']
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center"
            >
              <Target className="mr-2 h-5 w-5 text-primary" />
              <h1 className="text-2xl font-display tracking-wide">TARGET PROFILE</h1>
            </motion.div>
            
            {/* Rank indicator */}
            <div className="ml-auto flex items-center">
              <div className="text-xs text-muted-foreground mr-2">TARGET RANK:</div>
              <AnimatePresence>
                {showRankAnimation && (
                  <motion.div 
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                    onAnimationComplete={() => setShowRankAnimation(false)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      target.riskLevel === 'Critical' ? 'bg-red-500/30 text-red-500' :
                      target.riskLevel === 'High' ? 'bg-amber-500/30 text-amber-500' : 
                      target.riskLevel === 'Medium' ? 'bg-blue-500/30 text-blue-500' : 
                      'bg-green-500/30 text-green-500'
                    } font-bold`}>
                      {target.riskLevel === 'Critical' ? 'S' :
                       target.riskLevel === 'High' ? 'A' :
                       target.riskLevel === 'Medium' ? 'B' : 'C'}
                    </div>
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      animate={{ 
                        boxShadow: [
                          `0 0 0 2px ${
                            target.riskLevel === 'Critical' ? 'rgba(239, 68, 68, 0.5)' :
                            target.riskLevel === 'High' ? 'rgba(245, 158, 11, 0.5)' : 
                            target.riskLevel === 'Medium' ? 'rgba(59, 130, 246, 0.5)' : 
                            'rgba(34, 197, 94, 0.5)'
                          }`,
                          `0 0 8px 2px ${
                            target.riskLevel === 'Critical' ? 'rgba(239, 68, 68, 0.8)' :
                            target.riskLevel === 'High' ? 'rgba(245, 158, 11, 0.8)' : 
                            target.riskLevel === 'Medium' ? 'rgba(59, 130, 246, 0.8)' : 
                            'rgba(34, 197, 94, 0.8)'
                          }`,
                          `0 0 0 2px ${
                            target.riskLevel === 'Critical' ? 'rgba(239, 68, 68, 0.5)' :
                            target.riskLevel === 'High' ? 'rgba(245, 158, 11, 0.5)' : 
                            target.riskLevel === 'Medium' ? 'rgba(59, 130, 246, 0.5)' : 
                            'rgba(34, 197, 94, 0.5)'
                          }`
                        ],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ repeat: 3, duration: 1 }}
                    />
                  </motion.div>
                )}
                {!showRankAnimation && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    target.riskLevel === 'Critical' ? 'bg-red-500/30 text-red-500' :
                    target.riskLevel === 'High' ? 'bg-amber-500/30 text-amber-500' : 
                    target.riskLevel === 'Medium' ? 'bg-blue-500/30 text-blue-500' : 
                    'bg-green-500/30 text-green-500'
                  } font-bold`}>
                    {target.riskLevel === 'Critical' ? 'S' :
                     target.riskLevel === 'High' ? 'A' :
                     target.riskLevel === 'Medium' ? 'B' : 'C'}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Target header card */}
          <Card className="holographic-card bg-card/30 backdrop-blur-sm border-primary/20 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden z-0">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{ 
                  backgroundImage: `url(${target.image || ''})`,
                  filter: 'blur(8px) brightness(0.2)',
                }}
              />
              
              {/* Add animated gradient overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration:.9, 
                  ease: "easeInOut" 
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />
            </div>
            
            <div className="relative z-10">
              <CardHeader className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="max-w-3xl">
                  {/* Target type and status badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="relative group overflow-hidden bg-black/50 backdrop-blur-sm border-primary/30">
                      <motion.span
                        className="absolute inset-0 bg-primary/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                      <span className="relative z-10">{target.type}</span>
                    </Badge>
                    
                    <Badge variant="outline" className={`relative overflow-hidden ${getRiskLevelColor(target.riskLevel)} bg-black/50 backdrop-blur-sm`}>
                      <motion.span
                        className="absolute inset-0 bg-white/10"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
                      />
                      <span className="relative z-10 flex items-center">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1L15.5 8.5H21L16 13.5L18 21L12 17L6 21L8 13.5L3 8.5H8.5L12 1Z" />
                        </svg>
                        {target.riskLevel} Risk
                      </span>
                    </Badge>
                    
                    <Badge variant="outline" className="relative overflow-hidden bg-black/50 backdrop-blur-sm flex items-center">
                      <motion.span
                        className="absolute inset-0 bg-white/10"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.4 }}
                      />
                      <span className="relative z-10 flex items-center">
                        {getStatusIcon(target.status)}
                        <span className="ml-1">{target.status}</span>
                      </span>
                    </Badge>
                  </div>
                  
                  {/* Target Name with glowing effect */}
                  <motion.div
                    animate={{ 
                      textShadow: ['0 0 8px rgba(168, 85, 247, 0.4)', '0 0 16px rgba(168, 85, 247, 0.6)', '0 0 8px rgba(168, 85, 247, 0.4)']
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <CardTitle className="text-4xl font-display tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white">{target.name}</CardTitle>
                  </motion.div>
                  
                  <CardDescription className="mt-3 max-w-2xl text-base leading-relaxed">
                    {target.description}
                  </CardDescription>
                </div>
                
                {/* Target Progress/Stats Card */}
                <motion.div 
                  className="shrink-0 relative bg-black/50 backdrop-blur-sm rounded-lg p-5 flex flex-col items-center border border-primary/20 min-w-[200px]"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Decorative polygons */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-primary/60" />
                  
                  <div className="text-lg font-bold tracking-wider mb-1">TARGET STATUS</div>
                  
                  {/* Progress Ring */}
                  <div className="relative w-24 h-24 mb-2">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background ring */}
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="rgba(255,255,255,0.1)" 
                        strokeWidth="8" 
                      />
                      
                      {/* Animated progress ring */}
                      <motion.circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="rgba(168, 85, 247, 0.8)" 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                        animate={{ 
                          strokeDashoffset: 2 * Math.PI * 45 * (1 - target.progress / 100) 
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        transform="rotate(-90, 50, 50)"
                      />
                      
                      {/* Animated pulse effect */}
                      <motion.circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="rgba(168, 85, 247, 0.5)" 
                        strokeWidth="2" 
                        animate={{ 
                          r: [45, 50, 45],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2, 
                          ease: "easeInOut" 
                        }}
                      />
                    </svg>
                    
                    {/* Progress percentage */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <motion.div 
                        className="text-3xl font-bold text-primary"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        {target.progress}%
                      </motion.div>
                      <div className="text-xs text-primary/80">COMPLETION</div>
                    </div>
                  </div>
                  
                  {/* Target Power Stats */}
                  <div className="w-full mt-2">
                    <h4 className="text-xs text-muted-foreground mb-2 text-center">TARGET METRICS</h4>
                    
                    <PowerStat 
                      label="Threat Level" 
                      value={target.riskLevel === 'Critical' ? 90 : 
                             target.riskLevel === 'High' ? 75 : 
                             target.riskLevel === 'Medium' ? 50 : 25} 
                      maxValue={100} 
                      color="bg-red-500" 
                    />
                    
                    <PowerStat 
                      label="Intelligence" 
                      value={Math.round(target.progress * 0.8)} 
                      maxValue={100}
                      color="bg-blue-500" 
                    />
                    
                    <PowerStat 
                      label="Surveillance" 
                      value={target.progress} 
                      maxValue={100}
                      color="bg-primary" 
                    />
                  </div>
                </motion.div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <motion.div 
                    className="bg-black/50 backdrop-blur-sm rounded-lg p-4 relative overflow-hidden group"
                    whileHover={{ 
                      boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)',
                      y: -2
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-center mb-2">
                      <Map className="h-4 w-4 mr-2 text-primary" />
                      <h3 className="text-sm font-medium tracking-wide">LOCATION</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{target.location || 'Unknown'}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-black/50 backdrop-blur-sm rounded-lg p-4 relative overflow-hidden group"
                    whileHover={{ 
                      boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)',
                      y: -2
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      <h3 className="text-sm font-medium tracking-wide">ASSIGNED AGENTS</h3>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {target.assignedAgents?.map((agent: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-primary/10 hover:bg-primary/20 transition-colors">
                          {agent}
                        </Badge>
                      )) || <span className="text-sm text-muted-foreground">None assigned</span>}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-black/50 backdrop-blur-sm rounded-lg p-4 relative overflow-hidden group"
                    whileHover={{ 
                      boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)',
                      y: -2
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <h3 className="text-sm font-medium tracking-wide">LAST UPDATED</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{target.lastUpdated}</p>
                    <div className="mt-2 flex items-center">
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Bookmark className="h-3 w-3 mr-1 text-primary/70" />
                        TARGET ID: {target.id}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
        
        {/* Tab content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tabs defaultValue="documents" className="space-y-6">
            <div className="bg-card/30 backdrop-blur-sm rounded-md p-1 relative overflow-hidden">
              {/* Animated glow line under the tabs */}
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/70 via-accent/70 to-primary/70"
                style={{ width: '25%' }}
                animate={{
                  left: ['0%', '25%', '50%', '75%'][['documents', 'activities', 'analysis', 'communications'].indexOf(document.querySelector('[data-state="active"]')?.getAttribute('value') || 'documents')]
                }}
                transition={{ duration: 0.3 }}
              />
              
              <TabsList className="w-full grid grid-cols-4 bg-transparent">
                <TabsTrigger 
                  value="documents" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-white relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-0"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div 
                    className="relative z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    INTEL FILES
                  </motion.div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="activities" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-white relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-0"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div 
                    className="relative z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    ACTIVITY LOG
                  </motion.div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="analysis" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-white relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-0"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div 
                    className="relative z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    THREAT ANALYSIS
                  </motion.div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="communications" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-white relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-0"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div 
                    className="relative z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    COMMS INTERCEPT
                  </motion.div>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="documents" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="holographic-card bg-card/30 backdrop-blur-sm border-primary/20 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-primary" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white">
                          INTELLIGENCE FILES
                        </span>
                      </CardTitle>
                      <CardDescription>
                        Classified documents and intel gathered on this target
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {target.documents && target.documents.length > 0 ? (
                        <div className="space-y-3">
                          {target.documents.map((doc: any, idx: number) => (
                            <motion.div 
                              key={idx}
                              className="p-3 bg-black/40 rounded-lg flex justify-between items-center hover:bg-primary/10 transition-colors cursor-pointer relative overflow-hidden group"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              whileHover={{ 
                                boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)',
                                scale: 1.01
                              }}
                            >
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100"
                                animate={{ x: ['0%', '100%'], opacity: [0, 0.3, 0] }}
                                transition={{ 
                                  repeat: Infinity, 
                                  repeatType: "loop", 
                                  duration: 2,
                                  ease: "easeInOut"
                                }}
                              />
                              
                              <div>
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-primary" />
                                  <span className="font-medium">{doc.title}</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                                  <Badge variant="outline" className="mr-2 text-[10px] h-4 bg-primary/10">{doc.type}</Badge>
                                  <span className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                    {doc.date}
                                  </span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="group-hover:bg-primary/20 transition-colors">
                                <Eye className="h-4 w-4 mr-1" />
                                <span className="tracking-wide text-xs">VIEW</span>
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <motion.div 
                          className="text-center p-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <FileText className="h-10 w-10 text-primary/50 mx-auto mb-4" />
                          </motion.div>
                          <div className="text-muted-foreground mb-2">No intelligence files available</div>
                          <Button variant="outline" size="sm" className="bg-primary/5 hover:bg-primary/10 transition-all">
                            <FileText className="h-4 w-4 mr-2" />
                            ADD DOCUMENT
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            
            <TabsContent value="activities" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="holographic-card bg-card/30 backdrop-blur-sm border-primary/20 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white">
                          ACTIVITY TIMELINE
                        </span>
                      </CardTitle>
                      <CardDescription>
                        Surveillance and intelligence reports from the field
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {target.activities && target.activities.length > 0 ? (
                        <div className="space-y-0">
                          {target.activities.map((activity: any, idx: number) => (
                            <motion.div 
                              key={idx}
                              className="relative pl-6 pb-6 last:pb-0"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.15 }}
                            >
                              {/* Timeline connector */}
                              {idx < target.activities.length - 1 && (
                                <motion.div 
                                  className="absolute left-[9px] top-[9px] bottom-0 w-[2px] bg-primary/20"
                                  initial={{ height: 0 }}
                                  animate={{ height: '100%' }}
                                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.3 }}
                                />
                              )}
                              
                              {/* Timeline dot with pulse effect */}
                              <div className="absolute left-0 top-[9px] h-[18px] w-[18px] flex items-center justify-center">
                                <motion.div 
                                  className="absolute inset-0 rounded-full bg-primary/30"
                                  animate={{ 
                                    scale: [1, 1.5, 1],
                                    opacity: [0.7, 0.2, 0.7] 
                                  }}
                                  transition={{ 
                                    repeat: Infinity, 
                                    duration: 2,
                                    delay: idx * 0.5
                                  }}
                                />
                                <motion.div 
                                  className="h-[10px] w-[10px] rounded-full bg-primary"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.3, delay: idx * 0.15 + 0.2 }}
                                />
                              </div>
                              
                              {/* Content */}
                              <motion.div 
                                className="bg-black/40 rounded-lg p-3 hover:bg-primary/5 transition-colors border border-primary/10"
                                whileHover={{ 
                                  boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)',
                                  borderColor: 'rgba(168, 85, 247, 0.3)',
                                  scale: 1.01
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="text-xs text-primary font-medium mb-1 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {activity.date}
                                </div>
                                <div className="text-sm">
                                  {activity.description}
                                </div>
                                <div className="text-xs text-muted-foreground mt-2 flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  Reported by: <span className="text-primary ml-1">{activity.agent}</span>
                                </div>
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <motion.div 
                          className="text-center p-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <AlertTriangle className="h-10 w-10 text-primary/50 mx-auto mb-4" />
                          </motion.div>
                          <div className="text-muted-foreground mb-2">No activity recorded yet</div>
                          <Button variant="outline" size="sm" className="bg-primary/5 hover:bg-primary/10 transition-all">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            ADD ACTIVITY
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            
            {/* The Analysis tab with enhanced RPG-like visualizations */}
            <TabsContent value="analysis" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="holographic-card bg-card/30 backdrop-blur-sm border-primary/20 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-primary" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white">
                          THREAT ANALYSIS
                        </span>
                      </CardTitle>
                      <CardDescription>
                        Comprehensive evaluation of target capabilities and weaknesses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* RPG-style analysis screen */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          className="bg-black/40 rounded-lg p-4 border border-primary/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-sm font-bold mb-3 flex items-center">
                            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                            CAPABILITY ASSESSMENT
                          </h3>
                          
                          <div className="space-y-4">
                            {/* Radar Chart Placeholder - In a real app, use a proper chart library */}
                            <div className="h-[200px] flex items-center justify-center relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div 
                                  className="w-[180px] h-[180px] border border-primary/30 rounded-full"
                                  animate={{ scale: [1, 1.02, 1], opacity: [0.6, 0.8, 0.6] }}
                                  transition={{ repeat: Infinity, duration: 4 }}
                                />
                                <motion.div 
                                  className="absolute w-[120px] h-[120px] border border-primary/30 rounded-full"
                                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
                                  transition={{ repeat: Infinity, duration: 3 }}
                                />
                                <motion.div 
                                  className="absolute w-[60px] h-[60px] border border-primary/30 rounded-full" 
                                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                />
                              </div>
                              
                              {/* Poly shape based on stats */}
                              <svg className="absolute inset-0" viewBox="0 0 200 200">
                                <motion.polygon 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  points={
                                    target.riskLevel === 'Critical' ? "100,20 160,60 140,140 60,140 40,60" :
                                    target.riskLevel === 'High' ? "100,30 150,70 130,130 70,130 50,70" :
                                    target.riskLevel === 'Medium' ? "100,40 140,80 120,120 80,120 60,80" :
                                    "100,50 130,90 110,110 90,110 70,90"
                                  }
                                  fill="rgba(168, 85, 247, 0.2)"
                                  stroke="rgba(168, 85, 247, 0.8)"
                                  strokeWidth="2"
                                />
                                
                                {/* Animated dots at vertices */}
                                <motion.circle cx="100" cy={target.riskLevel === 'Critical' ? "20" : target.riskLevel === 'High' ? "30" : target.riskLevel === 'Medium' ? "40" : "50"} r="4" fill="#fff" 
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                />
                                <motion.circle cx={target.riskLevel === 'Critical' ? "160" : target.riskLevel === 'High' ? "150" : target.riskLevel === 'Medium' ? "140" : "130"} cy={target.riskLevel === 'Critical' ? "60" : target.riskLevel === 'High' ? "70" : target.riskLevel === 'Medium' ? "80" : "90"} r="4" fill="#fff"
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                                />
                                <motion.circle cx={target.riskLevel === 'Critical' ? "140" : target.riskLevel === 'High' ? "130" : target.riskLevel === 'Medium' ? "120" : "110"} cy={target.riskLevel === 'Critical' ? "140" : target.riskLevel === 'High' ? "130" : target.riskLevel === 'Medium' ? "120" : "110"} r="4" fill="#fff"
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
                                />
                                <motion.circle cx={target.riskLevel === 'Critical' ? "60" : target.riskLevel === 'High' ? "70" : target.riskLevel === 'Medium' ? "80" : "90"} cy={target.riskLevel === 'Critical' ? "140" : target.riskLevel === 'High' ? "130" : target.riskLevel === 'Medium' ? "120" : "110"} r="4" fill="#fff"
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.9 }}
                                />
                                <motion.circle cx={target.riskLevel === 'Critical' ? "40" : target.riskLevel === 'High' ? "50" : target.riskLevel === 'Medium' ? "60" : "70"} cy={target.riskLevel === 'Critical' ? "60" : target.riskLevel === 'High' ? "70" : target.riskLevel === 'Medium' ? "80" : "90"} r="4" fill="#fff"
                                  animate={{ opacity: [1, 0.5, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5, delay: 1.2 }}
                                />
                              </svg>
                              
                              {/* Labels */}
                              <div className="absolute" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)' }}>
                                <div className="text-xs text-white">Threat</div>
                              </div>
                              <div className="absolute" style={{ top: '35%', right: '15%' }}>
                                <div className="text-xs text-white">Resources</div>
                              </div>
                              <div className="absolute" style={{ bottom: '20%', right: '25%' }}>
                                <div className="text-xs text-white">Mobility</div>
                              </div>
                              <div className="absolute" style={{ bottom: '20%', left: '25%' }}>
                                <div className="text-xs text-white">Secrecy</div>
                              </div>
                              <div className="absolute" style={{ top: '35%', left: '15%' }}>
                                <div className="text-xs text-white">Influence</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div
                          className="bg-black/40 rounded-lg p-4 border border-primary/10 flex flex-col"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <h3 className="text-sm font-bold mb-3 flex items-center">
                            <Award className="h-4 w-4 mr-2 text-primary" />
                            THREAT EVALUATION
                          </h3>
                          
                          <div className="flex-1 flex items-center justify-center">
                            <motion.div
                              className="text-center"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                            >
                              <div className="mb-4">
                                <Shield className="h-12 w-12 mx-auto text-primary mb-2" />
                                <div className="text-xs text-muted-foreground">ANALYSIS IN PROGRESS</div>
                              </div>
                              
                              <motion.div
                                className="text-sm text-muted-foreground max-w-md mx-auto"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                              >
                                Detailed threat analysis will be available once the target profile has reached {Math.max(70, Math.round(target.progress + 20))}% completion.
                              </motion.div>
                              
                              <div className="mt-4 flex justify-center">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  disabled={target.progress < 65}
                                  className={`${
                                    target.progress < 65 ? 'opacity-50' : 'bg-primary/10 hover:bg-primary/20'
                                  } transition-all`}
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  REQUEST ANALYSIS
                                </Button>
                              </div>
                              
                              <div className="text-xs text-primary mt-2">
                                {target.progress < 65 ? 
                                  `Requires ${Math.round(65 - target.progress)}% more surveillance data` : 
                                  'Analysis ready for processing'
                                }
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
            
            <TabsContent value="communications" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="holographic-card bg-card/30 backdrop-blur-sm border-primary/20 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white">
                          COMMUNICATIONS INTERCEPT
                        </span>
                      </CardTitle>
                      <CardDescription>
                        Monitored messages and communications from the target
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className="text-center p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="mb-4 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                              className="w-24 h-24 rounded-full bg-primary/5"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5] 
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 2
                              }}
                            />
                            <motion.div 
                              className="absolute w-16 h-16 rounded-full bg-primary/10"
                              animate={{ 
                                scale: [1, 1.4, 1],
                                opacity: [0.7, 0.1, 0.7] 
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 1.5,
                                delay: 0.2
                              }}
                            />
                          </div>
                          <motion.div
                            animate={{ rotateZ: [0, 360] }}
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                          >
                            <MessageSquare className="h-12 w-12 text-primary mx-auto relative z-10" />
                          </motion.div>
                        </div>
                        
                        <div className="space-y-1 my-4">
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-xs text-primary/80 font-mono"
                          >
                            SIGNAL_ACQUISITION: IN_PROGRESS
                          </motion.div>
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                            className="text-xs text-primary/80 font-mono"
                          >
                            DECRYPTION_MODULE: ONLINE
                          </motion.div>
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                            className="text-xs text-primary/80 font-mono"
                          >
                            FREQUENCY_SCAN: ACTIVE
                          </motion.div>
                        </div>
                        
                        <div className="text-muted-foreground mb-2">No communications intercepted yet</div>
                        <div className="text-sm text-muted-foreground">
                          Communications monitoring is active. Data will appear here when available.
                        </div>
                        
                        <motion.div
                          className="mt-4 flex justify-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button variant="outline" size="sm" className="bg-primary/5 hover:bg-primary/10 transition-all">
                            <Target className="h-4 w-4 mr-2" />
                            ADJUST MONITORING PARAMETERS
                          </Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      {/* Bottom indicator */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/5 via-primary to-primary/5"
        animate={{ 
          opacity: [0.5, 1, 0.5],
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 10,
          ease: "linear"
        }}
      />
    </div>
  );
} 