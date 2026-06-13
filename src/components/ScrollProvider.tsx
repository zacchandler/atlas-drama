"use client";

import { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

/**
 * Locomotive Scroll v4 wrapper — same library + attribute API the original
 * site uses (data-scroll, data-scroll-speed, data-scroll-direction,
 * data-scroll-target, data-scroll-class, data-scroll-offset,
 * data-scroll-repeat, data-scroll-call).
 *
 * Bridges to the rest of the app via window CustomEvents:
 *  - emits  "section-change"    (detail: section id) on SET_CURRENT_SECTION calls
 *  - listens "scroll-to-section" (detail: selector) → locomotive scrollTo
 *  - listens "scroll-to-top"     → scrollTo(0)
 */
export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scroll: import("locomotive-scroll").default | null = null;
    let ro: ResizeObserver | null = null;
    let destroyed = false;

    const onScrollToSection = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      const el = document.querySelector<HTMLElement>(detail);
      if (el && scroll) scroll.scrollTo(el, { offset: 0, duration: 900 });
    };
    const onScrollToTop = () => {
      if (scroll) scroll.scrollTo(0, { duration: 900 });
    };

    // Add synchronously so home-page reveals stay hidden before Locomotive loads
    // (the CSS fallback reveals everything on pages WITHOUT this class).
    document.documentElement.classList.add("has-scroll-smooth");

    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      if (destroyed || !containerRef.current) return;

      scroll = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        tablet: { smooth: true, breakpoint: 1024 },
        smartphone: { smooth: true },
      });

      scroll.on("call", (func, way, obj) => {
        const name = Array.isArray(func) ? func[0] : func;
        if (name === "SET_CURRENT_SECTION" && way === "enter") {
          const id = obj.el.id || obj.el.getAttribute("data-section") || "";
          window.dispatchEvent(new CustomEvent("section-change", { detail: id }));
        }
      });

      window.addEventListener("scroll-to-section", onScrollToSection);
      window.addEventListener("scroll-to-top", onScrollToTop);

      // keep measurements fresh as media loads / layout settles
      ro = new ResizeObserver(() => scroll && scroll.update());
      ro.observe(containerRef.current);
      window.addEventListener("load", () => scroll && scroll.update());
      setTimeout(() => scroll && scroll.update(), 1200);
      setTimeout(() => scroll && scroll.update(), 3000);
    })();

    return () => {
      destroyed = true;
      window.removeEventListener("scroll-to-section", onScrollToSection);
      window.removeEventListener("scroll-to-top", onScrollToTop);
      if (ro) ro.disconnect();
      if (scroll) scroll.destroy();
      document.documentElement.classList.remove("has-scroll-smooth", "has-scroll-init");
    };
  }, []);

  return (
    <div data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
}
