import React from "react";
import { useBayesStudio } from "../../context/BayesStudioContext";
import { Slider } from "../ui/Slider";
import { Button } from "../ui/Button";
import { Scale } from "lucide-react";

export function BayesCostMatrixControl() {
  const { state, actions } = useBayesStudio();
  const c = state.costMatrix;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-800 uppercase">
          <Scale className="h-4 w-4 text-sky-600" />
          Asymmetric Loss Matrix (Cost Functions)
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button variant="telemetry" size="sm" onClick={() => actions.applyPresetRiskProfile("high-security")}>
          High Security (C01=100)
        </Button>
        <Button variant="telemetry" size="sm" onClick={() => actions.applyPresetRiskProfile("balanced")}>
          Balanced (C01=50, C10=5)
        </Button>
        <Button variant="telemetry" size="sm" onClick={() => actions.applyPresetRiskProfile("low-friction")}>
          Low False Alarms
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
        <Slider
          label="C01: Missed Attack (False Negative Cost)"
          min={1}
          max={100}
          step={1}
          value={c.c01}
          onChange={(v) => actions.setCostMatrix({ c01: v })}
          accentColor="threat"
        />

        <Slider
          label="C10: False Alarm (False Positive Cost)"
          min={1}
          max={100}
          step={1}
          value={c.c10}
          onChange={(v) => actions.setCostMatrix({ c10: v })}
          accentColor="amber"
        />
      </div>
    </div>
  );
}
