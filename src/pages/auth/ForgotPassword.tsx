import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Briefcase, CheckCircle } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import { toast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    toast({
      title: "Email Sent!",
      description: "Check your inbox for password reset instructions.",
    });
  };

  return (
    <PageLayout>
      <div className="container max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold gradient-text">HireGlass</span>
          </Link>
          <h1 className="text-3xl font-display font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground">
            {isSubmitted 
              ? "Check your email for reset instructions"
              : "Enter your email and we'll send you a reset link"
            }
          </p>
        </div>

        <GlassCard className="p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
              <p className="text-muted-foreground mb-6">
                We've sent a password reset link to <span className="text-foreground">{email}</span>
              </p>
              <Link to="/login" className="gradient-button inline-flex items-center gap-2 px-6 py-3">
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="glass-input pl-12"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full gradient-button py-4 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </form>
          )}
        </GlassCard>
      </div>
    </PageLayout>
  );
};

export default ForgotPassword;
