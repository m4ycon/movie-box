import { Router } from 'express';
import connection from './database/connection';

const routes = Router();

routes
  .route('/movie')
  .get(async (req, res) => {
    const data = await connection('movie').select('*');

    res.json(data);
  })
  .post(async (req, res) => {
    const { name } = req.body;

    await connection('movie').insert({ name });

    res.status(200).send();
  });

export default routes;
