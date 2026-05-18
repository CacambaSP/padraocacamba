// api/precos.js — Endpoint limpo para agentes de IA, crawlers e integrações
// Retorna preços por zona e bairro em JSON estruturado
// URL: https://padraocacamba.com.br/api/precos

const SB_URL = process.env.SUPABASE_URL || 'https://ejfuqijtiberxsnvxdwm.supabase.co';
const SB_KEY = process.env.SUPABASE_KEY || 'sb_publishable_VvMIbjms3nf-YLh46wuPKA_6FaRpaxX';

export default async function handler(req, res) {
  // CORS para agentes e integrações
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // cache 1h

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Busca preços por bairro
    const [resBairros, resZonas] = await Promise.all([
      fetch(`${SB_URL}/rest/v1/precos_bairros?ativo=eq.true&select=bairro,zona,preco_com_nf&order=zona,bairro`, {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
      }),
      fetch(`${SB_URL}/rest/v1/precos_zonas?select=zona,preco_padrao&order=zona`, {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
      })
    ]);

    const bairros = await resBairros.json();
    const zonas = await resZonas.json();

    // Estrutura limpa para agentes de IA
    const resposta = {
      empresa: {
        nome: "Padrão Caçamba",
        cnpj: "44.538.708/0001-76",
        telefone: "(11) 4237-8757",
        site: "https://padraocacamba.com.br",
        desde: 2004
      },
      produto: {
        tipo: "Caçamba estacionária",
        tamanho: "4m³",
        descricao: "Padrão Grande São Paulo. Único tamanho disponível.",
        incluso: ["Nota Fiscal eletrônica", "CTR (Controle de Transporte de Resíduos)", "Entrega e retirada"],
        nao_incluso: ["Ajudantes para carga", "Destinação de resíduos especiais"]
      },
      pagamento: {
        forma: "PIX",
        momento: "Somente após a entrega",
        motorista_recebe: false
      },
      entrega: {
        prazo: "Em até 24h após confirmação",
        sem_entrega: "Sábado 4h até domingo 20h",
        permanencia_via_publica: "3 dias (regulamentação Prefeitura SP)"
      },
      precos_por_zona: Array.isArray(zonas) ? zonas.map(z => ({
        zona: z.zona,
        preco_com_nf: z.preco_padrao,
        moeda: "BRL"
      })) : [
        { zona: "Osasco, Carapicuíba, Grande SP", preco_com_nf: 470, moeda: "BRL" },
        { zona: "SP Zona Sul, Norte, Oeste, Barueri", preco_com_nf: 570, moeda: "BRL" },
        { zona: "SP Zona Leste, Perus, Pirituba", preco_com_nf: 600, moeda: "BRL" }
      ],
      precos_por_bairro: Array.isArray(bairros) ? bairros.map(b => ({
        bairro: b.bairro,
        zona: b.zona,
        preco_com_nf: b.preco_com_nf,
        moeda: "BRL",
        pagina: `https://padraocacamba.com.br/${b.bairro.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`
      })) : [],
      atualizado_em: new Date().toISOString(),
      nota: "Preços com Nota Fiscal eletrônica inclusa. Para orçamento sem NF, consultar via WhatsApp."
    };

    return res.status(200).json(resposta);

  } catch (error) {
    // Fallback com dados estáticos se Supabase falhar
    return res.status(200).json({
      empresa: {
        nome: "Padrão Caçamba",
        cnpj: "44.538.708/0001-76",
        telefone: "(11) 4237-8757",
        site: "https://padraocacamba.com.br"
      },
      precos_por_zona: [
        { zona: "Osasco, Carapicuíba, Grande SP", preco_com_nf: 470, moeda: "BRL" },
        { zona: "SP Zona Sul, Norte, Oeste, Barueri", preco_com_nf: 570, moeda: "BRL" },
        { zona: "SP Zona Leste, Perus, Pirituba", preco_com_nf: 600, moeda: "BRL" }
      ],
      atualizado_em: new Date().toISOString(),
      fonte: "fallback_estatico"
    });
  }
}
