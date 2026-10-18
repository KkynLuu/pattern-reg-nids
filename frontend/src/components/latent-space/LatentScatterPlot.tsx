import React, { useState, useMemo, useCallback } from "react";
import { LATENT_SPACE_DATA } from "../../data/latentSpaceData";
import { LatentPoint } from "../../types/flow";
import { formatBytes, formatDuration } from "../../lib/utils";
import { Card } from "../ui/Card";

const WIDTH = 600;
const HEIGHT = 360;
const PAD = 40;

let MIN_X = Infinity, MAX_X = -Infinity;
let MIN_Y = Infinity, MAX_Y = -Infinity;

for (let i = 0; i < LATENT_SPACE_DATA.length; i++) {
  const p = LATENT_SPACE_DATA[i];
  if (p.pca_x < MIN_X) MIN_X = p.pca_x;
  if (p.pca_x > MAX_X) MAX_X = p.pca_x;
  if (p.pca_y < MIN_Y) MIN_Y = p.pca_y;
  if (p.pca_y > MAX_Y) MAX_Y = p.pca_y;
}

function getX(x: number): number {
  return PAD + ((x - MIN_X) / (MAX_X - MIN_X || 1)) * (WIDTH - PAD * 2);
}

function getY(y: number): number {
  return HEIGHT - PAD - ((y - MIN_Y) / (MAX_Y - MIN_Y || 1)) * (HEIGHT - PAD * 2);
}

const CLASS_COLORS: Record<string, string> = {
  Benign: "#059669",
  DoS: "#E11D48",
  Exploits: "#F43F5E",
  Reconnaissance: "#D97706",
  Generic: "#0284C7",
  Fuzzers: "#EA580C",
  Backdoor: "#9333EA",
  Shellcode: "#DB2777",
  Analysis: "#0284C7",
  Worms: "#7C3AED",
};

export function LatentScatterPlot() {
  const [selectedPoint, setSelectedPoint] = useState<LatentPoint | null>(null);
  const [filterClass, setFilterClass] = useState<string>("all");

  const handlePointClick = useCallback((pt: LatentPoint) => {
    setSelectedPoint(pt);
  }, []);

  const points = useMemo(() => {
    if (filterClass === "all") return LATENT_SPACE_DATA;
    return LATENT_SPACE_DATA.filter((p) => p.attack === filterClass);
  }, [filterClass]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-mono font-semibold text-slate-800 uppercase">
            UNSW-NB15 Latent Embedding Space (PCA 2D Projection)
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="latent-filter" className="sr-only">Filter latent space points by attack class</label>
            <select
              id="latent-filter"
              aria-label="Filter latent space points by attack class"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-mono text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-colors shadow-xs"
            >
              <option value="all">Display All Classes ({LATENT_SPACE_DATA.length} points)</option>
              <option value="Benign">Benign Cluster</option>
              <option value="DoS">DoS Cluster</option>
              <option value="Exploits">Exploits Cluster</option>
              <option value="Reconnaissance">Reconnaissance Cluster</option>
              <option value="Generic">Generic Cluster</option>
              <option value="Fuzzers">Fuzzers Cluster</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-50/90 rounded-lg border border-slate-200 p-2 flex justify-center overflow-hidden radar-grid shadow-xs">
          <svg
            width={WIDTH}
            height={HEIGHT}
            className="cursor-crosshair"
            role="graphics-document"
            aria-label="2D scatter plot visualization of NetFlow PCA embeddings"
          >
            <line x1={PAD} y1={HEIGHT / 2} x2={WIDTH - PAD} y2={HEIGHT / 2} stroke="#E2E8F0" strokeDasharray="3 3" />
            <line x1={WIDTH / 2} y1={PAD} x2={WIDTH / 2} y2={HEIGHT - PAD} stroke="#E2E8F0" strokeDasharray="3 3" />

            {points.map((pt) => {
              const isSelected = selectedPoint?.id === pt.id;
              const fill = CLASS_COLORS[pt.attack] || "#0284C7";

              return (
                <circle
                  key={pt.id}
                  cx={getX(pt.pca_x)}
                  cy={getY(pt.pca_y)}
                  r={isSelected ? 7 : 3.5}
                  tabIndex={0}
                  role="button"
                  aria-label={`${pt.attack} flow point ${pt.id}`}
                  className={`transition-colors duration-150 focus-visible:outline-none ${
                    isSelected ? "stroke-slate-900 stroke-2" : "opacity-85 hover:opacity-100"
                  }`}
                  fill={fill}
                  onClick={() => handlePointClick(pt as any)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handlePointClick(pt as any);
                    }
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="lg:col-span-4">
        <Card variant="panel" className="h-full flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono font-semibold text-slate-800 uppercase border-b border-slate-200 pb-2 mb-3">
              Flow Embedding Inspector
            </div>

            {selectedPoint ? (
              <div className="space-y-3 text-xs font-mono" aria-live="polite">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-medium">Ground Truth Class</div>
                  <div className="text-lg font-bold text-sky-700">{selectedPoint.attack}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div>
                    <div className="text-[10px] text-slate-500">PCA Component 1</div>
                    <div className="text-slate-900 font-semibold tabular-nums">{selectedPoint.pca_x}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">PCA Component 2</div>
                    <div className="text-slate-900 font-semibold tabular-nums">{selectedPoint.pca_y}</div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Source:</span>
                    <span className="text-slate-900 font-medium tabular-nums">{selectedPoint.src_ip}:{selectedPoint.src_port}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Destination:</span>
                    <span className="text-slate-900 font-medium tabular-nums">{selectedPoint.dst_ip}:{selectedPoint.dst_port}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Payload:</span>
                    <span className="text-slate-900 font-medium tabular-nums">{formatBytes(selectedPoint.in_bytes + selectedPoint.out_bytes)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Duration:</span>
                    <span className="text-slate-900 font-medium tabular-nums">{formatDuration(selectedPoint.duration)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs font-mono">
                Click any node on the 2D projection scatter plot to inspect its raw NetFlow telemetry attributes.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
