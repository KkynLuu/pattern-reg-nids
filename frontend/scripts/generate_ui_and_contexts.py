
import os

src = "/Users/kkyn/Documents/Work/PatternReg/final/frontend/src"

def write(path, content):
    full = os.path.join(src, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {path}")

# ==================== UI Components ====================

write("components/ui/Badge.tsx", """
import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "cyan" | "threat" | "emerald" | "amber" | "outline";
  size?: "sm" | "md";
}

export function Badge({ children, className, variant = "default", size = "md", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    cyan: "bg-cyan-950/60 text-cyan-400 border-cyan-500/40 shadow-glow-cyan/50",
    threat: "bg-rose-950/60 text-rose-400 border-rose-500/50 shadow-glow-crimson/50",
    emerald: "bg-emerald-950/60 text-emerald-400 border-emerald-500/40 shadow-glow-emerald/50",
    amber: "bg-amber-950/60 text-amber-400 border-amber-500/40",
    outline: "bg-transparent text-slate-400 border-slate-700/80",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-mono tracking-tight",
    md: "px-2.5 py-1 text-xs font-mono font-medium tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border uppercase transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
""")

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
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-500/40",
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

write("components/ui/Card.tsx", """
import React from "react";
import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "panel" | "glow-cyan" | "glow-threat";
}

export function Card({ children, className, variant = "default", ...props }: CardProps) {
  const variantStyles = {
    default: "bg-canvas-panel border-border-subtle",
    panel: "bg-[#101726]/90 backdrop-blur border-[#1F2E47]",
    "glow-cyan": "bg-[#101726]/90 border-cyan-500/30 shadow-glow-cyan",
    "glow-threat": "bg-[#18111B]/90 border-rose-500/40 shadow-glow-crimson",
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-5 transition-all",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
""")

write("components/ui/Slider.tsx", """
import React from "react";
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
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const accentStyles = {
    cyan: "accent-cyan-400 text-cyan-400",
    threat: "accent-rose-500 text-rose-400",
    amber: "accent-amber-400 text-amber-400",
    emerald: "accent-emerald-400 text-emerald-400",
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium tracking-wide">{label}</span>
        <span className={cn("font-mono font-semibold", accentStyles[accentColor])}>
          {displayFormatter ? displayFormatter(value) : `${value}${unit ? ` ${unit}` : ""}`}
        </span>
      </div>
      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={cn(
            "w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none transition-all",
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

# ==================== Contexts ====================

write("context/FlowInspectorContext.tsx", """
import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { AttackClass, FlowRecord, InferenceResult } from "../types/flow";
import { PRESETS_DATA } from "../data/presetsData";
import { runFlowInference } from "../lib/inferenceEngine";

interface FlowInspectorState {
  currentFlow: FlowRecord;
  selectedCategory: AttackClass;
  selectedSampleIndex: number;
  inferenceResult: InferenceResult;
  isPerturbed: boolean;
}

interface FlowInspectorActions {
  selectPreset: (category: AttackClass, index: number) => void;
  updateFeature: (featureName: keyof FlowRecord, value: any) => void;
  resetToPreset: () => void;
  randomizeFlow: () => void;
}

interface FlowInspectorMeta {
  availableCategories: AttackClass[];
  presetCounts: Record<AttackClass, number>;
}

export interface FlowInspectorContextValue {
  state: FlowInspectorState;
  actions: FlowInspectorActions;
  meta: FlowInspectorMeta;
}

const FlowInspectorContext = createContext<FlowInspectorContextValue | null>(null);

export function FlowInspectorProvider({ children }: { children: React.ReactNode }) {
  const availableCategories = useMemo(() => Object.keys(PRESETS_DATA) as AttackClass[], []);

  const [selectedCategory, setSelectedCategory] = useState<AttackClass>("DoS");
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);

  const initialFlow = useMemo(() => {
    return (PRESETS_DATA["DoS"][0] as any) as FlowRecord;
  }, []);

  const [currentFlow, setCurrentFlow] = useState<FlowRecord>(initialFlow);
  const [isPerturbed, setIsPerturbed] = useState<boolean>(false);

  const inferenceResult = useMemo(() => {
    return runFlowInference(currentFlow);
  }, [currentFlow]);

  const selectPreset = useCallback((category: AttackClass, index: number) => {
    const list = PRESETS_DATA[category as keyof typeof PRESETS_DATA];
    if (list && list[index]) {
      setSelectedCategory(category);
      setSelectedSampleIndex(index);
      setCurrentFlow((list[index] as any) as FlowRecord);
      setIsPerturbed(false);
    }
  }, []);

  const updateFeature = useCallback((featureName: keyof FlowRecord, value: any) => {
    setCurrentFlow((prev) => ({
      ...prev,
      [featureName]: value,
    }));
    setIsPerturbed(true);
  }, []);

  const resetToPreset = useCallback(() => {
    const list = PRESETS_DATA[selectedCategory as keyof typeof PRESETS_DATA];
    if (list && list[selectedSampleIndex]) {
      setCurrentFlow((list[selectedSampleIndex] as any) as FlowRecord);
      setIsPerturbed(false);
    }
  }, [selectedCategory, selectedSampleIndex]);

  const randomizeFlow = useCallback(() => {
    const categories = Object.keys(PRESETS_DATA) as AttackClass[];
    const randCat = categories[Math.floor(Math.random() * categories.length)];
    const list = PRESETS_DATA[randCat as keyof typeof PRESETS_DATA];
    const randIdx = Math.floor(Math.random() * list.length);
    selectPreset(randCat, randIdx);
  }, [selectPreset]);

  const presetCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const [k, v] of Object.entries(PRESETS_DATA)) {
      counts[k] = v.length;
    }
    return counts as Record<AttackClass, number>;
  }, []);

  const contextValue: FlowInspectorContextValue = useMemo(
    () => ({
      state: {
        currentFlow,
        selectedCategory,
        selectedSampleIndex,
        inferenceResult,
        isPerturbed,
      },
      actions: {
        selectPreset,
        updateFeature,
        resetToPreset,
        randomizeFlow,
      },
      meta: {
        availableCategories,
        presetCounts,
      },
    }),
    [
      currentFlow,
      selectedCategory,
      selectedSampleIndex,
      inferenceResult,
      isPerturbed,
      selectPreset,
      updateFeature,
      resetToPreset,
      randomizeFlow,
      availableCategories,
      presetCounts,
    ]
  );

  return (
    <FlowInspectorContext.Provider value={contextValue}>
      {children}
    </FlowInspectorContext.Provider>
  );
}

