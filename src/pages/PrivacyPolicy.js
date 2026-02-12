import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617]" data-testid="privacy-page">
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Privacy Policy</h1>
            <p className="text-xl text-slate-300">
              Last updated: January 2025
            </p>
          </motion.div>

          <div className="glass-morphism rounded-3xl p-8 md:p-12 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                When you use SmartLOFO, we collect the following information:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Account information (name, email address)</li>
                <li>Item details (title, description, category, location)</li>
                <li>Images of lost or found items</li>
                <li>GPS coordinates (if you choose to share your location)</li>
                <li>Usage data and interactions with the platform</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Match lost and found items using AI technology</li>
                <li>Send email notifications about potential matches</li>
                <li>Improve our AI algorithms and service quality</li>
                <li>Maintain and secure your account</li>
                <li>Comply with legal obligations</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">3. AI Image Processing</h2>
              <p className="text-slate-300 leading-relaxed">
                Uploaded images are processed by our AI system to extract features and generate descriptions. Images are stored securely and are only visible to users actively searching for lost or found items. We use industry-standard encryption to protect your data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
              <p className="text-slate-300 leading-relaxed">
                We do not sell your personal information. Contact details are only shared between parties when a potential match is found. We may share anonymized data for research purposes to improve lost and found recovery rates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
              <p className="text-slate-300 leading-relaxed">
                Item listings are retained for 90 days or until marked as resolved. You can delete your items at any time from the "My Items" page. Account data is retained until you request account deletion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Opt-out of email notifications</li>
                <li>Request a copy of your data</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">7. Security</h2>
              <p className="text-slate-300 leading-relaxed">
                We implement industry-standard security measures including encryption, secure authentication, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us through the SmartLOFO platform or email us directly.
              </p>
            </motion.div>

            <div className="border-t border-white/10 pt-6 mt-8">
              <p className="text-sm text-slate-500 text-center">
                By using SmartLOFO, you agree to this Privacy Policy. We may update this policy periodically, and continued use constitutes acceptance of changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;