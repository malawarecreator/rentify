// app/requests/outgoing/page.tsx
"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import RequestCard, {
  RentalRequest,
} from "@/components/requests/RequestCard";
import Link from "next/link";

const outgoingRequests: RentalRequest[] = [
  {
    id: "r1",
    listingTitle: "Power washer available this weekend",
    listingImageUrl:
      "https://images.pexels.com/photos/5854188/pexels-photo-5854188.jpeg?auto=compress&cs=tinysrgb&w=800",
    dateRange: "Nov 23–24",
    message: "Planning to clean my driveway Saturday morning.",
    counterpartName: "Alex Martinez",
    counterpartAvatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
    roleLabel: "You’re the renter",
    status: "PENDING",
    createdAtRelative: "2h ago",
  },
  {
    id: "r2",
    listingTitle: "Folding tables for parties & events",
    listingImageUrl:
      "https://images.pexels.com/photos/5877416/pexels-photo-5877416.jpeg?auto=compress&cs=tinysrgb&w=800",
    dateRange: "Dec 2",
    message: "Birthday party at the park. Need for 4–5 hours.",
    counterpartName: "Priya Shah",
    counterpartAvatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    roleLabel: "You’re the renter",
    status: "APPROVED",
    createdAtRelative: "1d ago",
  },
];

export default function OutgoingRequestsPage() {
  return (
    <AppShell>
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Requests · Outgoing</h1>
        <div className="flex gap-2 text-[11px]">
          <Link
            href="/requests/incoming"
            className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:border-zinc-500"
          >
            Incoming
          </Link>
          <Link
            href="/rentals/active"
            className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:border-zinc-500"
          >
            Active rentals
          </Link>
        </div>
      </div>

      {outgoingRequests.length === 0 ? (
        <p className="text-sm text-zinc-400">
          You haven’t requested any items yet.
        </p>
      ) : (
        <div className="space-y-3">
          {outgoingRequests.map((req) => (
            <RequestCard key={req.id} request={req} mode="outgoing" />
          ))}
        </div>
      )}
    </AppShell>
  );
}