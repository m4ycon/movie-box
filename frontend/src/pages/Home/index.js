import React, { useEffect, useState } from 'react';
import api from '../../config/api';

import styles from './style.module.scss';

import Header from '../../components/Header';
import Carrousel from '../../components/Carrousel';

export default () => {
  const [popular, setPopular] = useState({ results: [] });
  const [currentPopIndex, setCurrentPopIndex] = useState(0);

  useEffect(() => {
    (async function getPopular() {
      const data = await api.get('/movies/popular').then(res => res.data);
      setPopular(data);
    })();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Carrousel currentSlideIndex={currentPopIndex}>
          {popular.results.map(movie => (
            <img
              key={movie.id}
              className={styles.image}
              src={movie.backdrop_path}
              alt={movie.title}
            />
          ))}
        </Carrousel>
        <button
          onClick={() =>
            currentPopIndex === popular.results.length - 1
              ? setCurrentPopIndex(0)
              : setCurrentPopIndex(currentPopIndex + 1)
          }
        >
          Próximo
        </button>
      </main>
    </>
  );
};
