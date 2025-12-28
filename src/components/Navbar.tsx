import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl text-foreground">AgriAI Hub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              {t.nav.home}
            </Link>
            {user && (
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.nav.dashboard}
              </Link>
            )}
            
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {language === 'en' ? 'EN' : 'বাং'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('bn')}>
                  বাংলা
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user.name.split(' ')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    {t.nav.profile}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t.nav.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  {t.nav.login}
                </Button>
                <Button onClick={() => navigate('/auth?tab=signup')}>
                  {t.nav.signup}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setMobileOpen(false)}>
                {t.nav.home}
              </Link>
              {user && (
                <Link to="/dashboard" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setMobileOpen(false)}>
                  {t.nav.dashboard}
                </Link>
              )}
              <div className="px-4 py-2 flex gap-2">
                <Button 
                  variant={language === 'en' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setLanguage('en')}
                >
                  EN
                </Button>
                <Button 
                  variant={language === 'bn' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setLanguage('bn')}
                >
                  বাং
                </Button>
              </div>
              {user ? (
                <>
                  <Link to="/profile" className="px-4 py-2 hover:bg-muted rounded-lg" onClick={() => setMobileOpen(false)}>
                    {t.nav.profile}
                  </Link>
                  <button className="px-4 py-2 text-left hover:bg-muted rounded-lg text-destructive" onClick={handleLogout}>
                    {t.nav.logout}
                  </button>
                </>
              ) : (
                <div className="px-4 flex gap-2">
                  <Button variant="outline" onClick={() => { navigate('/auth'); setMobileOpen(false); }}>
                    {t.nav.login}
                  </Button>
                  <Button onClick={() => { navigate('/auth?tab=signup'); setMobileOpen(false); }}>
                    {t.nav.signup}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
