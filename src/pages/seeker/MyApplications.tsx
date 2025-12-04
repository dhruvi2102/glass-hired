import { useJobs } from '@/contexts/JobsContext';
import { FileText, Clock, Building2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const MyApplications = () => {
  const { myApplications, jobs } = useJobs();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'reviewed': return 'bg-blue-500/20 text-blue-400';
      case 'shortlisted': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <PageLayout>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            My <span className="gradient-text">Applications</span>
          </h1>
          <p className="text-muted-foreground">
            {myApplications.length} application{myApplications.length !== 1 ? 's' : ''} submitted
          </p>
        </div>

        {myApplications.length > 0 ? (
          <div className="space-y-4">
            {myApplications.map(application => {
              const job = jobs.find(j => j.id === application.jobId);
              if (!job) return null;

              return (
                <GlassCard key={application.id} hover className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <Link 
                          to={`/seeker/jobs/${job.id}`}
                          className="font-display font-semibold text-lg hover:text-primary transition-colors"
                        >
                          {job.title}
                        </Link>
                        <p className="text-muted-foreground">{job.company}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          Applied {formatDistanceToNow(application.appliedAt, { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusStyle(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                  
                  {application.coverLetter && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Cover Letter:</span>{' '}
                        {application.coverLetter.slice(0, 150)}
                        {application.coverLetter.length > 150 && '...'}
                      </p>
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        ) : (
          <GlassCard className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
            <p className="text-muted-foreground mb-6">Start applying to jobs to see them here.</p>
            <Link to="/seeker/jobs" className="gradient-button inline-block">
              Browse Jobs
            </Link>
          </GlassCard>
        )}
      </div>
    </PageLayout>
  );
};

export default MyApplications;
