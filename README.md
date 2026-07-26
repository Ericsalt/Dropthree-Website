# Dropthree — Site institucional (V2)

Site institucional em HTML, CSS e JavaScript puros (sem build, sem dependências, sem frameworks).

## Estrutura

```
.
├── index.html
├── termos.html
├── privacidade.html
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
