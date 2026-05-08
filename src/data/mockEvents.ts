import { analyzeEvent } from "../domain/riskEngine";
import type { AlarmInput, StoredEvent } from "../domain/types";

const inputs: AlarmInput[] = [
  { zone: "CABA - Palermo", customerType: "Hogar Premium", visual: "Mascota", audio: "Ladrido", sensor: "Movimiento interior", connectivity: "Fibra / WiFi", timeSlot: "Tarde", thermalCamera: "No" },
  { zone: "GBA Norte - San Isidro", customerType: "PyME", visual: "Persona desconocida", audio: "Pasos internos", sensor: "Apertura de puerta", connectivity: "4G / 5G M2M", timeSlot: "Noche", thermalCamera: "Si" },
  { zone: "GBA Oeste - Moron", customerType: "Hogar Base", visual: "Sombra / movimiento leve", audio: "Ruido ambiente", sensor: "Sin sensor activado", connectivity: "Fibra / WiFi", timeSlot: "Manana", thermalCamera: "No" },
  { zone: "Cordoba Capital", customerType: "PyME", visual: "Arma visible", audio: "Rotura de cristal", sensor: "ShockSensor / golpe", connectivity: "4G / 5G M2M", timeSlot: "Madrugada", thermalCamera: "Si" },
  { zone: "Rosario", customerType: "Hogar Premium", visual: "Camara obstruida por humo", audio: "Pasos internos", sensor: "Activacion ZeroVision", connectivity: "Satelital", timeSlot: "Noche", thermalCamera: "Si" },
  { zone: "Zona Rural / Agro", customerType: "Agro / Rural", visual: "Persona encapuchada", audio: "Golpe fuerte en puerta", sensor: "Inhibicion de senal", connectivity: "Senal inhibida", timeSlot: "Madrugada", thermalCamera: "No" },
  { zone: "CABA - Palermo", customerType: "Hogar Base", visual: "Sin deteccion visual", audio: "Silencio", sensor: "Apertura de puerta", connectivity: "Fibra / WiFi", timeSlot: "Manana", thermalCamera: "No" },
  { zone: "Rosario", customerType: "PyME", visual: "Persona desconocida", audio: "Grito / pedido de auxilio", sensor: "Movimiento interior", connectivity: "4G / 5G M2M", timeSlot: "Noche", thermalCamera: "Si" },
  { zone: "Cordoba Capital", customerType: "Hogar Base", visual: "Mascota", audio: "Ladrido", sensor: "Sin sensor activado", connectivity: "Fibra / WiFi", timeSlot: "Tarde", thermalCamera: "No" },
  { zone: "Zona Rural / Agro", customerType: "Agro / Rural", visual: "Sombra / movimiento leve", audio: "Ruido ambiente", sensor: "Sensor perimetral rural LoRaWAN", connectivity: "LoRaWAN", timeSlot: "Noche", thermalCamera: "No" },
];

export const mockEvents: StoredEvent[] = inputs.map((input, index) => ({
  ...analyzeEvent(input, new Date(Date.now() - (9 - index) * 86_400_000)),
  input,
}));
