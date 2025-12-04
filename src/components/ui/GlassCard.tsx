import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard = ({ children, className, hover = false, onClick }: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        hover ? 'glass-card-hover cursor-pointer' : 'glass-card',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
