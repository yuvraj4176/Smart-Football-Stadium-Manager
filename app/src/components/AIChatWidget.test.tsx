import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AIChatWidget } from './AIChatWidget';
import { useStadiumStore } from '@/hooks/useStadiumStore';

// Mock the zustand store to control state
vi.mock('@/hooks/useStadiumStore', () => {
  const actual = vi.importActual('@/hooks/useStadiumStore');
  return {
    ...actual,
    useStadiumStore: vi.fn(),
  };
});

describe('AIChatWidget', () => {
  const mockSendMessage = vi.fn();
  const mockClearChat = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useStadiumStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) => {
      const state = {
        chatMessages: [
          { id: '1', role: 'assistant', content: 'Hello there!', timestamp: new Date(), language: 'en' },
        ],
        isAIThinking: false,
        sendMessage: mockSendMessage,
        clearChat: mockClearChat,
      };
      return selector(state);
    });
  });

  it('renders chat widget closed initially', () => {
    render(<AIChatWidget currentLanguage="en" />);
    const floatingButton = screen.getByRole('button');
    expect(floatingButton).toBeInTheDocument();
  });

  it('opens chat window when floating button is clicked', () => {
    render(<AIChatWidget currentLanguage="en" />);
    const floatingButton = screen.getByRole('button');
    fireEvent.click(floatingButton);

    const chatHeader = screen.getByText('AI Stadium Assistant');
    expect(chatHeader).toBeInTheDocument();
  });

  it('can send a message using the input and send button', () => {
    render(<AIChatWidget currentLanguage="en" />);
    // Open chat
    fireEvent.click(screen.getByRole('button'));

    const input = screen.getByPlaceholderText('Ask in English...');
    const sendButton = screen.getAllByRole('button').find(b => b.innerHTML.includes('lucide-send'));

    // Send button should be disabled initially when input is empty
    expect(sendButton).toBeDisabled();

    // Type a message
    fireEvent.change(input, { target: { value: 'Where is the food?' } });
    expect(sendButton).not.toBeDisabled();

    // Send it
    fireEvent.click(sendButton!);
    expect(mockSendMessage).toHaveBeenCalledWith('Where is the food?', 'en');
  });

  it('disables input sending when AI is thinking', () => {
    // Override mock to simulate AI thinking
    (useStadiumStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) => {
      const state = {
        chatMessages: [],
        isAIThinking: true, // Thinking state
        sendMessage: mockSendMessage,
        clearChat: mockClearChat,
      };
      return selector(state);
    });

    render(<AIChatWidget currentLanguage="en" />);
    fireEvent.click(screen.getByRole('button')); // Open chat

    const sendButton = screen.getAllByRole('button').find(b => b.innerHTML.includes('lucide-send'));
    
    const input = screen.getByPlaceholderText('Ask in English...');
    fireEvent.change(input, { target: { value: 'Is it disabled?' } });

    // Should still be disabled because AI is thinking
    expect(sendButton).toBeDisabled();
  });
});
