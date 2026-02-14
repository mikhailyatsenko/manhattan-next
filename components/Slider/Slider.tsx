"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { throttle } from "@/lib/utils/throttle";
const sliderImage1 = "img/slide-1.webp";
const sliderImage2 = "img/slide-2.webp";
const sliderImage3 = "img/slide-3.jpg";
const sliderImageSm1 = "img/slide-1-sm.webp";
import styles from "./Slider.module.scss";

const slides = [
  {
    id: "first-visit",
    getImage: (isMobile: boolean) => (isMobile ? sliderImageSm1 : sliderImage1),
    content: (
      <>
        <h1 className="uppercase 2xl:text-7xl xl:text-6xl text-4xl text-lightbrown drop-shadow-sm font-normal">Акция:</h1>
        <h1 className="2xl:text-7xl xl:text-6xl text-4xl text-lightbrown drop-shadow-sm font-normal"> 
          <span>Первое посещение: </span>
          <span className="font-semibold whitespace-nowrap">скидка 10%</span>
        </h1>
      </>
    ),
  },
  {
    id: "birthday",
    getImage: () => sliderImage2,
    content: (
      <h1 className="2xl:text-7xl xl:text-6xl text-4xl text-lightbrown drop-shadow-sm font-normal">
        Дарим скидку
        <span className="font-semibold">
          {" "}
          10% в День Рождения, а так же за 2 дня до и после.
        </span>
      </h1>
    ),
  },
  {
    id: "friends",
    getImage: () => sliderImage3,
    content: (
      <h1 className="2xl:text-7xl xl:text-6xl text-4xl text-lightbrown drop-shadow-sm font-normal">
        Приводите своих друзей и получайте{" "}
        <span className={styles.semibold}>скидку в 200₽</span> за каждого нового
        клиента!
      </h1>
    ),
  },
];

const Slider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const isAutoScrollingRef = useRef(false);

  const resetAutoScrollTimer = useCallback(() => {
    setLastInteractionTime(Date.now());
  }, []);

  const updateScrollState = useCallback((scroller: HTMLElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

    // Calculate current slide based on scroll position
    const slideIndex = Math.round(scrollLeft / clientWidth);
    setCurrentSlide(slideIndex);
  }, []);

  // Track scroll state for arrow visibility and pagination
  useEffect(() => {
    const scroller = sliderRef.current;
    if (!scroller) return;

    // Initial state
    updateScrollState(scroller);

    // Throttle scroll handler - limit updates to every 150ms
    const handleScroll = throttle(() => {
      updateScrollState(scroller);

      // Reset timer only if this is a user interaction (not auto-scroll)
      if (!isAutoScrollingRef.current) {
        resetAutoScrollTimer();
      }
    }, 150);

    scroller.addEventListener("scroll", handleScroll);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, [updateScrollState, resetAutoScrollTimer]);

  // Auto-scroll functionality
  useEffect(() => {
    const scroller = sliderRef.current;
    if (!scroller) return;

    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      autoScrollIntervalRef.current = setInterval(() => {
        const timeSinceLastInteraction = Date.now() - lastInteractionTime;

        // Only auto-scroll if enough time has passed since last interaction
        if (timeSinceLastInteraction >= 5000) {
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
      }, 1000); // Check every second
    };

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [lastInteractionTime]);

  const scrollToSlide = (index: number) => {
    const scroller = sliderRef.current;
    if (!scroller) return;

    const slideWidth = scroller.clientWidth;
    scroller.scrollTo({ left: slideWidth * index, behavior: "smooth" });
    resetAutoScrollTimer();
  };

  return (
    <section id="slider" className={styles.sliderContainer} ref={containerRef}>
      <div className={styles.horizontalSlider} ref={sliderRef}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={styles.slideItem}
            style={{
              backgroundImage: `url(${slide.getImage(false)})`,
            }}
          >
            <div
              className={`${"container h-full flex items-center"} ${styles[slide.id]}`}
            >
              <div
                id={`slide-content-${slide.id}`}
                className={styles.slideContent}
              >
                {slide.content}
                <Link
                  to="special"
                  spy={true}
                  smooth={true}
                  offset={10}
                  duration={500}
                >
                  <button type="button">Побробнее об акциях</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          className={styles.navArrowLeft}
          onClick={() => {
            sliderRef.current?.scrollBy({
              left: -sliderRef.current.clientWidth,
              behavior: "smooth",
            });
            resetAutoScrollTimer();
          }}
          aria-label="Previous slide"
        >
          ‹
        </button>
      )}
      {canScrollRight && (
        <button
          className={styles.navArrowRight}
          onClick={() => {
            sliderRef.current?.scrollBy({
              left: sliderRef.current.clientWidth,
              behavior: "smooth",
            });
            resetAutoScrollTimer();
          }}
          aria-label="Next slide"
        >
          ›
        </button>
      )}

      {/* Pagination dots */}
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${
              currentSlide === index ? styles.active : ""
            }`}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
