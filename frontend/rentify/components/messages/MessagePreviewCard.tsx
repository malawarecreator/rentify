// components/messages/MessagePreviewCard.tsx
import React from "react";

export type MessagePreview = {
  id: string;
  counterpartName: string;
  counterpartAvatar: string;
  lastMessage: string;
  lastMessageTime: string; // "2h ago", "Yesterday"
  unread?: boolean;
};

interface MessagePreviewCardProps {
  item: MessagePreview;
  selected?: boolean;
}

const MessagePreviewCard: React.FC<MessagePreviewCardProps> = ({
  item,
  selected,
}) => {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs ${
        selected
          ? "bg-zinc-800 text-zinc-50"
          : "hover:bg-zinc-900 text-zinc-200"
      }`}
    >
      <div className="h-8 w-8 overflow-hidden rounded-full bg-zinc-800 shrink-0">
        <img
          src={item.counterpartAvatar}
          alt={item.counterpartName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[13px] font-semibold">
            {item.counterpartName}
          </p>
          <span className="text-[10px] text-zinc-500">
            {item.lastMessageTime}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-1 text-[11px] text-zinc-400">
          {item.lastMessage}
        </p>
      </div>
      {item.unread && (
        <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
      )}
    </button>
  );
};

export default MessagePreviewCard;