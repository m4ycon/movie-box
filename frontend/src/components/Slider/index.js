import React from 'react';

import styles from './styles.module.scss';

export default function Slider({ title, children, height = '150px' }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span>{title}</span>
      </h2>

      <div style={{ height }} className={styles.sliderContainer}>
        {children}
      </div>
    </div>
  );
}
