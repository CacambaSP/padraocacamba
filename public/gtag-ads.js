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
  // Linker entre domínios: leva o clique do anúncio (gclid) para o formulário
  // de pedido no CRM, para a conversão ser atribuída ao anúncio certo.
  // Decora automaticamente os links <a> para o domínio do CRM (ex.: botão
  // flutuante "Pedir Caçamba"). Não decora aberturas via window.open().
  gtag('set', 'linker', { domains: ['cacambasp-crm.vercel.app'] });
  gtag('config', ADS_ID);

  // Para aberturas via window.open (botão "Preencher cadastro" do chat do PC):
  // o linker só decora links <a> no mousedown, então criamos um link
  // temporário, deixamos o linker acrescentar o _gl e devolvemos a URL.
  // Se algo falhar, devolve a URL original (o botão nunca quebra).
  window.linkCRM = function (url) {
    try {
      var a = document.createElement('a');
      a.href = url;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      var decorada = a.href;
      a.parentNode.removeChild(a);
      return decorada || url;
    } catch (e) { return url; }
  };

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
