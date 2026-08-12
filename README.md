# Dropthree — Site institucional (V2)

Site institucional em HTML, CSS e JavaScript puros (sem build, sem dependências, sem frameworks).

## Estrutura

```
.
├── index.html
├── forge.html
├── termos.html
├── privacidade.html
├── 404.html
├── styles.css
├── script.js
├── favicon.svg
├── favicon-32.png
└── og-image.png
```

## Rodar localmente

Não precisa de instalação nem build. Basta abrir `index.html` no navegador,
ou servir a pasta com qualquer servidor estático:

```bash
npx serve .
```

## Publicar no GitHub Pages

1. Suba os três arquivos para a raiz do repositório.
2. Em **Settings → Pages**, selecione a branch `main` e a pasta `/root`.
3. O site fica disponível em `https://<usuario>.github.io/<repositorio>/`.

## Versionamento

- **v2.0** — site institucional base
- **v2.1** — adição do Idea Hub (placeholder de conteúdo)
- **v2.2** — adição da barra de métricas no Hero
- **v2.3** — navegação redesenhada: indicador deslizante, estado ativo por
  seção (scroll-spy), micro-interação no logo, nav compacta ao rolar
- **v2.4** — elemento visual do Hero trocado: era um gráfico de linhas
  genérico, agora é o próprio símbolo da marca (os três quadrados) se
  desenhando e se conectando; também reposicionado para não colidir com o
  headline em telas médias, e oculto em telas pequenas
- **v2.5** — cursor customizado: um ponto acompanha o mouse instantaneamente,
  um anel persegue com atraso suave, e o anel cresce ao passar sobre links
  e botões. Só ativa em dispositivos com mouse de verdade — em touch
  (celular/tablet) o cursor padrão continua normal.
- **v2.6** — contatos reais: e-mail (`dropthree3@gmail.com`) e Instagram
  (`instagram.com/dropthree3`) atualizados no botão "Vamos conversar" e
  no rodapé.
- **v2.7** — SEO e Open Graph: favicon com o símbolo da marca (SVG +
  fallback PNG), imagem de compartilhamento 1200×630 (`og-image.png`),
  meta tags de Open Graph e Twitter Card, e dados estruturados
  Schema.org (Organization) para buscadores.
- **v2.8** — páginas de Termos de Uso (`termos.html`) e Política de
  Privacidade (`privacidade.html`), com conteúdo real (não lorem ipsum),
  já cobrindo LGPD, e linkadas no rodapé de todas as páginas.
- **v2.9** — faixa de stack tecnológico entre Soluções e Produtos: um
  marquee contínuo (pausa ao passar o mouse) com as ferramentas reais
  usadas — não é lista de linguagem tipo currículo, é vitrine de
  capacidade técnica.
- **v2.10** — formulário de contato real (nome, e-mail, mensagem) na seção
  Contato. Sem backend: ao enviar, monta um `mailto:` com os dados já
  preenchidos e abre o app de e-mail do visitante. Isso é avisado com
  transparência logo abaixo do formulário.
- **v2.11** — command palette (Ctrl/Cmd K): busca rápida com navegação por
  teclado, atalhos para todas as seções, abrir Lumi/Code Bridge, copiar
  e-mail e ir para Instagram/Termos/Privacidade. Trigger visível na nav
  em todas as páginas.
- **v2.12** — headline do Hero com efeito de decodificação (scramble):
  o texto "se resolve" caractere por caractere ao carregar a página.
- **v2.13** — cards de Lumi e Code Bridge com tilt 3D sutil, seguindo o
  mouse (só em dispositivos com ponteiro fino).
- **v2.14** — botões com efeito magnético: puxam levemente na direção
  do cursor antes do clique.
- **v2.15** — easter egg no console do navegador — quem abre o DevTools
  encontra uma mensagem estilizada com a marca.
- **v2.16** — barra de progresso de leitura no topo, em gradiente,
  preenchendo conforme a rolagem da página.
