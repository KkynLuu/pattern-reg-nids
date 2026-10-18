import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { getAttackColor } from "../../lib/utils";
import { ShieldAlert, ShieldCheck, Zap, Cpu, CheckCircle2, XCircle } from "lucide-react";
import { ModelId } from "../../types/flow";

export function FlowVerdictCard() {
  const { state, actions } = useFlowInspector();
  const res = state.inferenceResult;
  const style = getAttackColor(res.predictedClass);
  const currentAttack = state.currentFlow.Attack || "Benign";
  const isMatch = res.predictedClass === currentAttack || (currentAttack === "Benign" && !res.isAttack);

  const modelLabels: Record<ModelId, { name: string; tag: string; isImproved: boolean }> = {
    gnb: { name: "Gaussian Naive Bayes", tag: "Baseline 1", isImproved: false },
    lr: { name: "Logistic Regression", tag: "Baseline 2", isImproved: false },
    dt: { name: "Decision Tree (CART)", tag: "Improved 1", isImproved: true },
    rf: { name: "Random Forest Classifier", tag: "Improved 2", isImproved: true },
  };

  const activeModelMeta = modelLabels[state.activeModel];

  const topThreeProbabilities = Object.entries(res.probabilities)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div
      aria-live="polite"
      className={`rounded-lg border p-5 transition-colors duration-200 ${style.bg} ${style.border} ${style.glow}`}
    >
      {/* Active Model Selector Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-sky-600" />
          <span className="text-[11px] font-mono uppercase font-bold text-slate-700">
            Active Evaluator:
          </span>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
            activeModelMeta.isImproved
              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
              : "bg-slate-200 text-slate-800 border-slate-300"
          }`}>
            {activeModelMeta.tag}
          </span>
        </div>

        {/* Quick Model Tabs */}
        <div className="flex items-center gap-1 bg-white/80 p-0.5 rounded border border-slate-200 text-[10px] font-mono">
          {(["gnb", "lr", "dt", "rf"] as ModelId[]).map((mId) => (
            <button
              key={mId}
              type="button"
              onClick={() => actions.setActiveModel(mId)}
              className={`px-1.5 py-0.5 rounded uppercase font-bold transition-colors ${
                state.activeModel === mId
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {mId}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`h-12 w-12 rounded-lg flex items-center justify-center border ${style.border} bg-white shadow-sm shrink-0`}
            aria-hidden="true"
          >
            {res.isAttack ? (
              <ShieldAlert className="h-6 w-6 text-rose-600" />
            ) : (
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
            )}
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium flex items-center gap-1.5">
              <span>{activeModelMeta.name}</span>
            </div>
            <h3 className={`text-xl font-bold font-mono tracking-tight text-balance ${style.text}`}>
              {res.predictedClass.toUpperCase()}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-mono mt-0.5">
              <span className="text-slate-500">Truth:</span>
              <span className="font-semibold text-slate-800">{currentAttack}</span>
              {isMatch ? (
                <span className="text-emerald-700 flex items-center gap-0.5 font-bold ml-1">
                  <CheckCircle2 className="h-3 w-3" /> Correct
                </span>
              ) : (
                <span className="text-rose-700 flex items-center gap-0.5 font-bold ml-1">
                  <XCircle className="h-3 w-3" /> Misclassified
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-mono text-slate-500 uppercase font-medium">Confidence</div>
          <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
            {(res.confidence * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-600">Threat Anomaly Probability</span>
          <span className={`tabular-nums font-bold ${res.anomalyScore > 0.5 ? "text-rose-700" : "text-emerald-700"}`}>
            {(res.anomalyScore * 100).toFixed(1)}%
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Threat anomaly score"
          aria-valuenow={Math.round(res.anomalyScore * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2.5 bg-slate-200/80 rounded-full overflow-hidden border border-slate-300"
        >
          <div
            className={`h-full transition-all duration-300 ${
              res.anomalyScore > 0.5
                ? "bg-gradient-to-r from-amber-500 via-rose-500 to-red-600"
                : "bg-gradient-to-r from-emerald-500 to-teal-500"
            }`}
            style={{ width: `${Math.min(100, Math.max(2, res.anomalyScore * 100))}%` }}
          />
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-200">
        <div className="text-[11px] font-mono text-slate-600 mb-2 flex items-center gap-1.5 font-medium">
          <Zap className="h-3 w-3 text-sky-600" aria-hidden="true" />
          <span>Top Class Probabilities ({activeModelMeta.tag}):</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {topThreeProbabilities.map(([name, prob]) => {
            const pct = (prob * 100).toFixed(1);
            return (
              <div key={name} className="flex items-center justify-between bg-white/90 rounded border border-slate-200 px-2 py-1 text-xs font-mono shadow-xs">
                <span className="text-slate-600 truncate">{name}:</span>
                <span className="font-semibold text-slate-900 ml-1 tabular-nums">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
