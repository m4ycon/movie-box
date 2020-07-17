import { Router } from 'express';
import connection from './database/database';

const routes = Router();

routes.get('/', async (req, res) => {
  const data = await connection('movie').select('*');

  res.send(data);
});

export default routes;