- **v2.17** — grid de fundo tipo blueprint no Hero, sutil e com deriva
  lenta, mascarado para não competir com o texto.

Todos os efeitos de movimento (v2.12 a v2.17) respeitam
`prefers-reduced-motion` e os que dependem de mouse (tilt, magnético)
só ativam em dispositivos com ponteiro fino — em touch, tudo continua
normal e leve.

- **v2.18** — nova página **Forge** (`forge.html`), acessível pelo menu
  principal em todas as páginas. Apresenta o futuro ecossistema de
  aprendizagem da Dropthree (cursos gratuitos, workshops, mentorias,
  artigos, projetos práticos, lives, trilhas de estudo e comunidade),
  com seção dedicada ao papel da comunidade a longo prazo e formulário
  de "quero ser avisado". Usa 100% o mesmo design system do site
  principal — nenhuma identidade visual nova.
- **v2.19** — teaser do Forge na home (entre Idea Hub e Fundadores):
  título, subtítulo, texto de apresentação e botão "Conhecer o Forge",
  funcionando como introdução ao projeto para quem ainda não conhece.
- **v2.20** — expansão de conteúdo da página Forge:
  - **Ideias que inspiram**: carrossel automático (pausa no hover) com
    10 citações reais e corretamente atribuídas de pensadores liberais
    clássicos e contemporâneos (Locke, Smith, Franklin, Bastiat,
    Tocqueville, Mises, Hayek, Friedman, Sowell, Rand), cada uma com
    obra/ano e uma reflexão conectando a ideia à filosofia do Forge.
  - **O que você encontrará no Forge**: lista completa de conteúdos
    (12 formatos) e cinco áreas de conhecimento detalhadas (Tecnologia,
    Produto e Design, Negócios e Gestão, Economia e Investimentos,
    Desenvolvimento Pessoal), em tags organizadas por categoria.
  - **Aprenda com quem constrói**: seção sobre o conteúdo ser produzido
    por profissionais da Dropthree e especialistas convidados.
  - **Comunidade e novos talentos**: texto atualizado, deixando claro
    que a Forge não é uma página de recrutamento disfarçada.
  - **Estado atual**: mensagem final de fechamento, reforçando que a
    plataforma ainda está em construção.

## O que mudou da V1 para a V2

- Arquitetura de marca: Dropthree como empresa-mãe, com Lumi e Code Bridge
  como produtos do ecossistema (seção "Produtos" com dois cards, cada um
  com identidade visual própria).
- Nova identidade institucional: grafite/preto neutro (`#0A0A0C` / `#141417`),
  com o gradiente navy → azure → teal usado apenas como acento (linhas do
  hero, timeline, botão primário) — nunca como fundo de página, para não
  competir com a identidade visual dos produtos.
- Novas seções: Como trabalhamos (método), Soluções, Foundation, Idea Hub
  (placeholder de conteúdo), Fundadores.
- Barra de métricas no Hero (produtos no ecossistema, sócios fundadores,
  anos de régua de decisão).
- Tipografia: Syne (títulos), DM Sans (corpo), DM Mono (labels), via Google Fonts.

## Pendências

- **Importante:** as tags `og:image` e `twitter:image` em `index.html`
  apontam para `og-image.png` como caminho relativo. Facebook, Instagram,
  LinkedIn e Twitter exigem **URL absoluta** para buscar a imagem
  corretamente. Assim que o site estiver publicado (ex: GitHub Pages),
  troque para `https://<seu-dominio>/og-image.png` nas duas tags.
- Link do LinkedIn no rodapé ainda é `#` — assim que tiver a página, troque
  em `index.html` (busque por `href="#"`, é a única ocorrência restante).
- Formulário de contato usa `mailto:` (sem backend) — se no futuro quiser
  envio de verdade sem abrir o app de e-mail, dá pra trocar por um serviço
  tipo Formspree ou Web3Forms, bastando criar conta gratuita e trocar a
  lógica de `submit` em `script.js`.
- Idea Hub está em modo placeholder — quando o blog tiver conteúdo real,
  substituir os três cards "Em breve" por posts de verdade.
