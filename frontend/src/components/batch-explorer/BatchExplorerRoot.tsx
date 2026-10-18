import React from "react";
import { BatchExplorerProvider } from "../../context/BatchExplorerContext";
import { BatchSummaryMetrics } from "./BatchSummaryMetrics";
import { BatchFilterBar } from "./BatchFilterBar";
import { BatchVirtualTable } from "./BatchVirtualTable";
import { Card } from "../ui/Card";

export function BatchExplorerRoot() {
  return (
    <BatchExplorerProvider>
      <div className="space-y-6">
        <BatchSummaryMetrics />
        <Card variant="panel" className="p-4 sm:p-5 space-y-4">
          <BatchFilterBar />
          <BatchVirtualTable />
        </Card>
      </div>
    </BatchExplorerProvider>
  );
}
