import React, { useEffect, useState } from 'react';
import api from '../../config/api';

import styles from './style.module.scss';

import Header from '../../components/Header';
import Carrousel from '../../components/Carrousel';

export default () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    api
      .get('/movies/popular')
      .then(res => res.data)
      .then(res => setPopular(res.results));
  }, []);

  return (
    <>
      <Header />
      <main>
        <Carrousel timer={8000}>
          {popular.map(movie => (
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
