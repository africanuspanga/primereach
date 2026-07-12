"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Appears after scrolling; returns the visitor to the top of the page. */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full bg-ink text-white shadow-lg shadow-ink/30 transition-all duration-300 hover:bg-bronze hover:-translate-y-0.5 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
