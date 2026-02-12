import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import api from '@/utils/api';
import { setToken, setUser } from '@/utils/auth';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setToken(response.data.token);
      setUser(response.data.user);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-6 py-12" data-testid="register-page">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-slate-400 hover:text-white"
          data-testid="back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="glass-morphism rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
              <Search className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">SmartLOFO</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Join SmartLOFO and start recovering items</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div data-testid="name-field">
              <Label htmlFor="name" className="text-slate-300 mb-2 block">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-900/50 border-slate-800 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl h-12 pl-11 text-slate-200"
                  required
                  data-testid="name-input"
                />
              </div>
            </div>

            <div data-testid="email-field">
              <Label htmlFor="email" className="text-slate-300 mb-2 block">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-900/50 border-slate-800 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl h-12 pl-11 text-slate-200"
                  required
                  data-testid="email-input"
                />
              </div>
            </div>

            <div data-testid="password-field">
              <Label htmlFor="password" className="text-slate-300 mb-2 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-slate-900/50 border-slate-800 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl h-12 pl-11 text-slate-200"
                  required
                  data-testid="password-input"
                />
              </div>
            </div>

            <div data-testid="confirm-password-field">
              <Label htmlFor="confirmPassword" className="text-slate-300 mb-2 block">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-slate-900/50 border-slate-800 focus:border-violet-500 focus:ring-violet-500/20 rounded-xl h-12 pl-11 text-slate-200"
                  required
                  data-testid="confirm-password-input"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-primary rounded-full h-12 text-base font-semibold"
              disabled={loading}
              data-testid="register-submit-btn"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-violet-400 hover:text-violet-300 font-medium"
                data-testid="goto-login-link"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default Register;