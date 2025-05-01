
import { useState } from 'react';
import { 
  AlertTriangle, Calendar, Filter, FilterX, Maximize2
} from 'lucide-react';
import DataCard from '@/components/dashboard/DataCard';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Mock data
const violationsByType = [
  { name: 'Speeding', value: 35 },
  { name: 'Red Light', value: 25 },
  { name: 'Wrong Way', value: 15 },
  { name: 'Parking', value: 10 },
  { name: 'Other', value: 15 }
];

const COLORS = ['#ef4444', '#f97316', '#0ea5e9', '#10b981', '#8b5cf6'];

const violationsByTime = [
  { time: '12 AM', count: 5 },
  { time: '3 AM', count: 3 },
  { time: '6 AM', count: 12 },
  { time: '9 AM', count: 25 },
  { time: '12 PM', count: 18 },
  { time: '3 PM', count: 23 },
  { time: '6 PM', count: 30 },
  { time: '9 PM', count: 15 },
];

const recentViolations = [
  { 
    id: '1', 
    type: 'Speeding', 
    location: 'Main St & 5th Ave', 
    time: '10:23 AM', 
    speed: '85 km/h',
    image: '/lovable-uploads/a15c7fc2-0f10-4315-81f6-8d5d480149e4.png'
  },
  { 
    id: '2', 
    type: 'Red Light', 
    location: 'Park Rd & Oak St', 
    time: '9:45 AM',
    speed: '32 km/h',
    image: '/lovable-uploads/55f1c2a4-f068-4339-b783-73cad694ba9f.png'
  },
  { 
    id: '3', 
    type: 'Wrong Way', 
    location: 'Broadway & 2nd Ave', 
    time: '9:15 AM',
    speed: '45 km/h',
    image: '/lovable-uploads/de36200e-2a40-41d1-9cc8-bb59c9f267e4.png'
  },
  { 
    id: '4', 
    type: 'Parking', 
    location: 'Market St & 10th Ave', 
    time: '8:30 AM',
    speed: '0 km/h',
    image: '/lovable-uploads/55f1c2a4-f068-4339-b783-73cad694ba9f.png'
  },
];

export default function ViolationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Traffic Violations</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="md:w-3/5 glass-card rounded-xl overflow-hidden">
          <div className="p-5 flex items-center justify-between border-b border-border/50">
            <h3 className="font-medium">Violation Map</h3>
            <div className="flex items-center gap-3">
              <button className="p-1.5 rounded-md hover:bg-secondary">
                <Maximize2 className="h-4 w-4" />
              </button>
              <button className="p-1.5 rounded-md hover:bg-secondary">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div 
            className="h-[400px] relative" 
            style={{
              backgroundImage: "url('/lovable-uploads/d7361a54-ca4f-4d9a-b54a-17eb3244707d.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Simulated violation markers */}
            <div className="absolute top-1/4 left-1/3 h-6 w-6 rounded-full bg-traffic-red/80 animate-pulse-glow"></div>
            <div className="absolute top-1/2 left-1/2 h-6 w-6 rounded-full bg-traffic-red/80 animate-pulse-glow"></div>
            <div className="absolute top-1/3 left-2/3 h-6 w-6 rounded-full bg-warning/80 animate-pulse-glow"></div>
            <div className="absolute top-2/3 left-1/4 h-6 w-6 rounded-full bg-traffic-red/80 animate-pulse-glow"></div>
          </div>
        </div>
        
        <div className="md:w-2/5 glass-card rounded-xl overflow-hidden">
          <div className="p-5 flex items-center justify-between border-b border-border/50">
            <h3 className="font-medium">Violations by Type</h3>
            <div className="flex items-center gap-1 text-xs">
              <button 
                className={`px-2 py-1 rounded-md ${dateRange === 'today' ? 'bg-traffic-blue text-white' : 'hover:bg-secondary'}`}
                onClick={() => setDateRange('today')}
              >
                Today
              </button>
              <button 
                className={`px-2 py-1 rounded-md ${dateRange === 'week' ? 'bg-traffic-blue text-white' : 'hover:bg-secondary'}`}
                onClick={() => setDateRange('week')}
              >
                Week
              </button>
              <button 
                className={`px-2 py-1 rounded-md ${dateRange === 'month' ? 'bg-traffic-blue text-white' : 'hover:bg-secondary'}`}
                onClick={() => setDateRange('month')}
              >
                Month
              </button>
            </div>
          </div>
          <div className="p-5">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={violationsByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {violationsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
              {violationsByType.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <DataCard 
          title="Violations by Time" 
          className="lg:col-span-2"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={violationsByTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DataCard>
        
        <DataCard 
          title="Violation Statistics" 
          headerAction={
            <button className="flex items-center text-xs text-traffic-blue hover:underline">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Today
            </button>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Violations</span>
              <span className="metric-value">57</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">High Priority</span>
              <span className="metric-value text-traffic-red">18</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Medium Priority</span>
              <span className="metric-value text-warning">25</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Low Priority</span>
              <span className="metric-value text-traffic-blue">14</span>
            </div>
          </div>
        </DataCard>
      </div>
      
      <DataCard 
        title="Recent Violations" 
        headerAction={
          <div className="flex items-center text-xs gap-4">
            <div className="flex items-center gap-1 bg-secondary/50 rounded-md overflow-hidden">
              <button 
                className={`px-3 py-1 ${activeTab === 'all' ? 'bg-traffic-blue text-white' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 ${activeTab === 'high' ? 'bg-traffic-red text-white' : ''}`}
                onClick={() => setActiveTab('high')}
              >
                High
              </button>
              <button 
                className={`px-3 py-1 ${activeTab === 'medium' ? 'bg-warning text-white' : ''}`}
                onClick={() => setActiveTab('medium')}
              >
                Medium
              </button>
              <button 
                className={`px-3 py-1 ${activeTab === 'low' ? 'bg-traffic-blue text-white' : ''}`}
                onClick={() => setActiveTab('low')}
              >
                Low
              </button>
            </div>
            
            <button>
              <FilterX className="h-4 w-4" />
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentViolations.map((violation) => (
            <div key={violation.id} className="bg-secondary/30 border border-border/50 rounded-md overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={violation.image} 
                  alt={`Violation ${violation.id}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div 
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                      violation.type === 'Speeding' ? 'bg-traffic-red/30 text-traffic-red' :
                      violation.type === 'Red Light' ? 'bg-warning/30 text-warning' :
                      'bg-traffic-blue/30 text-traffic-blue'
                    }`}
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {violation.type}
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{violation.location}</span>
                  <span className="text-xs text-muted-foreground">{violation.time}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Speed: {violation.speed}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DataCard>
    </div>
  );
}
