import {
  ArrowRight,
  Cloud,
  Cpu,
  Database,
  Eye,
  Globe2,
  Lock,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
  Tablet,
  UserCheck,
  Wifi,
  Zap,
} from "lucide-react";
import { TechCard } from "../components/TechCard";

const architectureSteps = [
  {
    step: "01",
    name: "Sensores IoT",
    icon: Radio,
    text: "Hogar, PyME y campo generan eventos: apertura, shock, movimiento, LoRaWAN rural.",
    color: "text-sky-400 bg-sky-400/10 border-sky-400/25",
  },
  {
    step: "02",
    name: "Edge Computing",
    icon: Cpu,
    text: "NPU / Coral Edge TPU conceptual filtra señales cerca del origen, reduciendo latencia.",
    color: "text-violet-400 bg-violet-400/10 border-violet-400/25",
  },
  {
    step: "03",
    name: "Protocolos IoT",
    icon: Wifi,
    text: "Zigbee, LoRaWAN, ONVIF, 4G/5G M2M y satelital para cobertura total.",
    color: "text-amber-400 bg-amber-400/10 border-amber-400/25",
  },
  {
    step: "04",
    name: "Smart-Twin",
    icon: Server,
    text: "Orquestador multimodal combina visión, audio, sensores y contexto horario.",
    color: "text-verisure bg-verisure/10 border-verisure/25",
  },
  {
    step: "05",
    name: "Cloud AWS/GCP",
    icon: Cloud,
    text: "Escalabilidad con Kubernetes, observabilidad, almacenamiento y BI en la nube.",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/25",
  },
  {
    step: "06",
    name: "CRA / Operador",
    icon: UserCheck,
    text: "Humano valida alertas amarillas, confirma críticos y cierra el bucle de decisión.",
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
  },
] as const;

const techs: {
  name: string;
  use: string;
  benefit: string;
  icon: typeof Radio;
  tag: string;
}[] = [
  {
    name: "TIC / NTIC",
    use: "Digitaliza la gestión CRA con trazabilidad, tableros y procesos asistidos.",
    benefit: "Menos fricción operativa y mejor control gerencial.",
    icon: Globe2,
    tag: "Core",
  },
  {
    name: "IoT",
    use: "Integra sensores del hogar, negocio y ruralidad para enriquecer la señal de alarma.",
    benefit: "Mayor contexto situacional y reducción de falsas alarmas.",
    icon: Radio,
    tag: "Sensing",
  },
  {
    name: "IA Explicable",
    use: "Motor predictivo determinístico simula clasificación multimodal auditable.",
    benefit: "Priorización defendible, trazable y sin cajas negras.",
    icon: Zap,
    tag: "AI",
  },
  {
    name: "Edge Computing",
    use: "Procesamiento en el borde con NPU / Coral Edge TPU conceptual.",
    benefit: "Menor latencia y menor dependencia de conectividad central.",
    icon: Cpu,
    tag: "Infra",
  },
  {
    name: "Cloud Computing",
    use: "Elasticidad conceptual sobre AWS/GCP y orquestación con Kubernetes.",
    benefit: "Escala ante picos de eventos y simplifica la analítica BI.",
    icon: Cloud,
    tag: "Infra",
  },
  {
    name: "Business Intelligence",
    use: "Indicadores de falsas alarmas, despachos, zonas críticas y ahorro operativo.",
    benefit: "Decisiones gerenciales basadas en datos, no en intuición.",
    icon: Database,
    tag: "BI",
  },
  {
    name: "BYOD + MDM",
    use: "Técnicos y supervisores usan dispositivos propios con gestión centralizada.",
    benefit: "Movilidad operativa con control de seguridad corporativa.",
    icon: Smartphone,
    tag: "Mobility",
  },
  {
    name: "Realidad Aumentada",
    use: "Asistencia visual para técnicos en instalación y mantenimiento de campo.",
    benefit: "Menos errores, mejor tiempo de resolución y capacitación acelerada.",
    icon: Tablet,
    tag: "XR",
  },
  {
    name: "Ciberseguridad Zero Trust",
    use: "Acceso mínimo, auditoría, cifrado extremo a extremo y verificación continua.",
    benefit: "Protección de datos personales y continuidad operativa garantizada.",
    icon: ShieldCheck,
    tag: "Security",
  },
];

export function ArchitecturePage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="panel p-5">
        <p className="field-label mb-1">Propuesta técnica académica</p>
        <h1 className="text-2xl font-black text-white">
          Smart-Twin como capa de orquestación predictiva
        </h1>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-500">
          La solución separa captura (IoT), procesamiento en borde (Edge), orquestación
          (Smart-Twin), validación humana (CRA) y analítica gerencial (BI). Es una propuesta
          académica conceptual: no usa infraestructura real ni integra servicios oficiales.
        </p>
      </section>

      {/* Architecture flow */}
      <section className="panel p-5">
        <h2 className="mb-5 text-lg font-black text-white">Flujo de datos del sistema</h2>
        <div className="relative grid gap-4 lg:grid-cols-6">
          {architectureSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.name} className="relative flex items-stretch">
                <div
                  className={[
                    "flex flex-1 flex-col rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg",
                    step.color,
                    "bg-opacity-10",
                  ].join(" ")}
                >
                  <span className="text-[10px] font-black tracking-widest opacity-50">
                    PASO {step.step}
                  </span>
                  <div className="mt-2">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-2 text-sm font-black text-white">{step.name}</h3>
                  <p className="mt-1.5 flex-1 text-[11px] leading-5 text-slate-400">{step.text}</p>
                </div>
                {idx < architectureSteps.length - 1 && (
                  <div className="hidden items-center px-1 lg:flex">
                    <ArrowRight className="h-4 w-4 text-slate-700" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech grid */}
      <div>
        <h2 className="mb-3 text-lg font-black text-white">Tecnologías integradas</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {techs.map((tech) => (
            <TechCard
              key={tech.name}
              name={tech.name}
              use={tech.use}
              benefit={tech.benefit}
              icon={tech.icon}
              tag={tech.tag}
            />
          ))}
        </div>
      </div>

      {/* Security + limits */}
      <div className="grid gap-4 md:grid-cols-2">
        <section className="panel p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-2.5">
              <Lock className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Ciberseguridad y ética</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                En un escenario real se requeriría <strong className="text-slate-200">cifrado extremo a extremo</strong>,{" "}
                control de acceso por roles, auditoría de acciones, consentimiento informado y{" "}
                cumplimiento de <strong className="text-slate-200">Ley 25.326 de Protección de Datos Personales</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="panel p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-sky-400/25 bg-sky-400/10 p-2.5">
              <Eye className="h-5 w-5 text-sky-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Límites del MVP</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-400">
                {[
                  "Datos 100% simulados, sin imágenes reales",
                  "Sin reconocimiento facial ni biometría",
                  "Sin conexión a servicios de emergencia",
                  "Sin autenticación real de usuarios",
                  "Sin llamadas a APIs externas",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
