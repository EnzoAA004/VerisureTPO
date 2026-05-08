import { AlertTriangle, Clock, Copy, FileText, Radar, ShieldCheck, Siren, Wallet, Zap } from "lucide-react";
import { useState } from "react";
import type { AlarmAnalysis } from "../domain/types";
import { copyToClipboard, formatARS, formatSeconds } from "../utils/formatters";
import { JsonPayloadBlock } from "./JsonPayloadBlock";
import { RiskGauge } from "./RiskGauge";
import { StatusBadge } from "./StatusBadge";

const statusRing = {
  GREEN: "border-emerald-200",
  YELLOW: "border-amber-200",
  RED: "border-red-200",
} as const;

const statusBg = {
  GREEN: "from-emerald-50 to-white",
  YELLOW: "from-amber-50 to-white",
  RED: "from-red-50 to-white",
} as const;

export function AnalysisResult({ analysis }: { analysis?: AlarmAnalysis }) {
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!analysis) {
    return (
      <section className="panel flex min-h-[520px] items-center justify-center p-8 text-center">
        <div className="animate-fade-in">
          <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-2xl border border-slate-200 bg-slate-50">
            <Radar className="h-10 w-10 text-slate-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">Esperando analisis Smart-Twin</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
            Carga un caso demo o ajusta los vectores multimodales para simular la priorizacion CRA.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-slate-700">
            {["Vector visual", "Vector auditivo", "Vector IoT"].map((value) => (
              <div key={value} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-3">
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const summaryText = `[Verisure Smart-Twin] Evento: ${analysis.eventId}\nEstado: ${analysis.title}\nScore: ${analysis.riskScore}/100\nAccion: ${analysis.recommendedAction}\nHora: ${new Date(analysis.timestamp).toLocaleString("es-AR")}`;

  async function copySummary() {
    await copyToClipboard(summaryText);
    setCopiedSummary(true);
    window.setTimeout(() => setCopiedSummary(false), 1800);
  }

  return (
    <section className={`animate-fade-in rounded-xl border bg-gradient-to-b shadow-xl ${statusRing[analysis.status]} ${statusBg[analysis.status]}`}>
      {analysis.status === "RED" ? (
        <div className="flex items-center gap-2 rounded-t-xl border-b border-red-200 bg-red-50 px-5 py-2.5">
          <Siren className="h-4 w-4 text-red-700" />
          <p className="text-xs font-black uppercase tracking-widest text-red-700">
            Alerta critica - Intrusion verificada
          </p>
          <div className="ml-auto h-2 w-2 rounded-full bg-red-600 animate-pulse" />
        </div>
      ) : null}

      <div className="p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={analysis.status} />
              <span className="text-xs font-semibold text-slate-600">
                #{analysis.eventId} - {new Date(analysis.timestamp).toLocaleTimeString("es-AR")}
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">{analysis.title}</h2>
            <p className="mt-2.5 text-sm leading-6 text-slate-700">{analysis.explanation}</p>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <Zap className="mt-0.5 h-4 w-4 shrink-0 text-verisure" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Accion recomendada</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">{analysis.recommendedAction}</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-600">
              <strong className="text-slate-800">Operador:</strong> {analysis.operatorMessage}
            </p>
          </div>

          <div className="w-full shrink-0 lg:w-72 xl:w-80">
            <RiskGauge score={analysis.riskScore} status={analysis.status} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={Clock} label="Respuesta estimada" value={formatSeconds(analysis.estimatedResponseTimeSeconds)} status={analysis.status} />
          <MetricCard icon={Wallet} label="Ahorro operativo" value={formatARS(analysis.costSavingARS)} status={analysis.status} />
          <MetricCard icon={ShieldCheck} label="Hand-off sensorial" value={analysis.handoffMode ? "Activo" : "No activo"} highlight={analysis.handoffMode} status={analysis.status} />
          <MetricCard icon={FileText} label="ID de evento" value={analysis.eventId} mono status={analysis.status} />
        </div>

        {analysis.handoffMode ? (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-sky-700">
                Modo Hand-off Sensorial Activado
              </p>
              <p className="mt-1 text-sm text-slate-700">{analysis.handoffDescription}</p>
            </div>
          </div>
        ) : null}

        <section className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wide text-slate-950">
                Trazabilidad del Risk Score
              </h3>
              <p className="text-[11px] text-slate-600">Desglose explicable - Auditable academicamente</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600">
                Bruto: {analysis.rawScoreBeforeClamp} - Clampeado: {analysis.riskScore}
              </span>
              <button type="button" onClick={copySummary} className="btn-ghost text-[11px]">
                <Copy className={`h-3 w-3 ${copiedSummary ? "text-emerald-700" : ""}`} />
                {copiedSummary ? "Copiado" : "Copiar resumen"}
              </button>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {analysis.scoreBreakdown.map((item) => (
              <div key={`${item.label}-${item.detail}`} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-600">{item.label}</span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-black ${
                      item.value > 0
                        ? "bg-red-100 text-red-700"
                        : item.value < 0
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.value > 0 ? `+${item.value}` : item.value}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-700">{item.detail}</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.value > 0 ? "bg-red-500/70" : item.value < 0 ? "bg-emerald-500/70" : "bg-slate-400"
                    }`}
                    style={{ width: `${Math.min(Math.abs(item.value), 60) * (100 / 60)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {analysis.decisionRules.length > 0 ? (
            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
              <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-slate-600">
                Reglas activadas
              </p>
              <ul className="space-y-1.5">
                {analysis.decisionRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-xs text-slate-700">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-700" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        {analysis.emergencyPayload ? <JsonPayloadBlock payload={analysis.emergencyPayload} /> : null}
      </div>
    </section>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  highlight,
  mono,
  status,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
  status: "GREEN" | "YELLOW" | "RED";
}) {
  return (
    <div className={`metric-card transition-colors ${highlight ? "border-sky-200 bg-sky-50" : ""}`}>
      <Icon
        className={`h-4 w-4 ${
          status === "RED" ? "text-verisure" : status === "YELLOW" ? "text-amber-700" : "text-emerald-700"
        }`}
      />
      <p className="mt-2 text-[11px] text-slate-600">{label}</p>
      <p className={`mt-1 font-bold text-slate-950 ${mono ? "break-all font-mono text-[11px]" : "text-base"}`}>
        {value}
      </p>
    </div>
  );
}
