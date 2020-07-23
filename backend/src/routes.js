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
      res.status(400).send({ error: err.constraint });
    }
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const { error } = await userController.create({
        name,
        email,
        password,
      });

      if (error) return res.status(400).json({ error });

      res.status(200).send({ message: 'User created successfully.' });
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

export default routes;
