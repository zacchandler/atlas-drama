"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/atlas";

function ArrowIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden="true"
      style={{
        flexShrink: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-8px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <path d="M0 5h12.5M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

function Wordmark({ dark }: { dark?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 6, whiteSpace: "nowrap" }}>
      <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1, letterSpacing: "0.04em" }}>
        {site.name}
      </span>
      <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1, letterSpacing: "0.04em", color: "#d62727" }}>
        {site.wordmarkSub}
      </span>
    </span>
  );
}

function SteamIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.98 2C6.74 2 2.43 6.03 2.03 11.17l5.36 2.22c.45-.31.99-.49 1.57-.49l.19.01 2.38-3.45v-.05a3.7 3.7 0 1 1 3.7 3.7h-.08l-3.4 2.43.01.16a2.78 2.78 0 1 1-5.54.27L2 14.36A10 10 0 1 0 11.98 2ZM8.88 17.18l-1.22-.5a2.08 2.08 0 0 0 1.07 1.02c1.06.44 2.28-.06 2.72-1.12a2.08 2.08 0 0 0-1.12-2.72l-1.27-.52c.49.18.9.55 1.12 1.07a2.08 2.08 0 0 1-1.3 2.79Zm7.97-5.32a2.47 2.47 0 1 1 0-4.93 2.47 2.47 0 0 1 0 4.93Zm0-.78a1.85 1.85 0 1 0 0-3.7 1.85 1.85 0 0 0 0 3.7Z" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("intro");
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onSectionChange = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) setActive(id);
    };
    window.addEventListener("section-change", onSectionChange);
    return () => window.removeEventListener("section-change", onSectionChange);
  }, []);

  // active when the route matches, or (on home) the scrolled section matches
  const isActive = (item: (typeof nav)[number]) =>
    (pathname !== "/" && pathname.startsWith(item.href)) || active === item.section;

  const isDarkText = active === "contact";

  const onSteamSignIn = () => {
    // TODO: wire Steam OpenID sign-in (needs a backend return handler).
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        pointerEvents: "none",
        color: isDarkText ? "#181818" : "#ffffff",
        transition: "color 0.4s ease",
        fontFamily: "Roobert, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ position: "relative", maxWidth: "1077.7px", margin: "0 auto", height: 0 }}>
        {/* Wordmark */}
        <Link
          href="/"
          className="left-6 lg:left-0"
          style={{
            position: "absolute",
            top: 34,
            pointerEvents: "auto",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Wordmark dark={isDarkText} />
        </Link>

        {/* Anchor nav — right-aligned vertical stack */}
        <nav
          className="hidden lg:flex"
          style={{ position: "absolute", right: 0, top: 34, flexDirection: "column", alignItems: "flex-end", pointerEvents: "auto" }}
        >
          {nav.map((item) => {
            const on = hovered === item.section || isActive(item);
            return (
              <Link
                key={item.section}
                href={item.href}
                onMouseEnter={() => setHovered(item.section)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  lineHeight: 1.8,
                  color: "inherit",
                  textDecoration: "none",
                  opacity: on ? 1 : 0.4,
                  transition: "opacity 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                <ArrowIcon visible={on} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          {/* Sign in with Steam */}
          <button
            type="button"
            onClick={onSteamSignIn}
            className="mt-[18px] inline-flex cursor-pointer items-center gap-2 rounded-full border border-current/25 bg-transparent px-4 py-2 text-[11px] uppercase tracking-[0.06em] text-current transition-colors duration-300 hover:border-[#d62727] hover:text-[#d62727]"
          >
            <SteamIcon />
            <span>Sign in</span>
          </button>
        </nav>

        {/* Burger — mobile only */}
        <button
          type="button"
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          style={{
            position: "absolute",
            right: 24,
            top: 36,
            width: 24,
            height: 9,
            padding: 0,
            background: "none",
            border: 0,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          <span style={{ display: "block", width: 24, height: 1, background: "currentColor" }} />
          <span style={{ display: "block", width: 24, height: 1, marginTop: 7, background: "currentColor" }} />
        </button>
      </div>

      {/* Fullscreen mobile menu — dark Atlas overlay */}
      {menuOpen && (
        <div
          className="lg:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            pointerEvents: "auto",
            background:
              "radial-gradient(120% 90% at 80% -10%, rgba(214,39,39,0.28), rgba(6,6,8,0) 55%), #060608",
            color: "#fff",
            overflowY: "auto",
          }}
        >
          <div style={{ position: "absolute", top: 34, left: 24 }}>
            <Wordmark />
          </div>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 28,
              right: 20,
              width: 32,
              height: 32,
              padding: 0,
              background: "none",
              border: 0,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>

          <nav style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 22, padding: "130px 24px 60px" }}>
            {nav.map((item) => (
              <Link
                key={item.section}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.2, color: "#fff", textAlign: "left", textDecoration: "none" }}
              >
                {item.menuLabel}
              </Link>
            ))}
            <button
              type="button"
              onClick={onSteamSignIn}
              className="mt-4 inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/30 bg-transparent px-6 py-3 text-[16px] text-white transition-colors duration-300 hover:border-[#d62727] hover:text-[#d62727]"
            >
              <SteamIcon size={18} />
              <span>Sign in with Steam</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
