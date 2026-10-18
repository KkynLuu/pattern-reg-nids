import React from "react";
import { Cpu, Database, CheckCircle2 } from "lucide-react";

export function StatusBar() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100/80 text-[11px] text-slate-600 font-mono py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Inference Engine: Active (sub-5ms)
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-600">
            <Database className="h-3 w-3 text-sky-600" />
            Dataset: NF-UNSW-NB15-v3 (55 Features)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-600">
            <Cpu className="h-3 w-3 text-sky-600" />
            Model: Decision Tree & Random Forest + Bayes Risk Engine
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 text-sky-700 font-medium">
            <CheckCircle2 className="h-3 w-3" />
            Interactive Mode Ready
          </span>
        </div>
      </div>
    </footer>
  );
}
