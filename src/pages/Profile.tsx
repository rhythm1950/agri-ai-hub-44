import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { User, MapPin, Bell, Globe } from 'lucide-react';

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
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">{t.common.loading}</div>;
  }

  const handleSave = () => {
    updateUser({
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      language,
    });
    toast({ title: t.common.success });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-2xl font-bold text-foreground mb-6">{t.dashboard.profile}</h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t.auth.name}</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.auth.email}</Label>
                  <Input value={formData.email} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>{t.auth.phone}</Label>
                  <Input 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1XXXXXXXXX"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t.dashboard.location}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input 
                  value={formData.location} 
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Dhaka, Bangladesh"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {t.dashboard.languagePref}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={language} onValueChange={(v: 'en' | 'bn') => setLanguage(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="bn">বাংলা</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {t.dashboard.notifications}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span>Enable notifications</span>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full">
              {t.dashboard.saveChanges}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
