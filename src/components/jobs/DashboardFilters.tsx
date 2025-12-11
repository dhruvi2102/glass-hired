import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  filters: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filters,
  placeholder = 'Search...',
  className,
}) => {
  const hasFilters = searchQuery || selectedFilter !== filters[0]?.value;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedFilter(filters[0]?.value || '');
  };

  return (
    <div className={cn("glass-card p-4", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                selectedFilter === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/50 text-muted-foreground hover:text-foreground hover:bg-background/80 border border-border/50"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Clear Button */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardFilters;
