# DOCUMENTO MESTRE — PADRÃO CAÇAMBA
**Versão:** 5.0 — documento único para migração de conta do Claude
**Data:** 09/11/2026 (fechado em 16/11/2026 — Clarity ficou pendente porque a sessão do Clarity estava expirada) · **Última atualização:** 16/11/2026 — pendências 3, 7, 10 e 11 feitas e parte do 12 (gtag no Guarujá) (seção 11 e 13)
**Domínio:** padraocacamba.com.br
**Substitui tudo:** DOC MESTRE V4.1 (instruções do projeto "DOC MESTRE V4.1 Padrão Caçambas"), os 12 arquivos e a memória do projeto "SITE PADRÃO CAÇAMBA", `MASTER_CONTEXT_PADRAO_CACAMBA.md`, `CONTEXTO_MESTRE_PADRAO_CACAMBA_v2.docx`, os dois `CONTEXTO_NOVO_CHAT_*`, `PROMPT_BLOG_PADRAO_CACAMBA.md` e a pasta `claude/` (análise GSC + propostas/diffs de título-meta). Tudo que importava desses arquivos está aqui dentro.

> **Como este documento foi feito:** pente-fino do repositório real (clonado em 09/11/2026, último commit 28/09/2026), leitura do projeto antigo SITE PADRÃO CAÇAMBA pelo Chrome (arquivos, instruções, memória, conversa mais recente), Google Search Console da propriedade `https://www.padraocacamba.com.br/` e histórico de conversas deste projeto. O que não foi possível conferir está marcado como **PENDENTE**.

---

## ⚠️ INSTRUÇÕES PARA A IA (leia antes de fazer qualquer coisa)

- Este documento é a ÚNICA fonte de verdade do projeto. Se outra coisa contradizer este documento, **este vence** — mas o repositório real vence este documento. Na dúvida, confira no repo antes de agir.
- NÃO sugira mudanças nas decisões já tomadas (seção 10) sem o Doug pedir.
- NÃO mexa no CRM (`CacambaSP/crm-cacambasp`, `cacambasp-crm.vercel.app`) nem no PC (vendedor IA) sem autorização.
- NÃO toque no cacambasp.com.br (sustento atual da família).
- Português brasileiro, direto, sem bajulação. Numere opções ao apresentar alternativas. Plano em texto primeiro, aprovação a cada etapa antes de implementar.
- **"Pra mim só vale se for verdadeiro"** — nunca invente dado, preço, regra ou conteúdo. Extraia do HTML/schema real quando possível.
- Antes de criar página de bairro nova: copie `public/TEMPLATE_BAIRRO.html`, preencha os placeholders `{{...}}`, siga o checklist de 5 passos do comentário no topo do arquivo (imagem, Supabase, sitemap, .md, llms.txt).
- Se o Doug colar plano/arquitetura vindo de outro chat ou IA, trate como possivelmente desatualizado ou genérico e confira contra o repo. **Já aconteceu duas vezes:** um plano genérico sugeriu URLs aninhadas (`/zona-sul/moema`), WordPress/Elementor e uma página de denúncia nova — e conversas anteriores do próprio Claude afirmaram que o site era Next.js com 22 bairros. Nada disso é verdade (seção 3 e 4).

---

## 1. IDENTIDADE DO NEGÓCIO

| Campo | Valor |
|---|---|
| Nome | Padrão Caçamba |
| Razão social | Luciana Cristina Testa |
| CNPJ | 44.538.708/0001-76 |
| Insc. Municipal | 158762 — Osasco |
| Regime | Simples Nacional, código 7.09 |
| Endereço | Rua Juan Vicente, 482 — Bandeiras, Osasco/SP |
| WhatsApp Douglas | 551142378757 · (11) 4237-8757 |
| Email / PIX | cacambasp@gmail.com |
| Site | padraocacamba.com.br (sempre servido em `www.` — o domínio sem www redireciona) |
| Em operação desde | 2004 |
| Atendimentos | 20mil+ / 2.000+ NFs emitidas |
| Produto | Caçamba estacionária 4m³ (padrão único da Grande SP, às vezes 5m³) |
| Operador digital | Doug (Douglas) — conduz o projeto digital, NÃO aparece no site (proteção jurídica) |
| Rosto do site | Luciana (titular), Cláudia (cunhada/MEI), Sandra (sogra) |
| Sucessão | Junior (filho) |

### Modelo de negócio
Transportadora (não intermediador/agregador) — CNPJ ativo, emite NF, assume responsabilidade contratual. Não tem frota própria — opera com rede de parceiros consolidada há 15+ anos. Análogo a Loggi/Total Express. Comunicar sempre como "cobertura integrada por região", nunca "nossa frota".

### Domínios do ecossistema
| Domínio | Status | Regra |
|---|---|---|
| cacambasp.com.br | 18+ anos, Webnode, renda familiar ativa | **NUNCA TOCAR — paraquedas reserva**, domínio mais autoritativo da rede |
| padraocacamba.com.br | Registro.br, DNS ativo, Vercel | **BASE deste projeto** |
| portalcacambas.com | Google Sites | Laboratório de testes / backlink — não embeda HTML custom. **No GSC teve 2.513 cliques nos últimos 3 meses (ago–nov/2026)** — ~30× o padraocacamba no mesmo período (seção 9) |
| cacambascampobelo.com, cacambamoema.com | Rede de backlink | cacambamoema.com também em Google Sites |
| caçamba.com | MEI da Cláudia | Domínio paralelo |

### Cobertura geográfica
SP Capital (todas as zonas) + Grande SP (ABC, Guarulhos, Osasco, Barueri, Alphaville, Carapicuíba, Cotia, Santana de Parnaíba) + Litoral SP (fase 2 — já existe 1 artigo sobre Guarujá)

---

## 2. REGRAS OPERACIONAIS (definitivas)

| Regra | Valor |
|---|---|
| Entrega | Em até 24h após confirmação |
| Sem entregas | Sábado 4h até domingo 20h |
| Permanência via pública | 3 dias (regra Prefeitura SP) |
| Retirada | Automática no vencimento ou programada pelo cliente |
| Agendamento | NÃO agenda hora exata — só o dia |
| Pagamento | Somente PIX após a entrega — motorista não recebe em mãos |
| Preço no site | Somente COM nota fiscal |
| CTR / MTR | 100% das entregas, sem custo — CTR-e (capital, sistema AMLURB) ou MTR (demais cidades Grande SP, sistema SIGOR/CETESB) |
| Calçada | Exige 1,20m de passagem livre — **não é proibição total** (erro antigo que se espalhou por 23 páginas e foi corrigido) |
| Faturamento PJ | 3 primeiras locações normal, faturamento 7 dias a partir da 4ª |
| Caminhão | Até 6 caçambas por rota |
| Entrega noturna | 22h–4h (evita rodízio SP) |
| Zona azul | Entrega normal, remove se notificado pela CET, sem reembolso — preço é por caçamba, não por dia |

