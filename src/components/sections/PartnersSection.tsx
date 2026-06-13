import { Fragment } from "react";
import { sceneClans } from "@/data/atlas";
import { asset } from "@/lib/asset";

/**
 * PartnersSection — the clan roll-call ("the clans in the scene").
 * Repurposed from monopo's "They trust us" client wall: same staggered
 * word-mask reveal (CSS-only, per-word transition-delay = index * 35ms),
 * driven by ScrollProvider toggling `.is-inview` on `.brands`.
 */

function BrandText({ text }: { text: string }) {
  if (text.includes("<i>")) {
    return <span className="brand-i" dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return <>{text}</>;
}

export default function PartnersSection() {
  const brandNames = sceneClans;

  return (
    <section
      id="partners"
      style={{
        position: "relative",
        isolation: "isolate",
        marginTop: "191.232px",
        textAlign: "center",
        color: "#ffffff",
      }}
    >
      {/* Red glow, bottom-left — behind all content (was amber bg-light) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-299.952px",
          left: 0,
          width: "1077.69px",
          maxWidth: "100%",
          height: "889.484px",
          zIndex: -1,
          pointerEvents: "none",
          background:
            "radial-gradient(50% 45% at 22% 55%, rgba(214,39,39,0.20), rgba(6,6,8,0) 70%)",
        }}
      />

      {/* small label */}
      <span
        className="sentence"
        data-scroll=""
        style={{
          display: "inline-block",
          fontSize: "10.512px",
          fontWeight: 600,
          lineHeight: "12.816px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#ffffff",
        }}
      >
        The clans in the scene
      </span>

      {/* clan-name word reveal (one .word-mask per name, 35ms stagger) */}
      <div
        className="brands"
        data-scroll=""
        data-scroll-call="ANIMATE_BRAND_WORDS"
        style={{ margin: "74.304px auto 0", maxWidth: "855px" }}
      >
        {brandNames.map((name, i) => {
          const isLast = i === brandNames.length - 1;
          return (
            <Fragment key={name}>
              <span className="word-mask">
                <span style={{ transitionDelay: `${i * 35}ms` }}>
                  <BrandText text={name} />
                  {isLast ? "." : ","}
                </span>
              </span>
              {!isLast && " "}
            </Fragment>
          );
        })}
      </div>

      {/* CTA pill → Power Rankings */}
      <a
        className="button--arrow pill"
        href={asset("/rankings")}
        style={{
          position: "relative",
          zIndex: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginTop: "74.304px",
          padding: "19.44px 39.744px",
          maxWidth: "100%",
          borderRadius: "75px",
          background: "var(--gradient-pill)",
          color: "#ffffff",
          fontSize: "11.952px",
          fontWeight: 400,
          lineHeight: "14.256px",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
          <path d="M6.59 1.41 5.74 2.26 8.88 5.4H0.6v1.2h8.28L5.74 9.74l.85.85L11.4 6 6.59 1.41Z" fill="currentColor" />
        </svg>
        <span>View this week&rsquo;s Power Rankings</span>
      </a>

      {/* Component-local reveal + hover styles */}
      <style>{`
        #partners .sentence { opacity: 0; transition: opacity 0.8s linear 0.1s; }
        #partners .sentence.is-inview { opacity: 1; }

        #partners .brands .word-mask {
          font-size: 36px;
          font-weight: 400;
          line-height: 50.256px;
          color: #ffffff;
        }
        #partners .brands .word-mask > span {
          transform: translate3d(0, 110%, 0);
          opacity: 0;
          transition-property: transform, opacity;
          transition-duration: 0.7s;
          transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        #partners .brands.is-inview .word-mask > span {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }

        #partners .button--arrow::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 75px;
          background: #ffffff;
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        #partners .button--arrow,
        #partners .button--arrow svg path {
          transition: color 0.4s cubic-bezier(0.215, 0.61, 0.355, 1),
            fill 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        #partners .button--arrow svg { transition: transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1); }
        #partners .button--arrow:hover,
        #partners .button--arrow:focus-visible { color: #000000; }
        #partners .button--arrow:hover::after,
        #partners .button--arrow:focus-visible::after { opacity: 1; }
        #partners .button--arrow:hover svg,
        #partners .button--arrow:focus-visible svg { transform: translate3d(50%, 0, 0); }

        @media (max-width: 767px) {
          #partners .brands { max-width: 330px; }
          #partners .brands .word-mask { font-size: 18px; line-height: 25.2px; }
        }
      `}</style>
    </section>
  );
}
