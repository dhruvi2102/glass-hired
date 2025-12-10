import React from 'react';
import { cn } from '@/lib/utils';
import { Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  children: React.ReactNode;
  title?: string;
  onClear?: () => void;
  showClear?: boolean;
  className?: string;
  collapsible?: boolean;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  children,
  title = 'Filters',
  onClear,
  showClear = true,
  className,
  collapsible = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(!collapsible);

  return (
    <div className={cn(
      "rounded-xl",
      "bg-card/20 backdrop-blur-xl",
      "border border-border/30",
      className
    )}>
      <div className={cn(
        "flex items-center justify-between px-4 py-3",
        "border-b border-border/30"
      )}>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-foreground">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {showClear && onClear && (
            <button
              type="button"
              onClick={onClear}
              className={cn(
                "text-sm text-muted-foreground hover:text-foreground",
                "flex items-center gap-1",
                "transition-colors"
              )}
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
          {collapsible && (
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isOpen ? 'Hide' : 'Show'}
            </button>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};
