// api/precos-zonas.js — Endpoint para carregar tabela de preços por zona
// Simples e confiável — sem bairros

const SB_URL = process.env.SUPABASE_URL || 'https://ejfuqijtiberxsnvxdwm.supabase.co';
const SB_KEY = process.env.SUPABASE_KEY || 'sb_publishable_VvMIbjms3nf-YLh46wuPKA_6FaRpaxX';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  try {
    const resZonas = await fetch(`${SB_URL}/rest/v1/precos_zonas?order=preco_padrao.asc`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
    });
    const zonas = await resZonas.json();
    
    if (Array.isArray(zonas)) {
      return res.status(200).json(zonas);
    }
    throw new Error('Supabase error');
  } catch (error) {
    // Fallback com dados estáticos — os números com marcador "n:" são reescritos
    // pela rotina de preços (scripts/atualizar-precos.mjs) a partir do Supabase.
    return res.status(200).json([
      { zona: 'Litoral SP', preco_padrao: /*n:z:Litoral SP*/350/*/n*/ },
      { zona: 'Grande SP', preco_padrao: /*n:z:Grande SP*/570/*/n*/ },
      { zona: 'Zona Sul', preco_padrao: /*n:z:Zona Sul*/570/*/n*/ },
      { zona: 'Zona Oeste', preco_padrao: /*n:z:Zona Oeste*/570/*/n*/ },
      { zona: 'Zona Norte', preco_padrao: /*n:z:Zona Norte*/570/*/n*/ },
      { zona: 'Centro', preco_padrao: /*n:z:Centro*/570/*/n*/ },
      { zona: 'Zona Leste', preco_padrao: /*n:z:Zona Leste*/600/*/n*/ }
    ]);
  }
}
