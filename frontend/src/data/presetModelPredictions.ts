// Exact pre-computed multi-model predictions on all 100 presets
export const PRESET_MODEL_PREDICTIONS: Record<string, Array<{gnb: any, lr: any, dt: any, rf: any}>> = {
  "Benign": [
    {
      "gnb": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "lr": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "dt": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "rf": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      }
    },
    {
      "gnb": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "lr": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "dt": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "rf": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      }
    },
    {
      "gnb": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "lr": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "dt": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "rf": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      }
    },
    {
      "gnb": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "lr": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "dt": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "rf": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      }
    },
    {
      "gnb": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "lr": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "dt": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      },
      "rf": {
        "predClass": "Benign",
        "confidence": 1.0,
        "attackProb": 0.0,
        "isAttack": false
      }
    }
  ],
  "Exploits": [
    {
      "gnb": {
        "predClass": "Fuzzers",
        "confidence": 0.5206,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.397,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6178,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.5305,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.3557,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6178,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.4711,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Worms",
        "confidence": 1.0,
        "attackProb": 0.9999,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.8739,
        "attackProb": 0.9962,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.9206,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.9173,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Reconnaissance",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.8637,
        "attackProb": 0.9948,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.9727,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.9633,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Reconnaissance",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.8667,
        "attackProb": 0.998,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.9206,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.902,
        "attackProb": 1.0,
        "isAttack": true
      }
    }
  ],
  "Backdoor": [
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.4694,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6178,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.5612,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.4717,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6178,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.5682,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Reconnaissance",
        "confidence": 0.9257,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.7878,
        "attackProb": 0.9987,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.8824,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.8318,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Reconnaissance",
        "confidence": 0.9977,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.5858,
        "attackProb": 0.999,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.9,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.52,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Worms",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.6784,
        "attackProb": 0.996,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.9146,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.6736,
        "attackProb": 1.0,
        "isAttack": true
      }
    }
  ],
  "Generic": [
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.3323,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6178,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.5569,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Generic",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Generic",
        "confidence": 0.9375,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Generic",
        "confidence": 0.9833,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Generic",
        "confidence": 0.9759,
        "attackProb": 0.9999,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Generic",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Generic",
        "confidence": 0.9181,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Generic",
        "confidence": 0.9812,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Generic",
        "confidence": 0.9744,
        "attackProb": 0.9999,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Generic",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Generic",
        "confidence": 0.9375,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Generic",
        "confidence": 0.9833,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Generic",
        "confidence": 0.9759,
        "attackProb": 0.9999,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Generic",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Generic",
        "confidence": 0.9181,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Generic",
        "confidence": 0.9812,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Generic",
        "confidence": 0.9744,
        "attackProb": 0.9999,
        "isAttack": true
      }
    }
  ],
  "Fuzzers": [
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.4079,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.3945,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.4229,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Fuzzers",
        "confidence": 0.9978,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.5817,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6174,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.5579,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Fuzzers",
        "confidence": 0.952,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.4182,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.7,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.6897,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Analysis",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.6829,
        "attackProb": 0.9996,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.3608,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.4287,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.5597,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6178,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.6191,
        "attackProb": 1.0,
        "isAttack": true
      }
    }
  ],
  "Shellcode": [
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Shellcode",
        "confidence": 0.5557,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Shellcode",
        "confidence": 0.8786,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Shellcode",
        "confidence": 0.4709,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Shellcode",
        "confidence": 0.6052,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Shellcode",
        "confidence": 0.8786,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Shellcode",
        "confidence": 0.8072,
        "attackProb": 0.9999,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Reconnaissance",
        "confidence": 0.4116,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6178,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.6421,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.4605,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Shellcode",
        "confidence": 0.5658,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Shellcode",
        "confidence": 0.5769,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Shellcode",
        "confidence": 0.6607,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Shellcode",
        "confidence": 0.8786,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Shellcode",
        "confidence": 0.7413,
        "attackProb": 1.0,
        "isAttack": true
      }
    }
  ],
  "Reconnaissance": [
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Reconnaissance",
        "confidence": 0.3826,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Reconnaissance",
        "confidence": 0.9652,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Reconnaissance",
        "confidence": 0.9682,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Reconnaissance",
        "confidence": 0.3669,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Reconnaissance",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Reconnaissance",
        "confidence": 0.9919,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Reconnaissance",
        "confidence": 0.3794,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Reconnaissance",
        "confidence": 0.9652,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Reconnaissance",
        "confidence": 0.9596,
        "attackProb": 0.9999,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Worms",
        "confidence": 0.9997,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.5423,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.5215,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.5982,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Reconnaissance",
        "confidence": 0.3843,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Reconnaissance",
        "confidence": 0.9652,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Reconnaissance",
        "confidence": 0.9604,
        "attackProb": 0.9999,
        "isAttack": true
      }
    }
  ],
  "DoS": [
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.4706,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6178,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Fuzzers",
        "confidence": 0.5891,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Fuzzers",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.3779,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.6846,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.4074,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Reconnaissance",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.8777,
        "attackProb": 0.9982,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.9206,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.6969,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Worms",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.3875,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.6846,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.461,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Fuzzers",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.6649,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Fuzzers",
        "confidence": 0.6918,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "DoS",
        "confidence": 0.3147,
        "attackProb": 1.0,
        "isAttack": true
      }
    }
  ],
  "Analysis": [
    {
      "gnb": {
        "predClass": "Analysis",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.6653,
        "attackProb": 0.9997,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.5831,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.481,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Analysis",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.4913,
        "attackProb": 0.9997,
        "isAttack": true
      },
      "dt": {
        "predClass": "Analysis",
        "confidence": 0.3255,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Analysis",
        "confidence": 0.3422,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Analysis",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.5675,
        "attackProb": 0.9998,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.3918,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Analysis",
        "confidence": 0.3478,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Analysis",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.5362,
        "attackProb": 0.9997,
        "isAttack": true
      },
      "dt": {
        "predClass": "Analysis",
        "confidence": 0.3255,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.3705,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Analysis",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.6006,
        "attackProb": 0.9997,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.5831,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.363,
        "attackProb": 1.0,
        "isAttack": true
      }
    }
  ],
  "Worms": [
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.4411,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.6846,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.4508,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.378,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.5445,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Worms",
        "confidence": 0.2973,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.3278,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Exploits",
        "confidence": 0.862,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Exploits",
        "confidence": 0.7539,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Exploits",
        "confidence": 0.3359,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Worms",
        "confidence": 0.7111,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Worms",
        "confidence": 0.5211,
        "attackProb": 1.0,
        "isAttack": true
      }
    },
    {
      "gnb": {
        "predClass": "Shellcode",
        "confidence": 1.0,
        "attackProb": 1.0,
        "isAttack": true
      },
      "lr": {
        "predClass": "Fuzzers",
        "confidence": 0.353,
        "attackProb": 1.0,
        "isAttack": true
      },
      "dt": {
        "predClass": "Worms",
        "confidence": 0.7111,
        "attackProb": 1.0,
        "isAttack": true
      },
      "rf": {
        "predClass": "Worms",
        "confidence": 0.5195,
        "attackProb": 1.0,
        "isAttack": true
      }
    }
  ]
};
