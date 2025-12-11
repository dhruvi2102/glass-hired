import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useJobs } from '@/contexts/JobsContext';
import { Briefcase, Bookmark, FileText, TrendingUp, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import JobCard from '@/components/jobs/JobCard';
import DashboardFilters from '@/components/jobs/DashboardFilters';

const jobFilters = [
  { value: 'all', label: 'All Jobs' },
  { value: 'remote', label: 'Remote' },
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
];

const SeekerDashboard = () => {
  const { user } = useAuth();
  const { jobs, savedJobs, myApplications } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = selectedFilter === 'all' || job.type === selectedFilter;
      
      return matchesSearch && matchesFilter;
    }).slice(0, 5);
  }, [jobs, searchQuery, selectedFilter]);

  const stats = [
    { label: 'Available Jobs', value: jobs.length, icon: Briefcase, color: 'text-primary' },
    { label: 'Saved Jobs', value: savedJobs.length, icon: Bookmark, color: 'text-accent' },
    { label: 'Applications', value: myApplications.length, icon: FileText, color: 'text-success' },
    { label: 'Profile Views', value: 142, icon: TrendingUp, color: 'text-secondary-foreground' },
  ];

  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your job search today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
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
              <h2 className="text-xl font-display font-semibold">Recent Jobs</h2>
              <Link to="/seeker/jobs" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Dashboard Filters */}
            <DashboardFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              filters={jobFilters}
              placeholder="Search jobs, companies, skills..."
              className="mb-4"
            />
            
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <GlassCard className="p-8 text-center">
                  <p className="text-muted-foreground">No jobs match your filters.</p>
                </GlassCard>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <GlassCard className="p-6">
              <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/seeker/jobs" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span>Browse Jobs</span>
                </Link>
                <Link 
                  to="/seeker/saved" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Bookmark className="w-5 h-5 text-accent" />
                  <span>Saved Jobs ({savedJobs.length})</span>
                </Link>
                <Link 
                  to="/seeker/applications" 
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <FileText className="w-5 h-5 text-success" />
                  <span>My Applications</span>
                </Link>
              </div>
            </GlassCard>

            {/* Application Status */}
            <GlassCard className="p-6">
              <h3 className="font-display font-semibold mb-4">Application Status</h3>
              {myApplications.length > 0 ? (
                <div className="space-y-3">
                  {myApplications.slice(0, 3).map(app => {
                    const job = jobs.find(j => j.id === app.jobId);
                    return (
                      <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <div>
                          <p className="font-medium text-sm">{job?.title || 'Unknown Job'}</p>
                          <p className="text-xs text-muted-foreground">{job?.company}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          app.status === 'reviewed' ? 'bg-blue-500/20 text-blue-400' :
                          app.status === 'shortlisted' ? 'bg-green-500/20 text-green-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No applications yet. Start applying to jobs!
                </p>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SeekerDashboard;
