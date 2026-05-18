// schema-inject.js — Injeta schemas dinâmicos para SEO e IAs
// Inclua em todas as páginas de bairro: <script src="/schema-inject.js" defer></script>

(function () {

  // Contexto específico por bairro para IAs
  const CONTEXTO_BAIRROS = {
    'Itaim Bibi':        { ref: 'Faria Lima, Brigadeiro', janela: 'noturna 22h–4h', tipo_obra: 'reformas de apartamento alto padrão, lajes corporativas, condomínios fechados', acesso: 'Faria Lima e Brigadeiro com restrição em horário comercial — antes das 17h ou entre 22h e 4h', regra: 'Subprefeitura Pinheiros — máximo 3 dias em via pública' },
    'Vila Olímpia':      { ref: 'Berrini', janela: 'noturna 22h–4h', tipo_obra: 'reformas comerciais, escritórios, apartamentos de alto padrão', acesso: 'Berrini com restrição de estacionamento — preferir entrega noturna', regra: 'Subprefeitura Pinheiros — máximo 3 dias em via pública' },
    'Moema':             { ref: 'Ibirapuera', janela: 'noturna 22h–4h', tipo_obra: 'reformas residenciais de alto padrão, condomínios verticais', acesso: 'Acesso normal — confirmar restrições de condomínio', regra: 'Subprefeitura Vila Mariana — máximo 3 dias em via pública' },
    'Brooklin':          { ref: 'Berrini, WTC', janela: 'noturna 22h–4h', tipo_obra: 'obras corporativas, reformas de apartamento, condomínios residenciais', acesso: 'Berrini e WTC com restrição em horário comercial', regra: 'Subprefeitura Pinheiros — máximo 3 dias em via pública' },
    'Vila Mariana':      { ref: 'Metrô Ana Rosa', janela: 'noturna 22h–4h', tipo_obra: 'reformas residenciais, obras em condomínios verticais', acesso: 'Acesso normal na maioria das vias', regra: 'Subprefeitura Vila Mariana — máximo 3 dias em via pública' },
    'Campo Belo':        { ref: 'Aeroporto Congonhas', janela: 'noturna 22h–4h', tipo_obra: 'reformas residenciais, obras em casas e condomínios', acesso: 'Acesso normal — evitar proximidade do aeroporto', regra: 'Subprefeitura Santo Amaro — máximo 3 dias em via pública' },
    'Saúde':             { ref: 'Metrô Saúde', janela: 'noturna 22h–4h', tipo_obra: 'reformas residenciais, obras em sobrados e condomínios', acesso: 'Acesso normal na maioria das vias', regra: 'Subprefeitura Vila Mariana — máximo 3 dias em via pública' },
    'Jabaquara':         { ref: 'Terminal Jabaquara', janela: 'comercial 7h–17h', tipo_obra: 'reformas residenciais, obras em casas', acesso: 'Acesso normal', regra: 'Subprefeitura Jabaquara — máximo 3 dias em via pública' },
    'Santo Amaro':       { ref: 'Shopping Santo Amaro', janela: 'comercial 7h–17h', tipo_obra: 'reformas residenciais e comerciais', acesso: 'Acesso normal', regra: 'Subprefeitura Santo Amaro — máximo 3 dias em via pública' },
    'Cursino':           { ref: 'Metrô Cursino', janela: 'comercial 7h–17h', tipo_obra: 'reformas residenciais, obras em casas e sobrados', acesso: 'Acesso normal', regra: 'Subprefeitura Ipiranga — máximo 3 dias em via pública' },
    'Pinheiros':         { ref: 'Largo da Batata', janela: 'noturna 22h–4h', tipo_obra: 'reformas residenciais e comerciais, obras em condomínios', acesso: 'Largo da Batata com restrição — preferir vias paralelas', regra: 'Subprefeitura Pinheiros — máximo 3 dias em via pública' },
    'Vila Madalena':     { ref: 'Beco do Batman', janela: 'noturna 22h–4h', tipo_obra: 'reformas residenciais, obras em casas e sobrados de alto padrão', acesso: 'Ruas estreitas — confirmar acesso do caminhão', regra: 'Subprefeitura Pinheiros — máximo 3 dias em via pública' },
    'Higienópolis':      { ref: 'Mackenzie', janela: 'noturna 22h–4h', tipo_obra: 'reformas em apartamentos clássicos, obras em condomínios históricos', acesso: 'Vias largas — confirmar horário de acesso em condomínios', regra: 'Subprefeitura Sé — máximo 3 dias em via pública' },
    'Perdizes':          { ref: 'Rua Cardoso de Almeida', janela: 'noturna 22h–4h', tipo_obra: 'reformas residenciais, obras em casas e condomínios', acesso: 'Acesso normal', regra: 'Subprefeitura Lapa — máximo 3 dias em via pública' },
    'Lapa':              { ref: 'Estádio Palestra', janela: 'noturna 22h–4h', tipo_obra: 'reformas residenciais e comerciais, galpões', acesso: 'Acesso normal — evitar dias de jogo no Allianz Parque', regra: 'Subprefeitura Lapa — máximo 3 dias em via pública' },
    'Alto de Pinheiros': { ref: 'Rio Pinheiros', janela: 'noturna 22h–4h', tipo_obra: 'reformas em casas de alto padrão, obras em condomínios horizontais', acesso: 'Ruas residenciais — confirmar acesso', regra: 'Subprefeitura Pinheiros — máximo 3 dias em via pública' },
    'Santana':           { ref: 'Metrô Santana', janela: 'comercial 7h–17h', tipo_obra: 'reformas residenciais, obras em prédios e casas', acesso: 'Acesso normal', regra: 'Subprefeitura Santana/Tucuruvi — máximo 3 dias em via pública' },
    'Tucuruvi':          { ref: 'Metrô Tucuruvi', janela: 'comercial 7h–17h', tipo_obra: 'reformas residenciais, obras em casas', acesso: 'Acesso normal', regra: 'Subprefeitura Santana/Tucuruvi — máximo 3 dias em via pública' },
    'Vila Guilherme':    { ref: 'Metrô Vila Guilherme', janela: 'comercial 7h–17h', tipo_obra: 'reformas residenciais e comerciais', acesso: 'Acesso normal', regra: 'Subprefeitura Santana/Tucuruvi — máximo 3 dias em via pública' },
    'Tatuapé':           { ref: 'Metrô Tatuapé', janela: 'comercial 7h–17h', tipo_obra: 'reformas residenciais, obras em condomínios', acesso: 'Acesso normal', regra: 'Subprefeitura Mooca — máximo 3 dias em via pública' },
    'Penha':             { ref: 'Metrô Penha', janela: 'comercial 7h–17h', tipo_obra: 'reformas residenciais, obras em casas e sobrados', acesso: 'Acesso normal', regra: 'Subprefeitura Penha — máximo 3 dias em via pública' },
    'Vila Formosa':      { ref: 'Metrô Vila Formosa', janela: 'comercial 7h–17h', tipo_obra: 'reformas residenciais, obras em casas', acesso: 'Acesso normal', regra: 'Subprefeitura Mooca — máximo 3 dias em via pública' },
  };

  function injectSchema() {
    const bairro   = typeof BAIRRO    !== 'undefined' ? BAIRRO    : null;
    const zona     = typeof ZONA      !== 'undefined' ? ZONA      : null;
    const precoStr = typeof precoAtual !== 'undefined' ? precoAtual : null;
    if (!bairro || !precoStr) return;

    const precoNum = parseInt(precoStr.replace(/\D/g, ''));
    if (!precoNum) return;

    const hoje     = new Date().toISOString().split('T')[0];
    const urlAtual = window.location.href.split('?')[0];
    const ctx      = CONTEXTO_BAIRROS[bairro] || {};

    // 1. Service + PriceSpecification
    const priceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Locação de Caçamba 4m³ em " + bairro,
      "description": "Aluguel de caçamba estacionária 4m³ em " + bairro + (zona ? ", " + zona : "") + ". Nota Fiscal e CTR incluídos. Entrega em até 24h. Empresa regularizada desde 2004.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Padrão Caçamba",
        "taxID": "44.538.708/0001-76",
        "telephone": "+55-11-4237-8757",
        "url": "https://padraocacamba.com.br",
        "foundingDate": "2004"
      },
      "areaServed": { "@type": "Place", "name": bairro + ", São Paulo, SP" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "BRL",
        "price": precoNum,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": precoNum,
          "priceCurrency": "BRL",
          "valueAddedTaxIncluded": true,
          "description": "Preço com Nota Fiscal eletrônica inclusa. Pagamento via PIX após a entrega."
        },
        "availability": "https://schema.org/InStock",
        "validFrom": hoje,
        "seller": { "@type": "Organization", "name": "Padrão Caçamba", "taxID": "44.538.708/0001-76" },
        "itemOffered": {
          "@type": "Product",
          "name": "Caçamba Estacionária 4m³",
          "description": "Caçamba metálica estacionária 4m³ — padrão Grande São Paulo. Aceita entulho seco de obra.",
          "category": "Locação de Caçamba"
        }
      },
      "url": urlAtual,
      "dateModified": hoje
    };

    // 2. BreadcrumbList
    const slugZona = zona ? "/" + zona.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-") : "/";
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://padraocacamba.com.br/" },
        { "@type": "ListItem", "position": 2, "name": zona || "São Paulo", "item": "https://padraocacamba.com.br" + slugZona },
        { "@type": "ListItem", "position": 3, "name": "Caçamba em " + bairro, "item": urlAtual }
      ]
    };

    // 3. Contexto rico para IAs
    const descParts = [
      "Empresa: Padrão Caçamba. CNPJ: 44.538.708/0001-76. Desde 2004.",
      "Bairro: " + bairro + (ctx.ref ? " (" + ctx.ref + ")" : "") + ".",
      "Zona: " + (zona || "São Paulo") + ".",
      "Preço com NF: R$ " + precoNum + ".",
      ctx.janela    ? "Janela de entrega: " + ctx.janela + "." : "",
      ctx.tipo_obra ? "Tipos de obra comuns: " + ctx.tipo_obra + "." : "",
      ctx.acesso    ? "Acesso do caminhão: " + ctx.acesso + "." : "",
      ctx.regra     ? "Regra local: " + ctx.regra + "." : "",
      "Prazo: até 24h após confirmação.",
      "Pagamento: PIX após a entrega. Motorista não recebe em mãos.",
      "Incluso: Nota Fiscal eletrônica + CTR.",
      "Não incluso: ajudantes para carga.",
      "Aceita: entulho seco, concreto, cerâmica, gesso, drywall, madeira, poda, terra.",
      "Não aceita: lixo doméstico, líquidos, eletrônicos, pneus, resíduos tóxicos."
    ].filter(Boolean).join(" ");

    const iaContext = {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      "name": "Caçamba 4m³ em " + bairro + " — Padrão Caçamba",
      "url": urlAtual,
      "dateModified": hoje,
      "description": descParts,
      "about": {
        "@type": "Service",
        "name": "Locação de caçamba 4m³ em " + bairro,
        "provider": { "@type": "LocalBusiness", "name": "Padrão Caçamba", "taxID": "44.538.708/0001-76" }
      }
    };

    // Injeta os 3 schemas
    [
      { id: "schema-price-inject",      data: priceSchema },
      { id: "schema-breadcrumb-inject", data: breadcrumb  },
      { id: "schema-ia-context-inject", data: iaContext    },
    ].forEach(function(item) {
      var anterior = document.getElementById(item.id);
      if (anterior) anterior.remove();
      var s = document.createElement("script");
      s.type = "application/ld+json";
      s.id   = item.id;
      s.textContent = JSON.stringify(item.data);
      document.head.appendChild(s);
    });
  }

  function aguardarPreco(tentativas) {
    if (tentativas > 50) return;
    var precoStr = typeof precoAtual !== "undefined" ? precoAtual : null;
    if (precoStr && !/carregando/i.test(precoStr)) {
      injectSchema();
    } else {
      setTimeout(function() { aguardarPreco(tentativas + 1); }, 100);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() { aguardarPreco(0); });
  } else {
    aguardarPreco(0);
  }
})();
