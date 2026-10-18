import React from "react";
import { BayesStudioProvider } from "../../context/BayesStudioContext";
import { BayesThresholdSlider } from "./BayesThresholdSlider";
import { BayesCostMatrixControl } from "./BayesCostMatrixControl";
import { BayesConfusionMatrix } from "./BayesConfusionMatrix";
import { BayesRiskMeter } from "./BayesRiskMeter";
import { BayesRocCurve } from "./BayesRocCurve";
import { Card } from "../ui/Card";

export function BayesStudioRoot() {
  return (
    <BayesStudioProvider>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Decision & Cost Controls */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Card variant="panel">
            <BayesThresholdSlider />
          </Card>
          <Card variant="panel">
            <BayesCostMatrixControl />
          </Card>
        </div>

        {/* Right Column: Risk & Matrix Metrics */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <BayesRiskMeter />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="panel">
              <BayesConfusionMatrix />
            </Card>
            <Card variant="panel">
              <BayesRocCurve />
            </Card>
          </div>
        </div>
      </div>
    </BayesStudioProvider>
  );
}
