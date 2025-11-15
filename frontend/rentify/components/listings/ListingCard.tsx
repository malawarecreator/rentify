import React from "react";
import Link from "next/link";
import type { Listing } from "@/lib/api";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const image = listing.storageRelationLinks[0] ??
    "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=60";
  const priceLabel = Number.isFinite(listing.price)
    ? `$${listing.price.toFixed(2)} / ${listing.interval || "listing"}`
    : "Price TBD";

  return (
    <Link href={`/listings/${listing.id}`}>
      <article className="block theme-bg-primary theme-border-primary border rounded-xl overflow-hidden hover:shadow-lg hover:theme-border-secondary transition-all cursor-pointer group">
        <div className="aspect-4/3 overflow-hidden bg-zinc-900/10 dark:bg-white/5">
          <img
            src={image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-base font-semibold theme-text-primary line-clamp-2">
              {listing.title}
            </h4>
            <span className="theme-accent-primary font-bold text-sm shrink-0 whitespace-nowrap">
              {priceLabel}
            </span>
          </div>

          <p className="text-sm theme-text-secondary line-clamp-3 leading-relaxed">
            {listing.body}
          </p>

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold theme-text-primary">
              Posted by {listing.author || "Unknown"}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 font-semibold ${
                listing.available
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                  : "bg-zinc-100 text-zinc-600 dark:bg-white/5 dark:text-zinc-300"
              }`}
            >
              {listing.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ListingCard;
