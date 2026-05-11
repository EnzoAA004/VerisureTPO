import { FormEvent, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileCheck2,
  HeartPulse,
  KeyRound,
  Laptop,
  LockKeyhole,
  MessageSquareText,
  RadioTower,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  TicketCheck,
  UserRoundCheck,
  Watch,
  Wifi,
  XCircle,
  Zap,
} from "lucide-react";
import { KpiCard } from "../components/KpiCard";

type TicketCategory = "técnico" | "emergencia" | "facturación" | "mantenimiento" | "garantía" | "consulta general";
type Priority = "baja" | "media" | "alta" | "crítica";
type TicketStatus = "abierto" | "en revisión" | "derivado" | "resuelto";
type EmployeeStatus = "normal" | "atención" | "riesgo";
type RpaStatus = "pendiente" | "en proceso" | "completado" | "error" | "alerta generada";
type RiskLevel = "bajo" | "medio" | "alto" | "crítico";
type ByodStatus = "aprobado" | "pendiente" | "limitado" | "rechazado" | "revocado";

interface SupportTicket {
  id: string;
  message: string;
  response: string;
  category: TicketCategory;
  priority: Priority;
  status: TicketStatus;
  createdAt: string;
}

interface EmployeeReading {
  id: string;
  role: string;
  heartRate: number;
  oxygen: number;
  bloodPressure: string;
  systolic: number;
  seatedHours: number;
  activity: number;
  stress: number;
  status: EmployeeStatus;
  alerts: string[];
  reviewed: boolean;
}

interface RpaLog {
  id: string;
  time: string;
  employee: string;
  result: string;
  observations: string;
}

interface SecurityEvent {
  id: string;
  time: string;
  title: string;
  impact: string;
  action: string;
}

interface ByodDevice {
  id: string;
  user: string;
  role: string;
  type: string;
  os: string;
  updated: boolean;
  antivirus: boolean;
  encrypted: boolean;
  vpn: boolean;
  mfa: boolean;
  rooted: boolean;
  requestedAccess: string;
  status: ByodStatus;
  reason: string;
  allowedAccess: string;
}

const quickQueries = [
  "Mi alarma se activa sola",
  "El sensor no responde",
  "No puedo desactivar la alarma",
  "Tengo baja batería",
  "Quiero solicitar una visita técnica",
  "Tengo un reclamo de facturación",
  "Se disparó una alarma y no sé si es falsa",
];

const initialEmployees: EmployeeReading[] = [
  makeEmployee("emp-1", "Operador CRA", 82, 98, 120, 3.2, 55, 42),
  makeEmployee("emp-2", "Técnico instalador", 96, 97, 128, 1.1, 82, 48),
  makeEmployee("emp-3", "Supervisor de campo", 104, 95, 136, 4.4, 68, 66),
  makeEmployee("emp-4", "Administrativo", 76, 99, 118, 6.8, 34, 59),
  makeEmployee("emp-5", "Analista de datos", 88, 96, 124, 5.7, 46, 72),
];

const rpaSteps = [
  "Recibir datos del reloj inteligente",
  "Validar identidad del empleado",
  "Registrar datos en legajo digital",
  "Generar informe para RRHH",
  "Generar informe para Obra Social",
  "Generar informe para ART",
  "Crear alerta si hay riesgo",
];

const securityControlLabels = [
  "Cifrado de datos",
  "Autenticación multifactor",
  "VPN activa",
  "Control de accesos por roles",
  "Segmentación de red IoT",
  "Actualización de firmware",
  "Backups seguros",
  "Anonimización de datos de salud",
  "Auditoría del RPA",
  "Consentimiento informado",
];

const incidentTemplates = [
  {
    title: "Dispositivo IoT con firmware desactualizado",
    impact: "Puede abrir una ventana de explotación sobre sensores conectados.",
    action: "Aislar red IoT, actualizar firmware y validar telemetría posterior.",
  },
  {
    title: "Intento de acceso no autorizado",
    impact: "Riesgo sobre paneles de soporte, tickets y datos de clientes.",
    action: "Bloquear sesión, revisar roles, exigir MFA y auditar accesos.",
  },
  {
    title: "Pérdida de dispositivo BYOD",
    impact: "Exposición potencial de información corporativa sincronizada.",
    action: "Revocar tokens, aplicar borrado selectivo y notificar al responsable.",
  },
  {
    title: "Fuga de datos de salud",
    impact: "Incidente sensible para RR. HH., Obra Social y ART.",
    action: "Activar plan de respuesta, anonimizar reportes y registrar auditoría legal.",
  },
  {
    title: "Alarma manipulada o desactivación indebida",
    impact: "Posible intrusión o sabotaje de un sistema de seguridad conectado.",
    action: "Crear ticket crítico, verificar cámaras/sensores y derivar a operador CRA.",
  },
];

