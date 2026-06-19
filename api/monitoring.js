// /api/monitoring.js
// Roda a cada noite às 2h UTC (-3 = 23h SP)
// Busca posição de cada bairro no Google e salva em Supabase

export const config = {
  maxDuration: 120
};

export default async function handler(req, res) {
  // Verificar token de segurança (Vercel envia automaticamente)
  const cronSecret = process.env.MONITORING_CRON_SECRET;
  const authHeader = req.headers['authorization'] || '';
  
  if (cronSecret && !authHeader.includes(cronSecret)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const SB_URL = process.env.SUPABASE_URL;
    const SB_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

    console.log(`[${new Date().toISOString()}] Iniciando monitoring...`);

    // 1. Buscar bairros a monitorar
    const resBairros = await fetch(
      `${SB_URL}/rest/v1/rankings_monitoring?select=id,bairro,slug,zona,palavra_chave,posicao_google`,
      {
        headers: {
          apikey: SB_KEY,
          Authorization: `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!resBairros.ok) {
      throw new Error(`Erro ao buscar bairros: ${resBairros.status}`);
    }

    const bairros = await resBairros.json();
    console.log(`[${new Date().toISOString()}] ${bairros.length} bairros encontrados`);

    const updates = [];

    // 2. Para cada bairro, buscar posição
    for (const b of bairros) {
      try {
        const posicao = await buscarPosicaoGoogle(b.palavra_chave);
        
        // Comparar com posição anterior
        let trend = 'novo';
        if (b.posicao_google > 0) {
          if (posicao < b.posicao_google) {
            trend = 'subindo';
          } else if (posicao > b.posicao_google) {
            trend = 'caindo';
          } else {
            trend = 'estavel';
          }
        }

        console.log(`  ${b.bairro}: #${posicao} (era #${b.posicao_google}) — ${trend}`);

        updates.push({
          id: b.id,
          bairro: b.bairro,
          palavra_chave: b.palavra_chave,
          posicao_anterior: b.posicao_google || 0,
          posicao_google: posicao,
          trend: trend
        });

        // Pequeno delay pra não sobrecarregar
        await new Promise(r => setTimeout(r, 500));
      } catch (err) {
        console.error(`Erro ao buscar ${b.bairro}:`, err.message);
      }
    }

    // 3. Atualizar rankings_monitoring
    for (const update of updates) {
      const updatePayload = {
        posicao_google: update.posicao_google,
        posicao_anterior: update.posicao_anterior,
        trend: update.trend,
        data_verificacao: new Date().toISOString(),
        atualizado_em: new Date().toISOString()
      };

      await fetch(`${SB_URL}/rest/v1/rankings_monitoring?id=eq.${update.id}`, {
        method: 'PATCH',
        headers: {
          apikey: SB_KEY,
          Authorization: `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePayload)
      });

      // Salvar também no histórico
      const dataHoje = new Date().toISOString().split('T')[0];
      await fetch(`${SB_URL}/rest/v1/rankings_historico`, {
        method: 'POST',
        headers: {
          apikey: SB_KEY,
          Authorization: `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          bairro: update.bairro,
          palavra_chave: update.palavra_chave,
          posicao: update.posicao_google,
          data_verificacao: dataHoje
        })
      });
    }

    console.log(`[${new Date().toISOString()}] ✅ Monitoring concluído`);

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      atualizacoes: updates.length,
      detalhes: updates.map(u => ({
        bairro: u.bairro,
        posicao: u.posicao_google,
        trend: u.trend
      }))
    });

  } catch (error) {
    console.error('[ERRO]', error);
    return res.status(500).json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Função para buscar posição no Google
// TODO: Integrar com API real (Semrush, Google Search Console, etc)
async function buscarPosicaoGoogle(palavraChave) {
  // VERSÃO SIMULADA (substitua depois por API real)
  
  // Opção 1: Google Search Console API (recomendado - gratuito)
  // https://developers.google.com/webmasters/search-console/v1/how-tos/getting-started
  
  // Opção 2: Semrush API (pago - mais preciso)
  // https://developer.semrush.com/
  
  // Opção 3: Ahrefs API (pago)
  // https://api.ahrefs.com/
  
  // Por enquanto, retorna simulado pra teste
  // Mude para real assim que tiver API key
  
  const posicaoSimulada = Math.floor(Math.random() * 50) + 1;
  
  // Placeholder pra integração futura
  const GOOGLE_SEARCH_CONSOLE_API = process.env.GOOGLE_SEARCH_CONSOLE_API;
  const SEMRUSH_API_KEY = process.env.SEMRUSH_API_KEY;
  
  if (!SEMRUSH_API_KEY && !GOOGLE_SEARCH_CONSOLE_API) {
    // Sem API, retorna simulado
    return posicaoSimulada;
  }

  try {
    // Aqui você integraria com a API real
    // Por enquanto, retorna simulado
    return posicaoSimulada;
  } catch (err) {
    console.error('Erro ao buscar ranking:', err);
    return null;
  }
}
