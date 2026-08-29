import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { fichaLibrary } from "../data/content";

interface FichaMockProps {
  number: number;
  className?: string;
}

function PosePlaceholder({ variant }: { variant: "start" | "end" }) {
  return (
    <div className="flex aspect-square w-full items-center justify-center rounded bg-surface">
      {variant === "start" ? (
        <svg viewBox="0 0 24 24" className="h-3/5 w-3/5 text-primary/35" fill="currentColor">
          <circle cx="12" cy="4.6" r="2.2" />
          <path d="M12 7.4c-1.9 0-3.4 1.1-4 2.9l-1.6 4.6 1.9.7 1.7-3.9-.5 3.3-1.6 6.2 2 .5 1.7-6 1.2 6h2.1l-.6-7.1 1.8 3.7 1.9-.9-2.2-4.5c-.7-1.5-2.1-2.5-3.8-2.5z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-3/5 w-3/5 -scale-x-100 text-primary/35" fill="currentColor">
          <circle cx="9.5" cy="6.2" r="2.1" />
          <path d="M9.4 8.3c-1.3.3-2.3 1.2-2.7 2.5l-1.1 3.7 1.8.6 1-3.1 1.1 1.6-2.6 3.9 1.6 1.2 3-4 2.4 2.9 1.5-1.3-2.9-4 .6-3.6c1.1.1 2.1.7 2.7 1.7l1.6 2.7 1.7-1-1.9-3.3c-1-1.7-2.9-2.6-4.8-2.5z" />
        </svg>
      )}
    </div>
  );
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
          <div className="flex w-[30%] shrink-0 flex-col gap-[1.5px]">
            <PosePlaceholder variant="start" />
            <PosePlaceholder variant="end" />
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