### Preços REAIS (Supabase, lido via `/api/precos` em 09/11/2026 — bate 100% com o `precoAtual` de cada página)
A tabela `precos_bairros` tem os 57 bairros/cidades com página. Cada página também tem o mesmo preço fixo no código (`precoAtual`) e busca o Supabase no navegador.

| Região | Preço com NF | Páginas |
|---|---|---|
| Osasco, Carapicuíba | R$ 470 | osasco, carapicuiba |
| Barueri | **R$ 530** | barueri |
| São Bernardo, Cotia | R$ 570 | sao-bernardo, cotia |
| Santo André, Guarulhos | **R$ 600** | santo-andre, guarulhos |
| Zona Sul (maioria) | R$ 570 | brooklin, campo-belo, cursino, ipiranga, itaim-bibi, jabaquara, moema, morumbi, santo-amaro, saude, vila-mariana, vila-olimpia |
| Zona Sul extremo | **R$ 600** | cidade-dutra, grajau, parelheiros |
| Zona Oeste (maioria) | R$ 570 | 14 bairros |
| Perus, Pirituba | R$ 600 | perus, pirituba |
| Zona Norte | R$ 570 | 4 bairros |
| Centro | R$ 570 | bela-vista, consolacao, liberdade, republica |
| Zona Leste | R$ 600 | 11 bairros |
| Litoral SP | a partir de R$ 350 (varia por cidade) | — |

**`precos_zonas` (preço quando o bairro não tem preço próprio):** Centro 570 · **Grande SP 570** · Litoral SP 350 · Zona Leste 600 · Zona Norte 570 · Zona Oeste 570 · Zona Sul 570.

⚠️ **O que está em desacordo com o Supabase:** a tabela de zona da v4.1 ("Barueri, Guarulhos, ABC = R$ 570"); a home ("R$ 470 na Grande SP"); o `/precos` ("R$ 600 na Zona Leste, Perus e Guarulhos" — omite Barueri 530, Santo André 600 e Cidade Dutra/Grajaú/Parelheiros 600); o `llms-full.txt` (Guarulhos/ABC a R$ 570); e o fallback fixo do `api/precos-zonas.js` (Grande SP 470, sem Litoral). **O Supabase é a fonte certa — alinhar tudo a ele.**

### Posicionamento anti-golpe
- NÃO condenar concorrentes diretamente (risco de retaliação) — educar o cliente a reconhecer sinais.
- Sinais de golpe divulgados: preço abaixo de R$ 400, promessa de entrega em 2h, cobrança adiantada (50%), ajudante "grátis", sem CNPJ visível, sem nota fiscal, sem CTR/MTR.
- Cuidado com a frase "empresa com vários tamanhos costuma ser irregular" (está no `/precos`): existem empresas sérias com 3, 4 e 5m³ e as IAs cruzam fontes. Mais seguro dizer só que a Padrão trabalha com 4m³.

---

## 3. INFRAESTRUTURA TÉCNICA

### Stack (confirmada no repo em 09/11/2026)
**HTML estático + funções serverless na Vercel (`api/`) + Supabase.** Não é Next.js, não é WordPress, não é Elementor. Cada página é um `.html` em `public/`.

### GitHub
- Repositório: `github.com/CacambaSP/padraocacamba` (público). **CacambaSP é uma conta pessoal do GitHub, não organização** (corrigido em 16/11). O CRM fica em outro repo da mesma conta (`CacambaSP/crm-cacambasp`) — não mexer.
- HTMLs: `public/` · Imagens: `public/image/` · Artigos: `public/artigos/`
- Na raiz do repo também ficam `DOCUMENTO_MESTRE_PADRAO_CACAMBA.md` (cópia deste documento — histórico no git log, nunca criar `_v5`, `_v6` no nome) e `BACKLOG_MELHORIAS.md`.
- `gerar-sitemap.js` gera o sitemap.xml a partir dos arquivos reais — **nunca editar sitemap.xml na mão**. Exclui: `TEMPLATE_BAIRRO`, `monitoring-dashboard`, `monitoring-dashboard-v1-backup`, `cadastro`, `locar`.
- `.github/workflows/main.yml` ("Replace CADASTRO link", disparo manual): troca o parâmetro `v=` do link de cadastro do CRM em todas as páginas e reinsere `floating-buttons.js` antes do `</body>`.
- **URLs são sempre PLANAS**: `/moema`, `/osasco` — nunca `/zona-sul/moema`. Mudar URL que já ranqueia é perder posição.
- Página anti-golpe **já existe**: `/antifraude` — não criar outra com outro slug.

### Como o Claude aplica mudanças no repo
Dois caminhos já funcionaram:
1. **Integração GitHub do Claude (preferido — funcionando desde 16/11/2026):** Configurações → Conectores → GitHub **conectado com a própria conta CacambaSP** (a dona do repo) **e** o app Claude instalado na conta CacambaSP (`github.com/apps/claude/installations/select_target`). Depois o Claude adiciona o repo à sessão com acesso de push. Em 16/11 o conector estava ligado à conta `sacoleirosapp-ux`, que não tem escrita no repo, e o push falhava com "você precisa de permissão de escrita" mesmo com o app instalado — resolvido reconectando com a conta CacambaSP. O app hoje tem acesso a `padraocacamba` **e** `crm-cacambasp` (escolha do Doug) — o Claude só escreve no `padraocacamba`.
2. **Token (fallback):** Doug gera um Personal Access Token (classic) em `github.com/settings/tokens/new`, escopo `repo`, validade 7 dias, cola no chat; Claude usa no remote, comita e dá push; Doug apaga o token depois.

Clonar para **ler** não precisa de nada (repo público). O ambiente do Claude não acessa o site no ar (`padraocacamba.com.br`) nem o Supabase pela linha de comando — para ver o site publicado, usar o Chrome.

### Vercel
- Deploy automático a cada push na `main` (~2-3 min)
- `vercel.json`: `cleanUrls: true` → **toda imagem precisa de URL ABSOLUTA** (`https://www.padraocacamba.com.br/image/x.webp`); redireciona `padraocacamba.com.br` → `www.`; arquivos `.md` servidos como `text/plain`.
- Variáveis de ambiente usadas: `ANTHROPIC_API_KEY` (PC), `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_ANON_KEY`, `GOOGLE_SEARCH_CONSOLE_API`, `SEMRUSH_API_KEY`, `MONITORING_CRON_SECRET`.

