"use client";

import { useRef } from "react";
import { SlideItem } from "./components/SlideItem/SlideItem";
import { NavigationArrows } from "./components/NavigationArrows/NavigationArrows";
import { Pagination } from "./components/Pagination/Pagination";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { useSliderScroll } from "./hooks/useSliderScroll";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { slides } from "./config/slides";
import styles from "./Slider.module.scss";

const Slider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Auto-scroll functionality
  const { resetAutoScrollTimer, isAutoScrollingRef } = useAutoScroll({
    sliderRef,
    intervalMs: 1000,
    delayMs: 5000,
  });

  // Scroll state and controls
  const {
    canScrollLeft,
    canScrollRight,
    currentSlide,
    scrollToSlide,
    scrollPrevious,
    scrollNext,
  } = useSliderScroll({
    sliderRef,
    isAutoScrollingRef,
    onUserInteraction: resetAutoScrollTimer,
  });

  return (
    <section id="slider" className={styles.sliderContainer}>
      <div className={styles.horizontalSlider} ref={sliderRef}>
        {slides.map((slide) => (
          <SlideItem
            key={slide.id}
            id={slide.id}
            customStyles={slide.customStyles}
            desktopImage={slide.desktopImage}
            mobileImage={slide.mobileImage}
            content={slide.content}
            isMobile={isMobile}
          />
        ))}
      </div>

      <NavigationArrows
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onPrevious={scrollPrevious}
        onNext={scrollNext}
      />

      <Pagination
        totalSlides={slides.length}
        currentSlide={currentSlide}
        onSlideSelect={scrollToSlide}
      />
    </section>
  );
};

export default Slider;
