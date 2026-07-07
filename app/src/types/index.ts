export interface StadiumZone {
  id: string;
  name: string;
  type: 'seating' | 'concourse' | 'entrance' | 'concession' | 'restroom' | 'vip' | 'accessibility';
  capacity: number;
  currentOccupancy: number;
  crowdDensity: 'low' | 'moderate' | 'high' | 'critical';
  temperature: number;
  humidity: number;
  coordinates: { x: number; y: number };
}

export interface CrowdAlert {
  id: string;
  zoneId: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export interface TransportRoute {
  id: string;
  name: string;
  type: 'shuttle' | 'subway' | 'bus' | 'walking';
  status: 'operational' | 'delayed' | 'suspended';
  capacity: number;
  currentLoad: number;
  eta: number;
  route: string[];
}

export interface SustainabilityMetric {
  id: string;
  category: 'energy' | 'water' | 'waste' | 'carbon';
  label: string;
  value: number;
  unit: string;
  target: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface AccessibilityService {
  id: string;
  name: string;
  type: 'wheelchair' | 'visual' | 'hearing' | 'mobility' | 'sensory';
  location: string;
  status: 'available' | 'in-use' | 'unavailable';
  description: string;
}

export interface Incident {
  id: string;
  type: 'medical' | 'security' | 'crowd' | 'technical' | 'weather';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  timestamp: Date;
  status: 'reported' | 'responding' | 'resolved';
  assignedTo?: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
}

export interface NavigationRoute {
  id: string;
  from: string;
  to: string;
  distance: number;
  estimatedTime: number;
  accessibility: boolean;
  steps: string[];
}

export interface MatchEvent {
  id: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  kickoff: Date;
  attendance: number;
  status: 'upcoming' | 'live' | 'completed';
  score?: { home: number; away: number };
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uvIndex: number;
}

export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ar' | 'ja' | 'ko' | 'zh';

export interface UserPreferences {
  language: Language;
  accessibilityMode: boolean;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
}
