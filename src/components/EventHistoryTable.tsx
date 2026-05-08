import { Download, RotateCcw } from "lucide-react";
import type { StoredEvent } from "../domain/types";
import { exportJson } from "../utils/storage";
import { formatDateTime, formatSeconds } from "../utils/formatters";
import { StatusBadge } from "./StatusBadge";

interface Props {
  events: StoredEvent[];
  onClear: () => void;
}

const statusColor: Record<string, string> = {
  GREEN: "text-emerald-700",
  YELLOW: "text-amber-700",
  RED: "text-red-700",
};

export function EventHistoryTable({ events, onClear }: Props) {
  return (
    <section className="panel p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="field-label mb-1">Historial de sesion</p>
          <h2 className="text-xl font-black text-slate-950">Historial de eventos</h2>
          <p className="text-xs text-slate-600">
            {events.length} evento{events.length !== 1 ? "s" : ""} - Alimenta el Dashboard BI en tiempo real
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => exportJson(`historial-smart-twin-${Date.now()}.json`, events)}
            disabled={events.length === 0}
            className="btn-ghost disabled:pointer-events-none disabled:opacity-40"
          >
            <Download className="h-3.5 w-3.5" />
            Exportar JSON
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={events.length === 0}
            className="btn-ghost text-red-700 hover:border-red-300 disabled:pointer-events-none disabled:opacity-40"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Limpiar
          </button>
        </div>
      </div>

      {events.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {(["GREEN", "YELLOW", "RED"] as const).map((status) => {
            const count = events.filter((event) => event.status === status).length;
            const labels = { GREEN: "Verdes", YELLOW: "Amarillos", RED: "Rojos" };
            const colors = {
              GREEN: "border-emerald-200 bg-emerald-50 text-emerald-800",
              YELLOW: "border-amber-200 bg-amber-50 text-amber-800",
              RED: "border-red-200 bg-red-50 text-red-800",
            };
            return (
              <span key={status} className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${colors[status]}`}>
                {count} {labels[status]}
              </span>
            );
          })}
        </div>
      ) : null}

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {["#", "Hora", "Zona", "Cliente", "Score", "Estado", "Respuesta", "Hand-off", "Accion"].map((header) => (
                <th key={header} className="px-3 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-sm font-semibold text-slate-600">
                  Todavia no hay eventos generados en esta sesion.
                </td>
              </tr>
            ) : (
              events.map((event, index) => (
                <tr key={event.eventId} className="trow">
                  <td className="px-3 py-3 font-mono text-[11px] text-slate-600">{events.length - index}</td>
                  <td className="px-3 py-3 font-mono text-[11px] text-slate-700">{formatDateTime(event.timestamp)}</td>
                  <td className="px-3 py-3 text-xs text-slate-800">{event.input.zone}</td>
                  <td className="px-3 py-3 text-xs text-slate-800">{event.input.customerType}</td>
                  <td className="px-3 py-3">
                    <span className={`text-lg font-black leading-none ${statusColor[event.status]}`}>{event.riskScore}</span>
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={event.status} size="sm" />
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-700">{formatSeconds(event.estimatedResponseTimeSeconds)}</td>
                  <td className="px-3 py-3">
                    {event.handoffMode ? (
                      <span className="rounded-md border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                        Activo
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500">-</span>
                    )}
                  </td>
                  <td className="max-w-xs px-3 py-3 text-[11px] text-slate-700">
                    <span className="line-clamp-2">{event.recommendedAction}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
