// app/listings/[id]/page.tsx
"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

export default function ListingDetailPage() {
  const params = useParams();
  const id = params?.id;

  // Simple MVP listing data
  const listing = {
    title: "Power washer available",
    description: "Perfect for driveways and patios. Located a few minutes away. Daily and weekend rates available.",
    imageUrl: "https://images.pexels.com/photos/5854188/pexels-photo-5854188.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$18 / day",
    seller: {
      name: "Alex Martinez",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 4.9
    }
  };

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleApply = async () => {
    setStatus("sending");

    // Simulate API call
    setTimeout(() => {
      setStatus("sent");
      console.log("Rental request for listing:", id);
    }, 1000);
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Button */}
        <div className="flex items-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to listings
          </Link>
        </div>

        {/* Image */}
        <div className="rounded-2xl border border-green-200 bg-white overflow-hidden">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
          <p className="text-gray-700 leading-relaxed text-lg">{listing.description}</p>
        </div>

        {/* Owner Info */}
        <div className="rounded-2xl border border-green-200 bg-white p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">About the Owner</h2>
          <div className="flex items-center gap-4">
            <img
              src={listing.seller.avatar}
              alt={listing.seller.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
            />
            <div>
              <p className="text-lg font-semibold text-gray-900">{listing.seller.name}</p>
              <p className="text-sm text-gray-600">⭐ {listing.seller.rating} rating</p>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="rounded-2xl border border-green-200 bg-white p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold text-green-600">{listing.price}</span>
          </div>

          <button
            onClick={handleApply}
            disabled={status === "sending"}
            className="w-full rounded-lg bg-green-600 px-6 py-4 text-lg font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "sending" ? "Sending..." : "Apply to Rent"}
          </button>

          {status === "sent" && (
            <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-lg text-green-800 text-center">
                ✅ Request sent! The owner will respond soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}