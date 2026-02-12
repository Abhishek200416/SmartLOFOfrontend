import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, MapPin, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/utils/api';
import { toast } from 'sonner';

const ReportLost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    gps_coords: null,
    image_base64: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ['Electronics', 'Accessories', 'Documents', 'Clothing', 'Keys', 'Bags', 'Other'];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setFormData({ ...formData, image_base64: base64String });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setFormData({
          ...formData,
          gps_coords: coords,
          location: formData.location || `Lat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)}`
        });
        toast.success('Location captured successfully');
        setGettingLocation(false);
      },
      (error) => {
        toast.error('Unable to get location. Please enter manually.');
        setGettingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/items', {
        ...formData,
        type: 'lost'
      });
      toast.success('Lost item reported successfully! AI is finding matches...');
      navigate('/my-items');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to report item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617]" data-testid="report-lost-page">
      <Navbar />

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Report Lost Item</h1>
          <p className="text-lg text-slate-400">Provide details to help us find your item using AI matching</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-morphism rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div data-testid="image-upload-field">
              <Label className="text-slate-300 mb-3 block text-base">Upload Image</Label>
              <div className="image-upload-zone rounded-xl p-8 text-center cursor-pointer" onClick={() => document.getElementById('image-input').click()}>
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" data-testid="image-preview" />
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setFormData({ ...formData, image_base64: null });
                      }}
                      variant="secondary"
                      className="mt-4"
                      data-testid="remove-image-btn"
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400 mb-1">Click to upload an image</p>
                    <p className="text-slate-600 text-sm">PNG, JPG up to 5MB</p>
                  </>
                )}
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  data-testid="image-input"
                />
              </div>
            </div>

            {/* Title */}
            <div data-testid="title-field">
              <Label htmlFor="title" className="text-slate-300 mb-2 block text-base">Item Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Blue Backpack"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-900/50 border-slate-800 focus:border-violet-500 rounded-xl h-12 text-slate-200"
                required
                data-testid="title-input"
              />
            </div>

            {/* Category */}
            <div data-testid="category-field">
              <Label className="text-slate-300 mb-2 block text-base">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-slate-900/50 border-slate-800 rounded-xl h-12 text-slate-200" data-testid="category-select">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div data-testid="description-field">
              <Label htmlFor="description" className="text-slate-300 mb-2 block text-base">Description (Optional - AI will help)</Label>
              <Textarea
                id="description"
                placeholder="Describe your item... AI will also extract details from the image"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-slate-900/50 border-slate-800 focus:border-violet-500 rounded-xl text-slate-200 min-h-24"
                data-testid="description-input"
              />
            </div>

            {/* Location */}
            <div data-testid="location-field">
              <Label htmlFor="location" className="text-slate-300 mb-2 block text-base">Location</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., Library Block A"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-slate-900/50 border-slate-800 focus:border-violet-500 rounded-xl h-12 text-slate-200 flex-1"
                  required
                  data-testid="location-input"
                />
                <Button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={gettingLocation}
                  variant="secondary"
                  className="glass-morphism hover:bg-white/10 rounded-xl text-white"
                  data-testid="get-location-btn"
                >
                  {gettingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                </Button>
              </div>
              {formData.gps_coords && (
                <p className="text-xs text-slate-500 mt-2" data-testid="gps-coords-display">
                  GPS: {formData.gps_coords.lat.toFixed(6)}, {formData.gps_coords.lng.toFixed(6)}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="btn-primary rounded-full h-12 flex-1 font-semibold"
                disabled={loading}
                data-testid="submit-btn"
              >
                {loading ? 'Reporting...' : 'Report Lost Item'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-slate-400 hover:text-white"
                data-testid="cancel-btn"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportLost;