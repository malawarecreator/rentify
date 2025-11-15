"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import {
  applyForListing,
  approveApplication,
  fetchListing,
  rateListing,
  type Listing,
} from "@/lib/api";
import { useUser } from "@/components/user/UserProvider";

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const listingId = typeof params?.id === "string" ? params.id : "";
  const { user } = useUser();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if current user is the owner of this listing
  const isOwner = listing && user && listing.author === user.id;

  const [applicationMessage, setApplicationMessage] = useState("");
  const [applyStatus, setApplyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [applyError, setApplyError] = useState<string | null>(null);

  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingStatus, setRatingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [ratingError, setRatingError] = useState<string | null>(null);

  const loadListing = useCallback(async () => {
    if (!listingId) return;
    setLoading(true);
    try {
      const data = await fetchListing(listingId);
      setListing(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to load listing";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    void loadListing();
  }, [loadListing]);

  const handleApply = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      setApplyError("You must be logged in to apply.");
      setApplyStatus("error");
      return;
    }
    if (!listingId) {
      setApplyError("Listing is still loading. Try again in a moment.");
      setApplyStatus("error");
      return;
    }
    if (!applicationMessage.trim()) {
      setApplyError("Share a quick note before applying.");
      setApplyStatus("error");
      return;
    }

    setApplyStatus("loading");
    setApplyError(null);
    try {
      await applyForListing(listingId, {
        author: user.id,
        description: applicationMessage.trim(),
      });
      setApplyStatus("success");
      setApplicationMessage("");
      await loadListing();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to apply";
      setApplyError(message);
      setApplyStatus("error");
    }
  };

  const handleRate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      setRatingError("You must be logged in to leave a review.");
      setRatingStatus("error");
      return;
    }
    if (!listingId) {
      setRatingError("Listing is still loading. Try again in a moment.");
      setRatingStatus("error");
      return;
    }
    if (isOwner) {
      setRatingError("You cannot rate your own listing.");
      setRatingStatus("error");
      return;
    }

    setRatingStatus("loading");
    setRatingError(null);
    try {
      await rateListing(listingId, {
        author: user.id,
        rating: ratingValue,
        comment: ratingComment.trim(),
      });
      setRatingStatus("success");
      setRatingComment("");
      await loadListing();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to rate listing";
      setRatingError(message);
      setRatingStatus("error");
    }
  };

  const handleApproveApplication = async (applicantId: string) => {
    if (!user || !listing) return;

    try {
      await approveApplication(listingId, user.id, applicantId);
      console.log("Application approved for applicant:", applicantId);

      // Optimistically update both the listing availability and the application status
      setListing(prev => {
        if (!prev) return null;
        return {
          ...prev,
          available: false, // Mark listing as unavailable
          applications: prev.applications.map(app =>
            app.author === applicantId ? { ...app, status: 'approved' } : app
          )
        };
      });

      // Note: Not calling loadListing() to avoid overriding optimistic updates
      // The server may not update these statuses immediately
    } catch (err) {
      console.error("Failed to approve application:", err);
      // Could add error state for approval failures
    }
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to listings
          </Link>
        </div>

        {loading && <div className="rounded-xl theme-border-primary theme-bg-accent p-6">Loading…</div>}
        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {listing && !loading && !error && (
          <>
            <div className="rounded-2xl border border-green-200 bg-white overflow-hidden">
              <img
                src={listing.storageRelationLinks[0] || "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=60"}
                alt={listing.title}
                className="w-full h-72 object-cover"
              />
            </div>

            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
              <p className="text-gray-700 leading-relaxed text-lg">{listing.body}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <span className="font-semibold text-green-700 text-2xl">
                  {Number.isFinite(listing.price)
                    ? `$${listing.price.toFixed(2)} / ${listing.interval || "listing"}`
                    : "Price not provided"}
                </span>
                <span className="rounded-full bg-white px-4 py-1 text-xs font-semibold border border-green-200">
                  {listing.available ? "Available" : "Currently unavailable"}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Owner: {listing.author}
                </span>
              </div>
            </div>

            {listing.storageRelationLinks.length > 1 && (
              <div className="rounded-2xl border border-green-200 bg-white p-6 space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">Attachments</h2>
                <div className="flex flex-wrap gap-3">
                  {listing.storageRelationLinks.map((url, index) => (
                    <a
                      key={`${url}-${index}`}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-green-200 px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                    >
                      View file {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {!isOwner && (
              <div className="rounded-2xl border border-green-200 bg-white p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Apply to rent</h2>
                <form onSubmit={handleApply} className="space-y-4">
                  <textarea
                    value={applicationMessage}
                    onChange={(event) => setApplicationMessage(event.target.value)}
                    placeholder="Share a quick note about how you'll use this item"
                    rows={4}
                    className="w-full rounded-lg border border-green-200 bg-white p-3 text-sm focus:border-green-500 focus:outline-none"
                    disabled={!user}
                  />
                  {!user && (
                    <p className="text-xs text-red-500">
                      Log in to submit an application.
                    </p>
                  )}
                  {applyError && <p className="text-xs text-red-500">{applyError}</p>}
                  {applyStatus === "success" && (
                    <p className="text-xs text-green-600">Application sent! The owner will review it soon.</p>
                  )}
                  <button
                    type="submit"
                    disabled={!user || applyStatus === "loading"}
                    className="w-full rounded-lg bg-green-600 px-6 py-3 text-lg font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                  >
                    {applyStatus === "loading" ? "Sending…" : "Apply to rent"}
                  </button>
                </form>
              </div>
            )}

            {isOwner && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Manage Applications</h2>
                <p className="text-gray-600">You own this listing. View and manage applications below.</p>
                {listing.applications.length === 0 ? (
                  <p className="text-sm text-gray-500">No applications yet.</p>
                ) : (
                  <div className="space-y-4">
                    {listing.applications.map((application, index) => (
                      <div key={index} className="border border-green-200 rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              From: {application.author}
                            </p>
                            <p className="text-xs text-gray-500">Status: {application.status}</p>
                          </div>
                          {application.status === "pending" && (
                            <button
                              onClick={() => handleApproveApplication(application.author)}
                              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{application.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-green-200 bg-white p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Ratings</h2>
              <div className="space-y-4">
                {listing.ratings.length === 0 ? (
                  <p className="text-sm text-gray-600">No reviews yet.</p>
                ) : (
                  listing.ratings.map((rating, index) => (
                    <div key={index} className="border border-green-100 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {rating.author} · {rating.rating.toFixed(1)}★
                      </p>
                      {rating.comment && <p className="text-sm text-gray-700 mt-1">{rating.comment}</p>}
                    </div>
                  ))
                )}
              </div>

              {!isOwner && (
                <form onSubmit={handleRate} className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Rating</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      step={0.5}
                      value={ratingValue}
                      onChange={(event) => setRatingValue(Number(event.target.value))}
                      className="w-32 rounded-lg border border-green-200 p-2"
                      disabled={!user}
                    />
                  </div>
                  <textarea
                    value={ratingComment}
                    onChange={(event) => setRatingComment(event.target.value)}
                    placeholder="Share feedback with the community"
                    rows={3}
                    className="w-full rounded-lg border border-green-200 p-3 text-sm focus:border-green-500 focus:outline-none"
                    disabled={!user}
                  />
                  {ratingError && <p className="text-xs text-red-500">{ratingError}</p>}
                  {ratingStatus === "success" && (
                    <p className="text-xs text-green-600">Thanks for submitting a review.</p>
                  )}
                  <button
                    type="submit"
                    disabled={!user || ratingStatus === "loading"}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                  >
                    {ratingStatus === "loading" ? "Submitting…" : "Leave a review"}
                  </button>
                </form>
              )}

              {isOwner && (
                <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
                  You cannot rate your own listing.
                </div>
              )}
            </div>

          </>
        )}
      </div>
    </AppShell>
  );
}
