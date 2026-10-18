import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0\u00A0B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}\u00A0${sizes[i] || "TB"}`;
}

export function formatBps(bps: number): string {
  if (bps === 0) return "0\u00A0bps";
  if (bps >= 1_000_000) return `${(bps / 1_000_000).toFixed(1)}\u00A0Mbps`;
  if (bps >= 1_000) return `${(bps / 1_000).toFixed(1)}\u00A0Kbps`;
  return `${bps}\u00A0bps`;
}

export function formatDuration(ms: number): string {
  if (ms < 1) return "<1\u00A0ms";
  if (ms < 1000) return `${ms}\u00A0ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}\u00A0s`;
  return `${(ms / 60000).toFixed(1)}\u00A0min`;
}

export function getProtocolName(proto: number): string {
  switch (proto) {
    case 6: return "TCP (6)";
    case 17: return "UDP (17)";
    case 1: return "ICMP (1)";
    case 47: return "GRE (47)";
    case 50: return "ESP (50)";
    default: return `Proto ${proto}`;
  }
}

export function getAttackColor(attack: string): { bg: string; text: string; border: string; glow: string; dot: string; badgeBg: string } {
  switch (attack) {
    case "Benign":
      return { 
        bg: "bg-emerald-50/90", 
        text: "text-emerald-800", 
        border: "border-emerald-200", 
        glow: "shadow-glow-emerald", 
        dot: "bg-emerald-500",
        badgeBg: "bg-emerald-100/80 text-emerald-800 border-emerald-300"
      };
    case "DoS":
      return { 
        bg: "bg-rose-50/90", 
        text: "text-rose-800", 
        border: "border-rose-200", 
        glow: "shadow-glow-crimson", 
        dot: "bg-rose-600",
        badgeBg: "bg-rose-100 text-rose-800 border-rose-300"
      };
    case "Exploits":
    case "Shellcode":
      return { 
        bg: "bg-red-50/90", 
        text: "text-red-800", 
        border: "border-red-200", 
        glow: "shadow-glow-crimson", 
        dot: "bg-red-600",
        badgeBg: "bg-red-100 text-red-800 border-red-300"
      };
    case "Reconnaissance":
    case "Fuzzers":
      return { 
        bg: "bg-amber-50/90", 
        text: "text-amber-800", 
        border: "border-amber-200", 
        glow: "shadow-amber-500/10", 
        dot: "bg-amber-500",
        badgeBg: "bg-amber-100 text-amber-800 border-amber-300"
      };
    case "Backdoor":
    case "Worms":
      return { 
        bg: "bg-purple-50/90", 
        text: "text-purple-800", 
        border: "border-purple-200", 
        glow: "shadow-purple-500/10", 
        dot: "bg-purple-600",
        badgeBg: "bg-purple-100 text-purple-800 border-purple-300"
      };
    default:
      return { 
        bg: "bg-sky-50/90", 
        text: "text-sky-800", 
        border: "border-sky-200", 
        glow: "shadow-glow-cyan", 
        dot: "bg-sky-600",
        badgeBg: "bg-sky-100 text-sky-800 border-sky-300"
      };
  }
}
