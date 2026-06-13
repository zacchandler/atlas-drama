import type { Metadata } from "next";
import Link from "next/link";
import { rankings, clanById } from "@/data/atlas";
import { PageHero, TierBadge, Movement, ArrowR } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import FooterContact from "@/components/sections/FooterContact";

export const metadata: Metadata = {
  title: "Power Rankings — Atlas Drama",
  description: "Weekly Atlas Rust clan power rankings with movement, tiers and the story behind every placement.",
};

export default function RankingsPage() {
  return (
    <main className="bg-black">
      <PageHero label="Power Rankings" title="P<i>o</i>wer Rank<i>i</i>ngs" sub={rankings.intro} />

      <section className="mx-auto w-full max-w-[1100px] px-6 pb-[120px] md:px-[80px]">
        <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.1em] text-graphite">
          <span className="text-white">{rankings.weekId}</span>
          <span>Generated {rankings.generatedAt}</span>
        </div>

        <ul>
          {rankings.entries.map((e, i) => {
            const clan = clanById(e.clanId);
            if (!clan) return null;
            return (
              <Reveal key={e.clanId} delay={i * 60}>
                <li>
                  <Link
                    href={`/clans/${clan.slug}`}
                    className="group flex items-center gap-4 border-b border-white/10 py-6 transition-colors duration-300 hover:bg-white/[0.02] md:gap-7"
                  >
                    <span className="w-[44px] shrink-0 text-[40px] font-light leading-none text-white/90 md:w-[72px] md:text-[64px]">
                      {e.rank}
                    </span>
                    <span className="w-[40px] shrink-0">
                      <Movement rank={e.rank} prev={e.prevRank} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <TierBadge tier={e.tier} />
                        <h3 className="truncate text-[22px] text-white md:text-[30px]">
                          {clan.name}{" "}
                          <span style={{ color: clan.accent }}>[{clan.tag}]</span>
                        </h3>
                      </div>
                      <p className="mt-1.5 line-clamp-1 text-[13px] text-smoke md:text-[14px]">{e.note}</p>
                    </div>
                    <div className="hidden shrink-0 text-right text-[13px] leading-tight text-graphite md:block">
                      <span className="text-white/85">{clan.points}</span> pts
                    </div>
                    <span className="shrink-0 text-graphite transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                      <ArrowR size={13} />
                    </span>
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <FooterContact />
    </main>
  );
}