export function useFlowInspector() {
  const ctx = useContext(FlowInspectorContext);
  if (!ctx) {
    throw new Error("useFlowInspector must be used within a FlowInspectorProvider");
  }
  return ctx;
}
""")

write("context/BayesStudioContext.tsx", """
import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { BayesRiskMetrics, CostMatrix } from "../types/flow";
import { calculateBayesRisk, generateRocCurve } from "../lib/bayesRiskEngine";

interface BayesStudioState {
  threshold: number;
  priorAttack: number;
  costMatrix: CostMatrix;
  metrics: BayesRiskMetrics;
  rocCurve: { fpr: number; tpr: number; threshold: number }[];
}

interface BayesStudioActions {
  setThreshold: (tau: number) => void;
  setPriorAttack: (prior: number) => void;
  setCostMatrix: (matrix: Partial<CostMatrix>) => void;
  resetDefaults: () => void;
  applyPresetRiskProfile: (profile: "high-security" | "balanced" | "low-friction") => void;
}

interface BayesStudioMeta {
  optimalThreshold: number;
  minBayesRisk: number;
}

export interface BayesStudioContextValue {
  state: BayesStudioState;
  actions: BayesStudioActions;
  meta: BayesStudioMeta;
}

const BayesStudioContext = createContext<BayesStudioContextValue | null>(null);

const DEFAULT_COST: CostMatrix = {
  c00: 0,
  c10: 5,   // False alarm cost (moderately annoying)
  c01: 50,  // Missed attack cost (severe security breach)
  c11: 0,
};

