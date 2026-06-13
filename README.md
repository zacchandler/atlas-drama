# Atlas Drama

**The ESPN of the Atlas Rust competitive scene** — weekly clan power rankings, scored raid reviews, clan dossiers, a live raid map, a public Hall of Shame, a drama feed, and a creator program.

A cinematic, mobile-perfect Next.js site: red/black Atlas branding over a film-grain video hero, smooth Locomotive scrolling, and scroll-driven reveals.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (`@theme` tokens in `src/app/globals.css`)
- **Locomotive Scroll v4** for the smooth-scroll home page
- Self-hosted Roobert / Raleway fonts, film-grain + ember gradient hero

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (statically generates every clan + raid page)
npm start
```

## Editing content — one file

**Everything the site renders comes from [`src/data/atlas.ts`](src/data/atlas.ts).** Edit there, nowhere else. It holds:

| Block | Drives |
|---|---|
| `clans` (the 32-clan ranked list) | Power Rankings, Clans index + dossiers |
| `players` | clan roster / player cards |
| `raids` | scored Raid Reviews + detail pages |
| `drama` | the Drama Feed |
| `bans` | the public Hall of Shame |
| `raidMap` | pins on the raid map |
| `wipes` · `mapHistory` · `conflicts` · `videos` · `creators` · `sponsors` · `news` | future feature pages |
| `about` · `creatorProgram` · `contact` · `footer` · `heroPhrases` · `sceneClans` | site copy |

Swap the placeholder data for real Atlas data and the whole site updates.

## Pages

`/` home · `/rankings` · `/raids` + `/raids/[slug]` · `/clans` + `/clans/[slug]` · `/raid-map` · `/drama` · `/creators` · `/hall-of-shame` · `/about`

## Assets to replace

- Player photos: `public/images/team/*.jpg` (and `public/images/players/`)
- Raid map: `public/images/maps/map_4750.jpg`
- Hero / banner video: `public/videos/convert-hero.mp4`, `public/videos/pip.mp4`
- Raid + clan thumbnails: `public/images/raids/`, `public/images/clans/`

## Notes

- **Steam sign-in** is a styled stub — wire a backend OpenID return handler to make it live.
- Live server population / wipe countdown is ready to drop in behind a service layer (BattleMetrics).
- Fonts are the template's (Roobert is a commercial face) — license or swap before public launch.
