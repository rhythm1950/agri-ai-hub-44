import React, { useState } from 'react';
import { motion, AnimatePresence, type Easing } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, BarChart3, MessageSquare, CloudSun, 
  Smartphone, Shield, Bell, LineChart,
  Check, ArrowRight
} from 'lucide-react';

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: delay * 0.1, ease: easeOut },
  }),
};

const features = [
  {
    id: 'predictions',
    icon: Brain,
    title: 'AI Yield Predictions',
    subtitle: 'Predict with 95% Accuracy',
    description: 'Harness machine learning models trained on decades of agricultural data to forecast your crop yields with unprecedented precision.',
    highlights: [
      'Multi-crop yield forecasting',
      'Season-over-season comparison',
      'Risk assessment reports',
      'Exportable predictions',
    ],
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
    color: 'primary',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Smart Analytics Dashboard',
    subtitle: 'Data-Driven Decisions',
    description: 'Visualize your farm\'s performance with intuitive charts, real-time metrics, and actionable insights at a glance.',
    highlights: [
      'Real-time performance metrics',
      'Custom report generation',
      'Historical trend analysis',
      'Comparative benchmarking',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: 'tech-teal',
  },
  {
    id: 'assistant',
    icon: MessageSquare,
    title: 'AI Farming Assistant',
    subtitle: 'Your 24/7 Expert',
    description: 'Chat with our bilingual AI assistant in English or Bengali to get instant answers about pest control, fertilizers, and best practices.',
    highlights: [
      'Bilingual support (EN/BN)',
      'Pest & disease diagnosis',
      'Fertilizer recommendations',
      'Market price insights',
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    color: 'harvest-gold',
  },
  {
    id: 'weather',
    icon: CloudSun,
    title: 'Weather Intelligence',
    subtitle: 'Plan Ahead with Confidence',
    description: 'Hyperlocal weather forecasts tailored to your exact farm location, with irrigation and planting schedule recommendations.',
    highlights: [
      '10-day hyperlocal forecasts',
      'Irrigation scheduling',
      'Frost & heat alerts',
      'Planting window optimization',
    ],
    image: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800&h=600&fit=crop',
    color: 'primary',
  },
];

export function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={0}
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1.5">
            Platform Features
          </Badge>
          <h2 className="text-foreground mb-6">
            Everything you need to <span className="text-gradient-gold">transform farming</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive suite of AI-powered tools designed specifically for modern agriculture.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Feature Tabs */}
          <motion.div 
            className="lg:col-span-5 space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            custom={1}
          >
            {features.map((feature) => (
              <motion.button
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  activeFeature.id === feature.id
                    ? 'bg-card border-primary/20 shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-card/50 hover:border-border/50'
                }`}
                whileHover={{ x: activeFeature.id === feature.id ? 0 : 5 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activeFeature.id === feature.id
                      ? `bg-${feature.color}/10`
                      : 'bg-muted'
                  }`}>
                    <feature.icon className={`h-6 w-6 ${
                      activeFeature.id === feature.id
                        ? `text-${feature.color}`
                        : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 transition-colors ${
                      activeFeature.id === feature.id
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.subtitle}
                    </p>
                  </div>
                  {activeFeature.id === feature.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Feature Content */}
          <motion.div 
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            custom={2}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-3xl border border-border/50 shadow-xl overflow-hidden"
              >
                {/* Feature Image */}
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img 
                    src={activeFeature.image} 
                    alt={activeFeature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className={`bg-${activeFeature.color}/90 text-white border-0`}>
                      {activeFeature.subtitle}
                    </Badge>
                  </div>
                </div>

                {/* Feature Details */}
                <div className="p-6 lg:p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {activeFeature.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {activeFeature.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {activeFeature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-tech-teal/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-tech-teal" />
                        </div>
                        <span className="text-sm text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="rounded-xl group">
                    Explore {activeFeature.title}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
