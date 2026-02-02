import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockDb } from '@/lib/mockDatabase';
import { Prediction, SensorData } from '@/lib/types';
import { Chatbot } from '@/components/Chatbot';
import { 
  LayoutDashboard, Brain, Database, FlaskConical, 
  TrendingUp, Thermometer, Droplets, Sun, CloudRain,
  Leaf, Crown, ArrowUp, Sparkles, Download, RefreshCw,
  Activity, Zap, Target, Clock, AlertCircle, CheckCircle2,
  BarChart2, PieChart as PieChartIcon, Upload
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

export default function Dashboard() {
  const { t } = useLanguage();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
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
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: t.dashboard.overview, icon: LayoutDashboard },
    { id: 'predictions', label: t.dashboard.aiPredictions, icon: Brain },
    { id: 'data', label: t.dashboard.dataCenter, icon: Database },
    { id: 'soil', label: t.dashboard.soilAnalysis, icon: FlaskConical },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="pt-24 lg:pt-28 pb-8">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                {t.dashboard.welcome}, {user.name}! 
                <span className="animate-float inline-block">👋</span>
              </h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your farms today</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1.5 py-1.5">
                <Clock className="h-3.5 w-3.5" />
                Last updated: Just now
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Sync
              </Button>
            </div>
          </div>

          {/* Subscription Banner */}
          <Card className="mb-8 border-0 bg-gradient-to-r from-primary via-primary/90 to-accent text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
            </div>
            <CardContent className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">{t.dashboard.freeTier}</span>
                    <Badge className="bg-white/20 text-white border-0">Current Plan</Badge>
                  </div>
                  <span className="text-white/80 text-sm">5 predictions remaining this month • Upgrade for unlimited access</span>
                </div>
              </div>
              <Button size="sm" className="gap-2 bg-white text-primary hover:bg-white/90 shadow-lg">
                <Sparkles className="h-4 w-4" />
                {t.dashboard.upgradePro}
              </Button>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 h-auto p-1.5 bg-card border shadow-sm flex-wrap gap-1">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id} 
                  className="gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <OverviewTab userId={user.id} t={t} />
            </TabsContent>
            
            <TabsContent value="predictions" className="mt-0">
              <PredictionsTab userId={user.id} t={t} />
            </TabsContent>
            
            <TabsContent value="data" className="mt-0">
              <DataCenterTab userId={user.id} t={t} />
            </TabsContent>
            
            <TabsContent value="soil" className="mt-0">
              <SoilAnalysisTab userId={user.id} t={t} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
}

