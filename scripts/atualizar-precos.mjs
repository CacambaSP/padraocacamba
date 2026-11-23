#!/usr/bin/env node
// =====================================================================
// atualizar-precos.mjs — escreve os preços do Supabase no HTML do site
// =====================================================================
// Roda no GitHub Actions (.github/workflows/precos.yml): todo dia às 6h
// (Brasília), a cada publicação na main e quando alguém clica "Run workflow".
//
// REGRAS
// - O Supabase é SÓ LIDO (GET na API REST com a chave pública, a mesma que
//   as páginas já usam no navegador). Nada é gravado lá.
// - Preço do site = preço de CLIENTE com nota fiscal:
//     precos_bairros.preco_com_nf  e  precos_zonas.preco_padrao
//   (nunca custo de fornecedor do CRM).
// - Se a leitura falhar ou vier estranha, o script termina com erro SEM
//   alterar nenhum arquivo (o workflow então não publica nada).
// - Só reescreve arquivos cujo preço mudou. Quando um arquivo muda, a data
//   "Página atualizada em DD/MM/AAAA" e o "dateModified" do schema dele
//   passam a ser a data de hoje (horário de Brasília).
//
// MARCADORES (só o que está dentro deles é reescrito)
//   HTML / .md / .txt:
//     <!--p:CHAVE-->R$ 570<!--/p-->     preço com "R$"
//     <!--n:CHAVE-->570<!--/n-->        só o número
//     <!--d-->16/11/2026<!--/d-->       data da última atualização da página
//     <!--bloco:tabela-md-->…<!--/bloco-->    tabela completa em markdown
//     <!--bloco:tabela-html-->…<!--/bloco-->  linhas <tr> da tabela do /precos
//     <!--bloco:bairros-links-->…<!--/bloco-->  links de todos os bairros com página (chips)
//   JavaScript:
//     /*n:CHAVE*/570/*/n*/              número
//     /*s:CHAVE*/'R$ 570'/*/s*/         texto entre aspas simples
//   <title> e <meta>: atributo data-tpl="… {CHAVE} … {d} …"
//     (o texto do <title> / o content do <meta> é gerado a partir dele)
//   FAQ: se a resposta visível de uma pergunta tem marcador, a resposta da
//     mesma pergunta no schema FAQPage é reescrita com o mesmo texto.
//
// CHAVES
//   b:Bairro        preço do bairro (precos_bairros, nome exato do Supabase)
//   z:Zona          preço padrão da zona (precos_zonas)
//   min:G / max:G / faixa:G   menor, maior ou "R$ X a R$ Y" entre os bairros do
//                   grupo G: * (todos), uma zona (como está em precos_bairros) ou
//                   uma lista "Zona Sul+Zona Norte" / "Osasco+Carapicuíba".
//                   faixa vira "R$ X" se forem todos iguais.
//
// USO LOCAL
//   node scripts/atualizar-precos.mjs            (lê o Supabase e escreve)
//   node scripts/atualizar-precos.mjs --checar   (só mostra o que mudaria)
// =====================================================================

import fs from 'node:fs';
import path from 'node:path';

const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SB_URL = process.env.SUPABASE_URL || 'https://ejfuqijtiberxsnvxdwm.supabase.co';
const SB_KEY = process.env.SUPABASE_KEY_PUBLICA || 'sb_publishable_VvMIbjms3nf-YLh46wuPKA_6FaRpaxX';
const SO_CHECAR = process.argv.includes('--checar');
const SAIDA_GH = process.env.GITHUB_OUTPUT;

const IGNORAR = new Set(['TEMPLATE_BAIRRO.html', 'monitoring-dashboard.html', 'monitoring-dashboard-v1-backup.html']);
const ALVOS_EXTRA = ['api/precos-zonas.js', 'public/cep-redirect.js'];

function falhar(msg) {
  console.error('ERRO: ' + msg);
  console.error('Nada foi alterado. Os preços publicados continuam como estão.');
  process.exit(1);
}

// ---------- data de hoje em Brasília ----------
function hojeBrasilia() {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(new Date()).reduce((o, x) => (o[x.type] = x.value, o), {});
  return { iso: `${p.year}-${p.month}-${p.day}`, br: `${p.day}/${p.month}/${p.year}` };
}

