/**
 * ============================================================================
 *  ATLAS DRAMA — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Everything the site renders comes from THIS file. Edit here, nowhere else.
 *  (No DB needed for v1 — swap any block for a real API later behind /services.)
 *
 *  Sections in this file, in order:
 *    1.  site            — name, tagline, urls, socials
 *    2.  nav             — header sections
 *    3.  heroPhrases     — the cycling hero headline
 *    4.  clans           — every clan (the roster of clans)
 *    5.  players         — player card library (with per-player history)
 *    6.  raids           — scored raid reviews
 *    7.  rankings        — weekly Power Rankings (with movement)
 *    8.  drama           — the Drama Feed
 *    9.  news            — announcements / giveaways (the "news channel")
 *    10. bans            — Hall of Shame public ban list
 *    11. wipes           — Wipe Recaps
 *    12. mapHistory      — who built where, on which wipe
 *    13. conflicts       — clan-vs-clan conflict history
 *    14. videos          — newest video feed
 *    15. creators        — creator library
 *    16. sponsors        — sponsor / partner page
 *    17. footer          — contact + hubs
 *
 *  All placeholder data below is realistic but FAKE — replace with real Atlas data.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
//  TYPES  (this doubles as the schema — "the one big list")
// ----------------------------------------------------------------------------

export type Region = "NA" | "EU" | "AU" | "GLOBAL";
export type Tier = "S" | "A" | "B" | "C";
export type RaidType = "online" | "offline" | "counter" | "roam";
export type Outcome = "success" | "failed" | "trade" | "abandoned";
export type Platform = "youtube" | "tiktok" | "twitch" | "x" | "kick";

export interface Social {
  label: string;
  url: string;
}

export interface Clan {
  id: string;
  slug: string;
  name: string;
  tag: string; // e.g. "RMB"
  accent: string; // hex used for the clan's accent treatments
  points: number; // ranking points (Atlas clan list)
  region: Region;
  founded: string; // ISO date
  rank: number; // current power-ranking position
  prevRank: number; // last week's position (for ▲▼ movement)
  tier: Tier;
  record: { raidsWon: number; raidsLost: number; wipesWon: number };
  roster: string[]; // player ids
  blurb: string; // one-line
  bio: string; // dossier paragraph
  logo: string; // /images/clans/xxx.png
  banner: string; // wide hero image
  socials: Social[];
}

export interface PlayerHistoryEntry {
  wipe: string; // wipe id/label
  clanId: string;
  note: string;
}

export interface Player {
  id: string;
  slug: string;
  handle: string; // in-game / known name
  knownAs: string[]; // aliases / past names
  realName?: string;
  steamId: string;
  discordId: string;
  clanId: string;
  role: string; // "Leader", "Raider", "Farmer", "Roamer"...
  country: string; // ISO-2 for flag
  joined: string; // ISO date
  avatar: string;
  stats: { kills: number; deaths: number; raids: number; hours: number };
  history: PlayerHistoryEntry[];
}

export interface RaidScores {
  execution: number; // 0–10
  intel: number;
  defense: number; // quality of defence faced
  entertainment: number;
  overall: number; // 0–10 (the headline score)
}

export interface Raid {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO
  wipe: string; // wipe id
  attackerClanId: string;
  defenderClanId: string;
  server: string;
  type: RaidType;
  outcome: Outcome;
  costEstimate: string; // "412 rockets · 1.1k sulfur"
  lootValue: string; // "~38k scrap"
  scores: RaidScores;
  videoUrl?: string;
  thumb: string;
  gallery: string[];
  writeup: string[]; // paragraphs (line-by-line reveal)
  tags: string[];
}

export interface RankingEntry {
  clanId: string;
  rank: number;
  prevRank: number;
  tier: Tier;
  note: string;
}

export interface Rankings {
  weekId: string;
  generatedAt: string;
  intro: string;
  entries: RankingEntry[];
}

export interface DramaPost {
  id: string;
  slug: string;
  date: string;
  title: string;
  heat: 1 | 2 | 3 | 4 | 5; // drama temperature
  clansInvolved: string[]; // clan ids
  body: string[]; // paragraphs
  media: string[];
  sources: Social[];
  tags: string[];
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  body: string;
  tag: "announcement" | "giveaway" | "update" | "event";
}

export interface Ban {
  id: string;
  name: string; // primary known name
  knownAs: string[];
  steamId: string;
  discordId: string;
  clanTag?: string;
  reason: string;
  date: string;
  severity: "cheating" | "toxicity" | "ban-evasion" | "scamming";
  evidence?: string; // url
}

export interface Wipe {
  id: string;
  label: string; // "EU 2x — Wipe 14"
  date: string;
  server: string;
  map: string; // map name/seed
  recap: string[]; // paragraphs
  topRaids: string[]; // raid ids
  thumb: string;
}

export interface MapBuild {
  clanId: string;
  grid: string; // "G14"
  baseType: string; // "Bunker", "Stone compound"...
  note: string;
}

export interface MapHistoryEntry {
  wipe: string;
  server: string;
  map: string;
  mapImage: string;
  builds: MapBuild[];
}

export interface ConflictEvent {
  date: string;
  title: string;
  raidId?: string;
}

export interface Conflict {
  id: string;
  slug: string;
  title: string;
  clanA: string;
  clanB: string;
  status: "active" | "settled" | "cold";
  startedWipe: string;
  summary: string;
  events: ConflictEvent[];
}

export interface VideoItem {
  id: string;
  title: string;
  creatorId: string;
  url: string;
  thumb: string;
  date: string;
  type: "raid" | "recap" | "drama" | "highlight";
}

export interface Creator {
  id: string;
  handle: string;
  platform: Platform;
  url: string;
  avatar: string;
  followers: string; // "12.4k"
  featured: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  url: string;
  tier: "title" | "gold" | "partner";
  blurb: string;
}

// ----------------------------------------------------------------------------
//  1. SITE
// ----------------------------------------------------------------------------

export const site = {
  name: "ATLAS",
  wordmarkSub: "drama",
  tagline: "The home of Atlas Rust drama.",
  description:
    "Power rankings, scored raid reviews, clan profiles and the hottest drama from the Atlas Rust competitive main scene.",
  url: "https://atlasdrama.gg",
  brandUrl: "https://atlasrust.com",
  socials: [
    { label: "Discord", url: "https://discord.gg/atlasrust" },
    { label: "YouTube", url: "https://www.youtube.com/@AtlasRustOfficial" },
    { label: "TikTok", url: "https://www.tiktok.com/@atlasrustservers" },
    { label: "X", url: "https://x.com/atlasrust" },
  ] as Social[],
} as const;

// ----------------------------------------------------------------------------
//  2. NAV  (header sections — wired to scroll + routes)
// ----------------------------------------------------------------------------

export const nav = [
  { section: "rankings", label: "RANKINGS", menuLabel: "Power Rankings", href: "/rankings" },
  { section: "raids", label: "RAIDS", menuLabel: "Raid Reviews", href: "/raids" },
  { section: "clans", label: "CLANS", menuLabel: "Clans", href: "/clans" },
  { section: "map", label: "RAID MAP", menuLabel: "Raid Map", href: "/raid-map" },
  { section: "drama", label: "DRAMA", menuLabel: "Drama Feed", href: "/drama" },
  { section: "creators", label: "CREATORS", menuLabel: "Creators", href: "/creators" },
  { section: "shame", label: "HALL OF SHAME", menuLabel: "Hall of Shame", href: "/hall-of-shame" },
] as const;

// ----------------------------------------------------------------------------
//  3. HERO PHRASES  (every "i" is italic via .brand-i — keep the markup)
// ----------------------------------------------------------------------------

export const heroPhrases = [
  { first: "The dr<i>a</i>ma", second: "never w<i>i</i>pes" },
  { first: "We<i>e</i>k 14", second: "P<i>o</i>wer Rank<i>i</i>ngs" },
  { first: "Ra<i>i</i>d Rev<i>i</i>ews,", second: "scored" },
  { first: "Atl<i>a</i>s", second: "runs the scene" },
] as const;

// ----------------------------------------------------------------------------
//  4. CLANS
// ----------------------------------------------------------------------------

// Ranked clan list (source: Atlas). [tag, points] in finishing order.
const RAW_CLANS: [string, number][] = [
  ["wK", 40], ["GK", 35], ["LX", 30], ["sF", 30], ["RTC", 25], ["OD", 25],
  ["EV1L", 25], ["Black Coffee", 25], ["556", 25], ["RMB", 25], ["OT", 20],
  ["kittyware", 20], ["Fog", 20], ["WB", 20], ["Sparta", 20], ["Guten Boys", 20],
  ["K20 RU", 15], ["MD", 15], ["NC", 15], ["RAZR", 15], ["MM", 15],
  ["Burger King", 15], ["FG", 15], ["Belt", 15], ["KO", 15], ["Peak", 12],
  ["SL", 12], ["larp maxxing", 12], ["WD", 12], ["GRUL", 10], [".VL", 10],
  ["CEO", 8], ["VOW", 8],
];

const CLAN_ACCENTS = ["#d62727", "#ff5a3c", "#ffd700", "#7df9ff", "#34d17a", "#9a4cff", "#ff7a2c"];

const clanTier = (p: number): Tier => (p >= 30 ? "S" : p >= 20 ? "A" : p >= 12 ? "B" : "C");

const clanSlug = (tag: string, rank: number) => {
  const x = tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return x || `clan-${rank}`;
};

// Rich dossier detail for clans we have a story on (keyed by tag).
const CLAN_DETAIL: Record<string, Partial<Clan>> = {
  RMB: {
    name: "Rocket My Base",
    region: "NA",
    founded: "2024-11-04",
    prevRank: 12,
    record: { raidsWon: 28, raidsLost: 6, wipesWon: 5 },
    roster: ["boner"],
    blurb: "The most feared online crew on Atlas 2x.",
    bio: "RMB built their name on relentless online pressure and surgical roof campers. They top the mid-bracket every wipe and punch well above their points — their force-wipe ambushes are the stuff of server legend.",
    socials: [{ label: "Discord", url: "#" }, { label: "YouTube", url: "#" }],
  },
};

export const clans: Clan[] = RAW_CLANS.map(([tag, points], i): Clan => {
  const rank = i + 1;
  const slug = clanSlug(tag, rank);
  const d = CLAN_DETAIL[tag] ?? {};
  return {
    id: slug,
    slug,
    name: d.name ?? tag,
    tag,
    accent: d.accent ?? CLAN_ACCENTS[i % CLAN_ACCENTS.length],
    points,
    region: d.region ?? "NA",
    founded: d.founded ?? "",
    rank,
    prevRank: d.prevRank ?? rank,
    tier: d.tier ?? clanTier(points),
    record: d.record ?? { raidsWon: 0, raidsLost: 0, wipesWon: 0 },
    roster: d.roster ?? [],
    blurb: d.blurb ?? "",
    bio: d.bio ?? "",
    logo: d.logo ?? "",
    banner: d.banner ?? "",
    socials: d.socials ?? [],
  };
});

// ----------------------------------------------------------------------------
//  5. PLAYERS  (player card library)
// ----------------------------------------------------------------------------

export const players: Player[] = [
  {
    id: "boner",
    slug: "boner-in-skinny-jeans",
    handle: "Boner In Skinny Jeans",
    knownAs: ["BISJ", "boner"],
    steamId: "7656119800000001",
    discordId: "boner",
    clanId: "rmb",
    role: "Leader",
    country: "US",
    joined: "2024-11-04",
    avatar: "/images/players/boner.jpg",
    stats: { kills: 1840, deaths: 612, raids: 34, hours: 2100 },
    history: [
      { wipe: "w14", clanId: "rmb", note: "Leads the #1 clan." },
      { wipe: "w10", clanId: "rmb", note: "Founded RMB." },
    ],
  },
  {
    id: "convertible",
    slug: "convertible",
    handle: "Convertible",
    knownAs: ["yuki convertible"],
    steamId: "7656119800000002",
    discordId: "convertible",
    clanId: "ot",
    role: "Leader / IGL",
    country: "JP",
    joined: "2024-09-18",
    avatar: "/images/players/convertible.jpg",
    stats: { kills: 1520, deaths: 540, raids: 29, hours: 1980 },
    history: [{ wipe: "w14", clanId: "yuki", note: "Calls every counter." }],
  },
  {
    id: "farmerjohn",
    slug: "farmer-john",
    handle: "Farmer John",
    knownAs: ["FJ"],
    steamId: "7656119800000003",
    discordId: "farmerjohn",
    clanId: "gk",
    role: "Farmer",
    country: "GB",
    joined: "2025-01-22",
    avatar: "/images/players/farmerjohn.jpg",
    stats: { kills: 640, deaths: 410, raids: 18, hours: 1600 },
    history: [{ wipe: "w14", clanId: "hack", note: "Out-farms the server." }],
  },
  {
    id: "eclipse",
    slug: "eclipse",
    handle: "Eclipse",
    knownAs: [],
    steamId: "7656119800000004",
    discordId: "eclipse",
    clanId: "lx",
    role: "Leader",
    country: "US",
    joined: "2025-03-30",
    avatar: "/images/players/eclipse.jpg",
    stats: { kills: 990, deaths: 470, raids: 22, hours: 1400 },
    history: [{ wipe: "w14", clanId: "eclipse", note: "Carries the trio." }],
  },
];

// ----------------------------------------------------------------------------
//  6. RAIDS  (scored raid reviews)
// ----------------------------------------------------------------------------

export const raids: Raid[] = [
  {
    id: "r-014-rmb-yuki",
    slug: "rmb-vs-yuki-forcewipe-ambush",
    title: "RMB ambush OT on force wipe",
    date: "2026-06-04",
    wipe: "w14",
    attackerClanId: "rmb",
    defenderClanId: "ot",
    server: "US 2x Monthly Large",
    type: "online",
    outcome: "success",
    costEstimate: "412 rockets · 1.1k sulfur",
    lootValue: "~38k scrap + 4 full T3",
    scores: { execution: 9, intel: 8, defense: 9, entertainment: 10, overall: 9.2 },
    videoUrl: "",
    thumb: "/images/raids/rmb-yuki.jpg",
    gallery: [],
    writeup: [
      "Two hours into force wipe, RMB caught yuki mid-upkeep with half the team still farming.",
      "The first wall went before yuki's counter even loaded in — Boner's roof team held the high ground the entire raid.",
      "By the time Convertible rallied a counter, the loot room was already empty. A statement raid to open the wipe at #1.",
    ],
    tags: ["online", "force-wipe", "S-tier", "rivalry"],
  },
  {
    id: "r-013-hack-triple",
    slug: "hack-triple-offline-g-row",
    title: "GK offline three compounds in one night",
    date: "2026-05-28",
    wipe: "w13",
    attackerClanId: "gk",
    defenderClanId: "sl",
    server: "EU 2x Monthly Large",
    type: "offline",
    outcome: "success",
    costEstimate: "300 rockets · 80 satchels",
    lootValue: "~24k scrap",
    scores: { execution: 8, intel: 7, defense: 5, entertainment: 6, overall: 6.8 },
    videoUrl: "",
    thumb: "/images/raids/hack-triple.jpg",
    gallery: [],
    writeup: [
      "Hack spent the wipe farming in silence, then cashed it all in at 4am EU.",
      "Three offlines back-to-back across G-row — efficient, brutal, and quiet.",
      "Low entertainment score (it was an offline) but the execution was clean enough to climb them two spots.",
    ],
    tags: ["offline", "farm", "efficient"],
  },
];

// ----------------------------------------------------------------------------
//  7. POWER RANKINGS
// ----------------------------------------------------------------------------

export const rankings: Rankings = {
  weekId: "Week 14",
  generatedAt: "2026-06-09",
  intro:
    "wK hold the top off the back of a dominant wipe; GK, LX and sF round out the S-tier. RMB remain the most dangerous mid-bracket clan on the server.",
  // Derived from the ranked clan list above — edit clan points to reorder.
  entries: clans.map((c) => ({ clanId: c.id, rank: c.rank, prevRank: c.prevRank, tier: c.tier, note: c.blurb })),
};

// ----------------------------------------------------------------------------
//  8. DRAMA FEED
// ----------------------------------------------------------------------------

export const drama: DramaPost[] = [
  {
    id: "d-rmb-yuki-beef",
    slug: "rmb-yuki-beef-reignites",
    date: "2026-06-05",
    title: "The RMB–OT beef just went nuclear",
    heat: 5,
    clansInvolved: ["rmb", "ot"],
    body: [
      "It started as trash talk in server chat. It ended with 412 rockets.",
      "After RMB's force-wipe ambush, Convertible called it \"a cheap shot on a half-loaded team.\" Boner's reply: \"loaded or not, your loot's in our base.\"",
      "Both clans are now hard-committed to a grudge wipe. Expect blood.",
    ],
    media: [],
    sources: [{ label: "Clip", url: "#" }],
    tags: ["rivalry", "beef", "S-tier"],
  },
  {
    id: "d-driftwood-split",
    slug: "driftwood-leadership-split",
    date: "2026-06-02",
    title: "SL implodes mid-wipe",
    heat: 3,
    clansInvolved: ["sl"],
    body: [
      "Two founders, one disagreement about a failed online, and suddenly half the roster is gone.",
      "Driftwood dropped from #3 to #5 in a week. Word is at least two players are shopping for a new tag.",
    ],
    media: [],
    sources: [],
    tags: ["roster", "drama"],
  },
];

// ----------------------------------------------------------------------------
//  9. NEWS / ANNOUNCEMENTS  (the "news channel")
// ----------------------------------------------------------------------------

export const news: NewsItem[] = [
  {
    id: "n-launch",
    date: "2026-06-13",
    title: "Atlas Drama is live",
    body: "Power rankings, scored raid reviews, clan dossiers and the Hall of Shame — all in one place. Welcome.",
    tag: "announcement",
  },
  {
    id: "n-giveaway",
    date: "2026-06-13",
    title: "Launch giveaway: 3 months of VIP",
    body: "Join the Discord and drop your best raid clip. Three winners drawn at the next force wipe.",
    tag: "giveaway",
  },
];

// ----------------------------------------------------------------------------
//  10. HALL OF SHAME  (public ban list)
// ----------------------------------------------------------------------------

export const bans: Ban[] = [
  {
    id: "b-001",
    name: "spinbot_andy",
    knownAs: ["andy", "andy2k"],
    steamId: "7656119800009001",
    discordId: "andy#0001",
    clanTag: "—",
    reason: "Aimbot + spinbot, confirmed by Overwatch review.",
    date: "2026-06-01",
    severity: "cheating",
    evidence: "#",
  },
  {
    id: "b-002",
    name: "ScamLord",
    knownAs: ["trustme", "scamlord"],
    steamId: "7656119800009002",
    discordId: "scamlord#4420",
    clanTag: "—",
    reason: "Scammed 12k scrap on a fake teleport trade.",
    date: "2026-05-24",
    severity: "scamming",
    evidence: "#",
  },
  {
    id: "b-003",
    name: "evaderX",
    knownAs: ["evader", "x_evader_x"],
    steamId: "7656119800009003",
    discordId: "evader#7777",
    clanTag: "—",
    reason: "Ban evasion — fourth alt this wipe.",
    date: "2026-05-19",
    severity: "ban-evasion",
  },
];

// ----------------------------------------------------------------------------
//  11. WIPE RECAPS
// ----------------------------------------------------------------------------

export const wipes: Wipe[] = [
  {
    id: "w14",
    label: "Week 14 — US 2x Monthly",
    date: "2026-06-04",
    server: "US 2x Monthly Large",
    map: "Procedural 4500 · seed 1934220",
    recap: [
      "Force wipe opened with a bang — RMB's ambush set the tone for the whole wipe.",
      "Hack quietly farmed their way into the top three while everyone watched the top of the board.",
      "Driftwood's implosion was the sub-plot nobody saw coming.",
    ],
    topRaids: ["r-014-rmb-yuki"],
    thumb: "/images/wipes/w14.jpg",
  },
  {
    id: "w13",
    label: "Week 13 — EU 2x Monthly",
    date: "2026-05-21",
    server: "EU 2x Monthly Large",
    map: "Procedural 4250 · seed 88812",
    recap: [
      "A quieter wipe up top — until Hack's triple offline detonated on the final night.",
      "yuki cruised to the wipe win with zero successful raids against them.",
    ],
    topRaids: ["r-013-hack-triple"],
    thumb: "/images/wipes/w13.jpg",
  },
];

// ----------------------------------------------------------------------------
//  12. MAP HISTORY  (who built where, on which wipe)
// ----------------------------------------------------------------------------

export const mapHistory: MapHistoryEntry[] = [
  {
    wipe: "w14",
    server: "US 2x Monthly Large",
    map: "Procedural 4500 · seed 1934220",
    mapImage: "/images/maps/w14.png",
    builds: [
      { clanId: "rmb", grid: "G14", baseType: "Roof-camp bunker", note: "High ground over the dome." },
      { clanId: "yuki", grid: "K9", baseType: "Sealed bunker", note: "Cliffside, one-way in." },
      { clanId: "eclipse", grid: "D6", baseType: "Stone 2x2", note: "Aggressive, near launch." },
    ],
  },
  {
    wipe: "w13",
    server: "EU 2x Monthly Large",
    map: "Procedural 4250 · seed 88812",
    mapImage: "/images/maps/w13.png",
    builds: [
      { clanId: "hack", grid: "G7", baseType: "Farm compound", note: "Three TCs, deep stash." },
      { clanId: "sl", grid: "P12", baseType: "Cliff base", note: "Hard offline, easy online." },
    ],
  },
];

// ----------------------------------------------------------------------------
//  13. CONFLICT HISTORY
// ----------------------------------------------------------------------------

export const conflicts: Conflict[] = [
  {
    id: "c-rmb-yuki",
    slug: "rmb-vs-yuki",
    title: "RMB vs OT",
    clanA: "rmb",
    clanB: "ot",
    status: "active",
    startedWipe: "w10",
    summary:
      "The defining rivalry of Atlas. Five wipes, eleven major raids, and a lead that has changed hands four times.",
    events: [
      { date: "2026-06-04", title: "RMB force-wipe ambush", raidId: "r-014-rmb-yuki" },
      { date: "2026-05-07", title: "yuki counter wipes RMB's online" },
      { date: "2026-04-12", title: "First blood — yuki offline RMB's first base" },
    ],
  },
];

// ----------------------------------------------------------------------------
//  14. VIDEO FEED  (newest videos)
// ----------------------------------------------------------------------------

export const videos: VideoItem[] = [
  { id: "v1", title: "RMB AMBUSH yuki ON FORCE WIPE (full raid)", creatorId: "cr-atlas", url: "#", thumb: "/images/videos/v1.jpg", date: "2026-06-05", type: "raid" },
  { id: "v2", title: "Week 14 Power Rankings — reaction", creatorId: "cr-eclipse", url: "#", thumb: "/images/videos/v2.jpg", date: "2026-06-09", type: "recap" },
  { id: "v3", title: "Hack's TRIPLE offline in 4 minutes", creatorId: "cr-hack", url: "#", thumb: "/images/videos/v3.jpg", date: "2026-05-29", type: "highlight" },
];

// ----------------------------------------------------------------------------
//  15. CREATOR LIBRARY
// ----------------------------------------------------------------------------

export const creators: Creator[] = [
  { id: "cr-atlas", handle: "AtlasRustOfficial", platform: "youtube", url: "https://www.youtube.com/@AtlasRustOfficial", avatar: "/images/creators/atlas.jpg", followers: "48k", featured: true },
  { id: "cr-eclipse", handle: "eclipse", platform: "twitch", url: "#", avatar: "/images/creators/eclipse.jpg", followers: "12.4k", featured: true },
  { id: "cr-hack", handle: "hackclips", platform: "tiktok", url: "#", avatar: "/images/creators/hack.jpg", followers: "9.1k", featured: false },
];

// ----------------------------------------------------------------------------
//  16. SPONSORS
// ----------------------------------------------------------------------------

export const sponsors: Sponsor[] = [
  { id: "s-atlas", name: "Atlas Rust", logo: "/images/sponsors/atlas.png", url: "https://atlasrust.com", tier: "title", blurb: "The servers where it all happens." },
  { id: "s-rustmagic", name: "RustMagic", logo: "/images/sponsors/rustmagic.png", url: "https://rustmagic.com/r/atlas", tier: "gold", blurb: "Claim 3 free skins." },
];

// ----------------------------------------------------------------------------
//  17. FOOTER
// ----------------------------------------------------------------------------

export const footer = {
  bigCatchphrase: "Run the scene",
  smallCatchphrase: "Submit a raid, report a cheater, start some drama",
  contactMail: "drama@atlasrust.com",
  contactDiscord: "convertible",
  hubsLabel: "Where to find us",
  hubs: [
    { city: "Discord", desc: "The community hub — drama, clips, reports.", url: "https://discord.gg/atlasrust", label: "Join the server" },
    { city: "YouTube", desc: "Full raid reviews & wipe recaps.", url: "https://www.youtube.com/@AtlasRustOfficial", label: "Watch" },
    { city: "TikTok", desc: "Clips & the moments that start beef.", url: "https://www.tiktok.com/@atlasrustservers", label: "Watch" },
    { city: "Atlas Rust", desc: "The servers themselves — play here.", url: "https://atlasrust.com", label: "Play" },
  ],
  social: site.socials,
} as const;

// ----------------------------------------------------------------------------
//  HOME PAGE SECTION COPY  (the cinematic landing)
// ----------------------------------------------------------------------------

// "They trust us" -> the clans in the scene (word-reveal roll-call). Swap freely.
export const sceneClans: string[] = clans.map((c) => c.tag);

// Manifesto — fills ash -> white line by line on scroll. Keep the leading spaces.
export const manifesto = {
  label: "Manifesto",
  lines: [
    " We are Atlas.",
    " The biggest,",
    " highest-popping,",
    " most competitive",
    " servers in Rust.",
    " This is where",
    " the best clans",
    " fight for the top —",
    " and where every",
    " raid becomes a story.",
  ],
};

// "What we cover" — 3 hairline rows (looping 3D asset + copy).
export const covers = [
  {
    type: "P<i>o</i>wer Rank<i>i</i>ngs",
    text: "Every wipe we rank every clan that matters. Movement, tiers, and the receipts behind every placement — updated while the dust is still settling.",
    video_webm: "/videos/integrate_web3dasset.webm",
  },
  {
    type: "Ra<i>i</i>d Rev<i>i</i>ews",
    text: "Every major raid scored 0–10 on execution, intel, defence and pure entertainment. The biggest hits, broken down frame by frame.",
    video_webm: "/videos/collaborate_web3dasset.webm",
  },
  {
    type: "The Dr<i>a</i>ma",
    text: "Beefs, betrayals, roster moves and the moments that start wars. If it shook the server, it landed here first.",
    video_webm: "/videos/challenge_web3dasset.webm",
  },
];

// Drama-feed statement (statement + pill).
export const dramaStatement = {
  label: "The Drama Feed",
  text: "Atlas is the main scene — and the main scene runs on drama. Every wipe writes a new chapter: who rose, who fell, who got exposed. We keep the receipts.",
  ctaLabel: "Open the Drama Feed",
  ctaHref: "/drama",
};

// Featured players (team section). Portraits are red-duotone placeholders — swap in /images/team.
export const featuredTeam = [
  { handle: "Eclipse", first: "Ecl<i>i</i>pse", last: "", role: "Leader · ECL", bio: "A tight trio that punches three weights above their size. Eclipse pick fights they shouldn't win — and win enough of them to stay top-five. The clips do the talking.", pic: "/images/team/eclipse.jpg", socials: [{ label: "YouTube", href: "#" }, { label: "Discord", href: "#" }] },
  { handle: "Convertible", first: "C<i>o</i>nvert<i>i</i>ble", last: "", role: "Leader / IGL · yuki", bio: "Nobody on Atlas reads a raid map faster. Convertible calls every counter for yuki — methodical builds, brutal punishes, zero panic.", pic: "/images/team/convertible.jpg", socials: [{ label: "Discord", href: "#" }] },
  { handle: "Farmer John", first: "Farmer", last: "J<i>o</i>hn", role: "Farmer · hack", bio: "Out-farms the entire server. Where others roam, Farmer John quietly stockpiles until hack can offline three compounds in a single night.", pic: "/images/team/farmerjohn.jpg", socials: [{ label: "Discord", href: "#" }] },
  { handle: "Boner In Skinny Jeans", first: "B<i>o</i>ner In", last: "Sk<i>i</i>nny Jeans", role: "Leader · RMB", bio: "Leads the most feared online crew on Atlas. Relentless roof pressure and surgical timing — when RMB load in, somebody's losing their loot.", pic: "/images/team/boner.jpg", socials: [{ label: "YouTube", href: "#" }, { label: "Discord", href: "#" }] },
];

// ----------------------------------------------------------------------------
//  18. CONTACT
// ----------------------------------------------------------------------------

export const contact = {
  email: "drama@atlasrust.com",
  discord: "convertible",
  discordUrl: "https://discord.gg/atlasrust",
};

// ----------------------------------------------------------------------------
//  19. RAID MAP  (live raid pins over the wipe map)
// ----------------------------------------------------------------------------

export interface RaidPin {
  id: string;
  x: number; // % across the map image
  y: number; // % down the map image
  clanId: string;
  grid: string;
  status: "active" | "fresh" | "aftermath";
  label: string;
}

export const raidMap = {
  image: "/images/maps/map_4750.jpg",
  seed: "Procedural 4750 · seed 1337",
  note: "Active raid locations, updated by admins. Pins expire after 3 days.",
  pins: [
    { id: "p1", x: 37, y: 31, clanId: "rmb", grid: "G14", status: "active", label: "RMB online on a wK roof base" },
    { id: "p2", x: 63, y: 52, clanId: "gk", grid: "K9", status: "active", label: "GK offlining an LX compound" },
    { id: "p3", x: 49, y: 70, clanId: "ot", grid: "P12", status: "fresh", label: "OT counter spotted moving in" },
    { id: "p4", x: 24, y: 58, clanId: "sf", grid: "D6", status: "aftermath", label: "sF base cracked — loot gone" },
  ] as RaidPin[],
};

// ----------------------------------------------------------------------------
//  20. ABOUT  (What is Atlas Drama)
// ----------------------------------------------------------------------------

export const about = {
  label: "What is Atlas Drama?",
  title: "The home of Atlas Rust dr<i>a</i>ma",
  lead: "Atlas Drama is the ESPN of the Atlas Rust competitive scene — built by the community, for the community.",
  paragraphs: [
    "We cover the Atlas main scene the way it deserves: weekly clan power rankings, every major raid scored and broken down, full clan dossiers, a public Hall of Shame, and a drama feed that keeps the receipts.",
    "Connected to the Atlas Rust community and focused on real wipe activity, real reporting, and the players who make the server the most competitive in Rust.",
  ],
  points: [
    "Weekly power rankings across the whole clan list",
    "Every major raid scored 0–10 and reviewed",
    "A public ban list — name and shame",
    "Built for players, leaders and creators",
  ],
};

// ----------------------------------------------------------------------------
//  21. CREATOR PROGRAM  (application + resources)
// ----------------------------------------------------------------------------

export const creatorProgram = {
  label: "For Atlas Creators",
  title: "Content Cre<i>a</i>tors",
  intro:
    "Atlas Drama backs the creators who cover the scene. These resources are exclusively for approved Atlas creators — apply below and we review every application.",
  applyUrl: contact.discordUrl,
  applyContact: contact.discord,
  resources: [
    { title: "Creator Resource Packs", desc: "Graphics, overlays and branded Atlas assets, ready to drop into your edits." },
    { title: "Wipe Progression Footage", desc: "Pre-made wipe-prog clips and B-roll for your videos." },
    { title: "Cinematics", desc: "Access to cinematic Rust footage and scene setups." },
    { title: "Music Library", desc: "Curated, cleared music and sound packs for Atlas creators." },
    { title: "Thumbnail Artists", desc: "Direct lines to thumbnail artists who know the Atlas brand." },
    { title: "Editing Resources", desc: "Templates, LUTs, transitions and editing guides from top editors." },
    { title: "Community Visibility", desc: "Your content featured and amplified across Atlas Drama." },
    { title: "Events & Giveaways", desc: "Creator-hosted giveaways and exclusive community events." },
  ],
  requirements: [
    "An active Atlas Rust content creator",
    "Consistent uploads covering the Atlas scene",
    "Part of the Atlas community Discord",
  ],
};

// ----------------------------------------------------------------------------
//  Convenience lookups
// ----------------------------------------------------------------------------

export const clanById = (id: string) => clans.find((c) => c.id === id);
export const playerById = (id: string) => players.find((p) => p.id === id);
export const raidById = (id: string) => raids.find((r) => r.id === id);
