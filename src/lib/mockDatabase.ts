import { User, Farm, Prediction, SensorData, SoilAnalysis } from './types';

// Mock Database using localStorage with initial seed data

const STORAGE_KEYS = {
  users: 'agri_db_users',
  farms: 'agri_db_farms',
  predictions: 'agri_db_predictions',
  sensorData: 'agri_db_sensor',
  soilAnalysis: 'agri_db_soil',
};

// Seed data
const seedUsers: User[] = [
  {
    id: 'user_1',
    email: 'demo@agriai.com',
    name: 'Demo User',
    phone: '+880 1712345678',
    location: 'Dhaka, Bangladesh',
    language: 'en',
    subscription: 'free',
    createdAt: '2024-01-15T10:00:00Z',
  },
];

const seedFarms: Farm[] = [
  {
    id: 'farm_1',
    userId: 'user_1',
    name: 'Green Valley Farm',
    location: 'Gazipur, Dhaka',
    size: 5.5,
    sizeUnit: 'hectares',
    crops: ['rice', 'vegetables'],
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'farm_2',
    userId: 'user_1',
    name: 'Sunrise Fields',
    location: 'Rajshahi',
    size: 8,
    sizeUnit: 'hectares',
    crops: ['wheat', 'potato'],
    createdAt: '2024-02-10T10:00:00Z',
  },
];

const seedPredictions: Prediction[] = [
  {
    id: 'pred_1',
    farmId: 'farm_1',
    userId: 'user_1',
    cropType: 'rice',
    soilType: 'alluvial',
    weatherCondition: 'monsoon',
    farmSize: 5.5,
    predictedYield: 4.2,
    yieldUnit: 'tons/hectare',
    confidence: 87,
    recommendations: [
      'Apply nitrogen fertilizer at tillering stage',
      'Maintain water level at 5cm during vegetative phase',
      'Monitor for brown plant hopper during humid periods',
    ],
    createdAt: '2024-06-15T10:00:00Z',
  },
  {
    id: 'pred_2',
    farmId: 'farm_2',
    userId: 'user_1',
    cropType: 'wheat',
    soilType: 'loamy',
    weatherCondition: 'dry',
    farmSize: 8,
    predictedYield: 3.8,
    yieldUnit: 'tons/hectare',
    confidence: 82,
    recommendations: [
      'Irrigate every 15 days during dry spell',
      'Apply potash at flowering stage',
      'Watch for aphid infestation',
    ],
    createdAt: '2024-06-20T10:00:00Z',
  },
];

const generateSensorData = (): SensorData[] => {
  const data: SensorData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 20; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      id: `sensor_${i}`,
      farmId: i % 2 === 0 ? 'farm_1' : 'farm_2',
      timestamp: date.toISOString(),
      temperature: 25 + Math.random() * 10,
      humidity: 60 + Math.random() * 30,
      soilMoisture: 40 + Math.random() * 40,
      rainfall: Math.random() > 0.7 ? Math.random() * 50 : 0,
      sunlight: 4 + Math.random() * 8,
      source: ['satellite', 'iot', 'manual'][Math.floor(Math.random() * 3)] as 'satellite' | 'iot' | 'manual',
    });
  }
  
  return data;
};

const seedSoilAnalysis: SoilAnalysis[] = [
  {
    id: 'soil_1',
    farmId: 'farm_1',
    userId: 'user_1',
    nitrogen: 45,
    phosphorus: 32,
    potassium: 58,
    ph: 6.5,
    organicMatter: 3.2,
    recommendations: [
      'Apply urea to increase nitrogen levels',
      'Soil pH is optimal for most crops',
      'Consider adding compost to improve organic matter',
    ],
    createdAt: '2024-05-10T10:00:00Z',
  },
];

class MockDatabase {
  private getData<T>(key: string, seedData: T[]): T[] {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return seedData;
      }
    }
    localStorage.setItem(key, JSON.stringify(seedData));
    return seedData;
  }

  private setData<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Users
  getUsers(): User[] {
    return this.getData(STORAGE_KEYS.users, seedUsers);
  }

  getUser(email: string): User | undefined {
    return this.getUsers().find(u => u.email === email);
  }

  getUserById(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.setData(STORAGE_KEYS.users, users);
  }

  updateUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.setData(STORAGE_KEYS.users, users);
    }
  }

  // Farms
  getFarms(userId?: string): Farm[] {
    const farms = this.getData(STORAGE_KEYS.farms, seedFarms);
    return userId ? farms.filter(f => f.userId === userId) : farms;
  }

  addFarm(farm: Farm): void {
    const farms = this.getFarms();
    farms.push(farm);
    this.setData(STORAGE_KEYS.farms, farms);
  }

  // Predictions
  getPredictions(userId?: string): Prediction[] {
    const predictions = this.getData(STORAGE_KEYS.predictions, seedPredictions);
    return userId ? predictions.filter(p => p.userId === userId) : predictions;
  }

  addPrediction(prediction: Prediction): void {
    const predictions = this.getPredictions();
    predictions.push(prediction);
    this.setData(STORAGE_KEYS.predictions, predictions);
  }

  // Sensor Data
  getSensorData(farmId?: string): SensorData[] {
    const data = this.getData(STORAGE_KEYS.sensorData, generateSensorData());
    return farmId ? data.filter(d => d.farmId === farmId) : data;
  }

  // Soil Analysis
  getSoilAnalysis(userId?: string): SoilAnalysis[] {
    const analysis = this.getData(STORAGE_KEYS.soilAnalysis, seedSoilAnalysis);
    return userId ? analysis.filter(a => a.userId === userId) : analysis;
  }

  addSoilAnalysis(analysis: SoilAnalysis): void {
    const allAnalysis = this.getSoilAnalysis();
    allAnalysis.push(analysis);
    this.setData(STORAGE_KEYS.soilAnalysis, allAnalysis);
  }

  // Reset database
  reset(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
}

export const mockDb = new MockDatabase();
