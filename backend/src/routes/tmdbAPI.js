import { Router } from 'express';

import TmdbController from '../controllers/TmdbController';
const tmdbController = new TmdbController();

const routes = Router();

routes.get('/movie/:id/image_list', async (req, res) => {
  const { id } = req.params;
  const { size } = req.query;

  try {
    const imageList = await tmdbController.getImageList(id, size);

    res.status(200).json(imageList);
  } catch (error) {
    const apiError = error.response.data.status_message;
    if (apiError) return res.status(400).json({ error: apiError });

    res.status(400).json({ error });
  }
});

routes.get('/movie/popular', async (req, res) => {
  const { size } = req.query;

  try {
    const popular = await tmdbController.getPopular(size);

    res.status(200).json(popular);
  } catch (error) {
    const apiError = error.response.data.status_message;
    if (apiError) return res.status(400).json({ error: apiError });

    res.status(400).json({ error });
  }
});

routes.get('/movie/search', async (req, res) => {
  const { movie, page, size } = req.query;

  try {
    const movies = await tmdbController.searchMovies(movie, page, size);

    res.status(200).json(movies);
  } catch (error) {
    const apiError = error.response.data.status_message;
    if (apiError) return res.status(400).json({ error: apiError });

    res.status(400).json({ error });
  }
});

routes.get('/movie/:id', async (req, res) => {
  const { id } = req.params;
  const { size } = req.query;

  try {
    const movie = await tmdbController.getMovie(id, size);

    res.status(200).json(movie);
  } catch (error) {
    const apiError = error.response.data.status_message;
    if (apiError) return res.status(400).json({ error: apiError });

    res.status(400).json({ error });
  }
});

export default routes;
