import React, { createContext, useContext, useState, useMemo, useCallback, useDeferredValue } from "react";
import { AttackClass, FlowRecord, InferenceResult, ModelId } from "../types/flow";
import { PRESETS_DATA } from "../data/presetsData";
import { runFlowInference } from "../lib/inferenceEngine";

interface FlowInspectorState {
  currentFlow: FlowRecord;
  selectedCategory: AttackClass;
  selectedSampleIndex: number;
  inferenceResult: InferenceResult;
  isPerturbed: boolean;
  activeModel: ModelId;
}

interface FlowInspectorActions {
  selectPreset: (category: AttackClass, index: number) => void;
  updateFeature: (featureName: keyof FlowRecord, value: any) => void;
  resetToPreset: () => void;
  randomizeFlow: () => void;
  setActiveModel: (model: ModelId) => void;
  applyQuickScenario: (scenarioId: string) => void;
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
  const [activeModel, setActiveModel] = useState<ModelId>("rf");

  const initialFlow = useMemo(() => {
    return (PRESETS_DATA["DoS"][0] as any) as FlowRecord;
  }, []);

  const [currentFlow, setCurrentFlow] = useState<FlowRecord>(initialFlow);
  const [isPerturbed, setIsPerturbed] = useState<boolean>(false);

  // useDeferredValue keeps input response smooth during high-frequency slider adjustments
  const deferredFlow = useDeferredValue(currentFlow);

  const inferenceResult = useMemo(() => {
    return runFlowInference(deferredFlow, activeModel);
  }, [deferredFlow, activeModel]);

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

  const applyQuickScenario = useCallback((scenarioId: string) => {
    if (scenarioId === "syn-flood") {
      selectPreset("DoS", 0);
      setCurrentFlow((prev) => ({
        ...prev,
        FLOW_DURATION_MILLISECONDS: 2,
        IN_PKTS: 120,
        OUT_PKTS: 0,
        TCP_FLAGS: 2, // SYN
        SRC_TO_DST_AVG_THROUGHPUT: 4500000,
        Attack: "DoS" as AttackClass,
      }));
      setIsPerturbed(true);
    } else if (scenarioId === "stealth-scan") {
      selectPreset("Reconnaissance", 0);
      setCurrentFlow((prev) => ({
        ...prev,
        FLOW_DURATION_MILLISECONDS: 15,
        IN_PKTS: 2,
        OUT_PKTS: 0,
        TCP_FLAGS: 2, // SYN
        L4_DST_PORT: 22,
        SRC_TO_DST_AVG_THROUGHPUT: 45000,
        Attack: "Reconnaissance" as AttackClass,
      }));
      setIsPerturbed(true);
    } else if (scenarioId === "worms-spreader") {
      selectPreset("Worms", 0);
      setIsPerturbed(false);
    } else if (scenarioId === "buffer-exploit") {
      selectPreset("Exploits", 0);
      setCurrentFlow((prev) => ({
        ...prev,
        MAX_IP_PKT_LEN: 1460,
        LONGEST_FLOW_PKT: 1460,
        IN_BYTES: 18500,
        MIN_TTL: 7,
        Attack: "Exploits" as AttackClass,
      }));
      setIsPerturbed(true);
    } else if (scenarioId === "clean-https") {
      selectPreset("Benign", 0);
      setCurrentFlow((prev) => ({
        ...prev,
        PROTOCOL: 6,
        L4_DST_PORT: 443,
        FLOW_DURATION_MILLISECONDS: 2450,
        IN_BYTES: 4500,
        OUT_BYTES: 56000,
        IN_PKTS: 25,
        OUT_PKTS: 28,
        TCP_FLAGS: 27,
        Attack: "Benign" as AttackClass,
      }));
      setIsPerturbed(true);
    } else if (scenarioId === "dns-lookup") {
      selectPreset("Benign", 1);
      setCurrentFlow((prev) => ({
        ...prev,
        PROTOCOL: 17, // UDP
        L4_DST_PORT: 53,
        FLOW_DURATION_MILLISECONDS: 12,
        IN_BYTES: 68,
        OUT_BYTES: 184,
        IN_PKTS: 1,
        OUT_PKTS: 1,
        TCP_FLAGS: 0,
        Attack: "Benign" as AttackClass,
      }));
      setIsPerturbed(true);
    }
  }, [selectPreset]);

  const contextValue: FlowInspectorContextValue = useMemo(
    () => ({
      state: {
        currentFlow,
        selectedCategory,
        selectedSampleIndex,
        inferenceResult,
        isPerturbed,
        activeModel,
      },
      actions: {
        selectPreset,
        updateFeature,
        resetToPreset,
        randomizeFlow,
        setActiveModel,
        applyQuickScenario,
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
      activeModel,
      selectPreset,
      updateFeature,
      resetToPreset,
      randomizeFlow,
      applyQuickScenario,
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
