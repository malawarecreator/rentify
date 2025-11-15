// components/rentals/ActiveRentalCard.tsx
import React from "react";

export type ActiveRental = {
  id: string;
  listingTitle: string;
  listingImageUrl: string;
  role: "OWNER" | "RENTER";
  counterpartName: string;
  counterpartAvatar: string;
  dateRange: string;
  statusLabel: string; // e.g. "Happening this weekend"
};

interface ActiveRentalCardProps {
  rental: ActiveRental;
}

const ActiveRentalCard: React.FC<ActiveRentalCardProps> = ({ rental }) => {
  const roleLabel =
    rental.role === "OWNER" ? "You’re the owner" : "You’re the renter";

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm flex gap-4">
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
        <img
          src={rental.listingImageUrl}
          alt={rental.listingTitle}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-zinc-50">
            {rental.listingTitle}
          </h3>
          <p className="text-[11px] text-zinc-400">{rental.dateRange}</p>
        </div>

        <div className="flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 overflow-hidden rounded-full bg-zinc-800">
              <img
                src={rental.counterpartAvatar}
                alt={rental.counterpartName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <p className="text-xs text-zinc-100">{rental.counterpartName}</p>
              <p className="text-[10px] text-zinc-500">{roleLabel}</p>
            </div>
          </div>

          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300">
            {rental.statusLabel}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ActiveRentalCard;