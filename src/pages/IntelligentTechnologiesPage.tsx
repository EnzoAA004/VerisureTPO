import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  CloudCog,
  FileCheck2,
  HeartPulse,
  KeyRound,
  Laptop,
  LockKeyhole,
  MessageSquareText,
  RadioTower,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  TicketCheck,
  UserRoundCheck,
  Watch,
  Wifi,
  Zap,
} from "lucide-react";
import { KpiCard } from "../components/KpiCard";

const supportQueries = [
  "Mi alarma se activa sola",
  "El sensor no responde",
  "No puedo desactivar la alarma",
  "Tengo baja batería en un dispositivo",
  "Quiero solicitar una visita técnica",
  "Necesito reclamar por facturación o garantía",
];

const aiCapabilities = [
  "Clasifica reclamos automáticamente con IA, Machine Learning y Deep Learning explicable.",
  "Detecta si el problema es técnico, administrativo o de emergencia.",
  "Sugiere soluciones rápidas y guías paso a paso para alarmas, sensores y cámaras.",
  "Deriva a un operador humano cuando el caso es crítico o requiere verificación CRA.",
  "Crea tickets de soporte y consulta el historial del cliente con trazabilidad.",
  "Analiza datos de sensores IoT para diagnosticar baterías, conectividad y falsas alarmas.",
];

const wellbeingMetrics = [
  { label: "Frecuencia cardíaca", value: "78 bpm", status: "Normal", icon: HeartPulse },
  { label: "Oxígeno en sangre", value: "98%", status: "Sin alerta", icon: Activity },
  { label: "Presión arterial", value: "118/76", status: "Controlada", icon: Stethoscope },
  { label: "Tiempo sentado", value: "2 h 15 m", status: "Pausa sugerida", icon: Clock3 },
  { label: "Nivel de actividad", value: "72%", status: "Objetivo diario", icon: Watch },
  { label: "Estrés o fatiga", value: "Bajo", status: "Preventivo", icon: ShieldCheck },
];

const iotDevices = [
  "Sensores de calidad del aire en oficinas",
  "Sensores de presencia y ocupación segura",
  "Botón de pánico para técnicos en campo",
  "Sensores de postura para puestos administrativos",
  "Dispositivos de control de acceso",
  "Sensores de fatiga para personal operativo",
];

const rpaFlow = [
  { step: "01", title: "Reloj inteligente", text: "Recopila indicadores preventivos autorizados del empleado.", icon: Watch },
  { step: "02", title: "Plataforma segura", text: "Recibe datos cifrados y separa identidad de métricas de salud.", icon: CloudCog },
  { step: "03", title: "Validación", text: "Controla rangos, consentimiento y calidad del dato.", icon: CheckCircle2 },
  { step: "04", title: "Bot RPA", text: "Carga novedades en el legajo digital y registra auditoría.", icon: Bot },
  { step: "05", title: "Informes", text: "Genera reportes para RR. HH., Obra Social y ART.", icon: FileCheck2 },
  { step: "06", title: "Alerta preventiva", text: "Agenda revisión médica o notifica al área correspondiente.", icon: AlertTriangle },
];

const cyberControls = [
  "Cifrado de datos",
  "Autenticación multifactor",
  "Control de accesos por roles",
  "Segmentación de red IoT",
  "Actualización de firmware",
  "Monitoreo de accesos",
  "Auditoría del RPA",
  "Anonimización de datos de salud",
  "Backups seguros",
  "Política de privacidad",
  "Consentimiento informado",
  "Plan de respuesta ante incidentes",
];

const byodRules = [
  "Registro obligatorio del dispositivo",
  "Acceso mediante VPN",
  "Autenticación multifactor",
  "Control de permisos",
  "Separación entre datos personales y corporativos",
  "Uso de aplicaciones autorizadas",
  "Borrado remoto selectivo",
  "Prohibición de dispositivos inseguros, rooteados o sin actualizaciones",
  "Acceso limitado según el rol",
  "Capacitación en ciberseguridad",
];

const byodRisks = [
  "Robo o pérdida del dispositivo",
  "Malware",
  "Conexión a redes inseguras",
  "Fuga de datos",
  "Acceso indebido a información sensible",
  "Mezcla de información personal y laboral",
];

