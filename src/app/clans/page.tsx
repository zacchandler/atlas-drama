import type { Metadata } from "next";
import Link from "@/lib/Link";
import { clans } from "@/data/atlas";
import { PageHero, TierBadge } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import FooterContact from "@/components/sections/FooterContact";

export const metadata: Metadata = {
  title: "Clans — Atlas Drama",
  description: "Every clan in the Atlas Rust main scene — records, rosters and rivalries.",
};

export default function ClansPage() {
  const ordered = [...clans].sort((a, b) => a.rank - b.rank);
  return (
    <main className="bg-black">
      <PageHero label="Clans" title="The Cl<i>a</i>ns" sub="Every clan in the Atlas main scene — records, rosters and the rivalries that define the wipe." />

      <section className="mx-auto w-full max-w-[1100px] px-6 pb-[120px] md:px-[80px]">
        <div className="grid gap-5 md:grid-cols-2">
          {ordered.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <Link
                href={`/clans/${c.slug}`}
                className="group block overflow-hidden rounded-[12px] border border-white/10 bg-[#0c0c0e] transition-colors duration-300 hover:border-white/25"
              >
                <div className="relative h-[128px] overflow-hidden" style={{ background: `linear-gradient(120deg, ${c.accent}33, rgba(6,6,8,0) 70%)` }}>
                  <span className="absolute left-5 top-4 text-[12px] tracking-[0.06em] text-graphite">#{c.rank} · {c.region}</span>
                  <span className="absolute right-4 top-4"><TierBadge tier={c.tier} /></span>
                  <div className="absolute bottom-4 left-5">
                    <h3 className="text-[26px] leading-none text-white md:text-[30px]">{c.name}</h3>
                    <span className="text-[13px]" style={{ color: c.accent }}>[{c.tag}]</span>
                  </div>
                  <span className="absolute bottom-0 left-0 h-[3px] w-full" style={{ background: c.accent }} />
                </div>
                <div className="p-5">
                  <p className="text-[14px] leading-[1.5] text-smoke">{c.blurb || `Ranked #${c.rank} in the Atlas main scene.`}</p>
                  <div className="mt-4 flex gap-6 text-[12px] text-graphite">
                    <span><span className="text-white/80">{c.points}</span> points</span>
                    <span>Tier <span className="text-white/80">{c.tier}</span></span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FooterContact />
    </main>
  );
}
