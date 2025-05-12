"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import RequestCommissionAnimation from '@/components/commissions/request-commission-animation';
import { createCommission } from '@/lib/firebase';

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
  contactInfo: z.string().email({
    message: "Please provide a valid email for contact.",
  }).optional(),
  anonymous: z.boolean().default(true),
});

export default function RequestCommissionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [glitchEffectActive, setGlitchEffectActive] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 800);
    
    // Trigger glitch effect randomly
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffectActive(true);
        setTimeout(() => setGlitchEffectActive(false), 500);
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
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      anonymous: true,
    },
  });
  
  const nextFormStep = () => {
    setFormStep(prev => prev + 1);
  };
  
  const prevFormStep = () => {
    setFormStep(prev => prev - 1);
  };
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Prepare the commission data
      const commissionData = {
        ...values,
        requesterName: values.anonymous ? "Anonymous" : values.contactInfo || "Anonymous",
        status: "Open",
      };
      
      // Create the commission in Firestore
      const { id, error } = await createCommission(commissionData);
      
      if (error) {
        toast.error("Commission request failed", {
          description: error
        });
        setIsSubmitting(false);
        return;
      }
      
      setIsSuccess(true);
      
      toast.success("Commission submitted", {
        description: "Your commission request has been submitted successfully. Guild 00:00 will process your request."
      });
      
      // Reset form after 3 seconds and redirect to home
      setTimeout(() => {
        form.reset();
        router.push('/');
      }, 3000);
    } catch (error: any) {
      toast.error("Commission request failed", {
        description: error.message || "An error occurred"
      });
      setIsSubmitting(false);
    }
  }
  
  const { formState } = form;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Digital noise overlay */}
      <div className="digital-noise"></div>
      
      {/* Animated background */}
      <RequestCommissionAnimation />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 relative"
      >
        <motion.div
          animate={{
            x: glitchEffectActive ? [0, -5, 5, -2, 0] : 0,
            opacity: glitchEffectActive ? [1, 0.8, 1] : 1,
          }}
          transition={{ duration: 0.2 }}
          className={`${glitchEffectActive ? 'after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-primary/20 after:mix-blend-exclusion after:z-10' : ''}`}
        >
          <Card className="border-primary/20 bg-black/40 backdrop-blur-md overflow-hidden">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 relative">
                    <span className="font-display text-xl text-primary">00:00</span>
                    <div className="absolute -inset-1 rounded-full bg-primary/20 animate-pulse-slow blur-md opacity-70"></div>
                  </div>
                </motion.div>
              </div>
              <CardTitle className="text-2xl font-display text-center">Request Commission</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Submit your intelligence request to Guild 00:00
              </CardDescription>
              
              {/* Progress indicator */}
              <div className="w-full mt-4 h-1 bg-background/30 rounded overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(formStep / 2) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {formStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Commission Title <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="title"
                        placeholder="Enter a title for your commission"
                        className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary mt-1"
                        {...form.register("title")}
                      />
                      {formState.errors.title && (
                        <p className="text-xs text-red-500 mt-1">{formState.errors.title.message}</p>
                      )}
                    </div>
                    
                    <div className="relative">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description <span className="text-primary">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what information you need in detail..."
                        className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary mt-1 min-h-[120px]"
                        {...form.register("description")}
                      />
                      {formState.errors.description && (
                        <p className="text-xs text-red-500 mt-1">{formState.errors.description.message}</p>
                      )}
                    </div>
                    
                    <div className="relative">
                      <Label htmlFor="target" className="text-sm font-medium">
                        Target <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="target"
                        placeholder="Person, place, or item of interest"
                        className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary mt-1"
                        {...form.register("target")}
                      />
                      {formState.errors.target && (
                        <p className="text-xs text-red-500 mt-1">{formState.errors.target.message}</p>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        onClick={nextFormStep}
                        className="font-display tracking-wide"
                      >
                        Next
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                {formStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Label htmlFor="type" className="text-sm font-medium">
                        Commission Type <span className="text-primary">*</span>
                      </Label>
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
                    </div>
                    
                    <div className="relative">
                      <Label htmlFor="priority" className="text-sm font-medium">
                        Priority Level <span className="text-primary">*</span>
                      </Label>
                      <Select 
                        onValueChange={(value) => form.setValue("priority", value)} 
                        defaultValue={form.getValues("priority")}
                      >
                        <SelectTrigger className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary mt-1">
                          <SelectValue placeholder="Select priority level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Higher priority commissions may cost more.
                      </p>
                      {formState.errors.priority && (
                        <p className="text-xs text-red-500 mt-1">{formState.errors.priority.message}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Label htmlFor="reward" className="text-sm font-medium">
                          Reward <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="reward"
                          placeholder="e.g. 5000 gold"
                          className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary mt-1"
                          {...form.register("reward")}
                        />
                        {formState.errors.reward && (
                          <p className="text-xs text-red-500 mt-1">{formState.errors.reward.message}</p>
                        )}
                      </div>
                      
                      <div className="relative">
                        <Label htmlFor="deadline" className="text-sm font-medium">
                          Deadline <span className="text-primary">*</span>
                        </Label>
                        <Input
                          id="deadline"
                          type="date"
                          className="bg-background/40 border-primary/20 focus:border-primary focus:ring-primary mt-1"
                          {...form.register("deadline")}
                        />
                        {formState.errors.deadline && (
                          <p className="text-xs text-red-500 mt-1">{formState.errors.deadline.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevFormStep}
                        className="font-display tracking-wide"
                      >
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextFormStep}
                        className="font-display tracking-wide"
                      >
                        Next
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                {formStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
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
                      <p className="text-xs text-muted-foreground mt-1">
                        Only shared with Guild 00:00 members. Will not be displayed publicly.
                      </p>
                      {formState.errors.contactInfo && (
                        <p className="text-xs text-red-500 mt-1">{formState.errors.contactInfo.message}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3 space-y-0 rounded-md border border-primary/20 p-4 mt-4">
                      <input
                        type="checkbox"
                        checked={form.watch("anonymous")}
                        onChange={e => form.setValue("anonymous", e.target.checked)}
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <div className="space-y-1 leading-none">
                        <p className="text-sm font-medium">Submit anonymously</p>
                        <p className="text-xs text-muted-foreground">
                          Your identity will be hidden from the public. Only Guild 00:00 will know who submitted this commission.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-primary/10 rounded-md p-4 border border-primary/20">
                      <p className="text-xs text-muted-foreground">
                        By submitting this commission, you agree to the Guild 00:00 terms of service. 
                        All information gathered will be handled with the utmost discretion.
                        Payment will be required upon completion of the commission.
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevFormStep}
                        className="font-display tracking-wide"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="font-display tracking-wide relative overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        <span className="relative z-10">
                          {isSubmitting ? "Processing..." : isSuccess ? "Submitted!" : "Submit Commission"}
                        </span>
                        <span className="absolute inset-0 bg-primary/30 group-hover:bg-primary/50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 pt-0">
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full text-center p-3 bg-green-500/10 rounded border border-green-500/20 text-sm text-green-400"
                >
                  <span className="font-display">Commission Submitted Successfully</span>
                  <p className="text-xs mt-1 text-muted-foreground">Guild 00:00 will handle your request with discretion</p>
                </motion.div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}