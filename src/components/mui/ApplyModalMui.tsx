import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Job, useApplyToJobMutation } from '@/store/api/jobsApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addApplication } from '@/store/slices/jobsSlice';
import { useSnackbar } from 'notistack';

interface ApplyModalMuiProps {
  job: Job;
  open: boolean;
  onClose: () => void;
}

const ApplyModalMui = ({ job, open, onClose }: ApplyModalMuiProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const myApplications = useAppSelector((state) => state.jobs.myApplications);
  const [applyToJob, { isLoading }] = useApplyToJobMutation();
  const { enqueueSnackbar } = useSnackbar();
  
  const [coverLetter, setCoverLetter] = useState('');
  
  const hasApplied = myApplications.some(app => app.jobId === job.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const application = await applyToJob({
        jobId: job.id,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        coverLetter,
      }).unwrap();
      
      dispatch(addApplication(application));
      
      enqueueSnackbar(`Application submitted for ${job.title} at ${job.company}`, { 
        variant: 'success' 
      });
      
      onClose();
    } catch (error) {
      enqueueSnackbar('Failed to submit application', { variant: 'error' });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ pr: 6 }}>
        <Typography variant="h5" component="span" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
          Apply for Position
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {job.title} at {job.company}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {hasApplied ? (
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'success.main',
                opacity: 0.2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 32, color: 'success.main' }} />
            </Box>
            <Typography variant="h6" gutterBottom>Already Applied!</Typography>
            <Typography color="text.secondary">
              You have already submitted an application for this position.
            </Typography>
          </Box>
        </DialogContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Your Name"
              value={user?.name || ''}
              disabled
              fullWidth
            />
            
            <TextField
              label="Email"
              value={user?.email || ''}
              disabled
              fullWidth
            />
            
            <TextField
              label="Cover Letter"
              placeholder="Tell us why you're a great fit for this role..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              multiline
              rows={5}
              required
              fullWidth
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              variant="outlined" 
              onClick={onClose}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
              sx={{ flex: 1 }}
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default ApplyModalMui;
