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
  width: string;
  style: React.CSSProperties;
}

function FloatingCard({ number, rotate, width, style }: FloatingCardProps) {
  const f = fichaLibrary[number];
  if (!f) return null;
  return (
    <div
      className={`absolute ${width} rounded-lg border border-primary/20 bg-white p-1.5 text-center shadow-lg`}
      style={{ ...style, transform: `rotate(${rotate}deg)` }}
    >
      <div className="truncate text-[5.5px] font-extrabold uppercase leading-tight text-primary sm:text-[6.5px]">
        {f.name}
      </div>
      <div className="mt-0.5 flex aspect-[4/3] w-full items-center justify-center rounded bg-surface">
        {personIcon("h-1/2 w-1/2 text-primary/35")}
      </div>
      <div className="mt-0.5 text-[4.5px] font-bold text-foreground/55 sm:text-[5.5px]">
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
        kind === "phone" ? "w-[20%]" : "w-[28%]"
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
      {/* decorative background glow */}
      <div className="pointer-events-none absolute -left-6 top-4 h-28 w-28 rounded-full bg-primary/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-4 top-1/3 h-32 w-32 rounded-full bg-special/15 blur-2xl" />
      <div className="pointer-events-none absolute bottom-8 left-1/4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
      <span className="pointer-events-none absolute right-[6%] top-[2%] h-2 w-2 rounded-full bg-primary/40" />
      <span className="pointer-events-none absolute left-[10%] top-[46%] h-1.5 w-1.5 rounded-full bg-special/50" />
      <span className="pointer-events-none absolute right-[14%] bottom-[10%] h-1.5 w-1.5 rounded-full bg-primary/40" />

      {/* central box */}
      <div className="absolute left-1/2 top-[24%] flex h-[46%] w-[36%] -translate-x-1/2 flex-col items-center gap-1.5 overflow-hidden rounded-xl bg-white px-2 pb-2 pt-2.5 text-center shadow-2xl ring-1 ring-black/5">
        <div className="absolute left-0 top-0 h-full w-[10%] bg-gradient-to-b from-secondary to-primary" />
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

      {/* top arc */}
      <FloatingCard number={1} rotate={-9} width="w-[21%]" style={{ top: "-4%", left: "-1%" }} />
      <FloatingCard number={11} rotate={-4} width="w-[21%]" style={{ top: "-6%", left: "24%" }} />
      <FloatingCard number={19} rotate={5} width="w-[21%]" style={{ top: "-6%", left: "55%" }} />
      <FloatingCard number={17} rotate={9} width="w-[21%]" style={{ top: "-3%", left: "79%" }} />

      {/* side pairs */}
      <FloatingCard number={3} rotate={-6} width="w-[22%]" style={{ top: "27%", left: "-3%" }} />
      <FloatingCard number={5} rotate={-3} width="w-[22%]" style={{ top: "52%", left: "-1%" }} />
      <FloatingCard number={23} rotate={6} width="w-[22%]" style={{ top: "27%", left: "80%" }} />
      <FloatingCard number={24} rotate={3} width="w-[22%]" style={{ top: "52%", left: "78%" }} />

      <DeviceMock kind="phone" rotate={-6} style={{ top: "76%", left: "-1%" }} />
      <DeviceMock kind="tablet" rotate={5} style={{ top: "74%", left: "63%" }} />

      {/* fanned card stack, bottom center */}
      <div className="absolute left-1/2 top-[82%] w-[24%] -translate-x-1/2">
        <div className="relative aspect-[4/3]">
          <div className="absolute inset-0 rotate-6 rounded-lg border border-primary/20 bg-white shadow" />
          <div className="absolute inset-0 -rotate-4 rounded-lg border border-primary/20 bg-white shadow" />
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-primary/20 bg-white p-1 text-center shadow-lg">
            <div className="truncate text-[5.5px] font-extrabold uppercase text-primary sm:text-[6.5px]">
              {fichaLibrary[6]?.name}
            </div>
            <div className="text-[4.5px] font-bold text-foreground/55 sm:text-[5.5px]">
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
