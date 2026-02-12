import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Trash2, MapPin, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import api from '@/utils/api';
import { toast } from 'sonner';

const MyItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const response = await api.get('/items/my-items');
      setItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/items/${itemId}`);
      toast.success('Item deleted successfully');
      setItems(items.filter(item => item.id !== itemId));
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617]" data-testid="my-items-page">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">My Items</h1>
          <p className="text-lg text-slate-400">Manage your reported lost and found items</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-pulse text-slate-400">Loading items...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="glass-morphism rounded-2xl p-12 text-center" data-testid="no-items-message">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No items yet</h3>
            <p className="text-slate-400 mb-6">Start by reporting a lost or found item</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate('/report-lost')} className="btn-primary rounded-full" data-testid="no-items-report-lost-btn">
                Report Lost Item
              </Button>
              <Button onClick={() => navigate('/report-found')} variant="secondary" className="glass-morphism hover:bg-white/10 rounded-full text-white" data-testid="no-items-report-found-btn">
                Report Found Item
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="my-items-grid">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-morphism rounded-2xl overflow-hidden hover-lift"
                data-testid={`my-item-card-${idx}`}
              >
                {item.image_base64 && (
                  <div className="aspect-video w-full bg-slate-900 relative overflow-hidden cursor-pointer" onClick={() => navigate(`/items/${item.id}`)}>
                    <img
                      src={`data:image/jpeg;base64,${item.image_base64}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      data-testid={`my-item-image-${idx}`}
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge className={item.type === 'lost' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'} data-testid={`my-item-type-${idx}`}>
                        {item.type === 'lost' ? 'Lost' : 'Found'}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-slate-400 border-slate-700" data-testid={`my-item-category-${idx}`}>
                      {item.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 cursor-pointer" onClick={() => navigate(`/items/${item.id}`)} data-testid={`my-item-title-${idx}`}>{item.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2" data-testid={`my-item-description-${idx}`}>{item.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span data-testid={`my-item-location-${idx}`}>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span data-testid={`my-item-date-${idx}`}>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  <Button
                    onClick={() => setDeleteId(item.id)}
                    variant="destructive"
                    size="sm"
                    className="w-full rounded-xl"
                    data-testid={`delete-item-btn-${idx}`}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This action cannot be undone. This will permanently delete your item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-white hover:bg-slate-700" data-testid="cancel-delete-btn">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700"
              data-testid="confirm-delete-btn"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyItems;