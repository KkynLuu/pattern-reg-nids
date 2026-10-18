import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Shuffle, RotateCcw, Flame } from "lucide-react";

export function FlowPresetSelector() {
  const { state, actions, meta } = useFlowInspector();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-sky-600" />
          <span className="text-xs font-mono font-semibold text-slate-800 uppercase tracking-wider">
            Flow Scenario Presets (UNSW-NB15)
          </span>
          {state.isPerturbed ? (
            <Badge variant="amber" size="sm">
              Custom Perturbed
            </Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="telemetry" size="sm" onClick={actions.randomizeFlow}>
            <Shuffle className="h-3 w-3" />
            Random Scenario
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={actions.resetToPreset}
            disabled={!state.isPerturbed}
            className="text-xs font-mono text-slate-600"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
        {meta.availableCategories.map((category) => {
          const isSelected = state.selectedCategory === category && !state.isPerturbed;
          const isBenign = category === "Benign";
          return (
            <button
              key={category}
              type="button"
              onClick={() => actions.selectPreset(category, 0)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded border text-xs font-mono transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isSelected
                  ? isBenign
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm font-semibold"
                    : "bg-rose-50 border-rose-300 text-rose-800 shadow-sm font-semibold"
                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="truncate">{category}</span>
              <span className="text-[10px] opacity-60 ml-1">#{state.selectedCategory === category ? state.selectedSampleIndex + 1 : 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
