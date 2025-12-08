import { ReactNode } from 'react';
import { Box } from '@mui/material';
import MuiNavbar from './MuiNavbar';
import { glassStyles } from '@/theme/muiTheme';

interface PageLayoutProps {
  children: ReactNode;
  showOrbs?: boolean;
}

const MuiPageLayout = ({ children, showOrbs = true }: PageLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, hsl(230, 35%, 7%) 0%, hsl(250, 40%, 12%) 50%, hsl(230, 35%, 10%) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Orbs */}
      {showOrbs && (
        <>
          <Box
            sx={{
              ...glassStyles.orb,
              ...glassStyles.orbPrimary,
              width: 600,
              height: 600,
              top: -200,
              left: -200,
              animation: 'pulse-glow 4s ease-in-out infinite',
            }}
          />
          <Box
            sx={{
              ...glassStyles.orb,
              ...glassStyles.orbSecondary,
              width: 500,
              height: 500,
              top: '40%',
              right: -150,
              animation: 'pulse-glow 4s ease-in-out infinite 0.2s',
            }}
          />
          <Box
            sx={{
              ...glassStyles.orb,
              ...glassStyles.orbAccent,
              width: 400,
              height: 400,
              bottom: -100,
              left: '30%',
              animation: 'pulse-glow 4s ease-in-out infinite 0.4s',
            }}
          />
        </>
      )}
      
      <MuiNavbar />
      
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 10,
          pt: 14,
          pb: 6,
        }}
      >
        {children}
      </Box>
      
      {/* Global keyframes */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

export default MuiPageLayout;
