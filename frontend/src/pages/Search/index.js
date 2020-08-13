import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import getMoviesController from '../../controllers/GetMoviesController';

import Header from '../../components/Header';

// import styles from './styles.scss';

export default function Search() {
  const query = new URLSearchParams(useLocation().search);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieName = query.get('movie');
    const page = query.get('page') || 1;

    getMoviesController
      .search(movieName, page, 'w500')
      .then(res => setMovies(res));
  }, [query]);

  return (
    <>
      <Header />

      <main>
        {movies.results &&
          movies.results.map(movie => <p key={movie.id}>{movie.title}</p>)}
      </main>
    </>
  );
}
