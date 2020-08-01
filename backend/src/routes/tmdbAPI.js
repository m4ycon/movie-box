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

routes.get('/movies/popular', async (req, res) => {
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

routes.get('/movies/search', async (req, res) => {
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

routes.get('/movies/recommended', async (req, res) => {
  const { size } = req.query;

  try {
    const recommended = await tmdbController.getRecommended(size);
    res.status(200).json(recommended);
  } catch (error) {
    res.status(400).json({ error });
  }
});

routes.get('/movies/top-rated', async (req, res) => {
  const { size } = req.query;

  try {
    const topRated = await tmdbController.getTopRated(size);
    res.status(200).json(topRated);
  } catch (error) {
    res.status(400).json(error);
  }
});

routes.get('/actor/:id', async (req, res) => {
  const { id } = req.params;
  const { size } = req.query;

  try {
    const actor = await tmdbController.getActor(id, size);
    res.send(actor);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default routes;
