"use client";

import { footer } from "@/data/atlas";

/* Inline SVG primitives (currentColor) */

function ArrowIcon({ className, size = 10 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M11.232 5.232 5.476 10.99l.767.768L12 6l-.768-.768z" fill="currentColor" />
      <path d="M6.242.243l-.767.768 5.758 5.758L12 6 6.242.243z" fill="currentColor" />
      <path d="M.543 5.458v1.086H11.4V5.458H.543z" fill="currentColor" />
    </svg>
  );
}

function CircleArrowIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="6.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M4.9 9.1 9 5M5.6 4.9h3.5v3.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/** Two overlapping rings, with the front ring in Atlas red. */
function RingsMark() {
  return (
    <svg className="fc-mark" viewBox="0 0 42 29" fill="none" aria-hidden="true">
      <circle cx="14" cy="14.5" r="13" stroke="#d62727" strokeWidth="1.5" />
      <circle cx="28" cy="14.5" r="13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const ASH = "#6d6d6d";
const CARBON = "#181818";

// chunk hubs into rows of 2 (2x2 grid)
const HUB_ROWS = [footer.hubs.slice(0, 2), footer.hubs.slice(2, 4)];

export default function FooterContact() {
  const handleToTop = () => {
    window.dispatchEvent(new CustomEvent("scroll-to-top")); // home (Locomotive)
    window.scrollTo({ top: 0, behavior: "smooth" }); // inner pages (native)
  };

  return (
    <footer
      id="contact"
      data-scroll=""
      data-scroll-id="contact"
      data-scroll-repeat="true"
      data-scroll-call="SET_CURRENT_SECTION"
      data-cursor-dark=""
      style={{ position: "relative", background: "#fff", color: CARBON, padding: "75px 0 126px" }}
    >
      <style>{`
        .fc-container { max-width: 1078px; margin: 0 auto; }
        .fc-headline { font-size: 94px; font-weight: 300; line-height: 1.1; color: ${CARBON}; margin: 0; }
        .fc-mark { display: inline-block; vertical-align: middle; width: 36px; height: 25px; margin-left: 20px; color: ${CARBON}; }
        .fc-mail-link { display: inline-block; position: relative; overflow: hidden; margin-top: 14px; padding-bottom: 9px; text-decoration: none; cursor: pointer; transition: opacity 0.2s linear; }
        .fc-mail-link:hover { opacity: 0.6; }
        .fc-mail-text { font-size: 39px; font-weight: 400; line-height: 1.1; display: inline-block; }
        .fc-mail-bar { position: absolute; left: 0; bottom: 0; width: 100%; height: 1px; background-image: var(--gradient-mercury); transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1); }
        .fc-mail-link:hover .fc-mail-bar { transform: translate3d(105%, 0, 0); }
        .fc-hover-dim { cursor: pointer; transition: opacity 0.2s linear; }
        .fc-hover-dim:hover { opacity: 0.6; }
        .fc-offices-region { display: flex; margin-top: 80px; }
        .fc-offices-col { width: 58.35%; }
        .fc-socials-col { flex: 1; padding-left: 212px; }
        .fc-office-row { display: flex; justify-content: space-between; }
        .fc-office-row + .fc-office-row { margin-top: 49px; }
        .fc-office { width: 240px; }
        .fc-btt { position: absolute; right: 120px; bottom: 120px; width: 55px; height: 55px; display: flex; align-items: center; justify-content: center; background: transparent; border: 0; padding: 0; color: ${CARBON}; cursor: pointer; }
        .fc-btt::before { content: ""; position: absolute; inset: 0; border: 1px solid ${CARBON}; border-radius: 50%; transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1); }
        .fc-btt:hover::before { transform: scale(1.2); }
        .fc-btt-arrow { transform: rotate(-90deg); transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1); }
        .fc-btt:hover .fc-btt-arrow { transform: rotate(-90deg) translateX(4px); }
        @media (max-width: 1180px) { .fc-container { margin: 0 48px; } .fc-socials-col { padding-left: 48px; } }
        @media (max-width: 767px) {
          .fc-container { margin: 0 24px; }
          .fc-headline { font-size: 44px; }
          .fc-mark { width: 20px; height: 14px; margin-left: 10px; }
          .fc-mail-text { font-size: 24px; }
          .fc-offices-region { display: block; margin-top: 64px; }
          .fc-offices-col { width: 100%; }
          .fc-office-row { display: block; }
          .fc-office-row + .fc-office-row { margin-top: 48px; }
          .fc-office { width: auto; }
          .fc-office + .fc-office { margin-top: 48px; }
          .fc-socials-col { padding-left: 0; margin-top: 48px; }
          .fc-btt { right: 24px; bottom: 60px; }
        }
      `}</style>

      <section className="fc-container">
        {/* -> Connect label */}
        <span className="section-label" style={{ color: CARBON, fontWeight: 600 }}>
          <ArrowIcon size={10} />
          Connect
        </span>

        {/* Headline */}
        <h2 className="fc-headline brand-i" style={{ marginTop: 12 }}>
          {footer.bigCatchphrase}
          <RingsMark />
        </h2>

        {/* Sub + email */}
        <div style={{ marginTop: 48 }}>
          <span style={{ display: "block", fontSize: 12, lineHeight: "14px", color: ASH }}>
            {footer.smallCatchphrase}
          </span>
          <a className="fc-mail-link" href={`mailto:${footer.contactMail}`}>
            <span className="fc-mail-text text-gradient-mercury">{footer.contactMail}</span>
            <span className="fc-mail-bar" aria-hidden="true" />
          </a>
          <p style={{ marginTop: 18, fontSize: 13, lineHeight: 1.5, color: ASH }}>
            Partnerships &amp; submissions — Discord{" "}
            <span style={{ color: CARBON, fontWeight: 500 }}>{footer.contactDiscord}</span>
          </p>
        </div>

        {/* Hubs (2x2) + socials */}
        <div className="fc-offices-region">
          <div className="fc-offices-col">
            <span style={{ display: "block", fontSize: 12, lineHeight: "14px", color: ASH, marginBottom: 22 }}>
              {footer.hubsLabel}
            </span>

            {HUB_ROWS.map((row, i) => (
              <div className="fc-office-row" key={i}>
                {row.map((hub) => (
                  <div className="fc-office" key={hub.city}>
                    <h3 style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 29, fontWeight: 400, lineHeight: 1.2, color: CARBON, margin: 0 }}>
                      {hub.city}
                      <CircleArrowIcon />
                    </h3>
                    <p style={{ fontSize: 12, lineHeight: 1.36, color: ASH, margin: "12px 0 0" }}>
                      {hub.desc}
                    </p>
                    <a
                      className="fc-hover-dim"
                      href={hub.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, lineHeight: "14px", color: CARBON, marginTop: 16, textDecoration: "none" }}
                    >
                      <ArrowIcon size={10} />
                      {hub.label}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="fc-socials-col">
            <span style={{ display: "block", fontSize: 12, lineHeight: "14px", color: ASH, marginBottom: 22 }}>
              Follow us
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {footer.social.map((network) => (
                <li key={network.label} style={{ fontSize: 29, lineHeight: 1.55 }}>
                  <a className="fc-hover-dim" href={network.url} target="_blank" rel="noreferrer" style={{ display: "inline-block", color: CARBON, textDecoration: "none" }}>
                    {network.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Back to top */}
      <button type="button" className="fc-btt" aria-label="Back to top" onClick={handleToTop}>
        <ArrowIcon className="fc-btt-arrow" size={10} />
      </button>
    </footer>
  );
}