export function BayesStudioProvider({ children }: { children: React.ReactNode }) {
  const [threshold, setThreshold] = useState<number>(0.42);
  const [priorAttack, setPriorAttack] = useState<number>(0.25);
  const [costMatrix, setCostMatrixState] = useState<CostMatrix>(DEFAULT_COST);

  const rocCurve = useMemo(() => generateRocCurve(), []);

  const metrics = useMemo(() => {
    return calculateBayesRisk({
      threshold,
      priorAttack,
      costMatrix,
      sampleSize: 1000,
    });
  }, [threshold, priorAttack, costMatrix]);

  const { optimalThreshold, minBayesRisk } = useMemo(() => {
    let bestT = 0.5;
    let lowestRisk = Infinity;
    for (let t = 0.05; t <= 0.95; t += 0.01) {
      const m = calculateBayesRisk({ threshold: t, priorAttack, costMatrix, sampleSize: 1000 });
      if (m.totalBayesRisk < lowestRisk) {
        lowestRisk = m.totalBayesRisk;
        bestT = t;
      }
    }
    return { optimalThreshold: parseFloat(bestT.toFixed(2)), minBayesRisk: parseFloat(lowestRisk.toFixed(2)) };
  }, [priorAttack, costMatrix]);

  const setCostMatrix = useCallback((matrix: Partial<CostMatrix>) => {
    setCostMatrixState((prev) => ({ ...prev, ...matrix }));
  }, []);

  const resetDefaults = useCallback(() => {
    setThreshold(0.42);
    setPriorAttack(0.25);
    setCostMatrixState(DEFAULT_COST);
  }, []);

  const applyPresetRiskProfile = useCallback((profile: "high-security" | "balanced" | "low-friction") => {
    switch (profile) {
      case "high-security":
        setCostMatrixState({ c00: 0, c10: 2, c01: 100, c11: 0 });
        setThreshold(0.25);
        break;
      case "balanced":
        setCostMatrixState(DEFAULT_COST);
        setThreshold(0.42);
        break;
      case "low-friction":
        setCostMatrixState({ c00: 0, c10: 20, c01: 20, c11: 0 });
        setThreshold(0.65);
        break;
    }
  }, []);

  const contextValue: BayesStudioContextValue = useMemo(
    () => ({
      state: {
        threshold,
        priorAttack,
        costMatrix,
        metrics,
        rocCurve,
      },
      actions: {
        setThreshold,
        setPriorAttack,
        setCostMatrix,
        resetDefaults,
        applyPresetRiskProfile,
      },
      meta: {
        optimalThreshold,
        minBayesRisk,
      },
    }),
    [threshold, priorAttack, costMatrix, metrics, rocCurve, optimalThreshold, minBayesRisk, setCostMatrix, resetDefaults, applyPresetRiskProfile]
  );

  return <BayesStudioContext.Provider value={contextValue}>{children}</BayesStudioContext.Provider>;
}

export function useBayesStudio() {
  const ctx = useContext(BayesStudioContext);
  if (!ctx) throw new Error("useBayesStudio must be used within a BayesStudioProvider");
  return ctx;
}
""")

write("context/BatchExplorerContext.tsx", """
import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { FlowRecord } from "../types/flow";
import { BATCH_SAMPLE_DATA } from "../data/batchSampleData";
import { runFlowInference } from "../lib/inferenceEngine";

interface EnrichedFlowRecord extends FlowRecord {
  predictedClass: string;
  isAttackPredicted: boolean;
  confidence: number;
  anomalyScore: number;
}

interface BatchExplorerState {
  flows: EnrichedFlowRecord[];
  searchQuery: string;
  selectedProtocolFilter: string;
  selectedAttackFilter: string;
  minAnomalyScore: number;
  selectedFlowId: number | null;
}

interface BatchExplorerActions {
  setSearchQuery: (q: string) => void;
  setProtocolFilter: (proto: string) => void;
  setAttackFilter: (attack: string) => void;
  setMinAnomalyScore: (score: number) => void;
  setSelectedFlowId: (idx: number | null) => void;
  loadCustomJson: (flows: FlowRecord[]) => void;
  resetFilters: () => void;
}

interface BatchExplorerMeta {
  totalFlows: number;
  attackCount: number;
  benignCount: number;
  highThreatCount: number;
}

export interface BatchExplorerContextValue {
  state: BatchExplorerState;
  actions: BatchExplorerActions;
  meta: BatchExplorerMeta;
}

const BatchExplorerContext = createContext<BatchExplorerContextValue | null>(null);