// ---------- leitura do Supabase (somente GET) ----------
async function lerTabela(tabela, colunas) {
  // Só para teste local: PRECOS_TESTE_ARQUIVO=arquivo.json com { precos_bairros: [...], precos_zonas: [...] }
  if (process.env.PRECOS_TESTE_ARQUIVO) {
    const d = JSON.parse(fs.readFileSync(process.env.PRECOS_TESTE_ARQUIVO, 'utf8'))[tabela];
    if (!Array.isArray(d) || d.length === 0) falhar(`${tabela} veio vazia (arquivo de teste)`);
    return d;
  }
  const url = `${SB_URL}/rest/v1/${tabela}?select=${colunas}`;
  let r;
  try {
    r = await fetch(url, { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }, signal: AbortSignal.timeout(20000) });
  } catch (e) { falhar(`não consegui ler ${tabela} (${e.message})`); }
  if (!r.ok) falhar(`leitura de ${tabela} respondeu HTTP ${r.status}`);
  let dados;
  try { dados = await r.json(); } catch (e) { falhar(`resposta de ${tabela} não é JSON`); }
  if (!Array.isArray(dados) || dados.length === 0) falhar(`${tabela} veio vazia`);
  return dados;
}

function precoValido(v) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 && n < 10000 ? n : null;
}

// Se um dia aparecer mais de uma linha para o mesmo bairro/zona, vale a mais recente.
function maisRecente(linhas, chave) {
  const ts = l => Date.parse(l.atualizado_em || l.criado_em || 0) || 0;
  const m = new Map();
  for (const l of linhas) {
    const k = String(l[chave] || '').trim();
    if (!k) continue;
    if (!m.has(k) || ts(l) >= ts(m.get(k))) m.set(k, l);
  }
  return m;
}

async function carregarPrecos() {
  const bairrosRaw = await lerTabela('precos_bairros', 'bairro,zona,preco_com_nf,ativo,criado_em,atualizado_em');
  const zonasRaw = await lerTabela('precos_zonas', 'zona,preco_padrao,criado_em');
  const bairros = new Map(), zonaDoBairro = new Map(), zonas = new Map();
  for (const [nome, l] of maisRecente(bairrosRaw, 'bairro')) {
    if (l.ativo === false) continue;
    const v = precoValido(l.preco_com_nf);
    if (v === null) falhar(`preço inválido para o bairro ${nome}: ${l.preco_com_nf}`);
    bairros.set(nome, v); zonaDoBairro.set(nome, String(l.zona || '').trim());
  }
  for (const [nome, l] of maisRecente(zonasRaw, 'zona')) {
    const v = precoValido(l.preco_padrao);
    if (v === null) falhar(`preço inválido para a zona ${nome}: ${l.preco_padrao}`);
    zonas.set(nome, v);
  }
  if (bairros.size === 0) falhar('nenhum bairro ativo com preço');
  return { bairros, zonaDoBairro, zonas };
}

// ---------- resolução de chaves ----------
const fmtNum = v => Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
const fmtR = v => 'R$ ' + fmtNum(v);

function criarResolvedor(P) {
  // grupo: '*' (todos), nome de zona, ou lista "A+B+C" de zonas e/ou bairros
  const zonasDeBairro = new Set(P.zonaDoBairro.values());
  const doGrupo = spec => {
    if (spec === '*') return [...P.bairros.values()];
    const vs = [];
    for (const item of spec.split('+').map(x => x.trim())) {
      if (zonasDeBairro.has(item)) vs.push(...[...P.bairros].filter(([b]) => P.zonaDoBairro.get(b) === item).map(([, v]) => v));
      else if (P.bairros.has(item)) vs.push(P.bairros.get(item));
      else throw new Error(`"${item}" não é zona nem bairro ativo no Supabase`);
    }
    if (!vs.length) throw new Error(`grupo vazio "${spec}"`);
    return vs;
  };
  function valor(chave) {
    const i = chave.indexOf(':');
    const tipo = chave.slice(0, i), nome = chave.slice(i + 1);
    if (tipo === 'b') { if (!P.bairros.has(nome)) throw new Error(`bairro "${nome}" não existe (ou está inativo) no Supabase`); return P.bairros.get(nome); }
    if (tipo === 'z') { if (!P.zonas.has(nome)) throw new Error(`zona "${nome}" não existe no Supabase`); return P.zonas.get(nome); }
    if (tipo === 'min') return Math.min(...doGrupo(nome));
    if (tipo === 'max') return Math.max(...doGrupo(nome));
    throw new Error(`chave numérica desconhecida "${chave}"`);
  }
  function texto(chave) {
    if (chave.startsWith('faixa:')) {
      const nome = chave.slice(6), vs = doGrupo(nome), a = Math.min(...vs), b = Math.max(...vs);
      return a === b ? fmtR(a) : `${fmtR(a)} a ${fmtR(b)}`;
    }
    return fmtR(valor(chave));
  }
  return { valor, texto };
}

