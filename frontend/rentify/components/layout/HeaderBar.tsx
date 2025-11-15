import React from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const HeaderBar: React.FC = () => {
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
        <div className="flex h-8 w-8 items-center justify-center rounded-full theme-bg-accent-primary text-[11px] font-semibold text-white">
          NM
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;