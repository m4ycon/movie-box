import React from 'react';

import styles from './styles.module.scss';
import Dropdown from '../Dropdown';
import Image from '../Image';
import Checkbox from '../Checkbox';

export default function MovieSlideItem({ movie }) {
  return (
    <div className={styles.slide} title={movie.title}>
      <Image src={movie.poster_path} alt={movie.title} />

      <div className={styles.dropdown}>
        <Dropdown>
          <Checkbox label="Watch Later" checked />
          <Checkbox label="Watched" checked />
        </Dropdown>
      </div>
    </div>
  );
}