// ---------- blocos gerados ----------
function paginasPorBairro() {
  const m = new Map();
  for (const f of fs.readdirSync(path.join(RAIZ, 'public'))) {
    if (!f.endsWith('.html') || IGNORAR.has(f)) continue;
    const s = fs.readFileSync(path.join(RAIZ, 'public', f), 'utf8');
    const x = s.match(/(?:const|let|var)\s+BAIRRO\s*=\s*['"]([^'"]+)['"]/);
    if (x) m.set(x[1], '/' + f.replace(/\.html$/, ''));
  }
  return m;
}
const ORDEM_ZONAS = ['Zona Sul', 'Zona Oeste', 'Zona Norte', 'Zona Leste', 'Zona Central', 'Grande SP'];
const NOME_ZONA = { 'Zona Central': 'Centro' };
// CTR-e só na capital (AMLURB); nas demais cidades é MTR (SIGOR/CETESB)
const documento = z => (z === 'Grande SP' || z === 'Litoral SP') ? 'NF + MTR' : 'NF + CTR';
function linhasTabela(P) {
  const ordem = z => { const i = ORDEM_ZONAS.indexOf(z); return i < 0 ? 99 : i; };
  return [...P.bairros].map(([b, v]) => ({ b, v, z: P.zonaDoBairro.get(b) || '' }))
    .sort((x, y) => ordem(x.z) - ordem(y.z) || x.z.localeCompare(y.z, 'pt-BR') || x.b.localeCompare(y.b, 'pt-BR'));
}
function blocoTabelaMd(P) {
  const pags = paginasPorBairro();
  const out = ['| Zona | Bairro / cidade | Preço com NF | Documento | Página |', '|---|---|---|---|---|'];
  for (const { b, v, z } of linhasTabela(P)) {
    const url = pags.get(b) ? `https://www.padraocacamba.com.br${pags.get(b)}` : '—';
    out.push(`| ${NOME_ZONA[z] || z} | ${b} | ${fmtR(v)} | ${documento(z)} | ${url} |`);
  }
  if (P.zonas.has('Litoral SP')) out.push(`| Litoral SP | todas as cidades do Litoral atendidas | ${fmtR(P.zonas.get('Litoral SP'))} | NF + MTR | — |`);
  return '\n' + out.join('\n') + '\n';
}
function blocoTabelaHtml(P) {
  const pags = paginasPorBairro();
  const td = 'padding:11px 8px';
  const out = [];
  for (const { b, v, z } of linhasTabela(P)) {
    const nome = pags.get(b) ? `<a href="${pags.get(b)}" style="color:var(--white)">${b}</a>` : b;
    out.push(`<tr style="border-bottom:1px solid var(--border)"><td style="${td};color:var(--muted)">${NOME_ZONA[z] || z}</td><td style="${td}">${nome}</td><td style="${td};text-align:right;color:var(--green);font-weight:700">${fmtR(v)}</td><td style="${td};color:var(--mid)">${documento(z)}</td></tr>`);
  }
  return '\n' + out.join('\n') + '\n';
}

// Lista de links de bairro (chips) — usada na /cacamba-de-entulho
const COR_ZONA = { 'Grande SP': '#34d399', 'Zona Sul': '#00FF7F', 'Zona Oeste': '#60a5fa', 'Zona Norte': '#a78bfa', 'Zona Central': '#fbbf24', 'Zona Leste': '#fb923c' };
function blocoBairrosLinks(P) {
  const pags = paginasPorBairro();
  const out = [];
  for (const { b, v, z } of linhasTabela(P)) {
    if (!pags.get(b)) continue;
    out.push(`<a href="${pags.get(b)}" class="bairro-chip"><div><div class="bairro-chip-nome">${b}</div><div class="bairro-chip-ref" style="color:${COR_ZONA[z] || '#888'}">${NOME_ZONA[z] || z} · ${fmtR(v)}</div></div><span class="bairro-chip-arrow">›</span></a>`);
  }
  return '\n' + out.join('\n') + '\n';
}

