import { StarIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import type { Testimonial } from "../data/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialCard({ name, text, reply, avatarColor }: Testimonial) {
  return (
    <div className="relative rounded-2xl border border-secondary/20 bg-white p-6 text-foreground shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="absolute right-4 top-4 text-2xl leading-none text-foreground/20">”</div>

      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className="h-4 w-4 text-star" />
        ))}
      </div>

      <div className="flex gap-3 rounded-xl bg-surface p-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-foreground/70"
          style={{ backgroundColor: avatarColor }}
        >
          {initials(name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{name}</div>
          <p className="text-sm leading-snug">{text}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-blue-600">
            <span className="flex items-center gap-1">
              <HandThumbUpIcon className="h-3.5 w-3.5" /> Curtir
            </span>
            <span>Responder</span>
            <span className="flex items-center gap-1">
              <ChatBubbleLeftIcon className="h-3.5 w-3.5" /> Enviar mensagem
            </span>
            <span className="text-foreground/40">Ocultar</span>
          </div>
        </div>
      </div>

      {reply && (
        <div className="ml-6 mt-2 flex gap-3 rounded-xl bg-surface p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
            ICB
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-foreground/50">
              Autor
            </div>
            <div className="text-sm font-semibold">
              Info Cursos Brasil{" "}
              <span className="font-normal text-foreground/80">{reply}</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs font-medium text-blue-600">
              <span>Curtir</span>
              <span>Responder</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
