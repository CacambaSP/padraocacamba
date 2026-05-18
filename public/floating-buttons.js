// floating-buttons.js — Substitui botão flutuante único por dois botões
// Inclua em todas as páginas antes do </body>: <script src="/floating-buttons.js" defer></script>

(function () {
  function injetarBotoes() {
    // Remove botões flutuantes existentes
    ['.wa-fixed', '.pc-fixed', '.home-fixed'].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.remove());
    });

    // Pega CADASTRO do escopo global (definido em cada página)
    const cadastroUrl = typeof CADASTRO !== 'undefined'
      ? CADASTRO
      : 'https://cacambasp-crm.vercel.app/cadastro.html?v=49b0c48a-6f8f-4921-9be2-53d4fce47e80';

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
    ].join(';');

    // Botão 1 — Formulário direto
    const btnPedir = document.createElement('a');
    btnPedir.href = cadastroUrl;
    btnPedir.target = '_blank';
    btnPedir.rel = 'noopener';
    btnPedir.style.cssText = [
      'display:flex',
      'align-items:center',
      'gap:8px',
      'background:#00FF7F',
      'color:#000',
      'border:none',
      'border-radius:28px',
      'padding:12px 18px 12px 14px',
      'font-family:\'DM Sans\',sans-serif',
      'font-size:13px',
      'font-weight:700',
      'cursor:pointer',
      'text-decoration:none',
      'box-shadow:0 4px 20px rgba(0,255,127,.35)',
      'white-space:nowrap',
      'letter-spacing:.2px',
    ].join(';');
    btnPedir.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
      Peça em 1 clique
    `;

    // Botão 2 — PC chat
    const btnPC = document.createElement('button');
    btnPC.style.cssText = [
      'display:flex',
      'align-items:center',
      'gap:8px',
      'background:#1E3A8A',
      'color:#fff',
      'border:none',
      'border-radius:28px',
      'padding:12px 18px 12px 14px',
      'font-family:\'DM Sans\',sans-serif',
      'font-size:13px',
      'font-weight:600',
      'cursor:pointer',
      'box-shadow:0 4px 20px rgba(30,58,138,.4)',
      'white-space:nowrap',
      'letter-spacing:.2px',
    ].join(';');
    btnPC.innerHTML = `
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      Converse com o PC
    `;
    btnPC.onclick = function () {
      if (typeof focarPC === 'function') focarPC();
    };

    wrap.appendChild(btnPedir);
    wrap.appendChild(btnPC);
    document.body.appendChild(wrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injetarBotoes);
  } else {
    injetarBotoes();
  }
})();
