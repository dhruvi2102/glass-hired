import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs } from '@/contexts/JobsContext';
import { Briefcase, Users, Eye, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import { formatDistanceToNow } from 'date-fns';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const { jobs } = useJobs();

  const myJobs = jobs.filter(job => job.postedBy === user?.email);
  const totalApplicants = myJobs.reduce((sum, job) => sum + job.applicants.length, 0);

  const stats = [
    { label: 'Active Jobs', value: myJobs.length, icon: Briefcase, color: 'text-primary' },
    { label: 'Total Applicants', value: totalApplicants, icon: Users, color: 'text-accent' },
    { label: 'Profile Views', value: 523, icon: Eye, color: 'text-success' },
    { label: 'This Month', value: '+12%', icon: TrendingUp, color: 'text-secondary-foreground' },
  ];

  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Welcome, <span className="gradient-text">{user?.name}</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your job postings and find top talent.
            </p>
          </div>
          <Link to="/employer/post-job" className="gradient-button inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Post New Job
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-display font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-semibold">My Posted Jobs</h2>
              <Link to="/employer/my-jobs" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {myJobs.length > 0 ? (
              <div className="space-y-4">
                {myJobs.slice(0, 3).map(job => (
                  <GlassCard key={job.id} hover className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-lg">{job.title}</h3>
                        <p className="text-muted-foreground text-sm">{job.location} • {job.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{job.applicants.length}</div>
                        <div className="text-xs text-muted-foreground">applicants</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <span className="text-xs text-muted-foreground">
                        Posted {formatDistanceToNow(job.postedAt, { addSuffix: true })}
                      </span>
                      <Link 
                        to={`/employer/my-jobs`} 
                        className="text-sm text-primary font-medium hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Jobs Posted Yet</h3>
                <p className="text-muted-foreground mb-6">Post your first job to start receiving applications.</p>
                <Link to="/employer/post-job" className="gradient-button inline-block">
                  Post a Job
                </Link>
              </GlassCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <GlassCard className="p-6">
              <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/employer/post-job" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                >
                  <Plus className="w-5 h-5" />
                  <span>Post New Job</span>
                </Link>
                <Link 
                  to="/employer/my-jobs" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Briefcase className="w-5 h-5 text-accent" />
                  <span>Manage Jobs</span>
                </Link>
              </div>
            </GlassCard>

            {/* Recent Applicants */}
            <GlassCard className="p-6">
              <h3 className="font-display font-semibold mb-4">Recent Applicants</h3>
              {totalApplicants > 0 ? (
                <div className="space-y-3">
                  {myJobs.flatMap(job => 
                    job.applicants.map(app => ({ ...app, jobTitle: job.title }))
                  ).slice(0, 4).map(app => (
                    <div key={app.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                        <span className="text-sm font-bold">{app.userName[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{app.userName}</p>
                        <p className="text-xs text-muted-foreground truncate">{app.jobTitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No applicants yet. Post a job to start receiving applications.
                </p>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EmployerDashboard;
