import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { raids, clanById } from "@/data/atlas";
import { asset } from "@/lib/asset";
import { scoreColor } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import FooterContact from "@/components/sections/FooterContact";

export function generateStaticParams() {
  return raids.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const raid = raids.find((r) => r.slug === slug);
  return { title: `${raid?.title ?? "Raid Review"} — Atlas Drama`, description: raid?.writeup[0] };
}

function SubScore({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] uppercase tracking-[0.06em] text-graphite">{label}</span>
        <span className="text-[14px] text-white">{value.toFixed(1)}</span>
      </div>
      <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-white/8">
        <div className="h-full rounded-full" style={{ width: `${value * 10}%`, background: scoreColor(value) }} />
      </div>
    </div>
  );
}

export default async function RaidPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raid = raids.find((r) => r.slug === slug);
  if (!raid) notFound();

  const atk = clanById(raid.attackerClanId);
  const def = clanById(raid.defenderClanId);
  const overallColor = scoreColor(raid.scores.overall);

  return (
    <main className="bg-black">
      {/* Hero with darkened thumbnail */}
      <header className="relative overflow-hidden">
        <img src={asset(raid.thumb)} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,6,8,0.6) 0%, rgba(6,6,8,0.78) 55%, #000 100%)" }} />
        <div className="relative mx-auto w-full max-w-[1100px] px-6 pt-[140px] pb-[56px] md:px-[80px] md:pt-[210px]">
          <Link href="/raids" className="text-[12px] uppercase tracking-[0.08em] text-white/60 transition-colors hover:text-white">
            ← Raid Reviews
          </Link>
          <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[12px] uppercase tracking-[0.06em] text-white/70">
            <span style={{ color: atk?.accent }}>{atk?.tag}</span>
            <span className="text-white/40">vs</span>
            <span style={{ color: def?.accent }}>{def?.tag}</span>
            <span className="text-white/40">·</span>
            <span>{raid.type}</span>
            <span className="text-white/40">·</span>
            <span>{raid.date}</span>
          </p>
          <h1 className="brand-i mt-3 max-w-[900px] text-[40px] font-light leading-[1.05] text-white md:text-[72px]">{raid.title}</h1>
          <p className="mt-4 text-[13px] text-white/60">{raid.server}</p>
        </div>
      </header>

      {/* Scorecard */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-[60px] md:px-[80px]">
        <div className="grid gap-10 rounded-[14px] border border-white/10 bg-[#0c0c0e] p-7 md:grid-cols-[200px_1fr] md:p-9">
          <div className="flex flex-col items-center justify-center border-b border-white/10 pb-7 md:border-b-0 md:border-r md:pb-0 md:pr-9">
            <span className="text-[72px] font-bold leading-none md:text-[88px]" style={{ color: overallColor }}>
              {raid.scores.overall.toFixed(1)}
            </span>
            <span className="mt-2 text-[11px] uppercase tracking-[0.14em] text-graphite">Overall score</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <SubScore label="Execution" value={raid.scores.execution} />
            <SubScore label="Intel" value={raid.scores.intel} />
            <SubScore label="Defence" value={raid.scores.defense} />
            <SubScore label="Entertainment" value={raid.scores.entertainment} />
          </div>
        </div>

        {/* meta stats */}
        <div className="mt-6 flex flex-wrap gap-x-12 gap-y-5 border-y border-white/10 py-7 text-[14px]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.08em] text-graphite">Cost</div>
            <div className="mt-1 text-white">{raid.costEstimate}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.08em] text-graphite">Loot taken</div>
            <div className="mt-1 text-white">{raid.lootValue}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.08em] text-graphite">Outcome</div>
            <div className="mt-1 capitalize text-white">{raid.outcome}</div>
          </div>
        </div>

        {/* writeup */}
        <div className="mt-12 max-w-[760px]">
          {raid.writeup.map((para, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="mt-5 text-[18px] leading-[1.65] text-smoke md:text-[21px]">{para}</p>
            </Reveal>
          ))}
        </div>

        {/* clans */}
        <div className="mt-12 flex flex-wrap gap-4">
          {[atk, def].filter(Boolean).map((c) => (
            <Link key={c!.id} href={`/clans/${c!.slug}`} className="rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-white transition-colors hover:border-white/40" style={{ borderColor: `${c!.accent}55` }}>
              View {c!.name} →
            </Link>
          ))}
        </div>
      </section>

      <FooterContact />
    </main>
  );
}
