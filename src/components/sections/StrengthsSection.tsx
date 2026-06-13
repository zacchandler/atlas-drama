import { covers } from "@/data/atlas";
import { asset } from "@/lib/asset";

/* ------------------------------------------------------------------ */
/* Strengths — 3 hairline-topped rows (Integrate / Collaborate /      */
/* Challenge). Each row: arrow + uppercase label, looping webm video, */
/* right column with superscript number + ~29px paragraph.            */
/* ScrollProvider adds .is-inview to [data-scroll] elements; .reveal  */
/* in globals.css does the fade/rise. Inner blocks stagger via        */
/* transition-delay 0 / .1s / .2s.                                    */
/* Source of truth: docs/research/components/strengths.tree.json      */
/* ------------------------------------------------------------------ */

function ArrowDownRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 2l7.6 7.6M9.8 4.2v5.6H4.2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export default function StrengthsSection() {
  const rows = covers;

  return (
    <section id="strengths" className="relative bg-black pt-[35px] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-[180px]">
        {rows.map((row, i) => {
          const videoFile = row.video_webm.split("/").pop() ?? "";

          return (
            <section
              key={row.type}
              data-scroll=""
              className="reveal hairline-t relative mb-24 md:mb-[152px]"
            >
              {/* Arrow + uppercase label */}
              <span
                className="reveal mt-[23px] inline-flex items-center gap-[10px] text-[11px] uppercase tracking-[0.05em]"
                data-scroll=""
                style={{ transitionDelay: "0s" }}
              >
                <ArrowDownRight />
                <span className="brand-i" dangerouslySetInnerHTML={{ __html: row.type }} />
              </span>

              <div className="mt-8 flex flex-col gap-10 md:mt-[47px] md:flex-row md:items-start md:justify-between md:gap-0">
                {/* Looping 3D asset */}
                <div className="reveal" data-scroll="" style={{ transitionDelay: "0.1s" }}>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full max-w-[342px] md:w-[340px]"
                  >
                    <source src={asset(`/videos/${videoFile}`)} type="video/webm" />
                  </video>
                </div>

                {/* Superscript number + paragraph */}
                <div
                  className="brand-i reveal w-full text-[18px] font-light leading-[1.58] text-white md:w-[506px] md:text-[28.5px]"
                  data-scroll=""
                  style={{ transitionDelay: "0.2s" }}
                >
                  <span
                    className="mr-6 inline-block align-top text-[11px] text-[#6d6d6d] md:mr-[37px]"
                    style={{ lineHeight: "37px" }}
                  >
                    {`0${i + 1}`}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: row.text }} />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
