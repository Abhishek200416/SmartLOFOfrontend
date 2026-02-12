import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Package, ArrowRight, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/utils/api';
import { toast } from 'sonner';

const Matches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rematchingId, setRematchingId] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await api.get('/matches');
      setMatches(response.data);
    } catch (error) {
      toast.error('Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  const handleRematch = async (matchId, matchIndex) => {
    setRematchingId(matchId);
    try {
      const response = await api.post(`/matches/${matchId}/rematch`);
      const newConfidence = response.data.new_confidence;

      // Update the match confidence in the local state
      setMatches(prevMatches => {
        const updatedMatches = [...prevMatches];
        updatedMatches[matchIndex].similarity_score = newConfidence;
        return updatedMatches;
      });

      toast.success(`Match confidence updated to ${Math.round(newConfidence * 100)}%`);
    } catch (error) {
      toast.error('Failed to update match confidence');
    } finally {
      setRematchingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617]" data-testid="matches-page">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Potential Matches</h1>
          <p className="text-lg text-slate-400">AI-discovered connections between lost and found items</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-pulse text-slate-400">Loading matches...</div>
          </div>
        ) : matches.length === 0 ? (
          <div className="glass-morphism rounded-2xl p-12 text-center" data-testid="no-matches-message">
            <Heart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No matches yet</h3>
            <p className="text-slate-400 mb-6">Our AI is continuously searching for matches. Check your email for notifications!</p>
            <Button onClick={() => navigate('/dashboard')} className="btn-primary rounded-full" data-testid="browse-items-btn">
              Browse Items
            </Button>
          </div>
        ) : (
          <div className="space-y-6" data-testid="matches-list">
            {rematchingId && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-slate-800/90 rounded-2xl p-8">
                  <p className="text-white text-lg font-medium">AI is rematching...</p>
                </div>
              </div>
            )}
            {matches.map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-morphism rounded-2xl p-6"
                data-testid={`match-card-${idx}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Match Found!</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-violet-500/20 text-violet-400 border-violet-500/30" data-testid={`match-score-${idx}`}>
                        {Math.round(match.similarity_score * 100)}% Match
                      </Badge>
                      <span className="text-sm text-slate-500" data-testid={`match-date-${idx}`}>
                        Found on {new Date(match.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRematch(match.id, idx)}
                    size="sm"
                    disabled={rematchingId === match.id}
                    className="bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 disabled:opacity-50"
                    data-testid={`rematch-btn-${idx}`}
                  >
                    {rematchingId === match.id ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        AI Rematching...
                      </>
                    ) : (
                      'Re-match'
                    )}
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Lost Item */}
                  <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-5 h-5 text-orange-400" />
                      <span className="text-sm font-medium text-orange-400">Lost Item</span>
                    </div>
                    {match.lost_item.image_base64 && (
                      <img
                        src={`data:image/jpeg;base64,${match.lost_item.image_base64}`}
                        alt={match.lost_item.title}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                        data-testid={`match-lost-image-${idx}`}
                      />
                    )}
                    <h4 className="text-lg font-semibold text-white mb-2" data-testid={`match-lost-title-${idx}`}>{match.lost_item.title}</h4>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2" data-testid={`match-lost-description-${idx}`}>{match.lost_item.description}</p>
                    <p className="text-xs text-slate-500 mb-3">Location: {match.lost_item.location}</p>
                    <Button
                      onClick={() => navigate(`/items/${match.lost_item.id}`)}
                      size="sm"
                      variant="outline"
                      className="w-full bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                      data-testid={`view-lost-item-btn-${idx}`}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {/* Found Item */}
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-400">Found Item</span>
                    </div>
                    {match.found_item.image_base64 && (
                      <img
                        src={`data:image/jpeg;base64,${match.found_item.image_base64}`}
                        alt={match.found_item.title}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                        data-testid={`match-found-image-${idx}`}
                      />
                    )}
                    <h4 className="text-lg font-semibold text-white mb-2" data-testid={`match-found-title-${idx}`}>{match.found_item.title}</h4>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2" data-testid={`match-found-description-${idx}`}>{match.found_item.description}</p>
                    <p className="text-xs text-slate-500 mb-3">Location: {match.found_item.location}</p>
                    <Button
                      onClick={() => navigate(`/items/${match.found_item.id}`)}
                      size="sm"
                      variant="outline"
                      className="w-full bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                      data-testid={`view-found-item-btn-${idx}`}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                  <p className="text-sm text-slate-300">
                    <span className="font-medium text-violet-400">Note:</span> Both parties have been notified via email. Please coordinate to verify and arrange item return.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;