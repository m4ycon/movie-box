import React, { useState, Children, useEffect } from 'react';

import styles from './style.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default ({
  children,
  setCurrentSlideIndex,
  currentSlideIndex,
  listLength,
  timer = null,
}) => {
  const [currentSlide, setCurrentSlide] = useState('');
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    for (let i = 0; i < listLength; i++) {
      setIndicators(prev => [...prev, i]);
    }
  }, [listLength]);

  useEffect(() => {
    console.log(indicators);
  }, [indicators]);

  useEffect(() => {
    setCurrentSlide(Children.toArray(children)[currentSlideIndex]);
  }, [children]);

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
          <li className={styles.slide}>{currentSlide}</li>
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
            className={
              i === currentSlideIndex
                ? `${styles.indicator} ${styles.currentIndicator}`
                : styles.indicator
            }
          ></button>
        ))}
      </div>
    </section>
  );
};
