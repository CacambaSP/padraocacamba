# DOCUMENTO MESTRE — PADRÃO CAÇAMBA
**Versão:** 4.1 — Consolidado a partir de pente-fino técnico real no repositório + reforço de URL/stack/antifraude após checagem contra plano genérico colado pelo Doug
**Data:** 11/09/2026
**Domínio:** padraocacamba.com.br
**Substitui:** `MASTER_CONTEXT_PADRAO_CACAMBA.md`, `CONTEXTO_MESTRE_PADRAO_CACAMBA_v2.docx`, `CONTEXTO_NOVO_CHAT_PADRAO_CACAMBA.md`, `CONTEXTO_NOVO_CHAT_PADRAO_CACAMBA_v3.md` — depois de conferir que está tudo aqui, apague os 4 do projeto (veja seção 10).

---

## ⚠️ INSTRUÇÕES PARA A IA (leia antes de fazer qualquer coisa)

- Este documento é a ÚNICA fonte de verdade do projeto. Se outro arquivo do projeto contradizer este, **este vence** — foi atualizado a partir de auditoria real do repositório, não de memória de conversa antiga.
- NÃO sugira mudanças nas decisões já tomadas sem o Doug pedir.
- NÃO mexa no CRM nem no PC (vendedor IA) sem autorização.
- NÃO toque no cacambasp.com.br (sustento atual da família).
- Use português brasileiro, direto, sem bajulação. Numere opções ao apresentar alternativas.
- **"Pra mim só vale se for verdadeiro"** — nunca invente dado, preço, regra ou conteúdo. Extraia do HTML/schema real quando possível.
- Antes de criar página de bairro nova: copie `public/TEMPLATE_BAIRRO.html`, preencha os placeholders `{{...}}`, siga o checklist de 5 passos que está no comentário do topo do próprio arquivo (imagem, Supabase, sitemap, .md, llms.txt).
- Cada chat novo começa com ambiente zerado — sem token, sem credencial salva. Ver seção 3 pra saber como aplicar mudanças direto no repo.
- Se o Doug colar plano/arquitetura/sugestão vindo de outro chat ou IA, trate como possivelmente desatualizado ou genérico — confira contra o repositório real (seção 3 e 4) antes de agir. Já aconteceu de um plano genérico sugerir recomeçar do zero uma coisa que já existia (as páginas de bairro), com URL e tecnologia que não batem com o site real.

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
| Site | padraocacamba.com.br |
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
| padraocacamba.com.br | Registro.br, DNS ativo | **BASE deste projeto** |
| portalcacambas.com | Google Sites | Laboratório de testes / backlink — não embeda HTML custom |
| cacambascampobelo.com, cacambamoema.com | Rede de backlink | cacambamoema.com também em Google Sites |
| caçamba.com | MEI da Cláudia | Domínio paralelo |

### Cobertura geográfica
SP Capital (todas as zonas) + Grande SP (ABC, Guarulhos, Osasco, Barueri, Alphaville, Carapicuíba, Santana de Parnaíba) + Litoral SP (fase 2 — já existe 1 artigo sobre Guarujá)

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
| Faturamento PJ | 3 primeiras locações normal, faturamento 7 dias a partir da 4ª |
| Caminhão | Até 6 caçambas por rota |
| Entrega noturna | 22h–4h (evita rodízio SP) |
| Zona azul | Entrega normal, remove se notificado pela CET, sem reembolso — preço é por caçamba, não por dia |

### Preço por zona (fallback quando não há preço específico do bairro no Supabase)
| Região | Preço com NF |
|---|---|
| Osasco, Carapicuíba | R$ 470 |
| SP Zona Sul, Norte, Oeste, Barueri, Guarulhos, ABC | R$ 570 |
| SP Zona Leste, Perus, Pirituba | R$ 600 |
| Litoral SP | a partir de R$ 350 (varia por cidade) |

### Posicionamento anti-golpe
- NÃO condenar concorrentes diretamente (risco de retaliação) — educar o cliente a reconhecer sinais.
- Sinais de golpe divulgados: preço abaixo de R$ 400, promessa de entrega em 2h, cobrança adiantada (50%), ajudante "grátis", sem CNPJ visível, sem nota fiscal.

---

## 3. INFRAESTRUTURA TÉCNICA

