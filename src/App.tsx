import { useState } from "react";
import { AppShell } from "./components/AppShell";
import type { Tab } from "./components/Sidebar";
import type { StoredEvent } from "./domain/types";
import { BiDashboardPage } from "./pages/BiDashboardPage";
import { OperatorPage } from "./pages/OperatorPage";
import { IntelligentTechnologiesPage } from "./pages/IntelligentTechnologiesPage";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("operator");
  const [history, setHistory] = useState<StoredEvent[]>([]);

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "operator" ? <OperatorPage history={history} setHistory={setHistory} /> : null}
      {activeTab === "dashboard" ? <BiDashboardPage history={history} /> : null}
      {activeTab === "technologies" ? <IntelligentTechnologiesPage /> : null}
    </AppShell>
  );
}
