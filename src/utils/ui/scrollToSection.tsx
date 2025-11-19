"use client";

import { useEffect } from "react";

type ScrollToSectionProps = {
  targetId: string;
  behavior?: ScrollBehavior;
};

export default function ScrollToSection({
  targetId,
  behavior = "smooth",
}: ScrollToSectionProps) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior, block: "start" });
    }
  }, [behavior, targetId]);

  return null;
}

