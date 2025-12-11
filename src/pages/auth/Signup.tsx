import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building2,
  Briefcase,
  Users,
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import GlassCard from "@/components/ui/GlassCard";
import { toast } from "@/hooks/use-toast";

/* ---------------------- Types ---------------------- */
type RoleOption = {
  value: UserRole;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

/* ---------------------- Component ---------------------- */
const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup } = useAuth();

  /* Form State */
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [role, setRole] = useState<UserRole>(
    (searchParams.get("role") as UserRole) || "job_seeker"
  );

  /* Role Options */
  const roles: RoleOption[] = [
    {
      value: "job_seeker",
      label: "Job Seeker",
      icon: User,
      description: "Find your dream job",
    },
    {
      value: "employer",
      label: "Employer",
      icon: Building2,
      description: "Hire top talent",
    },
    {
      value: "recruiter",
      label: "Recruiter",
      icon: Users,
      description: "Connect candidates",
    },
    {
      value: "agency",
      label: "Agency",
      icon: Briefcase,
      description: "Manage placements",
    },
  ];

  const needsCompany = role === "employer" || role === "agency";

  /* ---------------------- Submit Handler ---------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(
        email,
        password,
        name,
        role,
        company || undefined
      );

      if (success) {
        toast({
          title: "Account Created!",
          description: "Welcome to HireGlass.",
        });

        navigate(
          role === "job_seeker" ? "/seeker/dashboard" : "/employer/dashboard"
        );
      }
    } catch {
      toast({
        title: "Signup Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------------- UI ---------------------- */
  return (
    <PageLayout>
      <div className="container max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold gradient-text">
              HireGlass
            </span>
          </Link>

          <h1 className="text-3xl font-display font-bold mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Join thousands of professionals on HireGlass
          </p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => {
                  const ActiveIcon = r.icon;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        role === r.value
                          ? "bg-primary/20 border-primary/50 border-2"
                          : "bg-white/5 border border-white/10 hover:border-white/20"
                      }`}
                    >
                      <ActiveIcon
                        className={`w-5 h-5 mb-2 ${
                          role === r.value
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <div className="font-medium text-sm">{r.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {r.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="glass-input pl-12"
                />
              </div>
            </div>

            {/* Company (conditional) */}
            {needsCompany && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                    required={needsCompany}
                    className="glass-input pl-12"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="glass-input pl-12 pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="glass-input pl-12"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-button py-4 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Redirect */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </PageLayout>
  );
};

export default Signup;
