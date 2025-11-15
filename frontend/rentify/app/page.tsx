"use client";

import React from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ListingFeed from "@/components/listings/ListingFeed";
import { useListings } from "@/hooks/useListings";
import { useUser } from "@/components/user/UserProvider";

export default function Home() {
  const { listings, loading, error, refresh, usingFallback } = useListings();
  const { user } = useUser();

  return (
    <AppShell>
      <Breadcrumbs />

      <div className="max-w-4xl mx-auto space-y-6">
        <section className="rounded-2xl theme-border-primary theme-bg-accent p-4 md:p-6">
          <h2 className="text-lg font-semibold theme-text-primary">
            Share something with your neighbors
          </h2>
          <p className="mt-3 text-sm theme-text-secondary leading-relaxed">
            {usingFallback
              ? "Currently showing demo data. The live backend is temporarily unavailable."
              : "Rentify connects you with your neighbors. Post items, browse listings, and make local connections."
            }
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link
              href="/listings/mine"
              className="inline-block rounded-full theme-bg-accent-primary px-3 py-1 font-semibold text-white hover:opacity-90 transition-colors"
            >
              Manage my listings
            </Link>
            {user ? (
              <span className="rounded-full theme-border-secondary theme-bg-primary px-3 py-1 theme-text-secondary">
                Logged in as {user.name}
              </span>
            ) : (
              <Link
                href="/signup"
                className="rounded-full theme-border-secondary theme-bg-primary px-3 py-1 theme-text-secondary hover:theme-border-primary"
              >
                Create an account
              </Link>
            )}
            {usingFallback && (
              <button
                onClick={refresh}
                className="rounded-full theme-border-secondary theme-bg-primary px-3 py-1 theme-text-secondary hover:theme-border-primary"
              >
                Retry API
              </button>
            )}
          </div>
        </section>

        <ListingFeed listings={listings} loading={loading} error={error} onRetry={refresh} />
      </div>
    </AppShell>
  );
}
