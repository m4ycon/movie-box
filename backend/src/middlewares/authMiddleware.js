import jwt from '../auth/jwt';

export default async (req, res, next) => {
  const { id } = req.params;

  const [, token] = req.headers.authorization.split(' ');
  const { user } = jwt.verify(token);

  if (Number(id) !== Number(user))
    return res.status(401).json({ error: 'Unauthorized access' });
    
  next();
};
