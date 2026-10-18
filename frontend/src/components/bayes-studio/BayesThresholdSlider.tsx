import React from "react";
import { useBayesStudio } from "../../context/BayesStudioContext";
import { Slider } from "../ui/Slider";
import { Gauge, Sparkles } from "lucide-react";

export function BayesThresholdSlider() {
  const { state, actions, meta } = useBayesStudio();

  // Theoretical optimal threshold: tau* = C10 / (C10 + C01)
  const c10 = state.costMatrix.c10;
  const c01 = state.costMatrix.c01;
  const tauStar = parseFloat((c10 / (c10 + c01)).toFixed(3));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-800 uppercase">
          <Gauge className="h-4 w-4 text-sky-600" />
          Bayes Decision Threshold (τ)
        </div>
        <span className="text-xs font-mono text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
          Formula: τ* = {tauStar}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => actions.setThreshold(0.5)}
          className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors ${
            Math.abs(state.threshold - 0.5) < 0.01
              ? "bg-slate-800 text-white border-slate-900 font-bold"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          Default τ = 0.5
        </button>

        <button
          type="button"
          onClick={() => actions.setThreshold(Math.max(0.01, tauStar))}
          className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors flex items-center gap-1 ${
            Math.abs(state.threshold - tauStar) < 0.02
              ? "bg-emerald-700 text-white border-emerald-800 font-bold shadow-xs"
              : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
          }`}
        >
          <Sparkles className="h-3 w-3" />
          Optimal Bayes τ* ({tauStar})
        </button>

        <button
          type="button"
          onClick={() => actions.setPriorAttack(0.054)}
          className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors ml-auto ${
            Math.abs(state.priorAttack - 0.054) < 0.005
              ? "bg-amber-700 text-white border-amber-800 font-bold"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          Dataset Prior (5.4%)
        </button>
      </div>

      <Slider
        label="Classifier Operating Threshold (τ)"
        min={0.01}
        max={0.99}
        step={0.01}
        value={state.threshold}
        displayFormatter={(v) => v.toFixed(2)}
        onChange={actions.setThreshold}
        accentColor="cyan"
      />

      <Slider
        label="Prior Attack Probability P(Attack)"
        min={0.01}
        max={0.9}
        step={0.01}
        value={state.priorAttack}
        displayFormatter={(v) => `${(v * 100).toFixed(1)}%`}
        onChange={actions.setPriorAttack}
        accentColor="amber"
      />
    </div>
  );
}
