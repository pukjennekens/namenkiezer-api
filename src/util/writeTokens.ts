import jwt from 'jsonwebtoken';

import { User } from '../entity/User';

export const writeToken = async (user: User) => {
  const token = await jwt.sign(
    { id: user.id, roles: user.roles },
    process.env.JWT_SECRET_1!,
    {
      expiresIn: '15m',
    }
  );

  return token;
};

export const writeRefreshToken = async (user: User) => {
  jwt.sign(
    {
      id: user.id,
      tokenVersion: user.tokenVersion,
    },
    process.env.JWT_SECRET_2!,
    {
      expiresIn: '7d',
    }
  );
};
