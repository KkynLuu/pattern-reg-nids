import React from "react";
import { LatentScatterPlot } from "./LatentScatterPlot";
import { Card } from "../ui/Card";

export function LatentSpaceRoot() {
  return (
    <div className="space-y-6">
      <Card variant="panel" className="p-4 sm:p-5">
        <LatentScatterPlot />
      </Card>
    </div>
  );
}
