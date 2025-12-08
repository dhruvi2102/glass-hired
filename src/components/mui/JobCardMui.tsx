import { Box, Typography, Chip, IconButton, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '@/store/api/jobsApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSaveJob } from '@/store/slices/jobsSlice';
import GlassCardMui from './GlassCardMui';
import { glassStyles } from '@/theme/muiTheme';

interface JobCardMuiProps {
  job: Job;
  onClick?: () => void;
  showSaveButton?: boolean;
}

const getTypeColor = (type: string): string => {
  switch (type) {
    case 'full-time': return 'success';
    case 'part-time': return 'primary';
    case 'contract': return 'secondary';
    case 'remote': return 'info';
    default: return 'default';
  }
};

const JobCardMui = ({ job, onClick, showSaveButton = true }: JobCardMuiProps) => {
  const dispatch = useAppDispatch();
  const savedJobs = useAppSelector((state) => state.jobs.savedJobs);
  const isSaved = savedJobs.includes(job.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleSaveJob(job.id));
  };

  return (
    <GlassCardMui hover onClick={onClick}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" fontWeight="bold">{job.company[0]}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {job.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">{job.company}</Typography>
          </Box>
        </Box>
        {showSaveButton && (
          <IconButton
            onClick={handleSave}
            sx={{
              borderRadius: 2,
              bgcolor: isSaved ? 'rgba(14, 165, 233, 0.2)' : 'transparent',
              color: isSaved ? 'primary.main' : 'text.secondary',
            }}
          >
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        )}
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
        <Chip
          size="small"
          label={job.type.replace('-', ' ')}
          color={getTypeColor(job.type) as any}
          sx={{ textTransform: 'capitalize' }}
        />
        <Chip
          size="small"
          icon={<LocationOnIcon />}
          label={job.location}
          variant="outlined"
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}
        />
        <Chip
          size="small"
          icon={<AttachMoneyIcon />}
          label={job.salary}
          variant="outlined"
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}
        />
      </Stack>

      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {job.description}
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
        {job.skills.slice(0, 4).map(skill => (
          <Chip
            key={skill}
            size="small"
            label={skill}
            variant="outlined"
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
        ))}
        {job.skills.length > 4 && (
          <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
            +{job.skills.length - 4} more
          </Typography>
        )}
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="caption">
            {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {job.applicants.length} applicant{job.applicants.length !== 1 ? 's' : ''}
        </Typography>
      </Box>
    </GlassCardMui>
  );
};

export default JobCardMui;