- Números da barra de métricas são estruturais (produtos, sócios, anos) —
  se algum dia quiser trocar por métricas de negócio (usuários, receita,
  clientes), é só editar os `<span class="stat__num">` no `index.html`.
- Próximas adições possíveis: stack tecnológico, rodapé com Termos/Privacidade
  + SEO/favicon/Open Graph, formulário de contato real, seção de
  casos/portfólio.
- **Citações do carrossel "Ideias que inspiram"** (Locke, Smith, Franklin,
  Bastiat, Tocqueville, Mises, Hayek, Friedman, Sowell, Rand): usei traduções
  correntes e verifiquei a atribuição de cada uma, mas como são traduções
  livres para português, vale conferir contra a edição/tradução oficial que
  vocês preferirem antes de publicar, especialmente as mais recentes
  (Mises, Hayek, Friedman, Sowell, Rand), cujas obras originais ainda estão
  em copyright.
- Domínio oficial é `dropthree.xyz` — quando publicar lá, atualizar as tags
  `og:image`/`twitter:image` em todas as páginas (`index.html`, `forge.html`,
  `termos.html`, `privacidade.html`) para URL absoluta
  (`https://dropthree.xyz/og-image.png`).

## v2.21 — Seção Infraestrutura (home)

Adicionada **exclusivamente** entre Produtos e Foundation, sem alterar
nenhuma linha de código existente (confirmado por diff antes da entrega —
Produtos, Soluções e todo o restante do site permanecem byte a byte
idênticos à v2.20).

- Título/headline: "A tecnologia não termina no software."
- Descrição institucional + 10 cards de atuação (Redes Corporativas,
  Cabeamento Estruturado, Infraestrutura de TI, Servidores e Storage,
  Wi-Fi Corporativo, CFTV Inteligente, Controle de Acesso, Segurança de
  Redes, Cloud e Infraestrutura Híbrida, Manutenção e Suporte Especializado)
- Slogan de fechamento: "Do software à infraestrutura, construímos
  tecnologia para problemas reais."
- CSS totalmente novo e isolado (`.infra*`) — não reutiliza nem modifica
  nenhuma classe usada por outras seções, para garantir zero risco a
  qualquer componente já existente.

## v2.22 — Integração e melhoria visual da seção Infraestrutura

- **"Serviços"** adicionado à navegação principal (logo após Produtos) em
  **todas** as páginas, no rodapé e no command palette — antes a seção
  só existia solta na home, sem nenhum acesso via menu.
- **Ícone monoline em cada um dos 10 cards**, desenhado à mão em SVG
  (rede, cabeamento, servidor, wi-fi, câmera, chave, escudo, nuvem,
  chave-de-fenda), na cor de acento — quebra a monotonia visual de
  10 cards só com texto.
- **Hover nos cards**: borda vira cor de acento + leve elevação, mesma
  linguagem de interação do resto do site.
- **Slogan de fechamento** ganhou uma linha divisória (mesmo padrão do
  bloco de Propósito), separando melhor da seção anterior.
- **CTA de WhatsApp** no final da seção: "(21) 97165-5537", botão verde
  característico do WhatsApp, com mensagem pré-preenchida
  ("Olá! Quero saber mais sobre infraestrutura de TI com a Dropthree.").

## v2.23 — Refinamento visual completo da seção Infraestrutura

- **Card em destaque**: "Cloud e Infraestrutura Híbrida" ganhou um bloco
  próprio, maior, com borda de acento e fundo em gradiente sutil —
  apresentado como a frente mais estratégica, antes das categorias.
- **Cards agrupados em 4 categorias**: Redes & Conectividade, Cloud &
  Servidores, Segurança e Suporte — mais fácil de escanear do que uma
  grade plana de 10 itens iguais.
- **Selo/badge visual em cada ícone**: um quadrado com borda ao redor do
  ícone (ecoa o símbolo da marca) em vez do ícone solto.
