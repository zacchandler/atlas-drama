import type { Metadata } from "next";
import { bans, contact } from "@/data/atlas";
import { PageHero, SeverityTag } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import { EmptyState } from "@/components/inner/EmptyState";
import FooterContact from "@/components/sections/FooterContact";

export const metadata: Metadata = {
  title: "Hall of Shame — Atlas Drama",
  description: "The public Atlas Rust ban list. Cheaters, scammers and ban-evaders with Steam and Discord IDs.",
};

const SEV_COLOR: Record<string, string> = {
  cheating: "#ff3b3b",
  scamming: "#ffd700",
  "ban-evasion": "#ff5a3c",
  toxicity: "#9a9a9a",
};

export default function HallOfShame() {
  return (
    <main className="bg-black">
      <PageHero
        label="Hall of Shame"
        title="The Ban L<i>i</i>st"
        sub="Every cheater, scammer and ban-evader caught on Atlas. Steam and Discord IDs are public — name and shame."
      />

      <section className="mx-auto w-full max-w-[1100px] px-6 pb-[120px] md:px-[80px]">
        {bans.length === 0 ? (
          <EmptyState
            title="The ban list is being compiled"
            message="Cheaters, scammers and ban-evaders — published with their Steam and Discord IDs. Caught someone breaking the rules? Report them in the Discord."
            ctaLabel="Report a cheater on Discord"
            ctaHref={contact.discordUrl}
            badge="Updated every wipe"
          />
        ) : (
          <>
        <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.1em] text-graphite">
          <span>{bans.length} banned</span>
          <span>Updated every wipe</span>
        </div>

        <ul className="flex flex-col gap-4">
          {bans.map((b, i) => {
            const color = SEV_COLOR[b.severity] ?? "#9a9a9a";
            return (
              <Reveal key={b.id} delay={i * 50}>
                <li className="rounded-[10px] border border-white/10 bg-[#0c0c0e] p-5 transition-colors duration-300 hover:border-[#d62727]/40 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[8px] text-[20px] font-bold"
                        style={{ color, background: `${color}1a`, border: `1px solid ${color}40` }}
                        aria-hidden="true"
                      >
                        {b.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <h3 className="text-[20px] font-medium leading-tight text-white">{b.name}</h3>
                        {b.knownAs.length > 0 && (
                          <p className="mt-1 text-[12px] text-graphite">a.k.a {b.knownAs.join(", ")}</p>
                        )}
                      </div>
                    </div>
                    <SeverityTag severity={b.severity} />
                  </div>

                  <p className="mt-4 text-[15px] leading-[1.6] text-smoke">{b.reason}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/[0.07] pt-4 font-mono text-[12px]">
                    <span>
                      <span className="text-graphite">STEAM&nbsp;</span>
                      <span className="select-all text-white/80">{b.steamId}</span>
                    </span>
                    <span>
                      <span className="text-graphite">DISCORD&nbsp;</span>
                      <span className="select-all text-white/80">{b.discordId}</span>
                    </span>
                    {b.clanTag && b.clanTag !== "—" && (
                      <span>
                        <span className="text-graphite">CLAN&nbsp;</span>
                        <span className="text-white/80">{b.clanTag}</span>
                      </span>
                    )}
                    <span>
                      <span className="text-graphite">BANNED&nbsp;</span>
                      <span className="text-white/80">{b.date}</span>
                    </span>
                    {b.evidence && (
                      <a href={b.evidence} target="_blank" rel="noreferrer" className="ml-auto font-sans text-[#d62727] hover:underline">
                        Evidence →
                      </a>
                    )}
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-10 max-w-[640px] text-[13px] leading-[1.6] text-graphite">
          Banned unfairly or think there&rsquo;s a mistake? Appeals go through the Atlas Discord. IDs are listed for community awareness across the Atlas servers.
        </p>
          </>
        )}
      </section>

      <FooterContact />
    </main>
  );
}
