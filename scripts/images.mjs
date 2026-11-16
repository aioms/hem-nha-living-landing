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
// Reuse existing artwork: facade on the left, original brand logo on warm sand.
const facade = await sharp('public/assets/photos/architecture/facade-main.webp').resize(560, 630, { fit: 'cover', position: 'north' }).toBuffer();
const logo = await sharp('public/logohemnha/logohem-14.png').resize(520, 460, { fit: 'inside' }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#faf6f0' } })
  .composite([{ input: facade, left: 0, top: 0 }, { input: logo, left: 620, top: 85 }]).jpeg({ quality: 88, mozjpeg: true }).toFile('public/assets/og/hem-nha-living.jpg');
console.log(`Images: ${urls.size} sources, ${(before / 1048576).toFixed(2)} MiB → ${(after / 1048576).toFixed(2)} MiB (largest WebP variants; smaller srcsets also generated).`);
