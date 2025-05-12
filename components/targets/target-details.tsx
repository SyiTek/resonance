"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Eye, User, MapPin, FileText, Clock, Shield, AlertTriangle, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

export default function TargetDetails({ target }: { target: any }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [accessRequested, setAccessRequested] = useState(false);
  
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
  
  const handleRequestAccess = () => {
    setAccessRequested(true);
    
    toast({
      title: "Access Request Submitted",
      description: "Your request for full access is being processed.",
    });
    
    setTimeout(() => {
      setAccessRequested(false);
    }, 3000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="relative h-48 rounded-md overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${target.image})`,
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
        
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-black/50 backdrop-blur-sm">
                  {target.type}
                </Badge>
                <Badge variant="outline" className={`${getStatusColor(target.status)} bg-black/50 backdrop-blur-sm`}>
                  {target.status}
                </Badge>
                <Badge variant="outline" className={`${getRiskLevelColor(target.riskLevel)} bg-black/50 backdrop-blur-sm`}>
                  {target.riskLevel}
                </Badge>
              </div>
              <h1 className="text-3xl font-display">{target.name}</h1>
            </div>
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last Updated: {target.lastUpdated}</span>
              </div>
              <div className="flex items-center mt-1">
                <User className="h-3 w-3 mr-1" />
                <span>By: {target.updatedBy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full">
          {target.icon}
        </div>
        <div>
          <h2 className="text-xl font-display">{target.name}</h2>
          <div className="text-sm text-muted-foreground flex items-center">
            <Shield className="h-4 w-4 mr-1" />
            <span>Security Level: {target.securityLevel}</span>
          </div>
        </div>
        
        <div className="ml-auto">
          <Button 
            onClick={handleRequestAccess} 
            disabled={accessRequested} 
            className="flex items-center"
          >
            {accessRequested ? (
              <>Processing...</>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Request Full Access
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 bg-secondary/30">
          <TabsTrigger value="overview" className="font-display">Overview</TabsTrigger>
          <TabsTrigger value="observations" className="font-display">Observations</TabsTrigger>
          <TabsTrigger value="files" className="font-display">Files</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="bg-card/30 backdrop-blur-sm p-4 rounded-md border border-border">
            <h3 className="text-lg font-semibold mb-2">Target Profile</h3>
            <p className="text-muted-foreground">{target.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{target.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span>{target.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span>{target.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{target.location}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Tracking Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tracking ID:</span>
                    <span>{target.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Level:</span>
                    <span>{target.securityLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Files Count:</span>
                    <span>{target.infoCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{target.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {target.members && target.members.length > 0 && (
            <div className="bg-card/30 backdrop-blur-sm p-4 rounded-md border border-border">
              <h3 className="text-lg font-semibold mb-2">Known Associates</h3>
              <div className="space-y-3">
                {target.members.map((member: string, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-secondary/50 rounded-full flex items-center justify-center mr-3">
                        <User className="h-4 w-4" />
                      </div>
                      <span>{member}</span>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-red-500/10 p-4 rounded-md border border-red-500/20">
            <div className="flex items-start">
              <AlertTriangle className="text-red-500 mr-2 mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-red-500">Security Notice</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  This target is classified with security level {target.securityLevel}. Remember that unauthorized sharing of this information is a violation of guild protocol.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="observations" className="space-y-4 mt-4">
          <div className="bg-card/30 backdrop-blur-sm p-4 rounded-md border border-border">
            <h3 className="text-lg font-semibold mb-4">Field Observations</h3>
            
            {target.observations.map((observation: string, index: number) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <Eye className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">{observation}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Observed by field agent • {index === 0 ? '2 days ago' : index === 1 ? '1 week ago' : '2 weeks ago'}
                    </p>
                  </div>
                </div>
                
                {index < target.observations.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm p-4 rounded-md border border-border">
            <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
            <p className="text-sm text-muted-foreground">
              {target.type === 'Organization' && (
                <>
                  This organization continues to demonstrate patterns consistent with our initial assessment. Operatives have noted increased activity in recent weeks, which may indicate preparation for a significant action or event.
                </>
              )}
              {target.type === 'Location' && (
                <>
                  Satellite monitoring shows unusual energy signatures around this location. Ground reconnaissance is limited due to heavy security, but our sources indicate significant subterranean structures not visible from the surface.
                </>
              )}
              {target.type === 'Religious Group' && (
                <>
                  While publicly benevolent, inner circle communications suggest deeper motivations. We&apos;ve successfully placed an agent in their mid-tier hierarchy, but full infiltration of leadership remains challenging.
                </>
              )}
              {target.type === 'Objects' && (
                <>
                  These artifacts display properties beyond normal parameters. Tracking is difficult as they frequently change possession, often through clandestine exchanges. We&apos;re developing enhanced tracking methods.
                </>
              )}
              {target.type === 'Person' && (
                <>
                  Subject demonstrates awareness of surveillance attempts. Multiple tracking methods have been attempted with limited success. Behavioral patterns suggest precognitive abilities or access to advanced intelligence systems.
                </>
              )}
              {target.type === 'Phenomenon' && (
                <>
                  These events defy conventional analysis. We&apos;ve established monitoring stations at frequent occurrence sites, but predictive models remain unreliable. Analysis shows increasing correlation with divine energy fluctuations.
                </>
              )}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="files" className="space-y-4 mt-4">
          <div className="bg-card/30 backdrop-blur-sm p-4 rounded-md border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Intelligence Files</h3>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
            
            <div className="space-y-3">
              {[...Array(target.infoCount > 5 ? 5 : target.infoCount)].map((_, index) => (
                <div 
                  key={index} 
                  className="p-3 border border-border bg-background/40 rounded-md flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {target.type === 'Organization' && (
                          ['Organizational Structure', 'Key Members', 'Financial Transactions', 'Meeting Locations', 'Alliance Networks'][index]
                        )}
                        {target.type === 'Location' && (
                          ['Site Map', 'Security Analysis', 'Energy Readings', 'Personnel Roster', 'Access Points'][index]
                        )}
                        {target.type === 'Religious Group' && (
                          ['Belief System', 'Ritual Documentation', 'Recruitment Patterns', 'Leadership Profiles', 'Resource Allocation'][index]
                        )}
                        {target.type === 'Objects' && (
                          ['Properties Analysis', 'Ownership History', 'Power Measurements', 'Interaction Effects', 'Recovery Options'][index]
                        )}
                        {target.type === 'Person' && (
                          ['Behavioral Profile', 'Known Associates', 'Movement Patterns', 'Ability Assessment'][index]
                        )}
                        {target.type === 'Phenomenon' && (
                          ['Event Recordings', 'Pattern Analysis', 'Affected Subjects', 'Frequency Mapping', 'Causality Study'][index]
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Updated {index === 0 ? '2 days ago' : index === 1 ? '1 week ago' : index === 2 ? '2 weeks ago' : '1 month ago'} • {Math.floor(Math.random() * 1000) + 200}KB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {index === 0 ? (
                      <Button size="sm">View</Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Lock className="h-3 w-3 mr-1" />
                        Request
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {target.infoCount > 5 && (
                <div className="text-center">
                  <Button variant="link" className="text-primary">
                    View All {target.infoCount} Files
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-amber-500/10 p-4 rounded-md border border-amber-500/20">
            <div className="flex items-start">
              <AlertTriangle className="text-amber-500 mr-2 mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-amber-500">Access Restriction</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {target.infoCount - 1} files are restricted and require specific clearance. Submit an access request to view all files related to this target.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}