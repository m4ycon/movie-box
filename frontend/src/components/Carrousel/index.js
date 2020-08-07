import React, { useState, Children, useEffect } from 'react';

import styles from './style.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default ({ children, listLength, timer = null }) => {
  const [indicators, setIndicators] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    for (let i = 0; i < listLength; i++) {
      setIndicators(prev => [...prev, i]);
    }
  }, [listLength]);

  const handleIndicatorClick = index => setCurrentSlideIndex(index);

  const handleLeftClick = () =>
    currentSlideIndex === 0
      ? setCurrentSlideIndex(listLength - 1)
      : setCurrentSlideIndex(currentSlideIndex - 1);

  const handleRightClick = () =>
    currentSlideIndex === listLength - 1
      ? setCurrentSlideIndex(0)
      : setCurrentSlideIndex(currentSlideIndex + 1);

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => {
        handleRightClick();
      }, timer);

      return () => clearInterval(interval);
    }
  });

  return (
    <section className={styles.carrousel}>
      <button
        className={`${styles.carrouselBtn} ${styles.carrouselBtnLeft}`}
        onClick={handleLeftClick}
      >
        <FiChevronLeft size={25} />
      </button>

      <div className={styles.trackContainer}>
        <ul className={styles.track}>
          {Children.toArray(children).map((child, i) => (
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

      <button
        className={`${styles.carrouselBtn} ${styles.carrouselBtnRight}`}
        onClick={handleRightClick}
      >
        <FiChevronRight size={25} />
      </button>

      <div className={styles.nav}>
        {indicators.map((e, i) => (
          <button
            key={i}
            onClick={() => handleIndicatorClick(i)}
            className={`${styles.indicator} ${
              i === currentSlideIndex ? styles.currentIndicator : ''
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};
