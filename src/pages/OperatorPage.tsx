import { useState } from "react";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { AnalysisResult } from "../components/AnalysisResult";
import { EventForm } from "../components/EventForm";
import { EventHistoryTable } from "../components/EventHistoryTable";
import { defaultInput } from "../data/demoScenarios";
import { analyzeEvent } from "../domain/riskEngine";
import type { AlarmAnalysis, AlarmInput, StoredEvent } from "../domain/types";

interface OperatorPageProps {
  history: StoredEvent[];
  setHistory: (events: StoredEvent[]) => void;
}

interface Toast {
  id: number;
  type: "red" | "green" | "yellow";
  message: string;
}

const toastConfig = {
  red: { icon: AlertTriangle, border: "border-red-200", bg: "bg-red-50", text: "text-red-800" },
  green: { icon: CheckCircle, border: "border-emerald-200", bg: "bg-emerald-50", text: "text-emerald-800" },
  yellow: { icon: Info, border: "border-amber-200", bg: "bg-amber-50", text: "text-amber-800" },
} as const;

export function OperatorPage({ history, setHistory }: OperatorPageProps) {
  const [input, setInput] = useState<AlarmInput>(defaultInput);
  const [analysis, setAnalysis] = useState<AlarmAnalysis | undefined>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(type: Toast["type"], message: string) {
    const id = Date.now();
    setToasts((previous) => [...previous, { id, type, message }]);
    window.setTimeout(() => setToasts((previous) => previous.filter((toast) => toast.id !== id)), 4000);
  }

  function runAnalysis() {
    setIsAnalyzing(true);
    window.setTimeout(() => {
      const result = analyzeEvent(input);
      const nextHistory = [{ ...result, input }, ...history].slice(0, 50);
      setAnalysis(result);
      setHistory(nextHistory);
      setIsAnalyzing(false);

      if (result.status === "RED") {
        addToast("red", `Intrusion critica - Score ${result.riskScore}/100 - Payload 911 generado`);
      } else if (result.status === "YELLOW") {
        addToast("yellow", `Revision requerida - Score ${result.riskScore}/100`);
      } else {
        addToast("green", `Falsa alarma filtrada - Score ${result.riskScore}/100 - Ahorro operativo aplicado`);
      }
    }, 400);
  }

  function clearHistory() {
    setHistory([]);
    addToast("yellow", "Historial de sesion limpiado.");
  }

  return (
    <div className="space-y-5">
      <div className="fixed right-5 top-20 z-50 flex flex-col gap-2" aria-live="polite">
        {toasts.map((toast) => {
          const config = toastConfig[toast.type];
          const Icon = config.icon;
          return (
            <div key={toast.id} className={`toast border ${config.border} ${config.bg} ${config.text}`}>
              <Icon className="h-4 w-4 shrink-0" />
              <span>{toast.message}</span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="field-label">Central Receptora de Alarmas</p>
          <h1 className="text-2xl font-black text-slate-950">Operador CRA</h1>
        </div>
        <p className="text-xs font-semibold text-slate-600">
          Sesion activa - {history.length} evento{history.length !== 1 ? "s" : ""} procesado
          {history.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(380px,0.85fr)_1.15fr]">
        <EventForm input={input} onChange={setInput} onAnalyze={runAnalysis} isAnalyzing={isAnalyzing} />
        <AnalysisResult analysis={analysis} />
      </div>

      <EventHistoryTable events={history} onClear={clearHistory} />
    </div>
  );
}
