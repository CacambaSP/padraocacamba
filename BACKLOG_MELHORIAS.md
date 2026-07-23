# BACKLOG DE MELHORIAS — Blog Padrão Caçamba
**Não editar sitemap/páginas a partir deste arquivo — é só registro de pendências.**
Última atualização: 23/07/2026

---

## Imagens inline nos artigos do blog

**Status:** pendente, afeta os 11 artigos (não só os 4 reescritos em 23/07)

Nenhum artigo do blog tem imagem inline no meio do texto — todos têm apenas banner (topo, compartilhado) + 1 imagem de capa (hero). Isso contraria a meta original do `PROMPT_BLOG_PADRAO_CACAMBA.md` ("1 imagem hero + 1-2 imagens inline", "1 imagem por 500 palavras").

Decisão pendente: tratar como iniciativa própria (11 artigos) ou deixar como está até revisão geral do blog.

---

## Peças visuais sugeridas por revisão externa (23/07/2026)

Nenhuma urgente — juntar numa rodada de produção de imagem via Firefly/Gemini quando fizer sentido:

- [ ] Infográfico comparativo de dimensões 3m³ vs 4m³ vs 5m³ (sugerido para `/artigos/por-que-4m3-padrao`)
- [ ] Mockup ilustrativo de CTR e Nota Fiscal com dados fictícios (sugerido para `/artigos/ctr-nf-empresa-verdade`)
- [ ] Checklist de reforma em formato lista/PDF pra impressão (sugerido para `/artigos/como-reformar-apartamento`)

---

## Links pendentes de verificação

- [ ] Link direto pra ferramenta de consulta de empresas licenciadas na CETESB (sugerido para `/artigos/amianto-descarte-seguro`). Tentei encontrar a URL certa em 23/07/2026 — a ferramenta pública que localizei (`sistemasinter02.cetesb.sp.gov.br/consultaLicenciamento`) é para outro tipo de licenciamento (supressão de árvore, movimentação de solo), não para verificar licença de transportador/destinador de resíduos Classe I. Não linkar até confirmar a URL certa.

---

## Página hub sugerida (revisão externa, antes do item 3 do blog) — CONCLUÍDO 23/07/2026

- [x] ~~`/o-que-nao-pode-ir-na-cacamba` — página explicando por que amianto, tinta, solvente, bateria, resíduo hospitalar exigem destinação específica~~ — criada 23/07/2026, com 8 materiais (amianto, tintas/químicos, pilhas, resíduo hospitalar, pneus, eletrônicos, lixo doméstico, líquidos), FAQ, PC funcional, linkada do artigo de amianto e de /cacamba-de-entulho, no sitemap/llms

- [ ] Gerar banner dedicado (hoje usa o banner genérico)

---

## Páginas hub de termo genérico (criadas 23/07/2026)

Criadas com base em dados reais do GSC (cacambasp.com.br): `/cacamba-de-entulho`, `/aluguel-de-cacamba`, `/locacao-de-cacamba`.

- [x] ~~Gerar banner dedicado para cada uma das 3 páginas hub~~ — feito 23/07/2026
- [x] ~~Linkar as 3 páginas hub a partir da home e/ou do `/precos`~~ — feito 23/07/2026 (nova seção na home + bloco de links no /precos)

---

## Fonte pequena — família de template Bebas Neue + Space Mono (RESOLVIDO 23/07/2026)

Em 23/07/2026, Doug sinalizou que `/precos` parecia com letra menor que as demais páginas. Confirmado: toda a família de template Bebas Neue + Space Mono tinha texto de corpo em 12-14px, abaixo do padrão de 16px mínimo do site. Revisão completa do site (67 páginas) feita — corrigido em 15 páginas ao todo:
- `/precos`, `/cacamba-de-entulho`, `/aluguel-de-cacamba`, `/locacao-de-cacamba`
- `/barueri`, `/carapicuiba`, `/cotia`, `/guarulhos`, `/osasco`
- `/zona-sul`, `/zona-oeste`, `/zona-norte`, `/zona-leste`, `/centro-sp`, `/grande-sp`

Demais páginas com texto pequeno (antifraude, index, locar, artigos) foram checadas e confirmadas como rótulos/badges/notas secundárias intencionais, não bug — não mexidas.
