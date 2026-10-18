import React from "react";
import { useBatchExplorer } from "../../context/BatchExplorerContext";
import { ShieldCheck, ShieldAlert, AlertTriangle, Layers } from "lucide-react";

export function BatchSummaryMetrics() {
  const { meta } = useBatchExplorer();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="rounded-lg border border-slate-200 bg-white p-3 font-mono shadow-sm">
        <div className="flex items-center justify-between text-slate-500 text-xs">
          <span>Total Flows</span>
          <Layers className="h-4 w-4 text-sky-600" />
        </div>
        <div className="text-xl font-bold text-slate-900 mt-1 tabular-nums">{meta.totalFlows}</div>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 font-mono shadow-sm">
        <div className="flex items-center justify-between text-emerald-800 text-xs font-medium">
          <span>Benign Traffic</span>
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="text-xl font-bold text-emerald-900 mt-1 tabular-nums">{meta.benignCount}</div>
      </div>

      <div className="rounded-lg border border-rose-200 bg-rose-50/80 p-3 font-mono shadow-sm">
        <div className="flex items-center justify-between text-rose-800 text-xs font-medium">
          <span>Attacks Flagged</span>
          <ShieldAlert className="h-4 w-4 text-rose-600" />
        </div>
        <div className="text-xl font-bold text-rose-900 mt-1 tabular-nums">{meta.attackCount}</div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3 font-mono shadow-sm">
        <div className="flex items-center justify-between text-amber-800 text-xs font-medium">
          <span>High Severity (&gt;80%)</span>
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </div>
        <div className="text-xl font-bold text-amber-900 mt-1 tabular-nums">{meta.highThreatCount}</div>
      </div>
    </div>
  );
}
