"use client";

import { useEffect, useState } from "react";
import { sponsors } from "@/data/atlas";

const DISMISS_KEY = "atlas-sponsor-banner";

function Bolt({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 21v-7H6.5L13 3v7h4.5L11 21Z" />
    </svg>
  );
}
function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2.5 7.5 6 11l5.5-7.5" stroke="#d62727" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Download() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5v8.5m0 0L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function X({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1.5 1.5l11 11m0-11l-11 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function SponsorBanner() {
  const s = sponsors[0];
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      // ignore
    }
    if (dismissed) return;
    const t = window.setTimeout(() => setMounted(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dismiss = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
    window.setTimeout(() => setMounted(false), 400);
  };

  if (!s) return null;

  return (
    <>
      {mounted && (
        <div
          className="sb-wrap"
          style={{
            position: "fixed",
            left: 24,
            bottom: 24,
            zIndex: 55,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <button type="button" className="sb-card" onClick={() => setOpen(true)} aria-label={`Official sponsor — ${s.name}`}>
            <span className="sb-icon">
              <Bolt />
            </span>
            <span className="sb-text">
              <span className="sb-label">Official Sponsor</span>
              <span className="sb-name">{s.name}</span>
            </span>
            <span className="sb-arrow" aria-hidden="true">→</span>
          </button>
          <button type="button" className="sb-x" onClick={dismiss} aria-label="Dismiss sponsor">
            <X size={11} />
          </button>
        </div>
      )}

      {open && (
        <div className="sb-backdrop" role="dialog" aria-modal="true" aria-label={`${s.name} sponsor`} onClick={() => setOpen(false)}>
          <div className="sb-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="sb-modal-x" onClick={() => setOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
            <span className="sb-glow" aria-hidden="true" />
            <span className="sb-modal-label">
              <i className="sb-dot" /> Official Sponsor
            </span>
            <h2 className="sb-modal-h">
              POWERED BY
              <br />
              <span>{s.name.toUpperCase()}</span>
            </h2>
            <p className="sb-modal-p">{s.blurb}</p>
            <ul className="sb-modal-feat">
              {s.features.map((f) => (
                <li key={f}>
                  <Check /> {f}
                </li>
              ))}
            </ul>
            <div className="sb-modal-cta">
              <a className="sb-dl" href={s.url} target="_blank" rel="noreferrer">
                <Download /> {s.downloadLabel}
              </a>
              {s.code && (
                <span className="sb-code">
                  Use code <b>{s.code}</b>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sb-wrap { font-family: Roobert, ui-sans-serif, system-ui, sans-serif; }
        .sb-card {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 18px 11px 13px;
          background: rgba(12,12,14,0.82);
          -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 13px; cursor: pointer; color: #fff;
          box-shadow: 0 12px 32px rgba(0,0,0,0.5);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .sb-card:hover { transform: translateY(-2px); border-color: rgba(214,39,39,0.55); box-shadow: 0 16px 40px rgba(0,0,0,0.55), 0 0 26px rgba(214,39,39,0.28); }
        .sb-icon { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 9px; background: linear-gradient(180deg, #ff4d4d, #d62727); color: #fff; box-shadow: 0 4px 14px rgba(214,39,39,0.5); flex-shrink: 0; }
        .sb-text { display: flex; flex-direction: column; text-align: left; line-height: 1.18; }
        .sb-label { font-size: 9px; letter-spacing: 0.13em; text-transform: uppercase; color: #d62727; font-weight: 600; }
        .sb-name { font-size: 15px; font-weight: 600; color: #fff; }
        .sb-arrow { margin-left: 2px; color: #9a9a9a; transition: transform 0.3s ease, color 0.3s ease; }
        .sb-card:hover .sb-arrow { color: #fff; transform: translateX(3px); }
        .sb-x { position: absolute; top: -8px; right: -8px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #1a1a1d; border: 1px solid rgba(255,255,255,0.15); color: #9a9a9a; cursor: pointer; opacity: 0; transition: opacity 0.2s ease, color 0.2s ease, background 0.2s ease; }
        .sb-wrap:hover .sb-x { opacity: 1; }
        .sb-x:hover { color: #fff; background: #262629; }

        .sb-backdrop { position: fixed; inset: 0; z-index: 90; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(2,2,4,0.72); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); animation: sbFade 0.25s ease; }
        .sb-modal { position: relative; width: 100%; max-width: 520px; overflow: hidden; border-radius: 18px; border: 1px solid rgba(214,39,39,0.3); background: #0c0c0e; padding: 38px 34px; color: #fff; animation: sbPop 0.32s cubic-bezier(0.19,1,0.22,1); }
        .sb-glow { position: absolute; right: -70px; top: -70px; width: 340px; height: 340px; pointer-events: none; background: radial-gradient(circle, rgba(214,39,39,0.26), rgba(6,6,8,0) 70%); }
        .sb-modal-x { position: absolute; top: 18px; right: 18px; background: none; border: 0; padding: 4px; color: #9a9a9a; cursor: pointer; transition: color 0.2s ease; }
        .sb-modal-x:hover { color: #fff; }
        .sb-modal-label { position: relative; display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; }
        .sb-dot { width: 7px; height: 7px; border-radius: 50%; background: #d62727; box-shadow: 0 0 8px #d62727; }
        .sb-modal-h { position: relative; margin: 18px 0 0; font-size: 40px; font-weight: 700; line-height: 0.94; }
        .sb-modal-h span { color: #d62727; }
        .sb-modal-p { position: relative; margin-top: 16px; max-width: 430px; font-size: 15px; line-height: 1.6; color: #9a9a9a; }
        .sb-modal-feat { position: relative; margin: 24px 0 0; display: grid; grid-template-columns: 1fr 1fr; gap: 11px; list-style: none; padding: 0; }
        .sb-modal-feat li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: rgba(255,255,255,0.9); }
        .sb-modal-cta { position: relative; margin-top: 30px; display: flex; flex-wrap: wrap; align-items: center; gap: 20px; }
        .sb-dl { display: inline-flex; align-items: center; gap: 10px; padding: 14px 26px; border-radius: 999px; background: linear-gradient(180deg, #ff4d4d, #d62727); color: #fff; font-size: 15px; font-weight: 600; text-decoration: none; box-shadow: 0 12px 30px rgba(214,39,39,0.45); transition: transform 0.3s ease; }
        .sb-dl:hover { transform: scale(1.03); }
        .sb-code { font-size: 13px; color: #9a9a9a; }
        .sb-code b { color: #fff; font-weight: 600; }

        @keyframes sbFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sbPop { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: none; } }

        @media (max-width: 600px) {
          .sb-wrap { left: 16px; bottom: 16px; }
          .sb-modal { padding: 30px 22px; }
          .sb-modal-h { font-size: 30px; }
          .sb-modal-feat { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
