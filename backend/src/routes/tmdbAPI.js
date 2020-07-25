import { Router } from 'express';
import api from '../services/tmdb';

const routes = Router();

routes.get('/tmdb', async (req, res) => {
  try {
    const response = await api.get('movie/550').then(res => res.data);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

export default routes;
