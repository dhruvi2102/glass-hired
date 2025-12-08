import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { glassStyles } from '@/theme/muiTheme';

interface JobFiltersMuiProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const jobTypes = ['All Types', 'full-time', 'part-time', 'contract', 'remote'];
const locations = ['All Locations', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Remote'];

const JobFiltersMui = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedLocation,
  setSelectedLocation,
}: JobFiltersMuiProps) => {
  const hasFilters = searchQuery || selectedType !== 'All Types' || selectedLocation !== 'All Locations';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All Types');
    setSelectedLocation('All Locations');
  };

  return (
    <Box 
      sx={{ 
        ...glassStyles.glassCard, 
        p: 2, 
        mb: 3,
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder="Search jobs, companies, skills..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ flex: 1 }}
      />

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Job Type</InputLabel>
        <Select
          value={selectedType}
          label="Job Type"
          onChange={(e) => setSelectedType(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <FilterListIcon fontSize="small" />
            </InputAdornment>
          }
        >
          {jobTypes.map(type => (
            <MenuItem key={type} value={type}>
              {type === 'All Types' ? type : type.replace('-', ' ')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={selectedLocation}
          label="Location"
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {locations.map(location => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {hasFilters && (
        <Button
          variant="outlined"
          onClick={clearFilters}
          startIcon={<CloseIcon />}
          sx={{ minWidth: 100 }}
        >
          Clear
        </Button>
      )}
    </Box>
  );
};

export default JobFiltersMui;
