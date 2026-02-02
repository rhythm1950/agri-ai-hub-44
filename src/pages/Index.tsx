import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Chatbot } from '@/components/Chatbot';
import { 
  Brain, Wifi, MessageSquare, BarChart3, Leaf, 
  ArrowRight, CheckCircle2, Users, MapPin, TrendingUp,
  Sprout, CloudSun, Smartphone, Shield, Zap, Globe,
  ChevronRight, Play, Star
} from 'lucide-react';

export default function Index() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: t.landing.features.yield.title,
      description: t.landing.features.yield.desc,
      color: 'from-primary to-primary/70',
      delay: '0ms',
    },
    {
      icon: Wifi,
      title: t.landing.features.offline.title,
      description: t.landing.features.offline.desc,
      color: 'from-accent to-accent/70',
      delay: '100ms',
    },
    {
      icon: MessageSquare,
      title: t.landing.features.chat.title,
      description: t.landing.features.chat.desc,
      color: 'from-[hsl(200,80%,55%)] to-[hsl(200,80%,45%)]',
      delay: '200ms',
    },
    {
      icon: BarChart3,
      title: t.landing.features.dashboard.title,
      description: t.landing.features.dashboard.desc,
      color: 'from-[hsl(45,90%,50%)] to-[hsl(45,90%,40%)]',
      delay: '300ms',
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
    },
    {
      name: 'Fatima Begum',
      role: 'Agricultural Officer',
      content: 'Finally a tool that works offline! Our field officers can now collect data even in remote villages.',
      rating: 5,
    },
    {
      name: 'করিম উদ্দিন',
      role: 'Farmer, Sylhet',
      content: 'The Bengali chatbot understands my questions perfectly. It feels like talking to an expert!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Floating Elements */}
        <div className="absolute top-40 right-20 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="absolute top-60 left-20 hidden lg:block animate-float" style={{ animationDelay: '3s' }}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary/70 shadow-lg flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-fade-up">
              🌾 {t.landing.badge}
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-up" style={{ animationDelay: '100ms' }}>
              {t.landing.hero.title.split(' ').slice(0, 2).join(' ')}
              <span className="text-gradient block sm:inline"> {t.landing.hero.title.split(' ').slice(2).join(' ')}</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up font-bengali" style={{ animationDelay: '200ms' }}>
              {t.landing.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                onClick={() => navigate(user ? '/dashboard' : '/auth?tab=signup')}
              >
                {t.landing.cta.getStarted}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-full group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {t.landing.cta.watchDemo}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-muted-foreground animate-fade-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm">Free tier available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm">Works offline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-sidebar-background to-[hsl(150,30%,15%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 mb-4">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/70 text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t.landing.features.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to transform your farming operations with the power of AI
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-up bg-card"
                style={{ animationDelay: feature.delay }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <CardContent className="p-6 relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Empowering farmers with intelligent technology
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our AI-powered platform combines cutting-edge technology with local agricultural expertise to help you make smarter farming decisions.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative bg-card rounded-3xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  {/* Mock Dashboard Preview */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Yield Prediction</p>
                        <p className="text-sm text-muted-foreground">Rice - Aman Season</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary">95% confident</Badge>
                  </div>
                  
                  <div className="h-40 bg-muted/50 rounded-xl flex items-end justify-around p-4">
                    {[65, 80, 55, 90, 75, 85].map((height, i) => (
                      <div 
                        key={i}
                        className="w-8 bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-500"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Predicted', value: '4.2 tons/ha' },
                      { label: 'Increase', value: '+35%' },
                      { label: 'ROI', value: '3.2x' },
                    ].map((item, i) => (
                      <div key={i} className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="font-semibold text-primary">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Trusted by farmers across Bangladesh
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="bg-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground font-bengali">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t.landing.cta.title}
            </h2>
            <p className="text-xl text-white/80 mb-10 font-bengali">
              {t.landing.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group bg-white text-primary hover:bg-white/90"
                onClick={() => navigate(user ? '/dashboard' : '/auth?tab=signup')}
              >
                {t.landing.cta.startFree}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-full border-white/30 text-white hover:bg-white/10"
              >
                {t.landing.cta.contact}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-sidebar-background text-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">AgriAI Hub</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Empowering farmers with AI-powered insights for better crop yields and sustainable farming.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">API</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">{t.landing.footer.about}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t.landing.footer.contact}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">{t.landing.footer.privacy}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">{t.landing.footer.terms}</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2024 AgriAI Hub. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}
