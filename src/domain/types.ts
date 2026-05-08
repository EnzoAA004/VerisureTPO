export type Zone =
  | "CABA - Palermo"
  | "GBA Norte - San Isidro"
  | "GBA Oeste - Moron"
  | "Cordoba Capital"
  | "Rosario"
  | "Zona Rural / Agro";

export type CustomerType = "Hogar Base" | "Hogar Premium" | "PyME" | "Agro / Rural";

export type VisualVector =
  | "Sin deteccion visual"
  | "Mascota"
  | "Sombra / movimiento leve"
  | "Persona desconocida"
  | "Persona encapuchada"
  | "Arma visible"
  | "Camara obstruida por humo";

export type AudioVector =
  | "Silencio"
  | "Ladrido"
  | "Ruido ambiente"
  | "Rotura de cristal"
  | "Grito / pedido de auxilio"
  | "Pasos internos"
  | "Golpe fuerte en puerta";

export type SensorVector =
  | "Sin sensor activado"
  | "Apertura de puerta"
  | "ShockSensor / golpe"
  | "Movimiento interior"
  | "Inhibicion de senal"
  | "Activacion ZeroVision"
  | "Sensor perimetral rural LoRaWAN";

export type Connectivity =
  | "Fibra / WiFi"
  | "4G / 5G M2M"
  | "LoRaWAN"
  | "Satelital"
  | "Senal inhibida";

export type TimeSlot = "Manana" | "Tarde" | "Noche" | "Madrugada";

export type CameraThermal = "Si" | "No";

export type AlertStatus = "GREEN" | "YELLOW" | "RED";

export interface AlarmInput {
  zone: Zone;
  customerType: CustomerType;
  visual: VisualVector;
  audio: AudioVector;
  sensor: SensorVector;
  connectivity: Connectivity;
  timeSlot: TimeSlot;
  thermalCamera: CameraThermal;
}

export interface ScoreContribution {
  label: string;
  value: number;
  detail: string;
}

export interface EmergencyPayload {
  source: "Verisure Smart-Twin Academic MVP";
  eventId: string;
  timestamp: string;
  priority: "CRITICAL";
  riskScore: number;
  zone: Zone;
  detectedVectors: {
    visual: VisualVector;
    audio: AudioVector;
    sensor: SensorVector;
  };
  recommendedAction: string;
  disclaimer: "Payload simulado. No se envia a servicios reales.";
}

export interface AlarmAnalysis {
  eventId: string;
  timestamp: string;
  riskScore: number;
  status: AlertStatus;
  title: string;
  explanation: string;
  recommendedAction: string;
  operatorMessage: string;
  handoffMode: boolean;
  handoffDescription: string;
  estimatedResponseTimeSeconds: number;
  costSavingARS: number;
  rawScoreBeforeClamp: number;
  scoreBreakdown: ScoreContribution[];
  decisionRules: string[];
  shouldGenerateEmergencyPayload: boolean;
  emergencyPayload?: EmergencyPayload;
}

export interface StoredEvent extends AlarmAnalysis {
  input: AlarmInput;
}