### Funções `api/`
| Arquivo | O que faz |
|---|---|
| `chat.js` | Backend do **PC** (vendedor IA do site). Chama a API da Anthropic com modelo `claude-sonnet-4-5` e salva conversas no Supabase |
| `precos.js` | `/api/precos` — JSON limpo para IAs/crawlers com empresa, produto, pagamento, entrega e preços por zona/bairro (lista "CTR" como incluso, sem citar MTR) |
| `precos-zonas.js` | `/api/precos-zonas` — preços por zona; se o Supabase falhar, devolve fallback fixo (Grande SP 470, Sul/Oeste/Norte/Centro 570, Leste 600) |
| `monitoring.js` | Monitoramento de posição (GSC/Semrush → Supabase). O comentário diz "roda toda noite", mas **não há `crons` no vercel.json** — provavelmente não roda sozinho |
| `clarity-data.js` | Dados do Clarity **fixos no código** (22/06/2026, 7 dias) para o `monitoring-dashboard` — não é dado ao vivo |

### Scripts globais em `public/`
| Arquivo | Função |
|---|---|
| `gtag-ads.js` | Google Ads `AW-1035342324` + conversões (clique "Falar com o responsável" e "Preencher cadastro e fechar pedido") |
| `floating-buttons.js` | 3 botões flutuantes: Pedir Caçamba (formulário direto no CRM), WhatsApp (humano) e PC (chat) |
| `schema-inject.js` | Injeta schema dinâmico por bairro (contexto local para IAs, PriceSpecification) |
| `pc-tracking.js`, `cep-redirect.js` | Rastreamento do PC e busca por CEP da home (`CEP_BAIRROS_NOME`) |

### Supabase
- Projeto `ejfuqijtiberxsnvxdwm` · `https://ejfuqijtiberxsnvxdwm.supabase.co` (chave pública `sb_publishable_…` embutida no código — não é segredo)
- Tabelas: `precos_bairros` (bairro, zona, preco_com_nf, ativo), `precos_zonas` (zona, preco_padrao), `config_pc` (prompt do PC, versão 2.2), `bairros_paginas`, `pc_aprendizado`, `juca_conversas` (variante A/B)

### CRM e rastreamento entre domínios
- Formulário de pedido fica em `cacambasp-crm.vercel.app/cadastro.html?v=49b0c48a-6f8f-4921-9be2-53d4fce47e80` (75 ocorrências no site).
- **Linker do Google Ads (16/11/2026) — completo:** o `gtag-ads.js` faz `gtag('set','linker',{domains:['cacambasp-crm.vercel.app']})` antes do `config` e vale para todas as páginas públicas (incluindo o artigo do Guarujá desde 16/11). Ele decora sozinho os links `<a>` para o CRM (botão flutuante "Pedir Caçamba"). Para o botão "📋 Preencher cadastro e fechar pedido" do chat do PC, que abre com `window.open()`, o `gtag-ads.js` expõe `window.linkCRM(url)` (cria um `<a>` temporário, dispara `mousedown` para o linker acrescentar o `_gl` e devolve a URL; se falhar, devolve a original) e as 74 páginas com o chat chamam `(window.linkCRM||String)(CADASTRO+…)` — única mudança feita no código do PC, autorizada pelo Doug. Lado do CRM conferido em 16/11 (só leitura): `cadastro.html` já carrega `AW-1035342324` com `linker: {accept_incoming: true}` e dispara a conversão de cadastro — nada foi alterado no CRM. **Atenção:** se criar página nova com o chat do PC, manter o `(window.linkCRM||String)(…)` no `pcShowCadastroBtn` (o `TEMPLATE_BAIRRO` já está atualizado).
- A home configura a tag do Ads duas vezes (snippet inline com linker + `gtag-ads.js`). Conferir se não duplica eventos.

### Analytics
- **Microsoft Clarity:** projeto `wlu14vvzwg`. Tem o painel **Visibilidade da IA → Citações** (quais consultas de IA citam o site e quais páginas). Falta o script em `artigos/pintura-casa-descarte`.
- **Google Search Console:** propriedade `https://www.padraocacamba.com.br/` fica na conta Google **cacambasp@gmail.com** (no Chrome do Doug é a segunda conta, `search.google.com/u/1/…`). A conta portalcacambas@gmail.com tem as propriedades `sc-domain:portalcacambas.com` e `https://www.portalcacambas.com/`.
- **Google Ads:** `AW-1035342324`. O `gtag-ads.js` está em todas as páginas públicas desde 16/11 (o artigo do Guarujá era o único sem).

---

## 4. INVENTÁRIO REAL DO SITE (pente-fino 09/11/2026)

**80 HTML na raiz de `public/`** (74 de conteúdo + 6 fora do sitemap) **+ 16 em `public/artigos/`** (15 artigos + índice do blog) = **90 páginas de conteúdo**, todas no `sitemap.xml` (90 URLs, nenhuma faltando, nenhuma sobrando).

### Geografia — 57 páginas (pela variável `ZONA` de cada página)
| Zona | Bairros / cidades | Qtd |
|---|---|---|
| Zona Sul | Itaim Bibi, Vila Olímpia, Moema, Brooklin, Vila Mariana, Campo Belo, Cursino, Ipiranga, Jabaquara, Morumbi, Santo Amaro, Saúde, Cidade Dutra, Grajaú, **Parelheiros** (nova, 16/09) | 15 |
| Zona Oeste | Pinheiros, Vila Madalena, Higienópolis, Perdizes, Lapa, Alto de Pinheiros, Água Branca, Barra Funda, Butantã, Jaguaré, Jaraguá, Perus, Pirituba, Santa Cecília, Vila Leopoldina, Vila Sônia | 16 |
| Zona Norte | Santana, Tucuruvi, Vila Guilherme, Casa Verde | 4 |
| Zona Leste | Tatuapé, Penha, Vila Formosa, Vila Matilde, Itaim Paulista, Brás, Ermelino Matarazzo, Guaianases, Mooca, Sapopemba, Vila Prudente | 11 |
| Centro (`ZONA='Zona Central'`) | Liberdade, República, Consolação, Bela Vista | 4 |
| Grande SP (cidades) | Santo André, São Bernardo, Barueri, Osasco, Carapicuíba, Guarulhos, Cotia | 7 |

⚠️ **Nuance real, não é bug:** `centro-sp.html` lista 6 bairros — os 4 acima **mais Brás e Santa Cecília**, por proximidade. A variável `ZONA` deles diz Zona Leste e Zona Oeste. Dois critérios coexistindo de propósito.

Em 16/09 Grajaú e Cidade Dutra foram enriquecidas com os bairros do CEP 048, e a busca por CEP da home passou a mapear os sub-bairros de Grajaú, Cidade Dutra e Parelheiros.