export function IntelligentTechnologiesPage() {
  return (
    <div className="space-y-5">
      <section className="panel overflow-hidden p-5">
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
          <div>
            <p className="field-label mb-1">Nueva sección del prototipo TPO</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950">Tecnologías Inteligentes Verisure</h1>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
              Pantalla conceptual para mostrar cómo una empresa de seguridad inteligente tipo Verisure aplica IA,
              Machine Learning, Deep Learning, IoT, RPA, Ciberseguridad y BYOD para mejorar la atención al cliente,
              el monitoreo remoto, el bienestar laboral y la operación interna sin convertir la solución en una app
              genérica de tecnología.
            </p>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-300">
                <RadioTower className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-950">Contexto Verisure</p>
                <p className="text-xs leading-5 text-slate-600">Alarmas conectadas, sensores IoT, cámaras, CRA, soporte técnico y datos sensibles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="panel p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="field-label mb-1">IA para atención al cliente</p>
              <h2 className="text-xl font-black text-slate-950">Asistente Inteligente de Soporte Verisure 360°</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Chatbot/panel de soporte que entiende consultas frecuentes, diagnostica fallas con telemetría IoT y
                acelera la derivación a operadores humanos cuando existe riesgo real o reclamo crítico.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
              IA + ML + IoT
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <MessageSquareText className="h-4 w-4 text-sky-700" />
                <p className="text-sm font-black text-slate-950">Consultas frecuentes</p>
              </div>
              <div className="space-y-2">
                {supportQueries.map((query) => (
                  <button
                    key={query}
                    type="button"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:bg-sky-50"
                  >
                    “{query}”
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-inner shadow-slate-100">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-verisure text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-sky-200 bg-sky-50 p-3">
                  <p className="text-sm font-bold text-slate-950">Diagnóstico sugerido</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Caso técnico: sensor de apertura con batería baja y pérdida intermitente de señal. Se sugiere
                    reinicio guiado, verificación de distancia al panel y creación de ticket si persiste.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {aiCapabilities.map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <p className="text-[12px] leading-5 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          <KpiCard label="Respuesta promedio" value="42 s" helper="Primer contacto IA" icon={Clock3} tone="blue" />
          <KpiCard label="Resueltas por IA" value="68%" helper="Sin espera humana" icon={BrainCircuit} tone="green" />
          <KpiCard label="Derivadas a humanos" value="21" helper="Casos críticos CRA" icon={UserRoundCheck} tone="amber" />
          <KpiCard label="Reclamos cerrados" value="94" helper="Tickets finalizados" icon={TicketCheck} tone="purple" />
          <KpiCard label="Satisfacción" value="4.7/5" helper="Encuesta post atención" icon={ShieldCheck} tone="green" />
          <KpiCard label="Falsas alarmas reducidas" value="31%" helper="Diagnóstico IoT" icon={Zap} tone="red" />
        </div>
      </section>

      <section className="panel p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="field-label mb-1">IoT para bienestar laboral</p>
            <h2 className="text-xl font-black text-slate-950">Bienestar Seguro Verisure</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
              Dashboard para RR. HH., Obra Social y ART con métricas preventivas agregadas y consentidas. El objetivo
              es mejorar calidad de vida, prevenir riesgos laborales y fortalecer el clima organizacional, no vigilar
              empleados ni medir productividad individual.
            </p>
          </div>
          <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800">Privacidad por diseño</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {wellbeingMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.label}</p>
                    <strong className="mt-2 block text-2xl font-black text-slate-950">{metric.value}</strong>
                    <p className="mt-1 text-xs font-semibold text-emerald-700">{metric.status}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {iotDevices.map((device) => (
            <div key={device} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <Wifi className="h-4 w-4 shrink-0 text-sky-700" />
              <p className="text-sm font-semibold text-slate-700">{device}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel p-5">
        <p className="field-label mb-1">Automatización administrativa</p>
        <h2 className="text-xl font-black text-slate-950">Automatización RPA</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
          Flujo automatizado para integrar relojes inteligentes, legajo digital, RR. HH., Obra Social y ART con alertas
          preventivas auditables y sin exponer información médica innecesaria.
        </p>
        <div className="mt-5 grid gap-3 xl:grid-cols-6">
          {rpaFlow.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative">
                <article className="h-full rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-verisure">{item.step}</span>
                    <div className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="mt-3 text-sm font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{item.text}</p>
                </article>
                {index < rpaFlow.length - 1 ? (
                  <ArrowRight className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-slate-400 xl:block" />
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <article className="panel p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-slate-950 p-3 text-white"><LockKeyhole className="h-6 w-6" /></div>
            <div>
              <p className="field-label mb-1">Protección de datos sensibles</p>
              <h2 className="text-xl font-black text-slate-950">Ciberseguridad y Protección de Datos</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                La ciberseguridad es central porque el prototipo trabaja con alarmas, cámaras, ubicación de clientes,
                horarios de activación, datos de empleados y reportes de salud.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {cyberControls.map((control) => (
              <div key={control} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" />
                <span className="text-xs font-bold text-slate-700">{control}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-sky-700 p-3 text-white"><Laptop className="h-6 w-6" /></div>
            <div>
              <p className="field-label mb-1">Dispositivos personales controlados</p>
              <h2 className="text-xl font-black text-slate-950">Política BYOD</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                BYOD se limita a desarrollo, soporte remoto, análisis de datos, administración, obra social y ART. No
                habilita acceso directo sin control a cámaras, alarmas ni datos críticos de clientes.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-black text-slate-950">Controles obligatorios</h3>
              <div className="space-y-2">
                {byodRules.map((rule) => (
                  <div key={rule} className="flex items-start gap-2 rounded-xl border border-sky-200 bg-sky-50 p-2.5">
                    <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                    <p className="text-xs font-semibold leading-5 text-slate-700">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-black text-slate-950">Riesgos principales</h3>
              <div className="space-y-2">
                {byodRisks.map((risk) => (
                  <div key={risk} className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-2.5">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                    <p className="text-xs font-semibold leading-5 text-amber-900">{risk}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-verisure/25 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-verisure" />
          <p className="text-sm font-semibold leading-6 text-red-950">
            Importante: todo el prototipo está contextualizado en Verisure o una empresa similar de seguridad
            inteligente. Cada funcionalidad se relaciona con alarmas, sensores, cámaras, monitoreo, atención al
            cliente, soporte técnico, empleados, ART, obra social, ciberseguridad y gestión de datos sensibles.
          </p>
        </div>
      </section>
    </div>
  );
}
