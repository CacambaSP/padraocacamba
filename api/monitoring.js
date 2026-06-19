// /api/monitoring.js
// Roda a cada noite às 2h UTC (-3 = 23h SP)
// Busca posição de cada bairro no Google e salva em Supabase
// COM: Rate Limiting, Logs de Acesso, Segurança

export const config = {
  maxDuration: 120
};

export default async function handler(req, res) {
  const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const SB_URL = process.env.SUPABASE_URL;
  const SB_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

  try {
    // 1️⃣ VERIFICAR RATE LIMIT
    const rateLimitOk = await verificarRateLimit(clientIp, '/api/monitoring', SB_URL, SB_KEY);
    
    if (!rateLimitOk) {
      registrarAcesso(clientIp, '/api/monitoring', 'rate_limit', SB_URL, SB_KEY);
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Limite de requisições excedido. Máximo 10 chamadas por hora.'
      });
    }

    // 2️⃣ VERIFICAR TOKEN DE SEGURANÇA
    const cronSecret = process.env.MONITORING_CRON_SECRET;
    const authHeader = req.headers['authorization'] || '';
    
    if (cronSecret && req.method === 'POST' && !authHeader.includes(cronSecret)) {
      registrarAcesso(clientIp, '/api/monitoring', 'unauthorized', SB_URL, SB_KEY);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log(`[${new Date().toISOString()}] Iniciando monitoring...`);

    // 3️⃣ BUSCAR BAIRROS A MONITORAR
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

    // 4️⃣ BUSCAR POSIÇÃO DE CADA BAIRRO
    for (const b of bairros) {
      try {
        const posicao = await buscarPosicaoGoogle(b.palavra_chave);
        
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

        await new Promise(r => setTimeout(r, 500));
      } catch (err) {
        console.error(`Erro ao buscar ${b.bairro}:`, err.message);
      }
    }

    // 5️⃣ ATUALIZAR RANKINGS
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

      // Salvar no histórico
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

    // 6️⃣ REGISTRAR SUCESSO
    registrarAcesso(clientIp, '/api/monitoring', 'success', SB_URL, SB_KEY);

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
    registrarAcesso(clientIp, '/api/monitoring', 'error', SB_URL, SB_KEY);
    return res.status(500).json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// ========================================
// SEGURANÇA: Rate Limiting
// ========================================

async function verificarRateLimit(ip, endpoint, sbUrl, sbKey) {
  try {
    const agora = new Date();
    
    // Buscar limite anterior deste IP
    const res = await fetch(
      `${sbUrl}/rest/v1/rate_limit?ip_address=eq.${encodeURIComponent(ip)}&endpoint=eq.${encodeURIComponent(endpoint)}`,
      {
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`
        }
      }
    );

    const data = await res.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      // Primeiro acesso - criar novo registro
      await fetch(`${sbUrl}/rest/v1/rate_limit`, {
        method: 'POST',
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          ip_address: ip,
          endpoint: endpoint,
          request_count: 1,
          window_start: agora.toISOString(),
          window_end: new Date(agora.getTime() + 60 * 60 * 1000).toISOString()
        })
      });
      return true;
    }

    const record = data[0];
    const windowEnd = new Date(record.window_end);
    
    // Verificar se janela expirou
    if (agora > windowEnd) {
      // Resetar contador
      await fetch(`${sbUrl}/rest/v1/rate_limit?id=eq.${record.id}`, {
        method: 'PATCH',
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request_count: 1,
          window_start: agora.toISOString(),
          window_end: new Date(agora.getTime() + 60 * 60 * 1000).toISOString()
        })
      });
      return true;
    }

    // Verificar se excedeu limite (máx 10 por hora)
    if (record.request_count >= 10) {
      return false;
    }

    // Incrementar contador
    await fetch(`${sbUrl}/rest/v1/rate_limit?id=eq.${record.id}`, {
      method: 'PATCH',
      headers: {
        apikey: sbKey,
        Authorization: `Bearer ${sbKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request_count: record.request_count + 1
      })
    });

    return true;

  } catch (err) {
    console.error('Erro no rate limit:', err);
    // Em caso de erro, permitir (falha aberta)
    return true;
  }
}

// ========================================
// AUDITORIA: Registrar Acessos
// ========================================

async function registrarAcesso(ip, endpoint, status, sbUrl, sbKey) {
  try {
    await fetch(`${sbUrl}/rest/v1/access_logs`, {
      method: 'POST',
      headers: {
        apikey: sbKey,
        Authorization: `Bearer ${sbKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        endpoint: endpoint,
        ip_address: ip,
        status: status,
        user_agent: 'monitoring-api'
      })
    });
  } catch (err) {
    console.error('Erro ao registrar acesso:', err);
  }
}

// ========================================
// BUSCAR POSIÇÃO (simulado)
// ========================================

async function buscarPosicaoGoogle(palavraChave) {
  // VERSÃO SIMULADA (substitua depois por API real)
  const posicaoSimulada = Math.floor(Math.random() * 50) + 1;
  
  const GOOGLE_SEARCH_CONSOLE_API = process.env.GOOGLE_SEARCH_CONSOLE_API;
  const SEMRUSH_API_KEY = process.env.SEMRUSH_API_KEY;
  
  if (!SEMRUSH_API_KEY && !GOOGLE_SEARCH_CONSOLE_API) {
    return posicaoSimulada;
  }

  try {
    return posicaoSimulada;
  } catch (err) {
    console.error('Erro ao buscar ranking:', err);
    return null;
  }
}