### Hubs institucionais (17)
`zona-sul`, `zona-oeste`, `zona-norte`, `zona-leste`, `centro-sp`, `grande-sp`, `index`, `precos`, `antifraude`, `cacamba-4m3`, `cacamba-de-entulho` (keyword nº1), `aluguel-de-cacamba`, `locacao-de-cacamba`, `preco-cacamba`, `como-escolher`, `comeca-aqui`, `o-que-nao-pode-ir-na-cacamba`

### Fora do sitemap (intencional)
`cadastro`, `locar` (do CRM), `monitoring-dashboard` e `-v1-backup` (ferramenta interna), `google3d037644c6712a40.html` (verificação Google), `TEMPLATE_BAIRRO.html`

### Arquivos de apoio
- **sitemap.xml** — 90 URLs, bate 100% com os arquivos
- **robots.txt** — libera os crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Grok, CCBot etc.)
- **llms.txt** — atualizado 11/09/2026, cobre todas as 90 páginas, inclusive Parelheiros
- **llms-full.txt** — **desatualizado** (data 15/07/2026): falta Parelheiros e a tabela de preço diz Barueri/Guarulhos/ABC a R$ 570
- **TEMPLATE_BAIRRO.html** — recriado em 11/09 a partir de `vila-matilde.html`, com placeholders `{{}}` e checklist de 5 passos no topo
- **Pares `.md`** — as 74 páginas de conteúdo da raiz têm par `.md`. Os 15 artigos **não** têm (a v4.1 dizia "93 páginas com par .md", o que não fecha a conta)
- **Imagens** — `public/image/` tem 131 arquivos (338 MB). **29 PNGs originais de ~15 MB cada (`*.webp.png`) não são usados por nenhuma página** — só incham o repo. As versões em uso já foram reduzidas (ex.: Água Branca 78 KB).

### Checagens automáticas em 09/11 (resultado)
- Schema FAQPage x FAQ visível: **sincronizado em todas as páginas**
- `">>` duplicado em meta: **nenhum**
- `alert()` esquecido: **1** — `artigos/obra-comercial-residencial` (função `focarPC()`, nos botões "Falar com PC" e "Falar com PC sobre seu projeto" — e também no botão flutuante "Converse com o PC", que chama a mesma função). **✅ Corrigido em 16/11/2026** — `focarPC()` leva para a home, mesmo padrão de 5 outros artigos
- Links internos quebrados: **3** — `/centro` e `/faria-lima` em `artigos/obra-comercial-residencial`; `/guia/antifraude` em `artigos/5-mentiras-empresas-cacamba-falam` (o certo é `/antifraude`). **✅ Corrigidos em 16/11/2026** — varredura do site inteiro depois: zero links internos quebrados (fora os placeholders `{{...}}` do `TEMPLATE_BAIRRO`)
- Preço "R$ carregando..." no HTML: **53 páginas**. O preço só aparece depois que o JavaScript busca o Supabase. Robô de IA que não roda JS lê "carregando" (ex.: Moema, e o FAQ "Quanto custa em Moema?" manda olhar a seção de valores)
- Home fala "CTR" sozinho em vários lugares (og:description, hero, badge "CTR incluso", "Como funciona", diferenciais) apesar de atender Grande SP — só um FAQ fala CTR/MTR
- Home: 3 blocos de golpe repetidos; erro "prometerem" (o certo é "prometeram"); imagem de compartilhamento (og:image) é a de golpe
- Faltam botões flutuantes nos 6 hubs de zona (`zona-*`, `centro-sp`, `grande-sp`), no índice do blog e no artigo do Guarujá

---

## 5. BLOG (`public/artigos/`)

15 artigos publicados + índice `/artigos`. Dois templates CSS coexistem — checar antes de editar:
- Maioria: `.blog-hero` / `.blog-img-hero`
- Os 2 mais recentes (`descarte-entulho-sao-paulo`, `remover-arbustos-poda-antes-cacamba-guaruja`): `.article-image`

### Especificação do blog (resumo do `PROMPT_BLOG_PADRAO_CACAMBA.md`, que não está no repo)
- Tom: direto, honesto, técnico sem complicar. Público: quem vai alugar caçamba + educação anti-golpe. Categorias: Como fazer, Guia Completo, Anti-fraude, Notícias. URL base `/artigos/`.
- `<title>`: "[Título] | Blog Padrão Caçamba", 55-60 caracteres. Meta description 150-160. og:title, og:description, og:image (`/image/blog-[slug].webp`), canonical `https://www.padraocacamba.com.br/artigos/[slug]`, Twitter Cards.
- Schema **BlogPosting** (headline, description, image, datePublished/dateModified ISO, author e publisher Organization "Padrão Caçamba", logo `/image/logo-padrao-cacamba.png`) + Breadcrumb.
- Estrutura: intro 100-150 palavras (hook + promessa), 3-5 H2, **1.500-3.000 palavras**, 1 hero + 1-2 imagens inline (máx. 1 por 500 palavras), FAQ inline com toggle (3-5 perguntas), 3-5 links internos (1 a cada ~300 palavras), 1 CTA verde "Pedir caçamba em [Bairro] →", alt text em todas as imagens, slug sem acento, H1 único.
- Imagens: hero 1200×630, inline 800×600, WebP qualidade 75.
- Layout mobile-first: 430px mobile, até 900px desktop, padding 18/32px.

### Imagens do blog — situação REAL em 09/11/2026
**Nenhuma das 16 imagens inline está no repositório** — nem as 5 que a v4.1 marcava como "✅ aprovada". Elas foram aprovadas no gerador, mas nunca subiram para `public/image/`. O HTML tem `onerror`, então o layout não quebra, só fica sem imagem.

Além disso, **2 artigos estão sem a imagem de capa (hero/og:image)**: `requisitos-contratar-cacamba-entulho` (`blog-requisitos-cacamba-legal.webp`) e `rodizio-caminhoes-sp-cacamba` (`blog-rodizio-caminhoes-sp.webp`) — e o índice do blog usa as duas. O artigo de MTR usa a capa do artigo de CTR (`blog-ctr-nf-empresa.webp`).

