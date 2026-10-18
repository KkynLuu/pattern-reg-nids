import React, { useState } from "react";
import { BinaryBenchmarkTable } from "./BinaryBenchmarkTable";
import { PerClassF1Table } from "./PerClassF1Table";
import { ExperimentalPlotsGallery } from "./ExperimentalPlotsGallery";
import { Card } from "../ui/Card";
import { Award, BarChart2, Layers, Image as ImageIcon } from "lucide-react";

export function BenchmarkHubRoot() {
  const [activeSubTab, setActiveSubTab] = useState<"perclass" | "binary" | "plots">("perclass");

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <Card variant="panel" className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-sky-600/10 border border-sky-300 flex items-center justify-center text-sky-700">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-mono text-slate-900 tracking-tight">
                Benchmark & Error Analysis Hub
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Academic benchmark of 4 algorithms on the NF-UNSW-NB15-v3 dataset.
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveSubTab("perclass")}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === "perclass"
                  ? "bg-white text-sky-700 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5" /> Multiclass & Per-Class F1
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("binary")}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === "binary"
                  ? "bg-white text-sky-700 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="h-3.5 w-3.5" /> Binary Classification
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("plots")}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === "plots"
                  ? "bg-white text-sky-700 font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" /> Figures Gallery (7)
            </button>
          </div>
        </div>

        {/* Content Panel */}
        <div className="mt-5">
          {activeSubTab === "perclass" && <PerClassF1Table />}
          {activeSubTab === "binary" && <BinaryBenchmarkTable />}
          {activeSubTab === "plots" && <ExperimentalPlotsGallery />}
        </div>
      </Card>
    </div>
  );
}
