import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export type SortDirection = 'asc' | 'desc' | null;

interface SortOption {
  key: string;
  label: string;
}

interface SortingProps {
  options: SortOption[];
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort: (key: string, direction: SortDirection) => void;
  className?: string;
}

export const Sorting: React.FC<SortingProps> = ({
  options,
  sortKey,
  sortDirection,
  onSort,
  className,
}) => {
  const handleSort = (key: string) => {
    if (sortKey !== key) {
      onSort(key, 'asc');
    } else if (sortDirection === 'asc') {
      onSort(key, 'desc');
    } else if (sortDirection === 'desc') {
      onSort(key, null);
    } else {
      onSort(key, 'asc');
    }
  };

  const getSortIcon = (key: string) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="w-4 h-4 text-primary" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="w-4 h-4 text-primary" />;
    }
    return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground">Sort by:</span>
      {options.map((option) => (
        <button
          key={option.key}
          onClick={() => handleSort(option.key)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
            "bg-background/50 backdrop-blur-sm",
            "border border-border/50",
            "text-sm text-foreground",
            "hover:bg-accent/50 hover:border-primary/50",
            "transition-all duration-200",
            sortKey === option.key && "border-primary bg-primary/10"
          )}
        >
          {option.label}
          {getSortIcon(option.key)}
        </button>
      ))}
    </div>
  );
};