| Arquivo inline (`public/image/`) | Artigo | Status no gerador (v4.1) | No repo |
|---|---|---|---|
| blog-guia-completo-processo.webp | Guia Completo (1/2) | ✅ aprovada (prateada clara) | ❌ |
| blog-guia-completo-sinais-golpe.webp | Guia Completo (2/2) | pendente | ❌ |
| blog-tamanho-cacamba-comparativo.webp | Como Escolher Tamanho | ✅ aprovada | ❌ |
| blog-mentiras-preco-barato.webp | 5 Mentiras | gerada com texto — decidir se mantém | ❌ |
| blog-amianto-descarte-correto.webp | Amianto | 2 versões — escolher uma | ❌ |
| blog-reforma-apartamento-entulho.webp | Reformar Apartamento | pendente | ❌ |
| blog-ctr-nf-documentos.webp | CTR e NF | ✅ aprovada | ❌ |
| blog-ecoponto-vs-cacamba.webp | Descarte Entulho SP | pendente | ❌ |
| blog-mtr-sigor-processo.webp | MTR | pendente | ❌ |
| blog-obra-comercial-residencial-volume.webp | Obra Comercial x Residencial | ✅ aprovada | ❌ |
| blog-pintura-residuos-cacamba.webp | Pintura | ✅ aprovada | ❌ |
| blog-4m3-logistica-caminhao.webp | Por Que 4m³ | pendente — sem "caminhão manobrando" | ❌ |
| blog-custo-entulho-nao-economizar.webp | Custo Entulho | gerada com texto — mesma decisão de Mentiras | ❌ |
| blog-poda-arbustos-guaruja.webp | Poda Guarujá | pendente — sem "litoral ao fundo" | ❌ |
| blog-requisitos-checklist-cacamba.webp | Requisitos | pendente | ❌ |
| blog-rodizio-zmrc-caminhao.webp | Rodízio | pendente — sem "caminhão em avenida" | ❌ |

**Aprendizado de geração (Firefly/Gemini):** o estilo que funciona é *product-shot* de estúdio — metal escovado, fundo preto puro, luz dramática de cima, reflexo no chão (como a foto da Vila Olímpia e o logo "PC"). Cena realista completa (rua, prédio, caminhão manobrando, pessoa com EPI) sai ruim. Preferir 1-2 objetos isolados em fundo preto. Texto, quando houver, gravado em placa metálica com letras brancas — nunca fonte solta. (O prompt antigo do blog pedia "caçambas em cenários reais de SP" — superado por este aprendizado.)

### Próximos artigos já validados com volume real (14/09/2026, keywordtool.io)
1. **Condomínio / horário de obra** — "horário de obra em condomínio" 260/mês, concorrência ~1, 20+ variações long-tail. **Vencedor confirmado, aguardando estrutura.**
2. **Multa / descarte irregular de entulho** — ~120-150/mês, termo principal com tendência +250%, concorrência quase zero. Validado como segunda opção.
- Descartados: B2B/construtora (volume zero), terra/escavação e móveis velhos (intenção de busca errada).
- Achado lateral: "aluguel de caçamba diadema" (50/mês) — é pauta de página de cidade, não de blog.

---

## 6. IDENTIDADE VISUAL

```css
--black:#0A0A0A; --blue:#1E3A8A; --blue-light:#2563EB; --silver:#C0C0C0;
--white:#FFFFFF; --card:#161616; --card2:#1e1e1e; --border:#2a2a2a;
--green:#00FF7F; --muted:#999; --mid:#bbb; --cream:#F4F1EC
```
Títulos: `DM Serif Display` · Corpo: `DM Sans` (400/500/600/700). Texto de corpo nunca abaixo de 16px (a família de template Bebas Neue + Space Mono teve esse problema e foi corrigida em 23/07 em 15 páginas — ao criar página nova, conferir o tamanho da fonte do conteúdo novo).

Fotografia de produto: metal escovado, fundo preto puro, luz de estúdio dramática de cima, reflexo sutil no piso.

---

## 7. CONTEÚDO — REGRAS DE ESTRATÉGIA

- 3 modos: **página de bairro nova** (demanda geográfica validada no GSC, alto esforço), **artigo novo** (cluster validado sem conteúdo existente, 1.500-3.000 palavras), **enriquecimento** (interesse com volume <100/mês → 1-3 parágrafos + 1-2 FAQs numa página existente do mesmo tema). Volume baixo rebaixa de "artigo" para "enriquecimento", não descarta.
- Nunca criar URL concorrente para a mesma intenção de busca (canibalização).
- Nunca inventar capacidade que a empresa não tem — 4m³ único é absoluto, inclusive na calculadora de tamanho (sempre recomenda 4m³).
- Keyword nº1: "caçamba de entulho" (9.900/mês, KD 17) em `/cacamba-de-entulho` — mas estava na **posição 39** em set/2026, longe de "bem otimizada". Reavaliar.
- Ignorar "caminhão caçamba" (intenção de veículo), "como se escreve caçamba" (ortografia) e "cacamba" sem cedilha (o Google trata acento sozinho).
- Cluster "perto de mim" (2.700+/mês): sem página dedicada (o site não tem Google Meu Negócio próprio, por decisão) — vai como FAQ nas páginas de bairro.
- Antes de criar hub novo: Semrush Keyword Magic Tool ou "sopa de letrinhas" do autocomplete. Para validar artigo, keywordtool.io (Brasil, português, fonte Google, sementes de 2-4 palavras por grupo) e filtrar intenção antes de somar volume.
- Export do GSC útil: Desempenho → Consultas, **sem filtro de página**, 3-6 meses (ou 16).
- CTR = só capital (AMLURB) · MTR = demais cidades da Grande SP (SIGOR/CETESB) — nunca "CTR" sozinho fora da capital. Checar fato regulatório em fonte oficial antes de publicar.

### O que aprendemos sobre IA e ranking
- Perguntas **informativas** em IA citam o padraocacamba.com.br; perguntas **comparativas/de reputação** citam concorrentes com Google Meu Negócio forte.
- Mobile ranqueia muito melhor que desktop (set/2026: posição 7,6 x 25,3).
- O gargalo é CTR, não ranking: títulos e metas precisam bater com a busca exata que gera impressão.
- O `/precos` é a página mais "citável": tabela em texto puro.

### Bugs recorrentes a não repetir
- Schema FAQPage dessincronizado do FAQ visível (o mais comum) — contar perguntas nos dois lugares
- "Ghost schema" (no JSON-LD mas não aparece na tela) — pior que schema incompleto
- `alert()` esquecido em botão de CTA — testar clique sempre
- `">>` duplicado em meta description — `grep '">>'` antes de publicar
- Erro factual se propaga por template (calçada "proibida" foi para 23 páginas)
- "CTR" no lugar de "MTR" em cidade da Grande SP (corrigido em 5 páginas, continuar vigiando)
- Imagem "aprovada" que nunca subiu para o repo (16 inline do blog) — conferir com `ls public/image` antes de marcar pronta

---

## 8. ESTRATÉGIA DE FUNDO (do Master Context original, ainda válida)

**Mercado:** produto físico, logística pesada (caminhão + pátio + rota + aterro). O digital serve para captar cliente. Problemas do mercado = oportunidade: promessas irreais, preço sem transparência, pouco conteúdo útil, golpes e intermediadores sem CNPJ.

**Cliente na hora da busca:** urgência, dúvida, medo de errar (multa, tamanho, golpe), desinformação sobre regra municipal. Decide por: 1) confiança, 2) clareza, 3) facilidade, 4) preço. 95%+ pelo celular, muitas vezes na obra.

