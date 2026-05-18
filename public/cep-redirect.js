// cep-redirect.js — Detecta ?cep= na URL e dispara PC automaticamente
// Incluir em todas as páginas de bairro: <script src="/cep-redirect.js" defer></script>

(function() {
  const params = new URLSearchParams(window.location.search);
  const cep = params.get('cep');
  if (!cep) return;

  // Aguarda PC estar pronto (pcPronto = true) e dispara
  function tentarEnviar(tentativas) {
    if (tentativas > 60) return; // desiste após 6s

    if (typeof pcPronto !== 'undefined' && pcPronto && typeof pcEnviarDireto === 'function') {
      // Busca endereço pelo CEP via ViaCEP
      fetch('https://viacep.com.br/ws/' + cep.replace('-','') + '/json/')
        .then(r => r.json())
        .then(data => {
          if (data.erro) {
            pcEnviarDireto('CEP: ' + cep + ' · Fechar pedido, pedir só o número do imóvel');
            return;
          }
          const rua = data.logradouro ? data.logradouro + (data.bairro ? ', ' + data.bairro : '') : (data.bairro || '');
          const cidade = data.localidade;
          const bairro = typeof BAIRRO !== 'undefined' ? BAIRRO : cidade;
          const preco = typeof precoAtual !== 'undefined' ? precoAtual : 'R$ 570';
          const msg = 'CEP: ' + cep + ' · ' + bairro + ' · Preço ' + preco + (rua ? ' · Endereço: ' + rua : '') + ' · Fechar pedido, pedir só o número do imóvel';
          pcEnviarDireto(msg);
        })
        .catch(() => {
          const bairro = typeof BAIRRO !== 'undefined' ? BAIRRO : '';
          const preco = typeof precoAtual !== 'undefined' ? precoAtual : 'R$ 570';
          pcEnviarDireto('CEP: ' + cep + ' · ' + bairro + ' · Preço ' + preco + ' · Fechar pedido, pedir só o número do imóvel');
        });
    } else {
      setTimeout(() => tentarEnviar(tentativas + 1), 100);
    }
  }

  // Aguarda DOM e PC carregarem
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(() => tentarEnviar(0), 500));
  } else {
    setTimeout(() => tentarEnviar(0), 500);
  }
})();
