
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive?: boolean;
    label?: string;
  };
  className?: string;
};

export default function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn('glass-card rounded-xl p-5 shadow-md', className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="metric-value">{value}</p>
          </div>
          
          {trend && (
            <div className="mt-2 flex items-center">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.isPositive ? 'text-traffic-green' : 'text-traffic-red'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              {trend.label && (
                <span className="ml-2 text-xs text-muted-foreground">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-lg bg-secondary/50 text-traffic-blue">
          {icon}
        </div>
      </div>
    </div>
  );
}
