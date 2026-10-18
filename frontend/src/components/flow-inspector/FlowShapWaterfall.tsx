import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function FlowShapWaterfall() {
  const { state } = useFlowInspector();
  const attributions = state.inferenceResult.attributions;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-800 uppercase">
          <Sparkles className="h-3.5 w-3.5 text-sky-600" />
          Explainable AI: Feature Attributions (SHAP Impact)
        </div>
        <span className="text-[10px] font-mono text-slate-500">TreeSHAP Values</span>
      </div>

      <div className="flex flex-col gap-2.5">
        {attributions.map((attr) => {
          const isPositive = attr.impact > 0;
          const absImpact = Math.min(100, Math.abs(attr.impact) * 100);

          return (
            <div key={attr.feature} className="flex flex-col gap-1 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-700 flex items-center gap-1 truncate font-medium">
                  {isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  )}
                  <span className="truncate">{attr.displayName}</span>
                </span>
                <span className={`font-semibold tabular-nums ${isPositive ? "text-rose-700" : "text-emerald-700"}`}>
                  {isPositive ? "+" : ""}
                  {attr.impact.toFixed(2)}
                </span>
              </div>

              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isPositive ? "bg-rose-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${absImpact}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
