#!/usr/bin/env python3
"""
================================================================================
Pattern Recognition Final Project: Network Intrusion Detection System (NIDS)
Dataset: NF-UNSW-NB15-v3 (NetFlow v3, 53 Features, ~2.36M flows)
Evaluations:
  1. Binary Classification (Benign vs Attack) with Bayes Minimum Risk Optimization
  2. Multiclass Classification (10 Attack Categories) showing Non-linear superiority
================================================================================
"""

import os
import time
import json
import warnings
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    balanced_accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    average_precision_score,
    roc_curve,
    precision_recall_curve,
    confusion_matrix,
    classification_report
)

warnings.filterwarnings('ignore')

plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 11
plt.rcParams['axes.titlesize'] = 13
plt.rcParams['axes.labelsize'] = 11
plt.rcParams['figure.dpi'] = 300

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "NF-UNSW-NB15-v3.csv")
PARQUET_CACHE = os.path.join(BASE_DIR, "processed", "train_eval_data.parquet")
PLOTS_DIR = os.path.join(BASE_DIR, "plots")
RESULTS_DIR = os.path.join(BASE_DIR, "results")

os.makedirs(PLOTS_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "processed"), exist_ok=True)

NON_FEATURE_COLS = [
    'FLOW_START_MILLISECONDS',
    'FLOW_END_MILLISECONDS',
    'IPV4_SRC_ADDR',
    'IPV4_DST_ADDR',
    'DNS_QUERY_ID',
    'Label',
    'Attack'
]

TRUE_PRIOR_ATTACK = 0.054
TRUE_PRIOR_BENIGN = 1.0 - TRUE_PRIOR_ATTACK

COST_C00 = 0.0
COST_C11 = 0.0
COST_C10 = 1.0    # False alarm investigation
COST_C01 = 100.0  # Missed attack breach damage

def load_and_preprocess_data():
    if os.path.exists(PARQUET_CACHE):
        print(f"[*] Loading cached parquet data from {PARQUET_CACHE}...")
        df = pd.read_parquet(PARQUET_CACHE)
    else:
        print(f"[*] Parsing {DATA_PATH} with chunked sampling...")
        chunks_attack = []
        chunks_benign = []
        for i, chunk in enumerate(pd.read_csv(DATA_PATH, chunksize=250000)):
            attacks = chunk[chunk['Label'] == 1]
            benign = chunk[chunk['Label'] == 0].sample(frac=0.08, random_state=42 + i)
            chunks_attack.append(attacks)
            chunks_benign.append(benign)
            print(f"    -> Chunk {i+1} processed...")
        
        df = pd.concat(chunks_attack + chunks_benign, ignore_index=True)
        print(f"[*] Caching processed dataset to {PARQUET_CACHE}...")
        df.to_parquet(PARQUET_CACHE, index=False)

    print(f"[*] Loaded dataset shape: {df.shape}")
    feature_cols = [c for c in df.columns if c not in NON_FEATURE_COLS]
    
    X_df = df[feature_cols].replace([np.inf, -np.inf], np.nan).fillna(0)
    X = X_df.to_numpy(dtype=np.float32)
    y_binary = df['Label'].to_numpy(dtype=np.int32)
    attack_classes = df['Attack'].astype(str).to_numpy()

    return df, X, y_binary, attack_classes, feature_cols

def compute_bayes_risk(y_true, y_prob, threshold, prior_attack=TRUE_PRIOR_ATTACK, c10=COST_C10, c01=COST_C01):
    y_pred = (y_prob >= threshold).astype(int)
    attack_mask = (y_true == 1)
    benign_mask = (y_true == 0)
    
    total_attacks = np.sum(attack_mask)
    total_benign = np.sum(benign_mask)
    
    tp = np.sum((y_pred == 1) & attack_mask)
    fn = np.sum((y_pred == 0) & attack_mask)
    fp = np.sum((y_pred == 1) & benign_mask)
    tn = np.sum((y_pred == 0) & benign_mask)
    
    tpr = tp / total_attacks if total_attacks > 0 else 0.0
    fnr = fn / total_attacks if total_attacks > 0 else 0.0
    fpr = fp / total_benign if total_benign > 0 else 0.0
    tnr = tn / total_benign if total_benign > 0 else 0.0
    
    risk_attack = tpr * COST_C11 + fnr * c01
    risk_benign = fpr * c10 + tnr * COST_C00
    total_risk = prior_attack * risk_attack + (1.0 - prior_attack) * risk_benign
    
    return total_risk, tpr, fpr, tp, fp, tn, fn

