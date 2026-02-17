import { useCallback, useEffect, useRef } from "react";

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
  const autoScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoScrollingRef = useRef(false);

  const scrollToNext = useCallback(() => {
    const scroller = sliderRef.current;
    if (!scroller) return;

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

    // Schedule next auto-scroll
    autoScrollTimeoutRef.current = setTimeout(scrollToNext, delayMs);
  }, [sliderRef, delayMs]);

  const resetAutoScrollTimer = useCallback(() => {
    // Clear existing timeout
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }

    // Start new timeout
    autoScrollTimeoutRef.current = setTimeout(scrollToNext, delayMs);
  }, [scrollToNext, delayMs]);

  useEffect(() => {
    const scroller = sliderRef.current;
    if (!scroller) return;

    // Start auto-scroll after initial delay
    autoScrollTimeoutRef.current = setTimeout(scrollToNext, delayMs);

    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [sliderRef, scrollToNext, delayMs]);

  return {
    resetAutoScrollTimer,
    isAutoScrollingRef,
  };
};
