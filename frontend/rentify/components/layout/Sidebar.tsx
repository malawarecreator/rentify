"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  matchPrefix?: string; // for nested routes, if you want
};

const mainNav: NavItem[] = [
  {
    label: "Home feed",
    href: "/",
    icon: "🏠",
    matchPrefix: "/", // special-case root
  },
  {
    label: "Browse listings",
    href: "/listings",
    icon: "🛒",
    matchPrefix: "/listings",
  },
  {
    label: "My listings",
    href: "/listings/mine",
    icon: "📦",
    matchPrefix: "/listings/mine",
  },
];

const accountNav: NavItem[] = [
  {
    label: "Log in",
    href: "/login",
    icon: "🔐",
    matchPrefix: "/login",
  },
  {
    label: "Sign up",
    href: "/signup",
    icon: "✨",
    matchPrefix: "/signup",
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.href === "/") {
      // Root: active on exact "/"
      return pathname === "/";
    }
    return pathname.startsWith(item.matchPrefix ?? item.href);
  };

  const renderSection = (title: string, items: NavItem[]) => (
    <div className="space-y-2">
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] theme-text-muted mb-3">
        {title}
      </p>
      {items.map((item) => {
        const active = isActive(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors",
              active
                ? "theme-bg-accent theme-text-primary theme-border-primary border"
                : "theme-text-secondary hover:theme-bg-accent hover:theme-text-primary",
            ].join(" ")}
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 flex-col theme-border-secondary theme-bg-primary px-6 py-6 gap-8 overflow-y-auto shadow-lg">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl theme-bg-accent ring-1 theme-border-primary">
          <span className="text-xl font-bold theme-accent-primary">R</span>
        </div>
        <div className="leading-tight">
          <p className="text-base font-semibold theme-text-primary">Rentify</p>
          <p className="text-sm theme-text-muted">Neighborhood Rentals</p>
        </div>
      </div>

      {/* Sections */}
      {renderSection("Main", mainNav)}
      {renderSection("Account", accountNav)}

      {/* Tip card */}
      <div className="mt-auto rounded-xl theme-border-primary theme-bg-accent p-4 text-sm theme-text-primary">
        <p className="font-semibold theme-accent-primary text-base">Tip</p>
        <p className="mt-2 text-sm theme-text-secondary leading-relaxed">
          List one tool, one space, and one fun item to boost your visibility in
          the neighborhood.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
