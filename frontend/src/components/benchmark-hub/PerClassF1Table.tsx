import React, { useState } from "react";
import { BENCHMARK_DATA } from "../../data/benchmarkData";
import { TrendingUp, AlertCircle, BarChart3, Table as TableIcon } from "lucide-react";

export function PerClassF1Table() {
  const perClass = BENCHMARK_DATA.perClassF1;
  const multiSummary = BENCHMARK_DATA.multiclassBenchmark;
  const [viewMode, setViewMode] = useState<"table" | "visual">("table");

  return (
    <div className="flex flex-col gap-4">
      {/* Multiclass Macro-level Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {multiSummary.map((m, i) => {
          const isImproved = m.index.includes("Improved");
          return (
            <div
              key={i}
              className={`p-3.5 rounded-lg border flex flex-col justify-between ${
                isImproved ? "bg-emerald-50/40 border-emerald-200" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase border ${
                  isImproved ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-slate-200 text-slate-700 border-slate-300"
                }`}>
                  {isImproved ? "Improved Model" : "Baseline Model"}
                </span>
                <div className="text-xs font-bold text-slate-900 mt-1 truncate">{m.index.split(" (")[0]}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-baseline justify-between font-mono">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">F1-Macro (10 Cls)</div>
                  <div className={`text-xl font-bold ${isImproved ? "text-emerald-700" : "text-slate-700"}`}>
                    {(m["F1-Macro (Unweighted)"] * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase">Multi-Acc</div>
                  <div className="text-sm font-semibold text-slate-800">
                    {(m["Multiclass Accuracy"] * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Per-Class Table Header & Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
        <div>
          <h4 className="text-sm font-mono font-bold text-slate-900 uppercase flex items-center gap-2">
            <span>2. Detailed Per-Class F1-Score Breakdown (10 Attack Categories)</span>
          </h4>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Demonstrating why non-linear ensembles dramatically outperform linear baselines on imbalanced rare attacks.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
              viewMode === "table" ? "bg-white font-bold text-sky-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <TableIcon className="h-3 w-3" /> Data Table
          </button>
          <button
            type="button"
            onClick={() => setViewMode("visual")}
            className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
              viewMode === "visual" ? "bg-white font-bold text-sky-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="h-3 w-3" /> F1 Visual Bars
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] border-b border-slate-200 font-bold">
              <tr>
                <th scope="col" className="p-3">Attack Category</th>
                <th scope="col" className="p-3 text-right">Test Samples</th>
                <th scope="col" className="p-3 text-right">GNB (Base 1)</th>
                <th scope="col" className="p-3 text-right">Logistic Reg (Base 2)</th>
                <th scope="col" className="p-3 text-right">Decision Tree (Imp 1)</th>
                <th scope="col" className="p-3 text-right bg-emerald-50/60 font-bold text-emerald-900">Random Forest (Imp 2)</th>
                <th scope="col" className="p-3 text-right bg-sky-50/60 font-bold text-sky-900">Gain (RF vs LR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {perClass.map((row, idx) => {
                const isRare = row["Test Samples"] < 1000;
                const isWorms = row["Attack Category"] === "Worms";

                return (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50 transition-colors ${
                      isWorms ? "bg-purple-50/30" : isRare ? "bg-amber-50/15" : ""
                    }`}
                  >
                    <td className="p-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{row["Attack Category"]}</span>
                        {isWorms && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 border border-purple-200">
                            Super Rare (32)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right text-slate-600 tabular-nums">
                      {row["Test Samples"].toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-slate-600 tabular-nums">
                      {row["GNB F1"].toFixed(3)}
                    </td>
                    <td className={`p-3 text-right tabular-nums ${row["LogisticRegression F1"] === 0 ? "text-rose-600 font-bold" : "text-slate-700"}`}>
                      {row["LogisticRegression F1"].toFixed(3)}
                    </td>
                    <td className="p-3 text-right text-slate-800 font-medium tabular-nums">
                      {row["DecisionTree F1"].toFixed(3)}
                    </td>
                    <td className="p-3 text-right bg-emerald-50/30 text-emerald-800 font-bold tabular-nums">
                      {row["RandomForest F1"].toFixed(3)}
                    </td>
                    <td className="p-3 text-right bg-sky-50/30 text-sky-800 font-bold tabular-nums">
                      <span className="flex items-center justify-end gap-1">
                        <TrendingUp className="h-3 w-3 text-sky-600" />
                        {row["Improvement (RF vs LR)"]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Visual comparison bars */
        <div className="flex flex-col gap-3 bg-white p-4 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-2 border-b border-slate-100">
            <span>Attack Category</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-slate-400" /> LR (Baseline)</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-emerald-600" /> RF (Improved)</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 font-mono text-xs">
            {perClass.map((row) => (
              <div key={row["Attack Category"]} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">
                    {row["Attack Category"]} <span className="text-[10px] text-slate-400 font-normal">({row["Test Samples"]} test flows)</span>
                  </span>
                  <span className="text-[11px] font-bold text-sky-700">{row["Improvement (RF vs LR)"]}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 w-8 tabular-nums">{row["LogisticRegression F1"].toFixed(2)}</span>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: `${row["LogisticRegression F1"] * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-700 font-bold w-8 tabular-nums">{row["RandomForest F1"].toFixed(2)}</span>
                    <div className="h-2 w-full bg-emerald-50 rounded-full overflow-hidden border border-emerald-200">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${row["RandomForest F1"] * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Evaluation Commentary */}
      <div className="bg-purple-50/70 border border-purple-200 p-3.5 rounded-lg text-xs font-mono text-purple-950 flex items-start gap-2.5">
        <AlertCircle className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Academic Defense Argument:</strong> Notice that for common classes like <em>Benign</em> and <em>Generic</em>, Logistic Regression performs adequately (F1 &gt; 78%). However, on complex minority attacks:
          <ul className="list-disc ml-4 mt-1 space-y-0.5">
            <li><strong>Worms (32 flows):</strong> Logistic Regression achieves <strong>F1 = 0.0%</strong> (zero detections), while Random Forest achieves <strong>F1 = 60.0%</strong> (+60.0% boost).</li>
            <li><strong>Shellcode & DoS:</strong> Random Forest improves detection by <strong>+33.1%</strong> and <strong>+31.0%</strong> respectively.</li>
            <li><strong>Macro F1:</strong> Overall unweighted Macro F1 increases from <strong>39.08%</strong> (LR) to <strong>60.92%</strong> (RF), representing a <strong>+55.9% relative gain</strong>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
