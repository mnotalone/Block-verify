import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD = 200;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const visibilityRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      const shouldShow = window.scrollY > SCROLL_THRESHOLD;
      if (visibilityRef.current !== shouldShow) {
        visibilityRef.current = shouldShow;
        setIsVisible(shouldShow);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateVisibility();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 h-[42px] rounded-full bg-background/80 px-4 backdrop-blur-xl shadow-lg border border-border/60 text-foreground flex items-center gap-2 text-sm font-medium transition-opacity duration-200 hover:bg-background/90 hover:shadow-xl"
    >
      <ChevronUp className="h-4 w-4" />
      Top
    </button>
  );
};

export default ScrollToTopButton;
