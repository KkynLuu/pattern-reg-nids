export type AttackClass =
  | 'Benign'
  | 'Exploits'
  | 'Generic'
  | 'Fuzzers'
  | 'Reconnaissance'
  | 'DoS'
  | 'Backdoor'
  | 'Shellcode'
  | 'Analysis'
  | 'Worms';

export interface FlowRecord {
  FLOW_START_MILLISECONDS: number;
  FLOW_END_MILLISECONDS: number;
  IPV4_SRC_ADDR: string;
  L4_SRC_PORT: number;
  IPV4_DST_ADDR: string;
  L4_DST_PORT: number;
  PROTOCOL: number;
  L7_PROTO: number;
  IN_BYTES: number;
  IN_PKTS: number;
  OUT_BYTES: number;
  OUT_PKTS: number;
  TCP_FLAGS: number;
  CLIENT_TCP_FLAGS: number;
  SERVER_TCP_FLAGS: number;
  FLOW_DURATION_MILLISECONDS: number;
  DURATION_IN: number;
  DURATION_OUT: number;
  MIN_TTL: number;
  MAX_TTL: number;
  LONGEST_FLOW_PKT: number;
  SHORTEST_FLOW_PKT: number;
  MIN_IP_PKT_LEN: number;
  MAX_IP_PKT_LEN: number;
  SRC_TO_DST_SECOND_BYTES: number;
  DST_TO_SRC_SECOND_BYTES: number;
  RETRANSMITTED_IN_BYTES: number;
  RETRANSMITTED_IN_PKTS: number;
  RETRANSMITTED_OUT_BYTES: number;
  RETRANSMITTED_OUT_PKTS: number;
  SRC_TO_DST_AVG_THROUGHPUT: number;
  DST_TO_SRC_AVG_THROUGHPUT: number;
  NUM_PKTS_UP_TO_128_BYTES: number;
  NUM_PKTS_128_TO_256_BYTES: number;
  NUM_PKTS_256_TO_512_BYTES: number;
  NUM_PKTS_512_TO_1024_BYTES: number;
  NUM_PKTS_1024_TO_1514_BYTES: number;
  TCP_WIN_MAX_IN: number;
  TCP_WIN_MAX_OUT: number;
  ICMP_TYPE: number;
  ICMP_IPV4_TYPE: number;
  DNS_QUERY_ID: number;
  DNS_QUERY_TYPE: number;
  DNS_TTL_ANSWER: number;
  FTP_COMMAND_RET_CODE: number;
  SRC_TO_DST_IAT_MIN: number;
  SRC_TO_DST_IAT_MAX: number;
  SRC_TO_DST_IAT_AVG: number;
  SRC_TO_DST_IAT_STDDEV: number;
  DST_TO_SRC_IAT_MIN: number;
  DST_TO_SRC_IAT_MAX: number;
  DST_TO_SRC_IAT_AVG: number;
  DST_TO_SRC_IAT_STDDEV: number;
  Label?: number;
  Attack?: AttackClass;
}

export interface ShapAttribution {
  feature: string;
  displayName: string;
  value: number;
  impact: number; // positive = pushes toward Attack, negative = pushes toward Benign
}

export type ModelId = 'gnb' | 'lr' | 'dt' | 'rf';

export interface ModelPrediction {
  modelId: ModelId;
  modelName: string;
  modelType: 'baseline' | 'improved';
  modelFamily: string;
  predictedClass: AttackClass;
  isAttack: boolean;
  confidence: number;
  attackProb: number;
  explanation: string;
}

export interface MultiModelInferenceResult {
  activeModel: ModelId;
  predictions: Record<ModelId, ModelPrediction>;
  consensus: {
    attackCount: number;
    benignCount: number;
    unanimous: boolean;
    majorityAttack: boolean;
  };
  attributions: ShapAttribution[];
}

export interface InferenceResult {
  predictedClass: AttackClass;
  isAttack: boolean;
  confidence: number;
  probabilities: Record<AttackClass, number>;
  anomalyScore: number;
  attributions: ShapAttribution[];
  multiModel?: MultiModelInferenceResult;
}

export interface CostMatrix {
  c00: number; // Correct Benign (reward / 0)
  c10: number; // False Alarm (Benign classified as Attack)
  c01: number; // Missed Attack (Attack classified as Benign - Critical!)
  c11: number; // Correct Attack Detection
}

export interface BayesRiskMetrics {
  threshold: number;
  priorAttack: number;
  totalBayesRisk: number;
  tp: number;
  fp: number;
  tn: number;
  fn: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
}

export interface LatentPoint {
  id: string;
  pca_x: number;
  pca_y: number;
  pca_z: number;
  attack: AttackClass;
  label: number;
  protocol: number;
  in_bytes: number;
  out_bytes: number;
  duration: number;
  src_ip: string;
  dst_ip: string;
  src_port: number;
  dst_port: number;
}
