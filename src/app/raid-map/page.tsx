import type { Metadata } from "next";
import { raidMap, clanById } from "@/data/atlas";
import { PageHero } from "@/components/inner/ui";
import FooterContact from "@/components/sections/FooterContact";

export const metadata: Metadata = {
  title: "Raid Map — Atlas Drama",
  description: "Live Atlas Rust raid locations, updated by admins.",
};

const STATUS: Record<string, { color: string; label: string }> = {
  active: { color: "#d62727", label: "Active raid" },
  fresh: { color: "#ff5a3c", label: "Fresh — moving in" },
  aftermath: { color: "#9a9a9a", label: "Aftermath" },
};

export default function RaidMapPage() {
  return (
    <main className="bg-black">
      <PageHero label="Raid Map" title="Ra<i>i</i>d Map" sub={raidMap.note} />

      <section className="mx-auto w-full max-w-[1100px] px-6 pb-[120px] md:px-[80px]">
        {/* legend */}
        <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-graphite">
          <span className="text-white/80">{raidMap.seed}</span>
          {Object.entries(STATUS).map(([k, s]) => (
            <span key={k} className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} /> {s.label}
            </span>
          ))}
        </div>

        {/* map */}
        <div className="relative overflow-hidden rounded-[12px] border border-white/10">
          <img src={raidMap.image} alt="Atlas raid map" className="block w-full" />
          {raidMap.pins.map((pin) => {
            const clan = clanById(pin.clanId);
            const s = STATUS[pin.status];
            return (
              <div key={pin.id} className="group absolute z-[2] -translate-x-1/2 -translate-y-1/2" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
                <span className="relative flex h-4 w-4 cursor-pointer">
                  {pin.status !== "aftermath" && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: s.color }} />
                  )}
                  <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-black" style={{ background: s.color }} />
                </span>
                <div className="pointer-events-none absolute left-1/2 top-[24px] z-[3] hidden w-[210px] -translate-x-1/2 rounded-[8px] border border-white/15 bg-[#0c0c0e] p-3 text-left shadow-xl group-hover:block">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold" style={{ color: clan?.accent }}>{clan?.tag ?? "?"}</span>
                    <span className="text-[11px] text-graphite">{pin.grid}</span>
                  </div>
                  <p className="mt-1 text-[12px] leading-[1.4] text-smoke">{pin.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* active raids list */}
        <h2 className="mb-5 mt-12 text-[13px] uppercase tracking-[0.1em] text-graphite">{raidMap.pins.length} active pins</h2>
        <ul className="flex flex-col gap-3">
          {raidMap.pins.map((pin) => {
            const clan = clanById(pin.clanId);
            const s = STATUS[pin.status];
            return (
              <li key={pin.id} className="flex items-center gap-4 rounded-[10px] border border-white/10 bg-[#0c0c0e] p-4">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: s.color }} />
                <span className="w-[64px] shrink-0 text-[14px] font-semibold" style={{ color: clan?.accent }}>{clan?.tag ?? "?"}</span>
                <span className="flex-1 text-[14px] text-smoke">{pin.label}</span>
                <span className="shrink-0 text-[12px] text-graphite">{pin.grid}</span>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-[13px] text-graphite">
          Spotted a raid? Report it in the Atlas Discord — DM <span className="text-white/80">convertible</span>.
        </p>
      </section>

      <FooterContact />
    </main>
  );
}
