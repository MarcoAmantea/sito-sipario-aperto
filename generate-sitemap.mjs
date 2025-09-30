import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/gallery', changefreq: 'weekly', priority: 0.8 },
  { url: '/video', changefreq: 'monthly', priority: 0.6 },
  { url: '/contatti', changefreq: 'yearly', priority: 0.5 },
  { url: '/chi-siamo', changefreq: 'yearly', priority: 0.5 },
  { url: '/calendario', changefreq: 'monthly', priority: 0.6 },
    { url: '/privacy', changefreq: 'monthly', priority: 0.6 },

];

async function main() {
  // crea la cartella public se non esiste
  const publicDir = resolve('./public');
  if (!existsSync(publicDir)) mkdirSync(publicDir);

  const stream = new SitemapStream({ hostname: 'https://teatrolalocandina.it' });
  links.forEach((link) => stream.write(link));
  stream.end();

  const xml = await streamToPromise(stream);
  const outPath = resolve(publicDir, 'sitemap.xml');
  writeFileSync(outPath, xml.toString());
  console.log(`✅ sitemap.xml generata in ${outPath}`);
}

main().catch(console.error);
