"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Search, Filter, Lock, User, Building, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import TargetDetails from '@/components/targets/target-details';
import { useAuth } from '@/contexts/AuthContext';
import { getTargets, getTargetById } from '@/lib/firebase';
import { toast } from 'sonner';

export default function TargetsPage() {
  const [loaded, setLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [targets, setTargets] = useState<any[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    // Fetch targets from Firestore
    const fetchTargets = async () => {
      try {
        setIsLoading(true);
        const { targets: fetchedTargets, error } = await getTargets();
        
        if (error) {
          toast.error("Failed to load targets", {
            description: error
          });
        } else {
          setTargets(fetchedTargets);
        }
      } catch (error: any) {
        toast.error("Failed to load targets", {
          description: error.message || "An error occurred"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchTargets();
    } else {
      // Use mock data if not authenticated
      setTargets([
        {
          id: 'TG-001',
          name: 'Shadow Hunters Guild',
          type: 'Organization',
          status: 'Monitored',
          location: 'Northern District',
          riskLevel: 'High',
          securityLevel: 'A',
          lastUpdated: '3 hours ago',
          updatedBy: 'Ravenna Nemesyn',
          infoCount: 12,
          image: 'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          icon: <Building className="h-6 w-6" />,
          description: 'A mysterious guild focused on elite combat missions and artifact collection. They operate primarily in shadow zones and contested territories.',
          members: ['Kain Shadowblade', 'Lyra Nightshade', 'Vex Thornheart'],
          observations: [
            'Regular meetings at the Obsidian Tower on Tuesdays',
            'Connection to black market artifact dealers confirmed',
            'Recruitment drive focusing on high-tier players'
          ]
        },
        {
          id: 'TG-002',
          name: 'Eden Project',
          type: 'Location',
          status: 'Investigated',
          location: 'Eastern District',
          riskLevel: 'Medium',
          securityLevel: 'B',
          lastUpdated: '1 day ago',
          updatedBy: 'Jun Minamitake',
          infoCount: 8,
          image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          icon: <MapPin className="h-6 w-6" />,
          description: 'A secretive research facility reportedly working on divine energy applications. Limited public access with heavy security presence.',
          members: [],
          observations: [
            'Increased shipments of specialized equipment observed',
            'Energy signatures detected beyond normal parameters',
            'Local environment shows signs of divine corruption'
          ]
        },
        {
          id: 'TG-003',
          name: 'Euphemia Followers',
          type: 'Religious Group',
          status: 'Infiltrated',
          location: 'Central District',
          riskLevel: 'Low',
          securityLevel: 'C',
          lastUpdated: '5 hours ago',
          updatedBy: 'NULL404',
          infoCount: 15,
          image: 'https://images.pexels.com/photos/1730341/pexels-photo-1730341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          icon: <User className="h-6 w-6" />,
          description: 'A religious organization devoted to the worship of Euphemia, goddess of light. They maintain public shrines and engage in community service.',
          members: ['High Priestess Selene', 'Oracle Mira', 'Brother Cassian'],
          observations: [
            'Regular prayer meetings at Dawn and Dusk',
            'Charitable activities serve as recruitment tools',
            'Inner circle has access to minor divine artifacts'
          ]
        },
        {
          id: 'TG-004',
          name: 'Divine Artifacts',
          type: 'Objects',
          status: 'Researched',
          location: 'Various',
          riskLevel: 'Critical',
          securityLevel: 'S',
          lastUpdated: '12 hours ago',
          updatedBy: 'Ravenna Nemesyn',
          infoCount: 6,
          image: 'https://images.pexels.com/photos/2127969/pexels-photo-2127969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          icon: <Package className="h-6 w-6" />,
          description: 'Collection of divine artifacts with reality-altering properties. Each item has unique abilities and potential dangers.',
          members: [],
          observations: [
            'Tears of Euphemia last seen in Eastern Market',
            'Abyssal Chalice in possession of Shadow Hunters',
            'Memory Crystal showing signs of activation cycles'
          ]
        },
        {
          id: 'TG-005',
          name: 'The Sovereign',
          type: 'Person',
          status: 'Monitored',
          location: 'Unknown',
          riskLevel: 'Critical',
          securityLevel: 'S+',
          lastUpdated: '1 day ago',
          updatedBy: 'NULL404',
          infoCount: 4,
          image: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          icon: <User className="h-6 w-6" />,
          description: 'Mysterious individual with extraordinary abilities. Little is known about their origins or true motivations.',
          members: [],
          observations: [
            'Appears at locations moments before significant events',
            'Demonstrates knowledge of future outcomes',
            'Energy signature unlike any recorded player or NPC'
          ]
        },
        {
          id: 'TG-006',
          name: 'Resonance Anomalies',
          type: 'Phenomenon',
          status: 'Researched',
          location: 'Various',
          riskLevel: 'High',
          securityLevel: 'A',
          lastUpdated: '2 days ago',
          updatedBy: 'Jun Minamitake',
          infoCount: 10,
          image: 'https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          icon: <Eye className="h-6 w-6" />,
          description: 'Unexplained phenomena occurring at random locations. Characterized by reality distortions and echoes of past or future events.',
          members: [],
          observations: [
            'Frequency of occurrences increasing by 23% monthly',
            'Correlation with divine artifact proximity noted',
            'Affected areas show lingering memory contamination'
          ]
        },
      ]);
      
      setIsLoading(false);
    }
  }, [isAuthenticated]);
  
  // Filter targets based on search text and selected type
  const filteredTargets = targets.filter(target => {
    const matchesSearch = (
      target.name.toLowerCase().includes(searchText.toLowerCase()) ||
      target.location.toLowerCase().includes(searchText.toLowerCase()) ||
      target.type.toLowerCase().includes(searchText.toLowerCase())
    );
    
    const matchesType = selectedType === 'all' || target.type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
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
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'monitored':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'investigated':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/50';
      case 'infiltrated':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'researched':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/50';
      default:
        return 'bg-primary/20 text-primary border-primary/50';
    }
  };
  
  const handleSelectTarget = async (target: any) => {
    if (isAuthenticated) {
      try {
        // Fetch detailed target data if authenticated
        const { target: detailedTarget, error } = await getTargetById(target.id);
        
        if (error) {
          toast.error("Failed to load target details", {
            description: error
          });
          return;
        }
        
        if (detailedTarget) {
          setSelectedTarget(detailedTarget);
        } else {
          // Fallback to the basic target data if detailed not available
          setSelectedTarget(target);
        }
      } catch (error: any) {
        toast.error("Failed to load target details", {
          description: error.message || "An error occurred"
        });
        return;
      }
    } else {
      // Use the mock data directly if not authenticated
      setSelectedTarget(target);
    }
    
    setIsDialogOpen(true);
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
                  <FileText className="mr-2 h-6 w-6 text-primary" />
                  Target Database
                </h1>
                <p className="text-muted-foreground">Access gathered intelligence on monitored targets</p>
              </div>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm rounded-lg border border-border p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search targets..."
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
                      <SelectItem value="Organization">Organization</SelectItem>
                      <SelectItem value="Location">Location</SelectItem>
                      <SelectItem value="Person">Person</SelectItem>
                      <SelectItem value="Religious Group">Religious Group</SelectItem>
                      <SelectItem value="Objects">Objects</SelectItem>
                      <SelectItem value="Phenomenon">Phenomenon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-muted-foreground">Loading targets...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTargets.map((target, index) => (
                  <TargetCard 
                    key={target.id} 
                    target={target} 
                    index={index}
                    getRiskLevelColor={getRiskLevelColor}
                    getStatusColor={getStatusColor}
                    onSelect={handleSelectTarget}
                  />
                ))}
                
                {filteredTargets.length === 0 && (
                  <div className="col-span-3 flex flex-col items-center justify-center py-10 text-muted-foreground">
                    <FileText className="h-12 w-12 mb-4 opacity-25" />
                    <p>No targets match your search criteria</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Target Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[900px] bg-card/95 backdrop-blur-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Target Intelligence
            </DialogTitle>
            <DialogDescription>
              Detailed information gathered on the target
            </DialogDescription>
          </DialogHeader>
          
          {selectedTarget && <TargetDetails target={selectedTarget} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface TargetCardProps {
  target: any;
  index: number;
  getRiskLevelColor: (level: string) => string;
  getStatusColor: (status: string) => string;
  onSelect: (target: any) => void;
}

const TargetCard = ({ target, index, getRiskLevelColor, getStatusColor, onSelect }: TargetCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="holographic-card group h-full cursor-pointer bg-card/30 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-primary/20"
        onClick={() => onSelect(target)}
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ 
              backgroundImage: `url(${target.image})`,
              filter: 'blur(8px) brightness(0.2)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />
        </div>
        
        <div className="relative z-10 p-4">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="outline" className="bg-black/50 backdrop-blur-sm">
              {target.type}
            </Badge>
            <Badge variant="outline" className={`${getRiskLevelColor(target.riskLevel)} bg-black/50 backdrop-blur-sm`}>
              {target.riskLevel}
            </Badge>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="p-2 bg-primary/10 rounded-full mr-3">
              {typeof target.icon === 'object' ? 
                target.icon : 
                <Building className="h-6 w-6" />
              }
            </div>
            <h3 className="text-xl font-display">{target.name}</h3>
          </div>
          
          <div className="flex items-center mb-4">
            <Badge variant="outline" className={`${getStatusColor(target.status)} mr-2`}>
              {target.status}
            </Badge>
            {target.location !== 'Unknown' && target.location !== 'Various' && (
              <span className="text-xs flex items-center text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {target.location}
              </span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {target.description}
          </p>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div>
              <span>Security Level: </span>
              <span className="font-semibold text-foreground">{target.securityLevel}</span>
            </div>
            <div>
              <span className="flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                {target.infoCount} files
              </span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <div className="text-xs">
                <span className="text-muted-foreground">Updated </span>
                <span>{target.lastUpdated}</span>
              </div>
              <Button variant="outline" size="sm" className="text-xs bg-black/50 backdrop-blur-sm">
                <Lock className="h-3 w-3 mr-1" />
                Access Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};