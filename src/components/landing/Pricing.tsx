import React from 'react';
import { motion, type Easing } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const easeOut: Easing = [0.0, 0.0, 0.2, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: delay * 0.1, ease: easeOut },
  }),
};

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for individual farmers getting started',
    price: 'Free',
    period: 'forever',
    features: [
      'Up to 5 hectares',
      'Basic yield predictions',
      'Weather alerts',
      'AI chat (10 queries/day)',
      'Mobile app access',
      'Community support',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For serious farmers who want maximum yields',
    price: '৳999',
    originalPrice: '৳1,999',
    period: '/month',
    features: [
      'Unlimited hectares',
      'Advanced AI predictions',
      'Real-time satellite imagery',
      'Unlimited AI chat',
      'Soil analysis reports',
      'Priority support',
      'Custom alerts',
      'Export data & reports',
    ],
    cta: 'Start 14-Day Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For agribusinesses and cooperatives',
    price: 'Custom',
    period: 'pricing',
    features: [
      'Everything in Pro',
      'Multi-farm management',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'On-site training',
      'SLA guarantee',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-16 lg:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-harvest-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={0}
        >
          <Badge className="mb-6 bg-harvest-gold/10 text-harvest-gold border-harvest-gold/20 rounded-full px-4 py-1.5">
            <Sparkles className="h-3 w-3 mr-1.5" />
            Limited Time: 50% Off Pro Plan
          </Badge>
          <h2 className="text-foreground mb-6">
            Simple, transparent <span className="text-gradient-gold">pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start for free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              custom={index + 1}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
                  <Badge className="bg-harvest-gold text-primary-foreground border-0 px-4 py-1 shadow-lg">
                    <Star className="h-3 w-3 mr-1.5 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-primary shadow-xl bg-card' 
                  : 'border-border/50 bg-card/80 hover:border-border hover:shadow-lg'
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-harvest-gold to-tech-teal" />
                )}
                
                <CardHeader className="pb-0 pt-8">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{plan.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
                    )}
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <Check className={`h-3 w-3 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full rounded-xl h-12 group ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                    onClick={() => navigate('/auth?tab=signup')}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          custom={4}
        >
          🛡️ 30-day money-back guarantee • No credit card required for free tier
        </motion.p>
      </div>
    </section>
  );
}
