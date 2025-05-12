"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Eye, 
  Shield, 
  Users, 
  Target, 
  Database,
  AlertTriangle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import RecentCommissions from '@/components/dashboard/recent-commissions';
import ActiveTargets from '@/components/dashboard/active-targets';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import ClientOnly from '@/utils/client-only';
import SSRNetworkGraph from '@/components/dashboard/ssr-network-graph';

// Import NetworkGraph with dynamic import to prevent SSR issues
const NetworkGraph = dynamic(
  () => import('@/components/dashboard/network-graph'),
  { ssr: false, loading: () => <SSRNetworkGraph /> }
);

export default function DashboardPage() {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
      setIsLoading(false);
    }, 500);
  }, []);
  
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
  
  // If still checking authentication, show loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="ml-4 text-xl font-display">Loading...</p>
      </div>
    );
  }
  
  // If not authenticated and not loading anymore, the redirect will happen
  if (!isLoading) {
    return null;
  }
  
  return (
    <div className="min-h-screen pb-16">
      <DashboardHeader />
      
      <div className="container px-4 mx-auto max-w-7xl mt-24">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {statsCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Card className="holographic-card bg-card/30 backdrop-blur-sm">
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="holographic-card bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-primary" />
                  <span>Intelligence Network</span>
                </CardTitle>
                <CardDescription>Interactive visualization of target connections and relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <NetworkGraph />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Tabs defaultValue="commissions" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 bg-secondary/30">
                <TabsTrigger value="commissions" className="font-display">
                  <FileText className="mr-2 h-4 w-4" />
                  Recent Commissions
                </TabsTrigger>
                <TabsTrigger value="targets" className="font-display">
                  <Target className="mr-2 h-4 w-4" />
                  Active Targets
                </TabsTrigger>
              </TabsList>
              <TabsContent value="commissions">
                <RecentCommissions />
              </TabsContent>
              <TabsContent value="targets">
                <ActiveTargets />
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-card/30 backdrop-blur-sm holographic-card p-4 rounded-lg mt-4"
          >
            <div className="flex items-start">
              <AlertTriangle className="text-amber-500 mr-2" />
              <div>
                <h3 className="text-sm font-semibold">System Alert</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Unusual memory patterns detected in last scan. Source: <span className="text-primary font-medium">NULL404</span>. Security protocols engaged.
                </p>
                <div className="mt-3">
                  <Button variant="outline" size="sm" className="text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}