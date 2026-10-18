
import os

src = "/Users/kkyn/Documents/Work/PatternReg/final/frontend/src"

def write(path, content):
    full = os.path.join(src, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Compliant update: {path}")

# ==================== 1. lib/utils.ts (Non-breaking spaces & tabular typography) ====================
write("lib/utils.ts", """
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0\u00A0B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}\u00A0${sizes[i] || "TB"}`;
}

export function formatBps(bps: number): string {
  if (bps === 0) return "0\u00A0bps";
  if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(1)}\u00A0Mbps`;
  if (bps >= 1_000) return `${(bps / 1_000).toFixed(1)}\u00A0Kbps`;
  return `${bps}\u00A0bps`;
}

export function formatDuration(ms: number): string {
  if (ms < 1) return "<1\u00A0ms";
  if (ms < 1000) return `${ms}\u00A0ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}\u00A0s`;
  return `${(ms / 60000).toFixed(1)}\u00A0min`;
}

export function getProtocolName(proto: number): string {
  switch (proto) {
    case 6: return "TCP (6)";
    case 17: return "UDP (17)";
    case 1: return "ICMP (1)";
    case 47: return "GRE (47)";
    case 50: return "ESP (50)";
    default: return `Proto ${proto}`;
  }
}

export function getAttackColor(attack: string): { bg: string; text: string; border: string; glow: string; dot: string } {
  switch (attack) {
    case "Benign":
      return { bg: "bg-emerald-950/40", text: "text-emerald-400", border: "border-emerald-500/40", glow: "shadow-glow-emerald", dot: "bg-emerald-400" };
    case "DoS":
      return { bg: "bg-rose-950/60", text: "text-rose-400", border: "border-rose-500/60", glow: "shadow-glow-crimson", dot: "bg-rose-500" };
    case "Exploits":
    case "Shellcode":
      return { bg: "bg-red-950/60", text: "text-red-400", border: "border-red-500/60", glow: "shadow-glow-crimson", dot: "bg-red-500" };
    case "Reconnaissance":
    case "Fuzzers":
      return { bg: "bg-amber-950/50", text: "text-amber-400", border: "border-amber-500/50", glow: "shadow-amber-500/20", dot: "bg-amber-400" };
    case "Backdoor":
    case "Worms":
      return { bg: "bg-purple-950/50", text: "text-purple-400", border: "border-purple-500/50", glow: "shadow-purple-500/20", dot: "bg-purple-400" };
    default:
      return { bg: "bg-cyan-950/50", text: "text-cyan-400", border: "border-cyan-500/50", glow: "shadow-glow-cyan", dot: "bg-cyan-400" };
  }
}
""")

# ==================== 2. src/components/ui/Button.tsx ====================
write("components/ui/Button.tsx", """
import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "telemetry";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className,
  variant = "secondary",
  size = "md",
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold hover:from-cyan-400 hover:to-blue-500 shadow-glow-cyan/50",
    secondary: "bg-canvas-card text-slate-200 border border-slate-700 hover:bg-slate-800 hover:border-slate-600",
    danger: "bg-gradient-to-r from-rose-600 to-red-700 text-white font-semibold hover:from-rose-500 hover:to-red-600 shadow-glow-crimson/50",
    ghost: "bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent",
    telemetry: "bg-cyan-950/40 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-900/40 hover:border-cyan-400 font-mono text-xs",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-xs rounded",
    md: "px-3.5 py-2 text-sm rounded-md",
    lg: "px-5 py-2.5 text-base rounded-md font-medium",
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0B0F17]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
""")

# ==================== 3. src/components/ui/Slider.tsx ====================
write("components/ui/Slider.tsx", """
import React, { useId } from "react";
import { cn } from "../../lib/utils";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  displayFormatter?: (v: number) => string;
  onChange: (value: number) => void;
  className?: string;
  accentColor?: "cyan" | "threat" | "amber" | "emerald";
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  displayFormatter,
  onChange,
  className,
  accentColor = "cyan",
}: SliderProps) {
  const sliderId = useId();
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min || 1)) * 100));

  const accentStyles = {
    cyan: "accent-cyan-400 text-cyan-400",
    threat: "accent-rose-500 text-rose-400",
    amber: "accent-amber-400 text-amber-400",
    emerald: "accent-emerald-400 text-emerald-400",
  };

  const formattedValue = displayFormatter ? displayFormatter(value) : `${value}${unit ? `\u00A0${unit}` : ""}`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <label htmlFor={sliderId} className="text-slate-400 font-medium tracking-wide cursor-pointer select-none">
          {label}
        </label>
        <span className={cn("font-mono font-semibold tabular-nums", accentStyles[accentColor])}>
          {formattedValue}
        </span>
      </div>
      <div className="relative flex items-center">
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={formattedValue}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={cn(
            "w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0B0F17] transition-colors",
            accentStyles[accentColor]
          )}
          style={{
            background: `linear-gradient(to right, ${
              accentColor === "threat"
                ? "#FF3366"
                : accentColor === "emerald"
                ? "#00E599"
                : accentColor === "amber"
                ? "#FFB800"
                : "#00D2FF"
            } 0%, ${
              accentColor === "threat"
                ? "#FF3366"
                : accentColor === "emerald"
                ? "#00E599"
                : accentColor === "amber"
                ? "#FFB800"
                : "#00D2FF"
            } ${percentage}%, #1E293B ${percentage}%, #1E293B 100%)`,
          }}
        />
      </div>
    </div>
  );
}
""")

# ==================== 4. src/components/layout/Header.tsx ====================
write("components/layout/Header.tsx", """
import React from "react";
import { Shield, Activity, Terminal, Database, Loader2 } from "lucide-react";
import { Badge } from "../ui/Badge";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isNavigating?: boolean;
}

const NAV_TABS = [
  { id: "sandbox", label: "Live Flow Sandbox", icon: Activity, badge: "Interactive" },
  { id: "bayes", label: "Bayes Decision Studio", icon: Shield, badge: "Risk Math" },
  { id: "batch", label: "Batch Traffic Explorer", icon: Database, badge: "NetFlow v3" },
  { id: "latent", label: "Latent Space & Clusters", icon: Terminal, badge: "PCA 2D/3D" },
] as const;

export function Header({ activeTab, onTabChange, isNavigating }: HeaderProps) {
  return (
    <header
      className="border-b border-[#1F2E47] bg-[#0B0F17]/95 backdrop-blur sticky top-0 z-50"
      style={{ viewTransitionName: "persistent-header" }}
    >
      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:font-semibold focus:rounded focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan"
              aria-hidden="true"
            >
              <Shield className="h-5 w-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white font-mono text-base">
                  FlowLens<span className="text-cyan-400">.IDS</span>
                </span>
                <Badge variant="cyan" size="sm">UNSW-NB15</Badge>
                {isNavigating ? (
                  <Loader2 className="h-3.5 w-3.5 text-cyan-400 animate-spin" aria-label="Loading view…" />
                ) : null}
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block text-pretty">
                Pattern Recognition & Telemetry Workbench
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav aria-label="Primary Navigation" className="flex items-center gap-1 sm:gap-2">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0B0F17] ${
                    isActive
                      ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/50 shadow-glow-cyan/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} aria-hidden="true" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
""")

# ==================== 5. src/App.tsx (Include id="main-content") ====================
write("App.tsx", """
import React, { useState, useTransition, useCallback } from "react";
import { Header } from "./components/layout/Header";
import { StatusBar } from "./components/layout/StatusBar";
import { FlowInspector } from "./components/flow-inspector";
import { BayesStudio } from "./components/bayes-studio";
import { BatchExplorer } from "./components/batch-explorer";
import { LatentSpace } from "./components/latent-space";
import { transitionView } from "./lib/viewTransitions";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("sandbox");
  const [isPending, startNavTransition] = useTransition();

  const handleTabChange = useCallback((newTab: string) => {
    if (newTab === activeTab) return;
    transitionView(() => {
      startNavTransition(() => {
        setActiveTab(newTab);
      });
    });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B0F17]">
      <div>
        <Header activeTab={activeTab} onTabChange={handleTabChange} isNavigating={isPending} />
        
        {/* Main Tab Container with View Transition Identifier & Anchor ID */}
        <main
          id="main-content"
          tabIndex={-1}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 focus:outline-none scroll-mt-20"
          style={{ viewTransitionName: "page-content" }}
        >
          {activeTab === "sandbox" ? (
            <FlowInspector />
          ) : activeTab === "bayes" ? (
            <BayesStudio />
          ) : activeTab === "batch" ? (
            <BatchExplorer />
          ) : activeTab === "latent" ? (
            <LatentSpace />
          ) : null}
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
""")

# ==================== 6. src/components/batch-explorer/BatchFilterBar.tsx ====================
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
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
        <input
          type="text"
          name="flowSearch"
          aria-label="Filter network flows by IP, Port, or Attack category"
          placeholder="Filter by IP, Port, Attack Type…"
          autoComplete="off"
          spellCheck={false}
          value={state.searchQuery}
          onChange={(e) => actions.setSearchQuery(e.target.value)}
          className="w-full bg-[#151D2F] border border-slate-800 rounded pl-8 pr-3 py-1.5 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors placeholder:text-slate-500"
        />
      </div>

      {/* Protocol filter */}
      <div className="flex items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
        <label htmlFor="proto-filter" className="sr-only">Filter by Protocol</label>
        <select
          id="proto-filter"
          aria-label="Filter by protocol"
          value={state.selectedProtocolFilter}
          onChange={(e) => actions.setProtocolFilter(e.target.value)}
          className="bg-[#151D2F] border border-slate-800 rounded px-2.5 py-1.5 text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
        >
          <option value="all">All Protocols</option>
          <option value="6">TCP (6)</option>
          <option value="17">UDP (17)</option>
          <option value="1">ICMP (1)</option>
        </select>
      </div>

      {/* Attack Category Filter */}
      <div className="flex items-center">
        <label htmlFor="attack-filter" className="sr-only">Filter by Attack Type</label>
        <select
          id="attack-filter"
          aria-label="Filter by attack type"
          value={state.selectedAttackFilter}
          onChange={(e) => actions.setAttackFilter(e.target.value)}
          className="bg-[#151D2F] border border-slate-800 rounded px-2.5 py-1.5 text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
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
      </div>

      <Button variant="ghost" size="sm" onClick={actions.resetFilters} aria-label="Reset all search filters">
        <RotateCcw className="h-3 w-3" aria-hidden="true" />
        Reset
      </Button>
    </div>
  );
}
""")

# ==================== 7. src/components/batch-explorer/BatchVirtualTable.tsx ====================
write("components/batch-explorer/BatchVirtualTable.tsx", """
import React from "react";
import { useBatchExplorer } from "../../context/BatchExplorerContext";
import { formatBytes, formatDuration } from "../../lib/utils";
import { Badge } from "../ui/Badge";

