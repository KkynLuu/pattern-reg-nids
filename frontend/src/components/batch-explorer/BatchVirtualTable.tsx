import React from "react";
import { useBatchExplorer } from "../../context/BatchExplorerContext";
import { formatBytes, formatDuration } from "../../lib/utils";
import { Badge } from "../ui/Badge";

export function BatchVirtualTable() {
  const { state, actions } = useBatchExplorer();

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-left text-xs font-mono" aria-label="Network Flow Telemetry Records">
        <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] border-b border-slate-200 font-semibold">
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
        <tbody className="divide-y divide-slate-200 bg-white">
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
                  className={`hover:bg-slate-50 cursor-pointer transition-colors focus-visible:outline-none focus-visible:bg-slate-100 focus-visible:ring-1 focus-visible:ring-sky-500 ${
                    isSelected ? "bg-sky-50/80" : ""
                  }`}
                >
                  <td className="p-3 text-slate-900 font-semibold truncate max-w-[140px] tabular-nums">
                    {f.IPV4_SRC_ADDR}:{f.L4_SRC_PORT}
                  </td>
                  <td className="p-3 text-slate-600 truncate max-w-[140px] tabular-nums">
                    {f.IPV4_DST_ADDR}:{f.L4_DST_PORT}
                  </td>
                  <td className="p-3 text-slate-600">{f.PROTOCOL === 6 ? "TCP" : f.PROTOCOL === 17 ? "UDP" : f.PROTOCOL}</td>
                  <td className="p-3 text-slate-600 tabular-nums">{formatDuration(f.FLOW_DURATION_MILLISECONDS)}</td>
                  <td className="p-3 text-slate-600 tabular-nums">{formatBytes(f.IN_BYTES + f.OUT_BYTES)}</td>
                  <td className="p-3">
                    <span className="text-slate-800 font-medium">{f.Attack || "Unknown"}</span>
                  </td>
                  <td className="p-3">
                    <Badge variant={f.isAttackPredicted ? "threat" : "emerald"} size="sm">
                      {f.predictedClass}
                    </Badge>
                  </td>
                  <td className="p-3 text-right font-bold tabular-nums">
                    <span className={f.anomalyScore > 0.5 ? "text-rose-600" : "text-emerald-600"}>
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
