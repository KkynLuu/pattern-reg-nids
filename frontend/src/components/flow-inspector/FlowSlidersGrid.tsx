import React, { useState } from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { Slider } from "../ui/Slider";
import { formatBytes, formatBps, formatDuration } from "../../lib/utils";
import { Sliders, Layers, Activity, Cpu, Info } from "lucide-react";

export function FlowSlidersGrid() {
  const { state, actions } = useFlowInspector();
  const flow = state.currentFlow;
  const [activeGroup, setActiveGroup] = useState<"volume" | "throughput" | "protocol">("volume");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-2 gap-2">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-800 uppercase tracking-wider">
          <Sliders className="h-3.5 w-3.5 text-sky-600" />
          Feature Perturbation & What-If Analysis
        </div>

        {/* Group Selector Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveGroup("volume")}
            className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
              activeGroup === "volume" ? "bg-white font-bold text-sky-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="h-3 w-3" /> Volume ({5})
          </button>
          <button
            type="button"
            onClick={() => setActiveGroup("throughput")}
            className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
              activeGroup === "throughput" ? "bg-white font-bold text-sky-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Activity className="h-3 w-3" /> Throughput ({3})
          </button>
          <button
            type="button"
            onClick={() => setActiveGroup("protocol")}
            className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
              activeGroup === "protocol" ? "bg-white font-bold text-sky-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Cpu className="h-3 w-3" /> Protocol & TTL ({4})
          </button>
        </div>
      </div>

      {/* Feature Scientific Context Tip */}
      <div className="text-[11px] font-mono bg-sky-50 text-sky-800 px-3 py-1.5 rounded border border-sky-200 flex items-center justify-between">
        <span>
          <Info className="h-3.5 w-3.5 text-sky-600 inline mr-1" /><strong>Feature Sensitivity:</strong>{" "}
          {activeGroup === "protocol"
            ? "MIN_TTL is the #1 feature in Decision Tree (99.7% Gini split). MAX_TTL is #1 in Random Forest (23.1%)."
            : activeGroup === "throughput"
            ? "DST_TO_SRC_THROUGHPUT accounts for 8.5% importance in separating DoS bursts from interactive traffic."
            : "Ultra-short flow duration (<5ms) with high packets strongly pushes Bayesian risk toward DoS & Generic attacks."}
        </span>
      </div>

      {/* Group 1: Volume */}
      {activeGroup === "volume" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Slider
            label="Flow Duration (FLOW_DURATION_MILLISECONDS)"
            min={0}
            max={5000}
            step={10}
            value={flow.FLOW_DURATION_MILLISECONDS}
            displayFormatter={(v) => formatDuration(v)}
            onChange={(v) => actions.updateFeature("FLOW_DURATION_MILLISECONDS", v)}
            accentColor={flow.FLOW_DURATION_MILLISECONDS < 10 ? "threat" : "cyan"}
          />

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

          <Slider
            label="Outgoing Reply Packets (OUT_PKTS)"
            min={0}
            max={200}
            step={1}
            unit="pkts"
            value={flow.OUT_PKTS}
            onChange={(v) => actions.updateFeature("OUT_PKTS", v)}
            accentColor={flow.OUT_PKTS === 0 ? "amber" : "cyan"}
          />
        </div>
      )}

      {/* Group 2: Throughput & Timing */}
      {activeGroup === "throughput" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Slider
            label="Src to Dst Throughput (SRC_TO_DST_AVG_THROUGHPUT)"
            min={0}
            max={10_000_000}
            step={50_000}
            value={flow.SRC_TO_DST_AVG_THROUGHPUT}
            displayFormatter={(v) => formatBps(v)}
            onChange={(v) => actions.updateFeature("SRC_TO_DST_AVG_THROUGHPUT", v)}
            accentColor={flow.SRC_TO_DST_AVG_THROUGHPUT > 2_000_000 ? "threat" : "cyan"}
          />

          <Slider
            label="Retransmitted Payload (RETRANSMITTED_IN_BYTES)"
            min={0}
            max={10_000}
            step={50}
            displayFormatter={(v) => formatBytes(v)}
            value={flow.RETRANSMITTED_IN_BYTES}
            onChange={(v) => actions.updateFeature("RETRANSMITTED_IN_BYTES", v)}
            accentColor={flow.RETRANSMITTED_IN_BYTES > 1000 ? "threat" : "cyan"}
          />

          <Slider
            label="Src->Dst Inter-Arrival Time (IAT Avg)"
            min={0}
            max={500}
            step={5}
            unit="ms"
            value={flow.SRC_TO_DST_IAT_AVG}
            onChange={(v) => actions.updateFeature("SRC_TO_DST_IAT_AVG", v)}
            accentColor="cyan"
          />
        </div>
      )}

      {/* Group 3: Protocol & TTL */}
      {activeGroup === "protocol" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Slider
            label="Min Time-To-Live (MIN_TTL - Top Tree Split)"
            min={1}
            max={255}
            step={1}
            value={flow.MIN_TTL}
            onChange={(v) => actions.updateFeature("MIN_TTL", v)}
            accentColor={flow.MIN_TTL < 15 ? "threat" : "cyan"}
          />

          <Slider
            label="Max Time-To-Live (MAX_TTL - Top Forest Feature)"
            min={1}
            max={255}
            step={1}
            value={flow.MAX_TTL}
            onChange={(v) => actions.updateFeature("MAX_TTL", v)}
            accentColor="cyan"
          />

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

          <Slider
            label="TCP Flags (2=SYN, 16=ACK, 24=PSH-ACK, 27=SYN-ACK-FIN)"
            min={0}
            max={63}
            step={1}
            value={flow.TCP_FLAGS}
            onChange={(v) => actions.updateFeature("TCP_FLAGS", v)}
            accentColor={flow.TCP_FLAGS === 2 ? "threat" : "cyan"}
          />
        </div>
      )}
    </div>
  );
}
