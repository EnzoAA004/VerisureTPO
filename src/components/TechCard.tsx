import type { LucideIcon } from "lucide-react";
import { CheckCircle } from "lucide-react";

interface TechCardProps {
  name: string;
  use: string;
  benefit: string;
  icon?: LucideIcon;
  tag?: string;
}

export function TechCard({ name, use, benefit, icon: Icon, tag }: TechCardProps) {
  return (
    <article className="panel-hover group flex flex-col p-4 transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        {Icon && (
          <div className="shrink-0 rounded-xl border border-slate-700/50 bg-slate-800/60 p-2.5 text-verisure transition-colors group-hover:border-verisure/40 group-hover:bg-verisure/10">
            <Icon className="h-5 w-5" />
          </div>
        )}
        {tag && (
          <span className="ml-auto rounded-md border border-slate-700/50 bg-slate-800/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {tag}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-base font-black text-white">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{use}</p>
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-950/60 p-3">
        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        <p className="text-[12px] leading-5 font-semibold text-slate-300">{benefit}</p>
      </div>
    </article>
  );
}