- **Textura de fundo sutil**: grade de pontos mascarada no canto superior
  direito da seção, dando textura própria sem competir com o conteúdo.
- **CTA final com mais peso**: rótulo "PRECISA DE AJUDA?", leve glow em
  volta do bloco inteiro (na cor de acento).

## v2.24 — Auditoria de acessibilidade e performance

**Contraste de cores** — verifiquei todos os principais pares texto/fundo
do site contra WCAG AA. Todos passaram (mínimo 4.5:1 para texto normal,
o pior caso foi 5.25:1).

**Acessibilidade — problemas encontrados e corrigidos:**
- Campo de busca do command palette não tinha rótulo acessível (só
  placeholder) — adicionado `aria-label`.
- 22 SVGs decorativos (ícones em botões e cards) não tinham
  `aria-hidden="true"` — corrigido em todas as páginas.
- Command palette não tinha semântica de lista navegável para leitor de
  tela — adicionado `role="listbox"`/`role="option"`/`aria-selected"` e
  `role="combobox"` no campo de busca, com `aria-activedescendant`
  sincronizado à navegação por teclado.
- Mensagem de confirmação ("e-mail copiado") não era anunciada por
  leitor de tela — adicionado `aria-live="polite"`.
- Hierarquia de headings (h1→h2→h3→h4) conferida em todas as páginas:
  sem saltos, estrutura correta.

**Performance — problemas encontrados e corrigidos:**
- O anel do cursor customizado rodava um loop de animação **infinito**
  (60x/segundo), mesmo com o mouse parado ou a aba em segundo plano —
  agora o loop só roda enquanto há movimento de fato, e para sozinho
  quando o cursor se estabiliza.
- **Bug real de fonte**: a citação em itálico (Forge) usa DM Sans
  itálico peso 500, mas só estava carregado o itálico peso 400 — a
  fonte exibida nunca era a correta. Corrigido no carregamento do
  Google Fonts.
- Removidos pesos de fonte carregados e nunca usados (DM Sans 700
  normal, DM Sans itálico 400, DM Mono 500) — de 10 variantes de fonte
  para 8.
- `og-image.png` reduzido de 138KB para 46KB (paleta de 64 cores, sem
  perda visível de qualidade) — mais rápido pra carregar quando alguém
  compartilha o link.

## v2.25 — Infraestrutura reconstruída (versão enxuta)

Reavaliação honesta: a versão v2.23 empilhava card em destaque +
categorias + selo de ícone + textura de fundo — três camadas de
hierarquia visual numa seção só, mais denso que qualquer outra parte
do site. A instrução original pedia pra seguir o mesmo padrão de
Soluções, e isso nunca tinha sido feito de verdade.

- Estrutura reconstruída espelhando exatamente `.solucao` (tag em mono +
  título + descrição, separados por linha fina) — mesmo padrão visual
  de Soluções, agora sim.
- Removidos: card em destaque, categorias com subtítulo, selo/badge nos
  ícones, textura de fundo. CSS antigo inteiro substituído (isolado,
  nada fora da seção foi tocado).
- **CTA final trocado de WhatsApp para e-mail**: "Entrar em contato por
  e-mail", abrindo `dropthree3@gmail.com` com assunto e mensagem
  pré-preenchidos.

## v2.26 — Auditoria visual: ritmo de fundo corrigido

Renderizei o site inteiro (desktop e mobile) e cruzei com o código pra
identificar problemas reais, não achismo. Achado principal: o ritmo de
alternância clara/escura entre seções — que era intencional desde a v2.0 —
tinha se perdido ao longo de várias versões de adição de conteúdo.
Sequência antiga (Produtos→Infra→Foundation→IdeaHub→ForgeTeaser→
Fundadores): três seções seguidas no mesmo tom, depois duas elevadas
seguidas. Corrigido para alternar de verdade: elevated / base / elevated
/ base / elevated / base.

**Observado mas não alterado ainda (aguardando decisão):**
- Idea Hub e Forge Teaser ficam adjacentes e comunicam mensagem parecida
  ("em breve, tem coisa boa vindo") — pode reordenar ou diferenciar mais.
