import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { AIChatWidget } from '@/components/AIChatWidget';
import { Dashboard } from '@/sections/Dashboard';
import { CrowdManagement } from '@/sections/CrowdManagement';
import { NavigationMap } from '@/sections/NavigationMap';
import { TransportHub } from '@/sections/TransportHub';
import { SustainabilityTracker } from '@/sections/SustainabilityTracker';
import { AccessibilityHub } from '@/sections/AccessibilityHub';
import { OperationsCenter } from '@/sections/OperationsCenter';
import type { Language } from '@/types';

export type ActiveSection =
  | 'dashboard'
  | 'crowd'
  | 'navigation'
  | 'transport'
  | 'sustainability'
  | 'accessibility'
  | 'operations';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'crowd':
        return <CrowdManagement />;
      case 'navigation':
        return <NavigationMap />;
      case 'transport':
        return <TransportHub />;
      case 'sustainability':
        return <SustainabilityTracker />;
      case 'accessibility':
        return <AccessibilityHub />;
      case 'operations':
        return <OperationsCenter />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100 font-sans">
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderSection()}
        </main>
      </div>
      <AIChatWidget currentLanguage={currentLanguage} />
    </div>
  );
}

export default App;
