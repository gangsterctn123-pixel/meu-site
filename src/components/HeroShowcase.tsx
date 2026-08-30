import { ClockIcon } from "@heroicons/react/20/solid";
import { fichaLibrary } from "../data/content";

function personIcon(className: string) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="5" r="2.4" />
      <path d="M12 8c-2.4 0-4.3 1.6-4.8 3.8L6 16h2.2l1-4 1 8h2l.6-6 .6 6h2l1-8 1 4H20l-1.2-4.2C18.3 9.6 16.4 8 14 8h-2z" />
    </svg>
  );
}

interface FloatingCardProps {
  number: number;
  rotate: number;
  style: React.CSSProperties;
}

function FloatingCard({ number, rotate, style }: FloatingCardProps) {
  const f = fichaLibrary[number];
  if (!f) return null;
  return (
    <div
      className="absolute w-[27%] rounded-lg border border-primary/20 bg-white p-1.5 text-center shadow-lg"
      style={{ ...style, transform: `rotate(${rotate}deg)` }}
    >
      <div className="truncate text-[6px] font-extrabold uppercase leading-tight text-primary sm:text-[7px]">
        {f.name}
      </div>
      <div className="mt-0.5 flex aspect-[4/3] w-full items-center justify-center rounded bg-surface">
        {personIcon("h-1/2 w-1/2 text-primary/35")}
      </div>
      <div className="mt-0.5 text-[5px] font-bold text-foreground/55 sm:text-[6px]">
        {f.series} × {f.reps}
      </div>
    </div>
  );
}

function DeviceMock({
  kind,
  style,
  rotate,
}: {
  kind: "phone" | "tablet";
  style: React.CSSProperties;
  rotate: number;
}) {
  return (
    <div
      className={`absolute rounded-xl border-2 border-secondary/70 bg-white p-1 shadow-xl ${
        kind === "phone" ? "w-[22%]" : "w-[30%]"
      }`}
      style={{ ...style, transform: `rotate(${rotate}deg)` }}
    >
      <div className="grid grid-cols-2 gap-0.5 rounded-md bg-surface p-1">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="relative flex aspect-square items-center justify-center rounded bg-white">
            <span className="absolute left-0.5 top-0.5 flex h-2 w-2 items-center justify-center rounded-full bg-primary text-[3px] font-bold leading-none text-white">
              {n}
            </span>
            {personIcon("h-3/5 w-3/5 text-primary/30")}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroShowcase() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-[380px] sm:max-w-[440px]">
      {/* central box */}
      <div className="absolute left-1/2 top-[20%] flex h-[48%] w-[38%] -translate-x-1/2 flex-col items-center gap-1.5 overflow-hidden rounded-xl bg-white px-2 pb-2 pt-2.5 text-center shadow-2xl ring-1 ring-black/5">
        <div className="absolute left-0 top-0 h-full w-[10%] bg-secondary" />
        <div className="text-[8px] font-extrabold uppercase leading-tight text-primary sm:text-[9.5px]">
          25 Fichas
          <br />
          Mini Band
        </div>
        <div className="flex w-full flex-1 items-center justify-center rounded-lg bg-surface">
          {personIcon("h-1/2 w-1/2 text-primary/30")}
        </div>
        <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-full bg-primary leading-none text-white shadow-md">
          <span className="text-[9px] font-extrabold">25</span>
          <span className="text-[3px] font-semibold uppercase">fichas</span>
        </div>
        <div className="w-full shrink-0 rounded bg-secondary py-1 text-[4.5px] font-bold uppercase tracking-wide text-white">
          Guia passo a passo
        </div>
      </div>

      <FloatingCard number={1} rotate={-8} style={{ top: "0%", left: "0%" }} />
      <FloatingCard number={17} rotate={8} style={{ top: "5%", left: "68%" }} />
      <FloatingCard number={3} rotate={-6} style={{ top: "32%", left: "-1%" }} />
      <FloatingCard number={23} rotate={6} style={{ top: "32%", left: "74%" }} />

      <DeviceMock kind="phone" rotate={-6} style={{ top: "72%", left: "-1%" }} />
      <DeviceMock kind="tablet" rotate={5} style={{ top: "70%", left: "61%" }} />

      {/* fanned card stack, bottom center */}
      <div className="absolute left-1/2 top-[78%] w-[25%] -translate-x-1/2">
        <div className="relative aspect-[4/3]">
          <div className="absolute inset-0 rotate-6 rounded-lg border border-primary/20 bg-white shadow" />
          <div className="absolute inset-0 -rotate-4 rounded-lg border border-primary/20 bg-white shadow" />
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-primary/20 bg-white p-1 text-center shadow-lg">
            <div className="truncate text-[6px] font-extrabold uppercase text-primary sm:text-[7px]">
              {fichaLibrary[6]?.name}
            </div>
            <div className="text-[5px] font-bold text-foreground/55 sm:text-[6px]">
              {fichaLibrary[6]?.series} × {fichaLibrary[6]?.reps}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-3 -right-3 z-10 animate-bounce-slow rounded-full bg-primary px-4 py-2 font-bold text-white shadow-lg">
        93% OFF
      </div>
      <div className="absolute bottom-0 left-1/2 z-10 inline-flex -translate-x-1/2 translate-y-1/2 flex-col items-center rounded-full bg-primary/90 px-4 py-2 text-center text-xs text-white shadow-lg">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <span>Somente Hoje!</span>
        </div>
        <span className="mt-1 whitespace-nowrap">25 exercícios ilustrados</span>
      </div>
    </div>
  );
}
