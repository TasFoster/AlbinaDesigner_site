import { useEffect, useRef, useState } from "react";

export function useReveal({ threshold = 0.2, timeout = 1200 } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Belt-and-suspenders: reveal is decorative, content must never stay
    // hidden if the observer is unsupported, delayed, or never fires.
    const fallback = window.setTimeout(() => setIsVisible(true), timeout);

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return () => window.clearTimeout(fallback);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          window.clearTimeout(fallback);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [threshold, timeout]);

  return [ref, isVisible];
}
