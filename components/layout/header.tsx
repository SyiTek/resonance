"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Menu, X, Database, Target, FileText, Users, Lock, LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, userProfile, isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  // Check if user is on login or request-commission page
  const isAuthPage = pathname === '/login' || pathname === '/request-commission';
  
  // Check if user is on a protected page that requires login
  const isProtectedPage = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/commissions') || 
                          pathname.startsWith('/targets') ||
                          pathname.startsWith('/hub');
  
  // Main navigation links
  const navLinks = [
    { name: 'Home', path: '/', icon: <Clock size={16} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Database size={16} /> },
    { name: 'Commissions', path: '/commissions', icon: <Target size={16} /> },
    { name: 'Targets', path: '/targets', icon: <FileText size={16} /> },
    { name: 'Members', path: '/members', icon: <Users size={16} /> },
  ];
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Clock className="h-6 w-6 text-primary" />
              <motion.div 
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4,
                }}
                className="absolute -inset-0.5 bg-primary rounded-full blur-sm opacity-30"
              />
            </motion.div>
            <span className="font-display text-lg tracking-wider">00:00</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {!isAuthPage && navLinks.map((link) => {
              // Don't show protected links if not authenticated
              if (link.path !== '/' && !isAuthenticated && link.path !== '/login' && link.path !== '/request-commission') return null;
              
              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors 
                    ${isActive(link.path) 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <div className="flex items-center space-x-1">
                    {link.icon}
                    <span>{link.name}</span>
                  </div>
                  
                  {isActive(link.path) && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Auth buttons or user menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                {!isAuthPage && (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" size="sm">Login</Button>
                    </Link>
                    <Link href="/request-commission">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 font-display tracking-wide">Request Commission</Button>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative group">
                    <Avatar className="h-8 w-8 transition-all duration-300 group-hover:ring-2 group-hover:ring-primary/50">
                      <AvatarImage src={userProfile?.avatar} />
                      <AvatarFallback className="bg-primary/10">
                        {userProfile?.username?.charAt(0).toUpperCase() || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <motion.div
                      className="absolute -inset-1 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userProfile?.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userProfile?.role}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-card/95 backdrop-blur-lg border-t border-border"
      >
        <div className="px-4 py-3 space-y-3">
          {!isAuthPage && navLinks.map((link) => {
            // Don't show protected links if not authenticated
            if (link.path !== '/' && !isAuthenticated && link.path !== '/login' && link.path !== '/request-commission') return null;
            
            return (
              <Link 
                key={link.path} 
                href={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm 
                  ${isActive(link.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-muted'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
          
          {!isAuthenticated && !isAuthPage && (
            <div className="pt-2 flex flex-col space-y-2">
              <Link href="/login">
                <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Button>
              </Link>
              <Link href="/request-commission">
                <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Request Commission
                </Button>
              </Link>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="pt-2 flex flex-col space-y-2">
              <Link href="/profile">
                <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" className="w-full" onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}>
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;