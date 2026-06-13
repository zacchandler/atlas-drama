"use client";

import { useEffect, useState } from "react";
import { heroPhrases, site } from "@/data/atlas";

/**
 * Hero — Convert.mp4 video background with a grain + ember overlay, a large
 * stacked "ATLAS / DRAMA" wordmark on the left, and the cycling word-mask
 * phrases pushed down-and-right. Motion/easing preserved from the template.
 */

const CYCLE_MS = 4000;
const HERO_VIDEO = "/videos/convert-hero.mp4";
const DISCORD_URL = site.socials.find((s) => s.label === "Discord")?.url ?? "#";

function DiscordIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.182 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.333-.956 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.333-.946 2.419-2.157 2.419Z" />
    </svg>
  );
}

function Phrase({ first, second, state }: { first: string; second: string; state: "active" | "leaving" | "idle" }) {
  const inner = (part: string, delayMs: number) => {
    const style: React.CSSProperties = {
      transition: `transform .9s cubic-bezier(0.76, 0, 0.24, 1) ${delayMs}ms, opacity .9s cubic-bezier(0.76, 0, 0.24, 1) ${delayMs}ms`,
      transform:
        state === "active" ? "translate3d(0, 0%, 0)" : state === "leaving" ? "translate3d(0, 150%, 0)" : "translate3d(0, -150%, 0)",
      opacity: state === "active" ? 1 : 0,
    };
    return (
      <span className="word-mask">
        <span style={style} className="brand-i" dangerouslySetInnerHTML={{ __html: part }} />
      </span>
    );
  };

  return (
    <li
      className="absolute bottom-0 right-0 w-full text-right"
      style={{ fontFamily: "Roobert", fontSize: "clamp(22px, 3.6vw, 44px)", lineHeight: 1.12, fontWeight: 400 }}
      aria-hidden={state !== "active"}
    >
      <div>
        {inner(first, 0)} {inner(second, 120)}
      </div>
    </li>
  );
}

function ScrollBadge() {
  return (
    <button
      type="button"
      aria-label="Scroll down"
      className="absolute z-[2]"
      style={{ left: 40, bottom: 48, width: 80, height: 80, background: "none", border: "none", padding: 0 }}
      onClick={() => window.dispatchEvent(new CustomEvent("scroll-to-section", { detail: "#raids" }))}
    >
      <span className="block relative" style={{ width: 80, height: 80 }}>
        <svg viewBox="0 0 100 100" width="80" height="80" style={{ animation: "spin-slow 14s linear infinite" }}>
          <defs>
            <path id="scroll-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text fill="#fff" style={{ fontSize: 10, letterSpacing: 2.2, fontFamily: "var(--font-roobert)" }}>
            <textPath href="#scroll-circle">THE DRAMA NEVER WIPES&nbsp;&nbsp;•&nbsp;&nbsp;</textPath>
          </text>
        </svg>
        <svg viewBox="0 0 42 29" width="26" height="18" className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <circle cx="14.5" cy="14.5" r="13" fill="none" stroke="#d62727" strokeWidth="1.6" />
          <circle cx="27.5" cy="14.5" r="13" fill="none" stroke="#fff" strokeWidth="1.4" />
        </svg>
      </span>
    </button>
  );
}

export default function HeroSection() {
  const sentences = heroPhrases;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(-1);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => {
        setLeaving(a);
        return (a + 1) % sentences.length;
      });
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [sentences.length]);

  return (
    <div className="relative h-[640px] overflow-hidden bg-black md:h-[880px]" data-section-hero>
      {/* Convert video background */}
      <video className="absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO} autoPlay muted loop playsInline preload="auto" />

      {/* color + gradient overlay (keeps the video visible but legible + on-brand) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,6,8,0.45) 0%, rgba(6,6,8,0.62) 45%, rgba(6,6,8,0.9) 100%), radial-gradient(80% 75% at 74% 48%, rgba(214,39,39,0.26), rgba(6,6,8,0) 66%)",
        }}
      />
      {/* grain */}
      <div className="grain-overlay absolute inset-0" />
      {/* bottom fade into the black flow below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0" style={{ height: 140, background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 100%)" }} />

      {/* content */}
      <div id="intro-container" className="relative mx-auto h-full w-full max-w-[1320px]">
        {/* Big ATLAS / DRAMA wordmark + Discord CTA — top left */}
        <div className="absolute left-6 top-[96px] z-[2] md:left-[80px] md:top-[150px]">
          <h1 className="text-white" style={{ fontSize: "clamp(58px, 13vw, 168px)", fontWeight: 700, lineHeight: 0.84, letterSpacing: "-0.02em" }}>
            <span className="block">ATLAS</span>
            <span className="block" style={{ color: "#d62727" }}>DRAMA</span>
          </h1>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-3 rounded-full px-6 py-[13px] text-[14px] font-medium text-white no-underline transition-transform duration-300 hover:scale-[1.04] md:mt-9"
            style={{ background: "var(--gradient-mercury)", boxShadow: "0 10px 34px rgba(214,39,39,0.38)" }}
          >
            <DiscordIcon />
            <span>Join the Discord</span>
          </a>
        </div>

        {/* Cycling phrases — pushed down-and-right */}
        <div
          id="intro"
          data-scroll=""
          data-scroll-repeat="true"
          data-scroll-call="SET_CURRENT_SECTION"
          className="absolute right-6 z-[2] md:right-[80px]"
          style={{ bottom: "clamp(110px, 20vh, 188px)", width: "min(640px, 84vw)" }}
        >
          <ul className="relative" style={{ height: 120 }}>
            {sentences.map((s, i) => (
              <Phrase key={i} first={s.first} second={s.second} state={i === active ? "active" : i === leaving ? "leaving" : "idle"} />
            ))}
          </ul>
        </div>

        <ScrollBadge />
      </div>
    </div>
  );
}
