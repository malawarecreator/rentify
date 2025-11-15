"use client";

import React, { useState } from "react";
import { createListing } from "@/lib/api";

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorId: string | null;
  onCreated?: () => void;
}

const intervals = ["daily", "weekly", "monthly"] as const;

type Interval = (typeof intervals)[number];

const AddListingModal: React.FC<AddListingModalProps> = ({ isOpen, onClose, authorId, onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("10");
  const [interval, setInterval] = useState<Interval>("daily");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("10");
    setInterval("daily");
    setFile(null);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!authorId) {
      setError("Log in to create a listing.");
      return;
    }
    if (!file) {
      setError("Upload a photo before submitting.");
      return;
    }
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await createListing({
        title: title.trim(),
        body: description.trim(),
        price: parseFloat(price),
        interval,
        author: authorId,
        file,
      });
      resetForm();
      onClose();
      onCreated?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to create listing";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-green-200 rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-green-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Listing</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Item Title *</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Power washer for the weekend"
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              placeholder="Share more details so neighbors know what to expect"
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                min="1"
                step="0.5"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Interval *</label>
              <select
                value={interval}
                onChange={(event) => setInterval(event.target.value as Interval)}
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {intervals.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo *</label>
            <input
              type="file"
              accept="image/*,.png,.jpg,.jpeg,.webp"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="w-full"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-emerald-500 px-4 py-3 text-white font-semibold hover:bg-emerald-600 disabled:opacity-60"
          >
            {isSubmitting ? "Publishing…" : "Publish listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListingModal;
