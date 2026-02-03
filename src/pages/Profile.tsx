import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { LivingFieldBackground } from '@/components/LivingFieldBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, MapPin, Bell, Globe, Shield, Camera, 
  Mail, Phone, Save, Sparkles, Crown, CheckCircle2
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Profile() {
  const { t, language, setLanguage } = useLanguage();
  const { user, updateUser, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="h-7 w-7 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground font-medium">{t.common.loading}</p>
        </motion.div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    updateUser({
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      language,
    });
    toast({ 
      title: t.common.success,
      description: 'Your profile has been updated successfully.'
    });
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <LivingFieldBackground />
      <Navbar />
      
      <div className="pt-24 lg:pt-28 pb-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <motion.div className="mb-8" {...fadeInUp}>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t.dashboard.profile}</h1>
            <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Card */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm overflow-hidden">
                <div className="h-28 bg-primary relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-earth-green-dark" />
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ 
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', 
                      backgroundSize: '16px 16px' 
                    }} />
                  </div>
                  <motion.div 
                    className="absolute top-4 right-4 w-20 h-20 bg-harvest-gold/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
                <CardContent className="pt-0 -mt-14 text-center relative">
                  <motion.div 
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-28 h-28 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground text-4xl font-bold shadow-xl border-4 border-background">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute bottom-1 right-1 w-9 h-9 rounded-xl bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </motion.div>
                  
                  <h2 className="text-xl font-bold text-foreground mt-5">{user.name}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                  
                  <div className="mt-4 flex justify-center">
                    <Badge className="gap-1.5 bg-harvest-gold/10 text-harvest-gold border-0 px-3 py-1.5">
                      <Crown className="h-3.5 w-3.5" />
                      Free Tier
                    </Badge>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground truncate">{user.email}</span>
                    </div>
                    {formData.phone && (
                      <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{formData.phone}</span>
                      </div>
                    )}
                    {formData.location && (
                      <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{formData.location}</span>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="w-full mt-6 gap-2 rounded-xl h-11">
                    <Sparkles className="h-4 w-4 text-harvest-gold" />
                    Upgrade to Pro
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">{t.auth.name}</Label>
                        <Input 
                          id="name"
                          value={formData.name} 
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-12 rounded-xl border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">{t.auth.email}</Label>
                        <Input 
                          id="email"
                          value={formData.email} 
                          disabled 
                          className="h-12 bg-muted rounded-xl" 
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">{t.auth.phone}</Label>
                        <Input 
                          id="phone"
                          value={formData.phone} 
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 1XXXXXXXXX"
                          className="h-12 rounded-xl border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium">{t.dashboard.location}</Label>
                        <Input 
                          id="location"
                          value={formData.location} 
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="Dhaka, Bangladesh"
                          className="h-12 rounded-xl border-border/50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Language & Region */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Globe className="h-5 w-5 text-primary" />
                      {t.dashboard.languagePref}
                    </CardTitle>
                    <CardDescription>Set your preferred language for the app</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant={language === 'en' ? 'default' : 'outline'}
                        className="flex-1 h-12 gap-3 justify-start rounded-xl"
                        onClick={() => setLanguage('en')}
                      >
                        <span className="text-lg">🇺🇸</span>
                        English
                        {language === 'en' && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                      </Button>
                      <Button
                        variant={language === 'bn' ? 'default' : 'outline'}
                        className="flex-1 h-12 gap-3 justify-start font-bengali rounded-xl"
                        onClick={() => setLanguage('bn')}
                      >
                        <span className="text-lg">🇧🇩</span>
                        বাংলা
                        {language === 'bn' && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bell className="h-5 w-5 text-primary" />
                      {t.dashboard.notifications}
                    </CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { id: 'email', label: 'Email notifications', desc: 'Receive updates via email', key: 'email' as const },
                      { id: 'push', label: 'Push notifications', desc: 'Get notified in your browser', key: 'push' as const },
                      { id: 'sms', label: 'SMS notifications', desc: 'Receive text messages', key: 'sms' as const },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications[item.key]} 
                          onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="h-5 w-5 text-primary" />
                      Security
                    </CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Change Password</p>
                          <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl">Change</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button 
                  onClick={handleSave} 
                  className="w-full h-12 text-base gap-2 rounded-xl" 
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {t.dashboard.saveChanges}
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
