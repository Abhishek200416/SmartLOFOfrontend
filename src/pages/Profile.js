import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Save } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/utils/api';
import { getUser, setUser as setLocalUser } from '@/utils/auth';
import { toast } from 'sonner';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put('/auth/profile', formData);
      setLocalUser(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617]" data-testid="profile-page">
      <Navbar />

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Profile Settings</h1>
          <p className="text-lg text-slate-400">Manage your account information</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-morphism rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div data-testid="name-field">
              <Label htmlFor="name" className="text-slate-300 mb-2 block text-base">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-900/50 border-slate-800 focus:border-violet-500 rounded-xl h-12 pl-11 text-slate-200"
                  required
                  data-testid="name-input"
                />
              </div>
            </div>

            <div data-testid="email-field">
              <Label htmlFor="email" className="text-slate-300 mb-2 block text-base">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-900/50 border-slate-800 focus:border-violet-500 rounded-xl h-12 pl-11 text-slate-200"
                  required
                  data-testid="email-input"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="btn-primary rounded-full h-12 w-full font-semibold"
              disabled={loading}
              data-testid="save-btn"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;