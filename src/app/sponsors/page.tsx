import type { Metadata } from "next";
import { sponsors, contact } from "@/data/atlas";
import { PageHero } from "@/components/inner/ui";
import Reveal from "@/components/inner/Reveal";
import FooterContact from "@/components/sections/FooterContact";

export const metadata: Metadata = {
  title: "Sponsors — Atlas Drama",
  description: "The brands powering the Atlas Rust competitive scene.",
};

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2.5 7.5 6 11l5.5-7.5" stroke="#d62727" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5v8.5m0 0L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SponsorsPage() {
  const title = sponsors.find((s) => s.tier === "title");

  return (
    <main className="bg-black">
      <PageHero label="Sponsors" title="Sp<i>o</i>nsors" sub="The brands powering the Atlas Rust competitive scene." />

      <section className="mx-auto w-full max-w-[1100px] px-6 pb-[40px] md:px-[80px]">
        {title && (
          <Reveal>
            <div className="relative overflow-hidden rounded-[16px] border p-8 md:p-14" style={{ borderColor: "rgba(214,39,39,0.3)", background: "#0c0c0e" }}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-[420px] w-[420px]"
                style={{ background: "radial-gradient(circle, rgba(214,39,39,0.22), rgba(6,6,8,0) 70%)" }}
              />
              <span className="relative inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white">
                <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#d62727", boxShadow: "0 0 8px #d62727" }} />
                Official Sponsor
              </span>
              <h2 className="relative mt-5 text-[36px] font-bold leading-[0.92] text-white md:text-[64px]">
                POWERED BY
                <br />
                <span style={{ color: "#d62727" }}>{title.name.toUpperCase()}</span>
              </h2>
              <p className="relative mt-6 max-w-[640px] text-[16px] leading-[1.6] text-smoke md:text-[19px]">{title.blurb}</p>
              <ul className="relative mt-8 grid max-w-[640px] gap-3 sm:grid-cols-2">
                {title.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[15px] text-white/90">
                    <Check /> {f}
                  </li>
                ))}
              </ul>
              <div className="relative mt-10 flex flex-wrap items-center gap-6">
                <a
                  href={title.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-[16px] text-[15px] font-semibold text-white no-underline transition-transform duration-300 hover:scale-[1.03]"
                  style={{ background: "linear-gradient(180deg, #ff4d4d, #d62727)", boxShadow: "0 12px 34px rgba(214,39,39,0.45)" }}
                >
                  <DownloadIcon /> {title.downloadLabel}
                </a>
                {title.code && (
                  <span className="text-[14px] text-graphite">
                    Use code <span className="font-semibold text-white">{title.code}</span>
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* Become a sponsor */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pb-[120px] md:px-[80px]">
        <div className="rounded-[14px] border border-white/10 bg-[#0c0c0e] p-8 text-center md:p-12">
          <h3 className="text-[22px] text-white md:text-[28px]">Partner with Atlas Drama</h3>
          <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.6] text-smoke">
            Reach the most active competitive Rust community. Sponsorships, giveaways and product placements — let&rsquo;s talk.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px]">
            <a href={contact.discordUrl} target="_blank" rel="noreferrer" className="text-[#d62727] hover:underline">
              DM {contact.discord} on Discord →
            </a>
            <a href={`mailto:${contact.email}`} className="text-white/80 hover:underline">
              {contact.email}
            </a>
          </div>
        </div>
      </section>

      <FooterContact />
    </main>
  );
}
