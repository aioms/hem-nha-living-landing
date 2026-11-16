import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

await build();
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.ssr', copyPublicDir: false, emptyOutDir: true } });
try {
  const { paths, render, ORIGIN } = await import('../.ssr/entry-server.js');
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
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(route => `  <url><loc>${ORIGIN}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile('dist/sitemap.xml', sitemap);
  // Originals stay in the repo; only responsive, content-hashed derivatives ship.
  await rm('dist/assets/photos', { recursive: true, force: true });
  await rm('dist/logohemnha', { recursive: true, force: true });
  console.log(`Prerendered ${paths.length} localized pages + 404. Sitemap generated from route registry.`);
} finally {
  await rm('.ssr', { recursive: true, force: true });
}
