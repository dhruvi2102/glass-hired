import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import BoltIcon from '@mui/icons-material/Bolt';
import MuiPageLayout from '@/components/layout/MuiPageLayout';
import GlassCardMui from '@/components/mui/GlassCardMui';
import { glassStyles } from '@/theme/muiTheme';

const features = [
  { icon: SearchIcon, title: 'Smart Job Matching', description: 'AI-powered system matches you with perfect opportunities based on your skills.' },
  { icon: SecurityIcon, title: 'Secure & Private', description: 'Your data is protected with enterprise-grade security.' },
  { icon: BoltIcon, title: 'Instant Applications', description: 'Apply to multiple jobs with one click. Track all applications in one place.' },
];

const roles = [
  { icon: GroupsIcon, title: 'Job Seekers', description: 'Find your dream job with powerful search.', link: '/signup?role=job_seeker' },
  { icon: BusinessIcon, title: 'Employers', description: 'Post jobs and find top talent.', link: '/signup?role=employer' },
  { icon: WorkIcon, title: 'Recruiters', description: 'Connect candidates with opportunities.', link: '/signup?role=recruiter' },
];

const stats = [
  { value: '10K+', label: 'Active Jobs' },
  { value: '50K+', label: 'Job Seekers' },
  { value: '5K+', label: 'Companies' },
  { value: '95%', label: 'Success Rate' },
];

const Landing = () => {
  return (
    <MuiPageLayout>
      <Container maxWidth="lg">
        {/* Hero */}
        <Box sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}>
          <Typography variant="overline" sx={{ px: 2, py: 1, borderRadius: 4, bgcolor: 'rgba(14, 165, 233, 0.2)', color: 'primary.main', mb: 3, display: 'inline-block' }}>
            The Future of Recruitment
          </Typography>
          <Typography variant="h2" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, mb: 3 }}>
            Find Your Perfect<Box component="span" sx={{ ...glassStyles.gradientText, display: 'block' }}>Career Match</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 5 }}>
            Connect with top companies through our premium recruitment platform.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button component={RouterLink} to="/signup" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
              Get Started Free
            </Button>
            <Button component={RouterLink} to="/login" variant="outlined" size="large">Sign In</Button>
          </Stack>

          {/* Stats */}
          <Grid container spacing={2} sx={{ mt: 8 }}>
            {stats.map(stat => (
              <Grid item xs={6} md={3} key={stat.label}>
                <GlassCardMui>
                  <Typography variant="h4" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, ...glassStyles.gradientText }}>{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                </GlassCardMui>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, mb: 6 }}>
            Why Choose HireGlass?
          </Typography>
          <Grid container spacing={3}>
            {features.map(f => (
              <Grid item xs={12} md={4} key={f.title}>
                <GlassCardMui hover>
                  <Box sx={{ width: 56, height: 56, borderRadius: 3, background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(236, 72, 153, 0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                    <f.icon sx={{ fontSize: 28, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontFamily: "'Space Grotesk', sans-serif", mb: 1 }}>{f.title}</Typography>
                  <Typography color="text.secondary">{f.description}</Typography>
                </GlassCardMui>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Roles */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, mb: 6 }}>
            Built for Everyone
          </Typography>
          <Grid container spacing={3}>
            {roles.map(r => (
              <Grid item xs={12} md={4} key={r.title}>
                <Box component={RouterLink} to={r.link} sx={{ textDecoration: 'none' }}>
                  <GlassCardMui hover sx={{ height: '100%' }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: 3, background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(14, 165, 233, 0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                      <r.icon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontFamily: "'Space Grotesk', sans-serif", mb: 1, color: 'text.primary' }}>{r.title}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>{r.description}</Typography>
                    <Typography color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      Get Started <ArrowForwardIcon fontSize="small" />
                    </Typography>
                  </GlassCardMui>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 4, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: 1, background: 'linear-gradient(135deg, hsl(199, 89%, 48%), hsl(330, 80%, 60%))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <WorkIcon sx={{ fontSize: 16, color: 'hsl(230, 35%, 7%)' }} />
            </Box>
            <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, ...glassStyles.gradientText }}>HireGlass</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">© 2024 HireGlass. All rights reserved.</Typography>
        </Box>
      </Container>
    </MuiPageLayout>
  );
};

export default Landing;
