import {
  AdjustmentsHorizontalIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

const icons = {
  dial: AdjustmentsHorizontalIcon,
  bolt: BoltIcon,
  tracker: ClipboardDocumentCheckIcon,
};

interface BonusVisualProps {
  icon: keyof typeof icons;
  tone: string;
}

export function BonusVisual({ icon, tone }: BonusVisualProps) {
  const Icon = icons[icon];

  return (
    <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden bg-secondary">
      <div
        className="absolute -left-8 -top-8 h-28 w-28 rounded-full blur-2xl"
        style={{ backgroundColor: tone, opacity: 0.35 }}
      />
      <div className="absolute -bottom-10 -right-6 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />

      <div
        className="relative flex h-24 w-24 items-center justify-center rounded-full shadow-xl ring-4 ring-white/10"
        style={{ background: `linear-gradient(135deg, ${tone}, var(--color-primary))` }}
      >
        <Icon className="h-11 w-11 text-white" />
      </div>
    </div>
  );
}
