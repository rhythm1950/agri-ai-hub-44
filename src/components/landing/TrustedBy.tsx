import React from 'react';
import { motion, type Easing } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Building2, GraduationCap, Landmark, Globe } from 'lucide-react';

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: delay * 0.1, ease: easeOut },
  }),
};

const partners = [
  { name: 'Ministry of Agriculture', type: 'Government', icon: Landmark },
  { name: 'BRAC', type: 'NGO', icon: Globe },
  { name: 'Bangladesh Agricultural University', type: 'Education', icon: GraduationCap },
  { name: 'Grameen Bank', type: 'Finance', icon: Building2 },
  { name: 'FAO Bangladesh', type: 'International', icon: Globe },
  { name: 'CGIAR', type: 'Research', icon: GraduationCap },
];

const metrics = [
  { value: '50+', label: 'Partner Organizations' },
  { value: '15', label: 'Districts Covered' },
  { value: '₹2.5B', label: 'Farmer Savings' },
  { value: '3+', label: 'Years of Impact' },
];

export function TrustedBy() {
  return (
    <section className="py-20 lg:py-28 border-y border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={0}
        >
          <Badge className="mb-6 bg-muted text-muted-foreground border-0 rounded-full px-4 py-1.5">
            Trusted Partners
          </Badge>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
            Backed by leading institutions
          </h2>
        </motion.div>

        {/* Partner Logos Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={1}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-muted/30 border border-transparent hover:border-border/50 hover:bg-muted/50 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center mb-4 group-hover:border-primary/30 group-hover:shadow-lg transition-all">
                <partner.icon className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="font-medium text-sm text-foreground text-center">{partner.name}</p>
              <p className="text-xs text-muted-foreground">{partner.type}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={2}
        >
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
