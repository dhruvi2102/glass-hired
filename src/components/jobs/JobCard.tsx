import { Job } from '@/contexts/JobsContext';
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck } from 'lucide-react';
import { useJobs } from '@/contexts/JobsContext';
import GlassCard from '@/components/ui/GlassCard';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
  onClick?: () => void;
  showSaveButton?: boolean;
}

const JobCard = ({ job, onClick, showSaveButton = true }: JobCardProps) => {
  const { savedJobs, toggleSaveJob } = useJobs();
  const isSaved = savedJobs.includes(job.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveJob(job.id);
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
    <GlassCard hover onClick={onClick} className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
            <span className="text-lg font-bold">{job.company[0]}</span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg">{job.title}</h3>
            <p className="text-muted-foreground text-sm">{job.company}</p>
          </div>
        </div>
        {showSaveButton && (
          <button
            onClick={handleSave}
            className={`p-2 rounded-xl transition-all ${
              isSaved ? 'bg-primary/20 text-primary' : 'hover:bg-white/10 text-muted-foreground'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
          {job.type.replace('-', ' ')}
        </span>
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white/5 text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {job.location}
        </span>
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white/5 text-muted-foreground">
          <DollarSign className="w-3 h-3" />
          {job.salary}
        </span>
      </div>

      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map(skill => (
          <span key={skill} className="px-2 py-1 rounded-lg text-xs bg-white/5 text-muted-foreground border border-white/10">
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-2 py-1 rounded-lg text-xs text-muted-foreground">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDistanceToNow(job.postedAt, { addSuffix: true })}
        </span>
        <span>{job.applicants.length} applicant{job.applicants.length !== 1 ? 's' : ''}</span>
      </div>
    </GlassCard>
  );
};

export default JobCard;
