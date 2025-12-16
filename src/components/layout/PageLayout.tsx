import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  showOrbs?: boolean;
}

const PageLayout = ({ children, showOrbs = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden flex flex-col">
      {/* Decorative Orbs */}
      {showOrbs && (
        <>
          <div className="orb orb-primary w-[600px] h-[600px] -top-[200px] -left-[200px] animate-pulse-glow" />
          <div className="orb orb-secondary w-[500px] h-[500px] top-[40%] -right-[150px] animate-pulse-glow animation-delay-200" />
          <div className="orb orb-accent w-[400px] h-[400px] -bottom-[100px] left-[30%] animate-pulse-glow animation-delay-400" />
        </>
      )}
      
      <Navbar />
      
      <main className="relative z-10 pt-28 pb-12 flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
