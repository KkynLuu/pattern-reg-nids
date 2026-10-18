import React from "react";
import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "panel" | "glow-cyan" | "glow-threat";
}

export function Card({ children, className, variant = "default", ...props }: CardProps) {
  const variantStyles = {
    default: "bg-white border-slate-200 shadow-sm",
    panel: "bg-white/95 backdrop-blur border-slate-200 shadow-sm",
    "glow-cyan": "bg-white/95 border-sky-300 shadow-glow-cyan",
    "glow-threat": "bg-rose-50/80 border-rose-200 shadow-glow-crimson",
  };

  return (
    <div
      className={cn(
        "rounded-lg border p-5 transition-all",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
