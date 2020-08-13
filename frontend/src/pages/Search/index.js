import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import getMoviesController from '../../controllers/GetMoviesController';

import Header from '../../components/Header';
import SearchList from '../../components/SearchList';
import RateStars from '../../components/RateStars';

// import styles from './styles.module.scss';
import searchItemStyles from './searchItemStyle.module.scss';

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
        <SearchList>
          {movies.results &&
            movies.results.map(movie => (
              <div key={movie.id} className={searchItemStyles.container}>
                <div className={searchItemStyles.imageContainer}>
                  <img
                    className={searchItemStyles.image}
                    src={movie.poster_path}
                    alt={movie.title}
                  />
                </div>
                <div className={searchItemStyles.movieInfo}>
                  <h3 className={searchItemStyles.title} title={movie.title}>
                    {movie.title}
                  </h3>

                  <p className={searchItemStyles.description}>
                    {movie.overview}
                  </p>
                  
                  <div className={searchItemStyles.extraInfo}>
                    <p className={searchItemStyles.rating}>
                      <span>Rate</span>
                      <RateStars rating={movie.vote_average} />
                    </p>

                    <p className={searchItemStyles.release}>
                      <span>Release date</span>
                      {movie.release_date.replace(/-/g, '/')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </SearchList>
      </main>
    </>
  );
}
