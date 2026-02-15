import { useCallback, useEffect, useState } from "react";
import { throttle } from "@/lib/utils/throttle";

interface UseSliderScrollOptions {
  sliderRef: React.RefObject<HTMLDivElement | null>;
  isAutoScrollingRef: React.RefObject<boolean>;
  onUserInteraction?: () => void;
}

export const useSliderScroll = ({
  sliderRef,
  isAutoScrollingRef,
  onUserInteraction,
}: UseSliderScrollOptions) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateScrollState = useCallback((scroller: HTMLElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

    // Calculate current slide based on scroll position
    const slideIndex = Math.round(scrollLeft / clientWidth);
    setCurrentSlide(slideIndex);
  }, []);

  useEffect(() => {
    const scroller = sliderRef.current;
    if (!scroller) return;

    // Initial state
    updateScrollState(scroller);

    // Throttle scroll handler - limit updates to every 150ms
    const handleScroll = throttle(() => {
      updateScrollState(scroller);

      // Reset timer only if this is a user interaction (not auto-scroll)
      if (!isAutoScrollingRef.current && onUserInteraction) {
        onUserInteraction();
      }
    }, 150);

    scroller.addEventListener("scroll", handleScroll);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, [updateScrollState, isAutoScrollingRef, onUserInteraction, sliderRef]);

  const scrollToSlide = useCallback(
    (index: number) => {
      const scroller = sliderRef.current;
      if (!scroller) return;

      const slideWidth = scroller.clientWidth;
      scroller.scrollTo({ left: slideWidth * index, behavior: "smooth" });
      onUserInteraction?.();
    },
    [sliderRef, onUserInteraction]
  );

  const scrollPrevious = useCallback(() => {
    const scroller = sliderRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: -scroller.clientWidth,
      behavior: "smooth",
    });
    onUserInteraction?.();
  }, [sliderRef, onUserInteraction]);

  const scrollNext = useCallback(() => {
    const scroller = sliderRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: scroller.clientWidth,
      behavior: "smooth",
    });
    onUserInteraction?.();
  }, [sliderRef, onUserInteraction]);

  return {
    canScrollLeft,
    canScrollRight,
    currentSlide,
    scrollToSlide,
    scrollPrevious,
    scrollNext,
  };
};
