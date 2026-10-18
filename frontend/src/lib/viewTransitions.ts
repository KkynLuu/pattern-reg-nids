import { startTransition } from "react";

/**
 * Executes a state update wrapped in the browser native View Transitions API
 * when supported, with automatic graceful fallback to React startTransition.
 */
export function transitionView(updateFn: () => void): void {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    (document as any).startViewTransition(() => {
      startTransition(updateFn);
    });
  } else {
    startTransition(updateFn);
  }
}
