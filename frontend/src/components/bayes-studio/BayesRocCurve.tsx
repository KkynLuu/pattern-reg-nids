import React from "react";
import { useBayesStudio } from "../../context/BayesStudioContext";

export function BayesRocCurve() {
  const { state } = useBayesStudio();
  const roc = state.rocCurve;
  const m = state.metrics;

  const currentFpr = m.fp / (m.fp + m.tn || 1);
  const currentTpr = m.tp / (m.tp + m.fn || 1);

  const width = 320;
  const height = 220;
  const pad = 35;

  const getX = (fpr: number) => pad + fpr * (width - pad * 2);
  const getY = (tpr: number) => height - pad - tpr * (height - pad * 2);

  const pathD = roc
    .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(p.fpr)} ${getY(p.tpr)}`)
    .join(" ");

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-mono font-semibold text-slate-800 uppercase flex justify-between">
        <span>ROC Curve & Operating Point</span>
        <span className="text-emerald-700 font-bold">AUC = 0.9999</span>
      </div>

      <div className="bg-slate-50 rounded-lg border border-slate-200 p-2 flex justify-center shadow-xs">
        <svg width={width} height={height} className="overflow-visible">
          <line x1={pad} y1={getY(0.5)} x2={width - pad} y2={getY(0.5)} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={getX(0.5)} y1={pad} x2={getX(0.5)} y2={height - pad} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={pad} y1={height - pad} x2={width - pad} y2={pad} stroke="#CBD5E1" strokeDasharray="4 4" />
          <path d={pathD} fill="none" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx={getX(currentFpr)} cy={getY(currentTpr)} r="6" fill="#E11D48" stroke="#FFFFFF" strokeWidth="2" />
          <text x={width / 2} y={height - 8} textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="monospace">
            False Positive Rate (FPR)
          </text>
          <text x={12} y={height / 2} textAnchor="middle" transform={`rotate(-90 12 ${height / 2})`} fill="#64748B" fontSize="10" fontFamily="monospace">
            True Positive Rate (TPR)
          </text>
        </svg>
      </div>
    </div>
  );
}
