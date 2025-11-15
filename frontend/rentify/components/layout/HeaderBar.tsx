'use client';

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useUser } from "@/components/user/UserProvider";

const HeaderBar: React.FC = () => {
  const { user, logout, isLoaded } = useUser();

  return (
    <header className="flex h-14 items-center justify-between theme-border-secondary theme-bg-primary px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2">
          <button className="rounded-lg theme-border-secondary theme-bg-accent px-2 py-1 text-xs theme-text-primary hover:theme-bg-accent-secondary">
            ☰
          </button>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.16em] theme-accent-primary font-medium">
            Neighborhood
          </span>
          <span className="text-sm font-semibold theme-text-primary">
            Pleasanton · Harvest Park
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center rounded-full theme-border-secondary theme-bg-accent px-3 py-1.5 text-xs theme-text-muted">
          <span>Search tools, spaces, neighbors…</span>
        </div>
        <ThemeToggle />
        <button className="flex h-8 w-8 items-center justify-center rounded-full theme-border-secondary theme-bg-accent theme-text-primary hover:theme-bg-accent-secondary">
          🔔
        </button>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="leading-tight text-right">
              <p className="text-xs font-semibold theme-text-primary">{user.name}</p>
              <p className="text-[10px] theme-text-muted truncate max-w-[110px]" title={user.id}>
                ID: {user.id}
              </p>
            </div>
            <button
              onClick={logout}
              className="rounded-full border border-emerald-400 px-3 py-1 text-[10px] font-semibold text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            >
              Log out
            </button>
          </div>
        ) : (
          isLoaded && (
            <Link
              href="/login"
              className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              Log in
            </Link>
          )
        )}
      </div>
    </header>
  );
};

export default HeaderBar;
