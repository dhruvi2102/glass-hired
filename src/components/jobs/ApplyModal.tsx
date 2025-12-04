import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Job, useJobs } from '@/contexts/JobsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ApplyModalProps {
  job: Job;
  onClose: () => void;
}

const ApplyModal = ({ job, onClose }: ApplyModalProps) => {
  const { user } = useAuth();
  const { applyToJob, myApplications } = useJobs();
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasApplied = myApplications.some(app => app.jobId === job.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    applyToJob(job.id, user.id, user.name, user.email, coverLetter);
    
    toast({
      title: "Application Submitted!",
      description: `Your application for ${job.title} at ${job.company} has been sent.`,
    });
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="glass-card w-full max-w-lg p-6 relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-display font-bold mb-2">Apply for Position</h2>
        <p className="text-muted-foreground mb-6">{job.title} at {job.company}</p>

        {hasApplied ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Already Applied!</h3>
            <p className="text-muted-foreground">You have already submitted an application for this position.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="glass-input opacity-60"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="glass-input opacity-60"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Cover Letter</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell us why you're a great fit for this role..."
                rows={5}
                required
                className="glass-input resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 glass-button"
              >
                Cancel
              </Button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 gradient-button disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
