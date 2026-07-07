import type {
  StadiumZone,
  CrowdAlert,
  TransportRoute,
  SustainabilityMetric,
  AccessibilityService,
  Incident,
  MatchEvent,
  WeatherData,
  NavigationRoute,
} from '@/types';

export const stadiumZones: StadiumZone[] = [
  { id: 'north-entrance', name: 'North Entrance', type: 'entrance', capacity: 5000, currentOccupancy: 2100, crowdDensity: 'moderate', temperature: 24, humidity: 45, coordinates: { x: 50, y: 10 } },
  { id: 'south-entrance', name: 'South Entrance', type: 'entrance', capacity: 5000, currentOccupancy: 3200, crowdDensity: 'high', temperature: 25, humidity: 48, coordinates: { x: 50, y: 90 } },
  { id: 'east-entrance', name: 'East Entrance', type: 'entrance', capacity: 4000, currentOccupancy: 1500, crowdDensity: 'low', temperature: 23, humidity: 42, coordinates: { x: 90, y: 50 } },
  { id: 'west-entrance', name: 'West Entrance', type: 'entrance', capacity: 4000, currentOccupancy: 2800, crowdDensity: 'high', temperature: 24, humidity: 44, coordinates: { x: 10, y: 50 } },
  { id: 'lower-bowl-n', name: 'Lower Bowl North', type: 'seating', capacity: 12000, currentOccupancy: 9800, crowdDensity: 'high', temperature: 26, humidity: 50, coordinates: { x: 50, y: 25 } },
  { id: 'lower-bowl-s', name: 'Lower Bowl South', type: 'seating', capacity: 12000, currentOccupancy: 11200, crowdDensity: 'critical', temperature: 27, humidity: 52, coordinates: { x: 50, y: 75 } },
  { id: 'lower-bowl-e', name: 'Lower Bowl East', type: 'seating', capacity: 10000, currentOccupancy: 7200, crowdDensity: 'moderate', temperature: 26, humidity: 49, coordinates: { x: 75, y: 50 } },
  { id: 'lower-bowl-w', name: 'Lower Bowl West', type: 'seating', capacity: 10000, currentOccupancy: 6800, crowdDensity: 'moderate', temperature: 25, humidity: 47, coordinates: { x: 25, y: 50 } },
  { id: 'upper-bowl-n', name: 'Upper Bowl North', type: 'seating', capacity: 15000, currentOccupancy: 8400, crowdDensity: 'moderate', temperature: 28, humidity: 46, coordinates: { x: 50, y: 5 } },
  { id: 'upper-bowl-s', name: 'Upper Bowl South', type: 'seating', capacity: 15000, currentOccupancy: 12500, crowdDensity: 'high', temperature: 29, humidity: 48, coordinates: { x: 50, y: 95 } },
  { id: 'vip-east', name: 'VIP Lounge East', type: 'vip', capacity: 2000, currentOccupancy: 1200, crowdDensity: 'moderate', temperature: 22, humidity: 40, coordinates: { x: 85, y: 30 } },
  { id: 'vip-west', name: 'VIP Lounge West', type: 'vip', capacity: 2000, currentOccupancy: 900, crowdDensity: 'low', temperature: 22, humidity: 41, coordinates: { x: 15, y: 70 } },
  { id: 'concourse-n', name: 'North Concourse', type: 'concourse', capacity: 8000, currentOccupancy: 5600, crowdDensity: 'high', temperature: 25, humidity: 50, coordinates: { x: 50, y: 15 } },
  { id: 'concourse-s', name: 'South Concourse', type: 'concourse', capacity: 8000, currentOccupancy: 4800, crowdDensity: 'moderate', temperature: 26, humidity: 51, coordinates: { x: 50, y: 85 } },
  { id: 'concourse-e', name: 'East Concourse', type: 'concourse', capacity: 6000, currentOccupancy: 3900, crowdDensity: 'moderate', temperature: 25, humidity: 49, coordinates: { x: 85, y: 50 } },
  { id: 'concourse-w', name: 'West Concourse', type: 'concourse', capacity: 6000, currentOccupancy: 2100, crowdDensity: 'low', temperature: 24, humidity: 47, coordinates: { x: 15, y: 50 } },
  { id: 'concession-a', name: 'Concession Zone A', type: 'concession', capacity: 3000, currentOccupancy: 2400, crowdDensity: 'high', temperature: 28, humidity: 55, coordinates: { x: 35, y: 35 } },
  { id: 'concession-b', name: 'Concession Zone B', type: 'concession', capacity: 3000, currentOccupancy: 1800, crowdDensity: 'moderate', temperature: 28, humidity: 54, coordinates: { x: 65, y: 65 } },
  { id: 'restroom-cluster-1', name: 'Restrooms - North', type: 'restroom', capacity: 800, currentOccupancy: 640, crowdDensity: 'high', temperature: 24, humidity: 60, coordinates: { x: 45, y: 20 } },
  { id: 'restroom-cluster-2', name: 'Restrooms - South', type: 'restroom', capacity: 800, currentOccupancy: 320, crowdDensity: 'low', temperature: 25, humidity: 58, coordinates: { x: 55, y: 80 } },
  { id: 'accessibility-hub', name: 'Accessibility Hub', type: 'accessibility', capacity: 500, currentOccupancy: 180, crowdDensity: 'low', temperature: 23, humidity: 45, coordinates: { x: 30, y: 60 } },
];

