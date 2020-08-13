import api from '../services/api';

class GetMoviesController {
  async popular() {
    return await api
      .get('/movies/popular')
      .then(res => res.data.results)
      .then(
        async movies =>
          await Promise.all(
            movies.map(async movie => {
              const images = await api
                .get(`/movie/${movie.id}/image_list`)
                .then(res => res.data.backdrops)
                .then(images =>
                  images.splice(0, 4).map(image => image.file_path)
                );

              return images.length
                ? { ...movie, images }
                : { ...movie, images: [movie.poster_path] };
            })
          )
      );
  }

  async topRated() {
    return await api
      .get('/movies/top-rated?size=w500')
      .then(res => res.data.results);
  }

  async recommended() {
    return await api
      .get('/movies/recommended?size=w500')
      .then(res => res.data.results);
  }

  async search(movie, page = 1, size) {
    return await api
      .get(`/movies/search?movie=${movie}&page=${page}&size=${size}`)
      .then(res => res.data);
  }
}

export default new GetMoviesController();
