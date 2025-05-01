
import { useState } from 'react';
import { 
  Layers, ZoomIn, ZoomOut, Map as MapIcon, 
  Sliders, Camera, Car, Eye, EyeOff 
} from 'lucide-react';

export default function LiveMap() {
  const [mapType, setMapType] = useState<'satellite' | 'streets'>('satellite');
  const [layers, setLayers] = useState({
    cameras: true,
    vehicles: true,
    heatmap: true,
    alerts: true,
  });
  
  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Live Traffic Map</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex rounded-md overflow-hidden border border-border">
            <button
              className={`px-3 py-1.5 text-sm font-medium flex items-center ${
                mapType === 'satellite' 
                  ? 'bg-traffic-blue text-white' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
              onClick={() => setMapType('satellite')}
            >
              <MapIcon className="h-4 w-4 mr-1" />
              Satellite
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium flex items-center ${
                mapType === 'streets' 
                  ? 'bg-traffic-blue text-white' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
              onClick={() => setMapType('streets')}
            >
              <MapIcon className="h-4 w-4 mr-1" />
              Streets
            </button>
          </div>
          
          <button className="p-2 rounded-md bg-secondary hover:bg-secondary/80">
            <Sliders className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="glass-card rounded-xl overflow-hidden mb-6 relative">
        {/* Map Container */}
        <div 
          className="h-[calc(100vh-200px)] w-full relative"
          style={{
            backgroundImage: `url('/lovable-uploads/${mapType === 'satellite' ? 'd7361a54-ca4f-4d9a-b54a-17eb3244707d.png' : 'af7e2772-90fa-49c0-b19f-d94e61c6b48e.png'}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Map controls */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-10">
            <button className="p-2 rounded-md bg-black/50 text-white hover:bg-black/70 transition-colors">
              <ZoomIn className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-md bg-black/50 text-white hover:bg-black/70 transition-colors">
              <ZoomOut className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-md bg-black/50 text-white hover:bg-black/70 transition-colors">
              <Layers className="h-5 w-5" />
            </button>
          </div>
          
          {/* Layer Controls */}
          <div className="absolute top-8 left-8 glass-card rounded-md p-3 z-10">
            <h3 className="text-sm font-medium mb-3">Map Layers</h3>
            <div className="space-y-2">
              <button 
                className={`flex items-center justify-between w-full px-3 py-1.5 text-sm rounded-md ${
                  layers.cameras 
                    ? 'bg-traffic-blue/20 text-white' 
                    : 'bg-secondary/50 text-muted-foreground'
                }`}
                onClick={() => toggleLayer('cameras')}
              >
                <div className="flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Cameras
                </div>
                {layers.cameras ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
              <button 
                className={`flex items-center justify-between w-full px-3 py-1.5 text-sm rounded-md ${
                  layers.vehicles 
                    ? 'bg-traffic-blue/20 text-white' 
                    : 'bg-secondary/50 text-muted-foreground'
                }`}
                onClick={() => toggleLayer('vehicles')}
              >
                <div className="flex items-center">
                  <Car className="h-4 w-4 mr-2" />
                  Vehicles
                </div>
                {layers.vehicles ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
              <button 
                className={`flex items-center justify-between w-full px-3 py-1.5 text-sm rounded-md ${
                  layers.heatmap 
                    ? 'bg-traffic-blue/20 text-white' 
                    : 'bg-secondary/50 text-muted-foreground'
                }`}
                onClick={() => toggleLayer('heatmap')}
              >
                <div className="flex items-center">
                  <MapIcon className="h-4 w-4 mr-2" />
                  Traffic Density
                </div>
                {layers.heatmap ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
              <button 
                className={`flex items-center justify-between w-full px-3 py-1.5 text-sm rounded-md ${
                  layers.alerts 
                    ? 'bg-traffic-blue/20 text-white' 
                    : 'bg-secondary/50 text-muted-foreground'
                }`}
                onClick={() => toggleLayer('alerts')}
              >
                <div className="flex items-center">
                  <MapIcon className="h-4 w-4 mr-2" />
                  Alerts
                </div>
                {layers.alerts ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl p-5 lg:col-span-1">
          <h3 className="text-sm font-medium mb-4">Traffic Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Main Street</span>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-traffic-green mr-1"></span>
                <span className="text-xs">Clear</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Highway 101</span>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-warning mr-1"></span>
                <span className="text-xs">Moderate</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Downtown</span>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-traffic-red mr-1"></span>
                <span className="text-xs">Heavy</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Industrial Zone</span>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-traffic-green mr-1"></span>
                <span className="text-xs">Clear</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Park Avenue</span>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-warning mr-1"></span>
                <span className="text-xs">Moderate</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Active Incidents</h3>
            <span className="text-xs text-muted-foreground">Last updated: 2 min ago</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-traffic-red/20 flex items-center justify-center mr-3">
                  <Car className="h-4 w-4 text-traffic-red" />
                </div>
                <div>
                  <p className="font-medium">Accident</p>
                  <p className="text-xs text-muted-foreground">Highway 101, Mile 23</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">10:23 AM</p>
                <p className="text-xs text-muted-foreground">High Priority</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center mr-3">
                  <Camera className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Traffic Congestion</p>
                  <p className="text-xs text-muted-foreground">Downtown, Market Street</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">9:45 AM</p>
                <p className="text-xs text-muted-foreground">Medium Priority</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-traffic-blue/20 flex items-center justify-center mr-3">
                  <Car className="h-4 w-4 text-traffic-blue" />
                </div>
                <div>
                  <p className="font-medium">Roadwork</p>
                  <p className="text-xs text-muted-foreground">Bridge Street</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">Yesterday</p>
                <p className="text-xs text-muted-foreground">Low Priority</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
