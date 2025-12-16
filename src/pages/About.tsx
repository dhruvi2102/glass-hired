import PageLayout from '@/components/layout/PageLayout';
import { Users, Target, Heart, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'People First',
      description: 'We believe in putting people at the center of everything we do, connecting talent with opportunity.',
    },
    {
      icon: Target,
      title: 'Mission Driven',
      description: 'Our mission is to revolutionize the way people find jobs and companies find talent.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about helping individuals achieve their career goals and dreams.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every interaction, every match, and every connection we facilitate.',
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">JobPortal</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to connect talented professionals with their dream careers and help companies find the perfect candidates.
          </p>
        </div>

        {/* Story Section */}
        <div className="glass-card p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2024, JobPortal emerged from a simple observation: the job search process was broken. 
              Both job seekers and employers were frustrated with outdated systems, endless applications, and poor matches.
            </p>
            <p>
              We set out to create a platform that prioritizes meaningful connections over volume. 
              Using modern technology and a human-centered approach, we've built a recruitment ecosystem that works for everyone.
            </p>
            <p>
              Today, JobPortal serves thousands of job seekers and employers, facilitating career moves that matter. 
              But we're just getting started. Our vision is to become the most trusted platform for career advancement worldwide.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="glass-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">50K+</div>
              <div className="text-muted-foreground">Job Seekers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">5K+</div>
              <div className="text-muted-foreground">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
