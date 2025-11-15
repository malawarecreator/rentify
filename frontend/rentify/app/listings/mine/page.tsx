// app/listings/mine/page.tsx
"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ListingCard, { Listing } from "@/components/listings/ListingCard";
import AddListingModal from "@/components/modals/AddListingModal";

const myListings: Listing[] = [
  {
    id: "1",
    title: "Cordless drill + bit set",
    description: "Perfect for quick home projects and assembly.",
    imageUrl:
      "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/1",
    price: "$8 / day",
    distance: "Your home",
    sellerName: "You",
    sellerAvatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.9,
  },
];

export default function MyListingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewListing = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleListingSubmit = (listingData: any) => {
    console.log('New listing created:', listingData);
    // In a real app, this would send to an API and refresh the listings
    alert('Listing created successfully! (This is a demo)');
  };

  return (
    <AppShell>
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">My listings</h1>
        <button
          onClick={handleNewListing}
          className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-zinc-950 hover:bg-emerald-300 transition-colors"
        >
          + New listing
        </button>
      </div>

      {myListings.length === 0 ? (
        <p className="text-sm text-zinc-400">
          You don’t have any listings yet. Start by adding your first item.
        </p>
      ) : (
        <div className="space-y-3">
          {myListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {/* Add Listing Modal */}
      <AddListingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleListingSubmit}
      />
    </AppShell>
  );
}