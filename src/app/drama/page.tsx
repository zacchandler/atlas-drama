import type { Metadata } from "next";
import { drama, clanById, contact } from "@/data/atlas";
import { PageHero, Heat } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import { EmptyState } from "@/components/inner/EmptyState";
import FooterContact from "@/components/sections/FooterContact";

export const metadata: Metadata = {
  title: "Drama Feed — Atlas Drama",
  description: "Beefs, betrayals, roster moves and the moments that start wars on Atlas Rust.",
};

export default function DramaPage() {
  return (
    <main className="bg-black">
      <PageHero
        label="Drama Feed"
        title="The Dr<i>a</i>ma"
        sub="Beefs, betrayals, roster moves and the moments that start wars. If it shook the server, it landed here first."
      />

      <section className="mx-auto w-full max-w-[920px] px-6 pb-[120px] md:px-[80px]">
        {drama.length === 0 ? (
          <EmptyState
            title="The drama feed goes live soon"
            message="Beefs, betrayals, roster moves and the moments that start wars — published as they break. Got intel, a clip, or some beef? Drop it in the Discord."
            ctaLabel="Submit drama on Discord"
            ctaHref={contact.discordUrl}
            badge="Published as it breaks"
          />
        ) : (
        <ol className="relative">
          {drama.map((post, i) => {
            const clans = post.clansInvolved.map(clanById).filter(Boolean);
            return (
              <Reveal key={post.id} delay={i * 70}>
                <li className="relative border-l border-white/12 pb-12 pl-8 last:border-l-transparent last:pb-0 md:pl-10">
                  <span
                    className="absolute -left-[6px] top-1 h-[11px] w-[11px] rounded-full"
                    style={{ background: "#d62727", boxShadow: "0 0 12px rgba(214,39,39,0.7)" }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-graphite">
                    <time>{post.date}</time>
                    <Heat level={post.heat} />
                    <div className="flex gap-2">
                      {clans.map((c) => (
                        <span key={c!.id} className="rounded-full px-2.5 py-0.5 text-[11px]" style={{ color: c!.accent, background: `${c!.accent}16`, border: `1px solid ${c!.accent}40` }}>
                          {c!.tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h2 className="mt-3 text-[26px] font-medium leading-[1.12] text-white md:text-[38px]">{post.title}</h2>

                  <div className="mt-4">
                    {post.body.map((para, j) => (
                      <p key={j} className="mt-3 text-[16px] leading-[1.65] text-smoke md:text-[18px]">{para}</p>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {post.tags.map((t) => (
                      <span key={t} className="text-[11px] uppercase tracking-[0.06em] text-graphite">#{t}</span>
                    ))}
                    {post.sources.map((s) => (
                      <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="text-[12px] text-[#d62727] hover:underline">
                        {s.label} →
                      </a>
                    ))}
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
        )}
      </section>

      <FooterContact />
    </main>
  );
}
