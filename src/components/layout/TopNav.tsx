
import { useState } from 'react';
import { Bell, Search, User, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Speed Violation',
    message: 'New speed violation detected on Main Street',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    title: 'Camera Offline',
    message: 'Camera #12 is offline, maintenance required',
    time: '15 min ago',
    read: false,
  },
  {
    id: '3',
    title: 'System Update',
    message: 'System update completed successfully',
    time: '1 hour ago',
    read: true,
  },
];

export default function TopNav() {
  const [darkMode, setDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, we would also set a class on the html element
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-30 ml-64 h-16 bg-background/70 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-64 rounded-md bg-secondary/50 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-traffic-blue"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-secondary"
          >
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-secondary relative"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-traffic-red text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg border border-border shadow-lg animate-fade-in z-50">
                <div className="flex items-center justify-between p-3 border-b border-border">
                  <h3 className="font-medium">Notifications</h3>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-traffic-blue hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-sm text-center text-muted-foreground">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'p-3 border-b border-border hover:bg-secondary/50 cursor-pointer',
                          notification.read ? 'opacity-70' : ''
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{notification.message}</p>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-traffic-blue mt-1" />
                        )}
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 text-center border-t border-border">
                  <button className="text-sm text-traffic-blue hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center cursor-pointer">
            <User size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
