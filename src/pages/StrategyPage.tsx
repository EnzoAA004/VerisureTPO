import { BriefcaseBusiness, Calculator, CheckCircle2, Network, TrendingUp, Users } from "lucide-react";
import { KpiCard } from "../components/KpiCard";
import type { StoredEvent } from "../domain/types";
import { formatARS } from "../utils/formatters";

const foda = {
  Fortalezas: [
    "Integra senales visuales, auditivas, sensoriales y contextuales.",
    "Reduce falsas alarmas antes de saturar la CRA.",
    "Genera trazabilidad explicable para auditoria.",
    "Permite planes Premium, Agro y reportes BI.",
  ],
  Oportunidades: [
    "Crecimiento de hogares inteligentes y seguridad conectada.",
    "Expansion agro/rural con LoRaWAN y satelital.",
    "Alianzas con telcos, inmobiliarias e integradores.",
    "Diferenciacion frente a kits autoinstalables.",
  ],
  Debilidades: [
    "Requiere inversion inicial y capacitacion.",
    "La integracion multi-dispositivo aumenta complejidad.",
    "Necesita gestion del cambio con operadores CRA.",
    "Debe evitar decisiones opacas o no auditables.",
  ],
  Amenazas: [
    "Ciberataques o filtracion de datos sensibles.",
    "Regulacion sobre privacidad y datos personales.",
    "Competencia de Big Tech y soluciones economicas.",
    "Costos de hardware importado y contexto macroeconomico.",
  ],
};

const strategies = [
  {
    title: "Seguridad predictiva con IA y Edge Computing",
    objective: "Reducir falsas alarmas y priorizar eventos criticos.",
    actions: "Motor explicable, scoring multimodal, hand-off sensorial y procesamiento local conceptual.",
    kpi: "Menor tiempo de clasificacion y mayor tasa de filtrado.",
  },
  {
    title: "Expansion Premium y Agro/Rural",
    objective: "Crear nuevos ingresos sobre segmentos de mayor valor.",
    actions: "Planes con LoRaWAN, satelital, sensores perimetrales, camara termica y reportes avanzados.",
    kpi: "Mayor ticket promedio y cobertura en zonas de baja conectividad.",
  },
  {
    title: "Ecosistema B2B y BI gerencial",
    objective: "Convertir eventos operativos en decisiones de negocio.",
    actions: "Dashboard gerencial, integraciones ONVIF conceptuales, alianzas y matriz de indicadores.",
    kpi: "ROI, ahorro operativo, despachos efectivos y criticidad por zona.",
  },
];

const roles = [
  ["Gerencia CRA", "Define protocolos, turnos, SLA y escalamiento."],
  ["Operador CRA Nivel 1", "Valida alertas verdes/amarillas y contacta clientes."],
  ["Operador CRA Nivel 2", "Gestiona alertas rojas y eventos complejos."],
  ["Analista BI", "Construye KPIs, tableros y reportes ejecutivos."],
  ["Especialista IA", "Ajusta reglas, revisa sesgos y documenta decisiones."],
  ["Ciberseguridad", "Controla accesos, auditoria, cifrado y Zero Trust."],
  ["Tecnico instalador", "Instala sensores, camaras, conectividad y RA asistida."],
];

const techMatrix = [
  ["TIC / NTIC", "CRA digital, app, redes, sensores y trazabilidad.", "Digitalizacion del proceso operativo."],
  ["Business Intelligence", "KPIs, graficos, zonas criticas y ahorro.", "Toma de decisiones gerenciales."],
  ["Cloud Computing", "Eventos historicos, data warehouse y escalado.", "Elasticidad ante picos de alarmas."],
  ["Inteligencia Artificial", "Scoring multimodal explicable.", "Priorizacion y reduccion de ruido."],
  ["Internet de las Cosas", "Sensores hogar, comercio y agro.", "Mayor contexto de deteccion."],
  ["BYOD + MDM", "Comercial y gerencia con acceso controlado.", "Movilidad sin perder gobierno de datos."],
  ["Realidad Aumentada", "Asistencia a tecnicos instaladores.", "Menos errores de instalacion."],
  ["Zero Trust", "Identidad, dispositivo y solicitud verificados.", "Menor riesgo sobre datos sensibles."],
];

