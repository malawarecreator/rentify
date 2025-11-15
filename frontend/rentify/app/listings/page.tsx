"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ListingFeed from "@/components/listings/ListingFeed";
import { useListings } from "@/hooks/useListings";

export default function ListingsPage() {
  const { listings, loading, error, refresh } = useListings();

  return (
    <AppShell>
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h1 className="text-lg font-semibold">Browse listings</h1>
        <span className="text-xs text-zinc-500">
          {loading ? "Loading…" : `${listings.length} items available`}
        </span>
      </div>

      <ListingFeed
        listings={listings}
        loading={loading}
        error={error}
        onRetry={refresh}
        emptyMessage="No listings posted yet. Be the first to add one!"
      />
    </AppShell>
  );
}
