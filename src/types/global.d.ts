interface Window {
  gtag?: (
    command: "event" | "config" | "set" | "js" | string,
    targetId: string | Date,
    config?: {
      [key: string]: unknown;
    }
  ) => void;
}

