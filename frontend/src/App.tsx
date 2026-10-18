import React, { useState, useTransition, useCallback } from "react";
import { Header } from "./components/layout/Header";
import { StatusBar } from "./components/layout/StatusBar";
import { FlowInspector } from "./components/flow-inspector";
import { BayesStudio } from "./components/bayes-studio";
import { BatchExplorer } from "./components/batch-explorer";
import { LatentSpace } from "./components/latent-space";
import { BenchmarkHubRoot } from "./components/benchmark-hub";
import { transitionView } from "./lib/viewTransitions";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("sandbox");
  const [isPending, startNavTransition] = useTransition();

  const handleTabChange = useCallback((newTab: string) => {
    if (newTab === activeTab) return;
    transitionView(() => {
      startNavTransition(() => {
        setActiveTab(newTab);
      });
    });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      <div>
        <Header activeTab={activeTab} onTabChange={handleTabChange} isNavigating={isPending} />
        
        <main
          id="main-content"
          tabIndex={-1}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 focus:outline-none scroll-mt-20"
          style={{ viewTransitionName: "page-content" }}
        >
          {activeTab === "sandbox" ? (
            <FlowInspector />
          ) : activeTab === "bayes" ? (
            <BayesStudio />
          ) : activeTab === "benchmark" ? (
            <BenchmarkHubRoot />
          ) : activeTab === "batch" ? (
            <BatchExplorer />
          ) : activeTab === "latent" ? (
            <LatentSpace />
          ) : null}
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
