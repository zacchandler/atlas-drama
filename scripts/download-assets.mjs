import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://monopo.vn';

// [remoteUrl, localPath under public/]
const ASSETS = [
  // fonts
  ...['Roobert-Regular', 'Roobert-RegularItalic', 'Roobert-Bold', 'Roobert-Light', 'Roobert-LightItalic', 'Raleway-Medium', 'Raleway-MediumItalic']
    .map(f => [`/fonts/WOFF2/${f}.woff2`, `fonts/${f}.woff2`]),
  // project thumbnails
  ...['nomad-thumbnail.jpg', 'freefire-thumbnail.jpg', 'mind-chatter-thumbnail.jpeg', 'dame-de-soie-thumbnail.jpg', 'bna_thumb-1-.jpeg', 'superdan_thumbnail.jpg', 'screen-shot-2021-10-27-at-4.29.49-pm-copy-1-.jpg', 'murakami-thumbnail.jpg']
    .map(f => [`/media/uploads/${f}`, `images/work/${f}`]),
  // saigon souls tiles
  ['/media/uploads/card-01.jpeg', 'images/tiles/card-01.jpeg'],
  ...Array.from({ length: 11 }, (_, i) => {
    const n = String(i + 2).padStart(2, '0');
    return [`/media/uploads/card-${n}.jpg`, `images/tiles/card-${n}.jpg`];
  }),
  // team portraits
  ...['vicki-final.jpg', 'robin-final.jpg', 'yoshi-final.jpg', 'shun.jpg', 'georgi.jpg', 'tran.jpg']
    .map(f => [`/media/uploads/${f}`, `images/team/${f}`]),
  // videos
  ...['integrate_web3dasset.webm', 'collaborate_web3dasset.webm', 'challenge_web3dasset.webm', 'monopo_showreel_-saigon_updated-_4.mp4', 'monopo-reel-saigon.mp4']
    .map(f => [`/media/uploads/${f}`, `videos/${f}`]),
  // background light textures + loader
  ['/_nuxt/img/loader-light.ece08d7.png', 'images/bg/loader-light.png'],
  ['/_nuxt/img/bg-light-menu-mb.9ff85a7.jpg', 'images/bg/bg-light-menu-mb.jpg'],
  ['/_nuxt/img/bg-light-left-dk.38af86e.jpg', 'images/bg/bg-light-left-dk.jpg'],
  ['/_nuxt/img/bg-light-right-dk.208c279.jpg', 'images/bg/bg-light-right-dk.jpg'],
  ['/_nuxt/img/bg-light-team-dk.4c3226f.jpg', 'images/bg/bg-light-team-dk.jpg'],
  // svg assets (hashed names -> semantic names decided after inspection)
  ['/_nuxt/b4cd8ef9cb4bb3b7ec01ea962ee268cc.svg', 'svg/asset-b4cd8ef9.svg'],
  ['/_nuxt/7992268be1d357733b95bc339eefdb8e.svg', 'svg/asset-7992268b.svg'],
  ['/_nuxt/d59c17a6b54707ee540eb2c5f3d6cebb.svg', 'svg/asset-d59c17a6.svg'],
  ['/_nuxt/549d6f91243395b01416f448629fb4a1.svg', 'svg/asset-549d6f91.svg'],
  ['/_nuxt/86a693c621114a7f091db1002c2f4069.svg', 'svg/asset-86a693c6.svg'],
  // favicons / manifest
  ['/site.webmanifest', 'seo/site.webmanifest'],
  ['/favicon-32x32.png', 'seo/favicon-32x32.png'],
  ['/favicon-16x16.png', 'seo/favicon-16x16.png'],
  ['/apple-touch-icon.png', 'seo/apple-touch-icon.png'],
  ['/favicon.ico', 'seo/favicon.ico'],
];

async function dl([url, dest]) {
  const target = path.join(ROOT, 'public', dest);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (fs.existsSync(target) && fs.statSync(target).size > 0) return { dest, status: 'cached', size: fs.statSync(target).size };
  try {
    const res = await fetch(BASE + url, { headers: { 'user-agent': 'Mozilla/5.0 (study-clone asset fetch)' } });
    if (!res.ok) return { dest, status: res.status };
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(target, buf);
    return { dest, status: 'ok', size: buf.length };
  } catch (e) {
    return { dest, status: 'err: ' + e.message };
  }
}

const results = [];
for (let i = 0; i < ASSETS.length; i += 4) {
  results.push(...await Promise.all(ASSETS.slice(i, i + 4).map(dl)));
  process.stdout.write(`\r${Math.min(i + 4, ASSETS.length)}/${ASSETS.length}`);
}
console.log();
let total = 0, fail = 0;
for (const r of results) {
  if (r.status !== 'ok' && r.status !== 'cached') { console.log('FAIL', r.dest, r.status); fail++; }
  else total += r.size;
}
console.log(`done: ${results.length - fail} ok (${(total / 1048576).toFixed(1)} MB), ${fail} failed`);
