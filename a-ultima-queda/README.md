# A Última Queda — Landing page

Página de vendas cinematográfica/editorial do treinamento **A Última Queda**.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · `next/font` (Anton, Old Standard TT, Source Serif 4).

## Rodar

```bash
cd a-ultima-queda
npm install
cp .env.example .env.local   # preencha checkout, preço etc.
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

## Configuração comercial (sem valores inventados)

Tudo em variáveis de ambiente (`.env.example`), lidas em `src/lib/config.ts`:

| Variável | Efeito |
| --- | --- |
| `NEXT_PUBLIC_CHECKOUT_URL` | Destino do botão da oferta. Vazio → o botão leva para `#oferta`. |
| `NEXT_PUBLIC_PRICE` / `NEXT_PUBLIC_PRICE_NOTE` | Preço exibido na oferta. Vazio → texto "O valor é exibido na página de pagamento". |
| `NEXT_PUBLIC_ACCESS_INFO` | Complementa a resposta "Como funciona o acesso" e aparece na oferta. |
| `NEXT_PUBLIC_REFUND_POLICY` | Adiciona a pergunta de reembolso ao FAQ e uma linha na oferta. |
| `NEXT_PUBLIC_TERMS_URL`, `NEXT_PUBLIC_PRIVACY_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` | Links do rodapé. Vazios → aparecem como texto, sem link quebrado. |
| `NEXT_PUBLIC_SITE_URL` | URL pública, usada nos metadados Open Graph. |

Como são `NEXT_PUBLIC_*`, refaça o build depois de alterá-las.

## Estrutura

```
src/app/            layout (fontes, SEO, OG), page, globals.css (tokens e texturas)
src/components/     uma seção por arquivo + Tarja, CtaButton, Reveal, StickyCta
src/lib/content.ts  todo o texto da página
src/lib/config.ts   configuração comercial
public/images/      fotos tratadas (webp) e imagem de compartilhamento (og.jpg)
```

## Imagens

`hero.webp` é a fotografia de referência sem o título original e sem a tarja
"JUST DO IT" (a região dos olhos recebeu um desfoque e fica sob a tarja
"RETOME O CONTROLE", feita em SVG/CSS e posicionada por porcentagem — por isso
continua alinhada aos olhos em qualquer largura). As demais imagens são recortes
da mesma foto. Para trocar a foto, mantenha a proporção ou ajuste `EYE_LINE` em
`src/components/Hero.tsx`.

## Deploy

Este app fica em uma subpasta do repositório para não afetar o site existente
na raiz. Na Netlify/Vercel, defina o diretório base como `a-ultima-queda`.
