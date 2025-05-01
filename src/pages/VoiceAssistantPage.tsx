
import { useState } from 'react';
import { 
  MessageSquare, Search, Mic, CheckCircle2, 
  XCircle, Filter, Calendar, RefreshCcw 
} from 'lucide-react';
import DataCard from '@/components/dashboard/DataCard';

type VoiceLog = {
  id: string;
  command: string;
  timestamp: string;
  status: 'success' | 'failure';
  intent: string;
  confidence: number;
};

// Mock data
const voiceLogs: VoiceLog[] = [
  {
    id: '1',
    command: 'Show cameras in downtown area',
    timestamp: '10:23 AM - May 1, 2025',
    status: 'success',
    intent: 'CAMERA_FILTER_LOCATION',
    confidence: 0.92,
  },
  {
    id: '2',
    command: 'Zoom in on camera 5',
    timestamp: '9:45 AM - May 1, 2025',
    status: 'success',
    intent: 'CAMERA_ZOOM',
    confidence: 0.87,
  },
  {
    id: '3',
    command: 'Show violations from yesterday',
    timestamp: '9:30 AM - May 1, 2025',
    status: 'failure',
    intent: 'VIOLATION_FILTER_TIME',
    confidence: 0.45,
  },
  {
    id: '4',
    command: 'Display traffic density on Main Street',
    timestamp: '9:15 AM - May 1, 2025',
    status: 'success',
    intent: 'TRAFFIC_ANALYSIS_LOCATION',
    confidence: 0.89,
  },
  {
    id: '5',
    command: 'Alert police about speeding on Highway 101',
    timestamp: '9:00 AM - May 1, 2025',
    status: 'success',
    intent: 'ALERT_AUTHORITIES',
    confidence: 0.95,
  },
];

// Group logs by date
const groupedLogs = voiceLogs.reduce((acc, log) => {
  const date = log.timestamp.split(' - ')[1];
  if (!acc[date]) {
    acc[date] = [];
  }
  acc[date].push(log);
  return acc;
}, {} as Record<string, VoiceLog[]>);

const topIntents = [
  { name: 'CAMERA_CONTROL', count: 45, success: 40 },
  { name: 'TRAFFIC_ANALYSIS', count: 32, success: 30 },
  { name: 'VIOLATION_FILTER', count: 28, success: 25 },
  { name: 'ALERT_AUTHORITIES', count: 15, success: 15 },
];

export default function VoiceAssistantPage() {
  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Voice Assistant</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search voice logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 h-10 pl-9 pr-4 rounded-md bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-traffic-blue"
            />
          </div>
          
          <button 
            className={`p-3 rounded-full ${isListening ? 'bg-traffic-red animate-pulse' : 'bg-secondary/50'}`}
            onClick={() => setIsListening(!isListening)}
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <DataCard 
          title="Voice Recognition Status" 
          className="lg:col-span-1"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Status</span>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-traffic-green mr-1.5 animate-pulse"></span>
                <span className="font-medium">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Success Rate</span>
              <span className="metric-value">92.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Commands Today</span>
              <span className="metric-value">134</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg. Response Time</span>
              <span className="metric-value">0.8s</span>
            </div>
          </div>
          
          <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-traffic-blue/20 text-traffic-blue rounded-md hover:bg-traffic-blue/30 transition-colors">
            <RefreshCcw className="h-4 w-4" />
            <span>Recalibrate System</span>
          </button>
        </DataCard>
        
        <DataCard 
          title="Top Intents" 
          headerAction={
            <button className="flex items-center text-xs text-traffic-blue hover:underline">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              This Week
            </button>
          }
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {topIntents.map((intent) => (
              <div key={intent.name} className="bg-secondary/30 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{intent.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {intent.count} commands
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-traffic-blue rounded-full"
                    style={{ width: `${(intent.success / intent.count) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    Success Rate
                  </span>
                  <span className="text-xs font-medium">
                    {Math.round((intent.success / intent.count) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DataCard>
      </div>
      
      <DataCard 
        title="Voice Assistant Logs" 
        headerAction={
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-md hover:bg-secondary">
              <Filter className="h-4 w-4" />
            </button>
            <div className="flex items-center text-xs gap-2">
              <button className="px-2 py-1 rounded-md bg-traffic-blue text-white">All</button>
              <button className="px-2 py-1 rounded-md hover:bg-secondary">Success</button>
              <button className="px-2 py-1 rounded-md hover:bg-secondary">Failed</button>
            </div>
          </div>
        }
      >
        <div className="space-y-8">
          {Object.entries(groupedLogs).map(([date, logs]) => (
            <div key={date}>
              <h3 className="text-sm font-medium mb-4">{date}</h3>
              <div className="space-y-6">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4">
                    <div className="mt-1">
                      <div 
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          log.status === 'success' 
                            ? 'bg-traffic-green/20 text-traffic-green' 
                            : 'bg-traffic-red/20 text-traffic-red'
                        }`}
                      >
                        {log.status === 'success' ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-traffic-blue" />
                            <p className="font-medium">"{log.command}"</p>
                          </div>
                          <div className="mt-1 space-x-2">
                            <span 
                              className="inline-flex items-center px-2 py-0.5 bg-secondary/50 rounded-full text-xs"
                            >
                              {log.intent}
                            </span>
                            <span 
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                                log.confidence > 0.8 
                                  ? 'bg-traffic-green/20 text-traffic-green' 
                                  : log.confidence > 0.6 
                                  ? 'bg-warning/20 text-warning' 
                                  : 'bg-traffic-red/20 text-traffic-red'
                              }`}
                            >
                              {Math.round(log.confidence * 100)}% confidence
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp.split(' - ')[0]}
                        </span>
                      </div>
                      
                      {log.status === 'failure' && (
                        <div className="mt-2 p-2 bg-traffic-red/10 rounded-md text-xs">
                          Error: Could not process command with sufficient confidence.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DataCard>
    </div>
  );
}
