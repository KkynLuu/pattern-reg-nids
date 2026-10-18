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
