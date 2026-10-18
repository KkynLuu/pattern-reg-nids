import React from "react";
import { useFlowInspector } from "../../context/FlowInspectorContext";
import { ModelId } from "../../types/flow";
import { getAttackColor } from "../../lib/utils";
import { ShieldCheck, ShieldAlert, Award, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export function ModelArenaGrid() {
  const { state, actions } = useFlowInspector();
  const multi = state.inferenceResult.multiModel;
  const currentAttack = state.currentFlow.Attack || "Benign";

  if (!multi) return null;

  const models: Array<{
    id: ModelId;
    title: string;
    tag: string;
    tagVariant: "baseline" | "improved";
    math: string;
  }> = [
    {
      id: "gnb",
      title: "Gaussian Naive Bayes",
      tag: "Baseline 1",
      tagVariant: "baseline",
      math: "Generative Model (P(X|ω) = ∏ P(x_i|ω))",
    },
    {
      id: "lr",
      title: "Logistic Regression",
      tag: "Baseline 2",
      tagVariant: "baseline",
      math: "Linear Discriminant (W^T * X + b)",
    },
    {
      id: "dt",
      title: "Decision Tree (CART)",
      tag: "Improved 1",
      tagVariant: "improved",
      math: "Non-linear Recursive Split (MIN_TTL, etc.)",
    },
    {
      id: "rf",
      title: "Random Forest Classifier",
      tag: "Improved 2",
      tagVariant: "improved",
      math: "Bagged Ensemble (100 Trees Majority Vote)",
    },
  ];

  // Check if there is an interesting disagreement (e.g. on rare attacks)
  const isWorms = currentAttack === "Worms";
  const lrFailedWorms = isWorms && multi.predictions.lr.predictedClass !== "Worms";
  const rfCaughtWorms = isWorms && multi.predictions.rf.predictedClass === "Worms";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-sky-600" />
          <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
            Model Arena: 4 Pattern Recognition Models Compared Side-by-Side
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="text-slate-500">Consensus:</span>
          <span className={`font-bold px-2 py-0.5 rounded ${
            multi.consensus.majorityAttack ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
          }`}>
            {multi.consensus.attackCount}/4 Models Flagged Attack
          </span>
        </div>
      </div>

      {/* Special Scientific Highlight Banner for Worms or Misclassifications */}
      {isWorms && (
        <div className="rounded-md border border-purple-200 bg-purple-50 p-3 flex items-start gap-2.5 text-xs font-mono text-purple-900 shadow-xs">
          <AlertTriangle className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Key Course Finding (Severe Class Imbalance):</span> Worms is a super-rare attack (only 32 test samples).
            Linear hyperplanes (Logistic Regression) completely fail to isolate this manifold (<span className="text-rose-700 font-bold">F1 = 0.0%</span>),
            whereas Tree Ensembles (Random Forest) successfully capture non-linear feature interactions (<span className="text-emerald-700 font-bold">F1 = 60.0%</span>)!
          </div>
        </div>
      )}

      {/* 4 Models Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {models.map((m) => {
          const pred = multi.predictions[m.id];
          const isSelected = state.activeModel === m.id;
          const style = getAttackColor(pred.predictedClass);
          const isCorrect = pred.predictedClass === currentAttack || (currentAttack === "Benign" && !pred.isAttack);

          return (
            <div
              key={m.id}
              role="button"
              tabIndex={0}
              onClick={() => actions.setActiveModel(m.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  actions.setActiveModel(m.id);
                }
              }}
              className={`rounded-lg border p-3.5 flex flex-col justify-between transition-all duration-150 cursor-pointer text-left relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isSelected
                  ? "border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/40 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
              }`}
            >
              {/* Header: Tag + Select Indicator */}
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                      m.tagVariant === "baseline"
                        ? "bg-slate-100 text-slate-700 border-slate-300"
                        : "bg-emerald-50 text-emerald-800 border-emerald-300"
                    }`}
                  >
                    {m.tag}
                  </span>
                  <div className="flex items-center gap-1">
                    {isCorrect ? (
                      <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-mono font-semibold" title="Matches Ground Truth">
                        <CheckCircle2 className="h-3 w-3" /> Match
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-[10px] text-rose-600 font-mono font-semibold" title="Different from Ground Truth">
                        <XCircle className="h-3 w-3" /> Diverge
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {m.title}
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5" title={m.math}>
                  {m.math}
                </div>

                {/* Verdict Section */}
                <div className={`mt-3 p-2 rounded border ${style.bg} ${style.border}`}>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500 font-medium">Predicted Class:</span>
                    <span className="text-slate-700 font-bold tabular-nums">
                      {(pred.confidence * 100).toFixed(1)}% conf
                    </span>
                  </div>
                  <div className={`text-sm font-bold font-mono tracking-tight uppercase mt-0.5 ${style.text}`}>
                    {pred.predictedClass}
                  </div>
                </div>
              </div>

              {/* Anomaly Bar & Active Toggle */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">Anomaly Prob:</span>
                  <span className={`font-bold tabular-nums ${pred.attackProb > 0.5 ? "text-rose-600" : "text-emerald-600"}`}>
                    {(pred.attackProb * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      pred.attackProb > 0.5 ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(100, pred.attackProb * 100)}%` }}
                  />
                </div>

                <div className="text-right mt-1">
                  <span className={`text-[10px] font-mono font-semibold ${
                    isSelected ? "text-sky-700 font-bold" : "text-slate-400"
                  }`}>
                    {isSelected ? "● Active View" : "Click to Inspect"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
