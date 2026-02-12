import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Upload, Bell, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white" data-testid="logo-text">SmartLOFO</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-slate-300 hover:text-white"
                data-testid="nav-login-btn"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="btn-primary rounded-full px-6"
                data-testid="nav-register-btn"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6">
                <span className="text-sm font-medium tracking-wider uppercase text-violet-400 bg-violet-500/10 px-4 py-2 rounded-full border border-violet-500/20">
                  AI-Powered Solution
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6 text-white">
                Never Lose Your
                <span className="text-gradient block mt-2">Belongings Again</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-10 max-w-2xl mx-auto">
                SmartLOFO uses advanced AI image recognition to reunite you with your lost items faster than ever. Report, match, and recover with confidence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => navigate('/register')}
                  size="lg"
                  className="btn-primary rounded-full px-8 h-14 text-lg font-semibold"
                  data-testid="hero-get-started-btn"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  size="lg"
                  variant="secondary"
                  className="glass-morphism hover:bg-white/10 rounded-full px-8 h-14 text-lg font-semibold text-white"
                  data-testid="hero-browse-btn"
                >
                  Browse Items
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Features Section */}
      <section className="py-20 lg:py-32 px-6" data-testid="features-section">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
              Powerful Features for
              <span className="text-gradient"> Quick Recovery</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Built with cutting-edge technology to make finding lost items seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-8 h-8 text-violet-400" />,
                title: 'AI Image Recognition',
                description: 'Upload photos and let our AI automatically extract features and find matches',
                testId: 'feature-ai'
              },
              {
                icon: <Bell className="w-8 h-8 text-cyan-400" />,
                title: 'Instant Notifications',
                description: 'Get email alerts the moment a potential match is found for your item',
                testId: 'feature-notifications'
              },
              {
                icon: <Search className="w-8 h-8 text-pink-400" />,
                title: 'Smart Search',
                description: 'Filter by category, location, and date to quickly find what you\'re looking for',
                testId: 'feature-search'
              },
              {
                icon: <Upload className="w-8 h-8 text-orange-400" />,
                title: 'Easy Reporting',
                description: 'Simple forms with GPS location tagging make reporting items effortless',
                testId: 'feature-reporting'
              },
              {
                icon: <Shield className="w-8 h-8 text-emerald-400" />,
                title: 'Secure & Private',
                description: 'Your data is protected with industry-standard security measures',
                testId: 'feature-security'
              },
              {
                icon: <Users className="w-8 h-8 text-indigo-400" />,
                title: 'Community Driven',
                description: 'Join a community of helpful people reuniting owners with belongings',
                testId: 'feature-community'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-6 hover-lift"
                data-testid={feature.testId}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-slate-950/50" data-testid="how-it-works-section">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-400">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Report Your Item',
                description: 'Upload a photo and description of your lost or found item',
                testId: 'step-report'
              },
              {
                step: '02',
                title: 'AI Finds Matches',
                description: 'Our AI analyzes images and automatically finds potential matches',
                testId: 'step-match'
              },
              {
                step: '03',
                title: 'Get Connected',
                description: 'Receive instant email notifications and connect with the other party',
                testId: 'step-connect'
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative"
                data-testid={step.testId}
              >
                <div className="glass-morphism rounded-2xl p-8 text-center relative z-10">
                  <div className="text-6xl font-bold text-gradient mb-4">{step.step}</div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-6" data-testid="cta-section">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-3xl p-12 text-center neon-glow"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Items?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have successfully reunited with their belongings using SmartLOFO
            </p>
            <Button 
              onClick={() => navigate('/register')}
              size="lg"
              className="btn-primary rounded-full px-10 h-14 text-lg font-semibold"
              data-testid="cta-register-btn"
            >
              Start Now - It's Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6" data-testid="footer">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SmartLOFO</span>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/about')} className="text-slate-400 hover:text-white transition-colors" data-testid="footer-about-link">
                About Us
              </button>
              <button onClick={() => navigate('/privacy')} className="text-slate-400 hover:text-white transition-colors" data-testid="footer-privacy-link">
                Privacy Policy
              </button>
            </div>
            <p className="text-slate-500 text-sm">© 2025 SmartLOFO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;