import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { LivingFieldBackground } from '@/components/LivingFieldBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Chatbot } from '@/components/Chatbot';
import { motion } from 'framer-motion';
import { 
  Brain, Wifi, MessageSquare, BarChart3, Leaf, 
  ArrowRight, CheckCircle2, Users, MapPin, TrendingUp,
  Sprout, CloudSun, Smartphone, Shield, Zap, Globe,
  ChevronRight, Play, Star, Sparkles
} from 'lucide-react';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay * 0.1,
      ease: "easeOut" as const,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Index() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: t.landing.features.yield.title,
      description: t.landing.features.yield.desc,
      gradient: 'from-primary to-tech-teal',
    },
    {
      icon: Wifi,
      title: t.landing.features.offline.title,
      description: t.landing.features.offline.desc,
      gradient: 'from-tech-teal to-primary',
    },
    {
      icon: MessageSquare,
      title: t.landing.features.chat.title,
      description: t.landing.features.chat.desc,
      gradient: 'from-harvest-gold to-accent',
    },
    {
      icon: BarChart3,
      title: t.landing.features.dashboard.title,
      description: t.landing.features.dashboard.desc,
      gradient: 'from-primary to-harvest-gold',
    },
  ];

  const stats = [
    { value: '10,000+', label: t.landing.stats.farmers, icon: Users },
    { value: '500+', label: t.landing.stats.villages, icon: MapPin },
    { value: '95%', label: t.landing.stats.accuracy, icon: TrendingUp },
    { value: '24/7', label: t.landing.stats.support, icon: MessageSquare },
  ];

  const benefits = [
    { icon: Sprout, text: 'Increase crop yield by up to 40%' },
    { icon: CloudSun, text: 'Real-time weather integration' },
    { icon: Smartphone, text: 'Works offline in remote areas' },
    { icon: Shield, text: 'Secure data protection' },
    { icon: Zap, text: 'Instant AI-powered insights' },
    { icon: Globe, text: 'Available in English & Bengali' },
  ];

  const testimonials = [
    {
      name: 'রহিম আহমেদ',
      role: 'Farmer, Rajshahi',
      content: 'AgriAI Hub helped me increase my rice yield by 35%. The AI predictions are incredibly accurate!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Fatima Begum',
      role: 'Agricultural Officer',
      content: 'Finally a tool that works offline! Our field officers can now collect data even in remote villages.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'করিম উদ্দিন',
      role: 'Farmer, Sylhet',
      content: 'The Bengali chatbot understands my questions perfectly. It feels like talking to an expert!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LivingFieldBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-24 lg:pt-40 lg:pb-36 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-float-slow" />
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-harvest-gold/5 rounded-full blur-[100px] animate-float" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-tech-teal/3 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-8 px-5 py-2.5 text-sm font-medium bg-primary/10 text-primary border-primary/20 rounded-full">
                <Sparkles className="h-4 w-4 mr-2" />
                {t.landing.badge}
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-foreground mb-8"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUpVariant}
            >
              {t.landing.hero.title.split(' ').slice(0, 2).join(' ')}
              <span className="text-gradient-gold block mt-2">
                {t.landing.hero.title.split(' ').slice(2).join(' ')}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-bengali leading-relaxed"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUpVariant}
            >
              {t.landing.hero.subtitle}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial="hidden"
              animate="visible"
              custom={3}
              variants={fadeUpVariant}
            >
              <Button 
                size="lg" 
                className="text-lg h-14 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group bg-primary hover:bg-primary/90"
                onClick={() => navigate(user ? '/dashboard' : '/auth?tab=signup')}
              >
                {t.landing.cta.getStarted}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg h-14 px-8 rounded-2xl border-border/50 hover:bg-muted/50 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {t.landing.cta.watchDemo}
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground"
              initial="hidden"
              animate="visible"
              custom={4}
              variants={fadeUpVariant}
            >
              {['No credit card required', 'Free tier available', 'Works offline'].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-tech-teal" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-earth-green-dark" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', 
            backgroundSize: '32px 32px' 
          }} />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={fadeUpVariant}
                custom={index}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-5">
                  <stat.icon className="h-7 w-7 text-harvest-gold" />
                </div>
                <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/70 text-base font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            custom={0}
          >
            <Badge className="mb-6 bg-harvest-gold/10 text-harvest-gold border-harvest-gold/20 rounded-full px-4 py-1.5">
              Features
            </Badge>
            <h2 className="text-foreground mb-6">
              {t.landing.features.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to transform your farming operations with the power of AI
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeUpVariant} custom={index}>
                <Card className="group relative overflow-hidden border-0 shadow-card hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-card/80 backdrop-blur-sm h-full">
                  <CardContent className="p-8">
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-5 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              custom={0}
            >
              <Badge className="mb-6 bg-tech-teal/10 text-tech-teal border-tech-teal/20 rounded-full px-4 py-1.5">
                Why Choose Us
              </Badge>
              <h2 className="text-foreground mb-6">
                Empowering farmers with intelligent technology
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Our AI-powered platform combines cutting-edge technology with local agricultural expertise to help you make smarter farming decisions.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-border/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-tech-teal/10 to-harvest-gold/10 rounded-[2rem] blur-2xl" />
              <Card className="relative bg-card/90 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-harvest-gold/10 rounded-full blur-2xl" />
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Mock Dashboard Preview */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Leaf className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Yield Prediction</p>
                          <p className="text-sm text-muted-foreground">Rice - Aman Season</p>
                        </div>
                      </div>
                      <Badge className="bg-tech-teal/10 text-tech-teal border-0">95% confident</Badge>
                    </div>
                    
                    <div className="h-44 bg-gradient-to-b from-muted/30 to-muted/50 rounded-2xl flex items-end justify-around p-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,hsl(var(--primary)/0.03)_50%,transparent_100%)]" />
                      {[65, 80, 55, 90, 75, 85].map((height, i) => (
                        <motion.div 
                          key={i}
                          className="w-8 bg-gradient-to-t from-primary to-tech-teal rounded-t-lg relative"
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Predicted', value: '4.2 tons/ha' },
                        { label: 'Increase', value: '+35%' },
                        { label: 'ROI', value: '3.2x' },
                      ].map((item, i) => (
                        <div key={i} className="text-center p-4 rounded-xl bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                          <p className="font-semibold text-primary">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            custom={0}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1.5">
              Testimonials
            </Badge>
            <h2 className="text-foreground mb-6">
              Trusted by farmers across Bangladesh
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeUpVariant} custom={index}>
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-card hover:shadow-xl transition-all duration-500 h-full">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-harvest-gold text-harvest-gold" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-8 text-base leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground font-bengali">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-earth-green-dark" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', 
            backgroundSize: '32px 32px' 
          }} />
        </div>
        <motion.div 
          className="absolute top-10 right-10 w-96 h-96 bg-harvest-gold/20 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            custom={0}
          >
            <h2 className="text-white mb-6">
              {t.landing.cta.title}
            </h2>
            <p className="text-xl lg:text-2xl text-white/80 mb-12 font-bengali leading-relaxed">
              {t.landing.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="text-lg h-14 px-8 rounded-2xl bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all group"
                onClick={() => navigate(user ? '/dashboard' : '/auth?tab=signup')}
              >
                {t.landing.cta.startFree}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg h-14 px-8 rounded-2xl border-white/30 text-white hover:bg-white/10"
              >
                {t.landing.cta.contact}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-lg">AgriAI Hub</span>
                <p className="text-xs text-white/60">Intelligent Farming Platform</p>
              </div>
            </div>
            <p className="text-sm text-white/60">
              © 2024 AgriAI Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <Chatbot />
    </div>
  );
}