**Concorrentes:** (1) verticalizado forte — frota/aterro, marketing fraco; (2) médio operacional — site fraco; (3) agregador/intermediador — Ads pesado, promessa agressiva, sem CNPJ/NF — **o Ads é a arena dele, não a nossa**; (4) site de golpe — fotos de banco, preço muito baixo.

**Posicionamento:** ser a fonte mais confiável do mercado. Não competir por menor preço, maior velocidade ou no Ads. Explicar o que ninguém explica, mostrar a operação real, ajudar o cliente a decidir certo. Regra de ouro: **se não ajuda o cliente a decidir, não entra no site.**

**8 pilares:** verdade operacional, padrão local, educação, autoridade, transparência, alerta (educativo), cobertura ampla, padrão único.

**Benchmark Semrush do cacambasp.com.br (abril/2026):** 581 palavras-chave, ~1.100 visitas/mês, 67,6% do tráfego em `/tabela-de-precos/`, #1 em "caçamba de entulho são paulo" (1.300/mês) e "caçamba são paulo" (480), #3 em "preço do aluguel de caçamba" (590) e "preço caçamba" (480). ~20% do tráfego vinha de IA sem otimização; 23 menções em IAs (ChatGPT 4, AI Overview 7, Modo IA 9, Gemini 3). Queda forte no mobile na época (-80% tráfego).

**Regra mestra:** o site é filtro de clientes, gerador de confiança, sistema de aquisição orgânica e referência citada por IAs — e o paraquedas reserva enquanto o cacambasp.com.br sustenta a família. Nunca sacrificar o que sustenta a família.

---

## 9. DESEMPENHO — DADOS REAIS

### Google Search Console — padraocacamba.com.br (lido em 09/11/2026)
| Período | Cliques | Impressões | CTR | Posição média |
|---|---|---|---|---|
| Todo o histórico (17/05 a 07/11/2026) | 96 | 10,8 mil | 0,9% | 12,2 |
| Últimos 3 meses (08/08 a 07/11/2026) | 80 | 8,55 mil | 0,9% | 10 |

**Evolução mês a mês — crescimento constante:**
| Mês | Cliques | Impressões | Posição média |
|---|---|---|---|
| mai/26 (desde 17/05) | 1 | 165 | 34,6 |
| jun/26 | 1 | 484 | 26,2 |
| jul/26 | 11 | 1.262 | 17,3 |
| ago/26 | 17 | 1.406 | 14,1 |
| set/26 | 25 | 2.447 | 11,3 |
| out/26 | 32 | 3.939 | 9,1 |
| nov/26 (1–7) | 9 | 1.101 | 7,3 |

**Por dispositivo (todo o histórico):** celular 50 cliques / 6.412 impr. / posição 7,5 · computador 46 / 4.374 / 19,1 · tablet 0 / 18.

**Páginas que mais trazem (todo o histórico — cliques / impressões / posição):**
- Blog puxa a maior parte das impressões: `02-como-escolher-tamanho-cacamba` 7 / 1.362 / 7,4 · `ctr-nf-empresa-verdade` **10** / 1.132 / 6,8 · `descarte-entulho-sao-paulo` 2 / 1.045 / 14,8 · `quanto-custa-descartar-entulho-sp` 2 / 824 / 7,8 · `guia-completo-alugar-cacamba-sp` 4 / 303 / 7,6 · `amianto-descarte-seguro` 3 / 216 / 9,8 · `por-que-4m3-padrao` 0 / 200 / 8,1 · `requisitos-…` 1 / 199 / 22,8 · `mtr-…` 0 / 133 / 5,5
- Home: **11** / 158 / 4,0 · `/aluguel-de-cacamba` 4 / 73 / 6,0 · `/vila-olimpia` 4 / 71 / 9,4
- Bairros com mais impressões: Lapa 297, Guarulhos 285, Penha 282, Pinheiros 247, Perdizes 234, Pirituba 196, Brooklin 177, Jabaquara 174, Alto de Pinheiros 163, Zona Leste 156, Itaim Bibi 148, Zona Norte 147, Sapopemba 146, Cidade Dutra 140
- `/precos` 0 / 261 / 12,9 · `/cacamba-de-entulho` 0 / 231 / **28,9** · `/o-que-nao-pode-ir-na-cacamba` 0 / 167 / 10,5 · `/antifraude` 0 / 71 / 13,8
- **9 páginas sem nenhuma impressão em 16 meses:** `/cacamba-4m3`, `/comeca-aqui`, `/como-escolher`, `/preco-cacamba`, `/ipiranga`, `/santa-cecilia`, `/vila-prudente`, `/artigos/como-reformar-apartamento`, `/artigos/obra-comercial-residencial`

**Consultas (top por impressão; a maior parte dos cliques vem de consultas anônimas que o Google esconde — só 8 dos 96 cliques aparecem por consulta):**
"caçamba" 143 impr. / pos. 9,7 · "coleta de entulho em sp" 93 / 45 · "caçambas em moema" 78 / 31 · "caçambas no jabaquara" 77 / 30 · "caçambas em pinheiros" 74 / 40 · "caçambas na lapa" 69 / 32 · "caçambas no itaim bibi" 68 / 35 · "ctr caçamba" 65 / 8,0 · "caçambas no brooklin" 65 / 38 · "caçamba de entulho pirituba preço" 64 / 6,7 · **"caçamba zona sul preço" 3 cliques / 60 / 7,1** · "caçamba zona leste sapopemba" 59 / 10 · "caçamba de entulho na zona sul" 57 / 54 · "caçambas no tatuapé" 56 / 52 · "caçamba de entulho na penha" 48 / 40 · "4m³" 47 / 6,8 · "caçamba zona norte preço" 46 / 6,3 · "caçambas em perdizes" 44 / 28 · "retirada de entulho preço" 1 clique / 40 / 8,2.
Leitura: buscas com **"preço"** já ranqueiam bem (posição 6-8); buscas no formato **"caçambas em/no [bairro]"** ainda estão na posição 30-50 — é onde há espaço para subir. Ruído a ignorar: "licença para caçamba na rua campinas", "caçamba de entulho em vila isabel/padre miguel" (RJ), "empresa de reformas…", "cabeamento de rede brooklin", "armazém cursino".

**Indexação (última atualização 05/11/2026):** 69 indexadas, 16 não indexadas.
- 14 "rastreada, mas não indexada no momento" — entre elas (10 visíveis): `/artigos/pintura-casa-descarte`, `/mooca`, `/bras`, `/santa-cecilia`, `/consolacao`, `/republica`, `/agua-branca`, `/liberdade`, `/carapicuiba` e `/api/precos`. Quase todas do Centro e vizinhança — páginas fracas de conteúdo/links para o Google.
- 1 "não encontrado (404)": **`/sao-bernardo-do-campo`** (a página real é `/sao-bernardo`). **✅ Redirect 301 no `vercel.json` publicado em 16/11/2026.**
- 1 "4xx": `/api/chat` (normal, só aceita POST).

