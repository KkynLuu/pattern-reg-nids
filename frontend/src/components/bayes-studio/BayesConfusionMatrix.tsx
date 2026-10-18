import React from "react";
import { useBayesStudio } from "../../context/BayesStudioContext";

export function BayesConfusionMatrix() {
  const { state } = useBayesStudio();
  const m = state.metrics;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-mono font-semibold text-slate-800 uppercase">
        Empirical Confusion Matrix (N = 1,000 Flows)
      </div>

      <div className="grid grid-cols-2 gap-2 text-center font-mono">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/90 p-3 shadow-xs">
          <div className="text-[10px] text-emerald-800 uppercase font-semibold">True Positive (TP)</div>
          <div className="text-2xl font-bold text-emerald-900 mt-1 tabular-nums">{m.tp}</div>
          <div className="text-[10px] text-slate-600 mt-0.5">Correctly Blocked Attack</div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50/90 p-3 shadow-xs">
          <div className="text-[10px] text-amber-800 uppercase font-semibold">False Positive (FP)</div>
          <div className="text-2xl font-bold text-amber-900 mt-1 tabular-nums">{m.fp}</div>
          <div className="text-[10px] text-slate-600 mt-0.5">False Alarm (Clean flagged)</div>
        </div>

        <div className="rounded-lg border border-rose-200 bg-rose-50/90 p-3 shadow-xs">
          <div className="text-[10px] text-rose-800 uppercase font-semibold">False Negative (FN)</div>
          <div className="text-2xl font-bold text-rose-900 mt-1 tabular-nums">{m.fn}</div>
          <div className="text-[10px] text-slate-600 mt-0.5">Missed Attack (Breach!)</div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50/90 p-3 shadow-xs">
          <div className="text-[10px] text-slate-700 uppercase font-semibold">True Negative (TN)</div>
          <div className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">{m.tn}</div>
          <div className="text-[10px] text-slate-600 mt-0.5">Normal Traffic Allowed</div>
        </div>
      </div>
    </div>
  );
}
