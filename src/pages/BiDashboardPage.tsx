import { AlertTriangle, BarChart2, Clock, Filter, RadioTower, ShieldCheck, Wallet } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KpiCard } from "../components/KpiCard";
import type { AlertStatus, StoredEvent } from "../domain/types";
import { formatARS, formatSeconds } from "../utils/formatters";

const statusColor: Record<AlertStatus, string> = {
  GREEN: "#16A34A",
  YELLOW: "#D97706",
  RED: "#E50000",
};

const tooltipStyle = {
  contentStyle: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    color: "#0F172A",
    fontSize: "12px",
    boxShadow: "0 8px 28px rgba(15, 23, 42, 0.12)",
  },
  labelStyle: { color: "#334155", fontWeight: 700 },
  itemStyle: { color: "#0F172A" },
};

const axisStyle = { stroke: "#64748B", fontSize: 11, fill: "#475569" };

export function BiDashboardPage({ history }: { history: StoredEvent[] }) {
  const events = history;
  const total = events.length;
  const green = events.filter((event) => event.status === "GREEN").length;
  const red = events.filter((event) => event.status === "RED").length;
  const yellow = events.filter((event) => event.status === "YELLOW").length;
  const avgResponse =
    total > 0 ? Math.round(events.reduce((sum, event) => sum + event.estimatedResponseTimeSeconds, 0) / total) : 0;
  const saving = events.reduce((sum, event) => sum + event.costSavingARS, 0);
  const falseAlarmRate = total > 0 ? Math.round((green / total) * 100) : 0;
  const dispatchRate = total > 0 ? Math.round((red / total) * 100) : 0;

  const byZone = group(events, (event) => event.input.zone);
  const byCustomer = group(events, (event) => event.input.customerType);
  const byTimeSlot = group(events, (event) => event.input.timeSlot);
  const byStatus = (["GREEN", "YELLOW", "RED"] as AlertStatus[]).map((status) => ({
    name: status === "GREEN" ? "Verde" : status === "YELLOW" ? "Amarillo" : "Rojo",
    value: events.filter((event) => event.status === status).length,
    status,
  }));

  const lineData = [...events].reverse().map((event, index, orderedEvents) => {
    const processed = orderedEvents.slice(0, index + 1);
    return {
      evento: `E${index + 1}`,
      Filtradas: processed.filter((item) => item.status === "GREEN").length,
      Despachos: processed.filter((item) => item.status === "RED").length,
      Revisiones: processed.filter((item) => item.status === "YELLOW").length,
    };
  });

  const hasData = total > 0;

  return (
    <div className="space-y-5">
      <section className="panel p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="field-label mb-1">Business Intelligence gerencial</p>
            <h1 className="text-2xl font-black text-slate-950">
              Tasa de Falsas Alarmas Filtradas vs. Despachos Efectivos
            </h1>
            <p className="mt-1.5 max-w-3xl text-sm text-slate-600">
              El tablero arranca en cero y se alimenta solo con las simulaciones ejecutadas en Operador CRA.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-xs font-bold text-emerald-800">Sistema operativo</p>
            <p className="text-[11px] text-slate-600">{total} eventos de sesion</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Eventos procesados" value={String(total)} helper="Simulaciones de sesion" icon={RadioTower} tone="blue" />
        <KpiCard label="Falsas alarmas filtradas" value={`${falseAlarmRate}%`} helper={`${green} eventos verdes`} icon={Filter} tone="green" />
        <KpiCard label="Despachos efectivos" value={`${dispatchRate}%`} helper={`${red} alertas rojas`} icon={AlertTriangle} tone="red" />
        <KpiCard label="Revisiones humanas" value={String(yellow)} helper="Eventos amarillos" icon={ShieldCheck} tone="amber" />
        <KpiCard label="Respuesta promedio" value={formatSeconds(avgResponse)} helper="Tiempo simulado CRA" icon={Clock} tone="blue" />
        <KpiCard label="Ahorro operativo" value={formatARS(saving)} helper="Costos evitados estimados" icon={Wallet} tone="green" />
        <KpiCard label="Eventos por zona" value={String(byZone.length)} helper="Cobertura con datos" icon={BarChart2} tone="purple" />
      </div>

      {!hasData ? (
        <section className="rounded-xl border border-sky-200 bg-sky-50 p-5 text-sm font-semibold leading-6 text-sky-900">
          Ejecuta una simulacion desde Operador CRA para crear los primeros indicadores y graficos gerenciales.
        </section>
      ) : null}

      <div className="grid gap-5 xl:grid-cols-2">
        <ChartPanel title="Eventos por zona geografica">
          {hasData ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={byZone}>
                <CartesianGrid stroke="#E2E8F0" vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" {...axisStyle} tick={{ fontSize: 10 }} />
                <YAxis {...axisStyle} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="value" name="Eventos" fill="#E50000" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </ChartPanel>

        <ChartPanel title="Distribucion Verde / Amarillo / Rojo">
          {hasData ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={byStatus} innerRadius={70} outerRadius={105} dataKey="value" nameKey="name" label>
                  {byStatus.map((entry) => (
                    <Cell key={entry.status} fill={statusColor[entry.status]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </ChartPanel>

        <ChartPanel title="Evolucion de la sesion">
          {hasData ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lineData}>
                <CartesianGrid stroke="#E2E8F0" vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="evento" {...axisStyle} />
                <YAxis {...axisStyle} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="Filtradas" stroke="#16A34A" strokeWidth={3} />
                <Line type="monotone" dataKey="Despachos" stroke="#E50000" strokeWidth={3} />
                <Line type="monotone" dataKey="Revisiones" stroke="#D97706" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </ChartPanel>

        <ChartPanel title="Eventos por franja horaria">
          {hasData ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={byTimeSlot}>
                <CartesianGrid stroke="#E2E8F0" vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" {...axisStyle} />
                <YAxis {...axisStyle} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="value" name="Eventos" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </ChartPanel>
      </div>

      <ChartPanel title="Eventos por tipo de cliente">
        {hasData ? (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={byCustomer}>
              <CartesianGrid stroke="#E2E8F0" vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" {...axisStyle} />
              <YAxis {...axisStyle} allowDecimals={false} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="value" name="Eventos" fill="#64748B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart height="h-[240px]" />
        )}
      </ChartPanel>
    </div>
  );
}

function group(events: StoredEvent[], key: (event: StoredEvent) => string) {
  const map = new Map<string, number>();
  events.forEach((event) => map.set(key(event), (map.get(key(event)) ?? 0) + 1));
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

function ChartPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel p-5">
      <h3 className="mb-4 text-base font-black text-slate-950">{title}</h3>
      {children}
    </section>
  );
}

function EmptyChart({ height = "h-[280px]" }: { height?: string }) {
  return (
    <div className={`${height} grid place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50`}>
      <div className="text-center">
        <p className="text-sm font-bold text-slate-800">Sin datos todavia</p>
        <p className="mt-1 text-xs text-slate-600">Ejecuta simulaciones para alimentar este grafico.</p>
      </div>
    </div>
  );
}
