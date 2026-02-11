import React from 'react';
import { motion, type Easing } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Brain, TrendingUp, Leaf, ArrowRight } from 'lucide-react';

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: delay * 0.1, ease: easeOut },
  }),
};

const steps = [
  {
    number: '01',
    icon: Smartphone,
    title: 'Connect Your Farm',
    description: 'Sign up and input your farm details, location, crop types, and soil conditions in minutes.',
    color: 'from-primary to-tech-teal',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes weather patterns, soil data, and historical yields to generate insights.',
    color: 'from-tech-teal to-harvest-gold',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Get Predictions',
    description: 'Receive accurate yield predictions, pest alerts, and personalized recommendations.',
    color: 'from-harvest-gold to-primary',
  },
  {
    number: '04',
    icon: Leaf,
    title: 'Grow Smarter',
    description: 'Implement AI-driven strategies to maximize your harvest and reduce waste.',
    color: 'from-primary to-tech-teal',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-harvest-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={0}
        >
          <Badge className="mb-6 bg-tech-teal/10 text-tech-teal border-tech-teal/20 rounded-full px-4 py-1.5">
            How It Works
          </Badge>
          <h2 className="text-foreground mb-6">
            Start growing smarter in <span className="text-gradient-gold">4 simple steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our streamlined process gets you from signup to actionable insights in minutes, not weeks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-tech-teal to-harvest-gold opacity-20" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              custom={index}
            >
              <div className="text-center">
                {/* Step Number with Icon */}
                <div className="relative inline-block mb-8">
                  <motion.div 
                    className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl mx-auto`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-background border-2 border-primary flex items-center justify-center font-bold text-primary text-sm shadow-lg">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-base font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Arrow for non-last items on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex lg:hidden absolute -right-4 top-16 text-muted-foreground/30">
                  <ArrowRight className="h-8 w-8" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
