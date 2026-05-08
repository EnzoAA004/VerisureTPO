import { Camera, ChevronRight, Cpu, Eye, Mic, Play, Radio, Sparkles, Thermometer, Wifi, Clock3 } from "lucide-react";
import type { AlarmInput } from "../domain/types";
import { demoScenarios, options } from "../data/demoScenarios";

interface EventFormProps {
  input: AlarmInput;
  onChange: (input: AlarmInput) => void;
  onAnalyze: () => void;
  isAnalyzing?: boolean;
}

const demoColors: Record<string, string> = {
  "Caso verde: Mascota + ladrido": "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
  "Caso amarillo: Persona desconocida + movimiento": "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100",
  "Caso rojo: Arma + rotura de cristal": "border-red-200 bg-red-50 text-red-800 hover:bg-red-100",
  "Caso ZeroVision: Humo + hand-off sensorial": "border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100",
  "Caso Agro: Sensor rural + inhibicion de senal": "border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100",
};

const demoPrefix: Record<string, string> = {
  "Caso verde: Mascota + ladrido": "Verde",
  "Caso amarillo: Persona desconocida + movimiento": "Amarillo",
  "Caso rojo: Arma + rotura de cristal": "Rojo",
  "Caso ZeroVision: Humo + hand-off sensorial": "ZeroVision",
  "Caso Agro: Sensor rural + inhibicion de senal": "Agro",
};

const fieldGroups = [
  {
    legend: "Ubicacion y contexto",
    icon: Radio,
    fields: [
      { key: "zone" as const, label: "Zona geografica", values: options.zones },
      { key: "customerType" as const, label: "Tipo de cliente", values: options.customerTypes },
      { key: "timeSlot" as const, label: "Franja horaria", values: options.timeSlots },
    ],
  },
  {
    legend: "Vectores de deteccion",
    icon: Eye,
    fields: [
      { key: "visual" as const, label: "Vector visual", values: options.visualVectors },
      { key: "audio" as const, label: "Vector auditivo", values: options.audioVectors },
      { key: "sensor" as const, label: "Vector sensorial / IoT", values: options.sensorVectors },
    ],
  },
  {
    legend: "Infraestructura",
    icon: Wifi,
    fields: [
      { key: "connectivity" as const, label: "Conectividad", values: options.connectivities },
      { key: "thermalCamera" as const, label: "Camara termica disponible", values: options.thermalCamera },
    ],
  },
];

const groupIcons = {
  "Ubicacion y contexto": Clock3,
  "Vectores de deteccion": Mic,
  Infraestructura: Cpu,
};

export function EventForm({ input, onChange, onAnalyze, isAnalyzing }: EventFormProps) {
  return (
    <section className="panel flex flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 pb-4">
        <div>
          <p className="field-label mb-1">Orquestador multimodal</p>
          <h2 className="text-xl font-black text-slate-950">Evento de alarma entrante</h2>
          <p className="mt-1 text-xs text-slate-600">
            Configura los vectores y ejecuta el analisis predictivo Smart-Twin.
          </p>
        </div>
        <div className="shrink-0 rounded-xl border border-red-200 bg-red-50 p-2.5">
          <Sparkles className="h-5 w-5 text-verisure" />
        </div>
      </div>

      <div className="border-b border-slate-200 p-5 pb-4">
        <p className="field-label mb-3">Casos de demo rapido</p>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          {Object.entries(demoScenarios).map(([name, scenario]) => (
            <button
              key={name}
              type="button"
              onClick={() => onChange(scenario)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-all duration-150 ${demoColors[name] ?? "border-slate-200 bg-white text-slate-800"}`}
            >
              <span className="rounded-md bg-white/80 px-2 py-1 text-[10px] font-black uppercase tracking-wide">
                {demoPrefix[name] ?? "Demo"}
              </span>
              <span className="flex-1 leading-snug">{name.replace(/^Caso \w+:\s*/, "")}</span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-5 p-5">
        {fieldGroups.map((group) => {
          const GroupIcon = groupIcons[group.legend as keyof typeof groupIcons] ?? Eye;
          return (
            <fieldset key={group.legend} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <legend className="flex items-center gap-1.5 bg-slate-50 px-2 text-[11px] font-bold uppercase tracking-widest text-slate-600">
                <GroupIcon className="h-3.5 w-3.5" />
                {group.legend}
              </legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {group.fields.map(({ key, label, values }) => (
                  <label key={key} className="block">
                    <span className="text-xs font-semibold text-slate-700">{label}</span>
                    <select
                      value={input[key]}
                      onChange={(event) => onChange({ ...input, [key]: event.target.value })}
                      className="select-control"
                    >
                      {(values as readonly string[]).map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}

        <div
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
            input.thermalCamera === "Si"
              ? "border-sky-200 bg-sky-50 text-sky-800"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          <Thermometer className="h-4 w-4 shrink-0" />
          <span>
            Camara termica: <strong>{input.thermalCamera === "Si" ? "Disponible" : "No disponible"}</strong>
          </span>
          <Camera className="ml-auto h-4 w-4 shrink-0 opacity-60" />
        </div>
      </div>

      <div className="border-t border-slate-200 p-5 pt-4">
        <button type="button" onClick={onAnalyze} disabled={isAnalyzing} className="btn-primary w-full py-3.5 text-base">
          <Play className="h-4.5 w-4.5" />
          {isAnalyzing ? "Analizando..." : "Ejecutar analisis Smart-Twin"}
        </button>
        <p className="mt-2 text-center text-[10px] text-slate-600">Sin llamadas reales a APIs - Procesamiento local</p>
      </div>
    </section>
  );
}
