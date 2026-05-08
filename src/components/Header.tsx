import { Activity, AlertCircle, Shield } from "lucide-react";

export function Header() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("es-AR", { weekday: "short", day: "numeric", month: "short" });

  return (
    <header className="border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md lg:px-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-red-200 bg-red-50">
            <Shield className="h-5 w-5 text-verisure" strokeWidth={2.5} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div>
            <h1 className="text-base font-black leading-none tracking-tight text-slate-950">
              Verisure <span className="text-verisure">Smart-Twin</span>
            </h1>
            <p className="mt-1 text-xs font-semibold text-slate-600">MVP academico funcional</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
            <Activity className="h-3.5 w-3.5 text-emerald-700" />
            <div className="text-right">
              <p className="text-xs font-bold leading-none text-slate-950">{timeStr}</p>
              <p className="mt-0.5 text-[10px] capitalize text-slate-600">{dateStr}</p>
            </div>
          </div>

          <div className="hidden items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-[11px] font-semibold text-amber-800 md:flex">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>Prototipo no oficial - Sin alertas reales</span>
          </div>
        </div>
      </div>
    </header>
  );
}
