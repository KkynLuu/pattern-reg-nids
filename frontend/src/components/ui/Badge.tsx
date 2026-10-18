import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "cyan" | "threat" | "emerald" | "amber" | "outline";
  size?: "sm" | "md";
}

export function Badge({ children, className, variant = "default", size = "md", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    cyan: "bg-sky-50 text-sky-700 border-sky-200 font-semibold",
    threat: "bg-rose-50 text-rose-700 border-rose-200 font-semibold",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold",
    amber: "bg-amber-50 text-amber-700 border-amber-200 font-semibold",
    outline: "bg-transparent text-slate-600 border-slate-300",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-mono tracking-tight",
    md: "px-2.5 py-1 text-xs font-mono font-medium tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded border uppercase transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
