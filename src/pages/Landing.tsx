import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Building2, Search, Shield, Zap } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Search, title: 'Smart Job Matching', description: 'AI-powered system matches you with perfect opportunities based on your skills.' },
  { icon: Shield, title: 'Secure & Private', description: 'Your data is protected with enterprise-grade security.' },
  { icon: Zap, title: 'Instant Applications', description: 'Apply to multiple jobs with one click. Track all applications in one place.' },
];

const roles = [
  { icon: Users, title: 'Job Seekers', description: 'Find your dream job with powerful search.', link: '/signup?role=job_seeker' },
  { icon: Building2, title: 'Employers', description: 'Post jobs and find top talent.', link: '/signup?role=employer' },
  { icon: Briefcase, title: 'Recruiters', description: 'Connect candidates with opportunities.', link: '/signup?role=recruiter' },
];

const stats = [
  { value: '10K+', label: 'Active Jobs' },
  { value: '50K+', label: 'Job Seekers' },
  { value: '5K+', label: 'Companies' },
  { value: '95%', label: 'Success Rate' },
];

const Landing = () => {
  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
            The Future of Recruitment
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Find Your Perfect
            <span className="gradient-text block">Career Match</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Connect with top companies through our premium recruitment platform. 
            Whether you're seeking opportunities or top talent, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="gradient-button text-lg px-8 py-6 w-full sm:w-auto">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="glass-button text-lg px-8 py-6 w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map(stat => (
              <GlassCard key={stat.label} className="p-6 text-center">
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Why Choose HireGlass?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(feature => (
              <GlassCard key={feature.title} hover className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Roles Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Built for Everyone
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map(role => (
              <Link key={role.title} to={role.link}>
                <GlassCard hover className="p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/50 to-primary/30 flex items-center justify-center mb-6">
                    <role.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{role.title}</h3>
                  <p className="text-muted-foreground mb-4">{role.description}</p>
                  <span className="text-primary font-medium flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold gradient-text">HireGlass</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 HireGlass. All rights reserved.</p>
        </footer>
      </div>
    </PageLayout>
  );
};

export default Landing;