export const crowdAlerts: CrowdAlert[] = [
  { id: 'alert-1', zoneId: 'lower-bowl-s', severity: 'critical', message: 'Approaching maximum capacity - Lower Bowl South', timestamp: new Date(Date.now() - 5 * 60000), resolved: false },
  { id: 'alert-2', zoneId: 'concession-a', severity: 'warning', message: 'Queue length exceeds 15 minutes - Concession A', timestamp: new Date(Date.now() - 12 * 60000), resolved: false },
  { id: 'alert-3', zoneId: 'south-entrance', severity: 'warning', message: 'High inbound traffic at South Entrance', timestamp: new Date(Date.now() - 8 * 60000), resolved: false },
  { id: 'alert-4', zoneId: 'restroom-cluster-1', severity: 'warning', message: 'Restroom capacity at 80% - North Cluster', timestamp: new Date(Date.now() - 15 * 60000), resolved: false },
  { id: 'alert-5', zoneId: 'upper-bowl-s', severity: 'info', message: 'Staggered entry recommended for Upper Bowl South', timestamp: new Date(Date.now() - 20 * 60000), resolved: false },
];

export const transportRoutes: TransportRoute[] = [
  { id: 'route-1', name: 'Metro Line Red', type: 'subway', status: 'operational', capacity: 1200, currentLoad: 890, eta: 4, route: ['Downtown', 'Stadium Station', 'Airport'] },
  { id: 'route-2', name: 'Stadium Express', type: 'shuttle', status: 'operational', capacity: 80, currentLoad: 72, eta: 2, route: ['Parking Lot A', 'North Entrance', 'VIP Gate'] },
  { id: 'route-3', name: 'City Loop Bus', type: 'bus', status: 'delayed', capacity: 60, currentLoad: 45, eta: 8, route: ['Hotel District', 'Shopping Center', 'South Entrance'] },
  { id: 'route-4', name: 'Green Line Metro', type: 'subway', status: 'operational', capacity: 1000, currentLoad: 560, eta: 6, route: ['East Side', 'Stadium Central', 'Convention Center'] },
  { id: 'route-5', name: 'Pedestrian Walkway', type: 'walking', status: 'operational', capacity: 2000, currentLoad: 340, eta: 12, route: ['Fan Zone', 'Plaza', 'Main Gate'] },
  { id: 'route-6', name: 'VIP Shuttle', type: 'shuttle', status: 'operational', capacity: 20, currentLoad: 8, eta: 1, route: ['VIP Parking', 'East VIP Lounge'] },
];

export const sustainabilityMetrics: SustainabilityMetric[] = [
  { id: 'sm-1', category: 'energy', label: 'Energy Consumption', value: 48700, unit: 'kWh', target: 45000, trend: 'down', changePercent: -8.2 },
  { id: 'sm-2', category: 'water', label: 'Water Usage', value: 125000, unit: 'L', target: 120000, trend: 'stable', changePercent: 1.5 },
  { id: 'sm-3', category: 'waste', label: 'Waste Diverted', value: 78, unit: '%', target: 85, trend: 'up', changePercent: 5.3 },
  { id: 'sm-4', category: 'carbon', label: 'Carbon Offset', value: 34200, unit: 'kg CO₂', target: 40000, trend: 'up', changePercent: 12.1 },
  { id: 'sm-5', category: 'energy', label: 'Renewable Energy', value: 62, unit: '%', target: 70, trend: 'up', changePercent: 8.7 },
  { id: 'sm-6', category: 'waste', label: 'Recycling Rate', value: 84, unit: '%', target: 90, trend: 'up', changePercent: 3.2 },
];

