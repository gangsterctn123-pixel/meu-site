/**
 * Tarja vermelha sobre os olhos, recriando a da referência: texto branco
 * condensado que "vaza" acima e abaixo da faixa, e a mesma palavra em preto
 * recortada dentro dela. Em SVG para que a largura do texto (textLength) fique
 * exata em qualquer tela, sem depender das métricas da fonte carregada.
 */
export function Tarja({ text, className = "" }: { text: string; className?: string }) {
  const label = text.toUpperCase();
  const textProps = {
    x: 20,
    y: 125,
    textLength: 960,
    lengthAdjust: "spacingAndGlyphs" as const,
    style: { fontFamily: "var(--font-anton), Impact, sans-serif", fontSize: 128 },
  };

  return (
    <svg viewBox="0 0 1000 140" role="img" aria-label={text} className={`block h-auto w-full overflow-visible ${className}`}>
      <defs>
        <clipPath id="tarja-faixa">
          <rect x="0" y="38" width="1000" height="64" />
        </clipPath>
        <pattern id="tarja-scan" width="14" height="64" patternUnits="userSpaceOnUse">
          <rect width="5" height="64" fill="#000" opacity="0.16" />
        </pattern>
      </defs>
      <text {...textProps} fill="#fff" opacity="0.96">
        {label}
      </text>
      <rect x="0" y="38" width="1000" height="64" fill="var(--color-red-tarja)" />
      <rect x="0" y="38" width="1000" height="64" fill="url(#tarja-scan)" />
      <g clipPath="url(#tarja-faixa)">
        <text {...textProps} x={24} fill="#4a0003" opacity="0.7">
          {label}
        </text>
        <text {...textProps} fill="#0b0b0b">
          {label}
        </text>
      </g>
    </svg>
  );
}
