import type { AlertStatus } from "../domain/types";

interface RiskGaugeProps {
  score: number;
  status: AlertStatus;
}

const statusConfig = {
  GREEN: {
    label: "Bajo riesgo",
    caption: "Falsa alarma probable",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    bar: "from-emerald-500 to-emerald-600",
  },
  YELLOW: {
    label: "Riesgo medio",
    caption: "Requiere revision humana",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    bar: "from-amber-400 to-amber-600",
  },
  RED: {
    label: "Riesgo critico",
    caption: "Prioridad CRA inmediata",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    bar: "from-red-500 to-verisure",
  },
} as const;

export function RiskGauge({ score, status }: RiskGaugeProps) {
  const cfg = statusConfig[status];

  return (
    <article className={`w-full rounded-xl border ${cfg.border} ${cfg.bg} p-4 shadow-sm`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-600">Risk Score</p>
          <p className={`mt-1 text-sm font-bold ${cfg.color}`}>{cfg.label}</p>
        </div>
        <div className={`rounded-lg border ${cfg.border} bg-white px-4 py-2 text-right`}>
          <strong className={`block text-5xl font-black leading-none ${cfg.color}`}>{score}</strong>
          <span className="text-xs font-bold text-slate-500">/100</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-4 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${cfg.bar} transition-all duration-700`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="relative mt-3 h-7 text-[11px] font-black text-slate-600">
          <span className="absolute left-0">0</span>
          <span className="absolute left-[25%] -translate-x-1/2">25</span>
          <span className="absolute left-[60%] -translate-x-1/2">60</span>
          <span className="absolute right-0">100</span>
          <div className="absolute left-0 right-0 top-5 grid grid-cols-[25fr_35fr_40fr] overflow-hidden rounded-full text-center text-[10px] uppercase tracking-wide text-white">
            <span className="bg-emerald-600 py-1">Verde</span>
            <span className="bg-amber-500 py-1">Amarillo</span>
            <span className="bg-red-600 py-1">Rojo</span>
          </div>
        </div>
      </div>

      <p className="mt-7 rounded-lg bg-white/80 p-3 text-sm font-semibold text-slate-700">{cfg.caption}</p>
    </article>
  );
}
