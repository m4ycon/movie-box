import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import carrouselItemStyle from './carrouselItem.module.scss';
import sliderItemStyle from './sliderItem.module.scss';
import styles from './styles.module.scss';

import Header from '../../components/Header';
import Carrousel from '../../components/Carrousel';
import Slider from '../../components/Slider';

import Dropdown from '../../components/Dropdown';

export default () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [hoverIndexPreview, setHoverIndexPreview] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    api
      .get('/movies/top-rated?size=w500')
      .then(res => res.data.results)
      .then(arr => setTopRated(arr));
  }, []);

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

          return images.length
            ? { ...movie, images }
            : { ...movie, images: [movie.poster_path] };
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
          <Carrousel
            arrowAndIndicatorPositionStyle={{
              width: windowWidth > 700 ? '70%' : '100%',
            }}
            timer={8000}
          >
            {popular.map(movie => (
              <div key={movie.id} className={carrouselItemStyle.movie}>
                <div className={carrouselItemStyle.imageContainer}>
                  {movie.images.map((imageURL, i) => (
                    <img
                      key={i}
                      className={`${carrouselItemStyle.image} ${
                        hoverIndexPreview === i
                          ? carrouselItemStyle.currentImage
                          : ''
                      }`}
                      src={imageURL}
                    />
                  ))}
                </div>

                <div className={carrouselItemStyle.movieInfoContainer}>
                  <h1 className={carrouselItemStyle.title} title={movie.title}>
                    {movie.title}
                  </h1>

                  <div className={carrouselItemStyle.movieInfo}>
                    <div className={carrouselItemStyle.previewContainer}>
                      {movie.images.map((imageURL, i) => (
                        <img
                          onMouseEnter={() => handleHoverPreviewEnter(i)}
                          onMouseLeave={handleHoverPreviewLeave}
                          key={i}
                          className={carrouselItemStyle.imagePreview}
                          src={imageURL}
                        />
                      ))}
                    </div>

                    <p className={carrouselItemStyle.overview}>
                      {movie.overview}
                    </p>

                    <div className={carrouselItemStyle.buttonsContainer}>
                      <button
                        className={`${carrouselItemStyle.button} ${carrouselItemStyle.buttonLater}`}
                      >
                        Watch Later
                      </button>
                      <button
                        className={`${carrouselItemStyle.button} ${carrouselItemStyle.buttonWatched}`}
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

        <div className={styles.containerSlider}>
          <Slider title="Top Rated" height="175px">
            {topRated.map(movie => (
              <div
                key={movie.id}
                className={sliderItemStyle.slide}
                title={movie.title}
              >
                <img src={movie.poster_path} alt={movie.title} />

                <div className={sliderItemStyle.dropdown}>
                  <Dropdown>
                    <button className={sliderItemStyle.dropdownBtn}>
                      Watch Later
                    </button>
                    <button className={sliderItemStyle.dropdownBtn}>
                      Watched
                    </button>
                  </Dropdown>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </main>
    </>
  );
};
