"use client";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalSlides: number;
  currentSlide: number;
  onSlideSelect: (index: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalSlides,
  currentSlide,
  onSlideSelect,
}) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          className={`${styles.paginationDot} ${
            currentSlide === index ? styles.active : ""
          }`}
          onClick={() => onSlideSelect(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
