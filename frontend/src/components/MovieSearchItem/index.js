import React from 'react';

import styles from './styles.module.scss';

import RateStars from '../RateStars';

export default function MovieSearchItem({ movie }) {
  return (
    <div key={movie.id} className={styles.container}>
      <div className={styles.imageContainer}>
        <img
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
    </div>
  );
}
