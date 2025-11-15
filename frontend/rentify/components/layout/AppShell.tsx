// components/layout/AppShell.tsx
import React, { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";

interface AppShellProps {
  children: ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen theme-bg-primary theme-text-primary flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <HeaderBar />
        <main className="flex-1 px-4 py-4 md:px-6 md:py-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;