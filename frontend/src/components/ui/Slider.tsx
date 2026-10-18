import React, { useId } from "react";
import { cn } from "../../lib/utils";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  displayFormatter?: (v: number) => string;
  onChange: (value: number) => void;
  className?: string;
  accentColor?: "cyan" | "threat" | "amber" | "emerald";
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  displayFormatter,
  onChange,
  className,
  accentColor = "cyan",
}: SliderProps) {
  const sliderId = useId();
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min || 1)) * 100));

  const accentStyles = {
    cyan: "accent-sky-600 text-sky-700",
    threat: "accent-rose-600 text-rose-700",
    amber: "accent-amber-600 text-amber-700",
    emerald: "accent-emerald-600 text-emerald-700",
  };

  const formattedValue = displayFormatter ? displayFormatter(value) : `${value}${unit ? `\u00A0${unit}` : ""}`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <label htmlFor={sliderId} className="text-slate-700 font-medium tracking-wide cursor-pointer select-none">
          {label}
        </label>
        <span className={cn("font-mono font-semibold tabular-nums", accentStyles[accentColor])}>
          {formattedValue}
        </span>
      </div>
      <div className="relative flex items-center">
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={formattedValue}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={cn(
            "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white transition-colors",
            accentStyles[accentColor]
          )}
          style={{
            background: `linear-gradient(to right, ${
              accentColor === "threat"
                ? "#E11D48"
                : accentColor === "emerald"
                ? "#059669"
                : accentColor === "amber"
                ? "#D97706"
                : "#0284C7"
            } 0%, ${
              accentColor === "threat"
                ? "#E11D48"
                : accentColor === "emerald"
                ? "#059669"
                : accentColor === "amber"
                ? "#D97706"
                : "#0284C7"
            } ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`,
          }}
        />
      </div>
    </div>
  );
}
