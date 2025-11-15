// components/requests/RequestCard.tsx
import React from "react";

export type RequestStatus = "PENDING" | "APPROVED" | "DECLINED";

export type RentalRequest = {
  id: string;
  listingTitle: string;
  listingImageUrl: string;
  dateRange: string;
  message?: string;
  counterpartName: string;      // who you're dealing with
  counterpartAvatar: string;
  roleLabel: string;           // e.g. "You’re the renter" / "You’re the owner"
  status: RequestStatus;
  createdAtRelative: string;   // e.g. "2h ago"
};

interface RequestCardProps {
  request: RentalRequest;
  mode: "outgoing" | "incoming"; // incoming -> owner can approve/decline
}

const statusColors: Record<RequestStatus, string> = {
  PENDING: "bg-amber-500/10 text-amber-300",
  APPROVED: "bg-emerald-500/10 text-emerald-300",
  DECLINED: "bg-rose-500/10 text-rose-300",
};

const RequestCard: React.FC<RequestCardProps> = ({ request, mode }) => {
  const handleApprove = () => {
    console.log("Approve request", request.id);
  };

  const handleDecline = () => {
    console.log("Decline request", request.id);
  };

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm flex gap-4">
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
        <img
          src={request.listingImageUrl}
          alt={request.listingTitle}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-zinc-50">
              {request.listingTitle}
            </h3>
            <p className="text-[11px] text-zinc-400">{request.dateRange}</p>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] ${statusColors[request.status]}`}
          >
            {request.status.charAt(0) + request.status.slice(1).toLowerCase()}
          </span>
        </div>

        {request.message && (
          <p className="text-xs text-zinc-300 line-clamp-2">
            “{request.message}”
          </p>
        )}

        <div className="flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 overflow-hidden rounded-full bg-zinc-800">
              <img
                src={request.counterpartAvatar}
                alt={request.counterpartName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <p className="text-xs text-zinc-100">{request.counterpartName}</p>
              <p className="text-[10px] text-zinc-500">{request.roleLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500">
              {request.createdAtRelative}
            </span>

            {mode === "incoming" && request.status === "PENDING" && (
              <div className="flex gap-1">
                <button
                  onClick={handleApprove}
                  className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300 hover:bg-emerald-500/20"
                >
                  Approve
                </button>
                <button
                  onClick={handleDecline}
                  className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] text-rose-300 hover:bg-rose-500/20"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default RequestCard;