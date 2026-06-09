// floating-buttons.js — Dois botões flutuantes: WhatsApp (humano) + PC (chat)
// Inclua em todas as páginas antes do </body>: <script src="/floating-buttons.js" defer></script>
// Comportamento: sólido em repouso, levemente transparente ao rolar, volta a sólido ao parar.

(function () {
  function injetarBotoes() {
    // Remove botões flutuantes estáticos existentes
    ['.wa-fixed', '.pc-fixed', '.home-fixed', '#float-wrap'].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.remove());
    });

    // Contexto da página (vêm do escopo global de cada HTML)
    const wpp = (typeof DOUGLAS_WPP !== 'undefined' && DOUGLAS_WPP) ? DOUGLAS_WPP : '551142378757';
    const bairro = (typeof BAIRRO !== 'undefined' && BAIRRO) ? BAIRRO : '';
    const msgWhats = bairro
      ? `Olá! Vim pelo site e quero alugar uma caçamba 4m³ em ${bairro}.`
      : 'Olá! Vim pelo site e quero alugar uma caçamba 4m³.';
    const waHref = `https://wa.me/${wpp}?text=${encodeURIComponent(msgWhats)}`;

    // Container dos dois botões
    const wrap = document.createElement('div');
    wrap.id = 'float-wrap';
    wrap.style.cssText = [
      'position:fixed',
      'bottom:24px',
      'right:18px',
      'z-index:999',
      'display:flex',
      'flex-direction:column',
      'align-items:flex-end',
      'gap:10px',
      'max-width:calc(100vw - 36px)',
      'opacity:1',
      'transition:opacity .25s ease',
    ].join(';');

    const baseBtn = [
      'display:flex',
      'align-items:center',
      'gap:8px',
      'border:none',
      'border-radius:26px',
      'padding:11px 16px 11px 14px',
      'font-family:\'DM Sans\',sans-serif',
      'font-size:13px',
      'cursor:pointer',
      'white-space:nowrap',
      'letter-spacing:.2px',
    ];

    // Botão 1 — WhatsApp direto (canal humano)
    const btnWhats = document.createElement('a');
    btnWhats.href = waHref;
    btnWhats.target = '_blank';
    btnWhats.rel = 'noopener';
    btnWhats.setAttribute('aria-label', 'Pedir pelo WhatsApp');
    btnWhats.style.cssText = baseBtn.concat([
      'background:#00FF7F',
      'color:#063d20',
      'font-weight:700',
      'text-decoration:none',
      'box-shadow:0 4px 20px rgba(0,255,127,.35)',
    ]).join(';');
    btnWhats.innerHTML = `
      <svg width="19" height="19" viewBox="0 0 24 24" fill="#063d20" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.29.18-1.41-.08-.12-.27-.2-.57-.35M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2m0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.18-3 .9.9-2.9-.2-.3A8.3 8.3 0 1 1 12 20.3"/>
      </svg>
      WhatsApp
    `;

    // Botão 2 — PC chat
    const btnPC = document.createElement('button');
    btnPC.setAttribute('aria-label', 'Conversar com o PC');
    btnPC.style.cssText = baseBtn.concat([
      'background:#1E3A8A',
      'color:#fff',
      'font-weight:600',
      'box-shadow:0 4px 20px rgba(30,58,138,.4)',
    ]).join(';');
    btnPC.innerHTML = `
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      Converse com o PC
    `;
    btnPC.onclick = function () {
      if (typeof focarPC === 'function') focarPC();
    };

    wrap.appendChild(btnWhats);
    wrap.appendChild(btnPC);
    document.body.appendChild(wrap);

    // Transparência ao rolar, sólido ao parar (e ao tocar / passar o mouse)
    let t;
    function fadeNoScroll() {
      wrap.style.opacity = '0.6';
      clearTimeout(t);
      t = setTimeout(function () { wrap.style.opacity = '1'; }, 700);
    }
    function solido() {
      clearTimeout(t);
      wrap.style.opacity = '1';
    }
    window.addEventListener('scroll', fadeNoScroll, { passive: true });
    wrap.addEventListener('mouseenter', solido);
    wrap.addEventListener('touchstart', solido, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injetarBotoes);
  } else {
    injetarBotoes();
  }
})();
