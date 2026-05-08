import type { AlertStatus } from "../domain/types";

const statusConfig = {
  GREEN: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
    dot: "bg-emerald-600",
    label: "Falsa alarma filtrada",
  },
  YELLOW: {
    badge: "border-amber-200 bg-amber-50 text-amber-800",
    dot: "bg-amber-600",
    label: "Revision humana requerida",
  },
  RED: {
    badge: "border-red-200 bg-red-50 text-red-800",
    dot: "bg-red-600 animate-pulse-ring",
    label: "Intrusion critica verificada",
  },
} as const;

interface StatusBadgeProps {
  status: AlertStatus;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`badge ${config.badge} ${size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1.5 text-xs"}`}>
      <span className={`h-2 w-2 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
