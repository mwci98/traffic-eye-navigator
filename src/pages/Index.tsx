
import { 
  Car, Camera, AlertTriangle, 
  MessageSquare, TrendingUp, BarChart3 
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import DataCard from '@/components/dashboard/DataCard';
import Map from '@/components/dashboard/Map';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Mock data
const violationData = [
  { name: 'Speeding', value: 35 },
  { name: 'Wrong Way', value: 15 },
  { name: 'Red Light', value: 30 },
  { name: 'Parking', value: 20 }
];

const COLORS = ['#0ea5e9', '#f97316', '#ef4444', '#10b981'];

const trafficVolumeData = [
  { time: '6AM', volume: 120 },
  { time: '8AM', volume: 300 },
  { time: '10AM', volume: 200 },
  { time: '12PM', volume: 150 },
  { time: '2PM', volume: 180 },
  { time: '4PM', volume: 250 },
  { time: '6PM', volume: 310 },
  { time: '8PM', volume: 140 },
];

const recentViolations = [
  { id: '1', type: 'Speeding', location: 'Main St', time: '10:23 AM' },
  { id: '2', type: 'Red Light', location: 'Park Ave', time: '9:45 AM' },
  { id: '3', type: 'Wrong Way', location: 'Broadway', time: '8:30 AM' },
];

export default function Index() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Traffic Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Vehicles Detected"
          value="2,543"
          icon={<Car className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true, label: "vs yesterday" }}
        />
        <StatCard 
          title="Active Cameras"
          value="24"
          icon={<Camera className="h-5 w-5" />}
          trend={{ value: 2, isPositive: false, label: "since last hour" }}
        />
        <StatCard 
          title="Violations Today"
          value="57"
          icon={<AlertTriangle className="h-5 w-5" />}
          trend={{ value: 5, isPositive: false, label: "vs yesterday" }}
        />
        <StatCard 
          title="Voice Commands"
          value="134"
          icon={<MessageSquare className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true, label: "vs yesterday" }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Map />
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <DataCard title="Traffic Violations" className="h-full">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={violationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {violationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {violationData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </DataCard>
            
            <DataCard 
              title="Traffic Volume" 
              className="h-full"
              headerAction={
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  15% more than usual
                </div>
              }
            >
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Bar dataKey="volume" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DataCard>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DataCard 
          title="Recent Violations" 
          headerAction={
            <button className="text-xs text-traffic-blue hover:underline">
              View all
            </button>
          }
        >
          <div className="space-y-4">
            {recentViolations.map((violation) => (
              <div key={violation.id} className="flex items-center justify-between pb-3 border-b border-border/50 last:border-0">
                <div>
                  <div className="flex items-center">
                    <AlertTriangle 
                      className={`h-4 w-4 mr-2 ${
                        violation.type === 'Speeding' ? 'text-traffic-blue' : 
                        violation.type === 'Red Light' ? 'text-traffic-red' : 
                        'text-warning'
                      }`} 
                    />
                    <p className="font-medium">{violation.type}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {violation.location} - {violation.time}
                  </p>
                </div>
                <button className="text-xs text-traffic-blue hover:underline">
                  Details
                </button>
              </div>
            ))}
          </div>
        </DataCard>
        
        <DataCard 
          title="Camera Status" 
          className="lg:col-span-2"
          headerAction={
            <div className="flex gap-4">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-traffic-green mr-1"></span>
                <span className="text-xs">Online (24)</span>
              </div>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-warning mr-1"></span>
                <span className="text-xs">Warning (3)</span>
              </div>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-traffic-red mr-1"></span>
                <span className="text-xs">Offline (2)</span>
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card rounded-md aspect-video relative overflow-hidden">
                <img 
                  src={`/lovable-uploads/${i <= 2 ? 'd7361a54-ca4f-4d9a-b54a-17eb3244707d.png' : 'a15c7fc2-0f10-4315-81f6-8d5d480149e4.png'}`}
                  alt={`Camera feed ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-xs text-white font-medium">Camera {i}</p>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="h-2 w-2 rounded-full bg-traffic-green"></span>
                </div>
              </div>
            ))}
          </div>
        </DataCard>
      </div>
    </div>
  );
}
