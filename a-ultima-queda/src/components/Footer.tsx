import { siteConfig } from "@/lib/config";
import { footer } from "@/lib/content";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className = "kicker text-white/75 transition-colors hover:text-white";
  // Links ainda não configurados aparecem como texto, nunca como link quebrado.
  return href ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <span className="kicker text-white/40">{children}</span>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night pt-16 pb-24 text-white sm:pb-12">
      <div aria-hidden className="grain absolute inset-0 opacity-[0.18] invert" />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="rule-double border-white! after:border-white!" />
        <p aria-hidden className="display mt-6 text-[calc((100vw-2rem)/6.25)] leading-[0.85] text-white xl:text-[13.4rem]">
          A ÚLTIMA QUEDA
        </p>
        <div className="mt-6 grid gap-8 border-t border-white/30 pt-8 md:grid-cols-12">
          <p className="font-serif text-2xl italic md:col-span-5">{footer.phrase}</p>
          <nav aria-label="Rodapé" className="md:col-span-7">
            <ul className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
              <li>
                <FooterLink href={siteConfig.termsUrl}>Termos de uso</FooterLink>
              </li>
              <li>
                <FooterLink href={siteConfig.privacyUrl}>Política de privacidade</FooterLink>
              </li>
              <li>
                <FooterLink href={siteConfig.contactEmail ? `mailto:${siteConfig.contactEmail}` : ""}>Contato</FooterLink>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-10 max-w-3xl border-l-2 border-red pl-4 font-serif text-sm leading-relaxed text-white/65">{footer.notice}</p>
        <p className="kicker mt-8 text-white/40">
          © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
