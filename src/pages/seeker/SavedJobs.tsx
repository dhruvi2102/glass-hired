import { useNavigate } from 'react-router-dom';
import { useJobs } from '@/contexts/JobsContext';
import { Bookmark } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import JobCard from '@/components/jobs/JobCard';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const navigate = useNavigate();
  const { jobs, savedJobs } = useJobs();

  const savedJobsList = jobs.filter(job => savedJobs.includes(job.id));

  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Saved <span className="gradient-text">Jobs</span>
          </h1>
          <p className="text-muted-foreground">
            {savedJobsList.length} job{savedJobsList.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        {savedJobsList.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {savedJobsList.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onClick={() => navigate(`/seeker/jobs/${job.id}`)}
              />
            ))}
          </div>
        ) : (
          <GlassCard className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Saved Jobs</h3>
            <p className="text-muted-foreground mb-6">Save jobs while browsing to see them here.</p>
            <Link to="/seeker/jobs" className="gradient-button inline-block">
              Browse Jobs
            </Link>
          </GlassCard>
        )}
      </div>
    </PageLayout>
  );
};

export default SavedJobs;
