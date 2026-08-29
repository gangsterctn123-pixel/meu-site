# 25 Fichas de Exercícios para Glúteos com Elástico Mini Band

Reprodução da landing page de vendas (`fichas-exercicios-elastico`), construída como um
projeto React independente, pronto para produção.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (tema configurado em `src/index.css`)
- [Heroicons](https://heroicons.com) (mesmos ícones usados na página original)

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`. Para pré-visualizar o build:

```bash
npm run preview
```

## Estrutura

```
src/
  components/   # Uma seção da página por componente
  data/         # Todo o conteúdo textual (copy, depoimentos, FAQ, bônus, preços)
  hooks/        # useReveal — animação de entrada ao rolar a página
```

Cada `<section>` alterna automaticamente entre fundo escuro e claro (via CSS
`nth-of-type(odd/even)` em `src/index.css`), igual ao comportamento da página original.

## Sobre a fidelidade visual

O layout, hierarquia, espaçamentos, tipografia, paleta de cores (rosa-magenta `#c2265f`,
bordô `#23081a`/`#5a1030`, CTA verde `#30bf00`), ícones, textos, cards, sombras, bordas,
animações (scroll reveal, "shaker" no botão de compra, pulse no selo de desconto), o
acordeão de FAQ e a responsividade mobile/desktop foram reproduzidos com base em capturas
de tela da página original.

As imagens reais do produto (mosaico de fichas, fotos dos bônus e prints de depoimentos)
não estavam disponíveis para este projeto, então essas áreas foram recriadas como
componentes visuais (`FichaMock`, `BonusVisual`, cards de depoimento em HTML/CSS) que
preservam a composição, proporção e paleta de cada seção. Para 100% de fidelidade
fotográfica, substitua esses componentes pelas imagens reais em `src/components/` e
`src/data/content.ts`.
