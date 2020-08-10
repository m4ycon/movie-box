import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import styles from './style.module.scss';

import Header from '../../components/Header';
import Carrousel from '../../components/Carrousel';

export default () => {
  const [popular, setPopular] = useState([]);
  const [hoverIndexPreview, setHoverIndexPreview] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const moviesArr = await api
        .get('/movies/popular')
        .then(res => res.data.results);

      const movies = await Promise.all(
        moviesArr.map(async movie => {
          const images = await api
            .get(`/movie/${movie.id}/image_list`)
            .then(res => res.data.backdrops)
            .then(images => images.splice(0, 4).map(image => image.file_path));

          return { ...movie, images };
        })
      );

      setPopular(movies);
    };

    getData();
  }, []);

  const handleHoverPreviewEnter = i => setHoverIndexPreview(i);
  const handleHoverPreviewLeave = () => setHoverIndexPreview(0);

  return (
    <>
      <Header />
      <main>
        <div className={styles.carrouselContainer}>
          <Carrousel timer={8000}>
            {popular.map(movie => (
              <div key={movie.id} className={styles.movie}>
                <div className={styles.imageContainer}>
                  {movie.images.map((imageURL, i) => (
                    <img
                      key={i}
                      className={`${styles.image} ${
                        hoverIndexPreview === i ? styles.currentImage : ''
                      }`}
                      src={imageURL}
                    />
                  ))}
                </div>

                <div className={styles.movieInfoContainer}>
                  <h1 className={styles.title}>{movie.title}</h1>

                  <div className={styles.movieInfo}>
                    <div className={styles.previewContainer}>
                      {movie.images.map((imageURL, i) => (
                        <img
                          onMouseEnter={() => handleHoverPreviewEnter(i)}
                          onMouseLeave={handleHoverPreviewLeave}
                          key={i}
                          className={styles.imagePreview}
                          src={imageURL}
                        />
                      ))}
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
                        Watched
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carrousel>
        </div>
      </main>
    </>
  );
};
