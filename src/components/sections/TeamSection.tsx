"use client";

import { useState } from "react";
import { featuredTeam } from "@/data/atlas";

/* ------------------------------------------------------------------ types */

type Social = { label: string; href: string };
type FeaturedPlayer = {
  handle: string;
  first: string; // may contain <i> brand markup
  last: string;
  role: string;
  bio: string;
  pic: string;
  socials: Social[];
};

const EASE_HEIGHT = "cubic-bezier(1, 0, 0, 1)";
const EASE_EXPO = "cubic-bezier(0.19, 1, 0.22, 1)";
const ASH = "#9a9a9a";

const INTRO = "The players<br/>who run the<br/>Atl<i>a</i>s scene";

/* --------------------------------------------------------- TeamMember */

function TeamMember({ member, index }: { member: FeaturedPlayer; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `team-member-details-${index + 1}`;
  const socials = member.socials.filter((s) => Boolean(s.href));

  return (
    <li className={`member relative mb-24 lg:mb-[187.49px] ${index % 2 === 0 ? "lg:ml-[374.98px]" : ""}`}>
      <div className="team-member relative flex w-full flex-col lg:block lg:w-[351.06px]">
        {/* Role micro-label */}
        <span data-scroll="" className="reveal role order-1 block text-[11px] font-normal uppercase tracking-[0.04em] text-white">
          {member.role}
        </span>

        {/* Portrait 351 x 497 */}
        <div
          data-scroll=""
          className="reveal picture-container relative order-2 z-[1] mt-[13.54px] w-full lg:h-[497px] lg:w-[351.06px]"
        >
          <div className="relative aspect-[351/497] h-full w-full overflow-hidden lg:aspect-auto">
            <img src={member.pic} alt={`${member.handle}`} loading="lazy" className="block h-full w-full object-cover" />
            {/* red wash to bond the placeholder portraits to the palette */}
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(6,6,8,0) 45%, rgba(6,6,8,0.65) 100%)" }} />
          </div>
        </div>

        {/* Big name — vertical parallax, overlapping the portrait edge */}
        <span
          data-scroll=""
          data-scroll-speed="-2"
          className="brand-i name relative order-3 z-[2] -mt-6 block text-[40px] font-light leading-[1.12] text-white lg:absolute lg:left-[323.28px] lg:top-[190.34px] lg:mt-0 lg:whitespace-nowrap lg:text-[64px]"
          dangerouslySetInnerHTML={{ __html: member.last ? `${member.first}<br/>${member.last}` : member.first }}
        />

        {/* "( N )" */}
        <span data-scroll="" className="reveal number order-4 mt-[11.95px] block text-[12px] text-white">
          {`( ${index + 1} )`}
        </span>

        {/* "+" accordion */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={detailsId}
          aria-label={`Toggle ${member.handle} bio`}
          className="relative order-5 z-[2] mt-6 flex h-[75px] w-[75px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-white bg-transparent hover:bg-white/10 lg:absolute lg:left-[323.28px] lg:top-[368px] lg:mt-0"
          style={{
            transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
            transition: `transform 0.6s ${EASE_EXPO}, background-color 0.2s linear`,
          }}
        >
          <span aria-hidden="true" className="absolute h-px w-[17px] bg-white" />
          <span aria-hidden="true" className="absolute h-[17px] w-px bg-white" />
        </button>

        {/* Expanding bio */}
        <div
          id={detailsId}
          className="order-6 mt-4 w-full max-w-[430px] lg:absolute lg:left-[450px] lg:top-[405.44px] lg:mt-0"
          style={{
            display: "grid",
            gridTemplateRows: expanded ? "1fr" : "0fr",
            opacity: expanded ? 1 : 0,
            transition: `grid-template-rows 0.65s ${EASE_HEIGHT}, opacity 0.45s linear${expanded ? " 0.15s" : ""}`,
          }}
          aria-hidden={!expanded}
        >
          <div className="overflow-hidden">
            <p className="details whitespace-pre-line text-[16px] leading-[1.8]" style={{ color: ASH }}>
              {member.bio}
            </p>
            {socials.length > 0 && (
              <ul className="socials mt-6 flex gap-5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={expanded ? 0 : -1}
                      className="cursor-pointer text-[12px] uppercase underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                      style={{ color: ASH }}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/* --------------------------------------------------------- TeamSection */

export default function TeamSection() {
  const members = featuredTeam as FeaturedPlayer[];

  return (
    <section
      id="players"
      data-scroll=""
      data-scroll-repeat="true"
      data-scroll-call="SET_CURRENT_SECTION"
      className="relative isolate mb-24 mt-16 pt-16 lg:mb-[150.05px] lg:mt-[97.49px] lg:pt-[97.49px]"
    >
      {/* Red glows (were amber bg images). Second one moved up from y=3960 to sit behind the lower members. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[120px] left-0 -z-10 h-[900px] w-full"
        style={{ background: "radial-gradient(55% 45% at 22% 28%, rgba(214,39,39,0.22), rgba(6,6,8,0) 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[1180px] -z-10 hidden h-[900px] w-full lg:block"
        style={{ background: "radial-gradient(52% 42% at 82% 42%, rgba(214,39,39,0.20), rgba(6,6,8,0) 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-[181px]">
        {/* Label */}
        <span data-scroll="" className="section-label reveal text-white">
          <span aria-hidden="true">&rarr;</span>Players
        </span>

        {/* Intro */}
        <p
          data-scroll=""
          className="brand-i intro reveal mx-auto mt-10 max-w-[960px] text-[34px] font-light leading-[1.18] text-white lg:mt-[58.46px] lg:text-[54px]"
          dangerouslySetInnerHTML={{ __html: INTRO }}
        />

        {/* Members */}
        <ul className="members mt-24 lg:mt-[168.77px]">
          {members.map((m, i) => (
            <TeamMember key={m.handle} member={m} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
