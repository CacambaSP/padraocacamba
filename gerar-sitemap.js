#!/usr/bin/env node
// gerar-sitemap.js — Gera public/sitemap.xml a partir dos arquivos em public/
// Uso: node gerar-sitemap.js   (rodar antes de commitar quando criar/remover página)
// Nunca editar sitemap.xml na mão.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = 'https://www.padraocacamba.com.br';
const PUB = path.join(__dirname, 'public');

// Páginas que NÃO entram no sitemap
const EXCLUIR = new Set([
  'TEMPLATE_BAIRRO', 'monitoring-dashboard', 'monitoring-dashboard-v1-backup',
  'cadastro', 'locar',
]);

// lastmod = data do último commit que tocou o arquivo (fallback: hoje)
function lastmod(file) {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${file}"`, { cwd: __dirname }).toString().trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch (e) {}
  return new Date().toISOString().split('T')[0];
}

function regra(slug) {
  if (slug === '/') return { changefreq: 'weekly', priority: '1.0' };
  if (slug === '/precos') return { changefreq: 'weekly', priority: '0.9' };
  if (slug === '/antifraude' || slug === '/sobre') return { changefreq: 'monthly', priority: '0.8' };
  if (/^\/zona-|^\/grande-sp$|^\/centro-sp$/.test(slug)) return { changefreq: 'weekly', priority: '0.9' };
  if (slug === '/artigos/') return { changefreq: 'weekly', priority: '0.8' };
  if (slug.startsWith('/artigos/')) return { changefreq: 'monthly', priority: '0.8' };
  return { changefreq: 'weekly', priority: '0.9' }; // páginas de bairro
}

const urls = [];

function coletar(dir, prefixo) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) continue;
    if (!f.endsWith('.html')) continue;
    let slug = f.replace(/\.html$/, '');
    if (EXCLUIR.has(slug) || slug.startsWith('google')) continue;
    if (slug === 'index') slug = '';
    urls.push({ slug: prefixo + (slug ? '/' + slug : (prefixo ? '/' : '/')), file: full });
  }
}

coletar(PUB, '');
coletar(path.join(PUB, 'artigos'), '/artigos');

// ordena: home, institucionais, zonas, bairros, artigos
const peso = s =>
  s === '/' ? 0 :
  ['/precos', '/antifraude', '/sobre'].includes(s) ? 1 :
  /^\/zona-|^\/grande-sp$|^\/centro-sp$/.test(s) ? 2 :
  s === '/artigos/' ? 4 :
  s.startsWith('/artigos/') ? 5 : 3;
urls.sort((a, b) => peso(a.slug) - peso(b.slug) || a.slug.localeCompare(b.slug));

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const u of urls) {
  const r = regra(u.slug);
  const loc = BASE + (u.slug === '/' ? '/' : u.slug);
  xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod(u.file)}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>\n`;
}
xml += '</urlset>\n';

fs.writeFileSync(path.join(PUB, 'sitemap.xml'), xml);
console.log(`sitemap.xml gerado: ${urls.length} URLs`);
