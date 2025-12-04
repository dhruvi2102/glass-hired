import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '@/contexts/JobsContext';
import PageLayout from '@/components/layout/PageLayout';
import JobCard from '@/components/jobs/JobCard';
import JobFilters from '@/components/jobs/JobFilters';
import ApplyModal from '@/components/jobs/ApplyModal';
import { Job } from '@/contexts/JobsContext';

const BrowseJobs = () => {
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'All Types' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'All Locations' || job.location === selectedLocation;

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Browse <span className="gradient-text">Jobs</span>
          </h1>
          <p className="text-muted-foreground">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <JobFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onClick={() => navigate(`/seeker/jobs/${job.id}`)}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No jobs found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters.</p>
          </div>
        )}

        {selectedJob && (
          <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </div>
    </PageLayout>
  );
};

export default BrowseJobs;
