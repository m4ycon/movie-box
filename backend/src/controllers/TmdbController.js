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
        e.file_path = this.imageURL + size + e.file_path;
      });

      response.posters.map(e => {
        e.file_path = this.imageURL + size + e.file_path;
      });

      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default TmdbController;
