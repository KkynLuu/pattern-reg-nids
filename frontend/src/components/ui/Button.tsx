import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "telemetry";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className,
  variant = "secondary",
  size = "md",
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold hover:from-sky-500 hover:to-blue-500 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
    danger: "bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold hover:from-rose-500 hover:to-red-500 shadow-sm",
    ghost: "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent",
    telemetry: "bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 hover:border-sky-300 font-mono text-xs font-medium",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-xs rounded",
    md: "px-3.5 py-2 text-sm rounded-md",
    lg: "px-5 py-2.5 text-base rounded-md font-medium",
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 focus-visible:ring-offset-white",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
