interface FichaMockProps {
  number: number;
  category: string;
  name: string;
  className?: string;
}

export function FichaMock({ number, category, name, className = "" }: FichaMockProps) {
  return (
    <div
      className={`relative flex w-full overflow-hidden rounded-lg border border-primary/20 bg-white shadow-md ${className}`}
    >
      <div className="flex w-6 shrink-0 items-center justify-center bg-primary/90">
        <span className="rotate-180 whitespace-nowrap text-[9px] font-bold tracking-wide text-white [writing-mode:vertical-rl]">
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-2.5">
        <div className="mb-1.5 flex items-center gap-2">
          <div className="rounded bg-primary px-1.5 py-0.5 text-center leading-none text-white">
            <div className="text-[8px] font-semibold">FICHA</div>
            <div className="text-xs font-extrabold">{String(number).padStart(2, "0")}</div>
          </div>
          <div className="text-[11px] font-extrabold uppercase leading-tight text-foreground">
            {name}
          </div>
        </div>
        <div className="mb-1.5 flex h-14 items-center justify-center rounded bg-surface">
          <svg viewBox="0 0 24 24" className="h-9 w-9 text-primary/40" fill="currentColor">
            <circle cx="12" cy="5" r="2.4" />
            <path d="M12 8c-2.4 0-4.3 1.6-4.8 3.8L6 16h2.2l1-4 1 8h2l.6-6 .6 6h2l1-8 1 4H20l-1.2-4.2C18.3 9.6 16.4 8 14 8h-2z" />
          </svg>
        </div>
        <div className="text-[7.5px] font-bold uppercase text-primary">Objetivo</div>
        <div className="mb-1 h-1 w-4/5 rounded-full bg-foreground/10" />
        <div className="text-[7.5px] font-bold uppercase text-primary">Músculos trabalhados</div>
        <div className="mt-0.5 flex gap-1">
          <span className="h-1.5 w-6 rounded-full bg-primary/30" />
          <span className="h-1.5 w-6 rounded-full bg-primary/20" />
        </div>
      </div>
    </div>
  );
}
