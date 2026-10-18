import { Shield, Activity, Terminal, Database, Loader2, Award } from "lucide-react";
import { Badge } from "../ui/Badge";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isNavigating?: boolean;
}

const NAV_TABS = [
  { id: "sandbox", label: "Model Arena & Sandbox", icon: Activity, badge: "Interactive" },
  { id: "bayes", label: "Bayes Decision Studio", icon: Shield, badge: "Risk Math" },
  { id: "benchmark", label: "Benchmark & Error Hub", icon: Award, badge: "Results" },
  { id: "batch", label: "Batch Traffic Explorer", icon: Database, badge: "NetFlow v3" },
  { id: "latent", label: "Latent Space & Clusters", icon: Terminal, badge: "PCA 2D/3D" },
] as const;

export function Header({ activeTab, onTabChange, isNavigating }: HeaderProps) {
  return (
    <header
      className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm"
      style={{ viewTransitionName: "persistent-header" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:font-semibold focus:rounded focus:ring-2 focus:ring-slate-900"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-lg bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center shadow-sm"
              aria-hidden="true"
            >
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-slate-900 font-mono text-base">
                  FlowLens<span className="text-sky-600">.IDS</span>
                </span>
                <Badge variant="cyan" size="sm">UNSW-NB15</Badge>
                {isNavigating ? (
                  <Loader2 className="h-3.5 w-3.5 text-sky-600 animate-spin" aria-label="Loading view…" />
                ) : null}
              </div>
              <p className="text-[11px] text-slate-500 font-mono tracking-tight hidden sm:block text-pretty">
                Pattern Recognition & Telemetry Workbench
              </p>
            </div>
          </div>

          <nav aria-label="Primary Navigation" className="flex items-center gap-1 sm:gap-2">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white ${
                    isActive
                      ? "bg-sky-50 text-sky-700 border border-sky-200 shadow-sm font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-sky-600" : "text-slate-500"}`} aria-hidden="true" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
