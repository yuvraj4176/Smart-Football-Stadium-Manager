import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useStadiumStore } from './useStadiumStore';

// Mock the AI generation function to avoid real API calls during testing
vi.mock('@/lib/ai', () => ({
  generateStadiumResponse: vi.fn().mockResolvedValue('Mocked AI Response'),
}));

describe('useStadiumStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const store = useStadiumStore.getState();
    useStadiumStore.setState({
      ...store,
      chatMessages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Hello!',
          timestamp: new Date(),
          language: 'en',
        },
      ],
      alerts: [],
      incidents: [],
      preferences: {
        language: 'en',
        accessibilityMode: false,
        notificationsEnabled: true,
        theme: 'light',
      },
    });
  });

  it('should initialize with correct default preferences', () => {
    const state = useStadiumStore.getState();
    expect(state.preferences.language).toBe('en');
    expect(state.preferences.accessibilityMode).toBe(false);
  });

  it('should update preferences correctly', () => {
    useStadiumStore.getState().setPreferences({ accessibilityMode: true, language: 'es' });
    const state = useStadiumStore.getState();
    expect(state.preferences.accessibilityMode).toBe(true);
    expect(state.preferences.language).toBe('es');
  });

  it('should add user message and handle AI response asynchronously', async () => {
    const state = useStadiumStore.getState();
    expect(state.chatMessages.length).toBe(1);

    // Call sendMessage
    const promise = state.sendMessage('Where is the restroom?', 'en');
    
    // Immediately after calling, the user message should be added and isAIThinking should be true
    const intermediateState = useStadiumStore.getState();
    expect(intermediateState.chatMessages.length).toBe(2);
    expect(intermediateState.chatMessages[1].role).toBe('user');
    expect(intermediateState.chatMessages[1].content).toBe('Where is the restroom?');
    expect(intermediateState.isAIThinking).toBe(true);

    await promise;

    // After resolution, AI message should be added and isAIThinking should be false
    const finalState = useStadiumStore.getState();
    expect(finalState.chatMessages.length).toBe(3);
    expect(finalState.chatMessages[2].role).toBe('assistant');
    expect(finalState.chatMessages[2].content).toBe('Mocked AI Response');
    expect(finalState.isAIThinking).toBe(false);
  });

  it('should clear chat correctly', () => {
    useStadiumStore.getState().clearChat();
    const state = useStadiumStore.getState();
    expect(state.chatMessages.length).toBe(1);
    expect(state.chatMessages[0].id).toBe('welcome');
  });
});
