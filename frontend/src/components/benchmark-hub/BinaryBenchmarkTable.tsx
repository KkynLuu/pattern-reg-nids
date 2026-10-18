import React from "react";
import { BENCHMARK_DATA } from "../../data/benchmarkData";
import { Info } from "lucide-react";

export function BinaryBenchmarkTable() {
  const rows = BENCHMARK_DATA.binaryBenchmark;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-mono font-bold text-slate-900 uppercase">
            1. Binary Classification Benchmark (Benign vs. Attack)
          </h4>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Evaluated on 61,343 independent stratified test flows with asymmetric Bayes loss C01 = 100, C10 = 1.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] border-b border-slate-200 font-bold">
            <tr>
              <th scope="col" className="p-3">Model / Algorithm</th>
              <th scope="col" className="p-3 text-right">Train Time</th>
              <th scope="col" className="p-3 text-right">Accuracy</th>
              <th scope="col" className="p-3 text-right">Precision</th>
              <th scope="col" className="p-3 text-right">Recall (TPR)</th>
              <th scope="col" className="p-3 text-right">F1-Score</th>
              <th scope="col" className="p-3 text-right">ROC-AUC</th>
              <th scope="col" className="p-3 text-right bg-amber-50/50">Risk (τ = 0.5)</th>
              <th scope="col" className="p-3 text-right bg-emerald-50/50 font-bold text-emerald-800">Risk (τ* = 0.01)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((r, i) => {
              const isImproved = r.index.includes("Improved");
              return (
                <tr key={i} className={`hover:bg-slate-50/80 transition-colors ${isImproved ? "bg-emerald-50/10" : ""}`}>
                  <td className="p-3 font-semibold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase border ${
                        isImproved ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-slate-100 text-slate-700 border-slate-300"
                      }`}>
                        {isImproved ? "Improved" : "Baseline"}
                      </span>
                      <span>{r.index}</span>
                    </div>
                  </td>
                  <td className="p-3 text-right text-slate-600 tabular-nums">{r["Train Time (s)"].toFixed(3)}s</td>
                  <td className="p-3 text-right font-semibold text-slate-900 tabular-nums">{(r.Accuracy * 100).toFixed(2)}%</td>
                  <td className="p-3 text-right text-slate-700 tabular-nums">{(r.Precision * 100).toFixed(2)}%</td>
                  <td className="p-3 text-right text-slate-700 tabular-nums">{(r["Recall (TPR)"] * 100).toFixed(2)}%</td>
                  <td className="p-3 text-right font-bold text-purple-700 tabular-nums">{(r["F1-Score"] * 100).toFixed(2)}%</td>
                  <td className="p-3 text-right text-sky-700 font-semibold tabular-nums">{r["ROC-AUC"].toFixed(4)}</td>
                  <td className="p-3 text-right text-amber-800 bg-amber-50/30 font-mono tabular-nums">{r["Bayes Risk (tau=0.5)"].toFixed(4)}</td>
                  <td className="p-3 text-right text-emerald-700 bg-emerald-50/30 font-bold font-mono tabular-nums">{r["Bayes Risk (tau*=0.01)"].toFixed(4)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-start gap-2">
        <Info className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <strong>Academic Insight:</strong> In binary classification, all models achieve high accuracy (&gt;98.4%) because network port and transport features separate traffic coarsely. However, applying Bayes Minimum Risk threshold τ* = C10 / (C10 + C01) ≈ 0.0099 reduces catastrophic breach risk for Decision Tree to <strong>0.0001</strong>.
        </div>
      </div>
    </div>
  );
}
