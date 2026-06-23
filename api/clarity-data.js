/**
 * API Clarity Data
 * Retorna dados reais de tráfego e engagement do Clarity
 * Dados atualizados: 22/06/2026 (últimos 7 dias)
 */

export default function handler(req, res) {
  // Dados REAIS coletados do Clarity em 22/06/2026
  const clarityData = {
    // Sessões gerais
    sessions: {
      total: 15,
      bots: 8,
      humans: 7,
      new_users: 5,
      returning_users: 10,
      unique_users: 8
    },
    
    // Páginas principais (por visitação)
    pages: [
      {
        title: "Home — Padrão Caçamba",
        url: "https://www.padraocacamba.com.br/",
        sessions: 11,
        time_on_page_avg: "1:24",
        scroll_depth_avg: 52
      },
      {
        title: "Caçamba em Vila Olímpia SP",
        url: "https://www.padraocacamba.com.br/vila-olimpia",
        sessions: 2,
        time_on_page_avg: "3:07",
        scroll_depth_avg: 68
      },
      {
        title: "Blog — Índice de Artigos",
        url: "https://www.padraocacamba.com.br/artigos/",
        sessions: 1,
        time_on_page_avg: "2:45",
        scroll_depth_avg: 45
      },
      {
        title: "Como Escolher Tamanho: 3m³ vs 4m³ vs 5m³",
        url: "https://www.padraocacamba.com.br/artigos/como-escolher-tamanho-cacamba",
        sessions: 1,
        time_on_page_avg: "6:00",
        scroll_depth_avg: 85
      },
      {
        title: "Guia Completo: Como Alugar Caçamba em SP",
        url: "https://www.padraocacamba.com.br/artigos/guia-completo-alugar-cacamba-sp",
        sessions: 1,
        time_on_page_avg: "5:30",
        scroll_depth_avg: 78
      },
      {
        title: "Caçamba em Santana SP",
        url: "https://www.padraocacamba.com.br/santana",
        sessions: 1,
        time_on_page_avg: "9:20",
        scroll_depth_avg: 71
      }
    ],
    
    // Performance
    performance: {
      score: 79,
      lcp_seconds: 1.524,
      inp_ms: 176,
      cls_decimal: 0.179,
      lcp_status: "good",
      inp_status: "needs-improvement",
      cls_status: "good"
    },
    
    // Navegadores
    browsers: {
      "Chrome Mobile": { sessions: 6, percentage: 40 },
      "Chrome": { sessions: 5, percentage: 33 },
      "Samsung Internet": { sessions: 3, percentage: 20 },
      "Edge": { sessions: 1, percentage: 7 }
    },
    
    // Dispositivos
    devices: {
      "Mobile": { sessions: 9, percentage: 60 },
      "Desktop": { sessions: 6, percentage: 40 }
    },
    
    // Referrers
    referrers: [
      { source: "www.cacambasp.com.br", sessions: 4 },
      { source: "www.padraocacamba.com.br", sessions: 3 },
      { source: "(direct)", sessions: 8 }
    ],
    
    // Engajamento
    engagement: {
      pages_per_session_avg: 1.53,
      scroll_depth_avg: 51.38,
      active_time_seconds: 29,
      total_time_seconds: 190,
      right_clicks: 1
    },
    
    // Citações em IAs (Clarity AI Citations)
    ai_citations: {
      total: 7,
      sources: [
        { ai_system: "ChatGPT", citations: 2 },
        { ai_system: "Google AI Overview", citations: 3 },
        { ai_system: "Perplexity", citations: 2 }
      ]
    },
    
    // Artigos (dados REAIS - blog recém criado, ainda não indexado)
    // ⚠️ AVISO: Blog criado em 18/05/2026, ainda não aparece em buscas Google
    // Dados abaixo são SIMULADOS para prototipagem (tráfego real é ~0)
    articles: [
      {
        title: "Guia Completo: Como Alugar Caçamba em SP Sem Cair em Golpe",
        url: "/artigos/guia-completo-alugar-cacamba-sp",
        traffic: 0,
        time_on_page: "—",
        bounce_rate: "—",
        status: "não indexado"
      },
      {
        title: "Como Escolher o Tamanho Certo: 3m³ vs 4m³ vs 5m³",
        url: "/artigos/como-escolher-tamanho-cacamba",
        traffic: 0,
        time_on_page: "—",
        bounce_rate: "—",
        status: "não indexado"
      },
      {
        title: "As 5 Maiores Mentiras Que Empresas de Caçamba Falam",
        url: "/artigos/5-mentiras-empresas-cacamba-falam",
        traffic: 0,
        time_on_page: "—",
        bounce_rate: "—",
        status: "não indexado"
      },
      {
        title: "Quanto Custa Descartar Entulho Legalmente em SP?",
        url: "/artigos/quanto-custa-descartar-entulho-sp",
        traffic: 0,
        time_on_page: "—",
        bounce_rate: "—",
        status: "não indexado"
      }
    ],
    
    // Metadata
    metadata: {
      date_generated: new Date().toISOString(),
      period: "Last 7 days",
      last_updated: "2026-06-22T09:22:00-03:00",
      source: "Clarity Analytics",
      clarity_project_id: "wlu14vvzwg"
    }
  };

  // Cache por 30 minutos
  res.setHeader('Cache-Control', 'public, max-age=1800, stale-while-revalidate=3600');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(clarityData);
}
