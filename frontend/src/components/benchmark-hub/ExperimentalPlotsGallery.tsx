import React, { useState } from "react";
import { Image, ZoomIn, Eye, Sparkles } from "lucide-react";

interface PlotItem {
  id: string;
  filename: string;
  title: string;
  category: "comparison" | "bayes" | "features" | "errors";
  description: string;
  takeaway: string;
}

const PLOTS: PlotItem[] = [
  {
    id: "p1",
    filename: "/plots/1_model_comparison_metrics.png",
    title: "1. Model Comparison Metrics (Binary vs Multiclass)",
    category: "comparison",
    description: "Evaluates Accuracy, Precision, Recall, and F1 across all 4 candidate models. Binary metrics saturate near 99.9%, whereas multiclass macro F1 diverges substantially across model families.",
    takeaway: "Tree models provide a +55.9% relative boost in unweighted multiclass Macro F1.",
  },
  {
    id: "p2",
    filename: "/plots/2_roc_curves.png",
    title: "2. Receiver Operating Characteristic (ROC) Curves",
    category: "comparison",
    description: "Plots True Positive Rate (Sensitivity) vs False Positive Rate across all decision thresholds. DT & RF achieve near-perfect AUC = 1.0000, while GNB sits at 0.9888.",
    takeaway: "Ensemble trees achieve near-zero false alarms while capturing 100% of attacks.",
  },
  {
    id: "p3",
    filename: "/plots/3_precision_recall_curves.png",
    title: "3. Precision-Recall Curves (Imbalanced Regime)",
    category: "comparison",
    description: "In highly imbalanced datasets (attacks are only 5.4%), PR curves provide a much harsher and truer test of performance than ROC curves.",
    takeaway: "Random Forest maintains 0.999+ precision across virtually all recall levels.",
  },
  {
    id: "p4",
    filename: "/plots/4_confusion_matrices.png",
    title: "4. Multi-Model Confusion Matrices (Seaborn Heatmap)",
    category: "errors",
    description: "Compares TP, FP, FN, and TN across 61,343 test flows. Notice GNB suffers 737 False Alarms and 193 Missed Attacks, whereas Random Forest drops Missed Attacks to just 1 single flow.",
    takeaway: "Random Forest achieved 25,538 TP with only 1 FN (99.996% catch rate).",
  },
  {
    id: "p5",
    filename: "/plots/5_feature_importance.png",
    title: "5. Feature Importance Comparison (RF vs DT)",
    category: "features",
    description: "Contrasts Decision Tree's greedy single-split Gini focus (MIN_TTL = 99.7%) against Random Forest's decorrelated feature sub-sampling (MAX_TTL, MIN_IP_PKT_LEN, Throughput).",
    takeaway: "Bagging spreads importance across multiple NetFlow dimensions, preventing single-feature fragility.",
  },
  {
    id: "p6",
    filename: "/plots/6_bayes_cost_risk_curve.png",
    title: "6. Bayes Minimum Risk & Cost Optimization Curves",
    category: "bayes",
    description: "Graphs the total expected Bayes loss R(τ) as a function of decision threshold τ. Proves that with asymmetric cost C01 = 100, the optimal operating point moves to τ* ≈ 0.01.",
    takeaway: "Operating at τ* reduces catastrophic breach risk to 0.0001 (a 90% risk reduction).",
  },
  {
    id: "p7",
    filename: "/plots/7_error_analysis_by_attack_class.png",
    title: "7. Detailed Error Analysis by Attack Class",
    category: "errors",
    description: "Per-class breakdown of classification success and error modes across the 10 categories: Benign, Exploits, Fuzzers, Generic, Recon, DoS, Backdoor, Shellcode, Analysis, Worms.",
    takeaway: "Visualizes the performance gap on rare minority classes such as Worms (+60%).",
  },
];

export function ExperimentalPlotsGallery() {
  const [selectedPlotId, setSelectedPlotId] = useState<string>("p1");
  const selectedPlot = PLOTS.find((p) => p.id === selectedPlotId) || PLOTS[0];
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-sm font-mono font-bold text-slate-900 uppercase flex items-center gap-2">
          <Image className="h-4 w-4 text-sky-600" />
          <span>3. High-Resolution Experimental Plots (Published Findings)</span>
        </h4>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Generated automatically by Python script (<code>final/train_models.py</code>) on the 2.36M flow dataset.
        </p>
      </div>

      {/* Plot Selectors (Thumbnails / Pills) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {PLOTS.map((p) => {
          const isSelected = p.id === selectedPlotId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPlotId(p.id)}
              className={`p-2 rounded-lg border text-left transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? "border-sky-500 bg-sky-50/70 shadow-xs ring-1 ring-sky-500/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-slate-700 truncate w-full">
                {p.title.split(". ")[1]?.split(" (")[0] || p.title}
              </div>
              <div className="text-[9px] font-mono text-slate-400 mt-1 uppercase">
                {p.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Featured Plot Display */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h5 className="text-sm font-mono font-bold text-slate-900">
              {selectedPlot.title}
            </h5>
            <p className="text-xs font-mono text-slate-600 mt-0.5">
              {selectedPlot.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 font-semibold transition-colors"
          >
            <ZoomIn className="h-3.5 w-3.5 text-sky-600" />
            <span>{isZoomed ? "Original Size" : "Expand Full View"}</span>
          </button>
        </div>

        {/* Image Container */}
        <div className="flex justify-center bg-slate-50/50 rounded-lg p-2 border border-slate-100 overflow-hidden">
          <img
            src={selectedPlot.filename}
            alt={selectedPlot.title}
            className={`rounded object-contain transition-all duration-300 ${
              isZoomed ? "max-h-[85vh] w-full" : "max-h-[500px] w-auto shadow-xs"
            }`}
          />
        </div>

        {/* Takeaway Box */}
        <div className="bg-sky-50/70 border border-sky-200 p-3 rounded-lg text-xs font-mono text-sky-950 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong>Core Scientific Takeaway:</strong> {selectedPlot.takeaway}
          </div>
        </div>
      </div>
    </div>
  );
}
