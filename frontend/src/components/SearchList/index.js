import React from 'react';

import styles from './styles.module.scss';
import Loading from '../Loading';

export default function SearchList({ children }) {
  if (!children) return <Loading />;
  return <div className={styles.container}>{children}</div>;
}
