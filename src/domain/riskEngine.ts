import type {
  AlarmAnalysis,
  AlarmInput,
  AudioVector,
  Connectivity,
  ScoreContribution,
  SensorVector,
  TimeSlot,
  VisualVector,
} from "./types";

const visualScores: Record<VisualVector, number> = {
  "Sin deteccion visual": 0,
  Mascota: -20,
  "Sombra / movimiento leve": 10,
  "Persona desconocida": 35,
  "Persona encapuchada": 45,
  "Arma visible": 60,
  "Camara obstruida por humo": 20,
};

const audioScores: Record<AudioVector, number> = {
  Silencio: 0,
  Ladrido: -15,
  "Ruido ambiente": 5,
  "Rotura de cristal": 35,
  "Grito / pedido de auxilio": 45,
  "Pasos internos": 20,
  "Golpe fuerte en puerta": 25,
};

const sensorScores: Record<SensorVector, number> = {
  "Sin sensor activado": 0,
  "Apertura de puerta": 25,
  "ShockSensor / golpe": 30,
  "Movimiento interior": 20,
  "Inhibicion de senal": 40,
  "Activacion ZeroVision": 35,
  "Sensor perimetral rural LoRaWAN": 20,
};

const connectivityScores: Record<Connectivity, number> = {
  "Fibra / WiFi": 0,
  "4G / 5G M2M": 0,
  LoRaWAN: 5,
  Satelital: 5,
  "Senal inhibida": 35,
};

const timeSlotScores: Record<TimeSlot, number> = {
  Manana: 0,
  Tarde: 0,
  Noche: 10,
  Madrugada: 15,
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

const createEventId = (date: Date) =>
  `VST-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export function analyzeEvent(input: AlarmInput, now = new Date()): AlarmAnalysis {
  const scoreBreakdown: ScoreContribution[] = [
    { label: "Vector visual", value: visualScores[input.visual], detail: input.visual },
    { label: "Vector auditivo", value: audioScores[input.audio], detail: input.audio },
    { label: "Vector sensorial / IoT", value: sensorScores[input.sensor], detail: input.sensor },
    { label: "Conectividad", value: connectivityScores[input.connectivity], detail: input.connectivity },
    { label: "Franja horaria", value: timeSlotScores[input.timeSlot], detail: input.timeSlot },
  ];
  const decisionRules: string[] = [];

  const forcedRed =
    (input.visual === "Arma visible" && input.audio === "Rotura de cristal") ||
    (input.visual === "Persona encapuchada" && input.sensor === "Inhibicion de senal");

  const handoffMode =
    input.sensor === "Activacion ZeroVision" && input.visual === "Camara obstruida por humo";

  let score = scoreBreakdown.reduce((sum, item) => sum + item.value, 0);

  if (input.customerType === "Agro / Rural" && input.sensor === "Sensor perimetral rural LoRaWAN") {
    score += 10;
    scoreBreakdown.push({
      label: "Ajuste Agro / Rural",
      value: 10,
      detail: "Cliente rural con sensor perimetral LoRaWAN",
    });
    decisionRules.push("Ajuste rural: sensor perimetral LoRaWAN en cliente Agro / Rural.");
  }

  if (input.visual === "Mascota" && input.audio === "Ladrido") {
    score -= 20;
    scoreBreakdown.push({
      label: "Filtro falsa alarma",
      value: -20,
      detail: "Mascota + ladrido",
    });
    decisionRules.push("Patrón doméstico: mascota + ladrido reduce criticidad.");
  }

  if (input.visual === "Persona desconocida" && input.sensor === "Movimiento interior") {
    score -= 15;
    scoreBreakdown.push({
      label: "Ajuste preventivo",
      value: -15,
      detail: "Persona desconocida + movimiento",
    });
    decisionRules.push("Contexto no concluyente: persona y movimiento requieren validación humana (amarillo).");
  }

  if (forcedRed) {
    score = Math.max(score, 82);
    decisionRules.push(
      input.visual === "Arma visible"
        ? "Regla crítica: arma visible + rotura de cristal fuerza alerta roja."
        : "Regla crítica: persona encapuchada + inhibición de señal fuerza alerta roja.",
    );
  }

  if (handoffMode) {
    decisionRules.push("Hand-off sensorial: ZeroVision activo con cámara obstruida por humo.");
  }

  const rawScoreBeforeClamp = score;
  const riskScore = clamp(score);
  const status = forcedRed || riskScore >= 60 ? "RED" : riskScore >= 26 ? "YELLOW" : "GREEN";
  const eventId = createEventId(now);
  const timestamp = now.toISOString();

  const handoffDescription = handoffMode
    ? input.thermalCamera === "Si"
      ? "Seguimiento por audio semántico + cámara térmica"
      : "Seguimiento degradado por audio semántico"
    : "No requiere hand-off sensorial";

  const contentByStatus = {
    GREEN: {
      title: "Falsa alarma filtrada",
      explanation:
        "El patrón multimodal coincide con baja criticidad. La señal puede resolverse sin despacho y con trazabilidad para auditoría.",
      recommendedAction: "Registrar evento, notificar al cliente si corresponde y liberar cola CRA.",
      operatorMessage: "Prioridad baja. Smart-Twin recomienda cierre operativo asistido.",
      estimatedResponseTimeSeconds: 18,
      costSavingARS: 9800,
    },
    YELLOW: {
      title: "Revisión humana requerida",
      explanation:
        "Hay señales mixtas o insuficientes para confirmar intrusión. Se prioriza validación humana antes de escalar.",
      recommendedAction: "Operador CRA valida audio/video disponible y contacta al cliente.",
      operatorMessage: "Prioridad media. Revisar contexto antes de despacho.",
      estimatedResponseTimeSeconds: 42,
      costSavingARS: 0,
    },
    RED: {
      title: "Intrusión crítica verificada",
      explanation:
        "La combinación de vectores indica alta probabilidad de evento real y amerita escalamiento inmediato.",
      recommendedAction: "Despacho inmediato y validación por operador CRA",
      operatorMessage: "Prioridad crítica. Preparar payload simulado para CRA/911.",
      estimatedResponseTimeSeconds: 12,
      costSavingARS: 0,
    },
  } as const;

  const selected = contentByStatus[status];
  const shouldGenerateEmergencyPayload = status === "RED";

  return {
    eventId,
    timestamp,
    riskScore,
    status,
    title: selected.title,
    explanation: `${selected.explanation} Factores: visual "${input.visual}", audio "${input.audio}", sensor "${input.sensor}", conectividad "${input.connectivity}" y franja "${input.timeSlot}".`,
    recommendedAction: selected.recommendedAction,
    operatorMessage: selected.operatorMessage,
    handoffMode,
    handoffDescription,
    estimatedResponseTimeSeconds: handoffMode ? selected.estimatedResponseTimeSeconds + 8 : selected.estimatedResponseTimeSeconds,
    costSavingARS: selected.costSavingARS,
    rawScoreBeforeClamp,
    scoreBreakdown,
    decisionRules,
    shouldGenerateEmergencyPayload,
    emergencyPayload: shouldGenerateEmergencyPayload
      ? {
          source: "Verisure Smart-Twin Academic MVP",
          eventId,
          timestamp,
          priority: "CRITICAL",
          riskScore,
          zone: input.zone,
          detectedVectors: {
            visual: input.visual,
            audio: input.audio,
            sensor: input.sensor,
          },
          recommendedAction: selected.recommendedAction,
          disclaimer: "Payload simulado. No se envia a servicios reales.",
        }
      : undefined,
  };
}
