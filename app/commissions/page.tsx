"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Filter, Plus, Clock, FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import CommissionForm from '@/components/commissions/commission-form';
import { useAuth } from '@/contexts/AuthContext';
import { getCommissions } from '@/lib/firebase';
import { toast } from 'sonner';

export default function CommissionsPage() {
  const [loaded, setLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [commissions, setCommissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    // Fetch commissions from Firestore
    const fetchCommissions = async () => {
      try {
        setIsLoading(true);
        const { commissions: fetchedCommissions, error } = await getCommissions();
        
        if (error) {
          toast.error("Failed to load commissions", {
            description: error
          });
        } else {
          setCommissions(fetchedCommissions);
        }
      } catch (error: any) {
        toast.error("Failed to load commissions", {
          description: error.message || "An error occurred"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchCommissions();
    } else {
      // Use mock data if not authenticated
      setCommissions([
        {
          id: 'CM-2025-001',
          title: 'Shadow Hunters Guild Investigation',
          description: 'Need information on the leadership structure and current objectives of the Shadow Hunters Guild. Suspect they may be involved in illegal artifact trade.',
          requester: 'Anonymous',
          type: 'Surveillance',
          reward: '5000 gold',
          difficulty: 'High',
          deadline: '2025-05-01',
          status: 'Open',
        },
        {
          id: 'CM-2025-002',
          title: 'Locate Divine Artifact',
          description: 'Seeking information on the whereabouts of the Tears of Euphemia artifact reportedly last seen in the Eastern District.',
          requester: 'Kingdom Council',
          type: 'Asset Recovery',
          reward: '8000 gold',
          difficulty: 'Medium',
          deadline: '2025-04-28',
          status: 'Open',
        },
        {
          id: 'CM-2025-003',
          title: 'Market Price Manipulation Investigation',
          description: 'Investigate rumors of price manipulation in the item market by unknown actors.',
          requester: 'Merchant Alliance',
          type: 'Data Analysis',
          reward: '3500 gold',
          difficulty: 'Low',
          deadline: '2025-05-05',
          status: 'Open',
        },
        {
          id: 'CM-2025-004',
          title: 'Player Character Background Check',
          description: 'Need thorough background check on player "DarkReaper87" including guild associations, combat history, and known allies.',
          requester: 'Anonymous',
          type: 'Intelligence',
          reward: '2000 gold',
          difficulty: 'Low',
          deadline: '2025-04-25',
          status: 'Claimed',
        },
        {
          id: 'CM-2025-005',
          title: 'Monitor Abomination Activity',
          description: 'Track and report Abomination sightings in the Northern Wilderness region. Need patterns of movement and behavior.',
          requester: 'Resonance Moderator',
          type: 'Surveillance',
          reward: '10000 gold',
          difficulty: 'Critical',
          deadline: '2025-05-10',
          status: 'Claimed',
        },
        {
          id: 'CM-2025-006',
          title: 'Technological Anomaly Research',
          description: 'Investigate reports of technological anomalies in the Echo Chambers dungeon. Need documentation and evidence collection.',
          requester: 'Research Consortium',
          type: 'Information',
          reward: '7500 gold',
          difficulty: 'High',
          deadline: '2025-05-15',
          status: 'Open',
        },
      ]);
      
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  
  // Filter commissions based on search text and selected type
  const filteredCommissions = commissions.filter(commission => {
    const matchesSearch = (
      commission.title.toLowerCase().includes(searchText.toLowerCase()) ||
      commission.description.toLowerCase().includes(searchText.toLowerCase()) ||
      commission.requester.toLowerCase().includes(searchText.toLowerCase())
    );
    
    const matchesType = selectedType === 'all' || commission.type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
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
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'claimed':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'completed':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/50';
      default:
        return 'bg-primary/20 text-primary border-primary/50';
    }
  };
  
  return (
    <div className="min-h-screen pb-16">
      <DashboardHeader />
      
      <div className="container px-4 mx-auto max-w-7xl mt-24">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-display flex items-center">
                  <Target className="mr-2 h-6 w-6 text-primary" />
                  Commissions
                </h1>
                <p className="text-muted-foreground">Request or browse information gathering missions</p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="font-display tracking-wide">
                    <Plus className="mr-2 h-4 w-4" />
                    New Commission
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] bg-card/95 backdrop-blur-md">
                  <DialogHeader>
                    <DialogTitle className="font-display flex items-center">
                      <Target className="mr-2 h-5 w-5 text-primary" />
                      Create New Commission
                    </DialogTitle>
                    <DialogDescription>
                      Submit a request for information gathering or surveillance
                    </DialogDescription>
                  </DialogHeader>
                  
                  <CommissionForm />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search commissions..."
                    className="pl-10"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select 
                    value={selectedType} 
                    onValueChange={setSelectedType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Surveillance">Surveillance</SelectItem>
                      <SelectItem value="Intelligence">Intelligence</SelectItem>
                      <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                      <SelectItem value="Asset Recovery">Asset Recovery</SelectItem>
                      <SelectItem value="Information">Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-muted-foreground">Loading commissions...</p>
              </div>
            ) : (
              <Tabs defaultValue="open" className="w-full">
                <TabsList className="grid grid-cols-3 w-full md:w-auto bg-secondary/30">
                  <TabsTrigger value="open" className="font-display">
                    Open
                  </TabsTrigger>
                  <TabsTrigger value="claimed" className="font-display">
                    Claimed
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="font-display">
                    Completed
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="open" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCommissions
                      .filter(commission => commission.status === 'Open')
                      .map((commission, index) => (
                        <CommissionCard 
                          key={commission.id} 
                          commission={commission} 
                          index={index}
                          getDifficultyColor={getDifficultyColor}
                          getStatusColor={getStatusColor}
                        />
                      ))}
                  </div>
                  
                  {filteredCommissions.filter(commission => commission.status === 'Open').length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                      <FileText className="h-12 w-12 mb-4 opacity-25" />
                      <p>No open commissions match your criteria</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="claimed" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCommissions
                      .filter(commission => commission.status === 'Claimed')
                      .map((commission, index) => (
                        <CommissionCard 
                          key={commission.id} 
                          commission={commission} 
                          index={index}
                          getDifficultyColor={getDifficultyColor}
                          getStatusColor={getStatusColor}
                        />
                      ))}
                  </div>
                  
                  {filteredCommissions.filter(commission => commission.status === 'Claimed').length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                      <FileText className="h-12 w-12 mb-4 opacity-25" />
                      <p>No claimed commissions match your criteria</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="completed" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCommissions
                      .filter(commission => commission.status === 'Completed')
                      .map((commission, index) => (
                        <CommissionCard 
                          key={commission.id} 
                          commission={commission} 
                          index={index}
                          getDifficultyColor={getDifficultyColor}
                          getStatusColor={getStatusColor}
                        />
                      ))}
                  </div>
                  
                  {filteredCommissions.filter(commission => commission.status === 'Completed').length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                      <FileText className="h-12 w-12 mb-4 opacity-25" />
                      <p>No completed commissions available yet</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface CommissionCardProps {
  commission: any;
  index: number;
  getDifficultyColor: (difficulty: string) => string;
  getStatusColor: (status: string) => string;
}

const CommissionCard = ({ commission, index, getDifficultyColor, getStatusColor }: CommissionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
    >
      <Card className="holographic-card h-full bg-card/30 backdrop-blur-sm overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className={`${getStatusColor(commission.status)}`}>
              {commission.status}
            </Badge>
            <Badge variant="outline" className={`${getDifficultyColor(commission.difficulty || commission.priority)}`}>
              {commission.difficulty || commission.priority}
            </Badge>
          </div>
          <CardTitle className="mt-2 line-clamp-1">{commission.title}</CardTitle>
          <CardDescription className="flex items-center text-xs">
            <span className="font-medium">{commission.requester}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Target className="h-3 w-3 mr-1" />
              {commission.type}
            </span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {commission.description}
          </p>
        </CardContent>
        
        <CardFooter className="pt-2 flex flex-col items-start gap-2">
          <div className="flex justify-between w-full text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Due: {typeof commission.deadline === 'string' ? commission.deadline : commission.deadline.toDate().toISOString().split('T')[0]}</span>
            </div>
            <div className="font-medium text-primary">{commission.reward}</div>
          </div>
          
          <Button className="w-full mt-2" size="sm">
            {commission.status === 'Open' ? 'Accept Commission' : 'View Details'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};