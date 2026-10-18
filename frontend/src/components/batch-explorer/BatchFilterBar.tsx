import React from "react";
import { useBatchExplorer } from "../../context/BatchExplorerContext";
import { Search, Filter, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

export function BatchFilterBar() {
  const { state, actions } = useBatchExplorer();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 rounded-lg border border-slate-200 p-3 text-xs font-mono">
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        <input
          type="text"
          name="flowSearch"
          aria-label="Filter network flows by IP, Port, or Attack category"
          placeholder="Filter by IP, Port, Attack Type…"
          autoComplete="off"
          spellCheck={false}
          value={state.searchQuery}
          onChange={(e) => actions.setSearchQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded pl-8 pr-3 py-1.5 text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-colors placeholder:text-slate-400 shadow-xs"
        />
      </div>

      <div className="flex items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        <label htmlFor="proto-filter" className="sr-only">Filter by Protocol</label>
        <select
          id="proto-filter"
          aria-label="Filter by protocol"
          value={state.selectedProtocolFilter}
          onChange={(e) => actions.setProtocolFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-colors shadow-xs"
        >
          <option value="all">All Protocols</option>
          <option value="6">TCP (6)</option>
          <option value="17">UDP (17)</option>
          <option value="1">ICMP (1)</option>
        </select>
      </div>

      <div className="flex items-center">
        <label htmlFor="attack-filter" className="sr-only">Filter by Attack Type</label>
        <select
          id="attack-filter"
          aria-label="Filter by attack type"
          value={state.selectedAttackFilter}
          onChange={(e) => actions.setAttackFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-colors shadow-xs"
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
