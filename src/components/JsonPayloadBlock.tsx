import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "../utils/formatters";

export function JsonPayloadBlock({ payload }: { payload: unknown }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(payload, null, 2);

  async function copy() {
    await copyToClipboard(json);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="mt-5 overflow-hidden rounded-xl border border-red-200 bg-white">
      <div className="flex items-center justify-between border-b border-red-100 bg-red-50 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-red-800">Payload 911 simulado</p>
          <p className="text-[10px] text-slate-600">No se envia a servicios reales - Solo fines academicos</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all duration-150 ${
            copied
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-slate-300 bg-white text-slate-700 hover:border-red-300 hover:text-red-800"
          }`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>

      <pre className="max-h-80 overflow-auto bg-slate-50 p-4 text-xs leading-relaxed text-slate-900">
        <code>{json}</code>
      </pre>
    </section>
  );
}
