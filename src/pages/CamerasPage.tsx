
import { useState } from 'react';
import { 
  Search, Filter, LayoutGrid, 
  List, ChevronDown, ArrowUpDown, 
  Grid, Map as MapIcon
} from 'lucide-react';
import CameraFeed from '@/components/dashboard/CameraFeed';

type Camera = {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastActive: string;
  image: string;
};

// Mock camera data
const cameras: Camera[] = [
  {
    id: 'CAM-001',
    name: 'Main Street Intersection',
    location: 'Main St & 5th Ave',
    status: 'online',
    lastActive: 'Now',
    image: '/lovable-uploads/d7361a54-ca4f-4d9a-b54a-17eb3244707d.png',
  },
  {
    id: 'CAM-002',
    name: 'Highway 101 - North',
    location: 'Highway 101, Mile 23',
    status: 'online',
    lastActive: 'Now',
    image: '/lovable-uploads/a15c7fc2-0f10-4315-81f6-8d5d480149e4.png',
  },
  {
    id: 'CAM-003',
    name: 'Downtown East',
    location: 'Market St & Broadway',
    status: 'warning',
    lastActive: '5 min ago',
    image: '/lovable-uploads/25ae4f3f-4ad7-4851-8b08-56e6967a8db0.png',
  },
  {
    id: 'CAM-004',
    name: 'Park Road',
    location: 'Central Park, East Entrance',
    status: 'offline',
    lastActive: '1 hour ago',
    image: '/lovable-uploads/de36200e-2a40-41d1-9cc8-bb59c9f267e4.png',
  },
  {
    id: 'CAM-005',
    name: 'Industrial Zone',
    location: 'Industrial Park',
    status: 'online',
    lastActive: 'Now',
    image: '/lovable-uploads/af7e2772-90fa-49c0-b19f-d94e61c6b48e.png',
  },
  {
    id: 'CAM-006',
    name: 'School Zone',
    location: 'Lincoln Elementary',
    status: 'online',
    lastActive: 'Now',
    image: '/lovable-uploads/55f1c2a4-f068-4339-b783-73cad694ba9f.png',
  },
  {
    id: 'CAM-007',
    name: 'Shopping Mall',
    location: 'City Center Mall',
    status: 'online',
    lastActive: 'Now',
    image: '/lovable-uploads/a15c7fc2-0f10-4315-81f6-8d5d480149e4.png',
  },
  {
    id: 'CAM-008',
    name: 'Railway Crossing',
    location: 'Main St & Railway',
    status: 'warning',
    lastActive: '10 min ago',
    image: '/lovable-uploads/d7361a54-ca4f-4d9a-b54a-17eb3244707d.png',
  },
];

type ViewMode = 'grid' | 'list' | 'map';

export default function CamerasPage() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    online: true,
    warning: true,
    offline: true,
  });
  
  // Filter cameras based on search and filters
  const filteredCameras = cameras.filter(camera => {
    if (search && !camera.name.toLowerCase().includes(search.toLowerCase()) &&
        !camera.location.toLowerCase().includes(search.toLowerCase()) &&
        !camera.id.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    if (camera.status === 'online' && !filters.online) return false;
    if (camera.status === 'warning' && !filters.warning) return false;
    if (camera.status === 'offline' && !filters.offline) return false;
    
    return true;
  });
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Traffic Cameras</h1>
      
      <div className="glass-card rounded-xl p-5 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cameras by name, location or ID..."
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
            
            <div className="flex border border-border rounded-md overflow-hidden">
              <button 
                className={`p-2 ${viewMode === 'grid' ? 'bg-traffic-blue text-white' : 'bg-secondary/50 hover:bg-secondary/70'}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button 
                className={`p-2 ${viewMode === 'list' ? 'bg-traffic-blue text-white' : 'bg-secondary/50 hover:bg-secondary/70'}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
              <button 
                className={`p-2 ${viewMode === 'map' ? 'bg-traffic-blue text-white' : 'bg-secondary/50 hover:bg-secondary/70'}`}
                onClick={() => setViewMode('map')}
                title="Map View"
              >
                <MapIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {showFilters && (
          <div className="p-4 mb-4 bg-secondary/30 rounded-md animate-slide-up">
            <h3 className="text-sm font-medium mb-3">Camera Status</h3>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={filters.online}
                  onChange={() => setFilters({...filters, online: !filters.online})}
                  className="rounded border-gray-500 text-traffic-green focus:ring-traffic-green"
                />
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-traffic-green mr-1.5"></span>
                  <span>Online ({cameras.filter(c => c.status === 'online').length})</span>
                </div>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={filters.warning}
                  onChange={() => setFilters({...filters, warning: !filters.warning})}
                  className="rounded border-gray-500 text-warning focus:ring-warning"
                />
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-warning mr-1.5"></span>
                  <span>Warning ({cameras.filter(c => c.status === 'warning').length})</span>
                </div>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={filters.offline}
                  onChange={() => setFilters({...filters, offline: !filters.offline})}
                  className="rounded border-gray-500 text-traffic-red focus:ring-traffic-red"
                />
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-traffic-red mr-1.5"></span>
                  <span>Offline ({cameras.filter(c => c.status === 'offline').length})</span>
                </div>
              </label>
            </div>
          </div>
        )}
        
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCameras.map((camera) => (
              <CameraFeed
                key={camera.id}
                id={camera.id}
                name={camera.name}
                image={camera.image}
                status={camera.status}
              />
            ))}
          </div>
        )}
        
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center">
                      Camera
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Preview
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredCameras.map((camera) => (
                  <tr key={camera.id} className="hover:bg-secondary/30">
                    <td className="px-4 py-4">
                      <div className="font-medium">{camera.name}</div>
                      <div className="text-xs text-muted-foreground">{camera.id}</div>
                    </td>
                    <td className="px-4 py-4 text-sm">{camera.location}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <span 
                          className={`h-2 w-2 rounded-full mr-1.5 ${
                            camera.status === 'online' ? 'bg-traffic-green' :
                            camera.status === 'warning' ? 'bg-warning' :
                            'bg-traffic-red'
                          }`}
                        />
                        <span className="capitalize">{camera.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">{camera.lastActive}</td>
                    <td className="px-4 py-4">
                      <div className="h-12 w-20 overflow-hidden rounded">
                        <img 
                          src={camera.image} 
                          alt={`Camera ${camera.id}`} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {viewMode === 'map' && (
          <div 
            className="h-[500px] rounded-lg overflow-hidden relative"
            style={{
              backgroundImage: "url('/lovable-uploads/d7361a54-ca4f-4d9a-b54a-17eb3244707d.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Camera markers would go here, just mocking them for now */}
            <div className="absolute top-1/4 left-1/3 h-4 w-4 rounded-full bg-traffic-green border-2 border-white transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 h-4 w-4 rounded-full bg-traffic-green border-2 border-white transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/3 left-2/3 h-4 w-4 rounded-full bg-warning border-2 border-white transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-2/3 left-1/4 h-4 w-4 rounded-full bg-traffic-red border-2 border-white transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-traffic-green mr-1"></span>
            <span className="text-sm">Online: {cameras.filter(c => c.status === 'online').length}</span>
          </div>
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-warning mr-1"></span>
            <span className="text-sm">Warning: {cameras.filter(c => c.status === 'warning').length}</span>
          </div>
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-traffic-red mr-1"></span>
            <span className="text-sm">Offline: {cameras.filter(c => c.status === 'offline').length}</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Showing {filteredCameras.length} of {cameras.length} cameras
        </div>
      </div>
    </div>
  );
}
