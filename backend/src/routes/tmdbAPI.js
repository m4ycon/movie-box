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
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

export default routes;
