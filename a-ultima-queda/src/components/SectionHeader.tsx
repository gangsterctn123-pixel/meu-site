interface SectionHeaderProps {
  numeral: string;
  label: string;
  aside?: string;
  dark?: boolean;
}

/** Cabeçalho editorial de seção: numeração romana, rubrica e fio duplo. */
export function SectionHeader({ numeral, label, aside, dark = false }: SectionHeaderProps) {
  const tone = dark ? "border-white/70 text-white/80" : "border-ink text-ink";
  return (
    <div className={`flex items-end justify-between gap-6 border-b pb-2 ${tone}`}>
      <p className="kicker">
        <span className="text-red">{numeral}</span>
        <span className="mx-2 opacity-50">/</span>
        {label}
      </p>
      {aside ? <p className="kicker hidden opacity-70 sm:block">{aside}</p> : null}
    </div>
  );
}
