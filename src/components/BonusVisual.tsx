interface BonusVisualProps {
  tone: string;
}

export function BonusVisual({ tone }: BonusVisualProps) {
  return (
    <div className="relative flex h-[220px] w-full items-center justify-center overflow-hidden bg-[#0d0d0d]">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg tracking-tighter text-white/25">
        ▸▸▸
      </span>
      <span className="absolute right-4 top-1/2 -translate-y-1/2 rotate-180 text-lg tracking-tighter text-white/25">
        ▸▸▸
      </span>
      <div
        className="h-36 w-36 rounded-full border-4 border-white/10 shadow-2xl"
        style={{
          background: `conic-gradient(from 90deg, ${tone}, #ffd166, ${tone}88, #ffb703, ${tone})`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-black/10 backdrop-blur-[1px]">
          <div className="grid h-24 w-24 grid-cols-2 gap-0.5 overflow-hidden rounded-full border-2 border-white/40">
            <div className="bg-[#f4a261]" />
            <div className="bg-[#e76f51]" />
            <div className="bg-[#2a9d8f]" />
            <div className="bg-[#e9c46a]" />
          </div>
        </div>
      </div>
    </div>
  );
}
