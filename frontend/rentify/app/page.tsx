import React from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ListingFeed from "@/components/listings/ListingFeed";

export default function Home() {

  return (
    <div className="min-h-screen theme-bg-primary theme-text-primary flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Header */}
        <HeaderBar />

        {/* Content area */}
        <main className="flex-1 px-4 py-4 md:px-6 md:py-6 overflow-y-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          <div className="max-w-4xl mx-auto">
            {/* Main feed */}
            <section className="space-y-4">
              <div className="rounded-2xl theme-border-primary theme-bg-accent p-4">
                <h2 className="text-lg font-semibold theme-text-primary">
                  Share something with your neighbors
                </h2>
                <p className="mt-3 text-sm theme-text-secondary leading-relaxed">
                  Post a new item to rent out, ask for something you need, or
                  share an update with your block.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/listings/mine"
                    className="inline-block rounded-full theme-bg-accent-primary px-3 py-1 font-semibold text-white hover:opacity-90 transition-colors"
                  >
                    + New listing
                  </Link>
                  <button className="rounded-full theme-border-secondary theme-bg-primary px-3 py-1 theme-text-secondary hover:theme-border-primary transition-colors">
                    Ask for an item
                  </button>
                </div>
              </div>

              {/* Listing feed with dummy data */}
              <ListingFeed />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}