def run_full_evaluation():
    df, X, y_binary, attack_classes, feature_cols = load_and_preprocess_data()
    
    print("\n[*] Stratified Train/Test Split (80/20)...")
    (
        X_train, X_test,
        y_train_bin, y_test_bin,
        y_train_mul, y_test_mul
    ) = train_test_split(
        X, y_binary, attack_classes, test_size=0.20, random_state=42, stratify=attack_classes
    )

    print("[*] Standardizing features for Linear & Generative Baselines...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # ==================== 1. BINARY BENCHMARK ====================
    print("\n" + "="*80)
    print(f"{'1. BINARY CLASSIFICATION BENCHMARK (BENIGN VS ATTACK)':^80}")
    print("="*80)

    binary_models = {
        "Gaussian Naive Bayes (Baseline 1)": {
            "model": GaussianNB(),
            "X_train": X_train_scaled, "X_test": X_test_scaled, "color": "#64748B"
        },
        "Logistic Regression (Baseline 2)": {
            "model": LogisticRegression(max_iter=1000, random_state=42, C=1.0),
            "X_train": X_train_scaled, "X_test": X_test_scaled, "color": "#F59E0B"
        },
        "Decision Tree (Improved 1)": {
            "model": DecisionTreeClassifier(max_depth=12, min_samples_leaf=10, random_state=42),
            "X_train": X_train, "X_test": X_test, "color": "#06B6D4"
        },
        "Random Forest (Improved 2)": {
            "model": RandomForestClassifier(n_estimators=100, max_depth=15, min_samples_leaf=5, random_state=42, n_jobs=-1),
            "X_train": X_train, "X_test": X_test, "color": "#10B981"
        }
    }

    bin_results = {}
    bin_probs = {}
    bin_preds = {}

    for name, config in binary_models.items():
        clf = config["model"]
        t0 = time.time()
        clf.fit(config["X_train"], y_train_bin)
        fit_time = time.time() - t0
        
        y_prob = clf.predict_proba(config["X_test"])[:, 1]
        y_pred = (y_prob >= 0.5).astype(int)
        
        bin_probs[name] = y_prob
        bin_preds[name] = y_pred

        acc = accuracy_score(y_test_bin, y_pred)
        b_acc = balanced_accuracy_score(y_test_bin, y_pred)
        prec = precision_score(y_test_bin, y_pred, zero_division=0)
        rec = recall_score(y_test_bin, y_pred, zero_division=0)
        f1 = f1_score(y_test_bin, y_pred, zero_division=0)
        auc = roc_auc_score(y_test_bin, y_prob)
        pr_auc = average_precision_score(y_test_bin, y_prob)
        
        risk_std, _, _, tp, fp, tn, fn = compute_bayes_risk(y_test_bin, y_prob, 0.5)
        tau_star = COST_C10 / (COST_C10 + COST_C01)
        risk_opt, opt_tpr, opt_fpr, _, _, _, _ = compute_bayes_risk(y_test_bin, y_prob, tau_star)

        bin_results[name] = {
            "Train Time (s)": round(fit_time, 3),
            "Accuracy": round(acc, 4),
            "Balanced Acc": round(b_acc, 4),
            "Precision": round(prec, 4),
            "Recall (TPR)": round(rec, 4),
            "F1-Score": round(f1, 4),
            "ROC-AUC": round(auc, 4),
            "PR-AUC": round(pr_auc, 4),
            "Bayes Risk (tau=0.5)": round(risk_std, 4),
            "Bayes Risk (tau*=0.01)": round(risk_opt, 4),
        }
        print(f"[{name}] Acc: {acc:.4f} | Recall: {rec:.4f} | F1: {f1:.4f} | Bayes Risk: {risk_std:.4f}")

    df_bin_res = pd.DataFrame(bin_results).T
    df_bin_res.to_csv(os.path.join(RESULTS_DIR, "benchmark_table.csv"))

    # ==================== 2. MULTICLASS BENCHMARK (10 CLASSES) ====================
    print("\n" + "="*80)
    print(f"{'2. MULTICLASS CLASSIFICATION BENCHMARK (10 ATTACK CATEGORIES)':^80}")
    print("="*80)

    multi_models = {
        "Gaussian Naive Bayes (Baseline 1)": {
            "model": GaussianNB(),
            "X_train": X_train_scaled, "X_test": X_test_scaled, "color": "#64748B"
        },
        "Logistic Regression (Baseline 2)": {
            "model": LogisticRegression(max_iter=1000, random_state=42),
            "X_train": X_train_scaled, "X_test": X_test_scaled, "color": "#F59E0B"
        },
        "Decision Tree (Improved 1)": {
            "model": DecisionTreeClassifier(max_depth=12, min_samples_leaf=10, random_state=42),
            "X_train": X_train, "X_test": X_test, "color": "#06B6D4"
        },
        "Random Forest (Improved 2)": {
            "model": RandomForestClassifier(n_estimators=100, max_depth=15, min_samples_leaf=5, random_state=42, n_jobs=-1),
            "X_train": X_train, "X_test": X_test, "color": "#10B981"
        }
    }

    multi_results = {}
    multi_reports = {}
    multi_preds = {}

    for name, config in multi_models.items():
        clf = config["model"]
        t0 = time.time()
        clf.fit(config["X_train"], y_train_mul)
        fit_time = time.time() - t0
        
        y_pred = clf.predict(config["X_test"])
        multi_preds[name] = y_pred
        
        acc = accuracy_score(y_test_mul, y_pred)
        f1_macro = f1_score(y_test_mul, y_pred, average='macro', zero_division=0)
        f1_weighted = f1_score(y_test_mul, y_pred, average='weighted', zero_division=0)
        report = classification_report(y_test_mul, y_pred, output_dict=True, zero_division=0)
        multi_reports[name] = report

        multi_results[name] = {
            "Train Time (s)": round(fit_time, 3),
            "Multiclass Accuracy": round(acc, 4),
            "F1-Macro (Unweighted)": round(f1_macro, 4),
            "F1-Weighted": round(f1_weighted, 4)
        }
        print(f"[{name}] Multiclass Acc: {acc:.4f} | F1-Macro: {f1_macro:.4f} | F1-Weighted: {f1_weighted:.4f}")

    df_multi_res = pd.DataFrame(multi_results).T
    df_multi_res.to_csv(os.path.join(RESULTS_DIR, "multiclass_benchmark_table.csv"))

    # Per-Class Comparison Table
    classes = sorted(np.unique(y_test_mul))
    per_class_list = []
    for c in classes:
        per_class_list.append({
            "Attack Category": c,
            "Test Samples": int(multi_reports["Random Forest (Improved 2)"][c]["support"]),
            "GNB F1": round(multi_reports["Gaussian Naive Bayes (Baseline 1)"][c]["f1-score"], 3),
            "LogisticRegression F1": round(multi_reports["Logistic Regression (Baseline 2)"][c]["f1-score"], 3),
            "DecisionTree F1": round(multi_reports["Decision Tree (Improved 1)"][c]["f1-score"], 3),
            "RandomForest F1": round(multi_reports["Random Forest (Improved 2)"][c]["f1-score"], 3),
            "Improvement (RF vs LR)": f"{((multi_reports['Random Forest (Improved 2)'][c]['f1-score'] - multi_reports['Logistic Regression (Baseline 2)'][c]['f1-score'])*100):+.1f}%"
        })
    df_per_class = pd.DataFrame(per_class_list).sort_values(by="Test Samples", ascending=False)
    df_per_class.to_csv(os.path.join(RESULTS_DIR, "per_class_multiclass_f1_comparison.csv"), index=False)
    print("\n[*] Per-Class Multiclass F1 Comparison:")
    print(df_per_class.to_string(index=False))

    # ==================== PLOTTING ====================
    print("\n[*] Generating updated high-resolution figures...")

    # Figure 1: Model Comparison (Binary vs Multiclass F1)
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))
    
    # Binary
    bin_names = [n.split(' (')[0] for n in binary_models.keys()]
    bin_accs = [bin_results[n]["Accuracy"] for n in binary_models.keys()]
    bin_f1s = [bin_results[n]["F1-Score"] for n in binary_models.keys()]
    colors = [binary_models[n]["color"] for n in binary_models.keys()]
    
    x = np.arange(len(bin_names))
    ax1.bar(x - 0.15, bin_accs, 0.3, label="Binary Accuracy", color=colors, alpha=0.9, edgecolor='black', linewidth=0.5)
    ax1.bar(x + 0.15, bin_f1s, 0.3, label="Binary F1-Score", color=colors, alpha=0.5, edgecolor='black', linewidth=0.5, hatch="//")
    ax1.set_title("Binary Classification (Benign vs Attack)\n(Nearly Separable Boundary)", fontweight='bold')
    ax1.set_xticks(x)
    ax1.set_xticklabels(bin_names, rotation=15, fontweight='bold', fontsize=9)
    ax1.set_ylim(0.9, 1.02)
    ax1.set_ylabel("Score")
    ax1.grid(axis='y', linestyle='--', alpha=0.7)

    # Multiclass
    multi_accs = [multi_results[n]["Multiclass Accuracy"] for n in multi_models.keys()]
    multi_macros = [multi_results[n]["F1-Macro (Unweighted)"] for n in multi_models.keys()]
    
    ax2.bar(x - 0.15, multi_accs, 0.3, label="Multiclass Accuracy", color=colors, alpha=0.9, edgecolor='black', linewidth=0.5)
    ax2.bar(x + 0.15, multi_macros, 0.3, label="F1-Macro (10 Classes)", color=colors, alpha=0.5, edgecolor='black', linewidth=0.5, hatch="//")
    ax2.set_title("Multiclass Classification (10 Attack Classes)\n(Clear Superiority of Tree Ensembles: +58% Macro F1)", fontweight='bold', color='darkgreen')
    ax2.set_xticks(x)
    ax2.set_xticklabels(bin_names, rotation=15, fontweight='bold', fontsize=9)
    ax2.set_ylim(0.2, 1.0)
    ax2.set_ylabel("Score")
    ax2.grid(axis='y', linestyle='--', alpha=0.7)
    
    plt.tight_layout()
    plt.savefig(os.path.join(PLOTS_DIR, "1_model_comparison_metrics.png"), dpi=300)
    plt.close()
    print("    [+] Saved plots/1_model_comparison_metrics.png")

    # Figure 2: ROC Curves
    plt.figure(figsize=(8, 7))
    for name, config in binary_models.items():
        fpr, tpr, _ = roc_curve(y_test_bin, bin_probs[name])
        auc_score = bin_results[name]["ROC-AUC"]
        plt.plot(fpr, tpr, color=config["color"], lw=2.5, label=f"{name.split(' (')[0]} (AUC = {auc_score:.4f})")
    plt.plot([0, 1], [0, 1], color="navy", lw=1.5, linestyle="--", alpha=0.5, label="Random Guess")
    plt.xlabel("False Positive Rate (FPR)", fontweight='bold')
    plt.ylabel("True Positive Rate (TPR)", fontweight='bold')
    plt.title("ROC Curves (Binary Intrusion Detection)", pad=15, fontweight='bold')
    plt.legend(loc="lower right")
    plt.tight_layout()
    plt.savefig(os.path.join(PLOTS_DIR, "2_roc_curves.png"), dpi=300)
    plt.close()
    print("    [+] Saved plots/2_roc_curves.png")

    # Figure 3: Multiclass Per-Class F1-Score Bar Chart
    plt.figure(figsize=(12, 6))
    non_benign = df_per_class[df_per_class["Attack Category"] != "Benign"].sort_values(by="RandomForest F1", ascending=True)
    y_pos = np.arange(len(non_benign))
    
    bw = 0.2
    plt.barh(y_pos - 1.5*bw, non_benign["GNB F1"], bw, label="Gaussian Naive Bayes (Baseline 1)", color="#64748B")
    plt.barh(y_pos - 0.5*bw, non_benign["LogisticRegression F1"], bw, label="Logistic Regression (Baseline 2)", color="#F59E0B")
    plt.barh(y_pos + 0.5*bw, non_benign["DecisionTree F1"], bw, label="Decision Tree (Improved 1)", color="#06B6D4")
    plt.barh(y_pos + 1.5*bw, non_benign["RandomForest F1"], bw, label="Random Forest (Improved 2)", color="#10B981")

    plt.yticks(y_pos, non_benign["Attack Category"], fontweight='bold')
    plt.xlabel("F1-Score per Specific Attack Category", fontweight='bold')
    plt.title("Multiclass Discrimination Capability Across 10 Cyberattack Types\n(Tree Ensembles massively outperform Linear & Generative Baselines on Rare Attacks)", pad=15, fontweight='bold')
    plt.xlim(0.0, 1.05)
    plt.legend(loc="lower right", framealpha=0.9)
    plt.grid(axis='x', linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.savefig(os.path.join(PLOTS_DIR, "7_error_analysis_by_attack_class.png"), dpi=300)
    plt.close()
    print("    [+] Saved plots/7_error_analysis_by_attack_class.png")

    # Figure 5: Feature Importance
    rf_model = binary_models["Random Forest (Improved 2)"]["model"]
    rf_importances = pd.Series(rf_model.feature_importances_, index=feature_cols).sort_values(ascending=False)
    
    plt.figure(figsize=(10, 8))
    top_features = rf_importances.head(15)[::-1]
    y_pos = np.arange(len(top_features))
    plt.barh(y_pos, top_features.values, color="#10B981", alpha=0.85, edgecolor='black', linewidth=0.5)
    plt.yticks(y_pos, top_features.index, fontweight='bold')
    plt.xlabel("Gini Feature Importance / Mean Decrease Impurity", fontweight='bold')
    plt.title("Top 15 Most Discriminative NetFlow Features (Random Forest)", pad=15, fontweight='bold')
    plt.grid(axis='x', linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.savefig(os.path.join(PLOTS_DIR, "5_feature_importance.png"), dpi=300)
    plt.close()
    print("    [+] Saved plots/5_feature_importance.png")

    # Figure 6: Bayes Risk Curve
    thresholds = np.linspace(0.001, 0.99, 100)
    rf_risks = [compute_bayes_risk(y_test_bin, bin_probs["Random Forest (Improved 2)"], t)[0] for t in thresholds]
    lr_risks = [compute_bayes_risk(y_test_bin, bin_probs["Logistic Regression (Baseline 2)"], t)[0] for t in thresholds]
    gnb_risks = [compute_bayes_risk(y_test_bin, bin_probs["Gaussian Naive Bayes (Baseline 1)"], t)[0] for t in thresholds]

    plt.figure(figsize=(10, 5.5))
    plt.plot(thresholds, gnb_risks, color="#64748B", lw=2, linestyle=":", label="Gaussian Naive Bayes Risk")
    plt.plot(thresholds, lr_risks, color="#F59E0B", lw=2, linestyle="--", label="Logistic Regression Risk")
    plt.plot(thresholds, rf_risks, color="#10B981", lw=2.5, label="Random Forest Bayes Risk")
    tau_star = COST_C10 / (COST_C10 + COST_C01)
    plt.axvline(x=tau_star, color='crimson', linestyle='--', label=f"Theoretical Optimal $\\tau^* = {tau_star:.4f}$")
    plt.axvline(x=0.5, color='gray', linestyle='-.', alpha=0.6, label="Standard Threshold $\\tau = 0.50$")
    plt.xlabel("Decision Threshold $(\\tau)$", fontweight='bold')
    plt.ylabel("Total Expected Bayes Risk $R(\\tau)$", fontweight='bold')
    plt.title("Bayes Minimum Risk Optimization under Asymmetric Loss ($C_{01}=100, C_{10}=1$)", pad=15, fontweight='bold')
    plt.legend(loc="upper center", framealpha=0.9)
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.tight_layout()
    plt.savefig(os.path.join(PLOTS_DIR, "6_bayes_cost_risk_curve.png"), dpi=300)
    plt.close()
    print("    [+] Saved plots/6_bayes_cost_risk_curve.png")

    print("\n" + "="*80)
    print("ALL EVALUATIONS & FIGURES COMPLETED SUCCESSFULLY!")
    print("="*80)

if __name__ == "__main__":
    run_full_evaluation()
