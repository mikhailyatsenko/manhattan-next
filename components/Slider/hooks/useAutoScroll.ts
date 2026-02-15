import { useCallback, useEffect, useRef, useState } from "react";

interface UseAutoScrollOptions {
  sliderRef: React.RefObject<HTMLDivElement | null>;
  intervalMs?: number;
  delayMs?: number;
}

export const useAutoScroll = ({
  sliderRef,
  intervalMs = 1000,
  delayMs = 5000,
}: UseAutoScrollOptions) => {
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAutoScrollingRef = useRef(false);

  const resetAutoScrollTimer = useCallback(() => {
    setLastInteractionTime(Date.now());
  }, []);

  useEffect(() => {
    const scroller = sliderRef.current;
    if (!scroller) return;

    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      autoScrollIntervalRef.current = setInterval(() => {
        const timeSinceLastInteraction = Date.now() - lastInteractionTime;

        if (timeSinceLastInteraction >= delayMs) {
          isAutoScrollingRef.current = true;

          const { scrollLeft, scrollWidth, clientWidth } = scroller;

          // If we're at the end, scroll back to start
          if (scrollLeft >= scrollWidth - clientWidth - 1) {
            scroller.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            // Scroll to next slide
            scroller.scrollBy({ left: clientWidth, behavior: "smooth" });
          }

          // Reset flag after scroll animation completes
          setTimeout(() => {
            isAutoScrollingRef.current = false;
          }, 500);
        }
      }, intervalMs);
    };

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [lastInteractionTime, sliderRef, intervalMs, delayMs]);

  return {
    resetAutoScrollTimer,
    isAutoScrollingRef,
  };
};
