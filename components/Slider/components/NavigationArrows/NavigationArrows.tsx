"use client";

import styles from "./NavigationArrows.module.scss";

interface NavigationArrowsProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const NavigationArrows: React.FC<NavigationArrowsProps> = ({
  canScrollLeft,
  canScrollRight,
  onPrevious,
  onNext,
}) => {
  return (
    <>
      {canScrollLeft && (
        <button
          className={styles.navArrowLeft}
          onClick={onPrevious}
          aria-label="Previous slide"
        >
          ‹
        </button>
      )}
      {canScrollRight && (
        <button
          className={styles.navArrowRight}
          onClick={onNext}
          aria-label="Next slide"
        >
          ›
        </button>
      )}
    </>
  );
};
