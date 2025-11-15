'use client';

import React, { useState } from 'react';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (listingData: any) => void;
}

const categories = [
  'Tools & Hardware',
  'Party & Events',
  'Sports & Outdoors',
  'Parking & Storage',
  'Electronics',
  'Home & Garden',
  'Vehicles',
  'Other'
];

const AddListingModal: React.FC<AddListingModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    pricePerDay: '',
    deposit: '',
    location: '',
    availability: '',
    imageUrl: '',
    condition: 'Good',
    brand: '',
    model: '',
    year: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || !formData.category || !formData.pricePerDay) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newListing = {
        ...formData,
        id: Date.now().toString(),
        sellerName: 'You',
        sellerRating: 5.0,
        createdAt: new Date().toISOString()
      };

      onSubmit(newListing);
      onClose();

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        pricePerDay: '',
        deposit: '',
        location: '',
        availability: '',
        imageUrl: '',
        condition: 'Good',
        brand: '',
        model: '',
        year: ''
      });
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-green-200 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-green-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Listing</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-green-700 uppercase tracking-wider">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Item Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Power washer for outdoor cleaning"
                  className="w-full px-4 py-3 bg-white border border-green-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-green-300 rounded-lg text-gray-900 focus:border-green-500 focus:outline-none text-base"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-base font-medium text-zinc-300 mb-3">
                  Condition
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 focus:border-emerald-500 focus:outline-none text-base"
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Repair">Needs Repair</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-zinc-300 mb-3">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Describe your item in detail. Include any special features, dimensions, or usage instructions..."
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none resize-none text-base"
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-zinc-300 uppercase tracking-wider">
              Pricing & Deposit
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium text-zinc-300 mb-3">
                  Price per Day ($) *
                </label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleInputChange}
                  placeholder="25"
                  min="1"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-zinc-300 mb-3">
                  Security Deposit ($)
                </label>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleInputChange}
                  placeholder="50"
                  min="0"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none text-base"
                />
              </div>
            </div>
          </div>

          {/* Location & Availability */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-zinc-300 uppercase tracking-wider">
              Location & Availability
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium text-zinc-300 mb-3">
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Main St, Pleasanton"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none text-base"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-zinc-300 mb-3">
                  Availability
                </label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  placeholder="e.g., Weekends, Weekdays after 5pm"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none text-base"
                />
              </div>
            </div>
          </div>

          {/* Optional Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-zinc-300 uppercase tracking-wider">
              Optional Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-base font-medium text-zinc-300 mb-3">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Karcher"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none text-base"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-zinc-300 mb-3">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., K1700"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none text-base"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-zinc-300 mb-3">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="2020"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none text-base"
                />
              </div>
            </div>
          </div>

          {/* Image URL (placeholder for now) */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-zinc-300 uppercase tracking-wider">
              Photos
            </h3>

            <div>
              <label className="block text-base font-medium text-zinc-300 mb-3">
                Image URL (temporary)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none text-base"
              />
              <p className="text-sm text-zinc-500 mt-2">
                Add a photo URL for now. File upload coming soon!
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-green-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-green-300 text-gray-700 rounded-lg hover:bg-green-50 transition-colors text-base font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-semibold"
            >
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingModal;