### GitHub
- Repositório: `github.com/CacambaSP/padraocacamba` (público)
- HTMLs: `public/` · Imagens: `public/image/` · Artigos: `public/artigos/`
- `gerar-sitemap.js` gera o sitemap.xml a partir dos arquivos reais — **nunca editar sitemap.xml na mão**. Exclui: `TEMPLATE_BAIRRO`, `monitoring-dashboard`, `monitoring-dashboard-v1-backup`, `cadastro`, `locar`.
- **URLs são sempre PLANAS**: `padraocacamba.com.br/moema`, `padraocacamba.com.br/osasco` — nunca aninhadas por zona (`/zona-sul/moema` **não existe e não deve ser criado**). Cada bairro é um arquivo `.html` direto na raiz de `public/`.
- **Stack é HTML estático + funções serverless na Vercel (`api/`)** — não é WordPress, não é Elementor, não é um CMS tradicional. Sugestões de migrar pra WordPress/Elementor não se aplicam a este projeto.
- Página de denúncia/anti-golpe **já existe**: `public/antifraude.html` — não criar uma nova com outro slug (`/golpe-cacamba-sp` etc.).

### Vercel
- Deploy automático a cada push na main (~2-3min)
- `vercel.json`: `cleanUrls: true` → **toda imagem precisa de URL ABSOLUTA** (`https://www.padraocacamba.com.br/image/x.webp`), nunca relativa (quebra com cleanUrls)

### Supabase
- Projeto: `ejfuqijtiberxsnvxdwm` · URL: `https://ejfuqijtiberxsnvxdwm.supabase.co` (chave pública já embutida no HTML de cada página — não é segredo)
- Tabelas: `precos_bairros` (preço por bairro), `precos_zonas` (fallback por zona), `config_pc` (prompt do PC, versão atual 2.2), `bairros_paginas`, `pc_aprendizado`, `juca_conversas` (registro de variante A/B)

### Como o Claude aplica mudanças direto no repo
Cada chat novo começa com ambiente zerado — sem token, sem credencial salva, por desenho de segurança (não é regressão, sempre foi assim desde junho/2026, sempre neste mesmo chat, nunca foi Cowork). Pra aplicar mudanças direto:
1. Doug gera um GitHub Personal Access Token (classic) em `github.com/settings/tokens/new` — escopo `repo`, validade curta (7 dias)
2. Cola o token no chat
3. Claude usa o token na URL do remote (`git remote set-url origin https://TOKEN@github.com/CacambaSP/padraocacamba.git`), faz as mudanças, comita e dá push
4. Doug apaga o token depois de conferir que subiu certo

---

## 4. INVENTÁRIO REAL DO SITE (pente-fino 11/09/2026)

78 páginas HTML na raiz de `public/` + 15 artigos em `public/artigos/` = 93 páginas de conteúdo.

### Geografia — 56 páginas (bairro ou cidade, pela variável `ZONA` de cada página)
| Zona | Bairros | Qtd |
|---|---|---|
| Zona Sul | Itaim Bibi, Vila Olímpia, Moema, Brooklin, Vila Mariana, Campo Belo, Cidade Dutra, Cursino, Grajaú, Ipiranga, Jabaquara, Morumbi, Santo Amaro, Saúde | 14 |
| Zona Oeste | Pinheiros, Vila Madalena, Higienópolis, Perdizes, Lapa, Alto de Pinheiros, Água Branca, Barra Funda, Butantã, Jaguaré, Jaraguá, Perus, Pirituba, Santa Cecília, Vila Leopoldina, Vila Sônia | 16 |
| Zona Norte | Santana, Tucuruvi, Vila Guilherme, Casa Verde | 4 |
| Zona Leste | Tatuapé, Penha, Vila Formosa, Vila Matilde, Itaim Paulista, Brás, Ermelino Matarazzo, Guaianases, Mooca, Sapopemba, Vila Prudente | 11 |
| Centro | Liberdade, República, Consolação, Bela Vista | 4 |
| Grande SP (cidades) | Santo André, São Bernardo, Barueri, Osasco, Carapicuíba, Guarulhos, Cotia | 7 |

⚠️ **Nuance real, não é bug:** `centro-sp.html` (hub de navegação) lista 6 bairros — os 4 da tabela acima **mais Brás e Santa Cecília**, por proximidade geográfica do centro. Mas a variável `ZONA` de Brás e Santa Cecília (usada pra preço/schema) diz Zona Leste e Zona Oeste. São dois critérios diferentes coexistindo de propósito — não "corrigir" um pelo outro sem entender qual sistema depende de qual.

### Hubs institucionais (não contam como bairro)
`zona-sul`, `zona-oeste`, `zona-norte`, `zona-leste`, `centro-sp`, `grande-sp`, `index`, `precos`, `antifraude`, `cacamba-4m3`, `cacamba-de-entulho` (keyword nº1, 9.900 buscas/mês), `aluguel-de-cacamba`, `locacao-de-cacamba`, `preco-cacamba`, `como-escolher`, `comeca-aqui`, `o-que-nao-pode-ir-na-cacamba`

### Excluídas do sitemap (intencional)
`cadastro`, `locar` (pertencem ao CRM), `monitoring-dashboard`(-v1-backup) (ferramenta interna), `google3d037644c6712a40.html` (verificação Google)

