import React from 'react';

import styles from './styles.module.scss';
import Dropdown from '../Dropdown';
import Image from '../Image';

export default function MovieSlideItem({ movie }) {
  return (
    <div key={movie.id} className={styles.slide} title={movie.title}>
      <Image src={movie.poster_path} alt={movie.title} />

      <div className={styles.dropdown}>
        <Dropdown>
          <button className={styles.dropdownBtn}>Watch Later</button>
          <button className={styles.dropdownBtn}>Watched</button>
        </Dropdown>
      </div>
    </div>
  );
}
