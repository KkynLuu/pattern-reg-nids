import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { getProtocolName } from "../../lib/utils";
import { Network, Radio, Hash, Clock } from "lucide-react";

export function FlowTelemetryPillBar() {
  const { state } = useFlowInspector();
  const flow = state.currentFlow;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 rounded-md border border-slate-200 p-3 text-xs font-mono">
      <div className="flex items-center gap-2">
        <Network className="h-4 w-4 text-sky-600 shrink-0" />
        <div className="truncate">
          <div className="text-[10px] text-slate-500 uppercase font-medium">Src Socket</div>
          <div className="text-slate-800 truncate font-semibold">
            {flow.IPV4_SRC_ADDR}:{flow.L4_SRC_PORT}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Radio className="h-4 w-4 text-blue-600 shrink-0" />
        <div className="truncate">
          <div className="text-[10px] text-slate-500 uppercase font-medium">Dst Socket</div>
          <div className="text-slate-800 truncate font-semibold">
            {flow.IPV4_DST_ADDR}:{flow.L4_DST_PORT}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4 text-purple-600 shrink-0" />
        <div>
          <div className="text-[10px] text-slate-500 uppercase font-medium">Protocol</div>
          <div className="text-slate-800 font-semibold">{getProtocolName(flow.PROTOCOL)}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-amber-600 shrink-0" />
        <div>
          <div className="text-[10px] text-slate-500 uppercase font-medium">TCP Flags</div>
          <div className="text-slate-800 font-semibold">0x{flow.TCP_FLAGS.toString(16).toUpperCase()} ({flow.TCP_FLAGS})</div>
        </div>
      </div>
    </div>
  );
}
