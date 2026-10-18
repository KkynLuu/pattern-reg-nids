// Generated from experimental training results in final/results/
export interface BinaryBenchmarkRow {
  index: string;
  'Train Time (s)': number;
  Accuracy: number;
  'Balanced Acc': number;
  Precision: number;
  'Recall (TPR)': number;
  'F1-Score': number;
  'ROC-AUC': number;
  'PR-AUC': number;
  'Bayes Risk (tau=0.5)': number;
  'Bayes Risk (tau*=0.01)': number;
}

export interface MulticlassBenchmarkRow {
  index: string;
  'Train Time (s)': number;
  'Multiclass Accuracy': number;
  'F1-Macro (Unweighted)': number;
  'F1-Weighted': number;
}

export interface PerClassF1Row {
  'Attack Category': string;
  'Test Samples': number;
  'GNB F1': number;
  'LogisticRegression F1': number;
  'DecisionTree F1': number;
  'RandomForest F1': number;
  'Improvement (RF vs LR)': string;
}

export interface FeatureImportanceRow {
  index: string;
  RandomForest_Importance: number;
  DecisionTree_Importance: number;
}

export const BENCHMARK_DATA = {
  "binaryBenchmark": [
    {
      "index": "Gaussian Naive Bayes (Baseline 1)",
      "Train Time (s)": 0.032,
      "Accuracy": 0.9848,
      "Balanced Acc": 0.9859,
      "Precision": 0.9717,
      "Recall (TPR)": 0.9924,
      "F1-Score": 0.982,
      "ROC-AUC": 0.9888,
      "PR-AUC": 0.9719,
      "Bayes Risk (tau=0.5)": 0.0603,
      "Bayes Risk (tau*=0.01)": 0.0559
    },
    {
      "index": "Logistic Regression (Baseline 2)",
      "Train Time (s)": 0.159,
      "Accuracy": 0.9995,
      "Balanced Acc": 0.9995,
      "Precision": 0.9993,
      "Recall (TPR)": 0.9996,
      "F1-Score": 0.9995,
      "ROC-AUC": 0.9999,
      "PR-AUC": 0.9998,
      "Bayes Risk (tau=0.5)": 0.0028,
      "Bayes Risk (tau*=0.01)": 0.0344
    },
    {
      "index": "Decision Tree (Improved 1)",
      "Train Time (s)": 1.458,
      "Accuracy": 0.9999,
      "Balanced Acc": 0.9999,
      "Precision": 0.9999,
      "Recall (TPR)": 0.9998,
      "F1-Score": 0.9999,
      "ROC-AUC": 1.0,
      "PR-AUC": 1.0,
      "Bayes Risk (tau=0.5)": 0.0009,
      "Bayes Risk (tau*=0.01)": 0.0001
    },
    {
      "index": "Random Forest (Improved 2)",
      "Train Time (s)": 1.244,
      "Accuracy": 0.9999,
      "Balanced Acc": 0.9999,
      "Precision": 0.9999,
      "Recall (TPR)": 1.0,
      "F1-Score": 0.9999,
      "ROC-AUC": 1.0,
      "PR-AUC": 1.0,
      "Bayes Risk (tau=0.5)": 0.0003,
      "Bayes Risk (tau*=0.01)": 0.0017
    }
  ],
  "multiclassBenchmark": [
    {
      "index": "Gaussian Naive Bayes (Baseline 1)",
      "Train Time (s)": 0.225,
      "Multiclass Accuracy": 0.6408,
      "F1-Macro (Unweighted)": 0.2801,
      "F1-Weighted": 0.6788
    },
    {
      "index": "Logistic Regression (Baseline 2)",
      "Train Time (s)": 14.46,
      "Multiclass Accuracy": 0.8332,
      "F1-Macro (Unweighted)": 0.3908,
      "F1-Weighted": 0.8227
    },
    {
      "index": "Decision Tree (Improved 1)",
      "Train Time (s)": 1.936,
      "Multiclass Accuracy": 0.893,
      "F1-Macro (Unweighted)": 0.6173,
      "F1-Weighted": 0.8843
    },
    {
      "index": "Random Forest (Improved 2)",
      "Train Time (s)": 1.859,
      "Multiclass Accuracy": 0.8994,
      "F1-Macro (Unweighted)": 0.6092,
      "F1-Weighted": 0.8909
    }
  ],
  "perClassF1": [
    {
      "Attack Category": "Benign",
      "Test Samples": 35804,
      "GNB F1": 0.958,
      "LogisticRegression F1": 1.0,
      "DecisionTree F1": 1.0,
      "RandomForest F1": 1.0,
      "Improvement (RF vs LR)": "+0.0%"
    },
    {
      "Attack Category": "Exploits",
      "Test Samples": 8550,
      "GNB F1": 0.12,
      "LogisticRegression F1": 0.652,
      "DecisionTree F1": 0.757,
      "RandomForest F1": 0.773,
      "Improvement (RF vs LR)": "+12.2%"
    },
    {
      "Attack Category": "Fuzzers",
      "Test Samples": 6763,
      "GNB F1": 0.445,
      "LogisticRegression F1": 0.617,
      "DecisionTree F1": 0.777,
      "RandomForest F1": 0.781,
      "Improvement (RF vs LR)": "+16.4%"
    },
    {
      "Attack Category": "Generic",
      "Test Samples": 3930,
      "GNB F1": 0.786,
      "LogisticRegression F1": 0.789,
      "DecisionTree F1": 0.873,
      "RandomForest F1": 0.896,
      "Improvement (RF vs LR)": "+10.7%"
    },
    {
      "Attack Category": "Reconnaissance",
      "Test Samples": 3415,
      "GNB F1": 0.014,
      "LogisticRegression F1": 0.482,
      "DecisionTree F1": 0.736,
      "RandomForest F1": 0.743,
      "Improvement (RF vs LR)": "+26.1%"
    },
    {
      "Attack Category": "DoS",
      "Test Samples": 1196,
      "GNB F1": 0.03,
      "LogisticRegression F1": 0.021,
      "DecisionTree F1": 0.24,
      "RandomForest F1": 0.332,
      "Improvement (RF vs LR)": "+31.0%"
    },
    {
      "Attack Category": "Backdoor",
      "Test Samples": 932,
      "GNB F1": 0.037,
      "LogisticRegression F1": 0.008,
      "DecisionTree F1": 0.081,
      "RandomForest F1": 0.138,
      "Improvement (RF vs LR)": "+13.0%"
    },
    {
      "Attack Category": "Shellcode",
      "Test Samples": 476,
      "GNB F1": 0.069,
      "LogisticRegression F1": 0.323,
      "DecisionTree F1": 0.637,
      "RandomForest F1": 0.655,
      "Improvement (RF vs LR)": "+33.1%"
    },
    {
      "Attack Category": "Analysis",
      "Test Samples": 245,
      "GNB F1": 0.339,
      "LogisticRegression F1": 0.015,
      "DecisionTree F1": 0.357,
      "RandomForest F1": 0.175,
      "Improvement (RF vs LR)": "+16.0%"
    },
    {
      "Attack Category": "Worms",
      "Test Samples": 32,
      "GNB F1": 0.005,
      "LogisticRegression F1": 0.0,
      "DecisionTree F1": 0.714,
      "RandomForest F1": 0.6,
      "Improvement (RF vs LR)": "+60.0%"
    }
  ],
  "detailedMetrics": {
    "Gaussian Naive Bayes (Baseline 1)": {
      "Train Time (s)": 0.029,
      "Inference Time (s)": 0.006,
      "Accuracy": 0.9848,
      "Balanced Accuracy": 0.9859,
      "Precision": 0.9717,
      "Recall (Sensitivity)": 0.9924,
      "Specificity": 0.9794,
      "F1-Score": 0.982,
      "ROC-AUC": 0.9888,
      "PR-AUC": 0.9719,
      "Bayes Risk (tau=0.5)": 0.0603,
      "Bayes Risk (tau*=0.01)": 0.0559,
      "Optimal Threshold Recall": 0.9933,
      "Optimal Threshold FPR": 0.0211,
      "TP": 25346,
      "FP": 737,
      "TN": 35067,
      "FN": 193
    },
    "Logistic Regression (Baseline 2)": {
      "Train Time (s)": 0.148,
      "Inference Time (s)": 0.001,
      "Accuracy": 0.9995,
      "Balanced Accuracy": 0.9995,
      "Precision": 0.9993,
      "Recall (Sensitivity)": 0.9996,
      "Specificity": 0.9995,
      "F1-Score": 0.9995,
      "ROC-AUC": 0.9999,
      "PR-AUC": 0.9998,
      "Bayes Risk (tau=0.5)": 0.0028,
      "Bayes Risk (tau*=0.01)": 0.0344,
      "Optimal Threshold Recall": 0.9998,
      "Optimal Threshold FPR": 0.0355,
      "TP": 25528,
      "FP": 17,
      "TN": 35787,
      "FN": 11
    },
    "Decision Tree (Improved 1)": {
      "Train Time (s)": 1.365,
      "Inference Time (s)": 0.001,
      "Accuracy": 0.9999,
      "Balanced Accuracy": 0.9999,
      "Precision": 0.9999,
      "Recall (Sensitivity)": 0.9998,
      "Specificity": 0.9999,
      "F1-Score": 0.9999,
      "ROC-AUC": 1.0,
      "PR-AUC": 1.0,
      "Bayes Risk (tau=0.5)": 0.0009,
      "Bayes Risk (tau*=0.01)": 0.0001,
      "Optimal Threshold Recall": 1.0,
      "Optimal Threshold FPR": 0.0001,
      "TP": 25535,
      "FP": 3,
      "TN": 35801,
      "FN": 4
    },
    "Random Forest (Improved 2)": {
      "Train Time (s)": 1.181,
      "Inference Time (s)": 0.023,
      "Accuracy": 0.9999,
      "Balanced Accuracy": 0.9999,
      "Precision": 0.9999,
      "Recall (Sensitivity)": 1.0,
      "Specificity": 0.9999,
      "F1-Score": 0.9999,
      "ROC-AUC": 1.0,
      "PR-AUC": 1.0,
      "Bayes Risk (tau=0.5)": 0.0003,
      "Bayes Risk (tau*=0.01)": 0.0017,
      "Optimal Threshold Recall": 1.0,
      "Optimal Threshold FPR": 0.0018,
      "TP": 25538,
      "FP": 3,
      "TN": 35801,
      "FN": 1
    }
  },
  "topFeatures": [
    {
      "index": "MAX_TTL",
      "RandomForest_Importance": 0.2313021329820117,
      "DecisionTree_Importance": 1.666901009901256e-06
    },
    {
      "index": "MIN_IP_PKT_LEN",
      "RandomForest_Importance": 0.150574474639249,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "MIN_TTL",
      "RandomForest_Importance": 0.1310217321788628,
      "DecisionTree_Importance": 0.996942689584383
    },
    {
      "index": "DST_TO_SRC_AVG_THROUGHPUT",
      "RandomForest_Importance": 0.0852472550376656,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "SHORTEST_FLOW_PKT",
      "RandomForest_Importance": 0.0744301138301578,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "SERVER_TCP_FLAGS",
      "RandomForest_Importance": 0.0658895173709462,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "SRC_TO_DST_SECOND_BYTES",
      "RandomForest_Importance": 0.0367992133891553,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "DST_TO_SRC_SECOND_BYTES",
      "RandomForest_Importance": 0.0353094835511944,
      "DecisionTree_Importance": 1.6741299013488117e-06
    },
    {
      "index": "OUT_BYTES",
      "RandomForest_Importance": 0.0272634433195189,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "OUT_PKTS",
      "RandomForest_Importance": 0.0189462385649192,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "NUM_PKTS_UP_TO_128_BYTES",
      "RandomForest_Importance": 0.0164511403679404,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "TCP_WIN_MAX_OUT",
      "RandomForest_Importance": 0.0153166338509087,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "TCP_FLAGS",
      "RandomForest_Importance": 0.0151662307333804,
      "DecisionTree_Importance": 0.0003150985823515
    },
    {
      "index": "L7_PROTO",
      "RandomForest_Importance": 0.0122920349789577,
      "DecisionTree_Importance": 0.0
    },
    {
      "index": "RETRANSMITTED_OUT_PKTS",
      "RandomForest_Importance": 0.0102351782376272,
      "DecisionTree_Importance": 0.0
    }
  ]
};