function OverviewTab({ userId, t }: { userId: string; t: any }) {
  const farms = mockDb.getFarms(userId);
  const predictions = mockDb.getPredictions(userId);
  const sensorData = mockDb.getSensorData();
  
  const stats = [
    { label: t.dashboard.totalFarms, value: farms.length || 3, icon: Leaf, trend: '+2', color: 'from-primary to-primary/70' },
    { label: t.dashboard.activePredictions, value: predictions.length || 8, icon: Brain, trend: '+5', color: 'from-accent to-accent/70' },
    { label: 'Avg. Confidence', value: '92%', icon: Target, trend: '+3%', color: 'from-[hsl(200,80%,55%)] to-[hsl(200,80%,45%)]' },
    { label: t.dashboard.lastSync, value: 'Now', icon: Activity, trend: '', color: 'from-[hsl(45,90%,50%)] to-[hsl(45,90%,40%)]' },
  ];

  const chartData = [
    { month: 'Jan', yield: 3.2, predicted: 3.5 },
    { month: 'Feb', yield: 3.8, predicted: 3.7 },
    { month: 'Mar', yield: 4.1, predicted: 4.0 },
    { month: 'Apr', yield: 3.9, predicted: 4.2 },
    { month: 'May', yield: 4.5, predicted: 4.4 },
    { month: 'Jun', yield: 4.8, predicted: 4.6 },
  ];

  const recentActivities = [
    { type: 'prediction', title: 'Rice yield prediction completed', time: '5 min ago', status: 'success' },
    { type: 'sync', title: 'Sensor data synchronized', time: '1 hour ago', status: 'success' },
    { type: 'alert', title: 'Low soil moisture detected', time: '3 hours ago', status: 'warning' },
    { type: 'prediction', title: 'Wheat prediction generated', time: '1 day ago', status: 'success' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    {stat.trend && (
                      <span className="text-xs font-medium text-primary flex items-center">
                        <ArrowUp className="h-3 w-3" />
                        {stat.trend}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  Yield Performance
                </CardTitle>
                <CardDescription>Actual vs Predicted yield over time</CardDescription>
              </div>
              <Select defaultValue="6m">
                <SelectTrigger className="w-24 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area type="monotone" dataKey="yield" stroke="hsl(var(--primary))" fill="url(#yieldGradient)" strokeWidth={2} />
                <Line type="monotone" dataKey="predicted" stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {t.dashboard.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.status === 'success' ? 'bg-primary/10' : 'bg-amber-500/10'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PredictionsTab({ userId, t }: { userId: string; t: any }) {
  const [formData, setFormData] = useState({ crop: '', soil: '', weather: '', size: '' });
  const [result, setResult] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const predictions = mockDb.getPredictions(userId);

  const handlePredict = async () => {
    if (!formData.crop || !formData.soil || !formData.weather) return;
    
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    
    const newPrediction: Prediction = {
      id: `pred_${Date.now()}`,
      farmId: 'farm_1',
      userId,
      cropType: formData.crop,
      soilType: formData.soil,
      weatherCondition: formData.weather,
      farmSize: parseFloat(formData.size) || 5,
      predictedYield: 3.5 + Math.random() * 2,
      yieldUnit: 'tons/hectare',
      confidence: 75 + Math.floor(Math.random() * 20),
      recommendations: ['Apply fertilizer at optimal time', 'Monitor soil moisture levels', 'Watch for pest activity'],
      createdAt: new Date().toISOString(),
    };
    
    mockDb.addPrediction(newPrediction);
    setResult(newPrediction);
    setIsLoading(false);
  };

  const chartData = predictions.slice(0, 6).map(p => ({
    name: p.cropType.substring(0, 4),
    yield: parseFloat(p.predictedYield.toFixed(1)),
    confidence: p.confidence,
  }));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t.dashboard.newPrediction}
          </CardTitle>
          <CardDescription>Enter your farm details to get AI-powered yield predictions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.dashboard.cropType}</Label>
              <Select onValueChange={(v) => setFormData({ ...formData, crop: v })}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.crops).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v as string}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.dashboard.soilType}</Label>
              <Select onValueChange={(v) => setFormData({ ...formData, soil: v })}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select soil" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.soils).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v as string}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.dashboard.weatherCondition}</Label>
              <Select onValueChange={(v) => setFormData({ ...formData, weather: v })}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select weather" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(t.weather).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v as string}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t.dashboard.farmSize} (ha)</Label>
              <Input 
                type="number" 
                placeholder="5" 
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="h-11"
              />
            </div>
          </div>
          
          <Button 
            onClick={handlePredict} 
            className="w-full h-12 text-base gap-2" 
            disabled={isLoading || !formData.crop || !formData.soil || !formData.weather}
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                {t.dashboard.predicting}
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                {t.dashboard.predict}
              </>
            )}
          </Button>

          {result && (
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 animate-scale-in">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                    <CheckCircle2 className="h-4 w-4" />
                    Prediction Complete
                  </div>
                  <p className="text-sm text-muted-foreground">{t.dashboard.predictedYield}</p>
                  <p className="text-4xl font-bold text-primary mt-1">{result.predictedYield.toFixed(1)}</p>
                  <p className="text-muted-foreground">{result.yieldUnit}</p>
                  <Badge className="mt-3 bg-primary/10 text-primary border-0">{t.dashboard.confidence}: {result.confidence}%</Badge>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {t.dashboard.recommendations}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {result.recommendations.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              {t.dashboard.history}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="yield" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Brain className="h-12 w-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">{t.common.noData}</p>
                <p className="text-sm text-muted-foreground/60">Make your first prediction to see data here</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Confidence Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'High (>90%)', value: 40, color: 'hsl(var(--primary))' },
                    { name: 'Medium (70-90%)', value: 45, color: 'hsl(var(--accent))' },
                    { name: 'Low (<70%)', value: 15, color: 'hsl(var(--muted))' },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[
                    { color: 'hsl(var(--primary))' },
                    { color: 'hsl(var(--accent))' },
                    { color: 'hsl(var(--muted))' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DataCenterTab({ userId, t }: { userId: string; t: any }) {
  const sensorData = mockDb.getSensorData();
  
  const avgData = {
    temperature: sensorData.reduce((a, b) => a + b.temperature, 0) / sensorData.length,
    humidity: sensorData.reduce((a, b) => a + b.humidity, 0) / sensorData.length,
    soilMoisture: sensorData.reduce((a, b) => a + b.soilMoisture, 0) / sensorData.length,
    rainfall: sensorData.reduce((a, b) => a + b.rainfall, 0) / sensorData.length,
  };

  const metrics = [
    { label: t.dashboard.temperature, value: `${avgData.temperature.toFixed(1)}°C`, icon: Thermometer, color: 'from-red-500 to-orange-500', bgColor: 'bg-red-500/10' },
    { label: t.dashboard.humidity, value: `${avgData.humidity.toFixed(0)}%`, icon: Droplets, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10' },
    { label: t.dashboard.soilMoisture, value: `${avgData.soilMoisture.toFixed(0)}%`, icon: Leaf, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10' },
    { label: t.dashboard.rainfall, value: `${avgData.rainfall.toFixed(1)}mm`, icon: CloudRain, color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-500/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{m.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg`}>
                  <m.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-3">
                <Progress value={Math.random() * 40 + 60} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              {t.dashboard.sensorData}
            </CardTitle>
            <CardDescription>Real-time IoT sensor readings from your farms</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t.dashboard.export}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Date</TableHead>
                  <TableHead>{t.dashboard.temperature}</TableHead>
                  <TableHead>{t.dashboard.humidity}</TableHead>
                  <TableHead>{t.dashboard.soilMoisture}</TableHead>
                  <TableHead>{t.dashboard.rainfall}</TableHead>
                  <TableHead>Source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sensorData.slice(0, 8).map((d) => (
                  <TableRow key={d.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{new Date(d.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-red-500" />
                        {d.temperature.toFixed(1)}°C
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        {d.humidity.toFixed(0)}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-500" />
                        {d.soilMoisture.toFixed(0)}%
                      </div>
                    </TableCell>
                    <TableCell>{d.rainfall.toFixed(1)}mm</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">{d.source}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SoilAnalysisTab({ userId, t }: { userId: string; t: any }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    setIsAnalyzing(true);
    await new Promise(r => setTimeout(r, 2500));
    
    setResult({
      nitrogen: 40 + Math.random() * 30,
      phosphorus: 25 + Math.random() * 25,
      potassium: 50 + Math.random() * 30,
      ph: 5.5 + Math.random() * 2,
      organicMatter: 2 + Math.random() * 3,
      healthScore: 75 + Math.floor(Math.random() * 20),
    });
    setIsAnalyzing(false);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(142, 60%, 40%)'];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            {t.dashboard.uploadSoil}
          </CardTitle>
          <CardDescription>Upload soil report image or PDF for AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleUpload(); }}
            onClick={handleUpload}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <FlaskConical className="h-8 w-8 text-primary" />
            </div>
            <p className="font-medium text-foreground mb-1">Drop your file here or click to browse</p>
            <p className="text-sm text-muted-foreground mb-4">Supports: JPG, PNG, PDF (max 10MB)</p>
            <Button disabled={isAnalyzing} className="gap-2">
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {t.dashboard.analyzing}
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Select File
                </>
              )}
            </Button>
          </div>

          {result && (
            <div className="mt-6 space-y-5 animate-fade-up">
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Soil Health Score</p>
                    <p className="text-2xl font-bold text-primary">{result.healthScore}%</p>
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary border-0">Healthy</Badge>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-primary" />
                  Nutrient Levels
                </h4>
                {[
                  { label: t.dashboard.nitrogen, value: result.nitrogen, color: 'bg-primary' },
                  { label: t.dashboard.phosphorus, value: result.phosphorus, color: 'bg-accent' },
                  { label: t.dashboard.potassium, value: result.potassium, color: 'bg-amber-500' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground">{item.value.toFixed(0)}%</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="text-sm text-muted-foreground">{t.dashboard.phLevel}</p>
                  <p className="text-2xl font-bold text-foreground">{result.ph.toFixed(1)}</p>
                  <Badge variant="outline" className="mt-1 text-xs">Optimal</Badge>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <p className="text-sm text-muted-foreground">{t.dashboard.organicMatter}</p>
                  <p className="text-2xl font-bold text-foreground">{result.organicMatter.toFixed(1)}%</p>
                  <Badge variant="outline" className="mt-1 text-xs">Good</Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              NPK Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Nitrogen', value: 45, color: COLORS[0] },
                    { name: 'Phosphorus', value: 30, color: COLORS[1] },
                    { name: 'Potassium', value: 25, color: COLORS[2] },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {[
                { name: 'Nitrogen', color: 'bg-primary' },
                { name: 'Phosphorus', color: 'bg-accent' },
                { name: 'Potassium', color: 'bg-[hsl(142,60%,40%)]' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { icon: Leaf, text: 'Add nitrogen-rich fertilizer for better growth', priority: 'High' },
                { icon: Droplets, text: 'Maintain soil moisture between 40-60%', priority: 'Medium' },
                { icon: Sun, text: 'Consider organic matter supplementation', priority: 'Low' },
              ].map((rec, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <rec.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{rec.text}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{rec.priority} Priority</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
