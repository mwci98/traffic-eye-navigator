
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Map, 
  FileSearch, 
  AlertTriangle, 
  MessageSquare, 
  Camera, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Live Map',
    href: '/live-map',
    icon: Map,
  },
  {
    title: 'ANPR Logs',
    href: '/anpr',
    icon: FileSearch,
  },
  {
    title: 'Violations',
    href: '/violations',
    icon: AlertTriangle,
  },
  {
    title: 'Voice Assistant',
    href: '/voice',
    icon: MessageSquare,
  },
  {
    title: 'Cameras',
    href: '/cameras',
    icon: Camera,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export default function SidebarNav() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        'h-screen fixed left-0 top-0 z-40 flex flex-col bg-sidebar border-r border-border transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-traffic-blue to-traffic-cyan text-transparent bg-clip-text">
            TrafficEye
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 py-6 overflow-y-auto scroll-hidden">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-traffic-blue to-traffic-cyan flex items-center justify-center">
            <span className="text-xs font-bold">AI</span>
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">AI System</p>
              <p className="text-xs text-sidebar-foreground/60">Active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
