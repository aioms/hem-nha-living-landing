import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const urls = new Set();
for (const file of await files('src')) {
  if (!/\.(tsx?|css)$/.test(file)) continue;
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/['"](\/(?:assets\/photos|assets\/branding|logohemnha)\/[^'"\s]+\.(?:webp|jpe?g|png))['"]/g)) urls.add(match[1]);
}
await mkdir('public/assets/optimized', { recursive: true });
await mkdir('.generated', { recursive: true });
const manifest = {};
let before = 0, after = 0;
for (const url of [...urls].sort()) {
  const input = await readFile('public' + url);
  const image = sharp(input).rotate();
  const meta = await image.metadata();
  const nativeWidth = meta.autoOrient?.width || meta.width;
  const nativeHeight = meta.autoOrient?.height || meta.height;
  const widths = [...new Set([480, 960, 1600].map(width => Math.min(width, nativeWidth)))];
  const hash = createHash('sha256').update(input).update('webp-q82-effort5-v1').digest('hex').slice(0, 12);
  const stem = path.basename(url, path.extname(url));
  const variants = [];
  before += input.length;
  for (const width of widths) {
    const out = `/assets/optimized/${stem}-${hash}-${width}.webp`;
    try { await access('public' + out); }
    catch { await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile('public' + out); }
    const bytes = (await readFile('public' + out)).length;
    if (width === widths.at(-1)) after += bytes;
    variants.push({ url: out, width });
  }
  manifest[url] = { src: variants.at(-1).url, srcSet: variants.map(item => `${item.url} ${item.width}w`).join(', '), width: nativeWidth, height: nativeHeight };
}
await writeFile('.generated/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
await mkdir('public/assets/og', { recursive: true });
const logo = await sharp('public/logohemnha/logohem-14.png').resize(520, 460, { fit: 'inside' }).toBuffer();

const ogList = [
  { file: 'hem-nha-living.jpg', src: 'public/assets/photos/architecture/facade-main.webp', position: 'north' },
  { file: 'og-homestay.jpg', src: 'public/assets/photos/rooms/som-mai/hero.webp', position: 'center' },
  { file: 'og-som-mai.jpg', src: 'public/assets/photos/rooms/som-mai/hero.webp', position: 'center' },
  { file: 'og-mo-trua.jpg', src: 'public/assets/photos/rooms/trua-he/hero.webp', position: 'center' },
  { file: 'og-hoang-hon.jpg', src: 'public/assets/photos/rooms/hoang-hon/hero.webp', position: 'center' },
  { file: 'og-dem-sao.jpg', src: 'public/assets/photos/rooms/dem-sao/hero.webp', position: 'center' },
  { file: 'og-thue-thang.jpg', src: 'public/assets/photos/diy-living/mo-japandi/page_085.jpeg', position: 'center' },
  { file: 'og-hem-diy-1.jpg', src: 'public/assets/photos/diy-living/hem-diy-1/page_016.jpeg', position: 'center' },
  { file: 'og-hem-diy-2.jpg', src: 'public/assets/photos/diy-living/hem-diy-2/page_020.jpeg', position: 'center' },
  { file: 'og-hem-minimal.jpg', src: 'public/assets/photos/diy-living/hem-minimal/page_069.jpeg', position: 'center' },
  { file: 'og-hem-japandi.jpg', src: 'public/assets/photos/diy-living/hem-japandi/page_076.jpeg', position: 'center' },
  { file: 'og-mo-japandi.jpg', src: 'public/assets/photos/diy-living/mo-japandi/page_085.jpeg', position: 'center' },
  { file: 'og-hem-scandi.jpg', src: 'public/assets/photos/diy-living/hem-scandi/page_090.jpeg', position: 'center' },
  { file: 'og-cafe.jpg', src: 'public/assets/photos/cafe/cafe-main-lounge.webp', position: 'center' },
  { file: 'og-tien-ich.jpg', src: 'public/assets/photos/amenities/rooftop/rooftop-billiards-sunset.webp', position: 'center' },
  { file: 'og-landing-homestay-quan-7.jpg', src: 'public/assets/photos/rooms/som-mai/hero.webp', position: 'center' },
  { file: 'og-landing-short-stay-district-7.jpg', src: 'public/assets/photos/rooms/som-mai/hero.webp', position: 'center' },
  { file: 'og-landing-studio-thue-thang-quan-7.jpg', src: 'public/assets/photos/diy-living/mo-japandi/page_085.jpeg', position: 'center' },
  { file: 'og-landing-monthly-studio-district-7.jpg', src: 'public/assets/photos/diy-living/mo-japandi/page_085.jpeg', position: 'center' },
  { file: 'og-landing-homestay-gan-phu-my-hung.jpg', src: 'public/assets/photos/rooms/trua-he/hero.webp', position: 'center' },
  { file: 'og-landing-cho-o-gan-secc.jpg', src: 'public/assets/photos/rooms/dem-sao/hero.webp', position: 'center' },
];

for (const item of ogList) {
  const photo = await sharp(item.src).rotate().resize(560, 630, { fit: 'cover', position: item.position }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#faf6f0' } })
    .composite([{ input: photo, left: 0, top: 0 }, { input: logo, left: 620, top: 85 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(`public/assets/og/${item.file}`);
}
console.log(`Images: ${urls.size} sources, ${(before / 1048576).toFixed(2)} MiB → ${(after / 1048576).toFixed(2)} MiB (largest WebP variants; smaller srcsets also generated).`);