export const accessibilityServices: AccessibilityService[] = [
  { id: 'as-1', name: 'Wheelchair Escort', type: 'wheelchair', location: 'All Entrances', status: 'available', description: 'Trained staff available for wheelchair assistance to seats' },
  { id: 'as-2', name: 'Hearing Loop System', type: 'hearing', location: 'All Seating Sections', status: 'available', description: 'Inductive hearing loop compatible with hearing aids' },
  { id: 'as-3', name: 'Audio Description', type: 'visual', location: 'Section 105, 205', status: 'available', description: 'Live audio commentary of match action for visually impaired fans' },
  { id: 'as-4', name: 'Sensory Room', type: 'sensory', location: 'Level 2 - East Concourse', status: 'available', description: 'Quiet space with adjustable lighting and sound for sensory needs' },
  { id: 'as-5', name: 'Mobility Scooter Rental', type: 'mobility', location: 'North Entrance', status: 'in-use', description: 'Electric mobility scooters for rent, subject to availability' },
  { id: 'as-6', name: 'Sign Language Interpreter', type: 'hearing', location: 'Main Stage', status: 'available', description: 'ASL interpreters available for pre-match ceremonies' },
  { id: 'as-7', name: 'Tactile Map', type: 'visual', location: 'All Information Desks', status: 'available', description: 'Braille and 3D tactile stadium maps' },
  { id: 'as-8', name: 'Companion Seating', type: 'wheelchair', location: 'Accessible Sections', status: 'available', description: 'Adjacent companion seats for personal assistants' },
];

export const incidents: Incident[] = [
  { id: 'inc-1', type: 'medical', severity: 'medium', location: 'Lower Bowl South - Section 110', description: 'Fan feeling unwell, first aid team dispatched', timestamp: new Date(Date.now() - 10 * 60000), status: 'responding', assignedTo: 'Medical Team Alpha' },
  { id: 'inc-2', type: 'crowd', severity: 'low', location: 'Concourse A - Near Gate 5', description: 'Minor congestion due to spilled drink, cleaning crew on site', timestamp: new Date(Date.now() - 25 * 60000), status: 'resolved', assignedTo: 'Cleanup Crew 3' },
  { id: 'inc-3', type: 'technical', severity: 'high', location: 'Upper Bowl East - Section 215', description: 'Scoreboard display malfunction in section', timestamp: new Date(Date.now() - 18 * 60000), status: 'responding', assignedTo: 'Tech Team Bravo' },
  { id: 'inc-4', type: 'security', severity: 'low', location: 'VIP Lounge West', description: 'Unauthorized access attempt at VIP entrance', timestamp: new Date(Date.now() - 35 * 60000), status: 'resolved', assignedTo: 'Security Team Delta' },
  { id: 'inc-5', type: 'medical', severity: 'low', location: 'North Concourse', description: 'Minor first aid - cut finger at concession stand', timestamp: new Date(Date.now() - 45 * 60000), status: 'resolved', assignedTo: 'Medical Team Beta' },
  { id: 'inc-6', type: 'crowd', severity: 'medium', location: 'South Entrance', description: 'Queue forming due to ticket scanning delay', timestamp: new Date(Date.now() - 7 * 60000), status: 'responding', assignedTo: 'Gate Staff South' },
];

export const matchEvents: MatchEvent[] = [
  { id: 'match-1', homeTeam: 'USA', awayTeam: 'Mexico', venue: 'MetLife Stadium', kickoff: new Date('2026-06-12T19:00:00'), attendance: 82500, status: 'live', score: { home: 2, away: 1 } },
  { id: 'match-2', homeTeam: 'Brazil', awayTeam: 'Argentina', venue: 'SoFi Stadium', kickoff: new Date('2026-06-13T16:00:00'), attendance: 78000, status: 'upcoming' },
  { id: 'match-3', homeTeam: 'Germany', awayTeam: 'France', venue: 'AT&T Stadium', kickoff: new Date('2026-06-14T20:00:00'), attendance: 95000, status: 'upcoming' },
  { id: 'match-4', homeTeam: 'England', awayTeam: 'Spain', venue: 'Mercedes-Benz Stadium', kickoff: new Date('2026-06-15T15:00:00'), attendance: 72000, status: 'upcoming' },
];

export const weatherData: WeatherData = {
  temperature: 26,
  condition: 'Partly Cloudy',
  humidity: 48,
  windSpeed: 12,
  visibility: 10,
  uvIndex: 6,
};

