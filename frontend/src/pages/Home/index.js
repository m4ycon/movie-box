import React, { useEffect, useState } from 'react';

import getMoviesController from '../../controllers/GetMoviesController';

import styles from './styles.module.scss';

import Header from '../../components/Header';
import Carrousel from '../../components/Carrousel';
import Slider from '../../components/Slider';
import MovieCarrouselItem from '../../components/MovieCarrouselItem';
import MovieSliderItem from '../../components/MovieSliderItem';

export default () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    let isSubscribed = true;

    setWindowWidth(window.innerWidth);
    window.addEventListener(
      'resize',
      () => isSubscribed && setWindowWidth(window.innerWidth)
    );

    getMoviesController.popular().then(res => isSubscribed && setPopular(res));
    getMoviesController
      .topRated()
      .then(res => isSubscribed && setTopRated(res));
    getMoviesController
      .recommended()
      .then(res => isSubscribed && setRecommended(res));

    return () => (isSubscribed = false);
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className={styles.carrouselContainer}>
          <Carrousel
            arrowAndIndicatorPositionStyle={{
              width: windowWidth > 700 ? '70%' : '100%',
            }}
            timer={8000}
          >
            {popular.map(movie => (
              <MovieCarrouselItem key={movie.id} movie={movie} />
            ))}
          </Carrousel>
        </div>

        <div className={styles.containerSlider}>
          <Slider title="Top Rated" height="175px">
            {topRated.map(movie => (
              <MovieSliderItem key={movie.id} movie={movie} />
            ))}
          </Slider>
        </div>

        <div className={styles.containerSlider}>
          <Slider title="Recommended Movies" height="175px">
            {recommended.map(movie => (
              <MovieSliderItem key={movie.id} movie={movie} />
            ))}
          </Slider>
        </div>
      </main>
    </>
  );
};
