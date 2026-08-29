import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

interface StarRatingProps {
  rating: number;
  className?: string;
  starClassName?: string;
}

export function StarRating({ rating, className = "", starClassName = "h-5 w-5" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`Nota ${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        return (
          <span key={i} className={`relative inline-block ${starClassName}`}>
            <StarSolid className={`absolute inset-0 text-black/15 ${starClassName}`} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <StarSolid className={`text-gold ${starClassName}`} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
