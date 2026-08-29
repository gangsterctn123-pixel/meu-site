import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { fichaLibrary } from "../data/content";

interface FichaMockProps {
  number: number;
  className?: string;
}

export function FichaMock({ number, className = "" }: FichaMockProps) {
  const f = fichaLibrary[number];
  if (!f) return null;

  return (
    <div
      className={`relative flex aspect-[3/4] w-full overflow-hidden rounded-md border border-primary/20 bg-white text-foreground shadow-md ${className}`}
    >
      <div className="flex w-[9%] shrink-0 items-center justify-center bg-primary">
        <span className="rotate-180 whitespace-nowrap text-[5px] font-bold tracking-wide text-white [writing-mode:vertical-rl]">
          {f.category}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start gap-1 p-1 pb-0.5">
          <div className="shrink-0 rounded bg-primary px-1 py-0.5 text-center leading-none text-white">
            <div className="text-[3.5px] font-semibold">FICHA</div>
            <div className="text-[7px] font-extrabold">{String(f.number).padStart(2, "0")}</div>
          </div>
          <div className="min-w-0">
            <div className="truncate text-[6px] font-extrabold uppercase leading-tight text-primary">
              {f.name}
            </div>
            <div className="truncate text-[3.5px] uppercase leading-tight text-foreground/45">
              {f.equipment}
            </div>
          </div>
        </div>

        <div className="flex gap-1 px-1">
          <div className="min-w-0 flex-1">
            <div className="text-[3.5px] font-bold uppercase text-primary">Objetivo</div>
            <div className="mb-1 line-clamp-2 text-[3.5px] leading-tight text-foreground/60">
              {f.objective}
            </div>
            <div className="text-[3.5px] font-bold uppercase text-primary">Músculos</div>
            <div className="flex flex-col gap-0.5">
              {f.muscles.map((m) => (
                <div key={m} className="flex items-center gap-0.5">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                  <span className="truncate text-[3.5px] leading-tight text-foreground/60">{m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex aspect-square w-[30%] shrink-0 items-center justify-center rounded bg-surface">
            <svg viewBox="0 0 24 24" className="h-3/5 w-3/5 text-primary/35" fill="currentColor">
              <circle cx="12" cy="5" r="2.4" />
              <path d="M12 8c-2.4 0-4.3 1.6-4.8 3.8L6 16h2.2l1-4 1 8h2l.6-6 .6 6h2l1-8 1 4H20l-1.2-4.2C18.3 9.6 16.4 8 14 8h-2z" />
            </svg>
          </div>
        </div>

        <div className="mx-1 my-1 border-t border-primary/20" />

        <div className="flex flex-1 gap-1 px-1">
          <div className="min-w-0 flex-1 space-y-[1px]">
            <div className="text-[3.5px] font-bold uppercase text-primary">Execução</div>
            {f.steps.map((s, i) => (
              <div key={s} className="flex items-start gap-[2px]">
                <span className="mt-[0.5px] flex h-[5px] w-[5px] shrink-0 items-center justify-center rounded-full bg-primary text-[2.5px] font-bold leading-none text-white">
                  {i + 1}
                </span>
                <span className="truncate text-[3px] leading-[4px] text-foreground/55">{s}</span>
              </div>
            ))}
          </div>
          <div className="w-[26%] shrink-0 space-y-[1px] text-[3px]">
            <div className="flex items-center justify-between rounded bg-surface px-[2px] py-[1px]">
              <span className="font-semibold text-foreground/50">SÉR</span>
              <span className="font-bold text-primary">{f.series}</span>
            </div>
            <div className="flex items-center justify-between rounded bg-surface px-[2px] py-[1px]">
              <span className="font-semibold text-foreground/50">REP</span>
              <span className="font-bold text-primary">{f.reps}</span>
            </div>
            <div className="flex items-center justify-between rounded bg-surface px-[2px] py-[1px]">
              <span className="font-semibold text-foreground/50">DESC</span>
              <span className="font-bold text-primary">{f.rest}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-[2px] bg-[#e8590c] px-1 py-[2px]">
          <ExclamationTriangleIcon className="h-[6px] w-[6px] shrink-0 text-white" />
          <span className="truncate text-[3px] font-semibold leading-tight text-white">{f.warning}</span>
        </div>
      </div>
    </div>
  );
}
