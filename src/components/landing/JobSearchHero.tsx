import React, { useState } from 'react';
import { Search, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

const experienceLevels = [
  { value: '', label: 'Experience Level' },
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (3-5 years)' },
  { value: 'senior', label: 'Senior Level (5+ years)' },
  { value: 'lead', label: 'Lead / Manager' },
];

const locations = [
  { value: '', label: 'Location' },
  { value: 'remote', label: 'Remote' },
  { value: 'san-francisco', label: 'San Francisco, CA' },
  { value: 'new-york', label: 'New York, NY' },
  { value: 'austin', label: 'Austin, TX' },
  { value: 'seattle', label: 'Seattle, WA' },
];

const JobSearchHero = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (skills) params.set('skills', skills);
    if (experience) params.set('experience', experience);
    if (location) params.set('location', location);
    navigate(`/seeker/jobs?${params.toString()}`);
  };

  return (
    <GlassCard className="p-6 md:p-8 mt-12">
      <h3 className="text-xl font-display font-semibold mb-6 text-center">
        Find Your Dream Job
      </h3>
      <form onSubmit={handleSearch}>
        <div className="grid md:grid-cols-4 gap-4">
          {/* Skills Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Skills (e.g., React, Python)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>

          {/* Experience Dropdown */}
          <div className="relative">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            >
              {experienceLevels.map(level => (
                <option key={level.value} value={level.value} className="bg-background text-foreground">
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            >
              {locations.map(loc => (
                <option key={loc.value} value={loc.value} className="bg-background text-foreground">
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <Button type="submit" className="gradient-button py-3 h-auto">
            <Briefcase className="w-5 h-5 mr-2" />
            Search Jobs
          </Button>
        </div>
      </form>
    </GlassCard>
  );
};

export default JobSearchHero;
