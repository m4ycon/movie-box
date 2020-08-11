import React from 'react';

import styles from './styles.module.scss';

export default function Slider({ title }) {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.sliderContainer}>
        <div className={styles.slide}></div>
        <div className={styles.slide}></div>
        <div className={styles.slide}></div>
        <div className={styles.slide}></div>
        <div className={styles.slide}></div>
        <div className={styles.slide}></div>
        <div className={styles.slide}></div>
        <div className={styles.slide}></div>
      </div>
    </div>
  );
}
