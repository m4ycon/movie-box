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
        .get('/movie/popular?language=pt-BR')
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

  _formatImageURL(path, size) {
    return path ? this.imageURL + size + path : path;
  }
}

export default TmdbController;
