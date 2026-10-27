/**
 * Configuração comercial da página. Todos os valores vêm de variáveis de
 * ambiente (veja `.env.example`) para que preço, checkout e políticas possam
 * ser definidos sem alterar o código. Nada aqui tem valor inventado: campos
 * vazios simplesmente não são exibidos.
 */
const env = (value: string | undefined) => value?.trim() ?? "";

export const siteConfig = {
  name: "A Última Queda",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  description:
    "Um treinamento de 30 aulas sobre autoconhecimento, gatilhos, hábitos, disciplina e autogoverno para homens que querem abandonar o consumo compulsivo de pornografia.",

  checkoutUrl: env(process.env.NEXT_PUBLIC_CHECKOUT_URL),
  price: env(process.env.NEXT_PUBLIC_PRICE),
  priceNote: env(process.env.NEXT_PUBLIC_PRICE_NOTE),

  accessInfo: env(process.env.NEXT_PUBLIC_ACCESS_INFO),
  refundPolicy: env(process.env.NEXT_PUBLIC_REFUND_POLICY),

  termsUrl: env(process.env.NEXT_PUBLIC_TERMS_URL),
  privacyUrl: env(process.env.NEXT_PUBLIC_PRIVACY_URL),
  contactEmail: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
} as const;

/** Destino dos CTAs de compra: o checkout, ou a seção de oferta enquanto ele não existir. */
export const checkoutHref = siteConfig.checkoutUrl || "#oferta";
