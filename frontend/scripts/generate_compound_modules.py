
import os

src = "/Users/kkyn/Documents/Work/PatternReg/final/frontend/src"

def write(path, content):
    full = os.path.join(src, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {path}")

# ==================== Module 1: Flow Inspector Compound Components ====================

write("components/flow-inspector/FlowPresetSelector.tsx", """
import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { AttackClass } from "../../types/flow";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Shuffle, RotateCcw, Flame } from "lucide-react";

export function FlowPresetSelector() {
  const { state, actions, meta } = useFlowInspector();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
            Flow Scenario Presets (UNSW-NB15)
          </span>
          {state.isPerturbed && (
            <Badge variant="amber" size="sm">
              Custom Perturbed
            </Badge>
          )}
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
            className="text-xs font-mono text-slate-400"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      </div>

      {/* Preset Category Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
        {meta.availableCategories.map((category) => {
          const isSelected = state.selectedCategory === category && !state.isPerturbed;
          const isBenign = category === "Benign";
          return (
            <button
              key={category}
              onClick={() => actions.selectPreset(category, 0)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded border text-xs font-mono transition-all ${
                isSelected
                  ? isBenign
                    ? "bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-glow-emerald"
                    : "bg-rose-950/70 border-rose-500 text-rose-300 shadow-glow-crimson"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
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
""")

write("components/flow-inspector/FlowTelemetryPillBar.tsx", """
import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { getProtocolName } from "../../lib/utils";
import { Network, Radio, Hash, Clock } from "lucide-react";

export function FlowTelemetryPillBar() {
  const { state } = useFlowInspector();
  const flow = state.currentFlow;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#0B0F17]/80 rounded-md border border-[#1E293B] p-3 text-xs font-mono">
      <div className="flex items-center gap-2">
        <Network className="h-4 w-4 text-cyan-400 shrink-0" />
        <div className="truncate">
          <div className="text-[10px] text-slate-500 uppercase">Src Socket</div>
          <div className="text-slate-200 truncate font-semibold">
            {flow.IPV4_SRC_ADDR}:{flow.L4_SRC_PORT}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Radio className="h-4 w-4 text-blue-400 shrink-0" />
        <div className="truncate">
          <div className="text-[10px] text-slate-500 uppercase">Dst Socket</div>
          <div className="text-slate-200 truncate font-semibold">
            {flow.IPV4_DST_ADDR}:{flow.L4_DST_PORT}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4 text-purple-400 shrink-0" />
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Protocol</div>
          <div className="text-slate-200 font-semibold">{getProtocolName(flow.PROTOCOL)}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-amber-400 shrink-0" />
        <div>
          <div className="text-[10px] text-slate-500 uppercase">TCP Flags</div>
          <div className="text-slate-200 font-semibold">0x{flow.TCP_FLAGS.toString(16).toUpperCase()} ({flow.TCP_FLAGS})</div>
        </div>
      </div>
    </div>
  );
}
""")

write("components/flow-inspector/FlowSlidersGrid.tsx", """
import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { Slider } from "../ui/Slider";
import { formatBytes, formatBps, formatDuration } from "../../lib/utils";
import { Sliders } from "lucide-react";

export function FlowSlidersGrid() {
  const { state, actions } = useFlowInspector();
  const flow = state.currentFlow;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
          <Sliders className="h-3.5 w-3.5 text-cyan-400" />
          Interactive Feature Perturbation (What-If Analysis)
        </div>
        <span className="text-[11px] text-cyan-400/80 font-mono">Real-time Model Feedback</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Flow Duration */}
        <Slider
          label="Flow Duration"
          min={0}
          max={5000}
          step={10}
          value={flow.FLOW_DURATION_MILLISECONDS}
          displayFormatter={(v) => formatDuration(v)}
          onChange={(v) => actions.updateFeature("FLOW_DURATION_MILLISECONDS", v)}
          accentColor={flow.FLOW_DURATION_MILLISECONDS < 10 ? "threat" : "cyan"}
        />

        {/* Throughput */}
        <Slider
          label="Src to Dst Throughput"
          min={0}
          max={10_000_000}
          step={50_000}
          value={flow.SRC_TO_DST_AVG_THROUGHPUT}
          displayFormatter={(v) => formatBps(v)}
          onChange={(v) => actions.updateFeature("SRC_TO_DST_AVG_THROUGHPUT", v)}
          accentColor={flow.SRC_TO_DST_AVG_THROUGHPUT > 1_000_000 ? "threat" : "cyan"}
        />

        {/* Incoming Bytes */}
        <Slider
          label="Incoming Payload Volume (IN_BYTES)"
          min={0}
          max={50_000}
          step={100}
          value={flow.IN_BYTES}
          displayFormatter={(v) => formatBytes(v)}
          onChange={(v) => actions.updateFeature("IN_BYTES", v)}
          accentColor={flow.IN_BYTES > 15_000 ? "threat" : "cyan"}
        />

        {/* Outgoing Bytes */}
        <Slider
          label="Outgoing Reply Volume (OUT_BYTES)"
          min={0}
          max={50_000}
          step={100}
          value={flow.OUT_BYTES}
          displayFormatter={(v) => formatBytes(v)}
          onChange={(v) => actions.updateFeature("OUT_BYTES", v)}
          accentColor="cyan"
        />

        {/* Incoming Packets */}
        <Slider
          label="Incoming Packets (IN_PKTS)"
          min={1}
          max={200}
          step={1}
          unit="pkts"
          value={flow.IN_PKTS}
          onChange={(v) => actions.updateFeature("IN_PKTS", v)}
          accentColor={flow.IN_PKTS > 60 ? "threat" : "cyan"}
        />

        {/* Outgoing Packets */}
        <Slider
          label="Outgoing Packets (OUT_PKTS)"
          min={0}
          max={200}
          step={1}
          unit="pkts"
          value={flow.OUT_PKTS}
          onChange={(v) => actions.updateFeature("OUT_PKTS", v)}
          accentColor={flow.OUT_PKTS === 0 ? "amber" : "cyan"}
        />

        {/* Longest Packet Size */}
        <Slider
          label="Longest Flow Packet (LONGEST_FLOW_PKT)"
          min={40}
          max={1514}
          step={10}
          unit="B"
          value={flow.LONGEST_FLOW_PKT}
          onChange={(v) => actions.updateFeature("LONGEST_FLOW_PKT", v)}
          accentColor={flow.LONGEST_FLOW_PKT > 1400 ? "threat" : "cyan"}
        />

        {/* Max TTL */}
        <Slider
          label="Max Time-To-Live (MAX_TTL)"
          min={1}
          max={255}
          step={1}
          value={flow.MAX_TTL}
          onChange={(v) => actions.updateFeature("MAX_TTL", v)}
          accentColor="cyan"
        />

        {/* Retransmitted Bytes */}
        <Slider
          label="Retransmitted Bytes"
          min={0}
          max={10_000}
          step={50}
          displayFormatter={(v) => formatBytes(v)}
          value={flow.RETRANSMITTED_IN_BYTES}
          onChange={(v) => actions.updateFeature("RETRANSMITTED_IN_BYTES", v)}
          accentColor={flow.RETRANSMITTED_IN_BYTES > 1000 ? "threat" : "cyan"}
        />

        {/* Inter-Packet Arrival Time Avg */}
        <Slider
          label="Src->Dst Arrival Time (IAT Avg)"
          min={0}
          max={500}
          step={5}
          unit="ms"
          value={flow.SRC_TO_DST_IAT_AVG}
          onChange={(v) => actions.updateFeature("SRC_TO_DST_IAT_AVG", v)}
          accentColor="cyan"
        />
      </div>
    </div>
  );
}
""")

write("components/flow-inspector/FlowVerdictCard.tsx", """
import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { getAttackColor } from "../../lib/utils";
import { ShieldAlert, ShieldCheck, Zap } from "lucide-react";

export function FlowVerdictCard() {
  const { state } = useFlowInspector();
  const res = state.inferenceResult;
  const style = getAttackColor(res.predictedClass);

  const topThreeProbabilities = Object.entries(res.probabilities)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className={`rounded-lg border p-5 transition-all ${style.bg} ${style.border} ${style.glow}`}>
      {/* Verdict Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`h-11 w-11 rounded-lg flex items-center justify-center border ${style.border} bg-slate-950/70`}>
            {res.isAttack ? (
              <ShieldAlert className="h-6 w-6 text-rose-400" />
            ) : (
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Inference Decision
            </div>
            <h3 className={`text-xl font-bold font-mono tracking-tight ${style.text}`}>
              {res.predictedClass.toUpperCase()}
            </h3>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Confidence</div>
          <div className="text-lg font-bold font-mono text-white">
            {(res.confidence * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Threat Meter */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-400">Threat Anomaly Probability</span>
          <span className={res.anomalyScore > 0.5 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
            {(res.anomalyScore * 100).toFixed(1)}%
          </span>
        </div>
        <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              res.anomalyScore > 0.5
                ? "bg-gradient-to-r from-amber-500 via-rose-500 to-red-600"
                : "bg-gradient-to-r from-emerald-600 to-teal-400"
            }`}
            style={{ width: `${Math.min(100, Math.max(2, res.anomalyScore * 100))}%` }}
          />
        </div>
      </div>

      {/* Multiclass Probability Breakdown */}
      <div className="mt-4 pt-4 border-t border-slate-800/80">
        <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-cyan-400" />
          Top Class Probabilities:
        </div>
        <div className="grid grid-cols-2 gap-2">
          {topThreeProbabilities.map(([name, prob]) => {
            const pct = (prob * 100).toFixed(1);
            return (
              <div key={name} className="flex items-center justify-between bg-slate-950/60 rounded px-2 py-1 text-xs font-mono">
                <span className="text-slate-400 truncate">{name}:</span>
                <span className="font-semibold text-slate-200 ml-1">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
""")

write("components/flow-inspector/FlowShapWaterfall.tsx", """
import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function FlowShapWaterfall() {
  const { state } = useFlowInspector();
  const attributions = state.inferenceResult.attributions;

  return (
    <div className="rounded-lg border border-[#1F2E47] bg-[#101726]/80 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 uppercase">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
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
                <span className="text-slate-300 flex items-center gap-1 truncate">
                  {isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  )}
                  <span className="truncate">{attr.displayName}</span>
                </span>
                <span className={`font-semibold ${isPositive ? "text-rose-400" : "text-emerald-400"}`}>
                  {isPositive ? "+" : ""}
                  {attr.impact.toFixed(2)}
                </span>
              </div>

              {/* Impact Bar */}
              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isPositive ? "bg-rose-500" : "bg-emerald-400"
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
""")

write("components/flow-inspector/FlowInspectorRoot.tsx", """
import React from "react";
import { FlowInspectorProvider } from "../../context/FlowInspectorContext";
import { FlowPresetSelector } from "./FlowPresetSelector";
import { FlowTelemetryPillBar } from "./FlowTelemetryPillBar";
import { FlowSlidersGrid } from "./FlowSlidersGrid";
import { FlowVerdictCard } from "./FlowVerdictCard";
import { FlowShapWaterfall } from "./FlowShapWaterfall";
import { Card } from "../ui/Card";

export function FlowInspectorRoot() {
  return (
    <FlowInspectorProvider>
      <div className="space-y-6">
        {/* Top Preset Selector & Meta Bar */}
        <Card variant="panel" className="p-4 sm:p-5">
          <FlowPresetSelector />
          <div className="mt-4">
            <FlowTelemetryPillBar />
          </div>
        </Card>

        {/* Main 2-Column Split: Sliders on Left, Telemetry & Explainability on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <Card variant="panel" className="h-full">
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
""")

write("components/flow-inspector/index.ts", """
export { FlowInspectorRoot as FlowInspector } from "./FlowInspectorRoot";
export { FlowPresetSelector } from "./FlowPresetSelector";
export { FlowTelemetryPillBar } from "./FlowTelemetryPillBar";
export { FlowSlidersGrid } from "./FlowSlidersGrid";
export { FlowVerdictCard } from "./FlowVerdictCard";
export { FlowShapWaterfall } from "./FlowShapWaterfall";
""")

# ==================== Module 2: Bayes Studio Compound Components ====================

write("components/bayes-studio/BayesThresholdSlider.tsx", """
import React from "react";
import { useBayesStudio } from "../../context/BayesStudioContext";
import { Slider } from "../ui/Slider";
import { Gauge } from "lucide-react";

export function BayesThresholdSlider() {
  const { state, actions, meta } = useBayesStudio();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 uppercase">
          <Gauge className="h-4 w-4 text-cyan-400" />
          Bayes Decision Threshold (\\tau)
        </div>
        <span className="text-xs font-mono text-cyan-400">
          Optimal: \\tau = {meta.optimalThreshold}
        </span>
      </div>

      <Slider
        label="Classifier Threshold \\tau"
        min={0.05}
        max={0.95}
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
        displayFormatter={(v) => `${(v * 100).toFixed(0)}%`}
        onChange={actions.setPriorAttack}
        accentColor="amber"
      />
    </div>
  );
}
""")

write("components/bayes-studio/BayesCostMatrixControl.tsx", """
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
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 uppercase">
          <Scale className="h-4 w-4 text-cyan-400" />
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
""")

write("components/bayes-studio/BayesConfusionMatrix.tsx", """
import React from "react";
import { useBayesStudio } from "../../context/BayesStudioContext";

export function BayesConfusionMatrix() {
  const { state } = useBayesStudio();
  const m = state.metrics;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs font-mono font-semibold text-slate-300 uppercase">
        Empirical Confusion Matrix (N = 1,000 Flows)
      </div>

      <div className="grid grid-cols-2 gap-2 text-center font-mono">
        {/* True Positive */}
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-3">
          <div className="text-[10px] text-emerald-400 uppercase">True Positive (TP)</div>
          <div className="text-2xl font-bold text-emerald-300 mt-1">{m.tp}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Correctly Blocked Attack</div>
        </div>

        {/* False Positive (False Alarm) */}
        <div className="rounded-lg border border-amber-500/40 bg-amber-950/40 p-3">
          <div className="text-[10px] text-amber-400 uppercase">False Positive (FP)</div>
          <div className="text-2xl font-bold text-amber-300 mt-1">{m.fp}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">False Alarm (Benign flagged)</div>
        </div>

        {/* False Negative (Missed Attack) */}
        <div className="rounded-lg border border-rose-500/50 bg-rose-950/50 p-3">
          <div className="text-[10px] text-rose-400 uppercase">False Negative (FN)</div>
          <div className="text-2xl font-bold text-rose-300 mt-1">{m.fn}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Missed Attack (Breach!)</div>
        </div>

        {/* True Negative */}
        <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
          <div className="text-[10px] text-slate-400 uppercase">True Negative (TN)</div>
          <div className="text-2xl font-bold text-slate-200 mt-1">{m.tn}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Normal Traffic Allowed</div>
        </div>
      </div>
    </div>
  );
}
""")

write("components/bayes-studio/BayesRiskMeter.tsx", """
import React from "react";
import { useBayesStudio } from "../../context/BayesStudioContext";
import { TrendingDown, Award } from "lucide-react";

export function BayesRiskMeter() {
  const { state, meta } = useBayesStudio();
  const m = state.metrics;

  const isNearOptimal = Math.abs(state.threshold - meta.optimalThreshold) < 0.04;

  return (
    <div className="rounded-lg border border-[#1F2E47] bg-[#101726]/90 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase text-slate-400">Total Expected Bayes Risk</div>
          <div className="text-3xl font-bold font-mono text-cyan-400 mt-0.5">
            {m.totalBayesRisk.toFixed(2)}
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono">
          {isNearOptimal ? (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Award className="h-4 w-4" /> Optimal Regime
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-400">
              <TrendingDown className="h-4 w-4 text-cyan-400" /> Min Risk: {meta.minBayesRisk}
            </span>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800 text-center font-mono">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Accuracy</div>
          <div className="text-sm font-bold text-slate-200">{(m.accuracy * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Recall</div>
          <div className="text-sm font-bold text-emerald-400">{(m.recall * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">Precision</div>
          <div className="text-sm font-bold text-cyan-400">{(m.precision * 100).toFixed(1)}%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">F1-Score</div>
          <div className="text-sm font-bold text-purple-400">{m.f1.toFixed(3)}</div>
        </div>
      </div>
    </div>
  );
}
""")

write("components/bayes-studio/BayesRocCurve.tsx", """
import React from "react";
import { useBayesStudio } from "../../context/BayesStudioContext";

export function BayesRocCurve() {
  const { state } = useBayesStudio();
  const roc = state.rocCurve;
  const m = state.metrics;

  const currentFpr = m.fp / (m.fp + m.tn || 1);
  const currentTpr = m.tp / (m.tp + m.fn || 1);

  // SVG dimensions
  const width = 320;
  const height = 220;
  const pad = 35;

  const getX = (fpr: number) => pad + fpr * (width - pad * 2);
  const getY = (tpr: number) => height - pad - tpr * (height - pad * 2);

  const pathD = roc
    .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(p.fpr)} ${getY(p.tpr)}`)
    .join(" ");

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-mono font-semibold text-slate-300 uppercase flex justify-between">
        <span>ROC Curve & Operating Point</span>
        <span className="text-cyan-400">AUC ~ 0.942</span>
      </div>

      <div className="bg-[#0B0F17] rounded-lg border border-slate-800 p-2 flex justify-center">
        <svg width={width} height={height} className="overflow-visible">
          {/* Grid lines */}
          <line x1={pad} y1={getY(0.5)} x2={width - pad} y2={getY(0.5)} stroke="#1E293B" strokeDasharray="3 3" />
          <line x1={getX(0.5)} y1={pad} x2={getX(0.5)} y2={height - pad} stroke="#1E293B" strokeDasharray="3 3" />

          {/* Random diagonal */}
          <line x1={pad} y1={height - pad} x2={width - pad} y2={pad} stroke="#334155" strokeDasharray="4 4" />

          {/* ROC Path */}
          <path d={pathD} fill="none" stroke="#00D2FF" strokeWidth="2.5" />

          {/* Operating Point */}
          <circle cx={getX(currentFpr)} cy={getY(currentTpr)} r="6" fill="#FF3366" stroke="#FFFFFF" strokeWidth="2" />

          {/* Axis Labels */}
          <text x={width / 2} y={height - 8} textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="monospace">
            False Positive Rate (FPR)
          </text>
          <text x={12} y={height / 2} textAnchor="middle" transform={`rotate(-90 12 ${height / 2})`} fill="#64748B" fontSize="10" fontFamily="monospace">
            True Positive Rate (TPR)
          </text>
        </svg>
      </div>
    </div>
  );
}
""")

write("components/bayes-studio/BayesStudioRoot.tsx", """
import React from "react";
import { BayesStudioProvider } from "../../context/BayesStudioContext";
import { BayesThresholdSlider } from "./BayesThresholdSlider";
import { BayesCostMatrixControl } from "./BayesCostMatrixControl";
import { BayesConfusionMatrix } from "./BayesConfusionMatrix";
import { BayesRiskMeter } from "./BayesRiskMeter";
import { BayesRocCurve } from "./BayesRocCurve";
import { Card } from "../ui/Card";

export function BayesStudioRoot() {
  return (
    <BayesStudioProvider>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Decision & Cost Controls */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Card variant="panel">
            <BayesThresholdSlider />
          </Card>
          <Card variant="panel">
            <BayesCostMatrixControl />
          </Card>
        </div>

        {/* Right Column: Risk & Matrix Metrics */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <BayesRiskMeter />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="panel">
              <BayesConfusionMatrix />
            </Card>
            <Card variant="panel">
              <BayesRocCurve />
            </Card>
          </div>
        </div>
      </div>
    </BayesStudioProvider>
  );
}
""")

write("components/bayes-studio/index.ts", """
export { BayesStudioRoot as BayesStudio } from "./BayesStudioRoot";
export { BayesThresholdSlider } from "./BayesThresholdSlider";
export { BayesCostMatrixControl } from "./BayesCostMatrixControl";
export { BayesConfusionMatrix } from "./BayesConfusionMatrix";
export { BayesRiskMeter } from "./BayesRiskMeter";
export { BayesRocCurve } from "./BayesRocCurve";
""")

# ==================== Module 3: Batch Explorer Compound Components ====================

write("components/batch-explorer/BatchSummaryMetrics.tsx", """
import React from "react";
import { useBatchExplorer } from "../../context/BatchExplorerContext";
import { ShieldCheck, ShieldAlert, AlertTriangle, Layers } from "lucide-react";

export function BatchSummaryMetrics() {
  const { meta } = useBatchExplorer();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="rounded-lg border border-[#1E293B] bg-[#101726]/80 p-3 font-mono">
        <div className="flex items-center justify-between text-slate-400 text-xs">
          <span>Total Flows</span>
          <Layers className="h-4 w-4 text-cyan-400" />
        </div>
        <div className="text-xl font-bold text-white mt-1">{meta.totalFlows}</div>
      </div>

      <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-3 font-mono">
        <div className="flex items-center justify-between text-emerald-400 text-xs">
          <span>Benign Traffic</span>
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="text-xl font-bold text-emerald-300 mt-1">{meta.benignCount}</div>
      </div>

      <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 p-3 font-mono">
        <div className="flex items-center justify-between text-rose-400 text-xs">
          <span>Attacks Flagged</span>
          <ShieldAlert className="h-4 w-4 text-rose-400" />
        </div>
        <div className="text-xl font-bold text-rose-300 mt-1">{meta.attackCount}</div>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-950/30 p-3 font-mono">
        <div className="flex items-center justify-between text-amber-400 text-xs">
          <span>High Severity (&gt;80%)</span>
          <AlertTriangle className="h-4 w-4 text-amber-400" />
        </div>
        <div className="text-xl font-bold text-amber-300 mt-1">{meta.highThreatCount}</div>
      </div>
    </div>
  );
}
""")

write("components/batch-explorer/BatchFilterBar.tsx", """
import React from "react";
import { useBatchExplorer } from "../../context/BatchExplorerContext";
import { Search, Filter, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

export function BatchFilterBar() {
  const { state, actions } = useBatchExplorer();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0B0F17] rounded-lg border border-[#1E293B] p-3 text-xs font-mono">
      {/* Search bar */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Filter by IP, Port, Attack Type..."
          value={state.searchQuery}
          onChange={(e) => actions.setSearchQuery(e.target.value)}
          className="w-full bg-[#151D2F] border border-slate-800 rounded pl-8 pr-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Protocol filter */}
      <div className="flex items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-slate-500" />
        <select
          value={state.selectedProtocolFilter}
          onChange={(e) => actions.setProtocolFilter(e.target.value)}
          className="bg-[#151D2F] border border-slate-800 rounded px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Protocols</option>
          <option value="6">TCP (6)</option>
          <option value="17">UDP (17)</option>
          <option value="1">ICMP (1)</option>
        </select>
      </div>

      {/* Attack Category Filter */}
      <select
        value={state.selectedAttackFilter}
        onChange={(e) => actions.setAttackFilter(e.target.value)}
        className="bg-[#151D2F] border border-slate-800 rounded px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-cyan-500"
      >
        <option value="all">All Attack Types</option>
        <option value="Benign">Benign</option>
        <option value="DoS">DoS</option>
        <option value="Exploits">Exploits</option>
        <option value="Reconnaissance">Reconnaissance</option>
        <option value="Generic">Generic</option>
        <option value="Fuzzers">Fuzzers</option>
        <option value="Backdoor">Backdoor</option>
        <option value="Shellcode">Shellcode</option>
        <option value="Analysis">Analysis</option>
        <option value="Worms">Worms</option>
      </select>

      <Button variant="ghost" size="sm" onClick={actions.resetFilters}>
        <RotateCcw className="h-3 w-3" />
        Reset
      </Button>
    </div>
  );
}
""")

write("components/batch-explorer/BatchVirtualTable.tsx", """
import React from "react";
import { useBatchExplorer } from "../../context/BatchExplorerContext";
import { getAttackColor, formatBytes, formatDuration } from "../../lib/utils";
import { Badge } from "../ui/Badge";

export function BatchVirtualTable() {
  const { state, actions } = useBatchExplorer();

  return (
    <div className="overflow-x-auto rounded-lg border border-[#1E293B]">
      <table className="w-full text-left text-xs font-mono">
        <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] border-b border-slate-800">
          <tr>
            <th className="p-3">Source IP : Port</th>
            <th className="p-3">Dest IP : Port</th>
            <th className="p-3">Proto</th>
            <th className="p-3">Duration</th>
            <th className="p-3">Volume</th>
            <th className="p-3">Ground Truth</th>
            <th className="p-3">Predicted Class</th>
            <th className="p-3 text-right">Anomaly Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 bg-[#101726]/60">
          {state.flows.slice(0, 50).map((f, idx) => {
            const style = getAttackColor(f.predictedClass);
            const isMatch = f.Attack === f.predictedClass;

            return (
              <tr
                key={idx}
                onClick={() => actions.setSelectedFlowId(idx)}
                className="hover:bg-slate-800/40 cursor-pointer transition-colors"
              >
                <td className="p-3 text-slate-300 font-semibold truncate max-w-[140px]">
                  {f.IPV4_SRC_ADDR}:{f.L4_SRC_PORT}
                </td>
                <td className="p-3 text-slate-400 truncate max-w-[140px]">
                  {f.IPV4_DST_ADDR}:{f.L4_DST_PORT}
                </td>
                <td className="p-3 text-slate-400">{f.PROTOCOL === 6 ? "TCP" : f.PROTOCOL === 17 ? "UDP" : f.PROTOCOL}</td>
                <td className="p-3 text-slate-400">{formatDuration(f.FLOW_DURATION_MILLISECONDS)}</td>
                <td className="p-3 text-slate-400">{formatBytes(f.IN_BYTES + f.OUT_BYTES)}</td>
                <td className="p-3">
                  <span className="text-slate-300 font-medium">{f.Attack || "Unknown"}</span>
                </td>
                <td className="p-3">
                  <Badge variant={f.isAttackPredicted ? "threat" : "emerald"} size="sm">
                    {f.predictedClass}
                  </Badge>
                </td>
                <td className="p-3 text-right font-bold">
                  <span className={f.anomalyScore > 0.5 ? "text-rose-400" : "text-emerald-400"}>
                    {(f.anomalyScore * 100).toFixed(0)}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
""")

write("components/batch-explorer/BatchExplorerRoot.tsx", """
import React from "react";
import { BatchExplorerProvider } from "../../context/BatchExplorerContext";
import { BatchSummaryMetrics } from "./BatchSummaryMetrics";
import { BatchFilterBar } from "./BatchFilterBar";
import { BatchVirtualTable } from "./BatchVirtualTable";
import { Card } from "../ui/Card";

export function BatchExplorerRoot() {
  return (
    <BatchExplorerProvider>
      <div className="space-y-6">
        <BatchSummaryMetrics />
        <Card variant="panel" className="p-4 sm:p-5 space-y-4">
          <BatchFilterBar />
          <BatchVirtualTable />
        </Card>
      </div>
    </BatchExplorerProvider>
  );
}
""")

write("components/batch-explorer/index.ts", """
export { BatchExplorerRoot as BatchExplorer } from "./BatchExplorerRoot";
export { BatchSummaryMetrics } from "./BatchSummaryMetrics";
export { BatchFilterBar } from "./BatchFilterBar";
export { BatchVirtualTable } from "./BatchVirtualTable";
""")

# ==================== Module 4: Latent Space Compound Components ====================

write("components/latent-space/LatentScatterPlot.tsx", """
import React, { useState } from "react";
import { LATENT_SPACE_DATA } from "../../data/latentSpaceData";
import { LatentPoint } from "../../types/flow";
import { getAttackColor, formatBytes, formatDuration } from "../../lib/utils";
import { Card } from "../ui/Card";

export function LatentScatterPlot() {
  const [selectedPoint, setSelectedPoint] = useState<LatentPoint | null>(null);
  const [filterClass, setFilterClass] = useState<string>("all");

  const width = 600;
  const height = 360;
  const pad = 40;

  const points = LATENT_SPACE_DATA.filter((p) => filterClass === "all" || p.attack === filterClass);

  const minX = Math.min(...LATENT_SPACE_DATA.map((p) => p.pca_x));
  const maxX = Math.max(...LATENT_SPACE_DATA.map((p) => p.pca_x));
  const minY = Math.min(...LATENT_SPACE_DATA.map((p) => p.pca_y));
  const maxY = Math.max(...LATENT_SPACE_DATA.map((p) => p.pca_y));

  const getX = (x: number) => pad + ((x - minX) / (maxX - minX || 1)) * (width - pad * 2);
  const getY = (y: number) => height - pad - ((y - minY) / (maxY - minY || 1)) * (height - pad * 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 2D Scatter Canvas */}
      <div className="lg:col-span-8 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-mono font-semibold text-slate-300 uppercase">
            UNSW-NB15 Latent Embedding Space (PCA 2D Projection)
          </div>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="bg-[#151D2F] border border-slate-800 rounded px-2.5 py-1 text-xs font-mono text-slate-300"
          >
            <option value="all">Display All Classes ({LATENT_SPACE_DATA.length} points)</option>
            <option value="Benign">Benign Cluster</option>
            <option value="DoS">DoS Cluster</option>
            <option value="Exploits">Exploits Cluster</option>
            <option value="Reconnaissance">Reconnaissance Cluster</option>
          </select>
        </div>

        <div className="bg-[#0B0F17] rounded-lg border border-[#1E293B] p-2 flex justify-center overflow-hidden radar-grid">
          <svg width={width} height={height} className="cursor-crosshair">
            {/* Axis grid */}
            <line x1={pad} y1={height / 2} x2={width - pad} y2={height / 2} stroke="#1F2E47" strokeDasharray="3 3" />
            <line x1={width / 2} y1={pad} x2={width / 2} y2={height - pad} stroke="#1F2E47" strokeDasharray="3 3" />

            {/* Points */}
            {points.map((pt) => {
              const style = getAttackColor(pt.attack);
              const isSelected = selectedPoint?.id === pt.id;

              return (
                <circle
                  key={pt.id}
                  cx={getX(pt.pca_x)}
                  cy={getY(pt.pca_y)}
                  r={isSelected ? 7 : 3.5}
                  className={`transition-all duration-150 ${
                    isSelected ? "stroke-white stroke-2" : "opacity-80 hover:opacity-100"
                  }`}
                  fill={
                    pt.attack === "Benign"
                      ? "#00E599"
                      : pt.attack === "DoS"
                      ? "#FF3366"
                      : pt.attack === "Exploits"
                      ? "#F43F5E"
                      : pt.attack === "Reconnaissance"
                      ? "#FFB800"
                      : "#00D2FF"
                  }
                  onClick={() => setSelectedPoint(pt as any)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right: Point Inspection Drawer */}
      <div className="lg:col-span-4">
        <Card variant="panel" className="h-full flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-semibold text-slate-300 uppercase border-b border-slate-800 pb-2 mb-3">
              Flow Embedding Inspector
            </div>

            {selectedPoint ? (
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Ground Truth Class</div>
                  <div className="text-lg font-bold text-cyan-400">{selectedPoint.attack}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#0B0F17] p-2.5 rounded border border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-500">PCA Component 1</div>
                    <div className="text-slate-200 font-semibold">{selectedPoint.pca_x}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">PCA Component 2</div>
                    <div className="text-slate-200 font-semibold">{selectedPoint.pca_y}</div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Source:</span>
                    <span className="text-slate-200">{selectedPoint.src_ip}:{selectedPoint.src_port}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Destination:</span>
                    <span className="text-slate-200">{selectedPoint.dst_ip}:{selectedPoint.dst_port}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payload:</span>
                    <span className="text-slate-200">{formatBytes(selectedPoint.in_bytes + selectedPoint.out_bytes)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Duration:</span>
                    <span className="text-slate-200">{formatDuration(selectedPoint.duration)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs font-mono">
                Click any node on the 2D projection scatter plot to inspect its raw NetFlow telemetry attributes.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
""")

write("components/latent-space/LatentSpaceRoot.tsx", """
import React from "react";
import { LatentScatterPlot } from "./LatentScatterPlot";
import { Card } from "../ui/Card";

export function LatentSpaceRoot() {
  return (
    <div className="space-y-6">
      <Card variant="panel" className="p-4 sm:p-5">
        <LatentScatterPlot />
      </Card>
    </div>
  );
}
""")

write("components/latent-space/index.ts", """
export { LatentSpaceRoot as LatentSpace } from "./LatentSpaceRoot";
export { LatentScatterPlot } from "./LatentScatterPlot";
""")

# ==================== Top-level App.tsx and main.tsx ====================

write("App.tsx", """
import React, { useState } from "react";
import { Header } from "./components/layout/Header";
import { StatusBar } from "./components/layout/StatusBar";
import { FlowInspector } from "./components/flow-inspector";
import { BayesStudio } from "./components/bayes-studio";
import { BatchExplorer } from "./components/batch-explorer";
import { LatentSpace } from "./components/latent-space";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("sandbox");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B0F17]">
      <div>
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === "sandbox" && <FlowInspector />}
          {activeTab === "bayes" && <BayesStudio />}
          {activeTab === "batch" && <BatchExplorer />}
          {activeTab === "latent" && <LatentSpace />}
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
""")

write("main.tsx", """
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
""")

print("All compound modules and App generated successfully!")
