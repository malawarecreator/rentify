import React from "react";

const NeighborhoodSnapshot: React.FC = () => (
  <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm">
    <h3 className="text-sm font-semibold text-zinc-50">
      Your neighborhood snapshot
    </h3>
    <ul className="mt-3 space-y-1.5 text-xs text-zinc-300">
      <li>• 142 verified neighbors</li>
      <li>• 38 active listings this week</li>
      <li>• 9 new requests in the last 24 hours</li>
    </ul>
  </section>
);

const PopularCategories: React.FC = () => (
  <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm">
    <h3 className="text-sm font-semibold text-zinc-50">Popular categories</h3>
    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-zinc-100">
      <span className="rounded-full bg-zinc-800 px-3 py-1">Tools &amp; hardware</span>
      <span className="rounded-full bg-zinc-800 px-3 py-1">Party &amp; events</span>
      <span className="rounded-full bg-zinc-800 px-3 py-1">Sports &amp; outdoors</span>
      <span className="rounded-full bg-zinc-800 px-3 py-1">Parking &amp; storage</span>
    </div>
  </section>
);

const SafetyCard: React.FC = () => (
  <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-xs text-zinc-300">
    <h3 className="text-sm font-semibold text-zinc-50">Safety &amp; trust</h3>
    <p className="mt-2 text-[11px] text-zinc-400">
      Rentify uses neighborhood verification, ratings, and secure messaging so you
      always know who you’re dealing with.
    </p>
  </section>
);

const RightSidebar: React.FC = () => {
  return (
    <aside className="space-y-4">
      <NeighborhoodSnapshot />
      <PopularCategories />
      <SafetyCard />
    </aside>
  );
};

export default RightSidebar;