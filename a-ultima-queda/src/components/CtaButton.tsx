import { checkoutHref } from "@/lib/config";

interface CtaButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  size?: "md" | "lg";
}

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function CtaButton({ children, href = checkoutHref, className = "", size = "lg" }: CtaButtonProps) {
  const sizing =
    size === "lg"
      ? "min-h-16 gap-4 px-6 text-[1.05rem] tracking-[0.05em] sm:px-8 sm:text-lg"
      : "min-h-14 gap-3 px-5 text-base tracking-[0.04em]";
  const bracket = size === "lg" ? "relative hidden text-white/50 sm:inline" : "hidden";
  return (
    <a
      href={href}
      {...(isExternal(href) ? { rel: "noopener" } : {})}
      className={`group relative inline-flex items-center justify-center overflow-hidden bg-red font-display uppercase text-white shadow-[0_10px_30px_-12px_rgb(120_0_0/0.7)] transition-[transform,box-shadow] duration-300 ease-editorial hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-12px_rgb(120_0_0/0.85)] active:translate-y-0 ${sizing} ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-red-deep transition-transform duration-500 ease-editorial group-hover:scale-x-100"
      />
      <span aria-hidden className={bracket}>
        [
      </span>
      <span className="relative whitespace-nowrap">{children}</span>
      <span aria-hidden className="relative inline-block transition-transform duration-300 ease-editorial group-hover:translate-x-1.5">
        →
      </span>
      <span aria-hidden className={bracket}>
        ]
      </span>
    </a>
  );
}
