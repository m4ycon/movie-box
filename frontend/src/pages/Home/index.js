import React, { useEffect, useState } from 'react';
import api from '../../config/api';

import styles from './style.module.scss';

import Header from '../../components/Header';
import Carrousel from '../../components/Carrousel';

export default () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopMovies();
  }, []);

  async function getPopMovies() {
    const movies = await api
      .get('/movies/popular')
      .then(res => res.data.results);

    movies.map(async movie => {
      const images = await api
        .get(`/movie/${movie.id}/image_list`)
        .then(res => res.data.backdrops);
      movie.images = images;
    });

    // retorna o objeto, com o array images
    console.log(movies[3]); 
    console.log(movies[3].images); // retorna undefined

    setPopular(movies);
  }

  return (
    <>
      <Header />
      <main>
        <Carrousel timer={8000}>
          {popular.map(movie => (
            <div key={movie.id} className={styles.movie}>
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={movie.backdrop_path}
                  alt={movie.title}
                />
              </div>
              <div className={styles.movieInfoContainer}>
                <h1 className={styles.title}>{movie.title}</h1>

                <div className={styles.movieInfo}>
                  <div className={styles.previewContainer}>
                    <img className={styles.imagePreview} src={movie.backdrop_path} />
                    <img className={styles.imagePreview} src={movie.backdrop_path} />
                    <img className={styles.imagePreview} src={movie.backdrop_path} />
                    <img className={styles.imagePreview} src={movie.backdrop_path} />
                  </div>

                  <p className={styles.overview}>{movie.overview}</p>
                  <div className={styles.buttonsContainer}>
                    <button
                      className={`${styles.button} ${styles.buttonLater}`}
                    >
                      Watch Later
                    </button>
                    <button
                      className={`${styles.button} ${styles.buttonWatched}`}
                    >
                      I watched
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carrousel>
      </main>
    </>
  );
};
