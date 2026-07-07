import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Map,
  Bus,
  Leaf,
  Accessibility,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Trophy,
} from 'lucide-react';
import type { ActiveSection } from '@/App';

interface SidebarProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems: { id: ActiveSection; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'crowd', label: 'Crowd Mgmt', icon: Users },
  { id: 'navigation', label: 'Navigation', icon: Map },
  { id: 'transport', label: 'Transport', icon: Bus },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  { id: 'operations', label: 'Operations', icon: ShieldAlert },
];

export function Sidebar({ activeSection, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col border-r border-zinc-200 bg-white transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}
          style={{ minWidth: collapsed ? 'auto' : undefined }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-zinc-900 leading-tight truncate">FIFA 2026</h1>
              <p className="text-[11px] text-zinc-500 leading-tight truncate">Smart Stadium</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
                collapsed && 'justify-center px-2'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 shrink-0 transition-colors',
                  isActive ? 'text-emerald-600' : 'text-zinc-400 group-hover:text-zinc-600'
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-2">
        <button
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
