"use client";

import { useEffect, useState } from "react";
import { home } from "../data/home";

const STORAGE_KEY = "cookie-ok";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false); // in the DOM
  const [visible, setVisible] = useState(false); // animated in
  const [hoverAccept, setHoverAccept] = useState(false);
  const [hoverClose, setHoverClose] = useState(false);

  // Appear after 1.5s — never re-show once accepted/dismissed.
  useEffect(() => {
    let accepted = false;
    try {
      accepted = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage unavailable — show the banner anyway.
    }
    if (accepted) return;
    const t = window.setTimeout(() => setMounted(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  // Trigger the fade-up transition one frame after mounting.
  useEffect(() => {
    if (!mounted) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setVisible(true))
    );
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
    window.setTimeout(() => setMounted(false), 450);
  };

  if (!mounted) return null;

  return (
    <aside
      aria-label="Cookie notice"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 320,
        maxWidth: "calc(100vw - 48px)",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "18px 20px",
        background: "rgba(24, 24, 24, 0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        fontFamily: "Roobert, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <p
        style={{
          flex: 1,
          margin: 0,
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.35,
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        {home.cookie.text}{" "}
        <a
          href="https://monopo.vn/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {home.cookie.privacy_text}
        </a>
      </p>

      <button
        type="button"
        onClick={dismiss}
        onMouseEnter={() => setHoverAccept(true)}
        onMouseLeave={() => setHoverAccept(false)}
        style={{
          flexShrink: 0,
          padding: "6px 18px",
          border: 0,
          borderRadius: 75,
          fontFamily: "inherit",
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.2,
          background: hoverAccept ? "#ffffff" : "#636363",
          color: hoverAccept ? "#000000" : "#ffffff",
          cursor: "pointer",
          transition: "background 0.3s ease, color 0.3s ease",
        }}
      >
        {home.cookie.cta}
      </button>

      <button
        type="button"
        aria-label="Dismiss cookie notice"
        onClick={dismiss}
        onMouseEnter={() => setHoverClose(true)}
        onMouseLeave={() => setHoverClose(false)}
        style={{
          flexShrink: 0,
          width: 16,
          height: 16,
          padding: 0,
          background: "none",
          border: 0,
          color: "#ffffff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: hoverClose ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </button>
    </aside>
  );
}
