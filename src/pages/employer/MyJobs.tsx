import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs, Job } from '@/contexts/JobsContext';
import { Briefcase, Users, Edit2, Trash2, Eye, Plus, MapPin, Clock, X } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import { formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const MyJobs = () => {
  const { user } = useAuth();
  const { jobs, deleteJob, updateJob } = useJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicants, setShowApplicants] = useState<Job | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const myJobs = jobs.filter(job => job.postedBy === user?.email);

  const handleDelete = (jobId: string) => {
    deleteJob(jobId);
    toast({
      title: "Job Deleted",
      description: "The job posting has been removed.",
    });
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      updateJob(editingJob.id, editingJob);
      toast({
        title: "Job Updated",
        description: "Your changes have been saved.",
      });
      setEditingJob(null);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-success/20 text-success';
      case 'part-time': return 'bg-primary/20 text-primary';
      case 'contract': return 'bg-accent/20 text-accent';
      case 'remote': return 'bg-secondary/20 text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              My <span className="gradient-text">Jobs</span>
            </h1>
            <p className="text-muted-foreground">
              {myJobs.length} job{myJobs.length !== 1 ? 's' : ''} posted
            </p>
          </div>
          <Link to="/employer/post-job" className="gradient-button inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Post New Job
          </Link>
        </div>

        {myJobs.length > 0 ? (
          <div className="space-y-4">
            {myJobs.map(job => (
              <GlassCard key={job.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                          {job.type.replace('-', ' ')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDistanceToNow(job.postedAt, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowApplicants(job)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                    >
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{job.applicants.length}</span>
                      <span className="hidden sm:inline">Applicants</span>
                    </button>
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-2 rounded-xl hover:bg-destructive/20 transition-colors text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Jobs Posted Yet</h3>
            <p className="text-muted-foreground mb-6">Create your first job posting to start receiving applications.</p>
            <Link to="/employer/post-job" className="gradient-button inline-block">
              Post a Job
            </Link>
          </GlassCard>
        )}

        {/* Applicants Modal */}
        {showApplicants && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
              onClick={() => setShowApplicants(null)}
            />
            <div className="glass-card w-full max-w-2xl p-6 relative animate-slide-up max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setShowApplicants(null)}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-display font-bold mb-2">Applicants</h2>
              <p className="text-muted-foreground mb-6">{showApplicants.title}</p>

              {showApplicants.applicants.length > 0 ? (
                <div className="space-y-4">
                  {showApplicants.applicants.map(app => (
                    <div key={app.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                            <span className="font-bold">{app.userName[0]}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{app.userName}</p>
                            <p className="text-sm text-muted-foreground">{app.userEmail}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(app.appliedAt, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{app.coverLetter}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No applicants yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
              onClick={() => setEditingJob(null)}
            />
            <div className="glass-card w-full max-w-xl p-6 relative animate-slide-up max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setEditingJob(null)}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-display font-bold mb-6">Edit Job</h2>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <input
                    type="text"
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                    className="glass-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="glass-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Salary</label>
                  <input
                    type="text"
                    value={editingJob.salary}
                    onChange={(e) => setEditingJob({ ...editingJob, salary: e.target.value })}
                    className="glass-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingJob.description}
                    onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                    className="glass-input resize-none"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingJob(null)}
                    className="flex-1 glass-button py-3"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 gradient-button py-3">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MyJobs;
