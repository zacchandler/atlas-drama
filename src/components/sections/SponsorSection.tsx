import { sponsors } from "@/data/atlas";

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
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

export default function SponsorSection() {
  const s = sponsors[0];
  if (!s) return null;

  return (
    <section id="sponsor" className="relative bg-black px-6 py-[90px] md:px-[180px] md:py-[130px]">
      <div className="mx-auto max-w-[1078px]">
        <div className="relative overflow-hidden rounded-[16px] border p-8 md:p-14" style={{ borderColor: "rgba(214,39,39,0.3)", background: "#0c0c0e" }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-[380px] w-[380px]"
            style={{ background: "radial-gradient(circle, rgba(214,39,39,0.22), rgba(6,6,8,0) 70%)" }}
          />
          <span className="reveal relative inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white" data-scroll="">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: "#d62727", boxShadow: "0 0 8px #d62727" }} />
            Official Sponsor
          </span>
          <h2 className="reveal relative mt-5 text-[34px] font-bold leading-[0.92] text-white md:text-[58px]" data-scroll="">
            POWERED BY
            <br />
            <span style={{ color: "#d62727" }}>{s.name.toUpperCase()}</span>
          </h2>
          <p className="reveal relative mt-6 max-w-[600px] text-[16px] leading-[1.6] text-smoke md:text-[18px]" data-scroll="">
            {s.blurb}
          </p>
          <ul className="reveal relative mt-7 flex flex-wrap gap-x-7 gap-y-2.5" data-scroll="">
            {s.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[14px] text-white/90">
                <Check /> {f}
              </li>
            ))}
          </ul>
          <div className="reveal relative mt-9 flex flex-wrap items-center gap-6" data-scroll="">
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full px-8 py-[15px] text-[15px] font-semibold text-white no-underline transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: "linear-gradient(180deg, #ff4d4d, #d62727)", boxShadow: "0 12px 34px rgba(214,39,39,0.45)" }}
            >
              <DownloadIcon /> {s.downloadLabel}
            </a>
            {s.code && (
              <span className="text-[13px] text-graphite">
                Use code <span className="font-semibold text-white">{s.code}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
