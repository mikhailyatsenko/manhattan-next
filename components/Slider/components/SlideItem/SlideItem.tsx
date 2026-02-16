"use client";

import { ReactNode } from "react";
import { Link } from "react-scroll";
import styles from "./SlideItem.module.scss";

interface SlideItemProps {
  id: string;
  desktopImage: string;
  mobileImage: string;
  content: ReactNode;
  isMobile: boolean;
  customStyles?: React.CSSProperties;
}

export const SlideItem: React.FC<SlideItemProps> = ({
  id,
  desktopImage,
  mobileImage,
  content,
  isMobile,
  customStyles = {},
}) => {
  const backgroundImage = isMobile && mobileImage ? mobileImage : desktopImage;
  console.log("SlideItem render:", { id, backgroundImage, customStyles });
  return (
    <div
      className={styles.slideItem}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        ...customStyles,
      }}
    >
      {/* Dark overlay */}
      <div className={styles.overlay} />

      <div className={`container h-full flex items-center ${styles[id]}`}>
        <div id={`slide-content-${id}`} className={styles.slideContent}>
          {content}
          <Link
            to="special"
            spy={true}
            smooth={true}
            offset={10}
            duration={500}
            href="#special"
            className={styles.promoButton}
          >
            Подробнее об акциях
          </Link>
        </div>
      </div>
    </div>
  );
};
