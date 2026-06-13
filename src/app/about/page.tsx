import type { Metadata } from "next";
import { about, contact } from "@/data/atlas";
import { PageHero, ArrowR } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import FooterContact from "@/components/sections/FooterContact";

export const metadata: Metadata = {
  title: "What is Atlas Drama?",
  description: about.lead,
};

export default function AboutPage() {
  return (
    <main className="bg-black">
      <PageHero label={about.label} title={about.title} sub={about.lead} />

      <section className="mx-auto w-full max-w-[900px] px-6 pb-[120px] md:px-[80px]">
        <div className="max-w-[740px]">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="mt-5 text-[18px] leading-[1.65] text-smoke md:text-[21px]">{p}</p>
          ))}
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {about.points.map((pt, i) => (
            <Reveal key={i} delay={i * 60}>
              <li className="flex items-start gap-3 rounded-[10px] border border-white/10 bg-[#0c0c0e] p-5">
                <span className="mt-[3px] text-[#d62727]"><ArrowR size={13} /></span>
                <span className="text-[15px] leading-[1.4] text-white">{pt}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        <a
          href={contact.discordUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-flex items-center gap-3 rounded-full px-7 py-[14px] text-[14px] font-medium text-white no-underline transition-transform duration-300 hover:scale-[1.04]"
          style={{ background: "var(--gradient-mercury)", boxShadow: "0 10px 34px rgba(214,39,39,0.34)" }}
        >
          Join the Atlas Discord
        </a>
      </section>

      <FooterContact />
    </main>
  );
}
