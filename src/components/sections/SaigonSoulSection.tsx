// Drama-feed statement (#saigon-soul kept as the id/anchor) — label + statement
// paragraph (left) and gradient CTA pill (right). Server component; reveals via
// ScrollProvider (data-scroll -> .is-inview).

import { dramaStatement } from "@/data/atlas";

const pillCss = `
#saigon-soul .button--arrow {
  position: relative;
  background: var(--gradient-pill);
  color: #fff;
  transition: color 0.4s;
}
#saigon-soul .button--arrow::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 75px;
  background: #fff;
  opacity: 0;
  transition: opacity 0.4s;
}
#saigon-soul .button--arrow > * { position: relative; z-index: 1; }
#saigon-soul .button--arrow svg { transition: transform 0.4s; }
#saigon-soul .button--arrow:hover { color: #000; }
#saigon-soul .button--arrow:hover::before { opacity: 1; }
#saigon-soul .button--arrow:hover svg { transform: translate3d(50%, 0, 0); }
`;

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1 6h9.4M6.6 1.6L11 6l-4.4 4.4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export default function SaigonSoulSection() {
  const data = dramaStatement;

  return (
    <div id="saigon-soul" data-scroll="" data-scroll-repeat="true" data-scroll-call="SET_CURRENT_SECTION">
      <style>{pillCss}</style>
      <section
        data-scroll=""
        className="text-cta bg-black px-6 pt-[80px] md:min-h-[593px] md:px-[181px] md:pt-[120px]"
      >
        {/* → Drama Feed label */}
        <span data-scroll="" className="section-label reveal" style={{ color: "#ffffff" }}>
          <Arrow />
          {data.label}
        </span>

        <div className="mt-[40px] flex flex-col items-start md:mt-[57px] md:flex-row md:items-start md:justify-between">
          {/* Left: statement paragraph */}
          <p
            data-scroll=""
            className="reveal brand-i w-full text-[18px] md:w-[430px] md:text-[28.5px]"
            style={{ fontWeight: 300, lineHeight: 1.38, color: "#ffffff", textAlign: "left", textIndent: "1.5em" }}
          >
            {data.text}
          </p>

          {/* Right: gradient pill CTA */}
          <a
            href={data.ctaHref}
            className="button--arrow pill mt-10 inline-flex cursor-pointer items-center self-start md:mt-0"
            style={{ gap: "10px", padding: "19.44px 39.74px", fontSize: "12px", fontWeight: 400, lineHeight: "14.3px", whiteSpace: "nowrap" }}
          >
            <Arrow />
            <span>{data.ctaLabel}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
