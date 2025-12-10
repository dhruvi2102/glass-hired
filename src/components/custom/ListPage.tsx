import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Paging } from './Paging';
import { Sorting, SortDirection } from './Sorting';
import { SearchFilters } from './SearchFilters';

interface ListPageProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  searchFilter?: (item: T, query: string) => boolean;
  sortOptions?: { key: string; label: string; compare: (a: T, b: T) => number }[];
  pageSize?: number;
  title?: string;
  filterContent?: React.ReactNode;
  onClearFilters?: () => void;
  emptyMessage?: string;
  className?: string;
}

export function ListPage<T>({
  data,
  renderItem,
  keyExtractor,
  searchFilter,
  sortOptions,
  pageSize = 10,
  title,
  filterContent,
  onClearFilters,
  emptyMessage = 'No items found',
  className,
}: ListPageProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchFilter && searchQuery) {
      result = result.filter(item => searchFilter(item, searchQuery));
    }

    // Apply sorting
    if (sortKey && sortDirection && sortOptions) {
      const sortOption = sortOptions.find(opt => opt.key === sortKey);
      if (sortOption) {
        result.sort((a, b) => {
          const comparison = sortOption.compare(a, b);
          return sortDirection === 'desc' ? -comparison : comparison;
        });
      }
    }

    return result;
  }, [data, searchQuery, searchFilter, sortKey, sortDirection, sortOptions]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: string, direction: SortDirection) => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSortKey(undefined);
    setSortDirection(null);
    setCurrentPage(1);
    onClearFilters?.();
  };

  return (
    <div className={cn("space-y-6", className)}>
      {title && (
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      )}

      {(filterContent || searchFilter) && (
        <SearchFilters
          onClear={handleClearAll}
          showClear={!!searchQuery || !!sortKey}
        >
          {searchFilter && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search..."
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg",
                  "bg-background/50 backdrop-blur-sm",
                  "border border-border/50",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                  "transition-all duration-200"
                )}
              />
            </div>
          )}
          {filterContent}
        </SearchFilters>
      )}

      {sortOptions && sortOptions.length > 0 && (
        <Sorting
          options={sortOptions.map(({ key, label }) => ({ key, label }))}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      )}

      <div className="text-sm text-muted-foreground">
        Showing {paginatedData.length} of {filteredData.length} items
      </div>

      {paginatedData.length > 0 ? (
        <div className="space-y-4">
          {paginatedData.map((item, index) => (
            <div key={keyExtractor(item)}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      ) : (
        <div className={cn(
          "py-12 text-center rounded-xl",
          "bg-card/20 backdrop-blur-xl",
          "border border-border/30"
        )}>
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}

      {totalPages > 1 && (
        <Paging
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
