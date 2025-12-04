import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Building2, Search, Shield, Zap } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';

const Landing = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Job Matching',
      description: 'Our AI-powered system matches you with the perfect opportunities based on your skills and preferences.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security. Control who sees your profile.',
    },
    {
      icon: Zap,
      title: 'Instant Applications',
      description: 'Apply to multiple jobs with one click. Track all your applications in one place.',
    },
  ];

  const roles = [
    {
      icon: Users,
      title: 'Job Seekers',
      description: 'Find your dream job with powerful search and personalized recommendations.',
      link: '/signup?role=job_seeker',
    },
    {
      icon: Building2,
      title: 'Employers',
      description: 'Post jobs and find top talent. Manage applications effortlessly.',
      link: '/signup?role=employer',
    },
    {
      icon: Briefcase,
      title: 'Recruiters',
      description: 'Connect candidates with opportunities. Streamline your recruitment workflow.',
      link: '/signup?role=recruiter',
    },
  ];

  return (
    <PageLayout>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center py-16 lg:py-24">
          <div className="animate-slide-up">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary mb-6">
              The Future of Recruitment
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="gradient-text block">Career Match</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Connect with top companies and talent through our premium recruitment platform. 
              Beautiful, fast, and designed for the modern workforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="gradient-button text-lg px-8 py-4 inline-flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="glass-button text-lg px-8 py-4">
                Sign In
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-slide-up animation-delay-200">
            {[
              { value: '10K+', label: 'Active Jobs' },
              { value: '50K+', label: 'Job Seekers' },
              { value: '5K+', label: 'Companies' },
              { value: '95%', label: 'Success Rate' },
            ].map(stat => (
              <GlassCard key={stat.label} className="p-6">
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose HireGlass?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We've built the most intuitive recruitment platform with features that make hiring effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlassCard 
                key={feature.title} 
                hover 
                className={`p-8 animate-slide-up animation-delay-${(index + 1) * 200}`}
              >
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Built for Everyone
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you're looking for a job or looking to hire, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <Link key={role.title} to={role.link}>
                <GlassCard hover className="p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/50 to-primary/30 flex items-center justify-center mb-6">
                    <role.icon className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{role.title}</h3>
                  <p className="text-muted-foreground mb-4">{role.description}</p>
                  <span className="text-primary font-medium inline-flex items-center gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <GlassCard className="p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Transform Your Career?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of professionals who have found their dream jobs through HireGlass.
              </p>
              <Link to="/signup" className="gradient-button text-lg px-8 py-4 inline-flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </GlassCard>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold gradient-text">HireGlass</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 HireGlass. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </PageLayout>
  );
};

export default Landing;
