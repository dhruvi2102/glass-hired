import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { glassStyles } from '@/theme/muiTheme';

const MuiNavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setAnchorEl(null);
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'employer': return <BusinessIcon fontSize="small" />;
      case 'recruiter': return <GroupsIcon fontSize="small" />;
      case 'agency': return <WorkIcon fontSize="small" />;
      default: return <PersonIcon fontSize="small" />;
    }
  };

  const navLinks = isAuthenticated ? (
    user?.role === 'job_seeker' ? [
      { to: '/seeker/dashboard', label: 'Dashboard' },
      { to: '/seeker/jobs', label: 'Browse Jobs' },
      { to: '/seeker/applications', label: 'My Applications' },
      { to: '/seeker/saved', label: 'Saved Jobs' },
    ] : [
      { to: '/employer/dashboard', label: 'Dashboard' },
      { to: '/employer/post-job', label: 'Post Job' },
      { to: '/employer/my-jobs', label: 'My Jobs' },
    ]
  ) : [];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          mx: 2, 
          mt: 2, 
          width: 'calc(100% - 32px)',
          borderRadius: 3,
          ...glassStyles.glassCard,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(330, 80%, 60%) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WorkIcon sx={{ color: 'hsl(230, 35%, 7%)' }} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                ...glassStyles.gradientText,
              }}
            >
              HireGlass
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navLinks.map(link => (
              <Button
                key={link.to}
                component={RouterLink}
                to={link.to}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  color: isActive(link.to) ? 'primary.main' : 'text.secondary',
                  bgcolor: isActive(link.to) ? 'rgba(14, 165, 233, 0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: isActive(link.to) ? 'rgba(14, 165, 233, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    color: 'text.primary',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Auth Buttons / User Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'text.primary',
                    gap: 1,
                  }}
                  startIcon={getRoleIcon()}
                >
                  {user?.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{ color: 'text.secondary' }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                >
                  Get Started
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { md: 'none' } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'rgba(30, 30, 50, 0.98)',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map(link => (
            <ListItem key={link.to} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                selected={isActive(link.to)}
                sx={{
                  mx: 2,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(14, 165, 233, 0.2)',
                  },
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          {isAuthenticated ? (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                sx={{ mx: 2, borderRadius: 2 }}
              >
                <LogoutIcon fontSize="small" sx={{ mr: 2 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  sx={{ mx: 2, borderRadius: 2 }}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ px: 2, pt: 2 }}>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  fullWidth
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default MuiNavbar;
