import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar, type Tab } from "./Sidebar";

interface AppShellProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: ReactNode;
}

export function AppShell({ activeTab, onTabChange, children }: AppShellProps) {
  return (
    <div className="min-h-screen text-slate-950">
      <Header />
      <div className="lg:flex">
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
        <main className="min-w-0 flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
