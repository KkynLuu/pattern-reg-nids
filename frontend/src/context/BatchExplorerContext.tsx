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
