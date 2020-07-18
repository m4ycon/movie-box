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
      await userController.create({
        name,
        email,
        password,
      });
      res.status(200).send({ message: "User created successfully."});
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: err.constraint });
    }
  });

export default routes;
