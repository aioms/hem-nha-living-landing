import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

await build();
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.ssr', copyPublicDir: false, emptyOutDir: true } });
try {
  const { paths, render, ORIGIN, routeSitemapImages } = await import('../.ssr/entry-server.js');
  const template = await readFile('dist/index.html', 'utf8');
  for (const route of [...paths, '/404']) {
    const { html, head, language } = render(route);
    const result = template.replace('<html lang="vi"', `<html lang="${language}"`)
      .replace('<!--seo-head-->', head)
      .replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${html}</div>`);
    const file = route === '/' ? 'dist/index.html' : path.join('dist', route + '.html');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, result);
  }
  function escapeXml(str) {
    return str.replace(/[<>&'"]/g, c => ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;',
    }[c]));
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${paths.map(route => {
    const images = typeof routeSitemapImages === 'function' ? routeSitemapImages(route) : [];
    const imageTags = images.map(img => `    <image:image>\n      <image:loc>${escapeXml(img.url)}</image:loc>\n      <image:title>${escapeXml(img.title)}</image:title>${img.caption ? `\n      <image:caption>${escapeXml(img.caption)}</image:caption>` : ''}\n    </image:image>`).join('\n');
    return `  <url>\n    <loc>${ORIGIN}${route}</loc>${imageTags ? '\n' + imageTags : ''}\n  </url>`;
  }).join('\n')}\n</urlset>\n`;
  await writeFile('dist/sitemap.xml', sitemap);
  // Originals stay in the repo; only responsive, content-hashed derivatives ship.
  await rm('dist/assets/photos', { recursive: true, force: true });
  await rm('dist/logohemnha', { recursive: true, force: true });
  console.log(`Prerendered ${paths.length} localized pages + 404. Sitemap generated from route registry.`);
} finally {
  await rm('.ssr', { recursive: true, force: true });
}