### Arquivos de apoio — status em 11/09/2026
- **sitemap.xml** — 89 URLs, bate com os arquivos reais, sem página órfã
- **robots.txt** — libera todos os crawlers de IA relevantes (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Grok, CCBot, etc.)
- **llms.txt** — corrigido hoje: contagem real (56, não 43), Brás/Santa Cecília na zona correta, Zona Norte/Leste completas (antes listavam menos bairros do que existiam)
- **llms-full.txt** — **não auditado nesta rodada**, data registrada é 15/07/2026, site mudou bastante desde então — checar antes de confiar nele
- **TEMPLATE_BAIRRO.html** — tinha sumido do repositório, **recriado hoje** a partir de `vila-matilde.html` (a página mais recente/otimizada), com placeholders `{{}}` e checklist de 5 passos no comentário do topo do arquivo
- **Todas as 93 páginas de conteúdo têm par `.md`** (73 arquivos `.md` na raiz de `public/`) — lacuna fechada hoje (13 arquivos criados: Jaguaré, Vila Matilde, Vila Sônia + 10 institucionais)

---

## 5. BLOG (public/artigos/)

15 artigos publicados, seguindo `PROMPT_BLOG_PADRAO_CACAMBA.md` (meta/schema/estrutura). Dois templates CSS coexistem — checar qual um artigo usa antes de editar:
- Maioria: classes `.blog-hero` / `.blog-img-hero`
- Os 2 mais recentes (`descarte-entulho-sao-paulo`, `remover-arbustos-poda-antes-cacamba-guaruja`): classes `.article-image`

### Imagens inline — status em 11/09/2026
Todos os 15 artigos têm HTML/CSS prontos pra imagem inline (1 cada, 2 no Guia Completo), com `onerror` pra não quebrar layout enquanto a imagem real não existir. **Doug está refazendo a geração imagem a imagem** — tabela abaixo é o checklist de continuidade.

**Aprendizado de geração de imagem (Firefly/Gemini):** o estilo que funciona pra essa marca é *product-shot* de estúdio — metal escovado, fundo preto puro, luz dramática, reflexo no chão (mesmo estilo da foto de referência da Vila Olímpia e do logo "PC" já usados no projeto). Prompts pedindo cena realista completa (rua, prédio, caminhão manobrando, pessoa com EPI) tendem a sair ruins/bagunçados. Preferir 1-2 objetos hero (caçambas, ícones 3D, documentos) isolados em fundo preto.

| Arquivo (`public/image/`) | Artigo | Status em 11/09 |
|---|---|---|
| blog-guia-completo-processo.webp | Guia Completo (1/2) | ✅ aprovada — versão prateada clara |
| blog-guia-completo-sinais-golpe.webp | Guia Completo (2/2) | pendente |
| blog-tamanho-cacamba-comparativo.webp | Como Escolher Tamanho | ✅ aprovada |
| blog-mentiras-preco-barato.webp | 5 Mentiras | gerada com texto ("SEM DOCUMENTOS" / "CTR/NF INCLUSOS") — decidir se mantém texto ou regera sem |
| blog-amianto-descarte-correto.webp | Amianto | 2 versões geradas (close no telhado / cena completa do trabalhador) — escolher uma |
| blog-reforma-apartamento-entulho.webp | Reformar Apartamento | pendente |
| blog-ctr-nf-documentos.webp | CTR e NF | ✅ aprovada |
| blog-ecoponto-vs-cacamba.webp | Descarte Entulho SP | pendente |
| blog-mtr-sigor-processo.webp | MTR | pendente |
| blog-obra-comercial-residencial-volume.webp | Obra Comercial x Residencial | ✅ aprovada — prompt refeito (2 caçambas com entulho diferenciado, sem prédio/rua) |
| blog-pintura-residuos-cacamba.webp | Pintura | ✅ aprovada |
| blog-4m3-logistica-caminhao.webp | Por Que 4m³ | pendente — reescrever sem "caminhão manobrando em rua" |
| blog-custo-entulho-nao-economizar.webp | Custo Entulho | gerada com texto ("preço baixo" / "CTR/NF") — mesma decisão da imagem de Mentiras |
| blog-poda-arbustos-guaruja.webp | Poda Guarujá | pendente — reescrever sem "ambiente litorâneo ao fundo" |
| blog-requisitos-checklist-cacamba.webp | Requisitos | pendente |
| blog-rodizio-zmrc-caminhao.webp | Rodízio | pendente — reescrever sem "caminhão em avenida à noite" |

---

## 6. IDENTIDADE VISUAL

### Cores
```css
--black:#0A0A0A; --blue:#1E3A8A; --blue-light:#2563EB; --silver:#C0C0C0;
--white:#FFFFFF; --card:#161616; --card2:#1e1e1e; --border:#2a2a2a;
--green:#00FF7F; --muted:#999; --mid:#bbb
```

