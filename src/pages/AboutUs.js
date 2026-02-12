import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617]" data-testid="about-page">
      <div className="hero-gradient">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-slate-400 hover:text-white"
            data-testid="back-btn"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About SmartLOFO</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Revolutionizing lost and found management with artificial intelligence
            </p>
          </motion.div>

          <div className="glass-morphism rounded-3xl p-8 md:p-12 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                In the digital era, managing lost and found belongings within colleges remains inefficient due to manual and time-consuming processes. SmartLOFO transforms this experience by leveraging advanced AI image recognition technology to reunite people with their lost items faster than ever before.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">The Problem We Solve</h2>
              <p className="text-slate-300 leading-relaxed text-lg mb-4">
                Traditional lost and found systems rely on manual email or text-based reporting, leading to poor organization and low recovery rates of only 65-70%. Items often go unclaimed, and the matching process is slow and inefficient.
              </p>
              <p className="text-slate-300 leading-relaxed text-lg">
                SmartLOFO addresses these challenges with AI-powered image recognition, smart location tagging, and automated matching, achieving an impressive accuracy rate of 80-90%.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI Recognition</h3>
                  <p className="text-slate-400">Our AI analyzes images to extract features and automatically generate descriptions</p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Matching</h3>
                  <p className="text-slate-400">Intelligent algorithms compare lost and found items to discover potential matches</p>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Instant Alerts</h3>
                  <p className="text-slate-400">Email notifications connect owners with their belongings within minutes</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Built for the Future</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                SmartLOFO is designed to be accessible across all devices - desktop, tablet, and mobile. Our responsive web platform ensures that anyone can report or search for items anytime, anywhere. We're constantly improving our AI models and expanding features to make lost and found management effortless for communities everywhere.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;