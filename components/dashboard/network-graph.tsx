"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NetworkGraph = () => {
  const graphRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeDetails, setNodeDetails] = useState({
    connections: [],
    lastActivity: '',
    securityLevel: '',
    status: ''
  });
  
  const graphData = {
    nodes: [
      { 
        id: "center", 
        name: "Guild 00:00", 
        group: 0, 
        size: 18,
        details: {
          role: "Central Hub",
          securityLevel: "S+",
          status: "Active",
          lastActivity: "Now",
          description: "Core intelligence gathering and analysis center",
          connections: [
            { type: "Agents", count: 12 },
            { type: "Active Operations", count: 8 },
            { type: "Allied Guilds", count: 4 }
          ],
          capabilities: [
            "Advanced Data Analysis",
            "Real-time Surveillance",
            "Memory Web Integration"
          ]
        }
      },
      
      // Guilds
      { 
        id: "g1", 
        name: "Shadow Hunters", 
        group: 1, 
        size: 12,
        details: {
          role: "Combat Guild",
          securityLevel: "A",
          status: "Monitored",
          lastActivity: "2 hours ago",
          description: "Elite combat unit with suspected black market connections",
          operations: [
            "Artifact Recovery",
            "Territory Control",
            "Combat Training"
          ],
          assets: [
            "Hidden Training Grounds",
            "Weapon Cache Delta",
            "Underground Network"
          ],
          threat_level: "High",
          known_members: 24
        }
      },
      { 
        id: "g2", 
        name: "Euphemia Followers", 
        group: 1, 
        size: 12,
        details: {
          role: "Religious Organization",
          securityLevel: "B",
          status: "Infiltrated",
          lastActivity: "1 day ago",
          description: "Religious group dedicated to the worship of Euphemia",
          rituals: [
            "Dawn Prayer",
            "Light Blessing",
            "Divine Communion"
          ],
          artifacts: [
            "Tears of Euphemia",
            "Light Crystals",
            "Sacred Texts"
          ],
          influence_level: "Medium",
          followers: 156
        }
      },
      { id: "g3", name: "Merchant Alliance", group: 1, size: 10 },
      { id: "g4", name: "Twilight Wardens", group: 1, size: 10 },
      
      // Members
      { id: "m1", name: "Jun Minamitake", group: 2, size: 8 },
      { id: "m2", name: "Ravenna Nemesyn", group: 2, size: 8 },
      { id: "m3", name: "Agent 3", group: 2, size: 8 },
      { id: "m4", name: "Agent 4", group: 2, size: 8 },
      
      // Targets
      { id: "t1", name: "Target Alpha", group: 3, size: 6 },
      { id: "t2", name: "Target Beta", group: 3, size: 6 },
      { id: "t3", name: "Target Gamma", group: 3, size: 6 },
      { id: "t4", name: "Target Delta", group: 3, size: 6 },
      { id: "t5", name: "Target Epsilon", group: 3, size: 6 },
      
      // Artifacts
      { id: "a1", name: "Divine Relic", group: 4, size: 5 },
      { id: "a2", name: "Memory Crystal", group: 4, size: 5 },
      { id: "a3", name: "Resonance Key", group: 4, size: 5 },
    ],
    links: [
      // Guild to Members
      { source: "center", target: "m1", value: 10 },
      { source: "center", target: "m2", value: 10 },
      { source: "center", target: "m3", value: 10 },
      { source: "center", target: "m4", value: 10 },
      
      // Guild to other Guilds
      { source: "center", target: "g1", value: 5 },
      { source: "center", target: "g2", value: 5 },
      { source: "center", target: "g3", value: 5 },
      { source: "center", target: "g4", value: 5 },
      
      // Members to Targets
      { source: "m1", target: "t1", value: 3 },
      { source: "m1", target: "t2", value: 3 },
      { source: "m2", target: "t3", value: 3 },
      { source: "m2", target: "t4", value: 3 },
      { source: "m3", target: "t5", value: 3 },
      { source: "m4", target: "t1", value: 3 },
      
      // Targets to Artifacts
      { source: "t1", target: "a1", value: 2 },
      { source: "t3", target: "a2", value: 2 },
      { source: "t5", target: "a3", value: 2 },
      
      // Guild Relationships
      { source: "g1", target: "g2", value: 1 },
      { source: "g2", target: "g3", value: 1 },
      { source: "g3", target: "g4", value: 1 },
      { source: "g4", target: "g1", value: 1 },
      
      // Special Ravenna connections to represent her hive mind
      { source: "m2", target: "t1", value: 1, color: "rgba(168, 85, 247, 0.3)" },
      { source: "m2", target: "t2", value: 1, color: "rgba(168, 85, 247, 0.3)" },
      { source: "m2", target: "t5", value: 1, color: "rgba(168, 85, 247, 0.3)" },
      { source: "m2", target: "a1", value: 1, color: "rgba(168, 85, 247, 0.3)" },
      { source: "m2", target: "a2", value: 1, color: "rgba(168, 85, 247, 0.3)" },
      { source: "m2", target: "a3", value: 1, color: "rgba(168, 85, 247, 0.3)" },
    ]
  };
  
  const getNodeColor = (node: any) => {
    const colors = [
      "rgba(168, 85, 247, 1)",  // center - primary (purple)
      "rgba(20, 184, 166, 1)",  // guilds - accent (teal)
      "rgba(255, 255, 255, 0.9)", // members - white
      "rgba(250, 204, 21, 0.9)", // targets - yellow
      "rgba(248, 113, 113, 0.9)", // artifacts - red
    ];
    
    return colors[node.group];
  };
  
  const handleNodeClick = (node) => {
    setSelectedNode(node);
    // Get connected nodes
    const connections = graphData.links
      .filter(link => link.source.id === node.id || link.target.id === node.id)
      .map(link => {
        const connectedNode = link.source.id === node.id ? link.target : link.source;
        return {
          name: connectedNode.name,
          type: connectedNode.group === 1 ? 'Guild' : 
                connectedNode.group === 2 ? 'Agent' :
                connectedNode.group === 3 ? 'Target' : 'Artifact'
        };
      });
    
    setNodeDetails({
      connections,
      ...node.details
    });
  };

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-120);
      graphRef.current.d3Force('link').distance((link: any) => 100 / link.value);
      graphRef.current.zoom(1.5);
      
      // Note: We don't need to manually set onNodeClick here
      // The onNodeClick prop on ForceGraph2D will handle this
    }
  }, []);
  
  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-[600px] flex items-center justify-center"
      >
        <ForceGraph2D
          className="overflow-hidden"
          ref={graphRef}
          graphData={graphData}
          nodeRelSize={6}
          nodeVal={(node) => node.size}
          nodeLabel={(node) => node.name}
          nodeColor={getNodeColor}
          linkWidth={(link) => link.value * 0.3}
          linkColor={(link) => link.color || "rgba(255, 255, 255, 0.2)"}
          cooldownTime={2000}
          backgroundColor="transparent"
          linkDirectionalParticles={3}
          linkDirectionalParticleWidth={1}
          // Remove the problematic linkDirectionalParticleSpeed prop
          height={600}
          centerAt={[0, 0]}
          zoom={1.5}
          minZoom={0.5}
          maxZoom={2.5}
          onNodeHover={(node) => {
            document.body.style.cursor = node ? 'pointer' : 'default';
          }}
          // Fix: Attach the click handler as a prop, not as a method call
          onNodeClick={handleNodeClick}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 10 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.5);
            
            ctx.fillStyle = getNodeColor(node);
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, node.size as number / globalScale, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw glowing effect
            ctx.shadowColor = getNodeColor(node);
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, (node.size as number + 2) / globalScale, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.shadowBlur = 0;
            
            // Only draw labels for larger nodes or when zoomed in
            if ((node.size as number) > 7 || globalScale > 1.2) {
              ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
              ctx.fillRect(
                node.x! - bckgDimensions[0] / 2,
                node.y! + (node.size as number / globalScale) + 2,
                bckgDimensions[0],
                bckgDimensions[1]
              );
              
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = '#fff';
              ctx.fillText(
                label,
                node.x!,
                node.y! + (node.size as number / globalScale) + 2 + fontSize / 2
              );
            }
          }}
          // Custom implementation for link particles to avoid the "__progressRatio" error
          linkCanvasObject={(link, ctx, globalScale) => {
            // Only draw special effects for links if needed
            const start = link.source;
            const end = link.target;
            
            // Draw particles manually without relying on linkDirectionalParticleSpeed
            if (Math.random() > 0.9) { // Only draw particles occasionally to avoid overdrawing
              const t = (Date.now() / 1000) % 1; // Normalized time for animation
              // Calculate position along the link path
              const x = start.x + (end.x - start.x) * t;
              const y = start.y + (end.y - start.y) * t;
              
              // Draw particle
              ctx.beginPath();
              ctx.arc(x, y, 1.5 / globalScale, 0, 2 * Math.PI);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fill();
            }
          }}
        />
      </motion.div>
      
      {/* Node Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 right-0 w-80 p-4"
          >
            <Card className="bg-card/95 backdrop-blur-md border-primary/20">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display">{selectedNode.name}</h3>
                  <Badge variant="outline" className="bg-primary/10">
                    {nodeDetails.role}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security Level</span>
                    <span className="font-medium">{nodeDetails.securityLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{nodeDetails.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Activity</span>
                    <span className="font-medium">{nodeDetails.lastActivity}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {nodeDetails.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Connections</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {nodeDetails.connections.map((connection, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="bg-primary/5 justify-between"
                      >
                        <span className="truncate">{connection.name}</span>
                        <span className="ml-2 text-xs opacity-50">
                          {connection.type}
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NetworkGraph;