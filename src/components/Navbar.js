import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Home, Upload, Package, User, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/utils/auth';
import { toast } from 'sonner';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard', testId: 'nav-dashboard' },
    { icon: Package, label: 'My Items', path: '/my-items', testId: 'nav-my-items' },
    { icon: Bell, label: 'Matches', path: '/matches', testId: 'nav-matches' },
    { icon: User, label: 'Profile', path: '/profile', testId: 'nav-profile' },
  ];

  return (
    <nav className="glass-morphism border-b border-white/10" data-testid="main-navbar">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')} data-testid="logo">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">SmartLOFO</span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => navigate(item.path)}
                  className={`${
                    location.pathname === item.path
                      ? 'text-white bg-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  } transition-colors`}
                  data-testid={item.testId}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/report-lost')}
              className="btn-primary rounded-full font-semibold"
              data-testid="nav-report-lost-btn"
            >
              <Upload className="w-4 h-4 mr-2" />
              Report Lost
            </Button>
            <Button
              onClick={() => navigate('/report-found')}
              variant="secondary"
              className="glass-morphism hover:bg-white/10 rounded-full font-semibold text-white hidden sm:flex"
              data-testid="nav-report-found-btn"
            >
              <Upload className="w-4 h-4 mr-2" />
              Report Found
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-slate-400 hover:text-white"
              data-testid="nav-logout-btn"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-around mt-4 pt-4 border-t border-white/10">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`${
                location.pathname === item.path
                  ? 'text-white bg-white/10'
                  : 'text-slate-400'
              } flex-col h-auto py-2`}
              data-testid={`${item.testId}-mobile`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;