import type { Tier } from "@/data/atlas";

/* Shared visual primitives for inner routes. Server components. */

export function ArrowR({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 6h9.4M6.6 1.6 11 6l-4.4 4.4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function PageHero({
  label,
  title,
  sub,
}: {
  label: string;
  title: string; // may contain <i> brand markup
  sub?: string;
}) {
  return (
    <header className="relative mx-auto w-full max-w-[1200px] px-6 pt-[150px] pb-[52px] md:px-[80px] md:pt-[210px] md:pb-[72px]">
      {/* ember glow behind the title */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[40px] left-0 -z-10 h-[520px] w-full"
        style={{ background: "radial-gradient(48% 60% at 18% 30%, rgba(214,39,39,0.20), rgba(6,6,8,0) 70%)" }}
      />
      <span className="section-label text-white" style={{ fontWeight: 600 }}>
        <ArrowR /> {label}
      </span>
      <h1
        className="brand-i mt-6 text-[44px] font-light leading-[1.02] text-white md:text-[88px]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && <p className="mt-7 max-w-[680px] text-[16px] leading-[1.65] text-smoke md:text-[18px]">{sub}</p>}
    </header>
  );
}

const TIER_COLOR: Record<Tier, string> = { S: "#ff3b3b", A: "#d62727", B: "#9a9a9a", C: "#636363" };

export function TierBadge({ tier, size = 28 }: { tier: Tier; size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[5px] font-bold text-white"
      style={{ background: TIER_COLOR[tier], width: size, height: size, fontSize: size * 0.46 }}
      aria-label={`Tier ${tier}`}
    >
      {tier}
    </span>
  );
}

export function Movement({ rank, prev }: { rank: number; prev: number }) {
  const d = prev - rank; // positive => moved up
  if (d === 0) return <span className="text-[12px] text-graphite">—</span>;
  const up = d > 0;
  return (
    <span className="inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color: up ? "#34d17a" : "#ff5a3c" }}>
      {up ? "▲" : "▼"} {Math.abs(d)}
    </span>
  );
}

export function Heat({ level }: { level: number }) {
  return (
    <span className="inline-flex items-end gap-[3px]" aria-label={`Heat ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="block w-[4px] rounded-[1px]"
          style={{ height: 6 + i * 2, background: i <= level ? "#ff5a3c" : "rgba(255,255,255,0.14)" }}
        />
      ))}
    </span>
  );
}

const SEV: Record<string, { label: string; color: string }> = {
  cheating: { label: "Cheating", color: "#ff3b3b" },
  scamming: { label: "Scamming", color: "#ffd700" },
  "ban-evasion": { label: "Ban Evasion", color: "#ff5a3c" },
  toxicity: { label: "Toxicity", color: "#9a9a9a" },
};

export function SeverityTag({ severity }: { severity: string }) {
  const s = SEV[severity] ?? { label: severity, color: "#9a9a9a" };
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
      style={{ color: s.color, border: `1px solid ${s.color}55`, background: `${s.color}14` }}
    >
      {s.label}
    </span>
  );
}

export function scoreColor(score: number) {
  if (score >= 8.5) return "#ff3b3b";
  if (score >= 7) return "#d62727";
  if (score >= 5) return "#ff9f43";
  return "#9a9a9a";
}
