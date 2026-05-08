import {
  AlertOctagon,
  BookOpen,
  CheckCircle2,
  FileWarning,
  Info,
  Lightbulb,
  Scale,
  XCircle,
} from "lucide-react";

interface DocSection {
  title: string;
  body: string;
  icon: typeof BookOpen;
  tone: "default" | "green" | "red" | "amber" | "blue";
}

const sections: DocSection[] = [
  {
    title: "Problema detectado",
    body: "Las falsas alarmas consumen el 60–80% del tiempo de los operadores CRA, generan costos operativos elevados y pueden demorar la atención de eventos genuinamente críticos. Verisure Argentina enfrenta este desafío en todas sus zonas.",
    icon: AlertOctagon,
    tone: "red",
  },
  {
    title: "Solución propuesta",
    body: "Verisure Smart-Twin simula una capa predictiva multimodal que combina señales visuales, auditivas, sensoriales IoT, conectividad y contexto horario para priorizar eventos antes de involucrar al operador humano.",
    icon: Lightbulb,
    tone: "amber",
  },
  {
    title: "Qué simula el MVP",
    body: "Calcula un Risk Score real por reglas determinísticas y explicables. Clasifica alertas (Verde/Amarillo/Rojo). Genera historial local persistente. Muestra BI gerencial con múltiples gráficos. Crea payload 911 simulado en alertas críticas.",
    icon: CheckCircle2,
    tone: "green",
  },
  {
    title: "Qué NO hace el MVP",
    body: "No llama a APIs externas. No envía alertas reales. No autentica usuarios. No almacena imágenes ni audio real. No procesa datos biométricos. No realiza reconocimiento facial. No conecta con sistemas de emergencia.",
    icon: XCircle,
    tone: "red",
  },
  {
    title: "Relación con la materia",
    body: "Integra las principales tendencias tecnológicas estudiadas: IoT, Inteligencia Artificial explicable, Edge Computing, Cloud Computing, Business Intelligence, Zero Trust, BYOD/MDM y Realidad Aumentada en una propuesta defendible académicamente.",
    icon: BookOpen,
    tone: "blue",
  },
  {
    title: "Privacidad y Ley 25.326",
    body: "Toda implementación real debería aplicar minimización de datos, consentimiento informado, seguridad por diseño, auditoría de acciones, y cumplimiento estricto de la Ley Nacional 25.326 de Protección de Datos Personales (Argentina).",
    icon: Scale,
    tone: "amber",
  },
];

const demoFlow = [
  { step: "1", action: "Mostrar el problema", detail: "Explicar el costo de las falsas alarmas para una CRA como Verisure." },
  { step: "2", action: "Cargar Caso Verde", detail: 'Ejecutar "Mascota + ladrido" → demostrar filtrado automático y ahorro.' },
  { step: "3", action: "Cargar Caso Rojo", detail: 'Ejecutar "Arma + rotura de cristal" → mostrar alerta crítica y payload 911.' },
  { step: "4", action: "Cargar Caso ZeroVision", detail: 'Mostrar Hand-off sensorial con cámara térmica disponible.' },
  { step: "5", action: "Dashboard BI", detail: "Navegar a Gerencia y mostrar gráficos, KPIs y tasa de falsas alarmas." },
  { step: "6", action: "Arquitectura", detail: "Cerrar con el diagrama tecnológico y las tarjetas de tendencias." },
];

const toneStyle = {
  default: "border-slate-700/60 bg-slate-900/60",
  green:   "border-emerald-400/25 bg-emerald-400/5",
  red:     "border-red-400/25 bg-red-400/5",
  amber:   "border-amber-400/25 bg-amber-400/5",
  blue:    "border-sky-400/25 bg-sky-400/5",
};

const toneIcon = {
  default: "text-slate-400",
  green:   "text-emerald-400",
  red:     "text-red-400",
  amber:   "text-amber-400",
  blue:    "text-sky-400",
};

export function DocumentationPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="panel p-5">
        <p className="field-label mb-1">Guía para exposición académica</p>
        <h1 className="text-2xl font-black text-white">Documentación Demo</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          El relato recomendado es presentar primero el dolor operativo, luego ejecutar un caso verde
          y un caso rojo, y cerrar con el dashboard gerencial y la arquitectura tecnológica.
        </p>
      </section>

      {/* Section cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <article
              key={section.title}
              className={["rounded-xl border p-5 transition-all hover:-translate-y-0.5", toneStyle[section.tone]].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={[
                    "mt-0.5 shrink-0 rounded-xl border p-2.5",
                    toneStyle[section.tone],
                    toneIcon[section.tone],
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{section.body}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Demo flow */}
      <section className="panel p-5">
        <div className="flex items-start gap-3 mb-5">
          <Info className="mt-0.5 h-5 w-5 text-sky-400 shrink-0" />
          <div>
            <h2 className="text-lg font-black text-white">Guión sugerido para la demo</h2>
            <p className="text-sm text-slate-500">Secuencia recomendada para maximizar el impacto frente al tribunal.</p>
          </div>
        </div>
        <div className="space-y-3">
          {demoFlow.map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-4 rounded-xl border border-slate-800/60 bg-slate-950/50 p-4"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-verisure/15 text-sm font-black text-verisure border border-verisure/25">
                {item.step}
              </span>
              <div>
                <p className="text-sm font-bold text-white">{item.action}</p>
                <p className="mt-0.5 text-xs text-slate-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legal disclaimer */}
      <section className="rounded-xl border border-verisure/30 bg-verisure/8 p-5">
        <div className="flex items-start gap-3">
          <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-verisure" />
          <div>
            <h3 className="text-base font-black text-red-200">Aclaración académica no oficial</h3>
            <p className="mt-2 text-sm leading-6 text-red-100/80">
              Este prototipo <strong>no pertenece a Verisure Argentina</strong> ni representa
              funcionalidades oficiales de la empresa. Fue creado íntegramente con propósitos
              educativos para la materia Tendencias Tecnológicas. No realiza llamadas reales a
              servicios de emergencia. No almacena datos personales reales. Cualquier semejanza con
              sistemas en producción es conceptual e ilustrativa.
            </p>
          </div>
        </div>
      </section>

      {/* Ethics card */}
      <section className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-5">
        <h3 className="mb-4 text-base font-black text-white">
          Compromisos éticos del prototipo
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Datos completamente simulados",
            "Sin imágenes reales de cámaras",
            "Sin reconocimiento facial",
            "Sin conexión a servicios de emergencia",
            "Sin autenticación real de usuarios",
            "Sin tracking de ubicación real",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2.5"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-200/80">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
