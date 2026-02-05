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
import { Globe, User, LogOut, Menu, X, Leaf, LayoutDashboard, Settings, WifiOff, Wifi } from 'lucide-react';
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
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
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${!isOnline ? 'top-[84px]' : 'top-[44px]'} ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <motion.div 
                  className="absolute -inset-1 rounded-2xl bg-harvest-gold/20 blur-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-foreground leading-tight tracking-tight">AgriAI Hub</span>
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase hidden sm:block">Intelligent Farming</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/" active={isActive('/')}>
                {t.nav.home}
              </NavLink>
              {user && (
                <NavLink to="/dashboard" active={isActive('/dashboard')}>
                  {t.nav.dashboard}
                </NavLink>
              )}
              
              {/* Online Status */}
              <div className="mx-3 h-6 w-px bg-border" />
              <Badge 
                variant="outline" 
                className={`gap-1.5 px-3 py-1 text-xs font-medium border-0 ${
                  isOnline 
                    ? 'bg-tech-teal/10 text-tech-teal' 
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
              
              <div className="mx-3 h-6 w-px bg-border" />
              
              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 h-10 px-3 text-muted-foreground hover:text-foreground">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">{language === 'en' ? 'EN' : 'বাং'}</span>
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
                    <Button variant="ghost" size="sm" className="gap-2 h-10 ml-2">
                      <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium hidden xl:inline">{user.name.split(' ')[0]}</span>
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
                <div className="flex gap-2 ml-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/auth')} 
                    className="h-10 text-muted-foreground hover:text-foreground"
                  >
                    {t.nav.login}
                  </Button>
                  <Button 
                    onClick={() => navigate('/auth?tab=signup')} 
                    className="h-10 rounded-xl px-6 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
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
              <div className="container mx-auto px-4 py-6 space-y-3">
                <MobileNavLink to="/" active={isActive('/')} onClick={() => setMobileOpen(false)}>
                  {t.nav.home}
                </MobileNavLink>
                {user && (
                  <MobileNavLink to="/dashboard" active={isActive('/dashboard')} onClick={() => setMobileOpen(false)}>
                    {t.nav.dashboard}
                  </MobileNavLink>
                )}
                
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
                      <MobileNavLink to="/profile" onClick={() => setMobileOpen(false)}>
                        {t.nav.profile}
                      </MobileNavLink>
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

function NavLink({ to, active, children }: { to: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        active 
          ? 'text-primary' 
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
      {active && (
        <motion.div 
          layoutId="activeNav"
          className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({ to, active, onClick, children }: { to: string; active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-xl font-medium transition-all ${
        active 
          ? 'bg-primary/10 text-primary' 
          : 'text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </Link>
  );
}
