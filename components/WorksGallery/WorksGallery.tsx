"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./WorksGallery.module.scss";

const imageGallery1 = "img/gallery-1.jpg";
const imageGallery2 = "img/gallery-2.jpg";
const imageGallery3 = "img/gallery-3.jpg";
const imageGallery4 = "img/gallery-4.jpg";
const imageGallery5 = "img/gallery-5.jpg";
const imageGallery6 = "img/gallery-6.webp";

const galleryImages = [
  { src: imageGallery2, alt: "Gallery image 1" },
  { src: imageGallery6, alt: "Gallery image 2" },
  { src: imageGallery1, alt: "Gallery image 3" },
  { src: imageGallery4, alt: "Gallery image 4" },
  { src: imageGallery5, alt: "Gallery image 5" },
  { src: imageGallery3, alt: "Gallery image 6" },
];

const WorksGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback((scroller: HTMLElement) => {
    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  // Track scroll state for arrow visibility
  useEffect(() => {
    const scroller = galleryRef.current;
    if (!scroller) return;

    // Initial state - check immediately and after a small delay
    const checkScrollState = () => {
      updateScrollState(scroller);
    };
    
    checkScrollState();
    
    // Recheck after a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(checkScrollState, 100);

    const handleScroll = () => {
      updateScrollState(scroller);
    };

    scroller.addEventListener("scroll", handleScroll);

    // Update on window resize
    const handleResize = () => {
      updateScrollState(scroller);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [updateScrollState]);

  const scrollGallery = (direction: "left" | "right") => {
    const scroller = galleryRef.current;
    if (!scroller) return;

    const scrollAmount = scroller.clientWidth * 0.8; // Scroll 80% of visible width
    const scrollTo = direction === "left" ? -scrollAmount : scrollAmount;
    
    scroller.scrollBy({ left: scrollTo, behavior: "smooth" });
  };

  const handleImageLoad = () => {
    const scroller = galleryRef.current;
    if (scroller) {
      updateScrollState(scroller);
    }
  };

  return (
    <section className={styles.galleryContainer}>
      <div className={styles.horizontalGallery} ref={galleryRef}>
        {galleryImages.map((image, index) => (
          <div key={index} className={styles.galleryItem}>
{/*
temporary disable imgs
*/}
<div style={{width:600, height: 600, backgroundColor: '#ccc'}}/>
         {/* <img 
              src={image.src} 
              alt={image.alt} 
              loading="lazy"
              onLoad={index === 0 ? handleImageLoad : undefined}
            /> */}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className={`${styles.navArrowLeft} ${!canScrollLeft ? styles.disabled : ''}`}
        onClick={() => scrollGallery("left")}
        aria-label="Previous images"
        disabled={!canScrollLeft}
      >
        ‹
      </button>
      <button
        className={`${styles.navArrowRight} ${!canScrollRight ? styles.disabled : ''}`}
        onClick={() => scrollGallery("right")}
        aria-label="Next images"
        disabled={!canScrollRight}
      >
        ›
      </button>
    </section>
  );
};

export default WorksGallery;
