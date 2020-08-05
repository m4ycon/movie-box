import React, { useState, Children } from 'react';

import styles from './style.module.scss';

export default ({ children, className }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <section className={styles.carrousel}>
      <div className={styles.trackContainer}>
        <ul className={styles.track}>
          {Children.map(children, (child, i) => (
            <li key={i} className={styles.slide}>
              {child}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
