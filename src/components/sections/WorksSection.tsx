import { raids, clanById, type Raid } from "@/data/atlas";

/**
 * WorksSection — "Latest Raid Reviews" staggered grid (repurposed from monopo's
 * Selected Projects). Same parallax image + hover-scale + reveal, with an
 * ESPN-style score badge over each card. Server component.
 */

const OUTCOME_LABEL: Record<Raid["outcome"], string> = {
  success: "Raid won",
  failed: "Failed",
  trade: "Trade",
  abandoned: "Abandoned",
};

function RaidCard({ raid }: { raid: Raid }) {
  const atk = clanById(raid.attackerClanId);
  const def = clanById(raid.defenderClanId);
  const matchup = `${atk?.tag ?? "?"} vs ${def?.tag ?? "?"}`;
  const tags = [matchup, OUTCOME_LABEL[raid.outcome], raid.type[0].toUpperCase() + raid.type.slice(1)];

  return (
    <a href={`/raids/${raid.slug}`} className="project-card-item reveal group block" data-scroll="">
      <div className="img-wrapper cursor-hide relative aspect-[506/500] overflow-hidden" data-cursor="grow">
        <div
          className="img-container absolute inset-x-0 w-full"
          data-scroll=""
          data-scroll-speed="-0.25"
          style={{ height: "115%", top: "-7.5%" }}
        >
          <img
            src={raid.thumb}
            alt={raid.title}
            loading="lazy"
            className="h-full w-full object-cover brightness-[.8] group-hover:brightness-100 group-hover:[transform:scale(1.05)]"
            style={{ transition: "transform .8s cubic-bezier(0.19,1,0.22,1), filter .8s cubic-bezier(0.19,1,0.22,1)" }}
          />
        </div>

        {/* Score badge */}
        <div className="absolute left-4 top-4 z-[2] flex flex-col items-center justify-center" aria-label={`Score ${raid.scores.overall} out of 10`}>
          <span
            className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-[4px] font-bold leading-none text-white"
            style={{ background: "linear-gradient(180deg, #d62727, #7a0f0f)", boxShadow: "0 6px 20px rgba(214,39,39,0.5)" }}
          >
            <span className="text-[20px]">{raid.scores.overall.toFixed(1)}</span>
            <span className="mt-[3px] text-[8px] font-medium uppercase tracking-[0.12em] opacity-80">Score</span>
          </span>
        </div>
      </div>

      <span className="title mt-6 block text-[24px] font-normal leading-[1.2] text-white lg:text-[29px]">
        {raid.title}
      </span>

      <ul className="types mt-2 text-[11px] uppercase leading-[1.4] tracking-[0.04em] text-ash">
        {tags.map((tag, i) => (
          <li key={tag} className="inline">
            {tag}
            {i < tags.length - 1 ? "  ·  " : ""}
          </li>
        ))}
      </ul>
    </a>
  );
}

export default function WorksSection() {
  return (
    <section
      id="raids"
      data-scroll=""
      data-scroll-repeat="true"
      data-scroll-call="SET_CURRENT_SECTION"
      className="mx-auto w-full max-w-[1077.7px] px-6 lg:px-0"
      style={{ paddingTop: "46.08px", margin: "46.08px auto 92.304px" }}
    >
      {/* Section label */}
      <span className="title inline-flex items-center gap-[10px] text-white" style={{ fontSize: "11px", fontWeight: 600, lineHeight: "12.816px" }}>
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true">
          <path d="M0.5 5H11.8M8.1 1.3L11.8 5L8.1 8.7" stroke="currentColor" strokeWidth="1" />
        </svg>
        Latest Raid Reviews
      </span>

      <div id="project-card-list" className="project-card-list" style={{ marginTop: "78.768px" }}>
        <div className="container no-margin w-full max-w-full">
          <ul className="lg:flex lg:flex-wrap lg:items-start">
            {raids.map((raid, i) => (
              <li
                key={raid.id}
                className={
                  i % 2 === 1
                    ? "mb-16 block lg:mb-[82.512px] lg:ml-[5.92%] lg:w-[46.98%] lg:translate-y-[131.184px]"
                    : "mb-16 block lg:mb-[82.512px] lg:w-[46.98%]"
                }
              >
                <RaidCard raid={raid} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