**Links externos (backlinks):** só 5, todos para a home, de cacambamoema.com, cacambasp.com.br, econodata.com.br, hotfrog.com.br e portalcacambas.com. Links internos: 658.

### portalcacambas.com — o domínio que mais traz busca (GSC, conta portalcacambas)
- Todo o histórico (08/07/2025 a 16/08/2026 no gráfico): **14,3 mil cliques, 888 mil impressões, CTR 1,6%, posição 9**. Últimos 3 meses: 2.513 cliques.
- Consultas que mais trazem clique: "caçamba praia grande" 112 · "caçamba de entulho" 87 (15,9 mil impr., pos. 11) · "caçamba de entulho praia grande" 87 · "caçamba taboão da serra" 71 · "aluguel de caçamba" 70 (13,7 mil impr.) · "caçamba" 67 (20 mil impr.) · "caçamba de entulho capão redondo" 58 · "caçamba capão redondo" 55 · "caçamba osasco" 52 · "caçamba de entulho caieiras" 52 · "locação de caçamba" 49 · "caçamba carapicuíba" 49 · "caçamba de entulho vargem grande paulista" 49 · "caçamba campo limpo" 47 · "caçamba de entulho grajaú" 36 · "jd ângela" 34 · "embu das artes" 31.
- **Demanda geográfica comprovada onde o padraocacamba não tem página:** Praia Grande (litoral), Taboão da Serra, Capão Redondo, Campo Limpo, Jardim Ângela, Caieiras, Vargem Grande Paulista, Embu das Artes. Pelo critério da seção 7 (página nova só com demanda validada), são os candidatos mais fortes a próxima página.

**Análise anterior (10/09/2026, 09/jun–08/set — 31 cliques / 3.508 impr. / CTR 0,88% / pos. ~17):**
- Posição mensal: jun 27,2 → jul 18,1 → ago 14,1 → set 17,3 (parcial). Impressões: 339 → 1.262 → 1.406 → 501 (parcial).
- Mobile 7,57 x desktop 25,29. 30 de 31 cliques do Brasil.
- 16 páginas na 1ª página do Google (posição ≤12) com **0 cliques**, somando 447 impressões: /santana (10,3; 77), /cursino (11,7; 57), /saude (5,4; 41), /pirituba (11,1; 36), /vila-formosa (10,9; 35), /aluguel-de-cacamba (5,9; 32), /higienopolis (7,8; 24), /republica (4,2; 23), /guaianases (7,7; 23), /o-que-nao-pode-ir-na-cacamba (11,5; 19), /locacao-de-cacamba (10,9; 18), /barra-funda (2,9; 14), /santo-amaro (6,4; 14), /artigos/02-como-escolher-tamanho-cacamba (10,9; 12), /osasco (5,6; 11), /cidade-dutra (9,7; 11). As buscas são comerciais ("caçamba santana", "valor caçamba guaianases").
- Funcionando: home (posição 3,5, CTR 6,6%); artigos quanto-custa-descartar-entulho-sp (495 impr.), descarte-entulho-sao-paulo (432), ctr-nf-empresa-verdade (394, 3 cliques); /lapa, /penha, /vila-olimpia com posição e CTR bons.
- 178 impressões como "Snippets do produto" (posição 22,6, 0 cliques) — provavelmente do PriceSpecification do `schema-inject.js`. Testar no Teste de Resultados Avançados.
- **Ação tomada em 10/09:** título/meta reescritos em 11 páginas (padrão preço + NF + gancho de pagamento; referência local em República e Barra Funda; Osasco mesclado mantendo "de entulho").

**Efeito da troca de títulos (10/09):** depois dela os cliques subiram de 17 (ago) para 25 (set) e 32 (out), e a posição foi de 14,1 para 9,1. As impressões também cresceram, então não dá para atribuir tudo aos títulos, mas a direção é boa.

### Microsoft Clarity — projeto `wlu14vvzwg`
**PENDENTE:** páginas mais vistas, celular x desktop, rolagem, cliques mortos/de raiva, mapa de calor dos CTAs e **Visibilidade da IA → Citações**.

---

## 10. DECISÕES TOMADAS (não reabrir sem o Doug pedir)

| # | Decisão |
|---|---|
| 1 | Foco: site + IA (GEO/AEO/LLMO) + mobile — sem app/backend complexo agora |
| 2 | Geografia: SP capital + Grande SP + Litoral (fase 2) |
| 3 | B2B + B2C com peso igual |
| 4 | Posicionamento: confiança + transparência + cobertura ampla |
| 5 | Modelo: transportadora especializada, não intermediador |
| 6 | Diferencial-chave: estratégia anti-golpe + educação |
| 7 | cacambasp.com.br: NUNCA TOCAR — paraquedas reserva |
| 8 | Especialização: 4m³ padrão (às vezes 5m³) |
| 9 | Velocidade: sem pressa, qualidade > velocidade |
| 10 | Execução: Doug + IA, sem contratar dev |
| 11 | URLs planas, HTML estático na Vercel — não migrar de stack nem de estrutura de URL |
| 12 | Sem Google Meu Negócio próprio para o padraocacamba.com.br (adiado por decisão) |

---

## 11. PENDÊNCIAS E CORREÇÕES ABERTAS (09/11/2026)

### Prioridade alta — afetam citação por IA e conversão
1. **Preço visível sem JavaScript** em 53 páginas (hoje aparece "R$ carregando..."): escrever o valor no HTML/FAQ de cada página, mantendo o Supabase como atualização.
2. **Alinhar preços** home, `/precos`, `llms-full.txt` e `/api/precos-zonas` (fallback) com o Supabase. Hoje se contradizem (seção 2).
3. ~~**Linker do Google Ads em todas as páginas**~~ — **✅ feito em 16/11/2026** (commits `58da5ac` e `14e4a65`): botão flutuante "Pedir Caçamba" e botão de cadastro do chat do PC levam o `_gl` para o CRM, conferido no ar; o CRM já lia o `_gl` (sem alteração); `gtag-ads.js` incluído no artigo do Guarujá.
4. **Home:** trocar "CTR" sozinho por "CTR/MTR", tirar blocos de golpe repetidos, corrigir "prometerem", trocar og:image de golpe.
5. **`/cacamba-de-entulho`** na posição 29 (média de 16 meses) para a keyword nº1 — revisar título e conteúdo.
6. **Próximas páginas de cidade/bairro** com demanda comprovada no GSC do portalcacambas: Praia Grande, Taboão da Serra, Capão Redondo, Campo Limpo, Jardim Ângela, Caieiras, Vargem Grande Paulista, Embu das Artes (seção 9).
7. ~~**Redirect `/sao-bernardo-do-campo` → `/sao-bernardo`**~~ — **✅ feito em 16/11/2026** (commit `0ad8dad`).
8. **14 páginas "rastreadas, mas não indexadas"** (Centro e vizinhança, Carapicuíba, Pintura): reforçar conteúdo próprio e links internos para elas.

