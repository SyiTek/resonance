"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import LoginAnimation from '@/components/auth/login-animation';
import ClientOnly from '@/utils/client-only';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { user, isLoading: authLoading, login } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (user && !authLoading) {
      router.push('/hub');
    }
  }, [user, authLoading, router]);
  
  // This effect handles the redirect after successful login
  useEffect(() => {
    if (loginSuccess) {
      const redirectTimer = setTimeout(() => {
        router.push('/hub');
      }, 1500);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [loginSuccess, router]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // First try using the auth context's login method
      await login(values.email, values.password);
      setLoginSuccess(true);
    } catch (error) {
      // If the auth context login fails, fall back to the hardcoded check
      if (values.email === "test@resonance.com" && values.password === "test123") {
        setLoginSuccess(true);
        toast.success("Login successful", {
          description: "Redirecting you to the hub..."
        });
      } else {
        toast.error("Access Denied", {
          description: "Invalid credentials. Please try again."
        });
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Digital noise overlay */}
      <div className="digital-noise"></div>
      
      {/* Animated background */}
      <ClientOnly>
        <LoginAnimation />
      </ClientOnly>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-primary/20 bg-black/40 backdrop-blur-md relative">
          {/* Animated border effect */}
          <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-lg opacity-50" style={{ 
            maskImage: 'linear-gradient(to right, transparent, black, transparent)',
            animation: 'borderFlow 3s linear infinite',
            pointerEvents: 'none'
          }} />
          
          <CardHeader className="space-y-1 relative z-10">
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  ease: "easeOut"
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 relative">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 rounded-full bg-primary/20 blur-md"
                  />
                  <span className="font-display text-2xl text-primary relative">
                    00:00
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -inset-2 rounded-full bg-primary/30 blur-sm"
                    />
                  </span>
                </div>
              </motion.div>
            </div>
            <CardTitle className="text-3xl font-display text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient">
              Guild Access
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your credentials to access restricted information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary transition-all duration-300 focus:bg-primary/5"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary transition-all duration-300 focus:bg-primary/5"
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full font-display tracking-wide relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <span className="relative z-10">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1, repeat: Infinity }
                          }}
                          className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                        />
                        <span className="ml-2">
                          {loginSuccess ? "Authenticated..." : "Authenticating..."}
                        </span>
                      </div>
                    ) : (
                      <span className="tracking-wider">LOGIN</span>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30"
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 relative z-10">
            <div className="text-center text-sm text-muted-foreground">
              <span>Don&apos;t have an account? </span>
              <Link 
                href="/request-commission"
                className="text-primary hover:text-accent transition-colors duration-300 relative group"
              >
                <span className="relative z-10">
                Request Commission
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </div>
            
            {loginSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full text-center p-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg border border-primary/20 text-sm relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"
                  initial={{ x: "100%" }}
                  animate={{ x: "-100%" }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative z-10 font-display tracking-wider">
                  Login Successful. Redirecting to Hub...
                </span>
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2), transparent 70%)'
                  }}
                />
              </motion.div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}