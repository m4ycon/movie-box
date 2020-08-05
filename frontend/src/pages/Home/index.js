import React, { useEffect, useState } from 'react';
import api from '../../config/api';

import styles from './style.module.scss';

import Header from '../../components/Header';
import Carrousel from '../../components/Carrousel';

export default () => {
  const [popular, setPopular] = useState({ results: [] });

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
        <Carrousel slides={popular.results}>
          {popular.results.map(movie => (
            <img
              key={movie.id}
              className={styles.image}
              src={movie.backdrop_path}
              alt={movie.title}
            />
          ))}
        </Carrousel>
      </main>
    </>
  );
};
