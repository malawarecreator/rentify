"use client";

import React, { useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ListingCard from "@/components/listings/ListingCard";
import AddListingModal from "@/components/modals/AddListingModal";
import { useListings } from "@/hooks/useListings";
import { useUser } from "@/components/user/UserProvider";
import { deleteListing } from "@/lib/api";

export default function MyListingsPage() {
  const { listings, loading, error, refresh } = useListings();
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "loading" | "error">("idle");
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const myListings = useMemo(() => {
    if (!user) return [];
    return listings.filter((listing) => listing.author === user.id);
  }, [listings, user]);

  const handleDelete = async (listingId: string) => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("Delete this listing?");
      if (!confirmed) return;
    }

    setDeleteStatus("loading");
    setDeleteError(null);
    try {
      await deleteListing(listingId);
      setDeleteStatus("idle");
      await refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to delete listing";
      setDeleteError(message);
      setDeleteStatus("error");
    }
  };

  return (
    <AppShell>
      <Breadcrumbs />

      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h1 className="text-lg font-semibold">My listings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={!user}
          className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-zinc-950 hover:bg-emerald-300 transition-colors disabled:opacity-40"
        >
          + New listing
        </button>
      </div>

      {!user && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Log in to manage your listings.
        </div>
      )}

      {loading && <p className="text-sm text-zinc-500">Loading your listings…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {deleteError && <p className="text-sm text-red-500">{deleteError}</p>}

      {user && !loading && !error && (
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <p className="text-sm text-zinc-400">You haven’t published any listings yet.</p>
          ) : (
            myListings.map((listing) => (
              <div key={listing.id} className="space-y-2">
                <ListingCard listing={listing} />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(listing.id)}
                    disabled={deleteStatus === "loading"}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    {deleteStatus === "loading" ? "Deleting…" : "Delete listing"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isModalOpen && (
        <AddListingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          authorId={user?.id ?? null}
          onCreated={refresh}
        />
      )}
    </AppShell>
  );
}
