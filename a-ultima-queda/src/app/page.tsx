import { Confronto } from "@/components/Confronto";
import { Conteudo } from "@/components/Conteudo";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Metodo } from "@/components/Metodo";
import { MotionProvider } from "@/components/MotionProvider";
import { Oferta } from "@/components/Oferta";
import { StickyCta } from "@/components/StickyCta";
import { siteConfig } from "@/lib/config";
import { faq } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "pt-BR",
      url: siteConfig.url,
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <MotionProvider>
      <Hero />
      <main id="conteudo-principal">
        <Confronto />
        <Metodo />
        <Conteudo />
        <Manifesto />
        <Oferta />
        <Faq />
      </main>
      <Footer />
      <StickyCta label="Começar minha transformação" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </MotionProvider>
  );
}