const initialByodForm = {
  user: "",
  role: "Soporte remoto",
  type: "Notebook",
  os: "Windows",
  updated: true,
  antivirus: true,
  encrypted: true,
  vpn: true,
  mfa: true,
  rooted: false,
  requestedAccess: "Soporte remoto",
};

function nowLabel() {
  return new Date().toLocaleString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function makeEmployee(
  id: string,
  role: string,
  heartRate: number,
  oxygen: number,
  systolic: number,
  seatedHours: number,
  activity: number,
  stress: number,
): EmployeeReading {
  const diastolic = Math.max(70, Math.round(systolic * 0.62));
  const alerts = evaluateHealth({ heartRate, oxygen, systolic, seatedHours, stress });
  return {
    id,
    role,
    heartRate,
    oxygen,
    bloodPressure: `${systolic}/${diastolic}`,
    systolic,
    seatedHours,
    activity,
    stress,
    status: alerts.some((alert) => alert.includes("riesgo") || alert.includes("Oxígeno"))
      ? "riesgo"
      : alerts.length > 0
        ? "atención"
        : "normal",
    alerts,
    reviewed: false,
  };
}

function evaluateHealth(reading: Pick<EmployeeReading, "heartRate" | "oxygen" | "systolic" | "seatedHours" | "stress">) {
  const alerts: string[] = [];
  if (reading.heartRate > 110) alerts.push("Frecuencia cardíaca elevada: posible estrés o fatiga.");
  if (reading.oxygen < 94) alerts.push("Oxígeno bajo: alerta de salud sensible.");
  if (reading.seatedHours > 6) alerts.push("Tiempo sentado mayor a 6 horas: recomendar pausa activa.");
  if (reading.stress > 75) alerts.push("Estrés superior a 75%: sugerir descanso o revisión preventiva.");
  if (reading.systolic >= 140) alerts.push("Presión arterial elevada: alerta preventiva.");
  return alerts;
}

function classifyTicket(message: string): Pick<SupportTicket, "category" | "priority" | "response"> {
  const text = message.toLowerCase();
  let category: TicketCategory = "consulta general";
  if (/intrusión|robo|emergencia|disparó|disparo|alarma|desactivar/.test(text)) category = "emergencia";
  if (/batería|sensor|cámara|camara/.test(text)) category = "técnico";
  if (/factura|cobro|pago|facturación/.test(text)) category = "facturación";
  if (/visita|técnico|tecnico|instalación|instalacion/.test(text)) category = "mantenimiento";
  if (/garantía|garantia/.test(text)) category = "garantía";

  let priority: Priority = "baja";
  if (/intrusión|robo|emergencia|manipulada/.test(text)) priority = "crítica";
  else if (/alarma|disparó|desactivar/.test(text)) priority = "alta";
  else if (/sensor|cámara|camara|batería|tecnico|técnico|visita/.test(text)) priority = "media";

  const responseByCategory: Record<TicketCategory, string> = {
    técnico: "Detecté un posible problema técnico. Revisá batería, conectividad y distancia al panel; crearé un ticket con diagnóstico IoT.",
    emergencia: "Priorizo este caso como posible emergencia. Un operador CRA debe validar sensores, cámaras y contexto del cliente.",
    facturación: "Registro el reclamo administrativo para revisar factura, cobro, garantía comercial o medio de pago.",
    mantenimiento: "Puedo coordinar una visita técnica o instalación, validando disponibilidad y criticidad del sistema.",
    garantía: "Abriré el caso de garantía y asociaré el historial del dispositivo para revisión del área correspondiente.",
    "consulta general": "Puedo orientarte con pasos rápidos o derivarte a un asesor si necesitás atención personalizada.",
  };

  return { category, priority, response: responseByCategory[category] };
}

function ticketTone(priority: Priority) {
  return priority === "crítica" ? "red" : priority === "alta" ? "amber" : priority === "media" ? "blue" : "green";
}

function calculateSecurityRisk(activeCount: number, incidentCount: number, mfaActive: boolean): RiskLevel {
  const score = activeCount * 9 - incidentCount * 8 - (mfaActive ? 0 : 18);
  if (score >= 82) return "bajo";
  if (score >= 62) return "medio";
  if (score >= 42) return "alto";
  return "crítico";
}

function evaluateByodDevice(form: typeof initialByodForm, mfaControlActive: boolean) {
  if (form.rooted) return { status: "rechazado" as ByodStatus, reason: "Dispositivo rooteado o jailbreakeado.", allowedAccess: "Sin acceso" };
  if (!form.mfa || !mfaControlActive) return { status: "rechazado" as ByodStatus, reason: "MFA obligatorio no habilitado o desactivado globalmente.", allowedAccess: "Sin acceso" };
  if (!form.encrypted) return { status: "rechazado" as ByodStatus, reason: "Cifrado local obligatorio ausente.", allowedAccess: "Sin acceso" };
  if (!form.vpn) return { status: "limitado" as ByodStatus, reason: "VPN no configurada: solo acceso limitado.", allowedAccess: "Documentación y tickets no críticos" };
  if (!form.updated) return { status: "pendiente" as ByodStatus, reason: "Sistema operativo pendiente de actualización.", allowedAccess: "Pendiente de remediación" };
  if (!form.antivirus) return { status: "pendiente" as ByodStatus, reason: "Antivirus inactivo: requiere corrección.", allowedAccess: "Pendiente de remediación" };
  return { status: "aprobado" as ByodStatus, reason: "Cumple MDM, MFA, VPN, cifrado y actualización.", allowedAccess: form.requestedAccess };
}

function toneClass(tone: string) {
  const classes: Record<string, string> = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-800",
    blue: "border-sky-200 bg-sky-50 text-sky-800",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    red: "border-red-200 bg-red-50 text-red-800",
    purple: "border-violet-200 bg-violet-50 text-violet-800",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };
  return classes[tone] ?? classes.slate;
}

