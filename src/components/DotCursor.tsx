"use client";

import { useEffect, useRef, useState } from "react";

const DOT_LERP = 0.18;
const PLAY_LERP = 0.12;

export default function DotCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const playRef = useRef<HTMLDivElement | null>(null);

  // Render nothing on touch devices.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const play = playRef.current;
    if (!dot || !play) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const state = {
      x: -100,
      y: -100,
      dotX: -100,
      dotY: -100,
      playX: -100,
      playY: -100,
      seen: false,
      overPlay: false,
    };

    const syncDotOpacity = () => {
      dot.style.opacity = state.seen && !state.overPlay ? "1" : "0";
    };

    const applyTarget = (el: Element | null) => {
      const grow = !!(el && el.closest('[data-cursor="grow"]'));
      const overPlay = !!(el && el.closest('[data-cursor="play"]'));
      const dark = !!(el && el.closest("[data-cursor-dark]"));
      dot.classList.toggle("is-grown", grow);
      dot.classList.toggle("is-dark", dark);
      play.classList.toggle("is-visible", overPlay);
      state.overPlay = overPlay;
      syncDotOpacity();
    };

    const onMove = (e: PointerEvent) => {
      state.x = e.clientX;
      state.y = e.clientY;
      if (!state.seen) {
        // First sighting: snap into place, then start following.
        state.seen = true;
        state.dotX = state.playX = e.clientX;
        state.dotY = state.playY = e.clientY;
        syncDotOpacity();
      }
    };

    const onOver = (e: PointerEvent) => {
      applyTarget(e.target instanceof Element ? e.target : null);
    };

    const onOut = (e: PointerEvent) => {
      const rel = e.relatedTarget instanceof Element ? e.relatedTarget : null;
      if (!rel) {
        // Pointer left the document — hide everything.
        state.seen = false;
        applyTarget(null);
        return;
      }
      applyTarget(rel);
    };

    let raf = 0;
    const loop = () => {
      // Snap (no lerp) under prefers-reduced-motion.
      const fDot = reduced.matches ? 1 : DOT_LERP;
      const fPlay = reduced.matches ? 1 : PLAY_LERP;
      state.dotX += (state.x - state.dotX) * fDot;
      state.dotY += (state.y - state.dotY) * fDot;
      state.playX += (state.x - state.playX) * fPlay;
      state.playY += (state.y - state.playY) * fPlay;
      dot.style.transform = `translate3d(${state.dotX}px, ${state.dotY}px, 0) translate(-50%, -50%)`;
      play.style.transform = `translate3d(${state.playX}px, ${state.playY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="dot-cursor"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div ref={playRef} className="play-cursor" aria-hidden="true">
        <span>Play</span>
      </div>
    </>
  );
}
