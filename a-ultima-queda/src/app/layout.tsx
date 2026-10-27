import type { Metadata, Viewport } from "next";
import { Anton, Old_Standard_TT, Source_Serif_4 } from "next/font/google";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const oldStandard = Old_Standard_TT({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-old-standard",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-source-serif",
});

const title = "A Última Queda — Retome o controle";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title,
    description: "A liberdade começa quando você para de negociar consigo mesmo.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "A Última Queda — Retome o controle" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "A liberdade começa quando você para de negociar consigo mesmo.",
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${oldStandard.variable} ${sourceSerif.variable}`}>
      <body>
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
        <div aria-hidden className="grain fixed inset-0 z-50 opacity-[0.08]" />
      </body>
    </html>
  );
}
