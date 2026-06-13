// SoulsMarquee — "ATLAS DRAMA" horizontal scroll-linked marquee band.
// Motion is driven by Locomotive Scroll (data-scroll-direction="horizontal") —
// NOT a time-based CSS marquee. Mechanics preserved exactly from the template.

// Brand signature ported to Atlas: italic <i> wraps the a's (monopo did the i's).
const PHRASE = "Atl<i>a</i>s Dr<i>a</i>m<i>a</i>";

// Red diamond separator between repeats.
const SEP = `&nbsp;&nbsp;<span style="color:#d62727">&#10022;</span>&nbsp;&nbsp;`;

// Phrase repeated so the line never runs out at 1440px while Locomotive slides it.
const MARQUEE_HTML =
  PHRASE +
  Array.from({ length: 4 }, () => `${SEP}<span aria-hidden="true">${PHRASE}</span>`).join("");

export default function SoulsMarquee() {
  return (
    <section
      id="drama-marquee"
      className="flex h-[120px] items-center overflow-hidden bg-black md:h-[281px]"
      aria-label="Atlas Drama"
    >
      <p
        data-scroll=""
        data-scroll-speed="12.5"
        data-scroll-direction="horizontal"
        className="brand-i whitespace-nowrap text-[64px] md:-ml-[181px] md:text-[150px]"
        style={{ fontWeight: 400, lineHeight: 1, color: "#ffffff" }}
        dangerouslySetInnerHTML={{ __html: MARQUEE_HTML }}
      />
    </section>
  );
}