export function BatchVirtualTable() {
  const { state, actions } = useBatchExplorer();

  return (
    <div className="overflow-x-auto rounded-lg border border-[#1E293B]">
      <table className="w-full text-left text-xs font-mono" aria-label="Network Flow Telemetry Records">
        <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] border-b border-slate-800">
          <tr>
            <th scope="col" className="p-3">Source IP : Port</th>
            <th scope="col" className="p-3">Dest IP : Port</th>
            <th scope="col" className="p-3">Proto</th>
            <th scope="col" className="p-3">Duration</th>
            <th scope="col" className="p-3">Volume</th>
            <th scope="col" className="p-3">Ground Truth</th>
            <th scope="col" className="p-3">Predicted Class</th>
            <th scope="col" className="p-3 text-right">Anomaly Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 bg-[#101726]/60">
          {state.flows.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-8 text-center text-slate-500">
                No network flows match your active filter criteria.
              </td>
            </tr>
          ) : (
            state.flows.slice(0, 50).map((f, idx) => {
              const isSelected = state.selectedFlowId === idx;
              return (
                <tr
                  key={idx}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`Select flow from ${f.IPV4_SRC_ADDR} port ${f.L4_SRC_PORT}`}
                  onClick={() => actions.setSelectedFlowId(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      actions.setSelectedFlowId(idx);
                    }
                  }}
                  className={`hover:bg-slate-800/40 cursor-pointer transition-colors focus-visible:outline-none focus-visible:bg-slate-800/60 focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                    isSelected ? "bg-cyan-950/40" : ""
                  }`}
                >
                  <td className="p-3 text-slate-300 font-semibold truncate max-w-[140px] tabular-nums">
                    {f.IPV4_SRC_ADDR}:{f.L4_SRC_PORT}
                  </td>
                  <td className="p-3 text-slate-400 truncate max-w-[140px] tabular-nums">
                    {f.IPV4_DST_ADDR}:{f.L4_DST_PORT}
                  </td>
                  <td className="p-3 text-slate-400">{f.PROTOCOL === 6 ? "TCP" : f.PROTOCOL === 17 ? "UDP" : f.PROTOCOL}</td>
                  <td className="p-3 text-slate-400 tabular-nums">{formatDuration(f.FLOW_DURATION_MILLISECONDS)}</td>
                  <td className="p-3 text-slate-400 tabular-nums">{formatBytes(f.IN_BYTES + f.OUT_BYTES)}</td>
                  <td className="p-3">
                    <span className="text-slate-300 font-medium">{f.Attack || "Unknown"}</span>
                  </td>
                  <td className="p-3">
                    <Badge variant={f.isAttackPredicted ? "threat" : "emerald"} size="sm">
                      {f.predictedClass}
                    </Badge>
                  </td>
                  <td className="p-3 text-right font-bold tabular-nums">
                    <span className={f.anomalyScore > 0.5 ? "text-rose-400" : "text-emerald-400"}>
                      {(f.anomalyScore * 100).toFixed(0)}%
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
""")

# ==================== 8. src/components/flow-inspector/FlowVerdictCard.tsx ====================
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
    <div
      aria-live="polite"
      className={`rounded-lg border p-5 transition-colors duration-200 ${style.bg} ${style.border} ${style.glow}`}
    >
      {/* Verdict Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`h-11 w-11 rounded-lg flex items-center justify-center border ${style.border} bg-slate-950/70`}
            aria-hidden="true"
          >
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
            <h3 className={`text-xl font-bold font-mono tracking-tight text-balance ${style.text}`}>
              {res.predictedClass.toUpperCase()}
            </h3>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-mono text-slate-500 uppercase">Confidence</div>
          <div className="text-lg font-bold font-mono text-white tabular-nums">
            {(res.confidence * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Threat Meter */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-400">Threat Anomaly Probability</span>
          <span className={`tabular-nums ${res.anomalyScore > 0.5 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}`}>
            {(res.anomalyScore * 100).toFixed(1)}%
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Threat anomaly score"
          aria-valuenow={Math.round(res.anomalyScore * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800"
        >
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
          <Zap className="h-3 w-3 text-cyan-400" aria-hidden="true" />
          <span>Top Class Probabilities:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {topThreeProbabilities.map(([name, prob]) => {
            const pct = (prob * 100).toFixed(1);
            return (
              <div key={name} className="flex items-center justify-between bg-slate-950/60 rounded px-2 py-1 text-xs font-mono">
                <span className="text-slate-400 truncate">{name}:</span>
                <span className="font-semibold text-slate-200 ml-1 tabular-nums">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
""")

# ==================== 9. src/components/latent-space/LatentScatterPlot.tsx ====================
write("components/latent-space/LatentScatterPlot.tsx", """
import React, { useState, useMemo, useCallback } from "react";
import { LATENT_SPACE_DATA } from "../../data/latentSpaceData";
import { LatentPoint } from "../../types/flow";
import { formatBytes, formatDuration } from "../../lib/utils";
import { Card } from "../ui/Card";

const WIDTH = 600;
const HEIGHT = 360;
const PAD = 40;

let MIN_X = Infinity, MAX_X = -Infinity;
let MIN_Y = Infinity, MAX_Y = -Infinity;

for (let i = 0; i < LATENT_SPACE_DATA.length; i++) {
  const p = LATENT_SPACE_DATA[i];
  if (p.pca_x < MIN_X) MIN_X = p.pca_x;
  if (p.pca_x > MAX_X) MAX_X = p.pca_x;
  if (p.pca_y < MIN_Y) MIN_Y = p.pca_y;
  if (p.pca_y > MAX_Y) MAX_Y = p.pca_y;
}

function getX(x: number): number {
  return PAD + ((x - MIN_X) / (MAX_X - MIN_X || 1)) * (WIDTH - PAD * 2);
}

function getY(y: number): number {
  return HEIGHT - PAD - ((y - MIN_Y) / (MAX_Y - MIN_Y || 1)) * (HEIGHT - PAD * 2);
}

const CLASS_COLORS: Record<string, string> = {
  Benign: "#00E599",
  DoS: "#FF3366",
  Exploits: "#F43F5E",
  Reconnaissance: "#FFB800",
  Generic: "#00D2FF",
  Fuzzers: "#F59E0B",
  Backdoor: "#A855F7",
  Shellcode: "#EC4899",
  Analysis: "#38BDF8",
  Worms: "#8B5CF6",
};

export function LatentScatterPlot() {
  const [selectedPoint, setSelectedPoint] = useState<LatentPoint | null>(null);
  const [filterClass, setFilterClass] = useState<string>("all");

  const handlePointClick = useCallback((pt: LatentPoint) => {
    setSelectedPoint(pt);
  }, []);

  const points = useMemo(() => {
    if (filterClass === "all") return LATENT_SPACE_DATA;
    return LATENT_SPACE_DATA.filter((p) => p.attack === filterClass);
  }, [filterClass]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 2D Scatter Canvas */}
      <div className="lg:col-span-8 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-mono font-semibold text-slate-300 uppercase">
            UNSW-NB15 Latent Embedding Space (PCA 2D Projection)
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="latent-filter" className="sr-only">Filter latent space points by attack class</label>
            <select
              id="latent-filter"
              aria-label="Filter latent space points by attack class"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="bg-[#151D2F] border border-slate-800 rounded px-2.5 py-1 text-xs font-mono text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
            >
              <option value="all">Display All Classes ({LATENT_SPACE_DATA.length} points)</option>
              <option value="Benign">Benign Cluster</option>
              <option value="DoS">DoS Cluster</option>
              <option value="Exploits">Exploits Cluster</option>
              <option value="Reconnaissance">Reconnaissance Cluster</option>
              <option value="Generic">Generic Cluster</option>
              <option value="Fuzzers">Fuzzers Cluster</option>
            </select>
          </div>
        </div>

        <div className="bg-[#0B0F17] rounded-lg border border-[#1E293B] p-2 flex justify-center overflow-hidden radar-grid">
          <svg
            width={WIDTH}
            height={HEIGHT}
            className="cursor-crosshair"
            role="graphics-document"
            aria-label="2D scatter plot visualization of NetFlow PCA embeddings"
          >
            {/* Axis grid */}
            <line x1={PAD} y1={HEIGHT / 2} x2={WIDTH - PAD} y2={HEIGHT / 2} stroke="#1F2E47" strokeDasharray="3 3" />
            <line x1={WIDTH / 2} y1={PAD} x2={WIDTH / 2} y2={HEIGHT - PAD} stroke="#1F2E47" strokeDasharray="3 3" />

            {/* Points */}
            {points.map((pt) => {
              const isSelected = selectedPoint?.id === pt.id;
              const fill = CLASS_COLORS[pt.attack] || "#00D2FF";

              return (
                <circle
                  key={pt.id}
                  cx={getX(pt.pca_x)}
                  cy={getY(pt.pca_y)}
                  r={isSelected ? 7 : 3.5}
                  tabIndex={0}
                  role="button"
                  aria-label={`${pt.attack} flow point ${pt.id}`}
                  className={`transition-colors duration-150 focus-visible:outline-none ${
                    isSelected ? "stroke-white stroke-2" : "opacity-80 hover:opacity-100"
                  }`}
                  fill={fill}
                  onClick={() => handlePointClick(pt as any)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handlePointClick(pt as any);
                    }
                  }}
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
              <div className="space-y-3 text-xs font-mono" aria-live="polite">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Ground Truth Class</div>
                  <div className="text-lg font-bold text-cyan-400">{selectedPoint.attack}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#0B0F17] p-2.5 rounded border border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-500">PCA Component 1</div>
                    <div className="text-slate-200 font-semibold tabular-nums">{selectedPoint.pca_x}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">PCA Component 2</div>
                    <div className="text-slate-200 font-semibold tabular-nums">{selectedPoint.pca_y}</div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Source:</span>
                    <span className="text-slate-200 tabular-nums">{selectedPoint.src_ip}:{selectedPoint.src_port}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Destination:</span>
                    <span className="text-slate-200 tabular-nums">{selectedPoint.dst_ip}:{selectedPoint.dst_port}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payload:</span>
                    <span className="text-slate-200 tabular-nums">{formatBytes(selectedPoint.in_bytes + selectedPoint.out_bytes)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Duration:</span>
                    <span className="text-slate-200 tabular-nums">{formatDuration(selectedPoint.duration)}</span>
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

print("Accessibility audit and fixes applied successfully!")
