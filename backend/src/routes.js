import { Router } from 'express';

import UsersController from './controllers/UsersController';
const usersController = new UsersController();

const routes = Router();

routes
  .route('/user')
  .get(async (req, res) => {
    try {
      const data = await usersController.index();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;

    try {
      await usersController.create({
        name,
        email,
        password,
      });
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  });

export default routes;
