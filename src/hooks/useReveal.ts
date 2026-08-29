import { useEffect, useRef, useState } from "react";

function isNearViewport(el: Element, margin = 150) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewportHeight + margin && rect.bottom > -margin;
}

/**
 * Reveals an element once it scrolls near the viewport. Uses scroll/resize
 * listeners plus a short-lived polling fallback (instead of relying solely
 * on IntersectionObserver timing) so content can never get stuck invisible
 * on a sales page.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    const check = () => {
      if (node && isNearViewport(node)) {
        setVisible(true);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const interval = window.setInterval(check, 300);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearInterval(interval);
    };
  }, [visible]);

  return { ref, visible };
}
