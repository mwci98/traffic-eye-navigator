
import { useState } from 'react';
import { 
  Search, Filter, Download, ChevronDown, 
  ArrowUpDown, SortAsc, SortDesc 
} from 'lucide-react';
import DataCard from '@/components/dashboard/DataCard';

type VehicleLog = {
  id: string;
  licensePlate: string;
  timestamp: string;
  location: string;
  violation?: string;
  image: string;
  speed: number;
};

// Mock data
const vehicleLogs: VehicleLog[] = [
  {
    id: '1',
    licensePlate: 'ABC1234',
    timestamp: '10:23 AM - May 1, 2025',
    location: 'Main St & 5th Ave',
    violation: 'Speeding',
    image: '/lovable-uploads/a15c7fc2-0f10-4315-81f6-8d5d480149e4.png',
    speed: 65,
  },
  {
    id: '2',
    licensePlate: 'XYZ9876',
    timestamp: '9:45 AM - May 1, 2025',
    location: 'Park Rd & Oak St',
    image: '/lovable-uploads/25ae4f3f-4ad7-4851-8b08-56e6967a8db0.png',
    speed: 32,
  },
  {
    id: '3',
    licensePlate: 'DEF5678',
    timestamp: '9:15 AM - May 1, 2025',
    location: 'Highway 101, Mile 23',
    violation: 'Red Light',
    image: '/lovable-uploads/55f1c2a4-f068-4339-b783-73cad694ba9f.png',
    speed: 28,
  },
  {
    id: '4',
    licensePlate: 'GHI9012',
    timestamp: '8:50 AM - May 1, 2025',
    location: 'Broadway & 2nd St',
    image: '/lovable-uploads/a15c7fc2-0f10-4315-81f6-8d5d480149e4.png',
    speed: 35,
  },
  {
    id: '5',
    licensePlate: 'JKL3456',
    timestamp: '8:30 AM - May 1, 2025',
    location: 'Market St & 10th Ave',
    violation: 'Wrong Way',
    image: '/lovable-uploads/de36200e-2a40-41d1-9cc8-bb59c9f267e4.png',
    speed: 45,
  },
];

export default function ANPRPage() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    violations: true,
    nonViolations: true,
    today: true,
    yesterday: true,
  });
  
  // Filter logs based on search and filters
  const filteredLogs = vehicleLogs.filter(log => {
    if (search && !log.licensePlate.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    if (log.violation && !filters.violations) {
      return false;
    }
    
    if (!log.violation && !filters.nonViolations) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">ANPR License Plate Logs</h1>
      
      <div className="glass-card rounded-xl p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search license plates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-md bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-traffic-blue"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="px-3 py-2 rounded-md bg-secondary/50 text-sm font-medium flex items-center hover:bg-secondary/70"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <button className="px-3 py-2 rounded-md bg-secondary/50 text-sm font-medium flex items-center hover:bg-secondary/70">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="p-4 mb-4 bg-secondary/30 rounded-md animate-slide-up">
            <h3 className="text-sm font-medium mb-3">Filter Options</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={filters.violations}
                  onChange={() => setFilters({...filters, violations: !filters.violations})}
                  className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                />
                <span>Violations</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={filters.nonViolations}
                  onChange={() => setFilters({...filters, nonViolations: !filters.nonViolations})}
                  className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                />
                <span>Non-Violations</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={filters.today}
                  onChange={() => setFilters({...filters, today: !filters.today})}
                  className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                />
                <span>Today</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={filters.yesterday}
                  onChange={() => setFilters({...filters, yesterday: !filters.yesterday})}
                  className="rounded border-gray-500 text-traffic-blue focus:ring-traffic-blue"
                />
                <span>Yesterday</span>
              </label>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center">
                    License Plate
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center">
                    Timestamp
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center">
                    Speed
                    <SortDesc className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center">
                    Violation
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Image
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-secondary/30">
                  <td className="px-4 py-4">
                    <div className="font-medium">{log.licensePlate}</div>
                  </td>
                  <td className="px-4 py-4 text-sm">{log.timestamp}</td>
                  <td className="px-4 py-4 text-sm">{log.location}</td>
                  <td className="px-4 py-4">
                    <div 
                      className={`font-mono text-sm ${
                        log.speed > 55 ? 'text-traffic-red' : 
                        log.speed > 45 ? 'text-warning' :
                        'text-muted-foreground'
                      }`}
                    >
                      {log.speed} km/h
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {log.violation ? (
                      <span 
                        className={`inline-flex px-2 py-0.5 text-xs rounded-full ${
                          log.violation === 'Speeding' ? 'bg-traffic-red/20 text-traffic-red' :
                          log.violation === 'Red Light' ? 'bg-warning/20 text-warning' :
                          'bg-traffic-blue/20 text-traffic-blue'
                        }`}
                      >
                        {log.violation}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-10 w-16 overflow-hidden rounded">
                      <img 
                        src={log.image} 
                        alt={`Vehicle ${log.licensePlate}`} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Showing {filteredLogs.length} of {vehicleLogs.length} results
          </span>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs rounded-md bg-secondary/50 hover:bg-secondary/70 disabled:opacity-50" disabled>
              Previous
            </button>
            <span className="flex items-center gap-1">
              <button className="h-8 w-8 flex items-center justify-center rounded-md bg-traffic-blue text-white">
                1
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-secondary/70">
                2
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-secondary/70">
                3
              </button>
            </span>
            <button className="px-3 py-1 text-xs rounded-md bg-secondary/50 hover:bg-secondary/70">
              Next
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DataCard 
          title="ANPR Statistics" 
          headerAction={
            <button className="text-xs text-traffic-blue hover:underline">
              Last 30 days
            </button>
          }
          className="lg:col-span-1"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Scans</span>
              <span className="metric-value">12,543</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Violations Detected</span>
              <span className="metric-value text-traffic-red">428</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Recognition Rate</span>
              <span className="metric-value">98.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">False Positives</span>
              <span className="metric-value">0.5%</span>
            </div>
          </div>
        </DataCard>
        
        <DataCard 
          title="Recent License Plate Captures"
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...vehicleLogs].splice(0, 5).map((log) => (
              <div key={log.id} className="rounded-md overflow-hidden bg-secondary/30 border border-border/50">
                <div className="aspect-video relative">
                  <img 
                    src={log.image} 
                    alt={`Vehicle ${log.licensePlate}`} 
                    className="h-full w-full object-cover"
                  />
                  {log.violation && (
                    <div className="absolute inset-0 bg-traffic-red/10 border border-traffic-red/20"></div>
                  )}
                </div>
                <div className="p-2">
                  <div className="text-sm font-medium">{log.licensePlate}</div>
                  <div className="text-xs text-muted-foreground truncate">{log.timestamp.split(' - ')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </DataCard>
      </div>
    </div>
  );
}
