// app/rentals/active/page.tsx
"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ActiveRentalCard, {
  ActiveRental,
} from "@/components/rentals/ActiveRentalCard";
import Link from "next/link";

const activeRentals: ActiveRental[] = [
  {
    id: "a1",
    listingTitle: "Power washer available this weekend",
    listingImageUrl:
      "https://images.pexels.com/photos/5854188/pexels-photo-5854188.jpeg?auto=compress&cs=tinysrgb&w=800",
    role: "RENTER",
    counterpartName: "Alex Martinez",
    counterpartAvatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
    dateRange: "Nov 23–24",
    statusLabel: "Pickup tomorrow",
  },
  {
    id: "a2",
    listingTitle: "Cordless drill + bit set",
    listingImageUrl:
      "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800",
    role: "OWNER",
    counterpartName: "Jamie Wong",
    counterpartAvatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
    dateRange: "Nov 25 (1 day)",
    statusLabel: "Return on Monday",
  },
];

export default function ActiveRentalsPage() {
  return (
    <AppShell>
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Active rentals</h1>
        <div className="flex gap-2 text-[11px]">
          <Link
            href="/requests/outgoing"
            className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:border-zinc-500"
          >
            Outgoing requests
          </Link>
          <Link
            href="/requests/incoming"
            className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:border-zinc-500"
          >
            Incoming requests
          </Link>
        </div>
      </div>

      {activeRentals.length === 0 ? (
        <p className="text-sm text-zinc-400">
          You don’t have any active rentals right now.
        </p>
      ) : (
        <div className="space-y-3">
          {activeRentals.map((r) => (
            <ActiveRentalCard key={r.id} rental={r} />
          ))}
        </div>
      )}
    </AppShell>
  );
}