import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.SECRET_JWT;

export const signIn = payload =>
  jwt.sign(payload, secret, { expiresIn: 86400 });

export const verify = token => jwt.verify(token, secret);

export default { signIn, verify };
