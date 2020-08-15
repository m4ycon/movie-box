import React, { useState, Children, useEffect } from 'react';

import styles from './style.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Loading from '../Loading';

export default ({
  children,
  arrowAndIndicatorPositionStyle = {},
  timer = null,
}) => {
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slidesLength, setSlidesLength] = useState(0);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const array = Children.toArray(children);
    setSlides(array);
    setSlidesLength(array.length);
  }, [children]);

  const handleIndicatorClick = index => setCurrentSlideIndex(index);

  const handleLeftClick = () =>
    currentSlideIndex === 0
      ? setCurrentSlideIndex(slidesLength - 1)
      : setCurrentSlideIndex(currentSlideIndex - 1);

  const handleRightClick = () =>
    currentSlideIndex === slidesLength - 1
      ? setCurrentSlideIndex(0)
      : setCurrentSlideIndex(currentSlideIndex + 1);

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        if (!isHover) handleRightClick();
      }, timer);

      return () => clearInterval(interval);
    }
  });

  const mouseEnter = () => setIsHover(true);
  const mouseLeave = () => setIsHover(false);

  if (!slides.length) return <Loading />;

  return (
    <section
      className={styles.carrousel}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          ...arrowAndIndicatorPositionStyle,
        }}
      >
        <button
          className={`${styles.carrouselBtn} ${styles.carrouselBtnLeft}`}
          onClick={handleLeftClick}
        >
          <FiChevronLeft size={40} />
        </button>

        <button
          className={`${styles.carrouselBtn} ${styles.carrouselBtnRight}`}
          onClick={handleRightClick}
        >
          <FiChevronRight size={40} />
        </button>

        <div className={styles.nav}>
          {slides.map((e, i) => (
            <button
              key={i}
              onClick={() => handleIndicatorClick(i)}
              className={`${styles.indicator} ${
                i === currentSlideIndex ? styles.currentIndicator : ''
              }`}
            ></button>
          ))}
        </div>
      </div>

      <div className={styles.trackContainer}>
        <ul className={styles.track}>
          {slides.map((child, i) => (
            <li
              key={i}
              className={`${styles.slide} ${
                currentSlideIndex === i ? styles.currentSlide : ''
              }`}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
