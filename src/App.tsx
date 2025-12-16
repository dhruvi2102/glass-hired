import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { JobsProvider } from "@/contexts/JobsContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import SeekerDashboard from "./pages/seeker/SeekerDashboard";
import BrowseJobs from "./pages/seeker/BrowseJobs";
import JobDetails from "./pages/seeker/JobDetails";
import MyApplications from "./pages/seeker/MyApplications";
import SavedJobs from "./pages/seeker/SavedJobs";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import PostJob from "./pages/employer/PostJob";
import MyJobs from "./pages/employer/MyJobs";
import ComponentDemo from "./pages/ComponentDemo";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuth();
  
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
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/demo" element={<ComponentDemo />} />

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
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <JobsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </JobsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
