import React from 'react';

import styles from './styles.module.scss';

export default function Slider({ title, children }) {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.sliderContainer}>{children}</div>
    </div>
  );
}
