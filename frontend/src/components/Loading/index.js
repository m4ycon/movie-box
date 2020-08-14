import React from 'react';

import styles from './styles.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingDot} />
      <div className={styles.loadingDot} />
      <div className={styles.loadingDot} />
    </div>
  );
}