### Prioridade média
9. Subir as 16 imagens inline do blog + criar as 2 capas que faltam (requisitos, rodízio) + capa própria do artigo de MTR.
10. ~~`artigos/obra-comercial-residencial`: tirar `alert()` e corrigir links~~ — **✅ feito em 16/11/2026** (commit `0ad8dad`): `focarPC()` leva para a home; `/centro` → `/centro-sp`; `/faria-lima` → `/itaim-bibi` com o texto "Itaim Bibi (Faria Lima)" (decisão do Doug).
11. ~~`artigos/5-mentiras-empresas-cacamba-falam`: link `/guia/antifraude` → `/antifraude`~~ — **✅ feito em 16/11/2026** (2 links, commit `0ad8dad`).
12. Script do Clarity em `artigos/pintura-casa-descarte`; ~~`gtag-ads.js` em `artigos/remover-arbustos-…`~~ (**✅ 16/11**); botões flutuantes nos 6 hubs, índice do blog e artigo do Guarujá.
13. Atualizar `llms-full.txt` (Parelheiros, preços, data).
14. Escrever o artigo de **condomínio / horário de obra** (validado).
15. Frase "vários tamanhos = irregular" no `/precos` → trocar por "trabalhamos só com 4m³".

### Prioridade baixa / backlog
16. Apagar os 29 PNGs originais sem uso (~15 MB cada) de `public/image/`.
17. Decidir se o `monitoring.js` deve rodar (falta `crons` no vercel.json) e se o `monitoring-dashboard` ainda serve (dados do Clarity fixos de 22/06).
18. Link CETESB no artigo de amianto — a URL `sistemasinter02.cetesb.sp.gov.br/consultaLicenciamento/public/` é para outro tipo de licenciamento (árvore, solo); não linkar até achar a consulta certa de transportador/destinador Classe I.
19. 3 peças visuais: infográfico 3m³ x 4m³ x 5m³, mockup CTR/NF com dados fictícios, checklist de reforma para imprimir.
20. Pares `.md` dos 15 artigos (se fizer sentido para GEO).
21. Modelo do PC é `claude-sonnet-4-5` — avaliar atualização quando conveniente (não mexer sem autorização).

---

## 12. MIGRAÇÃO PARA A CONTA NOVA DO CLAUDE — CHECKLIST

**Antes de encerrar a conta antiga:**
- [ ] **Chave da API do PC:** o vendedor IA do site usa `ANTHROPIC_API_KEY` (variável na Vercel). Conferir em qual conta do Console da Anthropic essa chave foi criada. Se for da conta que vai ser encerrada, criar chave nova na conta nova e trocar na Vercel **antes** — senão o PC para de responder.
- [ ] Baixar este documento.
- [ ] (Opcional) Configurações → Privacidade → Exportar dados, para guardar o histórico de conversas.
- [ ] Os outros projetos da conta (Automatização Financeira, lançamentoalphaville, CRM, Instagram etc.) também ficam para trás — fazer o mesmo processo com eles se precisar.

**Na conta nova:**
1. Criar o projeto e colar este documento nas instruções (ou subir como arquivo e deixar nas instruções: "leia DOCUMENTO_MESTRE_PADRAO_CACAMBA.md antes de tudo").
2. Conectar o GitHub (Conectores → GitHub) e instalar o app Claude na organização CacambaSP só para `padraocacamba` (seção 3).
3. Instalar/entrar na extensão Claude in Chrome com a conta nova — é por ela que o Claude lê GSC, Clarity e o site no ar.
4. A memória começa vazia. Este documento substitui a memória antiga.

**Nada muda em:** GitHub, Vercel, Supabase, Registro.br, Clarity, Search Console, Google Ads — nenhum depende da conta do Claude.

---

## 13. HISTÓRICO (para contexto — essas conversas não vão para a conta nova)

- **abr–mai/2026** — Master Context v3, contextos de novo chat, primeiras imagens Firefly (fundo preto, letras brancas entalhadas)
- **jun/2026** — Prompt do blog v1.0; dashboard de monitoramento com dados do Clarity (22/06)
- **jul/2026** — fonte pequena corrigida em 15 páginas, hubs de termo genérico (`/cacamba-de-entulho`, `/aluguel-de-cacamba`, `/locacao-de-cacamba`), `/o-que-nao-pode-ir-na-cacamba`, `llms-full.txt` (15/07)
- **ago/2026** — estratégia de backlinks, campanha Google Ads, análise GSC + citações por IA, links de cadastro do CRM, estrutura do blog
- **01/09** — Clarity Citations e backlinks
- **08–11/09** — páginas por template, análise do site, pente-fino, imagens (LCP/CLS), títulos/metas de 11 páginas, Documento Mestre v4/v4.1
- **14/09** — validação de pautas do blog (condomínio vence)
- **16/09** — página de Parelheiros, sub-bairros por CEP, botão flutuante "Pedir Caçamba"
- **23/09** — mensagem de WhatsApp anti-golpe apontando para `/antifraude`
- **28/09** — tag do Google Ads em todas as páginas + linker só na home
- **14/10** — revisão do site como robô de IA (preço "carregando", CTR sozinho, contradição de preço) e checagem da tag do Ads
- **09/11** — esta auditoria e migração
- **16/11** — Documento Mestre v5.0 fechado e copiado para a raiz do repo (lá ainda estava a v4.1). Acesso de push do Claude configurado (conector GitHub na conta CacambaSP). Entrega 1 (commit `0ad8dad`): redirect São Bernardo, `alert()` e 5 links quebrados no blog — conferido no ar, botão do PC testado pelo Doug. Entrega 2 (commit `58da5ac`): linker do Google Ads no `gtag-ads.js`. Entrega 3 (commit `14e4a65`): linker também no botão de cadastro do chat do PC (via `window.linkCRM`, autorizado), `gtag-ads.js` no artigo do Guarujá, CRM conferido só em leitura (já aceitava o `_gl`). Clarity continua pendente (sessão expirada).

---

*Documento gerado em 09/11/2026. Para atualizar: abrir um chat no projeto, referenciar este arquivo e pedir para revisar contra o estado real do repositório antes de editar qualquer coisa. Guardar uma cópia na raiz do repo (`DOCUMENTO_MESTRE_PADRAO_CACAMBA.md`) — o repo não depende da conta do Claude.*