function MiniBadge({ children, tone = "slate" }: { children: string; tone?: string }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-black ${toneClass(tone)}`}>{children}</span>;
}

function ModuleHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children: string }) {
  return (
    <div>
      <p className="field-label mb-1">{eyebrow}</p>
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{children}</p>
    </div>
  );
}

export function IntelligentTechnologiesPage() {
  const [supportInput, setSupportInput] = useState("");
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [satisfaction, setSatisfaction] = useState<number[]>([]);
  const [supportAlerts, setSupportAlerts] = useState<string[]>([]);

  const [employees, setEmployees] = useState<EmployeeReading[]>(initialEmployees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(initialEmployees[0].id);
  const selectedEmployee = employees.find((employee) => employee.id === selectedEmployeeId) ?? employees[0];
  const [reports, setReports] = useState<string[]>([]);

  const [rpaStatuses, setRpaStatuses] = useState<RpaStatus[]>(rpaSteps.map(() => "pendiente"));
  const [rpaLogs, setRpaLogs] = useState<RpaLog[]>([]);
  const [rpaRunning, setRpaRunning] = useState(false);
  const [rpaReport, setRpaReport] = useState("Sin informe generado todavía.");

  const [securityControls, setSecurityControls] = useState<Record<string, boolean>>(
    Object.fromEntries(securityControlLabels.map((label) => [label, true])),
  );
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);

  const [byodForm, setByodForm] = useState(initialByodForm);
  const [devices, setDevices] = useState<ByodDevice[]>([]);
  const [byodActions, setByodActions] = useState<string[]>([]);

  const activeSecurityCount = Object.values(securityControls).filter(Boolean).length;
  const riskLevel = calculateSecurityRisk(activeSecurityCount, securityEvents.length, securityControls["Autenticación multifactor"]);
  const devicesAtRisk = devices.filter((device) => device.status !== "aprobado" || !securityControls["Autenticación multifactor"]);

  const supportMetrics = useMemo(() => {
    const resolved = tickets.filter((ticket) => ticket.status === "resuelto").length;
    const derived = tickets.filter((ticket) => ticket.status === "derivado").length;
    const aiResolution = tickets.length ? Math.round((resolved / tickets.length) * 100) : 0;
    const avgSatisfaction = satisfaction.length
      ? (satisfaction.reduce((sum, item) => sum + item, 0) / satisfaction.length).toFixed(1)
      : "-";
    return { total: tickets.length, resolved, derived, eta: tickets.some((ticket) => ticket.priority === "crítica") ? "15 s" : "45 s", aiResolution, avgSatisfaction };
  }, [satisfaction, tickets]);

  function createTicket(message: string, forced?: Partial<Pick<SupportTicket, "category" | "priority" | "response">>) {
    const classified = classifyTicket(message);
    const ticket: SupportTicket = {
      id: `SV-${String(tickets.length + 1).padStart(4, "0")}`,
      message,
      category: forced?.category ?? classified.category,
      priority: forced?.priority ?? classified.priority,
      response: forced?.response ?? classified.response,
      status: "abierto",
      createdAt: nowLabel(),
    };
    setTickets((current) => [ticket, ...current]);
    if (ticket.category === "técnico" && /sensor|batería|camara|cámara/.test(message.toLowerCase())) {
      setSupportAlerts((current) => [`${ticket.id}: alerta técnica por sensor/dispositivo para soporte.`, ...current]);
    }
    return ticket;
  }

  function handleSupportSubmit(event: FormEvent) {
    event.preventDefault();
    if (!supportInput.trim()) return;
    createTicket(supportInput.trim());
    setSupportInput("");
  }

  function updateTicket(id: string, status: TicketStatus) {
    setTickets((current) => current.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket)));
  }

  function syncWatch() {
    setEmployees((current) =>
      current.map((employee) => {
        if (employee.id !== selectedEmployeeId) return employee;
        const next = makeEmployee(
          employee.id,
          employee.role,
          70 + Math.floor(Math.random() * 58),
          91 + Math.floor(Math.random() * 9),
          112 + Math.floor(Math.random() * 42),
          Math.round((1 + Math.random() * 7.5) * 10) / 10,
          25 + Math.floor(Math.random() * 75),
          25 + Math.floor(Math.random() * 75),
        );
        if (next.alerts.length) {
          setReports((logs) => [`${nowLabel()} - ${next.role}: lectura IoT con ${next.alerts.length} alerta(s) preventivas.`, ...logs]);
        }
        return next;
      }),
    );
  }

  function generateReport(target: "RRHH" | "Obra Social" | "ART") {
    const report = `${nowLabel()} - Informe anonimizado para ${target}: ${selectedEmployee.role}, estado ${selectedEmployee.status}, ${selectedEmployee.alerts.length} alerta(s).`;
    setReports((current) => [report, ...current]);
  }

  function sendToRpa() {
    setRpaReport(`Datos IoT de ${selectedEmployee.role} recibidos para automatización RPA. Alertas: ${selectedEmployee.alerts.join(" | ") || "sin alertas"}.`);
    executeRpa();
  }

  function executeRpa() {
    if (rpaRunning) return;
    setRpaRunning(true);
    const hasRisk = selectedEmployee.status === "riesgo";
    const hasError = !securityControls["Auditoría del RPA"];
    setRpaStatuses(rpaSteps.map(() => "pendiente"));

    rpaSteps.forEach((_, index) => {
      window.setTimeout(() => {
        setRpaStatuses((current) => current.map((status, i) => (i === index ? "en proceso" : status)));
      }, index * 350);
      window.setTimeout(() => {
        setRpaStatuses((current) =>
          current.map((status, i) => {
            if (i !== index) return status;
            if (hasError && index === 2) return "error";
            if (hasRisk && index === rpaSteps.length - 1) return "alerta generada";
            return "completado";
          }),
        );
      }, index * 350 + 250);
    });

    window.setTimeout(() => {
      const result = hasError ? "Error" : hasRisk ? "Alerta generada" : "Completado";
      const observations = hasError
        ? "No se pudo auditar el bot RPA; revisar control de seguridad."
        : hasRisk
          ? "Riesgo médico/laboral derivado con reporte sensible protegido."
          : "Proceso completado sin alertas fuera de rango.";
      setRpaLogs((current) => [{ id: crypto.randomUUID(), time: nowLabel(), employee: selectedEmployee.role, result, observations }, ...current]);
      setRpaReport(`Informe simulado: ${selectedEmployee.role}. Resultado ${result}. ${observations}`);
      if (hasRisk) {
        addSecurityEvent("RPA generó alerta médica sensible", "Datos de salud laboral requieren protección reforzada.", "Mantener anonimización, auditoría RPA y consentimiento informado.");
      }
      setRpaRunning(false);
    }, rpaSteps.length * 350 + 350);
  }

  function addSecurityEvent(title: string, impact: string, action: string) {
    setSecurityEvents((current) => [{ id: crypto.randomUUID(), time: nowLabel(), title, impact, action }, ...current]);
  }

  function simulateIncident(template: (typeof incidentTemplates)[number]) {
    addSecurityEvent(template.title, template.impact, template.action);
    if (template.title.includes("Alarma manipulada")) {
      createTicket("Alarma manipulada o intento de desactivación indebida", {
        category: "emergencia",
        priority: "crítica",
        response: "Se generó un ticket crítico por posible sabotaje de alarma. Derivar a operador CRA y verificar sensores/cámaras.",
      });
    }
  }

  function registerDevice(event: FormEvent) {
    event.preventDefault();
    if (!byodForm.user.trim()) return;
    const evaluation = evaluateByodDevice(byodForm, securityControls["Autenticación multifactor"]);
    const device: ByodDevice = { id: crypto.randomUUID(), ...byodForm, user: byodForm.user.trim(), ...evaluation };
    setDevices((current) => [device, ...current]);
    const action = `${nowLabel()} - ${device.user} (${device.role}) registrado: ${device.status}. ${device.reason}`;
    setByodActions((current) => [action, ...current]);
    if (device.status === "rechazado") {
      addSecurityEvent("Dispositivo BYOD rechazado", `Usuario ${device.user}: ${device.reason}`, "Mantener bloqueo, capacitar al usuario y revisar MDM.");
    }
    setByodForm(initialByodForm);
  }

  function mutateDevice(id: string, action: "revocar" | "borrado") {
    const device = devices.find((item) => item.id === id);
    if (!device) return;
    if (action === "revocar") {
      setDevices((current) => current.map((item) => (item.id === id ? { ...item, status: "revocado", allowedAccess: "Sin acceso", reason: "Acceso revocado manualmente." } : item)));
      setByodActions((current) => [`${nowLabel()} - Acceso revocado para ${device.user}.`, ...current]);
    } else {
      setByodActions((current) => [`${nowLabel()} - Borrado remoto selectivo simulado para ${device.user}.`, ...current]);
    }
  }

  return (
    <div className="space-y-5">
      <section className="panel overflow-hidden p-5">
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
          <div>
            <p className="field-label mb-1">Módulos interactivos del prototipo TPO</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950">Tecnologías Inteligentes Verisure</h1>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
              Simulación funcional con estado local, formularios, tickets, alertas, controles de ciberseguridad, RPA y
              gestión BYOD para demostrar cómo una empresa tipo Verisure aplica IA, ML/DL, IoT y automatización sobre
              alarmas, sensores, cámaras, CRA, soporte técnico, empleados, ART, obra social y datos sensibles.
            </p>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-300">
                <RadioTower className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-950">Integración simulada activa</p>
                <p className="text-xs leading-5 text-slate-600">Tickets, bienestar IoT, RPA, ciberseguridad y BYOD se retroalimentan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="panel p-5">
          <ModuleHeader eyebrow="IA para atención al cliente" title="Asistente IA de Soporte Verisure 360°">
            Chatbot funcional que clasifica reclamos, asigna prioridad, crea tickets, permite derivar a operador CRA y
            conserva historial de conversación dentro de la interfaz.
          </ModuleHeader>
          <form onSubmit={handleSupportSubmit} className="mt-5 flex flex-col gap-3 lg:flex-row">
            <input
              value={supportInput}
              onChange={(event) => setSupportInput(event.target.value)}
              placeholder="Escribí una consulta: alarma, sensor, batería, facturación..."
              className="select-control m-0 flex-1"
            />
            <button type="submit" className="btn-primary"><MessageSquareText className="h-4 w-4" />Enviar consulta</button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickQueries.map((query) => (
              <button key={query} type="button" onClick={() => setSupportInput(query)} className="btn-ghost">{query}</button>
            ))}
          </div>

          <div className="mt-5 max-h-[430px] space-y-3 overflow-auto pr-1">
            {tickets.length === 0 ? (
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm font-semibold text-sky-900">Aún no hay tickets. Enviá una consulta para iniciar la simulación IA.</div>
            ) : (
              tickets.map((ticket) => (
                <article key={ticket.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-950">{ticket.id} · {ticket.message}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{ticket.response}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <MiniBadge tone="blue">{ticket.category}</MiniBadge>
                      <MiniBadge tone={ticketTone(ticket.priority)}>{ticket.priority}</MiniBadge>
                      <MiniBadge tone={ticket.status === "resuelto" ? "green" : ticket.status === "derivado" ? "amber" : "slate"}>{ticket.status}</MiniBadge>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={() => updateTicket(ticket.id, "derivado")} className="btn-ghost"><UserRoundCheck className="h-4 w-4" />Derivar humano</button>
                    <button type="button" onClick={() => updateTicket(ticket.id, "resuelto")} className="btn-ghost"><TicketCheck className="h-4 w-4" />Cerrar ticket</button>
                  </div>
                </article>
              ))
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Satisfacción del cliente:</span>
            <button type="button" onClick={() => setSatisfaction((current) => [5, ...current])} className="btn-ghost">👍 satisfecho</button>
            <button type="button" onClick={() => setSatisfaction((current) => [1, ...current])} className="btn-ghost">👎 insatisfecho</button>
          </div>
          {supportAlerts.length ? <LogList title="Alertas de soporte" items={supportAlerts} /> : null}
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          <KpiCard label="Tickets totales" value={String(supportMetrics.total)} helper="Historial IA" icon={TicketCheck} tone="blue" />
          <KpiCard label="Tickets resueltos" value={String(supportMetrics.resolved)} helper="Cerrados en pantalla" icon={CheckCircle2} tone="green" />
          <KpiCard label="Derivados a humano" value={String(supportMetrics.derived)} helper="Operador CRA" icon={UserRoundCheck} tone="amber" />
          <KpiCard label="Respuesta estimada" value={supportMetrics.eta} helper="Según prioridad" icon={Clock3} tone="blue" />
          <KpiCard label="Resolución IA" value={`${supportMetrics.aiResolution}%`} helper="Simulado" icon={BrainCircuit} tone="purple" />
          <KpiCard label="Satisfacción" value={String(supportMetrics.avgSatisfaction)} helper="Promedio votos" icon={ShieldCheck} tone="green" />
        </div>
      </section>

      <section className="panel p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <ModuleHeader eyebrow="IoT para bienestar laboral" title="Bienestar Seguro Verisure con relojes inteligentes">
            Dashboard funcional de empleados con lecturas biométricas simuladas, alertas preventivas, recomendaciones e
            informes anonimizados para RRHH, Obra Social y ART.
          </ModuleHeader>
          <MiniBadge tone="amber">Datos sensibles anonimizados</MiniBadge>
        </div>
        <div className="mt-5 grid gap-5 xl:grid-cols-[240px_1fr]">
          <div className="space-y-2">
            {employees.map((employee) => (
              <button
                key={employee.id}
                type="button"
                onClick={() => setSelectedEmployeeId(employee.id)}
                className={`w-full rounded-xl border p-3 text-left text-sm font-bold transition ${selectedEmployeeId === employee.id ? "border-verisure bg-red-50 text-slate-950" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
              >
                {employee.role}
                <span className="mt-1 block text-[11px] font-semibold text-slate-500">Estado: {employee.status}</span>
              </button>
            ))}
          </div>
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <button type="button" onClick={syncWatch} className="btn-primary"><RefreshCw className="h-4 w-4" />Sincronizar reloj</button>
              <button type="button" onClick={() => setEmployees((current) => current.map((item) => (item.id === selectedEmployee.id ? { ...item, reviewed: true } : item)))} className="btn-ghost">Marcar alerta revisada</button>
              <button type="button" onClick={() => generateReport("RRHH")} className="btn-ghost">Informe RRHH</button>
              <button type="button" onClick={() => generateReport("Obra Social")} className="btn-ghost">Informe Obra Social</button>
              <button type="button" onClick={() => generateReport("ART")} className="btn-ghost">Informe ART</button>
              <button type="button" onClick={sendToRpa} className="btn-ghost"><Bot className="h-4 w-4" />Enviar a RPA</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <HealthCard label="Frecuencia cardíaca" value={`${selectedEmployee.heartRate} bpm`} icon={HeartPulse} />
              <HealthCard label="Oxígeno en sangre" value={`${selectedEmployee.oxygen}%`} icon={Activity} />
              <HealthCard label="Presión arterial" value={selectedEmployee.bloodPressure} icon={Stethoscope} />
              <HealthCard label="Tiempo sentado" value={`${selectedEmployee.seatedHours} h`} icon={Clock3} />
              <HealthCard label="Actividad" value={`${selectedEmployee.activity}%`} icon={Watch} />
              <HealthCard label="Estrés" value={`${selectedEmployee.stress}%`} icon={Zap} />
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-sm text-slate-950">Recomendaciones preventivas:</strong>
                <MiniBadge tone={selectedEmployee.status === "riesgo" ? "red" : selectedEmployee.status === "atención" ? "amber" : "green"}>{selectedEmployee.status}</MiniBadge>
                {selectedEmployee.reviewed ? <MiniBadge tone="green">revisada</MiniBadge> : null}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {(selectedEmployee.alerts.length ? selectedEmployee.alerts : ["Sin alertas fuera de rango. Mantener pausas activas y controles preventivos."]).map((alert) => <li key={alert}>• {alert}</li>)}
              </ul>
            </div>
            <LogList title="Historial de informes IoT" items={reports} empty="Sin informes generados." />
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.75fr]">
        <article className="panel p-5">
          <ModuleHeader eyebrow="Automatización administrativa" title="Bot RPA funcional">
            Ejecuta un flujo paso a paso con estados visibles, log de ejecución, reintento, informe simulado y alerta
            médica protegida cuando Bienestar IoT detecta riesgo.
          </ModuleHeader>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={executeRpa} disabled={rpaRunning} className="btn-primary"><Bot className="h-4 w-4" />Ejecutar bot RPA</button>
            <button type="button" onClick={executeRpa} disabled={rpaRunning} className="btn-ghost">Reintentar proceso</button>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
            {rpaSteps.map((step, index) => (
              <div key={step} className="relative rounded-2xl border border-slate-200 bg-white p-3">
                <MiniBadge tone={rpaStatuses[index] === "completado" ? "green" : rpaStatuses[index] === "error" ? "red" : rpaStatuses[index] === "alerta generada" ? "amber" : rpaStatuses[index] === "en proceso" ? "blue" : "slate"}>{rpaStatuses[index]}</MiniBadge>
                <p className="mt-3 text-xs font-bold leading-5 text-slate-700">{step}</p>
                {index < rpaSteps.length - 1 ? <ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-400 xl:block" /> : null}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">{rpaReport}</div>
        </article>
        <article className="panel p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniStat label="Completados" value={String(rpaLogs.filter((log) => log.result === "Completado").length)} />
            <MiniStat label="Alertas" value={String(rpaLogs.filter((log) => log.result === "Alerta generada").length)} />
            <MiniStat label="Errores" value={String(rpaLogs.filter((log) => log.result === "Error").length)} />
          </div>
          <LogList title="Log RPA" items={rpaLogs.map((log) => `${log.time} - ${log.employee}: ${log.result}. ${log.observations}`)} empty="Sin ejecuciones." />
        </article>
      </section>

      <section className="panel p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <ModuleHeader eyebrow="Panel funcional de seguridad" title="Ciberseguridad y Protección de Datos">
            Checklist interactivo de controles, cálculo automático de riesgo, simulación de incidentes y log de eventos
            para alarmas, cámaras, IoT, RPA, BYOD y datos de salud.
          </ModuleHeader>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
            <p className="text-xs font-bold uppercase text-slate-500">Nivel de riesgo</p>
            <p className={`mt-1 text-2xl font-black ${riskLevel === "bajo" ? "text-emerald-700" : riskLevel === "medio" ? "text-amber-700" : "text-red-700"}`}>{riskLevel.toUpperCase()}</p>
            <p className="text-[11px] text-slate-500">{activeSecurityCount}/10 controles activos</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {securityControlLabels.map((control) => (
            <label key={control} className="flex cursor-pointer items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={securityControls[control]}
                onChange={() => setSecurityControls((current) => ({ ...current, [control]: !current[control] }))}
                className="mt-0.5 accent-red-600"
              />
              {control}
            </label>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {incidentTemplates.map((incident) => (
            <button key={incident.title} type="button" onClick={() => simulateIncident(incident)} className="btn-ghost"><AlertTriangle className="h-4 w-4" />{incident.title}</button>
          ))}
        </div>
        <LogList title="Registro de eventos de seguridad" items={securityEvents.map((event) => `${event.time} - ${event.title}. Impacto: ${event.impact} Acción: ${event.action}`)} empty="Sin incidentes registrados." />
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="panel p-5">
          <ModuleHeader eyebrow="Gestión BYOD" title="Registro y evaluación de dispositivos personales">
            Formulario controlado que aprueba, limita, deja pendiente o rechaza dispositivos según MFA, VPN, cifrado,
            actualización, antivirus y condición rooteada/jailbreakeada.
          </ModuleHeader>
          <form onSubmit={registerDevice} className="mt-5 space-y-3">
            <input value={byodForm.user} onChange={(e) => setByodForm({ ...byodForm, user: e.target.value })} placeholder="Nombre del usuario" className="select-control" />
            <div className="grid gap-3 sm:grid-cols-2">
              <SelectField label="Rol" value={byodForm.role} onChange={(value) => setByodForm({ ...byodForm, role: value })} options={["Desarrollo", "Soporte remoto", "Análisis de datos", "Administración", "Obra Social", "ART"]} />
              <SelectField label="Tipo" value={byodForm.type} onChange={(value) => setByodForm({ ...byodForm, type: value })} options={["Notebook", "Smartphone", "Tablet"]} />
              <SelectField label="Sistema operativo" value={byodForm.os} onChange={(value) => setByodForm({ ...byodForm, os: value })} options={["Windows", "macOS", "Android", "iOS", "Linux"]} />
              <SelectField label="Acceso solicitado" value={byodForm.requestedAccess} onChange={(value) => setByodForm({ ...byodForm, requestedAccess: value })} options={["Soporte remoto", "Dashboard BI", "Administración", "Datos médicos anonimizados", "Cámaras y alarmas críticas"]} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {([
                ["updated", "Sistema actualizado"],
                ["antivirus", "Antivirus activo"],
                ["encrypted", "Cifrado activo"],
                ["vpn", "VPN configurada"],
                ["mfa", "MFA habilitado"],
                ["rooted", "Rooteado/Jailbreak"],
              ] as const).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-700">
                  <input type="checkbox" checked={byodForm[key]} onChange={() => setByodForm({ ...byodForm, [key]: !byodForm[key] })} className="accent-red-600" />
                  {label}
                </label>
              ))}
            </div>
            <button type="submit" className="btn-primary"><Laptop className="h-4 w-4" />Registrar dispositivo</button>
          </form>
        </article>

        <article className="panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-black text-slate-950">Dispositivos registrados</h3>
            <MiniBadge tone={devicesAtRisk.length ? "amber" : "green"}>{`${devicesAtRisk.length} en riesgo`}</MiniBadge>
          </div>
          <div className="mt-4 max-h-[440px] space-y-3 overflow-auto pr-1">
            {devices.length === 0 ? (
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm font-semibold text-sky-900">Registrá un dispositivo para evaluar acceso BYOD.</div>
            ) : devices.map((device) => (
              <article key={device.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-slate-950">{device.user} · {device.type} {device.os}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{device.reason}</p>
                    <p className="mt-1 text-xs font-bold text-slate-700">Acceso permitido: {device.allowedAccess}</p>
                  </div>
                  <MiniBadge tone={device.status === "aprobado" ? "green" : device.status === "rechazado" || device.status === "revocado" ? "red" : "amber"}>{device.status}</MiniBadge>
                </div>
                {device.status !== "aprobado" || !securityControls["Autenticación multifactor"] ? (
                  <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-bold leading-5 text-red-900">
                    Acceso bloqueado a cámaras, alarmas críticas y datos médicos hasta remediar controles.
                  </div>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => mutateDevice(device.id, "revocar")} className="btn-ghost"><XCircle className="h-4 w-4" />Revocar acceso</button>
                  <button type="button" onClick={() => mutateDevice(device.id, "borrado")} className="btn-ghost"><Smartphone className="h-4 w-4" />Borrado selectivo</button>
                </div>
              </article>
            ))}
          </div>
          <LogList title="Historial BYOD" items={byodActions} empty="Sin acciones BYOD." />
        </article>
      </section>
    </div>
  );
}

function HealthCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof HeartPulse }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
          <strong className="mt-2 block text-2xl font-black text-slate-950">{value}</strong>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-emerald-700"><Icon className="h-5 w-5" /></div>
      </div>
    </article>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function LogList({ title, items, empty = "Sin registros." }: { title: string; items: string[]; empty?: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-black text-slate-950">{title}</h3>
      <div className="mt-3 max-h-44 space-y-2 overflow-auto pr-1">
        {items.length ? items.map((item, index) => <p key={`${item}-${index}`} className="rounded-lg bg-white p-2 text-xs font-semibold leading-5 text-slate-700">{item}</p>) : <p className="text-xs font-semibold text-slate-500">{empty}</p>}
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="select-control">
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
