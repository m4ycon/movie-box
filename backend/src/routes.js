import { Router } from 'express';

import UserController from './controllers/UserController';
const userController = new UserController();

const routes = Router();

routes
  .route('/user')
  .get(async (req, res) => {
    try {
      const data = await userController.index();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ err });
    }
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const { error, message } = await userController.create({
        name,
        email,
        password,
      });

      if (error) return res.status(400).json({ error });

      res.status(200).json({ message });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error });
    }
  });

routes.get('/user/find', async (req, res) => {
  const query = req.query;

  const allowed = ['id', 'name', 'email'];

  const wheres = Object.keys(query)
    .filter(key => allowed.includes(key))
    .reduce((acc, key) => {
      acc[key] = query[key];
      return acc;
    }, {});

  const users = await userController.find(wheres);

  res.status(200).json(users);
});

routes.get('/user/:id/watched', async (req, res) => {
  const { id } = req.params;
  const { watched, error } = await userController.getWatched(id);

  if (error) return res.status(404).json({ error });

  res.status(200).json({ watched });
});

routes.get('/user/:id/watch-later', async (req, res) => {
  const { id } = req.params;
  const { watchLater, error } = await userController.getWatchLater(id);

  if (error) return res.status(404).json({ error });

  res.status(200).json({ watchLater });
});

export default routes;
