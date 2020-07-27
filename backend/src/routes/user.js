import { Router } from 'express';

import UserController from '../controllers/UserController';
const userController = new UserController();

import jwt from '../auth/jwt';

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
      const { error, id } = await userController.create({
        name,
        email,
        password,
      });

      if (error) return res.status(400).json({ error });

      const token = jwt.signIn({ user: id });

      res.status(200).json({ id, token });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error });
    }
  });

routes.get('/user/login', async (req, res) => {
  const [, hash] = req.headers.authorization.split(' ');

  const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

  try {
    const { error, user } = await userController.login(email, password);
    if (error) return res.status(401).send({ error });

    const token = jwt.signIn({ user });

    res.json({ user, token });
  } catch (error) {
    res.status(400).send(error);
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

routes
  .route('/user/:id/watched')
  .get(async (req, res) => {
    const { id } = req.params;
    const { moviesWatched, error } = await userController.getWatched(id);

    if (error) return res.status(404).json({ error });

    res.status(200).json({ moviesWatched });
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { movie } = req.query;

    const { error } = await userController.setWatched(id, movie);
    if (error) return res.status(404).json({ error });

    res.status(200).send();
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const { movie } = req.query;

    const { error } = await userController.delWatched(id, movie);
    if (error) return res.status(400).json({ error });

    res.status(200).send();
  });

routes
  .route('/user/:id/watch-later')
  .get(async (req, res) => {
    const { id } = req.params;
    const { watchLater, error } = await userController.getWatchLater(id);

    if (error) return res.status(404).json({ error });

    res.status(200).json({ watchLater });
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { movie } = req.query;

    const { error } = await userController.setWatchLater(id, movie);
    if (error) return res.status(404).json({ error });

    res.status(200).send();
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const { movie } = req.query;

    const { error } = await userController.delWatchLater(id, movie);
    if (error) return res.status(400).json({ error });

    res.status(200).send();
  });

export default routes;
