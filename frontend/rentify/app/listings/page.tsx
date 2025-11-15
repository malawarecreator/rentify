// app/listings/page.tsx
"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ListingCard, { Listing } from "@/components/listings/ListingCard";

const dummyListings: Listing[] = [
  {
    id: "1",
    title: "Power washer available this weekend",
    description:
      "Perfect for driveways and patios. Located a few minutes away. Daily and weekend rates available.",
    imageUrl:
      "https://images.pexels.com/photos/5854188/pexels-photo-5854188.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/1",
    price: "$18 / day",
    distance: "2 houses away",
    sellerName: "Alex Martinez",
    sellerAvatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.9,
  },
  {
    id: "2",
    title: "Folding tables for parties & events",
    description:
      "Set of two 6 ft folding tables. Great for birthdays, garage sales, and neighborhood events.",
    imageUrl:
      "https://images.pexels.com/photos/5877416/pexels-photo-5877416.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "/listings/2",
    price: "$12 / day",
    distance: "0.4 miles away",
    sellerName: "Priya Shah",
    sellerAvatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    sellerRating: 4.7,
  },
];

export default function ListingsPage() {
  return (
    <AppShell>
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Browse listings</h1>
        <span className="text-xs text-zinc-500">
          {dummyListings.length} items near you
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dummyListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </AppShell>
  );
}