export function BatchExplorerProvider({ children }: { children: React.ReactNode }) {
  const [rawFlows, setRawFlows] = useState<FlowRecord[]>(BATCH_SAMPLE_DATA as any);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProtocolFilter, setProtocolFilter] = useState("all");
  const [selectedAttackFilter, setAttackFilter] = useState("all");
  const [minAnomalyScore, setMinAnomalyScore] = useState(0);
  const [selectedFlowId, setSelectedFlowId] = useState<number | null>(null);

  const enrichedFlows: EnrichedFlowRecord[] = useMemo(() => {
    return rawFlows.map((flow) => {
      const res = runFlowInference(flow);
      return {
        ...flow,
        predictedClass: res.predictedClass,
        isAttackPredicted: res.isAttack,
        confidence: res.confidence,
        anomalyScore: res.anomalyScore,
      };
    });
  }, [rawFlows]);

  const filteredFlows = useMemo(() => {
    return enrichedFlows.filter((flow) => {
      if (selectedProtocolFilter !== "all" && flow.PROTOCOL.toString() !== selectedProtocolFilter) {
        return false;
      }
      if (selectedAttackFilter !== "all" && flow.Attack !== selectedAttackFilter && flow.predictedClass !== selectedAttackFilter) {
        return false;
      }
      if (flow.anomalyScore < minAnomalyScore) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          flow.IPV4_SRC_ADDR.includes(q) ||
          flow.IPV4_DST_ADDR.includes(q) ||
          flow.L4_SRC_PORT.toString().includes(q) ||
          flow.L4_DST_PORT.toString().includes(q) ||
          (flow.Attack && flow.Attack.toLowerCase().includes(q)) ||
          flow.predictedClass.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [enrichedFlows, selectedProtocolFilter, selectedAttackFilter, minAnomalyScore, searchQuery]);

  const meta: BatchExplorerMeta = useMemo(() => {
    let attacks = 0;
    let highThreats = 0;
    enrichedFlows.forEach((f) => {
      if (f.isAttackPredicted) attacks++;
      if (f.anomalyScore > 0.8) highThreats++;
    });
    return {
      totalFlows: enrichedFlows.length,
      attackCount: attacks,
      benignCount: enrichedFlows.length - attacks,
      highThreatCount: highThreats,
    };
  }, [enrichedFlows]);

  const loadCustomJson = useCallback((flows: FlowRecord[]) => {
    setRawFlows(flows);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setProtocolFilter("all");
    setAttackFilter("all");
    setMinAnomalyScore(0);
  }, []);

  const contextValue: BatchExplorerContextValue = useMemo(
    () => ({
      state: {
        flows: filteredFlows,
        searchQuery,
        selectedProtocolFilter,
        selectedAttackFilter,
        minAnomalyScore,
        selectedFlowId,
      },
      actions: {
        setSearchQuery,
        setProtocolFilter,
        setAttackFilter,
        setMinAnomalyScore,
        setSelectedFlowId,
        loadCustomJson,
        resetFilters,
      },
      meta,
    }),
    [filteredFlows, searchQuery, selectedProtocolFilter, selectedAttackFilter, minAnomalyScore, selectedFlowId, meta, loadCustomJson, resetFilters]
  );

  return <BatchExplorerContext.Provider value={contextValue}>{children}</BatchExplorerContext.Provider>;
}

export function useBatchExplorer() {
  const ctx = useContext(BatchExplorerContext);
  if (!ctx) throw new Error("useBatchExplorer must be used within a BatchExplorerProvider");
  return ctx;
}
""")

# ==================== Layout Components ====================

write("components/layout/Header.tsx", """
import React from "react";
import { Shield, Activity, Terminal, Database } from "lucide-react";
import { Badge } from "../ui/Badge";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const navTabs = [
    { id: "sandbox", label: "Live Flow Sandbox", icon: Activity, badge: "Interactive" },
    { id: "bayes", label: "Bayes Decision Studio", icon: Shield, badge: "Risk Math" },
    { id: "batch", label: "Batch Traffic Explorer", icon: Database, badge: "NetFlow v3" },
    { id: "latent", label: "Latent Space & Clusters", icon: Terminal, badge: "PCA 2D/3D" },
  ];

  return (
    <header className="border-b border-[#1F2E47] bg-[#0B0F17]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan">
              <Shield className="h-5 w-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white font-mono text-base">
                  FlowLens<span className="text-cyan-400">.IDS</span>
                </span>
                <Badge variant="cyan" size="sm">UNSW-NB15</Badge>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Pattern Recognition & Telemetry Workbench
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/50 shadow-glow-cyan/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
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

write("components/layout/StatusBar.tsx", """
import React from "react";
import { Cpu, Wifi, Database, CheckCircle2 } from "lucide-react";

export function StatusBar() {
  return (
    <footer className="border-t border-[#1F2E47] bg-[#070B12] text-[11px] text-slate-500 font-mono py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Inference Engine: Active (sub-5ms)
          </span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-400">
            <Database className="h-3 w-3 text-cyan-400" />
            Dataset: NF-UNSW-NB15-v3 (55 Features)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-400">
            <Cpu className="h-3 w-3 text-cyan-400" />
            Model: Calibrated Decision Trees + TreeSHAP
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-cyan-400">
            <CheckCircle2 className="h-3 w-3" />
            Interactive Mode Ready
          </span>
        </div>
      </div>
    </footer>
  );
}
""")

print("Generated UI and Contexts successfully!")