// ---------- renderização de um arquivo ----------
const desescapar = s => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&darr;/g, '↓').replace(/&rarr;/g, '→');
const escAttr = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const semPreco = t => t.replace(/R\$\s?[\d.,]+/g, 'R$ #');
const textoPuro = html => desescapar(html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

function renderizar(conteudo, R, P, data, nomeArq) {
  let s = conteudo;
  const tpl = t => t.replace(/\{([a-z]+:[^{}]+|d)\}/g, (_, k) => k === 'd' ? data.br : R.texto(k));

  s = s.replace(/<!--p:([^>]+?)-->[\s\S]*?<!--\/p-->/g, (_, k) => `<!--p:${k}-->${R.texto(k)}<!--/p-->`);
  s = s.replace(/<!--n:([^>]+?)-->[\s\S]*?<!--\/n-->/g, (_, k) => `<!--n:${k}-->${fmtNum(R.valor(k))}<!--/n-->`);
  s = s.replace(/\/\*n:([^\n]+?)\*\/[\s\S]*?\/\*\/n\*\//g, (_, k) => `/*n:${k}*/${R.valor(k)}/*/n*/`);
  s = s.replace(/\/\*s:([^\n]+?)\*\/[\s\S]*?\/\*\/s\*\//g, (_, k) => `/*s:${k}*/'${R.texto(k)}'/*/s*/`);
  s = s.replace(/<!--bloco:tabela-md-->[\s\S]*?<!--\/bloco-->/g, () => `<!--bloco:tabela-md-->${blocoTabelaMd(P)}<!--/bloco-->`);
  s = s.replace(/<!--bloco:tabela-html-->[\s\S]*?<!--\/bloco-->/g, () => `<!--bloco:tabela-html-->${blocoTabelaHtml(P)}<!--/bloco-->`);
  s = s.replace(/<!--bloco:bairros-links-->[\s\S]*?<!--\/bloco-->/g, () => `<!--bloco:bairros-links-->${blocoBairrosLinks(P)}<!--/bloco-->`);
  s = s.replace(/<!--d-->[\s\S]*?<!--\/d-->/g, `<!--d-->${data.br}<!--/d-->`);

  // <title data-tpl="…">…</title>
  s = s.replace(/<title([^>]*?)\sdata-tpl="([^"]*)"([^>]*)>[\s\S]*?<\/title>/g,
    (_, a, t, b) => `<title${a} data-tpl="${t}"${b}>${escAttr(tpl(desescapar(t)))}</title>`);
  // <meta … data-tpl="…" …> → atualiza content
  s = s.replace(/<meta\b[^>]*\sdata-tpl="[^"]*"[^>]*>/g, tag => {
    const t = desescapar(tag.match(/\sdata-tpl="([^"]*)"/)[1]);
    if (!/\scontent="[^"]*"/.test(tag)) throw new Error(`${nomeArq}: <meta data-tpl> sem content`);
    return tag.replace(/\scontent="[^"]*"/, ` content="${escAttr(tpl(t))}"`);
  });

  // FAQ visível com marcador → mesma resposta no schema FAQPage
  if (/class="faq-item"/.test(s) && /application\/ld\+json/.test(s)) {
    const respostas = new Map();
    const re = /<div class="faq-q"[^>]*>([\s\S]*?)<\/div>\s*<div class="faq-a"[^>]*>([\s\S]*?)<\/div>/g;
    let m;
    while ((m = re.exec(s))) {
      if (!/<!--[pn]:/.test(m[1] + m[2])) continue;
      const q = textoPuro(m[1].replace(/<span class="faq-arr">[\s\S]*?<\/span>/, ''));
      respostas.set(semPreco(q), { q, a: textoPuro(m[2]) });
    }
    if (respostas.size) {
      const usadas = new Set();
      s = s.replace(/(<script type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g, (bloco, a, json, b) => {
        let obj; try { obj = JSON.parse(json); } catch { return bloco; }
        // acha todo FAQPage dentro do JSON (no topo, em @graph ou aninhado, ex.: BlogPosting.mainEntity)
        const lista = [];
        (function andar(x) { if (Array.isArray(x)) x.forEach(andar); else if (x && typeof x === 'object') { if (x['@type'] === 'FAQPage') lista.push(x); Object.values(x).forEach(andar); } })(obj);
        let mexeu = false;
        for (const o of lista) {
          if (o['@type'] !== 'FAQPage' || !Array.isArray(o.mainEntity)) continue;
          for (const q of o.mainEntity) {
            const chave = semPreco(String(q.name || '').replace(/\s+/g, ' ').trim());
            if (respostas.has(chave)) {
              usadas.add(chave);
              const r = respostas.get(chave);
              if (q.name !== r.q) { q.name = r.q; mexeu = true; }
              if (q.acceptedAnswer && q.acceptedAnswer.text !== r.a) { q.acceptedAnswer.text = r.a; mexeu = true; }
            }
          }
        }
        if (!mexeu) return bloco;
        const compacto = !/\n/.test(json.trim()) && !/": "/.test(json);
        return a + (compacto ? JSON.stringify(obj) : JSON.stringify(obj).replace(/":(?=[^\s])/g, '": ').replace(/,"(?=[@A-Za-z])/g, ', "')) + b;
      });
      for (const [k, r] of respostas) if (!usadas.has(k)) throw new Error(`${nomeArq}: pergunta do FAQ sem par no schema: "${r.q}"`);
    }
  }
  return s;
}

function comDataSchema(s, data) {
  return s.replace(/("dateModified"\s*:\s*")[^"]*(")/g, `$1${data.iso}$2`)
          .replace(/^date_modified: .*$/m, `date_modified: ${data.iso}`);
}

function listarAlvos() {
  const out = [];
  const andar = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) andar(p);
      else if (/\.(html|md|txt)$/.test(e.name) && !IGNORAR.has(e.name)) out.push(p);
    }
  };
  andar(path.join(RAIZ, 'public'));
  for (const f of ALVOS_EXTRA) out.push(path.join(RAIZ, f));
  return out;
}

// ---------- principal ----------
const P = await carregarPrecos();
const R = criarResolvedor(P);
const hoje = hojeBrasilia();
const mudancas = [];
let comMarcador = 0;

for (const arq of listarAlvos()) {
  const atual = fs.readFileSync(arq, 'utf8');
  if (!/<!--[pnd]:?|\/\*[ns]:|data-tpl="|<!--bloco:/.test(atual)) continue;
  comMarcador++;
  const rel = path.relative(RAIZ, arq);
  const dm = atual.match(/<!--d-->(\d{2})\/(\d{2})\/(\d{4})<!--\/d-->/);
  const dataAtual = dm ? { br: `${dm[1]}/${dm[2]}/${dm[3]}`, iso: `${dm[3]}-${dm[2]}-${dm[1]}` } : hoje;
  let novo;
  try {
    novo = renderizar(atual, R, P, dataAtual, rel);
    if (novo !== atual) novo = comDataSchema(renderizar(atual, R, P, hoje, rel), hoje);
  } catch (e) { falhar(`${rel}: ${e.message}`); }
  if (novo !== atual) mudancas.push({ arq, rel, novo });
}

// Snapshot dos preços (só é gravado junto com uma mudança de preço)
const snapshot = {
  observacao: 'Gerado por scripts/atualizar-precos.mjs a partir do Supabase (somente leitura). Não editar à mão.',
  data_da_ultima_mudanca: hoje.iso,
  bairros: Object.fromEntries([...P.bairros].sort((a, b) => a[0].localeCompare(b[0], 'pt-BR')).map(([b, v]) => [b, { zona: P.zonaDoBairro.get(b), preco_com_nf: v }])),
  zonas: Object.fromEntries([...P.zonas].sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'))),
};

console.log(`Supabase lido: ${P.bairros.size} bairros ativos, ${P.zonas.size} zonas. Arquivos com marcador: ${comMarcador}.`);
if (!mudancas.length) {
  console.log('Nenhum preço mudou. Nada a publicar.');
  if (SAIDA_GH) fs.appendFileSync(SAIDA_GH, 'mudou=nao\n');
  process.exit(0);
}
console.log(`${mudancas.length} arquivo(s) com preço diferente do Supabase:`);
for (const m of mudancas) console.log('  - ' + m.rel);
if (SO_CHECAR) { console.log('(--checar: nada foi gravado)'); process.exit(0); }

for (const m of mudancas) fs.writeFileSync(m.arq, m.novo);
// o snapshot só muda quando um PREÇO muda (mudança de texto/estrutura de página não conta)
fs.mkdirSync(path.join(RAIZ, 'dados'), { recursive: true });
const arqSnap = path.join(RAIZ, 'dados/precos.json');
let anterior = null;
try { anterior = JSON.parse(fs.readFileSync(arqSnap, 'utf8')); } catch {}
const mesmosPrecos = anterior && JSON.stringify(anterior.bairros) === JSON.stringify(snapshot.bairros) && JSON.stringify(anterior.zonas) === JSON.stringify(snapshot.zonas);
if (!mesmosPrecos) fs.writeFileSync(arqSnap, JSON.stringify(snapshot, null, 2) + '\n');
if (SAIDA_GH) fs.appendFileSync(SAIDA_GH, `mudou=sim\narquivos=${mudancas.length}\n`);
console.log('Arquivos atualizados.');
