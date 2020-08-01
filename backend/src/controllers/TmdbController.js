import api from '../services/tmdb';

class TmdbController {
  constructor() {
    this.imageURL = 'https://image.tmdb.org/t/p/';
  }

  async getImageList(id, size = 'original') {
    try {
      const response = await api
        .get(`/movie/${id}/images?language=en,null`)
        .then(res => res.data);

      response.backdrops.map(e => {
        e.file_path = this._formatImageURL(e.file_path, size);
      });

      response.posters.map(e => {
        e.file_path = this._formatImageURL(e.file_path, size);
      });

      return response;
    } catch (err) {
      throw err;
    }
  }

  async getPopular(size = 'original') {
    try {
      const response = await api
        .get('/movie/popular?language=en,none')
        .then(res => res.data);

      response.results.map(e => {
        e.poster_path = this._formatImageURL(e.poster_path, size);
        e.backdrop_path = this._formatImageURL(e.backdrop_path, size);
      });

      return response;
    } catch (err) {
      throw err;
    }
  }

  async searchMovies(movie, page = 1, size = 'original') {
    try {
      const response = await api
        .get(`search/movie?query=${movie}&page=${page}`)
        .then(res => res.data);

      response.results.map(e => {
        e.poster_path = this._formatImageURL(e.poster_path, size);
        e.backdrop_path = this._formatImageURL(e.backdrop_path, size);
      });

      return response;
    } catch (err) {
      throw err;
    }
  }

  async getMovie(id, size = 'original') {
    try {
      const response = await api.get(`movie/${id}`).then(res => res.data);

      response.poster_path = this._formatImageURL(response.poster_path, size);
      response.backdrop_path = this._formatImageURL(
        response.backdrop_path,
        size
      );
      response.production_companies.map(e => {
        e.logo_path = this._formatImageURL(e.logo_path);
      });

      return response;
    } catch (err) {
      throw err;
    }
  }

  async getRecommended(size = 'original') {
    try {
      const popList = await this.getPopular(size);

      let response = { results: [] };

      while (!response.results.length) {
        let randomIndex = Math.round(
          Math.random() * (popList.results.length - 1)
        );
        let randomMovieID = popList.results[randomIndex].id;

        response = await api
          .get(`movie/${randomMovieID}/recommendations?language=en-US`)
          .then(res => res.data);
      }

      response.results.map(e => {
        e.backdrop_path = this._formatImageURL(e.backdrop_path, size);
        e.poster_path = this._formatImageURL(e.poster_path, size);
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTopRated(size = 'original') {
    try {
      const topRatedList = await api
        .get('/movie/top_rated')
        .then(res => res.data);

      topRatedList.results.map(e => {
        e.backdrop_path = this._formatImageURL(e.backdrop_path, size);
        e.poster_path = this._formatImageURL(e.poster_path, size);
      });

      return topRatedList;
    } catch (error) {
      throw error;
    }
  }

  _formatImageURL(path, size = 'original') {
    return path ? this.imageURL + size + path : path;
  }
}

export default TmdbController;
