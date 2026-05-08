import { StoredEvent } from "../domain/types";

const STORAGE_KEY = "vst_event_history";

export function saveEvents(events: StoredEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(0, 50)));
  } catch {
    // localStorage unavailable, silently ignore
  }
}

export function loadEvents(): StoredEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredEvent[];
  } catch {
    return [];
  }
}

export function exportJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
