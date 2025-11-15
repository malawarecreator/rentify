import React from "react";
import Link from "next/link";

export type Listing = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  price: string;
  distance: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
};

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <Link href={listing.href}>
      <article className="block theme-bg-primary theme-border-primary border rounded-xl overflow-hidden hover:shadow-lg hover:theme-border-secondary transition-all cursor-pointer group">
        {/* Image */}
        <div className="aspect-4/3 overflow-hidden">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-base font-semibold theme-text-primary line-clamp-2 flex-1 mr-2">
              {listing.title}
            </h4>
            <span className="theme-accent-primary font-bold text-lg shrink-0">
              {listing.price}
            </span>
          </div>

          <p className="text-sm theme-text-secondary line-clamp-2 mb-3 leading-relaxed">
            {listing.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={listing.sellerAvatar}
                alt={listing.sellerName}
                className="w-6 h-6 rounded-full object-cover theme-border-primary border"
              />
              <span className="text-xs theme-text-primary font-medium">
                {listing.sellerName}
              </span>
            </div>
            <div className="text-xs theme-text-muted">
              ⭐ {listing.sellerRating.toFixed(1)} · {listing.distance}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ListingCard;