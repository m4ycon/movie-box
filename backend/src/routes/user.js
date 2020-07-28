import { Router } from 'express';

import UserController from '../controllers/UserController';
const userController = new UserController();

import jwt from '../auth/jwt';
import authMiddleware from '../middlewares/authMiddleware';

const routes = Router();

routes
  .route('/user')
  .get(async (req, res) => {
    try {
      const data = await userController.index();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error });
    }
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const { status, error, id } = await userController.create({
        name,
        email,
        password,
      });

      if (error) return res.status(status).json({ error });

      const token = jwt.signIn({ user: id });

      res.status(200).json({ user: id, token });
    } catch (error) {
      res.status(400).json({ error });
    }
  });

routes.get('/user/login', async (req, res) => {
  const [, hash] = req.headers.authorization.split(' ');

  const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

  try {
    const { status, error, user } = await userController.login(email, password);
    if (error) return res.status(status).send({ error });

    const token = jwt.signIn({ user });

    res.status(200).json({ user, token });
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

  const { status, error, users } = await userController.find(wheres);
  if (error) return res.status(status).json({ error });

  res.status(200).json({ users });
});

routes
  .route('/user/:id/watched')
  .all(authMiddleware)
  .get(async (req, res) => {
    const { id } = req.params;
    const { status, moviesWatched, error } = await userController.getWatched(
      id
    );

    if (error) return res.status(status).json({ error });

    res.status(200).json({ moviesWatched });
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { movie } = req.query;

    const { status, error } = await userController.setWatched(id, movie);
    if (error) return res.status(status).json({ error });

    res.status(200).send();
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const { movie } = req.query;

    const { status, error } = await userController.delWatched(id, movie);
    if (error) return res.status(status).json({ error });

    res.status(200).send();
  });

routes
  .route('/user/:id/watch-later')
  .all(authMiddleware)
  .get(async (req, res) => {
    const { id } = req.params;
    const { status, error, watchLater } = await userController.getWatchLater(
      id
    );

    if (error) return res.status(status).json({ error });

    res.status(200).json({ watchLater });
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { movie } = req.query;

    const { status, error } = await userController.setWatchLater(id, movie);
    if (error) return res.status(status).json({ error });

    res.status(200).send();
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    const { movie } = req.query;

    const { status, error } = await userController.delWatchLater(id, movie);
    if (error) return res.status(status).json({ error });

    res.status(200).send();
  });

export default routes;
