"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchListings, type Listing } from "@/lib/api";

// Fallback dummy data for when API is unavailable
const fallbackListings: Listing[] = [
  {
    id: "demo-1",
    title: "Power washer available this weekend",
    body: "Perfect for driveways and patios. Located a few minutes away. Daily and weekend rates available.",
    storageRelationLinks: ["https://images.pexels.com/photos/5854188/pexels-photo-5854188.jpeg?auto=compress&cs=tinysrgb&w=800"],
    author: "Demo User",
    ratings: [],
    applications: [],
    price: 18,
    interval: "day",
    available: true,
  },
  {
    id: "demo-2",
    title: "Folding tables for parties & events",
    body: "Set of two 6 ft folding tables. Great for birthdays, garage sales, and neighborhood events.",
    storageRelationLinks: ["https://images.pexels.com/photos/5877416/pexels-photo-5877416.jpeg?auto=compress&cs=tinysrgb&w=800"],
    author: "Demo User",
    ratings: [],
    applications: [],
    price: 12,
    interval: "day",
    available: true,
  },
  {
    id: "demo-3",
    title: "Extension ladder - 24 feet",
    body: "Heavy-duty aluminum extension ladder. Perfect for painting, cleaning gutters, or roof access.",
    storageRelationLinks: ["https://images.pexels.com/photos/162553/keys-to-success-ladder-lock-key-162553.jpeg?auto=compress&cs=tinysrgb&w=800"],
    author: "Demo User",
    ratings: [],
    applications: [],
    price: 15,
    interval: "day",
    available: false,
  },
];

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchListings();
      setListings(data);
      setUsingFallback(false);
    } catch (err) {
      console.warn("API unavailable, using fallback data:", err);

      // Provide more specific error messages
      let errorMessage = "Using demo data - API unavailable";
      if (err instanceof Error) {
        if (err.message.includes('CORS')) {
          errorMessage = "CORS error: Backend needs CORS configuration. Using demo data.";
        } else if (err.message.includes('fetch')) {
          errorMessage = "Network error: Cannot connect to API. Using demo data.";
        }
      }

      setListings(fallbackListings);
      setUsingFallback(true);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { listings, loading, error, refresh, usingFallback };
}
