import React, { useState, Children, useEffect } from 'react';

import styles from './style.module.scss';

export default ({ children, currentSlideIndex }) => {
  const [currentSlide, setCurrentSlide] = useState('');

  useEffect(() => {
    setCurrentSlide(Children.toArray(children)[currentSlideIndex]);
  }, [children]);

  return (
    <section className={styles.carrousel}>
      <div className={styles.trackContainer}>
        <ul className={styles.track}>
          <li className={styles.slide}>{currentSlide}</li>
        </ul>
      </div>
    </section>
  );
};
