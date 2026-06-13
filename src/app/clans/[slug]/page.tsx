import type { Metadata } from "next";
import Link from "@/lib/Link";
import { notFound } from "next/navigation";
import { clans, raids, playerById, clanById } from "@/data/atlas";
import { asset } from "@/lib/asset";
import { TierBadge, scoreColor } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import FooterContact from "@/components/sections/FooterContact";

export function generateStaticParams() {
  return clans.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const clan = clans.find((c) => c.slug === slug);
  return { title: `${clan?.name ?? "Clan"} — Atlas Drama`, description: clan?.blurb };
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[24px] font-light text-white md:text-[30px]">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-graphite">{label}</div>
    </div>
  );
}

export default async function ClanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const clan = clans.find((c) => c.slug === slug);
  if (!clan) notFound();

  const roster = clan.roster.map(playerById).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const clanRaids = raids.filter((r) => r.attackerClanId === clan.id || r.defenderClanId === clan.id);

  return (
    <main className="bg-black">
      {/* Hero */}
      <header className="relative mx-auto w-full max-w-[1200px] px-6 pt-[140px] pb-[40px] md:px-[80px] md:pt-[200px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[40px] left-0 -z-10 h-[560px] w-full"
          style={{ background: `radial-gradient(46% 60% at 22% 28%, ${clan.accent}33, rgba(6,6,8,0) 70%)` }}
        />
        <Link href="/clans" className="text-[12px] uppercase tracking-[0.08em] text-graphite transition-colors hover:text-white">
          ← Clans
        </Link>
        <div className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-2">
          <h1 className="brand-i text-[52px] font-light leading-[0.95] text-white md:text-[96px]">{clan.name}</h1>
          <span className="text-[20px] md:text-[26px]" style={{ color: clan.accent }}>[{clan.tag}]</span>
          <span className="mb-2"><TierBadge tier={clan.tier} size={32} /></span>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-graphite">
          <span>Rank #{clan.rank}</span>
          <span>{clan.region}</span>
          <span>Est. {clan.founded}</span>
        </div>
      </header>

      {/* Stats + bio */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pb-[10px] md:px-[80px]">
        <div className="flex flex-wrap gap-x-14 gap-y-8 border-y border-white/10 py-8">
          <Stat label="Points" value={`${clan.points}`} />
          <Stat label="Tier" value={clan.tier} />
          <Stat label="Raids won" value={`${clan.record.raidsWon}`} />
          <Stat label="Wipes won" value={`${clan.record.wipesWon}`} />
          <Stat label="Roster" value={`${clan.roster.length}`} />
        </div>
        <p className="mt-10 max-w-[820px] text-[18px] leading-[1.6] text-smoke md:text-[22px]">
          {clan.bio || `${clan.name} sit at #${clan.rank} on the Atlas power rankings with ${clan.points} points. Full dossier coming soon.`}
        </p>
      </section>

      {/* Roster */}
      {roster.length > 0 && (
        <section className="mx-auto w-full max-w-[1200px] px-6 py-[70px] md:px-[80px]">
          <h2 className="mb-8 text-[13px] uppercase tracking-[0.1em] text-graphite">Roster</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roster.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[#0c0c0e]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={asset(p.avatar)} alt={p.handle} className="h-full w-full object-cover" loading="lazy" />
                    <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,6,8,0) 40%, rgba(6,6,8,0.85))" }} />
                    <div className="absolute bottom-3 left-4">
                      <h3 className="text-[18px] leading-tight text-white">{p.handle}</h3>
                      <span className="text-[11px] uppercase tracking-[0.06em]" style={{ color: clan.accent }}>{p.role}</span>
                    </div>
                  </div>
                  <div className="flex justify-between px-4 py-3 text-[11px] text-graphite">
                    <span><span className="text-white/80">{p.stats.kills}</span> kills</span>
                    <span><span className="text-white/80">{p.stats.raids}</span> raids</span>
                    <span><span className="text-white/80">{p.stats.hours}h</span></span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Recent raids */}
      {clanRaids.length > 0 && (
        <section className="mx-auto w-full max-w-[1200px] px-6 pb-[110px] md:px-[80px]">
          <h2 className="mb-8 text-[13px] uppercase tracking-[0.1em] text-graphite">Raids involving {clan.tag}</h2>
          <ul className="flex flex-col">
            {clanRaids.map((r) => {
              const atk = clanById(r.attackerClanId);
              const def = clanById(r.defenderClanId);
              return (
                <li key={r.id}>
                  <Link href={`/raids/${r.slug}`} className="group flex items-center gap-5 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.02]">
                    <span
                      className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[6px] text-[16px] font-bold text-white"
                      style={{ background: `linear-gradient(180deg, ${scoreColor(r.scores.overall)}, #7a0f0f)` }}
                    >
                      {r.scores.overall.toFixed(1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[18px] text-white md:text-[20px]">{r.title}</h3>
                      <p className="mt-0.5 text-[12px] uppercase tracking-[0.04em] text-graphite">{atk?.tag} vs {def?.tag} · {r.date}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <FooterContact />
    </main>
  );
}
