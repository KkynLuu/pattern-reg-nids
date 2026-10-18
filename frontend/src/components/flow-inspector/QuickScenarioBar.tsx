import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { Zap, Search, Bug, Flame, ShieldCheck, Globe } from "lucide-react";

export function QuickScenarioBar() {
  const { actions } = useFlowInspector();

  const scenarios = [
    {
      id: "syn-flood",
      label: "SYN Flood DoS",
      icon: Zap,
      desc: "Burst duration (< 5ms), high packet rate, SYN flag",
      badge: "DoS",
      color: "border-rose-200 hover:border-rose-400 bg-rose-50/50 text-rose-700",
    },
    {
      id: "stealth-scan",
      label: "Stealth Recon",
      icon: Search,
      desc: "Port 22 probe, 0 reply packets, half-open SYN",
      badge: "Recon",
      color: "border-amber-200 hover:border-amber-400 bg-amber-50/50 text-amber-700",
    },
    {
      id: "worms-spreader",
      label: "Worms (Rare Attack)",
      icon: Bug,
      desc: "Super-rare 32 samples: LR fails (0% F1), RF catches",
      badge: "Worms",
      color: "border-purple-200 hover:border-purple-400 bg-purple-50/50 text-purple-700",
    },
    {
      id: "buffer-exploit",
      label: "Buffer Exploit",
      icon: Flame,
      desc: "Payload > 1400 bytes, abnormal TTL boundary",
      badge: "Exploit",
      color: "border-orange-200 hover:border-orange-400 bg-orange-50/50 text-orange-700",
    },
    {
      id: "clean-https",
      label: "Normal HTTPS",
      icon: ShieldCheck,
      desc: "Port 443, interactive session, symmetric traffic",
      badge: "Benign",
      color: "border-emerald-200 hover:border-emerald-400 bg-emerald-50/50 text-emerald-700",
    },
    {
      id: "dns-lookup",
      label: "DNS Query (UDP)",
      icon: Globe,
      desc: "Standard UDP Port 53, single round-trip flow",
      badge: "Benign",
      color: "border-sky-200 hover:border-sky-400 bg-sky-50/50 text-sky-700",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-amber-500" /> Interactive Test Scenarios (1-Click)
        </span>
        <span className="text-[10px] text-slate-400 normal-case hidden sm:inline">Simulate attack behaviors with one click</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {scenarios.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => actions.applyQuickScenario(s.id)}
              className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all duration-150 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${s.color}`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-white/80 border border-current">
                  {s.badge}
                </span>
              </div>
              <div>
                <div className="text-xs font-bold leading-tight truncate">{s.label}</div>
                <div className="text-[10px] text-slate-500 leading-snug line-clamp-1 mt-0.5 font-normal">
                  {s.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
