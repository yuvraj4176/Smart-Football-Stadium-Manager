import { create } from 'zustand';
import type { AIChatMessage, CrowdAlert, Incident, Language, UserPreferences } from '@/types';
import {
  crowdAlerts,
  incidents,
  languageOptions,
  stadiumZones,
  sustainabilityMetrics,
  transportRoutes,
  accessibilityServices,
  matchEvents,
  weatherData,
} from '@/data/stadiumData';
import { generateStadiumResponse } from '@/lib/ai';

interface StadiumState {
  // User preferences
  preferences: UserPreferences;
  setPreferences: (prefs: Partial<UserPreferences>) => void;

  // AI Chat
  chatMessages: AIChatMessage[];
  sendMessage: (content: string, language?: Language) => void;
  clearChat: () => void;
  isAIThinking: boolean;

  // Alerts
  alerts: CrowdAlert[];
  resolveAlert: (id: string) => void;

  // Incidents
  incidents: Incident[];
  updateIncidentStatus: (id: string, status: Incident['status']) => void;

  // Data
  zones: typeof stadiumZones;
  transport: typeof transportRoutes;
  sustainability: typeof sustainabilityMetrics;
  accessibility: typeof accessibilityServices;
  matches: typeof matchEvents;
  weather: typeof weatherData;
}

// Hardcoded AI removed in favor of real GenAI integration

export const useStadiumStore = create<StadiumState>((set, get) => ({
  preferences: {
    language: 'en',
    accessibilityMode: false,
    notificationsEnabled: true,
    theme: 'light',
  },
  setPreferences: (prefs) =>
    set((state) => ({
      preferences: { ...state.preferences, ...prefs },
    })),

  chatMessages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: languageOptions[0].greeting,
      timestamp: new Date(),
      language: 'en',
    },
  ],
  isAIThinking: false,

  sendMessage: async (content, language = 'en') => {
    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content,
      timestamp: new Date(),
      language,
    };

    set((state) => ({
      chatMessages: [...state.chatMessages, userMsg],
      isAIThinking: true,
    }));

    // Fetch context from current state
    const currentState = get();
    const context = {
      alerts: currentState.alerts,
      weather: currentState.weather,
      zones: currentState.zones,
      transport: currentState.transport,
    };

    const responseText = await generateStadiumResponse(content, context, language);

    const aiMsg: AIChatMessage = {
      id: `msg-${Date.now()}-ai`,
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
      language,
    };

    set((state) => ({
      chatMessages: [...state.chatMessages, aiMsg],
      isAIThinking: false,
    }));
  },

  clearChat: () =>
    set({
      chatMessages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: languageOptions[0].greeting,
          timestamp: new Date(),
          language: 'en',
        },
      ],
    }),

  alerts: crowdAlerts,
  resolveAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, resolved: true } : a
      ),
    })),

  incidents: incidents,
  updateIncidentStatus: (id, status) =>
    set((state) => ({
      incidents: state.incidents.map((i) =>
        i.id === id ? { ...i, status } : i
      ),
    })),

  zones: stadiumZones,
  transport: transportRoutes,
  sustainability: sustainabilityMetrics,
  accessibility: accessibilityServices,
  matches: matchEvents,
  weather: weatherData,
}));
