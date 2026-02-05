import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { TopBar } from '@/components/TopBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Leaf, ArrowLeft, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Auth() {
  const { t } = useLanguage();
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(loginData.email, loginData.password);
    
    if (success) {
      toast({ title: t.common.success, description: 'Welcome back!' });
      navigate('/dashboard');
    } else {
      const signupSuccess = await signup({ 
        email: loginData.email, 
        password: loginData.password, 
        name: loginData.email.split('@')[0] 
      });
      if (signupSuccess) {
        toast({ title: t.common.success, description: 'Account created and logged in!' });
        navigate('/dashboard');
      } else {
        toast({ title: t.common.error, variant: 'destructive' });
      }
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    
    setIsLoading(true);
    const success = await signup({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
    });
    
    if (success) {
      toast({ title: t.common.success });
      navigate('/dashboard');
    } else {
      toast({ title: 'Email already exists', variant: 'destructive' });
    }
    setIsLoading(false);
  };

  const features = [
    'AI-powered yield predictions with 95% accuracy',
    'Works offline in remote areas',
    'Bilingual support — English & বাংলা',
    'Real-time weather & soil analytics',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="flex-1 flex">
      {/* Left Panel - Premium Branding */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80)',
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-earth-green-dark/95" />
        
        {/* Ambient Elements */}
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-harvest-gold/20 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-48 h-48 bg-tech-teal/20 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </div>
          
          <div>
            <motion.div 
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                <Leaf className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AgriAI Hub</h1>
                <p className="text-white/60 text-sm tracking-wide">Intelligent Farming Platform</p>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Transform your <br />
              <span className="text-gradient-gold">farming journey</span>
            </motion.h2>
            
            <motion.p 
              className="text-white/70 text-lg mb-12 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Join thousands of farmers using AI to increase crop yields and make smarter agricultural decisions.
            </motion.p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-4 text-white/90"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-harvest-gold/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-harvest-gold" />
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/40 text-sm">
              © 2024 AgriAI Hub. Empowering farmers worldwide.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          {/* Mobile Back Link */}
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            {t.nav.home}
          </Link>
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AgriAI Hub</h1>
              <p className="text-xs text-muted-foreground">Intelligent Farming</p>
            </div>
          </div>
          
          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-harvest-gold/10 text-harvest-gold text-sm font-medium mb-5"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="h-4 w-4" />
                  Free tier available
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome</h2>
                <p className="text-muted-foreground">Sign in to your account or create a new one</p>
              </div>
              
              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 h-12 p-1 bg-muted rounded-xl">
                  <TabsTrigger value="login" className="h-full text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">{t.nav.login}</TabsTrigger>
                  <TabsTrigger value="signup" className="h-full text-sm font-medium rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">{t.nav.signup}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-0">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-medium">{t.auth.email}</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="pl-12 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium">{t.auth.password}</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="pl-12 pr-12 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                          required
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <button type="button" className="text-sm text-primary hover:underline font-medium">
                        Forgot password?
                      </button>
                    </div>
                    <Button type="submit" className="w-full h-12 text-base font-medium rounded-xl" disabled={isLoading}>
                      {isLoading ? t.common.loading : t.auth.loginButton}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="mt-0">
                  <form onSubmit={handleSignup} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-medium">{t.auth.name}</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          placeholder="Your Name"
                          value={signupData.name}
                          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                          className="pl-12 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">{t.auth.email}</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          className="pl-12 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">{t.auth.password}</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          className="pl-12 pr-12 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                          required
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm" className="text-sm font-medium">{t.auth.confirmPassword}</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="signup-confirm"
                          type="password"
                          placeholder="••••••••"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                          className="pl-12 h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 text-base font-medium rounded-xl" disabled={isLoading}>
                      {isLoading ? t.common.loading : t.auth.signupButton}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <p className="text-center text-xs text-muted-foreground mt-8">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      </div>
      
      {/* Minimal Footer for Auth */}
      <div className="py-4 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AgriAI Hub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
