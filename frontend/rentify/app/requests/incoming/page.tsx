// app/requests/incoming/page.tsx
"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import RequestCard, {
  RentalRequest,
} from "@/components/requests/RequestCard";
import Link from "next/link";

const incomingRequests: RentalRequest[] = [
  {
    id: "i1",
    listingTitle: "Cordless drill + bit set",
    listingImageUrl:
      "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800",
    dateRange: "Nov 25 (1 day)",
    message: "Need to hang some shelves in my apartment.",
    counterpartName: "Jamie Wong",
    counterpartAvatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
    roleLabel: "You’re the owner",
    status: "PENDING",
    createdAtRelative: "45m ago",
  },
  {
    id: "i2",
    listingTitle: "Folding tables for parties & events",
    listingImageUrl:
      "https://images.pexels.com/photos/5877416/pexels-photo-5877416.jpeg?auto=compress&cs=tinysrgb&w=800",
    dateRange: "Nov 30",
    message: "Garage sale on Saturday morning.",
    counterpartName: "Chris Patel",
    counterpartAvatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200",
    roleLabel: "You’re the owner",
    status: "DECLINED",
    createdAtRelative: "3d ago",
  },
];

export default function IncomingRequestsPage() {
  return (
    <AppShell>
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Requests · Incoming</h1>
        <div className="flex gap-2 text-[11px]">
          <Link
            href="/requests/outgoing"
            className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:border-zinc-500"
          >
            Outgoing
          </Link>
          <Link
            href="/rentals/active"
            className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:border-zinc-500"
          >
            Active rentals
          </Link>
        </div>
      </div>

      {incomingRequests.length === 0 ? (
        <p className="text-sm text-zinc-400">
          No one has requested your items yet.
        </p>
      ) : (
        <div className="space-y-3">
          {incomingRequests.map((req) => (
            <RequestCard key={req.id} request={req} mode="incoming" />
          ))}
        </div>
      )}
    </AppShell>
  );
}