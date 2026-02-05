import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { TopBar } from '@/components/TopBar';
import { Footer } from '@/components/Footer';
import { LivingFieldBackground } from '@/components/LivingFieldBackground';
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
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Brain, Database, FlaskConical, 
  TrendingUp, Thermometer, Droplets, Sun, CloudRain,
  Leaf, Crown, ArrowUp, Sparkles, Download, RefreshCw,
  Activity, Zap, Target, Clock, AlertCircle, CheckCircle2,
  BarChart2, PieChart as PieChartIcon, Upload
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

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
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Leaf className="h-7 w-7 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground font-medium">{t.common.loading}</p>
        </motion.div>
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
    <div className="min-h-screen bg-background">
      <TopBar />
      <LivingFieldBackground />
      <Navbar />
      
      <div className="pt-32 lg:pt-36 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Welcome Header */}
          <motion.div 
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
            {...fadeInUp}
          >
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                {t.dashboard.welcome}, {user.name}! 
                <motion.span 
                  className="inline-block"
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  👋
                </motion.span>
              </h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your farms today</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-1.5 py-1.5 px-3 bg-muted/50 border-border/50">
                <Clock className="h-3.5 w-3.5" />
                Last updated: Just now
              </Badge>
              <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                <RefreshCw className="h-4 w-4" />
                Sync
              </Button>
            </div>
          </motion.div>

          {/* Subscription Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-8 border-0 bg-primary text-primary-foreground overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-earth-green-dark" />
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', 
                  backgroundSize: '24px 24px' 
                }} />
              </div>
              <motion.div 
                className="absolute top-0 right-0 w-64 h-64 bg-harvest-gold/20 rounded-full blur-[80px]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <CardContent className="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <Crown className="h-6 w-6 text-harvest-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{t.dashboard.freeTier}</span>
                      <Badge className="bg-white/10 text-white border-0">Current Plan</Badge>
                    </div>
                    <span className="text-white/70 text-sm">5 predictions remaining this month • Upgrade for unlimited access</span>
                  </div>
                </div>
                <Button size="sm" className="gap-2 bg-harvest-gold text-primary hover:bg-harvest-gold/90 shadow-lg rounded-xl">
                  <Sparkles className="h-4 w-4" />
                  {t.dashboard.upgradePro}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 h-auto p-1.5 bg-card/80 backdrop-blur-sm border border-border/50 shadow-sm flex-wrap gap-1 rounded-2xl">
              {tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id} 
                  className="gap-2 px-5 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">{tab.label}</span>
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
      
      <Footer />
      <Chatbot />
    </div>
  );
}

function OverviewTab({ userId, t }: { userId: string; t: any }) {
  const farms = mockDb.getFarms(userId);
  const predictions = mockDb.getPredictions(userId);
  
  const stats = [
    { label: t.dashboard.totalFarms, value: farms.length || 3, icon: Leaf, trend: '+2', color: 'bg-primary' },
    { label: t.dashboard.activePredictions, value: predictions.length || 8, icon: Brain, trend: '+5', color: 'bg-tech-teal' },
    { label: 'Avg. Confidence', value: '92%', icon: Target, trend: '+3%', color: 'bg-harvest-gold' },
    { label: t.dashboard.lastSync, value: 'Now', icon: Activity, trend: '', color: 'bg-primary' },
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
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-0 shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden group bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 font-medium">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      {stat.trend && (
                        <span className="text-xs font-medium text-tech-teal flex items-center">
                          <ArrowUp className="h-3 w-3" />
                          {stat.trend}
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.div 
                    className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart2 className="h-5 w-5 text-primary" />
                    Yield Performance
                  </CardTitle>
                  <CardDescription>Actual vs Predicted yield over time</CardDescription>
                </div>
                <Select defaultValue="6m">
                  <SelectTrigger className="w-24 h-9 rounded-xl border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
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
                      <stop offset="5%" stopColor="hsl(160 65% 15%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(160 65% 15%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Area type="monotone" dataKey="yield" stroke="hsl(160 65% 15%)" fill="url(#yieldGradient)" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="hsl(43 85% 45%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-primary" />
                {t.dashboard.recentActivity}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-tech-teal/10' : 'bg-harvest-gold/10'
                    }`}>
                      {activity.status === 'success' ? (
                        <CheckCircle2 className="h-4 w-4 text-tech-teal" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-harvest-gold" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
      <motion.div {...fadeInUp}>
        <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-harvest-gold" />
              {t.dashboard.newPrediction}
            </CardTitle>
            <CardDescription>Enter your farm details to get AI-powered yield predictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t.dashboard.cropType}</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, crop: v })}>
                  <SelectTrigger className="h-12 rounded-xl border-border/50">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {Object.entries(t.crops).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v as string}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t.dashboard.soilType}</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, soil: v })}>
                  <SelectTrigger className="h-12 rounded-xl border-border/50">
                    <SelectValue placeholder="Select soil" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
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
                  <SelectTrigger className="h-12 rounded-xl border-border/50">
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
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
                  className="h-12 rounded-xl border-border/50"
                />
              </div>
            </div>
            
            <Button 
              onClick={handlePredict} 
              className="w-full h-12 text-base gap-2 rounded-xl" 
              disabled={isLoading || !formData.crop || !formData.soil || !formData.weather}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  {t.dashboard.predictYield}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {result ? (
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-tech-teal" />
                Prediction Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-primary/5 rounded-2xl">
                <p className="text-sm text-muted-foreground mb-2">Predicted Yield</p>
                <p className="text-4xl font-bold text-primary mb-1">
                  {result.predictedYield.toFixed(2)} <span className="text-lg font-normal">{result.yieldUnit}</span>
                </p>
                <Badge className="bg-tech-teal/10 text-tech-teal border-0 mt-2">
                  {result.confidence}% confidence
                </Badge>
              </div>
              
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Recommendations</p>
                <div className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                      <CheckCircle2 className="h-5 w-5 text-tech-teal flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm h-full flex items-center justify-center">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Fill in the form to get AI predictions</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Results will appear here</p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Prediction History */}
      {predictions.length > 0 && (
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Prediction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead>Crop</TableHead>
                      <TableHead>Soil</TableHead>
                      <TableHead>Yield</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {predictions.slice(0, 5).map((pred) => (
                      <TableRow key={pred.id} className="border-border/50">
                        <TableCell className="font-medium">{pred.cropType}</TableCell>
                        <TableCell>{pred.soilType}</TableCell>
                        <TableCell>{pred.predictedYield.toFixed(2)} {pred.yieldUnit}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-tech-teal/30 text-tech-teal">
                            {pred.confidence}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(pred.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

function DataCenterTab({ userId, t }: { userId: string; t: any }) {
  const sensorData = mockDb.getSensorData();

  return (
    <motion.div className="space-y-6" {...fadeInUp}>
      <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="h-5 w-5 text-primary" />
                Sensor Data
              </CardTitle>
              <CardDescription>Real-time IoT sensor readings from your farms</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Location</TableHead>
                  <TableHead>Temperature</TableHead>
                  <TableHead>Humidity</TableHead>
                  <TableHead>Soil Moisture</TableHead>
                  <TableHead>Rainfall</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sensorData.map((data, index) => (
                  <TableRow key={data.id} className="border-border/50">
                    <TableCell className="font-medium">Farm {index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-destructive" />
                        {data.temperature}°C
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-tech-teal" />
                        {data.humidity}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-harvest-gold" />
                        {data.soilMoisture}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CloudRain className="h-4 w-4 text-primary" />
                        {data.rainfall} mm
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(data.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SoilAnalysisTab({ userId, t }: { userId: string; t: any }) {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    setAnalysisResult({
      nitrogen: 45 + Math.random() * 30,
      phosphorus: 30 + Math.random() * 25,
      potassium: 35 + Math.random() * 35,
      ph: 5.5 + Math.random() * 2,
      organic: 2 + Math.random() * 3,
      recommendations: [
        'Apply nitrogen-rich fertilizer in 2 weeks',
        'pH level is optimal for most crops',
        'Consider adding organic matter to improve soil structure',
      ],
    });
    setIsAnalyzing(false);
  };

  const nutrientData = analysisResult ? [
    { name: 'N', value: analysisResult.nitrogen, fill: 'hsl(160 65% 15%)' },
    { name: 'P', value: analysisResult.phosphorus, fill: 'hsl(43 85% 45%)' },
    { name: 'K', value: analysisResult.potassium, fill: 'hsl(170 55% 40%)' },
  ] : [];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <motion.div {...fadeInUp}>
        <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Upload className="h-5 w-5 text-primary" />
              Upload Soil Report
            </CardTitle>
            <CardDescription>Upload your soil test report for AI analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="border-2 border-dashed border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-7 w-7 text-primary" />
              </div>
              <p className="font-medium text-foreground mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
            </div>
            
            <Button 
              onClick={handleAnalyze} 
              className="w-full h-12 text-base gap-2 rounded-xl" 
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FlaskConical className="h-5 w-5" />
                  Analyze Soil
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {analysisResult ? (
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChartIcon className="h-5 w-5 text-tech-teal" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nutrientData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {nutrientData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                  <span className="text-sm font-medium">pH Level</span>
                  <Badge variant="outline" className="border-tech-teal/30 text-tech-teal">
                    {analysisResult.ph.toFixed(1)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                  <span className="text-sm font-medium">Organic Matter</span>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {analysisResult.organic.toFixed(1)}%
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-3">Recommendations</p>
                <div className="space-y-2">
                  {analysisResult.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                      <CheckCircle2 className="h-5 w-5 text-tech-teal flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm h-full flex items-center justify-center">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">Upload a soil report to analyze</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Results will appear here</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
