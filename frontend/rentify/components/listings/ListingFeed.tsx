import React from "react";
import ListingCard from "@/components/listings/ListingCard";
import type { Listing } from "@/lib/api";

interface ListingFeedProps {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  emptyMessage?: string;
}

const ListingFeed: React.FC<ListingFeedProps> = ({
  listings,
  loading,
  error,
  onRetry,
  emptyMessage = "No listings available yet.",
}) => {
  if (loading) {
    return (
      <div className="rounded-xl theme-border-primary theme-bg-accent p-6 text-sm theme-text-secondary">
        Loading listings…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-800/60 dark:bg-red-950/40 p-6 text-sm text-red-700 dark:text-red-200 space-y-3">
        <p>{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="rounded-xl theme-border-primary theme-bg-accent p-6 text-sm theme-text-secondary">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] theme-accent-primary">
        Today in your neighborhood
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingFeed;
