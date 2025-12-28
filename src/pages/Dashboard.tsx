import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockDb } from '@/lib/mockDatabase';
import { Prediction, SensorData } from '@/lib/types';
import { Chatbot } from '@/components/Chatbot';
import { 
  LayoutDashboard, Brain, Database, FlaskConical, 
  TrendingUp, Thermometer, Droplets, Sun, CloudRain,
  Leaf, Crown, ArrowUp
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
    return <div className="min-h-screen flex items-center justify-center">{t.common.loading}</div>;
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
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Welcome Banner */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              {t.dashboard.welcome}, {user.name}!
            </h1>
            <p className="text-muted-foreground">Manage your farms and predictions</p>
          </div>

          {/* Subscription Banner */}
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-primary" />
                <div>
                  <span className="font-medium">{t.dashboard.freeTier}</span>
                  <span className="text-muted-foreground ml-2">- 5 predictions/month</span>
                </div>
              </div>
              <Button size="sm" className="gap-2">
                <ArrowUp className="h-4 w-4" />
                {t.dashboard.upgradePro}
              </Button>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex-wrap h-auto gap-2">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab userId={user.id} t={t} />
            </TabsContent>
            
            <TabsContent value="predictions">
              <PredictionsTab userId={user.id} t={t} />
            </TabsContent>
            
            <TabsContent value="data">
              <DataCenterTab userId={user.id} t={t} />
            </TabsContent>
            
            <TabsContent value="soil">
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
  
  const stats = [
    { label: t.dashboard.totalFarms, value: farms.length, icon: Leaf },
    { label: t.dashboard.activePredictions, value: predictions.length, icon: Brain },
    { label: t.dashboard.lastSync, value: 'Just now', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.recentActivity}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.slice(0, 3).map((pred) => (
              <div key={pred.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Yield prediction for {pred.cropType}</p>
                  <p className="text-sm text-muted-foreground">{pred.predictedYield} {pred.yieldUnit}</p>
                </div>
                <Badge variant="secondary">{pred.confidence}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PredictionsTab({ userId, t }: { userId: string; t: any }) {
  const [formData, setFormData] = useState({ crop: '', soil: '', weather: '', size: '' });
  const [result, setResult] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const predictions = mockDb.getPredictions(userId);

  const handlePredict = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    
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

  const chartData = predictions.map(p => ({
    name: p.cropType,
    yield: parseFloat(p.predictedYield.toFixed(1)),
    confidence: p.confidence,
  }));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.newPrediction}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.dashboard.cropType}</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, crop: v })}>
              <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
              <SelectContent>
                {Object.entries(t.crops).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v as string}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>{t.dashboard.soilType}</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, soil: v })}>
              <SelectTrigger><SelectValue placeholder="Select soil type" /></SelectTrigger>
              <SelectContent>
                {Object.entries(t.soils).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v as string}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>{t.dashboard.weatherCondition}</Label>
            <Select onValueChange={(v) => setFormData({ ...formData, weather: v })}>
              <SelectTrigger><SelectValue placeholder="Select weather" /></SelectTrigger>
              <SelectContent>
                {Object.entries(t.weather).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v as string}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>{t.dashboard.farmSize} (hectares)</Label>
            <Input 
              type="number" 
              placeholder="5" 
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            />
          </div>
          
          <Button onClick={handlePredict} className="w-full" disabled={isLoading}>
            {isLoading ? t.dashboard.predicting : t.dashboard.predict}
          </Button>

          {result && (
            <Card className="mt-4 bg-primary/5 border-primary/20">
              <CardContent className="pt-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">{t.dashboard.predictedYield}</p>
                  <p className="text-3xl font-bold text-primary">{result.predictedYield.toFixed(1)} {result.yieldUnit}</p>
                  <Badge className="mt-2">{t.dashboard.confidence}: {result.confidence}%</Badge>
                </div>
                <div>
                  <p className="font-medium mb-2">{t.dashboard.recommendations}:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {result.recommendations.map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.history}</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="yield" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-12">{t.common.noData}</p>
          )}
        </CardContent>
      </Card>
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
    { label: t.dashboard.temperature, value: `${avgData.temperature.toFixed(1)}°C`, icon: Thermometer, color: 'text-red-500' },
    { label: t.dashboard.humidity, value: `${avgData.humidity.toFixed(0)}%`, icon: Droplets, color: 'text-blue-500' },
    { label: t.dashboard.soilMoisture, value: `${avgData.soilMoisture.toFixed(0)}%`, icon: Leaf, color: 'text-green-500' },
    { label: t.dashboard.rainfall, value: `${avgData.rainfall.toFixed(1)}mm`, icon: CloudRain, color: 'text-cyan-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                  <p className="text-2xl font-bold">{m.value}</p>
                </div>
                <m.icon className={`h-8 w-8 ${m.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.dashboard.sensorData}</CardTitle>
          <Button variant="outline" size="sm">{t.dashboard.export}</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">{t.dashboard.temperature}</th>
                  <th className="text-left py-3 px-2">{t.dashboard.humidity}</th>
                  <th className="text-left py-3 px-2">{t.dashboard.soilMoisture}</th>
                  <th className="text-left py-3 px-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {sensorData.slice(0, 10).map((d) => (
                  <tr key={d.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">{new Date(d.timestamp).toLocaleDateString()}</td>
                    <td className="py-3 px-2">{d.temperature.toFixed(1)}°C</td>
                    <td className="py-3 px-2">{d.humidity.toFixed(0)}%</td>
                    <td className="py-3 px-2">{d.soilMoisture.toFixed(0)}%</td>
                    <td className="py-3 px-2"><Badge variant="secondary">{d.source}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SoilAnalysisTab({ userId, t }: { userId: string; t: any }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const analyses = mockDb.getSoilAnalysis(userId);

  const handleUpload = async () => {
    setIsAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    
    setResult({
      nitrogen: 40 + Math.random() * 30,
      phosphorus: 25 + Math.random() * 25,
      potassium: 50 + Math.random() * 30,
      ph: 5.5 + Math.random() * 2,
      organicMatter: 2 + Math.random() * 3,
    });
    setIsAnalyzing(false);
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(142, 60%, 40%)'];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.dashboard.uploadSoil}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
            <FlaskConical className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Upload soil report image or PDF</p>
            <Button onClick={handleUpload} disabled={isAnalyzing}>
              {isAnalyzing ? t.dashboard.analyzing : t.dashboard.uploadSoil}
            </Button>
          </div>

          {result && (
            <div className="space-y-4">
              <h4 className="font-medium">Analysis Results</h4>
              {[
                { label: t.dashboard.nitrogen, value: result.nitrogen, max: 100 },
                { label: t.dashboard.phosphorus, value: result.phosphorus, max: 100 },
                { label: t.dashboard.potassium, value: result.potassium, max: 100 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.label}</span>
                    <span>{item.value.toFixed(0)}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">{t.dashboard.phLevel}</p>
                  <p className="text-xl font-bold">{result.ph.toFixed(1)}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">{t.dashboard.organicMatter}</p>
                  <p className="text-xl font-bold">{result.organicMatter.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>NPK Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {analyses.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'N', value: analyses[0].nitrogen },
                    { name: 'P', value: analyses[0].phosphorus },
                    { name: 'K', value: analyses[0].potassium },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {COLORS.map((color, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-12">{t.common.noData}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
