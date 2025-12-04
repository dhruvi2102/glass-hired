import { Search, Filter, X } from 'lucide-react';

interface JobFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const JobFilters = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedLocation,
  setSelectedLocation,
}: JobFiltersProps) => {
  const jobTypes = ['All Types', 'full-time', 'part-time', 'contract', 'remote'];
  const locations = ['All Locations', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Remote'];

  const hasFilters = searchQuery || selectedType !== 'All Types' || selectedLocation !== 'All Locations';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setSelectedLocation('All Locations');
  };

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input pl-12"
          />
        </div>

        {/* Type Filter */}
        <div className="relative min-w-[180px]">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="glass-input pl-11 appearance-none cursor-pointer"
          >
            {jobTypes.map(type => (
              <option key={type} value={type} className="bg-background text-foreground">
                {type === 'All Types' ? type : type.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="relative min-w-[200px]">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="glass-input appearance-none cursor-pointer"
          >
            {locations.map(location => (
              <option key={location} value={location} className="bg-background text-foreground">
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="glass-button px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-2" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default JobFilters;