export const navigationRoutes: NavigationRoute[] = [
  { id: 'nav-1', from: 'North Entrance', to: 'Lower Bowl North - Section 101', distance: 180, estimatedTime: 3, accessibility: true, steps: ['Enter via North Gate', 'Proceed through security', 'Take stairs/elevator to Level 1', 'Follow signs to Section 101'] },
  { id: 'nav-2', from: 'South Entrance', to: 'VIP Lounge East', distance: 420, estimatedTime: 7, accessibility: true, steps: ['Enter via South Gate', 'Show VIP credentials at checkpoint', 'Take private elevator to Level 3', 'Follow VIP corridor to Lounge East'] },
  { id: 'nav-3', from: 'Parking Lot A', to: 'Concession Zone B', distance: 350, estimatedTime: 6, accessibility: true, steps: ['Exit Parking Lot A', 'Follow pedestrian walkway', 'Enter through East Gate', 'Concourse B is straight ahead'] },
  { id: 'nav-4', from: 'Metro Station', to: 'Upper Bowl South', distance: 600, estimatedTime: 12, accessibility: false, steps: ['Exit Metro via Stadium exit', 'Cross Plaza to South Gate', 'Enter stadium', 'Take escalators to Upper Level', 'Proceed to South sections'] },
  { id: 'nav-5', from: 'Accessibility Hub', to: 'Lower Bowl East - Accessible Seating', distance: 200, estimatedTime: 4, accessibility: true, steps: ['Start at Accessibility Hub', 'Follow accessible pathway', 'Elevator to Level 1', 'Accessible seating is directly ahead'] },
];

export const crowdDensityHistory = [
  { time: '14:00', northEntrance: 1200, southEntrance: 800, eastEntrance: 600, westEntrance: 900, total: 3500 },
  { time: '14:30', northEntrance: 1800, southEntrance: 1400, eastEntrance: 900, westEntrance: 1300, total: 5400 },
  { time: '15:00', northEntrance: 2400, southEntrance: 2100, eastEntrance: 1200, westEntrance: 1800, total: 7500 },
  { time: '15:30', northEntrance: 3200, southEntrance: 2800, eastEntrance: 1500, westEntrance: 2200, total: 9700 },
  { time: '16:00', northEntrance: 3800, southEntrance: 3500, eastEntrance: 1800, westEntrance: 2600, total: 11700 },
  { time: '16:30', northEntrance: 4200, southEntrance: 4200, eastEntrance: 2100, westEntrance: 3000, total: 13500 },
  { time: '17:00', northEntrance: 4500, southEntrance: 4800, eastEntrance: 2400, westEntrance: 3400, total: 15100 },
  { time: '17:30', northEntrance: 4700, southEntrance: 5100, eastEntrance: 2700, westEntrance: 3700, total: 16200 },
  { time: '18:00', northEntrance: 4800, southEntrance: 5300, eastEntrance: 3000, westEntrance: 3900, total: 17000 },
  { time: '18:30', northEntrance: 4900, southEntrance: 5400, eastEntrance: 3200, westEntrance: 4000, total: 17500 },
  { time: '19:00', northEntrance: 5000, southEntrance: 5500, eastEntrance: 3500, westEntrance: 4100, total: 18100 },
];

export const hourlyAttendance = [
  { hour: '14:00', attendance: 5000 },
  { hour: '14:30', attendance: 12000 },
  { hour: '15:00', attendance: 22000 },
  { hour: '15:30', attendance: 35000 },
  { hour: '16:00', attendance: 48000 },
  { hour: '16:30', attendance: 55000 },
  { hour: '17:00', attendance: 62000 },
  { hour: '17:30', attendance: 68000 },
  { hour: '18:00', attendance: 72000 },
  { hour: '18:30', attendance: 76000 },
  { hour: '19:00', attendance: 82500 },
];

export const languageOptions = [
  { code: 'en', name: 'English', greeting: 'Hello! How can I help you today?' },
  { code: 'es', name: 'Español', greeting: '¡Hola! ¿Cómo puedo ayudarte hoy?' },
  { code: 'fr', name: 'Français', greeting: 'Bonjour! Comment puis-je vous aider aujourd\'hui?' },
  { code: 'de', name: 'Deutsch', greeting: 'Hallo! Wie kann ich Ihnen heute helfen?' },
  { code: 'pt', name: 'Português', greeting: 'Olá! Como posso ajudá-lo hoje?' },
  { code: 'ar', name: 'العربية', greeting: 'مرحباً! كيف يمكنني مساعدتك اليوم؟' },
  { code: 'ja', name: '日本語', greeting: 'こんにちは！今日はどのようにお手伝いできますか？' },
  { code: 'ko', name: '한국어', greeting: '안녕하세요! 오늘 어떻게 도와드릴까요?' },
  { code: 'zh', name: '中文', greeting: '您好！今天我能为您做些什么？' },
] as const;
