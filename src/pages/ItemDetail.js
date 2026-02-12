import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User, Mail, ArrowLeft, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/utils/api';
import { toast } from 'sonner';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/items/${id}`);
      setItem(response.data);
    } catch (error) {
      toast.error('Failed to fetch item details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617]">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="loading-pulse text-slate-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="min-h-screen bg-[#020617]" data-testid="item-detail-page">
      <Navbar />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-slate-400 hover:text-white"
          data-testid="back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism rounded-3xl overflow-hidden"
        >
          {item.image_base64 && (
            <div className="w-full aspect-video bg-slate-900 relative">
              <img
                src={`data:image/jpeg;base64,${item.image_base64}`}
                alt={item.title}
                className="w-full h-full object-contain"
                data-testid="item-image"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge
                    className={item.type === 'lost' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}
                    data-testid="item-type-badge"
                  >
                    {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                  </Badge>
                  <Badge variant="outline" className="text-slate-400 border-slate-700" data-testid="item-category-badge">
                    {item.category}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2" data-testid="item-title">{item.title}</h1>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
                <p className="text-slate-300 leading-relaxed" data-testid="item-description">
                  {item.description || 'No description provided'}
                </p>
                {item.ai_extracted_features && (
                  <div className="mt-4 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                    <p className="text-sm font-medium text-violet-400 mb-2">AI-Extracted Features</p>
                    <p className="text-sm text-slate-400" data-testid="ai-features">{item.ai_extracted_features.substring(0, 200)}...</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Details</h2>
                
                <div className="flex items-start gap-3 p-4 glass-morphism rounded-xl" data-testid="location-info">
                  <MapPin className="w-5 h-5 text-violet-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Location</p>
                    <p className="text-white">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 glass-morphism rounded-xl" data-testid="date-info">
                  <Calendar className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Date Reported</p>
                    <p className="text-white">{new Date(item.created_at).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 glass-morphism rounded-xl" data-testid="user-info">
                  <User className="w-5 h-5 text-pink-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Reported By</p>
                    <p className="text-white">{item.user_name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-sm text-slate-500 text-center">
                Contact information will be shared when a potential match is found. Check your email and matches page for notifications.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ItemDetail;