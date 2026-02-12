import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import api from '@/utils/api';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['Electronics', 'Accessories', 'Documents', 'Clothing', 'Keys', 'Bags', 'Other'];

  const fetchItems = useCallback(async () => {
    try {
      const params = {};
      if (typeFilter !== 'all') params.type = typeFilter;
      if (categoryFilter !== 'all') params.category = categoryFilter;
      if (searchTerm) params.search = searchTerm;

      const response = await api.get('/items', { params });
      setItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  }, [typeFilter, categoryFilter, searchTerm]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSearch = () => {
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-[#24378e]" data-testid="dashboard-page">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Browse Items</h1>
          <p className="text-lg text-slate-400">Search through lost and found items in your community</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-morphism rounded-2xl p-6 mb-8"
          data-testid="filters-section"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="bg-slate-900/50 border-slate-800 focus:border-violet-500 rounded-xl h-12 pl-11 text-slate-200"
                  data-testid="search-input"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-slate-900/50 border-slate-800 rounded-xl h-12 text-slate-200" data-testid="type-filter">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="lost">Lost Items</SelectItem>
                  <SelectItem value="found">Found Items</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-slate-900/50 border-slate-800 rounded-xl h-12 text-slate-200" data-testid="category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            className="btn-primary rounded-full mt-4"
            data-testid="search-btn"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </motion.div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-pulse text-slate-400">Loading items...</div>
          </div>
        ) : items.length === 0 ? (
          <div className="glass-morphism rounded-2xl p-12 text-center" data-testid="no-items-message">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No items found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your filters or be the first to report an item</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="items-grid">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-morphism rounded-2xl overflow-hidden hover-lift cursor-pointer"
                onClick={() => navigate(`/items/${item.id}`)}
                data-testid={`item-card-${idx}`}
              >
                {item.image_base64 && (
                  <div className="aspect-video w-full bg-slate-900 relative overflow-hidden">
                    <img
                      src={`data:image/jpeg;base64,${item.image_base64}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      data-testid={`item-image-${idx}`}
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge className={item.type === 'lost' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'} data-testid={`item-type-badge-${idx}`}>
                        {item.type === 'lost' ? 'Lost' : 'Found'}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-slate-400 border-slate-700" data-testid={`item-category-badge-${idx}`}>
                      {item.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2" data-testid={`item-title-${idx}`}>{item.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2" data-testid={`item-description-${idx}`}>{item.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="w-4 h-4" />
                    <span data-testid={`item-location-${idx}`}>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                    <Calendar className="w-4 h-4" />
                    <span data-testid={`item-date-${idx}`}>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;