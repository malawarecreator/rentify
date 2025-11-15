// app/messages/page.tsx
"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import MessagePreviewCard, {
  MessagePreview,
} from "@/components/messages/MessagePreviewCard";

const previews: MessagePreview[] = [
  {
    id: "m1",
    counterpartName: "Alex Martinez",
    counterpartAvatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "Sounds good! See you around 10am.",
    lastMessageTime: "2h ago",
    unread: false,
  },
  {
    id: "m2",
    counterpartName: "Priya Shah",
    counterpartAvatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    lastMessage: "Can I pick it up a bit earlier?",
    lastMessageTime: "Yesterday",
    unread: true,
  },
];

export default function MessagesPage() {
  const selected = previews[0];

  return (
    <AppShell>
      <Breadcrumbs />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
        {/* Left: conversation list */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <h1 className="text-sm font-semibold">Messages</h1>
            <span className="text-[11px] text-zinc-500">
              {previews.length} chats
            </span>
          </div>

          <div className="mt-1 space-y-1">
            {previews.map((p) => (
              <MessagePreviewCard
                key={p.id}
                item={p}
                selected={p.id === selected.id}
              />
            ))}
          </div>
        </section>

        {/* Right: message thread (placeholder) */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 flex flex-col">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-3 mb-3">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-zinc-800">
              <img
                src={selected.counterpartAvatar}
                alt={selected.counterpartName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold">{selected.counterpartName}</p>
              <p className="text-[11px] text-zinc-500">
                Chat about: Power washer available this weekend
              </p>
            </div>
          </div>

          <div className="flex-1 text-[11px] text-zinc-300 space-y-2">
            <p className="text-zinc-500">
              (This is just a placeholder message thread. You can wire this up
              to real messages later.)
            </p>
          </div>

          <form className="mt-3 flex items-end gap-2 text-xs">
            <textarea
              rows={2}
              placeholder="Type a message…"
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-1.5 text-xs text-zinc-50"
            />
            <button className="rounded-lg bg-emerald-400 px-3 py-1.5 font-semibold text-zinc-950 hover:bg-emerald-300">
              Send
            </button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}