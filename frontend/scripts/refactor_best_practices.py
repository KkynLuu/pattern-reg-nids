
import os

src = "/Users/kkyn/Documents/Work/PatternReg/final/frontend/src"

def write(path, content):
    full = os.path.join(src, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Refactored {path}")

# ==================== 1. src/index.css (View Transitions & CSS Recipes) ====================
write("index.css", """
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --duration-exit: 150ms;
  --duration-enter: 220ms;
  --duration-move: 350ms;
  --slide-y-offset: 8px;
}

@layer base {
  body {
    @apply bg-[#0B0F17] text-slate-100 font-sans;
    background-image: 
      radial-gradient(ellipse 80% 80% at 50% -20%, rgba(0, 210, 255, 0.06), rgba(255, 255, 255, 0)),
      radial-gradient(circle at 100% 100%, rgba(255, 51, 102, 0.04), transparent 40%);
  }
}

/* Custom Telemetry Scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #0B0F17;
}
::-webkit-scrollbar-thumb {
  background: #1E293B;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #00D2FF;
}

.radar-grid {
  background-size: 30px 30px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}

/* ==================== View Transitions API Styles ==================== */

/* Page View Transition Keyframes */
@keyframes vt-fade-out {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(calc(var(--slide-y-offset) * -1)); }
}

@keyframes vt-fade-in {
  from { opacity: 0; transform: translateY(var(--slide-y-offset)); }
  to { opacity: 1; transform: translateY(0); }
}

/* Page content transition */
::view-transition-old(page-content) {
  animation: var(--duration-exit) cubic-bezier(0.4, 0, 1, 1) both vt-fade-out;
}

::view-transition-new(page-content) {
  animation: var(--duration-enter) cubic-bezier(0, 0, 0.2, 1) 40ms both vt-fade-in;
}

/* Persistent Header Isolation (avoids flashing during view transitions) */
::view-transition-group(persistent-header) {
  animation: none;
  z-index: 100;
}

::view-transition-old(persistent-header) {
  display: none;
}

::view-transition-new(persistent-header) {
  animation: none;
}

/* Accessibility: Respect Reduced Motion Preference */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
""")

# ==================== 2. src/lib/viewTransitions.ts ====================
write("lib/viewTransitions.ts", """
import { startTransition } from "react";

/**
 * Executes a state update wrapped in the browser native View Transitions API
 * when supported, with automatic graceful fallback to React startTransition.
 */
export function transitionView(updateFn: () => void): void {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    (document as any).startViewTransition(() => {
      startTransition(updateFn);
    });
  } else {
    startTransition(updateFn);
  }
}
""")

# ==================== 3. src/App.tsx ====================
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
        
        {/* Main Tab Container with View Transition Identifier */}
        <main
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
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
                {isNavigating ? (
                  <Loader2 className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
                ) : null}
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight hidden sm:block">
                Pattern Recognition & Telemetry Workbench
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-150 ${
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

# ==================== 5. src/context/FlowInspectorContext.tsx ====================
write("context/FlowInspectorContext.tsx", """
import React, { createContext, useContext, useState, useMemo, useCallback, useDeferredValue } from "react";
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

const AVAILABLE_CATEGORIES = Object.keys(PRESETS_DATA) as AttackClass[];

const PRESET_COUNTS = AVAILABLE_CATEGORIES.reduce((acc, cat) => {
  acc[cat] = PRESETS_DATA[cat as keyof typeof PRESETS_DATA]?.length || 0;
  return acc;
}, {} as Record<AttackClass, number>);

export function FlowInspectorProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<AttackClass>("DoS");
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);

  const initialFlow = useMemo(() => {
    return (PRESETS_DATA["DoS"][0] as any) as FlowRecord;
  }, []);

  const [currentFlow, setCurrentFlow] = useState<FlowRecord>(initialFlow);
  const [isPerturbed, setIsPerturbed] = useState<boolean>(false);

  // useDeferredValue keeps input response smooth during high-frequency slider adjustments
  const deferredFlow = useDeferredValue(currentFlow);

  const inferenceResult = useMemo(() => {
    return runFlowInference(deferredFlow);
  }, [deferredFlow]);

  const selectPreset = useCallback((category: AttackClass, index: number) => {
    const list = PRESETS_DATA[category as keyof typeof PRESETS_DATA];
    if (list?.[index]) {
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
    if (list?.[selectedSampleIndex]) {
      setCurrentFlow((list[selectedSampleIndex] as any) as FlowRecord);
      setIsPerturbed(false);
    }
  }, [selectedCategory, selectedSampleIndex]);

  const randomizeFlow = useCallback(() => {
    const randCat = AVAILABLE_CATEGORIES[Math.floor(Math.random() * AVAILABLE_CATEGORIES.length)];
    const list = PRESETS_DATA[randCat as keyof typeof PRESETS_DATA];
    const randIdx = Math.floor(Math.random() * list.length);
    selectPreset(randCat, randIdx);
  }, [selectPreset]);

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
        availableCategories: AVAILABLE_CATEGORIES,
        presetCounts: PRESET_COUNTS,
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

# ==================== 6. src/context/BatchExplorerContext.tsx ====================
write("context/BatchExplorerContext.tsx", """
import React, { createContext, useContext, useState, useMemo, useCallback, useDeferredValue } from "react";
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
  const [rawFlows, setRawFlows] = useState<FlowRecord[]>(() => BATCH_SAMPLE_DATA as any);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProtocolFilter, setProtocolFilter] = useState("all");
  const [selectedAttackFilter, setAttackFilter] = useState("all");
  const [minAnomalyScore, setMinAnomalyScore] = useState(0);
  const [selectedFlowId, setSelectedFlowId] = useState<number | null>(null);

  // Defer search filter input to keep keystrokes instant
  const deferredSearch = useDeferredValue(searchQuery);

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

  // Combined single-pass filter
  const filteredFlows = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    const hasQuery = q.length > 0;
    const isProtoAll = selectedProtocolFilter === "all";
    const isAttackAll = selectedAttackFilter === "all";

    return enrichedFlows.filter((flow) => {
      if (!isProtoAll && flow.PROTOCOL.toString() !== selectedProtocolFilter) {
        return false;
      }
      if (!isAttackAll && flow.Attack !== selectedAttackFilter && flow.predictedClass !== selectedAttackFilter) {
        return false;
      }
      if (flow.anomalyScore < minAnomalyScore) {
        return false;
      }
      if (hasQuery) {
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
  }, [enrichedFlows, selectedProtocolFilter, selectedAttackFilter, minAnomalyScore, deferredSearch]);

  const meta: BatchExplorerMeta = useMemo(() => {
    let attacks = 0;
    let highThreats = 0;
    const len = enrichedFlows.length;
    for (let i = 0; i < len; i++) {
      const f = enrichedFlows[i];
      if (f.isAttackPredicted) attacks++;
      if (f.anomalyScore > 0.8) highThreats++;
    }
    return {
      totalFlows: len,
      attackCount: attacks,
      benignCount: len - attacks,
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

# ==================== 7. src/components/latent-space/LatentScatterPlot.tsx ====================
write("components/latent-space/LatentScatterPlot.tsx", """
import React, { useState, useMemo, useCallback } from "react";
import { LATENT_SPACE_DATA } from "../../data/latentSpaceData";
import { LatentPoint } from "../../types/flow";
import { formatBytes, formatDuration } from "../../lib/utils";
import { Card } from "../ui/Card";

// Hoisted constants & bounds (calculated once at module load)
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
            <option value="Generic">Generic Cluster</option>
            <option value="Fuzzers">Fuzzers Cluster</option>
          </select>
        </div>

        <div className="bg-[#0B0F17] rounded-lg border border-[#1E293B] p-2 flex justify-center overflow-hidden radar-grid">
          <svg width={WIDTH} height={HEIGHT} className="cursor-crosshair">
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
                  className={`transition-all duration-150 ${
                    isSelected ? "stroke-white stroke-2" : "opacity-80 hover:opacity-100"
                  }`}
                  fill={fill}
                  onClick={() => handlePointClick(pt as any)}
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

print("Refactored all components with Vercel Best Practices & View Transitions!")
