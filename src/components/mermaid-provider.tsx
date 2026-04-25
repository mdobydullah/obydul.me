"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function MermaidProvider() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      const mermaid = (await import("mermaid")).default;
      if (cancelled) return;

      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "default",
        securityLevel: "loose",
        fontFamily: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif",
        themeVariables: {
          fontSize: "14px",
        },
      });

      const elements = document.querySelectorAll<HTMLElement>(".mermaid");
      if (elements.length === 0) return;

      elements.forEach((el) => {
        if (!el.dataset.source) {
          el.dataset.source = el.textContent ?? "";
        } else {
          el.textContent = el.dataset.source;
        }
        el.removeAttribute("data-processed");
      });

      try {
        await mermaid.run({ querySelector: ".mermaid" });
      } catch (e) {
        console.error("mermaid render failed", e);
      }
    };
    render();
    return () => {
      cancelled = true;
    };
  }, [resolvedTheme]);

  return null;
}