### Tipografia
Títulos: `DM Serif Display` · Corpo: `DM Sans` (400/500/600/700)

### Fotografia de produto (caçambas, logo)
Metal escovado, fundo preto puro, luz de estúdio dramática vinda de cima, reflexo sutil no piso. Texto, quando houver, embutido em placa metálica com letras brancas em negrito — nunca fonte solta flutuando por cima da cena.

### Analytics
Microsoft Clarity: `wlu14vvzwg`

---

## 7. CONTEÚDO — REGRAS DE ESTRATÉGIA

- 3 modos de conteúdo: **página de bairro nova** (demanda geográfica validada no GSC, alto esforço), **artigo novo** (cluster validado sem conteúdo existente, 1.500-3.000 palavras), **enriquecimento** (interesse com baixo volume <100/mês → vira 1-3 parágrafos + FAQ numa página existente)
- Nunca criar URL concorrente pro mesmo intent de busca (risco de canibalização de keyword)
- Nunca inventar capacidade que a empresa não tem — regra do 4m³ único é absoluta, inclusive na calculadora de tamanho
- **"Pra mim só vale se for verdadeiro"** — princípio central, nenhum dado simulado em nenhuma página
- Keyword nº1: "caçamba de entulho" (9.900/mês, KD 17) — já bem otimizada em `/cacamba-de-entulho`
- Ignorar "caminhão caçamba" (intent de veículo/carroceria, não locação) e "como se escreve caçamba" (ortografia)
- Cluster "perto de mim" (2.700+/mês): sem página dedicada por design (site não tem GBP próprio) — distribuído como FAQ nas páginas de bairro
- CTR = só capital (sistema AMLURB) · MTR = demais cidades da Grande SP (sistema SIGOR/CETESB) — nunca usar "CTR" sozinho fora da capital

### Bugs recorrentes a não repetir
- **Schema FAQPage dessincronizado do FAQ visível** — bug mais comum do projeto, sempre conferir que a contagem de perguntas bate nos dois lugares antes de marcar página como pronta
- "Ghost schema" (existe no JSON-LD mas nunca renderiza pro usuário) — pior que schema incompleto
- Botão de CTA com `alert()` esquecido — testar clique sempre
- Meta description com `">` duplicado (bug de copiar/colar) — `grep '">>'` em todos os arquivos antes de publicar
- Erro factual se propaga rápido via template — já aconteceu de um erro se espalhar por 23 páginas a partir de 1 original

---

## 8. DECISÕES TOMADAS (não reabrir sem o Doug pedir)

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

---

## 9. PENDÊNCIAS ABERTAS (11/09/2026)

- [ ] **16 imagens do blog** — Doug refazendo imagem a imagem (checklist na seção 5)
- [ ] **Link CETESB** (artigo de amianto) — candidato encontrado (`sistemasinter02.cetesb.sp.gov.br/consultaLicenciamento/public/`, consulta por CNPJ/razão social), mas precisa Doug testar com um CNPJ real antes de linkar — essa mesma URL já foi descartada uma vez em 23/07 por parecer ser só pra outro tipo de licenciamento
- [ ] **3 peças visuais sugeridas** (infográfico 3m³x4m³x5m³, mockup CTR/NF, checklist de reforma) — backlog sem urgência
- [ ] **llms-full.txt** — não auditado nesta rodada, provavelmente desatualizado

---

## 10. DOCUMENTOS ANTERIORES — O QUE FAZER COM ELES

Este documento substitui os 4 abaixo. Depois de conferir que está tudo aqui, apague-os do projeto (arquivo de projeto é só leitura pro Claude — precisa ser você, na interface):
- `MASTER_CONTEXT_PADRAO_CACAMBA.md`
- `CONTEXTO_MESTRE_PADRAO_CACAMBA_v2.docx`
- `CONTEXTO_NOVO_CHAT_PADRAO_CACAMBA.md`
- `CONTEXTO_NOVO_CHAT_PADRAO_CACAMBA_v3.md`

Mantenha separado — são projetos distintos, não fazem parte deste:
- `DOCUMENTO_MESTRE_Biblioteca_Tecnica_Padrao_Cacamba` — projeto próprio de referência técnica sobre regulamentação de resíduos
- `claude_analise-gsc-2026-09.md`, `claude_propostas-titulo-meta.md`, `claude_diffs-titulo-meta.md` — trabalho pontual de otimização de título/meta baseado em GSC; histórico útil, não é contexto estrutural

---

*Documento gerado em 11/09/2026 a partir de auditoria real do repositório GitHub (não de memória de conversas antigas). Pra atualizar: abra um chat neste mesmo Projeto, referencie este arquivo, peça pra revisar contra o estado real do repo antes de editar qualquer coisa.*
