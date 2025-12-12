import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

interface Options {
  initialDirection?: ScrollDirection;
  threshold?: number;
}

/**
 * Tracks scroll direction without spamming re-renders.
 */
export const useScrollDirection = ({
  initialDirection = "up",
  threshold = 8,
}: Options = {}) => {
  const [direction, setDirection] = useState<ScrollDirection>(initialDirection);
  const lastScrollY = useRef(0);
  const directionRef = useRef<ScrollDirection>(initialDirection);
  const ticking = useRef(false);

  useEffect(() => {
    const updateDirection = () => {
      const currentScrollY = window.scrollY || 0;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (Math.abs(scrollDelta) >= threshold) {
        const newDirection: ScrollDirection = scrollDelta > 0 ? "down" : "up";

        if (directionRef.current !== newDirection) {
          directionRef.current = newDirection;
          setDirection(newDirection);
        }

        lastScrollY.current = currentScrollY;
      } else {
        // Update the reference to avoid stale values when hovering around the same position
        lastScrollY.current = currentScrollY;
      }

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateDirection);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return direction;
};
