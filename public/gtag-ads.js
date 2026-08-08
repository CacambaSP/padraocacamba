// gtag-ads.js — Google Ads (AW-1035342324) + eventos de conversão
// Incluído em todas as páginas: <script src="/gtag-ads.js" defer></script>
//
// CONVERSÕES: preencher os rótulos abaixo quando as ações de conversão
// forem criadas no Google Ads (Metas → Conversões → Nova ação de conversão).
// Formato do rótulo: o que vem depois da barra em AW-1035342324/XXXXXXXX

(function () {
  var ADS_ID = 'AW-1035342324';

  var LABELS = {
    whatsapp_responsavel: 'a-l4CImgo94cEPSj2O0D', // clique no botão "Falar com o responsável" (escala do PC)
    cadastro: 'wVKOCIygo94cEPSj2O0D'              // clique no botão "Preencher cadastro e fechar pedido"
  };

  // Carrega a Google tag
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('js', new Date());
  gtag('config', ADS_ID);

  function conversao(tipo) {
    try {
      // evento nomeado (aparece no Google Ads / GA como evento)
      gtag('event', tipo, { pagina: location.pathname });
      // conversão oficial do Ads (quando o rótulo estiver preenchido)
      if (LABELS[tipo]) {
        gtag('event', 'conversion', { send_to: ADS_ID + '/' + LABELS[tipo] });
      }
    } catch (e) {}
  }

  // Delegação: funciona mesmo em botões criados dinamicamente pelo PC
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el !== document) {
      if (el.classList) {
        if (el.classList.contains('pc-btn-douglas')) { conversao('whatsapp_responsavel'); return; }
        if (el.classList.contains('pc-btn-full')) { conversao('cadastro'); return; }
      }
      if (el.tagName === 'A' && el.href && el.href.indexOf('wa.me') > -1) {
        conversao('whatsapp_responsavel'); return;
      }
      el = el.parentNode;
    }
  }, true);
})();
