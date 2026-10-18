import React from "react";
import { FlowInspectorProvider } from "../../context/FlowInspectorContext";
import { FlowPresetSelector } from "./FlowPresetSelector";
import { FlowTelemetryPillBar } from "./FlowTelemetryPillBar";
import { QuickScenarioBar } from "./QuickScenarioBar";
import { ModelArenaGrid } from "./ModelArenaGrid";
import { FlowSlidersGrid } from "./FlowSlidersGrid";
import { FlowVerdictCard } from "./FlowVerdictCard";
import { FlowShapWaterfall } from "./FlowShapWaterfall";
import { Card } from "../ui/Card";

export function FlowInspectorRoot() {
  return (
    <FlowInspectorProvider>
      <div className="space-y-6">
        {/* Top Control Panel: Preset Selector, 1-Click Scenarios & Flow Telemetry */}
        <Card variant="panel" className="p-4 sm:p-5 flex flex-col gap-4">
          <FlowPresetSelector />
          <QuickScenarioBar />
          <div className="pt-2 border-t border-slate-200">
            <FlowTelemetryPillBar />
          </div>
        </Card>

        {/* Model Arena: All 4 PR Models Compared Side-by-Side */}
        <Card variant="panel" className="p-4 sm:p-5">
          <ModelArenaGrid />
        </Card>

        {/* Feature Inspection: Sliders on Left, Active Model Verdict & Attribution on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <Card variant="panel" className="h-full p-4 sm:p-5">
              <FlowSlidersGrid />
            </Card>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <FlowVerdictCard />
            <FlowShapWaterfall />
          </div>
        </div>
      </div>
    </FlowInspectorProvider>
  );
}
