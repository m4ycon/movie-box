import React from 'react';

import styles from './styles.module.scss';

import RateStars from '../RateStars';
import Image from '../Image';
import Dropdown from '../Dropdown';
import Checkbox from '../Checkbox';

export default function MovieSearchItem({ movie }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={movie.poster_path}
          alt={movie.title}
        />
      </div>
      <div className={styles.movieInfo}>
        <h3 className={styles.title} title={movie.title}>
          {movie.title}
        </h3>

        <p className={styles.description}>{movie.overview}</p>

        <div className={styles.extraInfo}>
          <div className={styles.rating}>
            <span>Rate</span>
            <RateStars rating={movie.vote_average} />
          </div>

          {movie.release_date && (
            <div className={styles.release}>
              <span>Release date</span>
              {movie.release_date.replace(/-/g, '/')}
            </div>
          )}
        </div>
      </div>

      <div className={styles.dropdown}>
        <Dropdown>
          <Checkbox label="Watch Later" checked />
          <Checkbox label="Watched" checked />
        </Dropdown>
      </div>
    </div>
  );
}
