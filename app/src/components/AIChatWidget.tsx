import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Trash2, Bot, User } from 'lucide-react';
import { useStadiumStore } from '@/hooks/useStadiumStore';
import type { Language } from '@/types';
import { languageOptions } from '@/data/stadiumData';

interface AIChatWidgetProps {
  currentLanguage: Language;
}

export function AIChatWidget({ currentLanguage }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMessages = useStadiumStore((s) => s.chatMessages);
  const isAIThinking = useStadiumStore((s) => s.isAIThinking);
  const sendMessage = useStadiumStore((s) => s.sendMessage);
  const clearChat = useStadiumStore((s) => s.clearChat);

  const currentLang = languageOptions.find((l) => l.code === currentLanguage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAIThinking]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || isAIThinking) return;
    sendMessage(input.trim(), currentLanguage);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    { key: 'directions', label: 'Get Directions', prompt: 'How do I get to my seat?' },
    { key: 'food', label: 'Find Food', prompt: 'Where can I find food nearby?' },
    { key: 'crowd', label: 'Crowd Status', prompt: 'How crowded is the stadium?' },
    { key: 'weather', label: 'Weather', prompt: 'What is the weather like?' },
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[540px] w-[400px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 bg-emerald-600 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">AI Stadium Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-xs text-emerald-100">
                    {isAIThinking ? 'Thinking...' : 'Online'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="rounded-lg p-1.5 text-emerald-100 hover:bg-white/20 hover:text-white transition-colors"
                title="New Chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-emerald-100 hover:bg-white/20 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === 'user' ? 'bg-zinc-800' : 'bg-emerald-100'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <Bot className="h-3.5 w-3.5 text-emerald-600" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-zinc-800 text-white rounded-tr-sm'
                      : 'bg-zinc-100 text-zinc-700 rounded-tl-sm border border-zinc-200'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isAIThinking && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <Bot className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-zinc-100 border border-zinc-200 px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {chatMessages.length <= 1 && (
            <div className="border-t border-zinc-100 px-4 py-2.5">
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2">Quick Questions</p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((qp) => (
                  <button
                    key={qp.key}
                    onClick={() => {
                      sendMessage(qp.prompt, currentLanguage);
                    }}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-zinc-200 px-4 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask in ${currentLang?.name || 'English'}...`}
                className="flex-1 bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isAIThinking}
                className="rounded-lg bg-emerald-600 p-1.5 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-zinc-400">
              AI-powered by Stadium Intelligence Engine
            </p>
          </div>
        </div>
      )}
    </>
  );
}
