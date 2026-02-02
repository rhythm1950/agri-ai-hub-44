import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  User, MapPin, Bell, Globe, Shield, Camera, 
  Mail, Phone, Save, Sparkles, Crown, CheckCircle2
} from 'lucide-react';

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
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">{t.common.loading}</p>
        </div>
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
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="pt-24 lg:pt-28 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t.dashboard.profile}</h1>
            <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary via-primary/80 to-accent relative">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                  </div>
                </div>
                <CardContent className="pt-0 -mt-12 text-center relative">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-background">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-lg bg-card border shadow-md flex items-center justify-center hover:bg-muted transition-colors">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-bold text-foreground mt-4">{user.name}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                  
                  <div className="mt-4 flex justify-center">
                    <Badge className="gap-1.5 bg-primary/10 text-primary border-0 px-3 py-1">
                      <Crown className="h-3.5 w-3.5" />
                      Free Tier
                    </Badge>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{user.email}</span>
                    </div>
                    {formData.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{formData.phone}</span>
                      </div>
                    )}
                    {formData.location && (
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{formData.location}</span>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="w-full mt-6 gap-2">
                    <Sparkles className="h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="border-0 shadow-md">
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
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">{t.auth.email}</Label>
                      <Input 
                        id="email"
                        value={formData.email} 
                        disabled 
                        className="h-11 bg-muted" 
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
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">{t.dashboard.location}</Label>
                      <Input 
                        id="location"
                        value={formData.location} 
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Dhaka, Bangladesh"
                        className="h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Language & Region */}
              <Card className="border-0 shadow-md">
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
                      className="flex-1 h-12 gap-2 justify-start"
                      onClick={() => setLanguage('en')}
                    >
                      <span className="text-lg">🇺🇸</span>
                      English
                      {language === 'en' && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                    </Button>
                    <Button
                      variant={language === 'bn' ? 'default' : 'outline'}
                      className="flex-1 h-12 gap-2 justify-start font-bengali"
                      onClick={() => setLanguage('bn')}
                    >
                      <span className="text-lg">🇧🇩</span>
                      বাংলা
                      {language === 'bn' && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bell className="h-5 w-5 text-primary" />
                    {t.dashboard.notifications}
                  </CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { id: 'email', label: 'Email notifications', desc: 'Receive updates via email', key: 'email' as const },
                    { id: 'push', label: 'Push notifications', desc: 'Get notified in your browser', key: 'push' as const },
                    { id: 'sms', label: 'SMS notifications', desc: 'Receive text messages', key: 'sms' as const },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
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

              {/* Security */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    Security
                  </CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Change Password</p>
                        <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <Button 
                onClick={handleSave} 
                className="w-full h-12 text-base gap-2" 
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
