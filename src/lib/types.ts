// AgriAI Hub Types

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  language: 'en' | 'bn';
  subscription: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Farm {
  id: string;
  userId: string;
  name: string;
  location: string;
  size: number;
  sizeUnit: 'hectares' | 'acres' | 'bigha';
  crops: string[];
  createdAt: string;
}

export interface Prediction {
  id: string;
  farmId: string;
  userId: string;
  cropType: string;
  soilType: string;
  weatherCondition: string;
  farmSize: number;
  predictedYield: number;
  yieldUnit: string;
  confidence: number;
  recommendations: string[];
  createdAt: string;
}

export interface SensorData {
  id: string;
  farmId: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  rainfall: number;
  sunlight: number;
  source: 'satellite' | 'iot' | 'manual';
}

export interface SoilAnalysis {
  id: string;
  farmId: string;
  userId: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organicMatter: number;
  recommendations: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type Language = 'en' | 'bn';
