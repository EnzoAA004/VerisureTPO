import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  tone?: "red" | "green" | "blue" | "amber" | "purple";
}

const tones = {
  red: "text-red-700 bg-red-50 border-red-200",
  green: "text-emerald-700 bg-emerald-50 border-emerald-200",
  blue: "text-sky-700 bg-sky-50 border-sky-200",
  amber: "text-amber-700 bg-amber-50 border-amber-200",
  purple: "text-violet-700 bg-violet-50 border-violet-200",
};

export function KpiCard({ label, value, helper, icon: Icon, tone = "blue" }: KpiCardProps) {
  return (
    <article className="panel-hover p-4 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">{label}</p>
          <strong className="mt-2 block text-2xl font-black leading-none text-slate-950">{value}</strong>
          {helper ? <span className="mt-1.5 block text-[11px] text-slate-600">{helper}</span> : null}
        </div>
        <div className={`shrink-0 rounded-xl border p-2.5 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </article>
  );
}
