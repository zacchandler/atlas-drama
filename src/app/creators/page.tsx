import type { Metadata } from "next";
import { creatorProgram } from "@/data/atlas";
import { PageHero, ArrowR } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import FooterContact from "@/components/sections/FooterContact";

export const metadata: Metadata = {
  title: "Creators — Atlas Drama",
  description: creatorProgram.intro,
};

export default function CreatorsPage() {
  return (
    <main className="bg-black">
      <PageHero label={creatorProgram.label} title={creatorProgram.title} sub={creatorProgram.intro} />

      <section className="mx-auto w-full max-w-[1100px] px-6 pb-[120px] md:px-[80px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {creatorProgram.resources.map((r, i) => (
            <Reveal key={r.title} delay={i * 40}>
              <div className="h-full rounded-[12px] border border-white/10 bg-[#0c0c0e] p-5 transition-colors duration-300 hover:border-[#d62727]/40">
                <h3 className="text-[15px] font-semibold text-white">{r.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.5] text-smoke">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-[14px] border border-white/10 bg-[#0c0c0e] p-7 md:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-[320px] w-[320px]"
            style={{ background: "radial-gradient(circle, rgba(214,39,39,0.22), rgba(6,6,8,0) 70%)" }}
          />
          <h2 className="relative text-[24px] text-white md:text-[32px]">Apply as an Atlas creator</h2>
          <p className="relative mt-3 max-w-[560px] text-[15px] leading-[1.6] text-smoke">
            Applications are reviewed manually. Access and resources are granted to approved Atlas creators only.
          </p>
          <div className="relative mt-7">
            <span className="text-[12px] uppercase tracking-[0.08em] text-graphite">Requirements</span>
            <ul className="mt-3 flex flex-col gap-2.5">
              {creatorProgram.requirements.map((req) => (
                <li key={req} className="flex items-center gap-3 text-[15px] text-white">
                  <span className="text-[#d62727]"><ArrowR size={12} /></span> {req}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={creatorProgram.applyUrl}
            target="_blank"
            rel="noreferrer"
            className="relative mt-8 inline-flex items-center gap-3 rounded-full px-7 py-[14px] text-[14px] font-medium text-white no-underline transition-transform duration-300 hover:scale-[1.04]"
            style={{ background: "var(--gradient-mercury)", boxShadow: "0 10px 34px rgba(214,39,39,0.34)" }}
          >
            Apply on Discord — DM {creatorProgram.applyContact}
          </a>
        </div>
      </section>

      <FooterContact />
    </main>
  );
}
