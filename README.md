# Matuto's Grill - Churrasco Grego

Site institucional de uma página para o Matuto's Grill (Caruaru - PE), construído como
projeto React independente a partir das informações públicas da ficha do restaurante no
Google Maps (avaliações, cardápio, endereço, horário e contato).

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (tema configurado em `src/index.css`)
- [Heroicons](https://heroicons.com)

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
  components/   # Uma seção da página por componente (Hero, Cardápio, Avaliações, Mapa...)
  data/         # Todo o conteúdo textual (dados do restaurante, cardápio, avaliações)
  hooks/        # useReveal — animação de entrada ao rolar a página
```

## Conteúdo

Todos os textos (avaliações, destaques do cardápio, endereço, telefone, horário e opções
de atendimento) foram extraídos da ficha pública do Matuto's Grill no Google Maps. O mapa
da seção "Localização" usa o embed público do Google Maps a partir do endereço do
restaurante — não requer chave de API. As fotos reais do local não estavam disponíveis
para este projeto; a seção "Fotos e vídeos" usa cartões ilustrativos por categoria em vez
de fotografias.
