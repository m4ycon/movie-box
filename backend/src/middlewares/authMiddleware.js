import jwt from '../auth/jwt';

import UserController from '../controllers/UserController';
const userController = new UserController();

export default async (req, res, next) => {
  const { id } = req.params;

  try {
    const [, token] = req.headers.authorization.split(' ');
    const { user } = jwt.verify(token);

    const { users } = await userController.find({ id });

    if (Number(id) !== Number(user) || users.length === 0)
      return res.status(401).json({ error: 'Unauthorized access' });
  } catch (error) {
    return res.status(400).json({ error });
  }

  req.auth = id;
  next();
};
