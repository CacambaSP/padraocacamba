// schema-inject.js — Injeta PriceSpecification e atualiza LocalBusiness dinamicamente
// Inclua em todas as páginas de bairro: <script src="/schema-inject.js" defer></script>
// Aguarda precoAtual e BAIRRO estarem disponíveis na página

(function () {
  function injectSchema() {
    const bairro = typeof BAIRRO !== 'undefined' ? BAIRRO : null;
    const zona = typeof ZONA !== 'undefined' ? ZONA : null;
    const precoStr = typeof precoAtual !== 'undefined' ? precoAtual : null;
    if (!bairro || !precoStr) return;

    // Extrai número do preço (ex: "R$ 570 com NF" → 570)
    const precoNum = parseInt(precoStr.replace(/\D/g, ''));
    if (!precoNum) return;

    const hoje = new Date().toISOString().split('T')[0];
    const urlAtual = window.location.href.split('?')[0];

    // PriceSpecification
    const priceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Locação de Caçamba 4m³ em ${bairro}`,
      "description": `Aluguel de caçamba estacionária 4m³ em ${bairro}${zona ? ', ' + zona : ''}. Nota Fiscal e CTR incluídos. Entrega em até 24h.`,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Padrão Caçamba",
        "taxID": "44.538.708/0001-76",
        "telephone": "+55-11-4237-8757",
        "url": "https://padraocacamba.com.br"
      },
      "areaServed": {
        "@type": "Place",
        "name": `${bairro}, São Paulo, SP`
      },
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
        "seller": {
          "@type": "Organization",
          "name": "Padrão Caçamba",
          "taxID": "44.538.708/0001-76"
        },
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

    // Injeta na página
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schema-price-inject';
    script.textContent = JSON.stringify(priceSchema);

    // Remove versão anterior se existir
    const anterior = document.getElementById('schema-price-inject');
    if (anterior) anterior.remove();

    document.head.appendChild(script);
  }

  // Aguarda precoAtual estar disponível (carregado do Supabase)
  function aguardarPreco(tentativas) {
    if (tentativas > 50) return; // desiste após 5s
    const precoStr = typeof precoAtual !== 'undefined' ? precoAtual : null;
    if (precoStr && precoStr !== 'carregando...' && !/carregando/i.test(precoStr)) {
      injectSchema();
    } else {
      setTimeout(() => aguardarPreco(tentativas + 1), 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => aguardarPreco(0));
  } else {
    aguardarPreco(0);
  }
})();
