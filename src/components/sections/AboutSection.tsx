import Link from "next/link";
import { about } from "@/data/atlas";

function Arrow({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 6h9.4M6.6 1.6 11 6l-4.4 4.4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black px-6 py-[90px] md:px-[180px] md:py-[140px]">
      <div className="mx-auto max-w-[1078px]">
        <span className="section-label reveal text-white" data-scroll="">
          <Arrow /> {about.label}
        </span>
        <h2
          className="brand-i reveal mt-8 max-w-[920px] text-[32px] font-light leading-[1.14] text-white md:text-[58px]"
          data-scroll=""
          dangerouslySetInnerHTML={{ __html: about.title }}
        />
        <p className="reveal mt-8 max-w-[680px] text-[18px] leading-[1.6] text-smoke md:text-[20px]" data-scroll="">
          {about.lead}
        </p>
        <ul className="mt-10 grid max-w-[880px] gap-4 sm:grid-cols-2">
          {about.points.map((pt, i) => (
            <li key={i} className="reveal flex items-start gap-3 text-[15px] leading-[1.4] text-white/90" data-scroll="">
              <span className="mt-1 text-[#d62727]"><Arrow size={13} /></span> {pt}
            </li>
          ))}
        </ul>
        <Link
          href="/about"
          className="reveal mt-10 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.08em] text-white transition-opacity duration-200 hover:opacity-60"
          data-scroll=""
        >
          Read more <Arrow />
        </Link>
      </div>
    </section>
  );
}
