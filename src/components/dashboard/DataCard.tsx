
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type DataCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
};

export default function DataCard({ title, children, className, headerAction }: DataCardProps) {
  return (
    <div className={cn('glass-card rounded-xl overflow-hidden', className)}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
        <h3 className="font-medium">{title}</h3>
        {headerAction}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
