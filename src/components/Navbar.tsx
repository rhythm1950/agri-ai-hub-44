import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe, User, LogOut, Menu, X, Leaf, LayoutDashboard, Settings, WifiOff, Wifi, Brain, FlaskConical, Database, BarChart3, HelpCircle, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;
  const isHome = location.pathname === '/';

  const navItems = [
    { label: t.nav.home, to: '/' },
    ...(user ? [{ label: t.nav.dashboard, to: '/dashboard' }] : []),
    ...(isHome ? [
      { label: 'Features', to: '#features', isAnchor: true },
      { label: 'Pricing', to: '#pricing', isAnchor: true },
      { label: 'FAQ', to: '#faq', isAnchor: true },
    ] : []),
  ];

  const handleNavClick = (item: { to: string; isAnchor?: boolean }) => {
    if (item.isAnchor) {
      const el = document.querySelector(item.to);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(item.to);
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Offline Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div 
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-destructive text-destructive-foreground py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2"
          >
            <WifiOff className="h-4 w-4" />
            You're offline. Some features may be limited.
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm' 
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground leading-tight tracking-tight">AgriAI Hub</span>
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase hidden sm:block">Intelligent Farming</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleNavClick(item)}
                  className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    !item.isAnchor && isActive(item.to)
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mx-2 h-5 w-px bg-border" />
              
              <Badge 
                variant="outline" 
                className={`gap-1.5 px-2.5 py-0.5 text-xs font-medium border-0 ${
                  isOnline 
                    ? 'bg-tech-teal/10 text-tech-teal' 
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
              
              <div className="mx-2 h-5 w-px bg-border" />
              
              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 h-9 px-3 text-muted-foreground hover:text-foreground">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium text-xs">{language === 'en' ? 'EN' : 'বাং'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-card/95 backdrop-blur-xl border-border/50">
                  <DropdownMenuItem 
                    onClick={() => setLanguage('en')}
                    className={language === 'en' ? 'bg-primary/10 text-primary' : ''}
                  >
                    <span className="mr-2">🇺🇸</span> English
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage('bn')}
                    className={language === 'bn' ? 'bg-primary/10 text-primary' : ''}
                  >
                    <span className="mr-2">🇧🇩</span> বাংলা
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Auth Buttons */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 h-9 ml-1">
                      <div className="w-7 h-7 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-sm hidden xl:inline">{user.name.split(' ')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border/50">
                    <div className="px-3 py-3 border-b border-border">
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="py-2.5">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      {t.nav.dashboard}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="py-2.5">
                      <Settings className="h-4 w-4 mr-2" />
                      {t.nav.profile}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive py-2.5">
                      <LogOut className="h-4 w-4 mr-2" />
                      {t.nav.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2 ml-1">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/auth')} 
                    className="h-9 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {t.nav.login}
                  </Button>
                  <Button 
                    onClick={() => navigate('/auth?tab=signup')} 
                    className="h-9 rounded-xl px-5 text-sm bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                  >
                    {t.nav.signup}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-xl overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.to}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      !item.isAnchor && isActive(item.to)
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Language Toggle Mobile */}
                <div className="py-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Language</p>
                  <div className="flex gap-2">
                    <Button 
                      variant={language === 'en' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setLanguage('en')}
                      className="flex-1 h-11"
                    >
                      🇺🇸 English
                    </Button>
                    <Button 
                      variant={language === 'bn' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setLanguage('bn')}
                      className="flex-1 h-11 font-bengali"
                    >
                      🇧🇩 বাংলা
                    </Button>
                  </div>
                </div>
                
                {/* Auth Mobile */}
                <div className="pt-4 border-t border-border">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => { navigate('/profile'); setMobileOpen(false); }}
                        className="block w-full text-left px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium"
                      >
                        {t.nav.profile}
                      </button>
                      <button 
                        className="w-full text-left px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2 font-medium"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4" />
                        {t.nav.logout}
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1 h-12 rounded-xl"
                        onClick={() => { navigate('/auth'); setMobileOpen(false); }}
                      >
                        {t.nav.login}
                      </Button>
                      <Button 
                        className="flex-1 h-12 rounded-xl"
                        onClick={() => { navigate('/auth?tab=signup'); setMobileOpen(false); }}
                      >
                        {t.nav.signup}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
