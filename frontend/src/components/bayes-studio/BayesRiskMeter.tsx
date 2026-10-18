import React from "react";
import { useBayesStudio } from "../../context/BayesStudioContext";
import { TrendingDown, Award } from "lucide-react";

export function BayesRiskMeter() {
  const { state, meta } = useBayesStudio();
  const m = state.metrics;

  const isNearOptimal = Math.abs(state.threshold - meta.optimalThreshold) < 0.04;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Total Expected Bayes Risk</div>
          <div className="text-3xl font-bold font-mono text-sky-700 mt-0.5 tabular-nums">
            {m.totalBayesRisk.toFixed(2)}
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono">
          {isNearOptimal ? (
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Award className="h-4 w-4" /> Optimal Regime
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-600">
              <TrendingDown className="h-4 w-4 text-sky-600" /> Min Risk: {meta.minBayesRisk}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-200 text-center font-mono">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Accuracy</div>
          <div className="text-sm font-bold text-slate-800 tabular-nums">{(m.accuracy * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Recall</div>
          <div className="text-sm font-bold text-emerald-700 tabular-nums">{(m.recall * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Precision</div>
          <div className="text-sm font-bold text-sky-700 tabular-nums">{(m.precision * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">F1-Score</div>
          <div className="text-sm font-bold text-purple-700 tabular-nums">{m.f1.toFixed(3)}</div>
        </div>
      </div>
    </div>
  );
}
