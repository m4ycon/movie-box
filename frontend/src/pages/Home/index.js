import React, { useEffect, useState } from 'react';
import api from '../../config/api';

import Header from '../../components/Header';
import styles from './style.module.scss';

export default () => {
  const [popular, setPopular] = useState({ results: [] });

  useEffect(async () => {
    const data = await api.get('/movies/popular').then(res => res.data);
    setPopular(data);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className={styles.carrousel}>
          <div className={styles.trackContainer}>
            <ul className={styles.track}>
              {popular.results.map((movie, index) => (
                <li
                  className={`${styles.slide} ${
                    index === 0 ? styles.currentSlide : ''
                  }`}
                >
                  <img
                    className={styles.image}
                    key={movie.id}
                    src={movie.backdrop_path}
                    alt={movie.title}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};
