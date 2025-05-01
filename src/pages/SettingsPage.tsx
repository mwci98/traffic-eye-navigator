
import { useState } from 'react';
import { Save, BellRing, User, Settings, MapPin } from 'lucide-react';

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'Traffic Eye Navigator',
    timezone: 'UTC-8',
    language: 'en-US',
    dataRetention: '30',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    violationAlerts: true,
    systemAlerts: true,
    maintenanceAlerts: true,
    dailyReports: false,
    weeklyReports: true,
  });
  
  const handleGeneralSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.checked,
    });
  };
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-traffic-blue" />
                <h3 className="font-medium">General Settings</h3>
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">System Name</label>
                  <input
                    type="text"
                    name="systemName"
                    value={generalSettings.systemName}
                    onChange={handleGeneralSettingChange}
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-traffic-blue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Timezone</label>
                  <select
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralSettingChange}
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-traffic-blue"
                  >
                    <option value="UTC-8">UTC-8 (Pacific Time)</option>
                    <option value="UTC-5">UTC-5 (Eastern Time)</option>
                    <option value="UTC-6">UTC-6 (Central Time)</option>
                    <option value="UTC-7">UTC-7 (Mountain Time)</option>
                    <option value="UTC">UTC (Universal Time)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Language</label>
                  <select
                    name="language"
                    value={generalSettings.language}
                    onChange={handleGeneralSettingChange}
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-traffic-blue"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="zh-CN">Chinese (Simplified)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Data Retention (days)</label>
                  <input
                    type="number"
                    name="dataRetention"
                    value={generalSettings.dataRetention}
                    onChange={handleGeneralSettingChange}
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-traffic-blue"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button className="px-4 py-2 bg-traffic-blue text-white rounded-md flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center">
                <BellRing className="h-5 w-5 mr-2 text-traffic-blue" />
                <h3 className="font-medium">Notification Settings</h3>
              </div>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Alert Channels</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                        className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                      />
                      <span>Email Notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onChange={handleNotificationChange}
                        className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                      />
                      <span>SMS Notifications</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Alert Types</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="violationAlerts"
                        checked={notificationSettings.violationAlerts}
                        onChange={handleNotificationChange}
                        className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                      />
                      <span>Traffic Violations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="systemAlerts"
                        checked={notificationSettings.systemAlerts}
                        onChange={handleNotificationChange}
                        className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                      />
                      <span>System Alerts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="maintenanceAlerts"
                        checked={notificationSettings.maintenanceAlerts}
                        onChange={handleNotificationChange}
                        className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                      />
                      <span>Maintenance Alerts</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Reports</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="dailyReports"
                      checked={notificationSettings.dailyReports}
                      onChange={handleNotificationChange}
                      className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                    />
                    <span>Daily Reports</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="weeklyReports"
                      checked={notificationSettings.weeklyReports}
                      onChange={handleNotificationChange}
                      className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                    />
                    <span>Weekly Reports</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-6 flex justify-end">
                <button className="px-4 py-2 bg-traffic-blue text-white rounded-md flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-traffic-blue" />
                <h3 className="font-medium">Map Settings</h3>
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Default Map Center</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Latitude"
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-traffic-blue"
                  />
                  <input
                    type="text"
                    placeholder="Longitude"
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-traffic-blue"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Default Zoom Level</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  defaultValue="12"
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>City</span>
                  <span>Street</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Map Style</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-traffic-blue rounded-md p-2 text-center cursor-pointer">
                    <div className="h-16 bg-secondary rounded-md mb-2"></div>
                    <span className="text-xs">Default</span>
                  </div>
                  <div className="border border-border rounded-md p-2 text-center cursor-pointer">
                    <div className="h-16 bg-[#333] rounded-md mb-2"></div>
                    <span className="text-xs">Satellite</span>
                  </div>
                  <div className="border border-border rounded-md p-2 text-center cursor-pointer">
                    <div className="h-16 bg-[#111] rounded-md mb-2"></div>
                    <span className="text-xs">Dark</span>
                  </div>
                  <div className="border border-border rounded-md p-2 text-center cursor-pointer">
                    <div className="h-16 bg-[#eee] rounded-md mb-2"></div>
                    <span className="text-xs">Light</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button className="px-4 py-2 bg-traffic-blue text-white rounded-md flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Map Settings
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-traffic-blue" />
                <h3 className="font-medium">User Profile</h3>
              </div>
            </div>
            
            <div className="p-5 text-center">
              <div className="h-24 w-24 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-muted-foreground">Administrator</p>
              
              <div className="mt-6 space-y-3">
                <div className="text-left">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-traffic-blue"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-traffic-blue"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 555-123-4567"
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:outline-none focus:ring-2 focus:ring-traffic-blue"
                  />
                </div>
              </div>
              
              <div className="mt-6 text-left">
                <h4 className="font-medium mb-3">Security</h4>
                <button className="w-full py-2 bg-secondary hover:bg-secondary/70 rounded-md">
                  Change Password
                </button>
              </div>
              
              <div className="mt-4 text-left">
                <button className="w-full py-2 bg-traffic-blue text-white rounded-md flex items-center justify-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border/50">
              <h3 className="font-medium">System Information</h3>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Version</span>
                <span className="text-sm font-medium">v2.5.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Update</span>
                <span className="text-sm font-medium">May 1, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Server Status</span>
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-traffic-green mr-1.5"></span>
                  <span className="text-sm font-medium">Online</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm font-medium">76% (3.8TB/5TB)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">API Status</span>
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-traffic-green mr-1.5"></span>
                  <span className="text-sm font-medium">Operational</span>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="w-full py-2 bg-secondary hover:bg-secondary/70 rounded-md">
                  Check for Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
