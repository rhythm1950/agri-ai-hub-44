import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
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
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-destructive text-destructive-foreground py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4" />
          You're offline. Some features may be limited.
        </div>
      )}
      
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${!isOnline ? 'top-10' : 'top-0'} ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-xl shadow-md border-b border-border' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-20 blur transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-foreground leading-tight">AgriAI Hub</span>
                <span className="text-xs text-muted-foreground hidden sm:block">Smart Farming Platform</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-2">
              <NavLink to="/" active={isActive('/')}>
                {t.nav.home}
              </NavLink>
              {user && (
                <NavLink to="/dashboard" active={isActive('/dashboard')}>
                  {t.nav.dashboard}
                </NavLink>
              )}
              
              {/* Online Status */}
              <div className="mx-2">
                <Badge 
                  variant="outline" 
                  className={`gap-1.5 ${isOnline ? 'border-primary/30 text-primary' : 'border-destructive/30 text-destructive'}`}
                >
                  {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                  {isOnline ? 'Online' : 'Offline'}
                </Badge>
              </div>
              
              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 h-10 px-3">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">{language === 'en' ? 'EN' : 'বাং'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium hidden xl:inline">{user.name.split(' ')[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      {t.nav.dashboard}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <Settings className="h-4 w-4 mr-2" />
                      {t.nav.profile}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      {t.nav.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2 ml-2">
                  <Button variant="ghost" onClick={() => navigate('/auth')} className="h-10">
                    {t.nav.login}
                  </Button>
                  <Button onClick={() => navigate('/auth?tab=signup')} className="h-10 rounded-full px-6">
                    {t.nav.signup}
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <MobileNavLink to="/" active={isActive('/')} onClick={() => setMobileOpen(false)}>
                {t.nav.home}
              </MobileNavLink>
              {user && (
                <MobileNavLink to="/dashboard" active={isActive('/dashboard')} onClick={() => setMobileOpen(false)}>
                  {t.nav.dashboard}
                </MobileNavLink>
              )}
              
              {/* Language Toggle Mobile */}
              <div className="py-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Language</p>
                <div className="flex gap-2">
                  <Button 
                    variant={language === 'en' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setLanguage('en')}
                    className="flex-1"
                  >
                    🇺🇸 English
                  </Button>
                  <Button 
                    variant={language === 'bn' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setLanguage('bn')}
                    className="flex-1 font-bengali"
                  >
                    🇧🇩 বাংলা
                  </Button>
                </div>
              </div>
              
              {/* Auth Mobile */}
              <div className="pt-3 border-t border-border">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <MobileNavLink to="/profile" onClick={() => setMobileOpen(false)}>
                      {t.nav.profile}
                    </MobileNavLink>
                    <button 
                      className="w-full text-left px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      {t.nav.logout}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => { navigate('/auth'); setMobileOpen(false); }}
                    >
                      {t.nav.login}
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => { navigate('/auth?tab=signup'); setMobileOpen(false); }}
                    >
                      {t.nav.signup}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function NavLink({ to, active, children }: { to: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? 'bg-primary/10 text-primary' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, active, onClick, children }: { to: string; active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
        active 
          ? 'bg-primary/10 text-primary' 
          : 'text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </Link>
  );
}
