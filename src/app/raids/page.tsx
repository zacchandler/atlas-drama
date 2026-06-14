import type { Metadata } from "next";
import Link from "@/lib/Link";
import { raids, clanById, contact, type Raid } from "@/data/atlas";
import { asset } from "@/lib/asset";
import { PageHero, scoreColor } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import { EmptyState } from "@/components/inner/EmptyState";
import FooterContact from "@/components/sections/FooterContact";

export const metadata: Metadata = {
  title: "Raid Reviews — Atlas Drama",
  description: "Every major Atlas Rust raid, scored 0–10 on execution, intel, defence and entertainment.",
};

const OUTCOME: Record<Raid["outcome"], string> = {
  success: "Raid won",
  failed: "Failed",
  trade: "Trade",
  abandoned: "Abandoned",
};

export default function RaidsPage() {
  return (
    <main className="bg-black">
      <PageHero
        label="Raid Reviews"
        title="Ra<i>i</i>d Rev<i>i</i>ews"
        sub="Every major raid, scored 0–10 on execution, intel, defence and pure entertainment. The biggest hits, broken down."
      />

      <section className="mx-auto w-full max-w-[1100px] px-6 pb-[120px] md:px-[80px]">
        {raids.length === 0 ? (
          <EmptyState
            title="Raid reviews drop after each wipe"
            message="Scored breakdowns of the biggest raids go live after every force wipe. Seen a raid worth reviewing? Report it in the Discord."
            ctaLabel="Report a raid on Discord"
            ctaHref={contact.discordUrl}
          />
        ) : (
          <div className="grid gap-7 md:grid-cols-2">
            {raids.map((raid, i) => {
              const atk = clanById(raid.attackerClanId);
              const def = clanById(raid.defenderClanId);
              return (
                <Reveal key={raid.id} delay={i * 60}>
                  <Link href={`/raids/${raid.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[10px]">
                      <img
                        src={asset(raid.thumb)}
                        alt={raid.title}
                        loading="lazy"
                        className="h-full w-full object-cover brightness-[.8] transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-100"
                      />
                      <span
                        className="absolute left-4 top-4 flex h-[58px] w-[58px] flex-col items-center justify-center rounded-[5px] font-bold leading-none text-white"
                        style={{ background: `linear-gradient(180deg, ${scoreColor(raid.scores.overall)}, #7a0f0f)`, boxShadow: "0 6px 20px rgba(214,39,39,0.5)" }}
                      >
                        <span className="text-[20px]">{raid.scores.overall.toFixed(1)}</span>
                        <span className="mt-[3px] text-[8px] uppercase tracking-[0.12em] opacity-80">Score</span>
                      </span>
                    </div>
                    <h3 className="mt-4 text-[22px] leading-tight text-white md:text-[26px]">{raid.title}</h3>
                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.05em] text-ash">
                      {atk?.tag} vs {def?.tag} &nbsp;·&nbsp; {OUTCOME[raid.outcome]} &nbsp;·&nbsp; {raid.type}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      <FooterContact />
    </main>
  );
}
