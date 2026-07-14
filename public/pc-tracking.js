/* pc-tracking.js — Padrão Caçamba
   1) Captura utm_source/medium/campaign/content/term e gclid da URL
      e guarda na sessão (persiste ao navegar entre páginas).
   2) pcRegistrarEscala(): grava escalação do PC em pc_aprendizado
      incluindo os UTMs. Se as colunas UTM ainda não existirem no
      Supabase, regrava automaticamente sem UTM (fallback). */
(function () {
  try {
    var p = new URLSearchParams(location.search);
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'];
    var found = {};
    var has = false;
    keys.forEach(function (k) {
      var v = p.get(k);
      if (v) { found[k] = String(v).slice(0, 200); has = true; }
    });
    if (has) sessionStorage.setItem('pc_utm', JSON.stringify(found));
  } catch (e) {}
})();

function pcGetUTM() {
  try { return JSON.parse(sessionStorage.getItem('pc_utm') || '{}'); }
  catch (e) { return {}; }
}

async function pcRegistrarEscala(pergunta, respostaPc, motivoEscala, bairro, variante, trocas) {
  var SB = 'https://ejfuqijtiberxsnvxdwm.supabase.co';
  var KEY = 'sb_publishable_VvMIbjms3nf-YLh46wuPKA_6FaRpaxX';
  var base = {
    bairro: bairro || 'home',
    pagina: location.pathname,
    pergunta_cliente: pergunta,
    resposta_pc: respostaPc,
    motivo_escala: motivoEscala,
    fase_funil: 'troca_' + (trocas || 0),
    variante: variante || 'n/a',
    criado_em: new Date().toISOString()
  };
  var utm = pcGetUTM();
  var full = Object.assign({}, base, utm);
  async function post(body) {
    var r = await fetch(SB + '/rest/v1/pc_aprendizado', {
      method: 'POST',
      headers: {
        apikey: KEY,
        Authorization: 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(body)
    });
    return r.ok;
  }
  try {
    var ok = await post(full);
    if (!ok && Object.keys(utm).length > 0) await post(base);
  } catch (e) {
    try { await post(base); } catch (e2) {}
  }
}