export function StrategyPage({ history }: { history: StoredEvent[] }) {
  const monthlyEvents = Math.max(1200, history.length * 120);
  const falseAlarmRate = 0.42;
  const avoidedEvents = Math.round(monthlyEvents * falseAlarmRate);
  const costPerEvent = 9800;
  const monthlySaving = avoidedEvents * costPerEvent;
  const initialInvestment = 18_000_000;
  const paybackMonths = monthlySaving > 0 ? initialInvestment / monthlySaving : 0;

  return (
    <div className="space-y-5">
      <section className="panel p-5">
        <p className="field-label">Iteracion estrategica del TP</p>
        <h2 className="mt-2 text-2xl font-black text-white">De prototipo tecnico a propuesta de transformacion digital</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">
          Esta pantalla conecta la demo con la consigna del trabajo: FODA, estrategias, puestos, tecnologias y
          justificacion economica. La idea es que el MVP funcione como evidencia visual del informe.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Eventos mensuales simulados" value={monthlyEvents.toLocaleString("es-AR")} helper="Base para caso de negocio" icon={Calculator} />
        <KpiCard label="Eventos evitados" value={avoidedEvents.toLocaleString("es-AR")} helper="Falsas alarmas filtradas" icon={CheckCircle2} tone="green" />
        <KpiCard label="Ahorro mensual proyectado" value={formatARS(monthlySaving)} helper="Costo operativo evitado" icon={TrendingUp} tone="green" />
        <KpiCard label="Payback estimado" value={`${paybackMonths.toFixed(1)} meses`} helper="Inversion inicial simulada" icon={BriefcaseBusiness} tone="amber" />
      </div>

      <section className="grid gap-4 xl:grid-cols-4">
        {Object.entries(foda).map(([title, items]) => (
          <article key={title} className="panel p-4">
            <h3 className="text-lg font-black text-white">{title}</h3>
            <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-300">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="panel p-5">
        <h3 className="text-xl font-black text-white">Tres estrategias alineadas a mision y vision</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {strategies.map((strategy) => (
            <article key={strategy.title} className="rounded-md border border-slate-800 bg-slate-950/55 p-4">
              <h4 className="text-base font-black text-white">{strategy.title}</h4>
              <p className="mt-3 text-sm text-slate-300"><strong>Objetivo:</strong> {strategy.objective}</p>
              <p className="mt-2 text-sm text-slate-300"><strong>Acciones:</strong> {strategy.actions}</p>
              <p className="mt-2 rounded-md bg-slate-900 p-3 text-sm font-semibold text-silver">{strategy.kpi}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="panel p-5">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-verisure" />
            <h3 className="text-xl font-black text-white">Organigrama funcional Smart-Twin</h3>
          </div>
          <div className="mt-4 space-y-2">
            {roles.map(([role, description]) => (
              <div key={role} className="rounded-md border border-slate-800 bg-slate-950/55 p-3">
                <p className="font-bold text-white">{role}</p>
                <p className="mt-1 text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel p-5">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-verisure" />
            <h3 className="text-xl font-black text-white">Matriz tecnologica del punto 9</h3>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr className="border-b border-slate-800">
                  <th className="py-3">Tecnologia</th>
                  <th>Aplicacion</th>
                  <th>Justificacion</th>
                </tr>
              </thead>
              <tbody>
                {techMatrix.map(([tech, use, reason]) => (
                  <tr key={tech} className="border-b border-slate-800/70 text-slate-300">
                    <td className="py-3 font-bold text-white">{tech}</td>
                    <td>{use}</td>
                    <td>{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
