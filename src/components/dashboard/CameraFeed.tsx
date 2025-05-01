
import { useState } from 'react';
import { AlertTriangle, Activity, Video, VideoOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type CameraFeedProps = {
  id: string;
  name: string;
  image: string;
  status: 'online' | 'offline' | 'warning';
  className?: string;
};

export default function CameraFeed({ id, name, image, status, className }: CameraFeedProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        'glass-card rounded-xl overflow-hidden relative transition-all duration-300',
        status === 'offline' && 'opacity-70',
        isHovered && 'scale-[1.02]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        {status === 'offline' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <VideoOff className="text-muted-foreground h-12 w-12" />
          </div>
        ) : (
          <>
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover" 
            />
            {status === 'warning' && (
              <div className="absolute inset-0 bg-warning/10 animate-pulse-glow"></div>
            )}
          </>
        )}
        
        <div className="absolute top-2 right-2 flex gap-1">
          {status === 'online' && (
            <span className="h-2 w-2 rounded-full bg-traffic-green animate-pulse"></span>
          )}
          {status === 'warning' && (
            <span className="h-2 w-2 rounded-full bg-warning animate-pulse"></span>
          )}
          {status === 'offline' && (
            <span className="h-2 w-2 rounded-full bg-traffic-red"></span>
          )}
        </div>
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 animate-fade-in">
            <button className="p-2 rounded-full bg-black/50 text-white hover:bg-traffic-blue/80 transition-colors">
              <Activity size={18} />
            </button>
            <button className="p-2 rounded-full bg-black/50 text-white hover:bg-traffic-blue/80 transition-colors">
              {status === 'offline' ? <Video size={18} /> : <VideoOff size={18} />}
            </button>
            <button className="p-2 rounded-full bg-black/50 text-white hover:bg-traffic-blue/80 transition-colors">
              <AlertTriangle size={18} />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">{name}</h3>
          <span className="text-xs text-muted-foreground">{id}</span>
        </div>
      </div>
    </div>
  );
}
