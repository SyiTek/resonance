"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Shield, 
  Users, 
  Database,
  AlertTriangle,
  FileText,
  Clock,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import NetworkGraph from '@/components/dashboard/network-graph';
import RecentCommissions from '@/components/dashboard/recent-commissions';
import ActiveTargets from '@/components/dashboard/active-targets';

export default function HubPage() {
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // Simulate loading state
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, [isAuthenticated, router]);

  // Stats data
  const statsCards = [
    {
      title: "Active Commissions",
      value: "12",
      change: "+2",
      icon: <Target className="h-4 w-4" />,
      description: "Since last week"
    },
    {
      title: "Agents Online",
      value: "8",
      change: "+3",
      icon: <Users className="h-4 w-4" />,
      description: "In the field"
    },
    {
      title: "Targets Monitored",
      value: "36",
      change: "+5",
      icon: <Eye className="h-4 w-4" />,
      description: "Active surveillance"
    },
    {
      title: "Security Level",
      value: "A+",
      change: "",
      icon: <Shield className="h-4 w-4" />,
      description: "System integrity"
    }
  ];

  return (
    <div className="min-h-screen pb-16 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/50 to-background pointer-events-none">
        <div className="absolute inset-0 circuit-pattern opacity-10"></div>
        <div className="absolute inset-0 hex-grid opacity-5"></div>
      </div>
      
      {/* Scanline effect */}
      <div className="scanline"></div>
      
      {/* Digital noise overlay */}
      <div className="digital-noise"></div>
      
      {/* Cyber neon lights */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="cyber-light"
          style={{
            top: `${20 * i}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
      
      <div className="container px-4 mx-auto max-w-7xl pt-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-display flex items-center mb-2">
                <Target className="mr-2 h-8 w-8 text-primary" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
                  Guild Hub
                </span>
              </h1>
              <p className="text-muted-foreground">
                Central command for intelligence gathering and target monitoring
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search intelligence database..."
                  className="pl-10 w-[300px] bg-background/40 border-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button className="font-display tracking-wide">
                <Eye className="mr-2 h-4 w-4" />
                New Surveillance
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8"
        >
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card className="holographic-card bg-card/30 backdrop-blur-sm perspective-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <div className="p-1 bg-primary/10 rounded-full">
                    {card.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center">
                    {card.change && (
                      <span className={`mr-1 ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {card.change}
                      </span>
                    )}
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Network Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="holographic-card bg-card/30 backdrop-blur-sm mb-8 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                <span>Intelligence Network</span>
              </CardTitle>
              <CardDescription>Interactive visualization of target connections and relationships</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center overflow-hidden">
              <div className="h-[600px] w-full relative" style={{ maxHeight: '600px', overflow: 'hidden' }}>
                <NetworkGraph />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -20 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <RecentCommissions />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <ActiveTargets />
          </motion.div>
        </div>

        {/* System Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-8"
        >
          <Card className="holographic-card bg-card/30 backdrop-blur-sm border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-start">
                <AlertTriangle className="text-red-500 mr-2 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-red-500">Critical Alert</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Anomalous energy signatures detected in sector 7. Multiple high-priority targets showing unusual behavior patterns.
                    <span className="block mt-2">
                      Security protocols have been automatically escalated. Maintain heightened surveillance.
                    </span>
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="destructive" size="sm" className="text-xs">
                      View Threat Analysis
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Dispatch Agents
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}