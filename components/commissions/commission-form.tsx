"use client";

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { createCommission } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(100, {
    message: "Title must not exceed 100 characters."
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters."
  }),
  type: z.string({
    required_error: "Please select a commission type.",
  }),
  target: z.string().min(3, {
    message: "Target must be at least 3 characters.",
  }),
  reward: z.string().min(1, {
    message: "Please specify a reward."
  }),
  deadline: z.string().min(1, {
    message: "Please specify a deadline."
  }),
  priority: z.string({
    required_error: "Please select a priority level.",
  }),
  anonymous: z.boolean().default(false),
});

export default function CommissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user, userProfile } = useAuth();
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      target: "",
      reward: "",
      deadline: new Date().toISOString().split('T')[0],
      anonymous: false,
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Prepare the commission data
      const commissionData = {
        ...values,
        requesterName: values.anonymous ? "Anonymous" : values.contactInfo || "Anonymous",
        status: "Open",
        createdAt: new Date().toISOString()
      };
      
      // Create the commission in Firestore
      const { id, error } = await createCommission(commissionData);
      
      if (error) {
        toast.error("Commission creation failed", {
          description: error
        });
        setIsSubmitting(false);
        return;
      }
      
      setIsSuccess(true);
      
      toast.success("Commission created", {
        description: "Your commission has been submitted successfully."
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 2000);
    } catch (error: any) {
      toast.error("Commission creation failed", {
        description: error.message || "An error occurred"
      });
      setIsSubmitting(false);
    }
  }
  
  return (
    <Form {...form}>
      <motion.div 
        className={`${glitchActive ? 'commission-form-glitch' : ''}`}
        animate={{ 
          x: glitchActive ? [0, -2, 3, -1, 0] : 0,
          opacity: glitchActive ? [1, 0.8, 1] : 1 
        }}
        transition={{ duration: 0.2 }}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Commission Title
                  <motion.span 
                    className="ml-1 text-primary"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >*</motion.span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter a title for your commission" 
                    className="bg-background/30 border-primary/20 focus:border-primary transition-all duration-300 focus:bg-background/40"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  A clear, concise title that describes your request.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Description
                  <motion.span 
                    className="ml-1 text-primary"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >*</motion.span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe what information you need and why" 
                    className="min-h-[120px] bg-background/30 border-primary/20 focus:border-primary transition-all duration-300 focus:bg-background/40"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Provide detailed information about what you&apos;re looking for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Commission Type
                    <motion.span 
                      className="ml-1 text-primary"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >*</motion.span>
                  </FormLabel>
                  <Select 
                    onValueChange={(value) => form.setValue("type", value)} 
                    defaultValue={form.getValues("type")}
                  >
                    <SelectTrigger className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary mt-1">
                      <SelectValue placeholder="Select commission type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Surveillance">Surveillance</SelectItem>
                      <SelectItem value="Intelligence">Intelligence</SelectItem>
                      <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                      <SelectItem value="Asset Recovery">Asset Recovery</SelectItem>
                      <SelectItem value="Information">Information</SelectItem>
                    </SelectContent>
                  </Select>
                  {formState.errors.type && (
                    <p className="text-xs text-red-500 mt-1">{formState.errors.type.message}</p>
                  )}
                </FormItem>
              )}
            />
            
            <div className="relative">
              <Label htmlFor="contactInfo" className="text-sm font-medium">
                Contact Information (Optional)
              </Label>
              <Input
                id="contactInfo"
                type="email"
                placeholder="Your email (only visible to Guild 00:00)"
                className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary mt-1"
                {...form.register("contactInfo")}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="reward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Reward
                    <motion.span 
                      className="ml-1 text-primary"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >*</motion.span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. 5000 gold" 
                      className="bg-background/30 border-primary/20 focus:border-primary transition-all duration-300 focus:bg-background/40"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Deadline
                    <motion.span 
                      className="ml-1 text-primary"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >*</motion.span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      className="bg-background/30 border-primary/20 focus:border-primary transition-all duration-300 focus:bg-background/40"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Priority Level
                  <motion.span 
                    className="ml-1 text-primary"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >*</motion.span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/30 border-primary/20 focus:border-primary transition-all duration-300 focus:bg-background/40">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-background/95 backdrop-blur-md border-primary/20">
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Higher priority commissions may cost more.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="anonymous"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border border-primary/20 p-4 bg-primary/5">
                <FormControl>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                  </motion.div>
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Submit anonymously</FormLabel>
                  <FormDescription>
                    Your identity will be hidden from other guild members.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full font-display tracking-wide relative overflow-hidden group"
              disabled={isSubmitting || !user}
            >
              <span className="relative z-10">
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center text-green-400"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Commission Created Successfully
                  </motion.div>
                ) : (
                  "Submit Commission"
                )}
              </span>
              <span className="absolute inset-0 bg-primary/30 group-hover:bg-primary/50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
            </Button>
          </DialogFooter>
        </form>
      </motion.div>
    </Form>
  );
}