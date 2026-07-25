declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    fathom?: { trackEvent: (name: string) => void };
  }
}

/** Fires a custom analytics event if Plausible or Fathom is configured. No-op otherwise (safe to call anywhere). */
export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.plausible?.(name, props ? { props } : undefined);
  window.fathom?.trackEvent(name);
}
