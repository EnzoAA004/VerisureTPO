import { BarChart3, RadioTower, ShieldAlert } from "lucide-react";

export type Tab = "operator" | "dashboard";

const items: { id: Tab; label: string; sublabel: string; icon: typeof RadioTower }[] = [
  { id: "operator", label: "Operador CRA", sublabel: "Recepcion de eventos", icon: RadioTower },
  { id: "dashboard", label: "Gerencia", sublabel: "KPIs gerenciales", icon: BarChart3 },
];

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="border-b border-slate-200 bg-white/90 p-4 backdrop-blur-md lg:min-h-[calc(100vh-68px)] lg:w-56 lg:border-b-0 lg:border-r xl:w-60">
      <nav className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-150 ${
                active
                  ? "border-red-200 bg-red-50 shadow-sm"
                  : "border-transparent bg-white text-slate-700 hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${
                  active ? "bg-red-100 text-verisure" : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-bold leading-tight ${active ? "text-slate-950" : "text-slate-800"}`}>
                  {item.label}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-slate-600">{item.sublabel}</p>
              </div>
              {active ? <div className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-verisure" /> : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3">
        <div className="flex items-start gap-2">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <p className="text-[11px] leading-5 text-amber-900">
            Datos simulados - Sin imagenes reales - Sin conexion a servicios de emergencia
          </p>
        </div>
      </div>
    </aside>
  );
}
