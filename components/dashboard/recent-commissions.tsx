"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, User, EyeOff, ExternalLink } from 'lucide-react';

const CommissionRow = ({ commission, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.01, x: 5 }}
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push('/commissions')}
    >
      {/* Row content remains the same */}
      
      {/* Add hover effect */}
      <motion.div
        className="absolute inset-0 bg-primary/5 rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Add glowing border effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.2), transparent)',
            filter: 'blur(4px)',
            zIndex: -1
          }}
        />
      )}
    </motion.tr>
  );
};

const recentCommissions = [
  {
    id: 'CM-2025-001',
    requester: 'Anonymous',
    target: 'Shadow Hunters Guild',
    type: 'Surveillance',
    status: 'In Progress',
    date: '2025-04-15',
    priority: 'High',
  },
  {
    id: 'CM-2025-002',
    requester: 'Kingdom Council',
    target: 'Euphemia Followers',
    type: 'Information',
    status: 'Completed',
    date: '2025-04-12',
    priority: 'Medium',
  },
  {
    id: 'CM-2025-003',
    requester: 'Anonymous',
    target: 'Divine Artifacts',
    type: 'Asset Recovery',
    status: 'Pending',
    date: '2025-04-10',
    priority: 'Low',
  },
  {
    id: 'CM-2025-004',
    requester: 'Resonance Moderator',
    target: '[REDACTED]',
    type: 'Intelligence',
    status: 'In Progress',
    date: '2025-04-08',
    priority: 'Critical',
  },
  {
    id: 'CM-2025-005',
    requester: 'Merchant Alliance',
    target: 'Market Trends',
    type: 'Data Analysis',
    status: 'Completed',
    date: '2025-04-05',
    priority: 'Medium',
  },
];

const RecentCommissions = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
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
      case 'completed':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'in progress':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      case 'pending':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/50';
      default:
        return 'bg-primary/20 text-primary border-primary/50';
    }
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
          <Clock className="mr-2 h-4 w-4 text-primary" />
          <h2 className="text-lg font-display">Recent Commissions</h2>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          View All <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
      
      <div className="rounded-lg overflow-hidden border border-border bg-card/30 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCommissions.map((commission, index) => (
              <TableRow key={commission.id} className="hover:bg-secondary/10">
                <TableCell className="font-mono text-xs">{commission.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {commission.requester === 'Anonymous' ? (
                      <EyeOff className="mr-2 h-3 w-3 text-muted-foreground" />
                    ) : (
                      <User className="mr-2 h-3 w-3 text-muted-foreground" />
                    )}
                    {commission.requester}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{commission.target}</TableCell>
                <TableCell>{commission.type}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(commission.status)}`}>
                    {commission.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getPriorityColor(commission.priority)}`}>
                    {commission.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default RecentCommissions;