- 4 CTAs distintos na segunda metade da página (Idea Hub, Forge Teaser,
  Infraestrutura, Contato) — pode diluir o peso do CTA final.

## v2.27 — Idea Hub e Forge Teaser mesclados

Decisão: juntar os dois em uma seção só (os CTAs foram mantidos como
estavam — decisão de manter todos).

- Seção "Idea Hub" removida como seção independente; seus três cards
  "Em breve" (Produto & Design, Engenharia & IA aplicada, Cultura &
  Método) viraram uma prévia dentro da própria seção **Forge Teaser**.
- Um único CTA agora: "Conhecer o Forge" (o link "Fale com a gente" do
  Idea Hub foi absorvido pela fusão, não removido por decisão separada).
- Link "Idea Hub" removido da navegação e do command palette (a seção
  não existe mais isoladamente).
- Ritmo de fundo reajustado de novo por causa da seção removida:
  Produtos(elevated) → Serviços(base) → Foundation(elevated) →
  Forge Teaser(base) → Fundadores(elevated) → Contato(base) — alternância
  perfeita.
- CSS órfão do Idea Hub removido; `.hub__grid`/`.hub-card` (ainda usados
  no Forge Teaser e na página Forge) foram preservados e re-documentados.

## v2.28 — Favicon redesenhado + limpeza de código

**Favicon**: testei o design anterior no tamanho real (16px, como aparece
de fato na aba do navegador) e encontrei dois problemas: o fundo quase
preto podia sumir em navegadores com aba escura, e ter uma cor diferente
num dos três quadrados (o teal) perdia definição nesse tamanho. Redesenhei
com fundo no gradiente da marca (navy→azure→teal) e os três quadrados
sólidos em branco — mais contraste, visível em qualquer tema de navegador.

**Auditoria de código**: varri as 4 páginas em busca de classes órfãs
(CSS sem uso e HTML sem estilo correspondente). Achado real: uma linha de
CSS (`.forge__pillars`) sobrando de uma versão antiga da página Forge que
já tinha sido reescrita — removida.

## v2.29 — Bug de rolagem corrigido + polimento

**Bug real corrigido**: nenhum link do site (menu, rodapé, command
palette) compensava a altura da nav fixa ao rolar até uma seção — o
título de cada seção ficava parcialmente escondido atrás da barra depois
do clique. Adicionado `scroll-padding-top` no `html`, resolve para todos
os casos de uma vez (CSS smooth scroll e `scrollIntoView` via JS).

**Melhorias visuais:**
- Números da barra de estatísticas do Hero (02 / 03 / 20) agora **contam
  animados** de 0 até o valor final quando a seção entra em tela, em vez
  de aparecer estático.
- Scrollbar customizada (fina, na paleta do site) e cor de seleção de
  texto na cor de acento — detalhes que somam na sensação de acabamento.
- **Página 404 personalizada** (`404.html`), no mesmo design system,
  essencial para quando publicar no GitHub Pages (hoje um link quebrado
  cairia na página de erro genérica do navegador).

## v2.30 — Correção visual na lista de Infraestrutura (reportado com print real)

A screenshot mostrou os itens da lista (Redes Corporativas, Cabeamento
Estruturado etc.) grudados uns nos outros, sem separação visível, e a
tag de categoria (REDE/SEGURANÇA/INFRAESTRUTURA) sem destaque — a causa
era a linha divisória usar uma opacidade baixa demais
(`rgba(255,255,255,.09)`) para ser percebida contra o fundo escuro.

- Linha divisória entre itens escurecida para `rgba(255,255,255,.16)` —
  quase o dobro de opacidade, agora perceptível.
- Tag de categoria ganhou peso (`font-weight:500`) e
  `text-transform:uppercase` garantido via CSS.
- Espaçamento entre tag/título/descrição na versão empilhada (telas
  menores) ajustado para não parecer bloco único de texto.
