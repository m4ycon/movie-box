import React, { useState } from 'react';

import styles from './styles.module.scss';
import Loading from '../Loading';

export default function Image({
  src,
  className,
  position = 'relative',
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position }} className={styles.container}>
      <img
        src={src}
        className={`${className} ${styles.image}`}
        onLoad={() => setLoaded(true)}
        {...props}
      />
      {!loaded && <Loading />}
    </div>
  );
}
