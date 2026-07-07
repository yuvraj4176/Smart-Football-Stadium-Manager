import { Bell, Globe, Menu, Search, Shield } from 'lucide-react';
import { useState } from 'react';
import { languageOptions } from '@/data/stadiumData';
import type { Language } from '@/types';

interface TopBarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onToggleSidebar: () => void;
}

export function TopBar({ currentLanguage, onLanguageChange, onToggleSidebar }: TopBarProps) {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const currentLang = languageOptions.find((l) => l.code === currentLanguage);

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search stadium, sections, services..."
            className="h-9 w-64 rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-4 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <Globe className="h-4 w-4 text-zinc-500" />
            <span className="hidden sm:inline">{currentLang?.name || 'English'}</span>
          </button>
          {showLangDropdown && (
            <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code as Language);
                    setShowLangDropdown(false);
                  }}
                  className={`flex w-full items-center px-4 py-2 text-sm transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-lg border border-zinc-200 bg-white py-2 shadow-lg">
              <div className="border-b border-zinc-100 px-4 pb-2">
                <h3 className="text-sm font-semibold text-zinc-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  <div>
                    <p className="text-sm text-zinc-800">Lower Bowl South approaching max capacity</p>
                    <p className="text-xs text-zinc-500 mt-0.5">2 min ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <div>
                    <p className="text-sm text-zinc-800">Concession A queue exceeds 15 min</p>
                    <p className="text-xs text-zinc-500 mt-0.5">8 min ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors">
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm text-zinc-800">Match kickoff in 30 minutes</p>
                    <p className="text-xs text-zinc-500 mt-0.5">15 min ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security Badge */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5">
          <Shield className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">Operations Active</span>
        </div>
      </div>
    </header>
  );
}
