import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, TextField, Button, InputAdornment, IconButton, Checkbox, FormControlLabel,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WorkIcon from '@mui/icons-material/Work';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginAsync } from '@/store/slices/authSlice';
import MuiPageLayout from '@/components/layout/MuiPageLayout';
import GlassCardMui from '@/components/mui/GlassCardMui';
import { glassStyles } from '@/theme/muiTheme';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginAsync({ email, password })).unwrap();
      enqueueSnackbar('Welcome back!', { variant: 'success' });
      if (result.role === 'job_seeker') {
        navigate('/seeker/dashboard');
      } else {
        navigate('/employer/dashboard');
      }
    } catch (error) {
      enqueueSnackbar('Invalid email or password.', { variant: 'error' });
    }
  };

  return (
    <MuiPageLayout>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 4, textDecoration: 'none' }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2, background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(330, 80%, 60%) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <WorkIcon sx={{ color: 'hsl(230, 35%, 7%)' }} />
            </Box>
            <Typography variant="h5" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, ...glassStyles.gradientText }}>HireGlass</Typography>
          </Box>
          <Typography variant="h4" sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, mb: 1 }}>Welcome Back</Typography>
          <Typography color="text.secondary">Sign in to continue to your account</Typography>
        </Box>

        <GlassCardMui>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField fullWidth label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
              helperText="Tip: Use 'employer@' to login as employer"
            />
            <TextField fullWidth label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment>,
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Button component={RouterLink} to="/forgot-password" sx={{ textTransform: 'none' }}>Forgot password?</Button>
            </Box>
            <Button type="submit" variant="contained" size="large" disabled={isLoading} fullWidth>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
          <Typography sx={{ mt: 3, textAlign: 'center' }} color="text.secondary">
            Don't have an account? <Button component={RouterLink} to="/signup" sx={{ textTransform: 'none' }}>Sign up</Button>
          </Typography>
        </GlassCardMui>
      </Container>
    </MuiPageLayout>
  );
};

export default Login;
