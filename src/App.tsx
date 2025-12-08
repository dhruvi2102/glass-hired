import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from '@/store/store';
import { useAppSelector } from '@/store/hooks';
import { glassTheme } from '@/theme/muiTheme';

// Pages - Keeping existing pages but they'll need MUI migration
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import SeekerDashboard from './pages/seeker/SeekerDashboard';
import BrowseJobs from './pages/seeker/BrowseJobs';
import JobDetails from './pages/seeker/JobDetails';
import MyApplications from './pages/seeker/MyApplications';
import SavedJobs from './pages/seeker/SavedJobs';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJob from './pages/employer/PostJob';
import MyJobs from './pages/employer/MyJobs';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Job Seeker Routes */}
      <Route path="/seeker/dashboard" element={
        <ProtectedRoute allowedRoles={['job_seeker']}>
          <SeekerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/seeker/jobs" element={
        <ProtectedRoute allowedRoles={['job_seeker']}>
          <BrowseJobs />
        </ProtectedRoute>
      } />
      <Route path="/seeker/jobs/:id" element={
        <ProtectedRoute allowedRoles={['job_seeker']}>
          <JobDetails />
        </ProtectedRoute>
      } />
      <Route path="/seeker/applications" element={
        <ProtectedRoute allowedRoles={['job_seeker']}>
          <MyApplications />
        </ProtectedRoute>
      } />
      <Route path="/seeker/saved" element={
        <ProtectedRoute allowedRoles={['job_seeker']}>
          <SavedJobs />
        </ProtectedRoute>
      } />

      {/* Employer Routes */}
      <Route path="/employer/dashboard" element={
        <ProtectedRoute allowedRoles={['employer', 'recruiter', 'agency']}>
          <EmployerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/employer/post-job" element={
        <ProtectedRoute allowedRoles={['employer', 'recruiter', 'agency']}>
          <PostJob />
        </ProtectedRoute>
      } />
      <Route path="/employer/my-jobs" element={
        <ProtectedRoute allowedRoles={['employer', 'recruiter', 'agency']}>
          <MyJobs />
        </ProtectedRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={glassTheme}>
      <CssBaseline />
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
