import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '@/contexts/JobsContext';
import { MapPin, Clock, DollarSign, Briefcase, ArrowLeft, Bookmark, BookmarkCheck, Share2, Building2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import ApplyModal from '@/components/jobs/ApplyModal';
import { formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, savedJobs, toggleSaveJob } = useJobs();
  const [showApplyModal, setShowApplyModal] = useState(false);

  const job = getJobById(id || '');

  if (!job) {
    return (
      <PageLayout>
        <div className="container max-w-4xl mx-auto px-4 text-center py-16">
          <h1 className="text-2xl font-display font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/seeker/jobs')} className="gradient-button">
            Browse Jobs
          </button>
        </div>
      </PageLayout>
    );
  }

  const isSaved = savedJobs.includes(job.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Job link has been copied to clipboard.",
    });
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
      <div className="container max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </button>

        {/* Header Card */}
        <GlassCard className="p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shrink-0">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">{job.title}</h1>
                <p className="text-lg text-muted-foreground">{job.company}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => toggleSaveJob(job.id)}
                className={`p-3 rounded-xl transition-all ${
                  isSaved ? 'bg-primary/20 text-primary' : 'glass-button'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
              <button onClick={handleShare} className="p-3 rounded-xl glass-button">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 mt-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
              {job.type.replace('-', ' ')}
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/5 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/5 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              {job.salary}
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              Posted {formatDistanceToNow(job.postedAt, { addSuffix: true })}
            </span>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => setShowApplyModal(true)}
            className="w-full md:w-auto gradient-button mt-6 py-4 px-8 text-lg"
          >
            Apply Now
          </button>
        </GlassCard>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-xl font-display font-semibold mb-4">Job Description</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {job.description}
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <h2 className="text-xl font-display font-semibold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl text-sm bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="font-display font-semibold mb-4">Job Overview</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Employment Type</p>
                  <p className="font-medium capitalize">{job.type.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                  <p className="font-medium">{job.location}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Salary Range</p>
                  <p className="font-medium">{job.salary}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Applicants</p>
                  <p className="font-medium">{job.applicants.length} applied</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-display font-semibold mb-4">About {job.company}</h3>
              <p className="text-muted-foreground text-sm">
                A leading company in the tech industry, {job.company} is dedicated to innovation and building great products.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>

      {showApplyModal && (
        <ApplyModal job={job} onClose={() => setShowApplyModal(false)} />
      )}
    </PageLayout>
  );
};

export default JobDetails;
