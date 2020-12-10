import { Response } from 'express';
import jwt from 'jsonwebtoken';

import { IRequest } from '../../custom';

export default async (req: IRequest, res: Response) => {
  const [token, refreshToken] = await Promise.all([
    jwt.sign(
      { id: req.user!.id, roles: req.user!.roles },
      process.env.JWT_SECRET_1!,
      {
        expiresIn: '15m',
      }
    ),
    jwt.sign(
      {
        id: req.user!.id,
        tokenVersion: req.user!.tokenVersion,
      },
      process.env.JWT_SECRET_2!,
      {
        expiresIn: '7d',
      }
    ),
  ]);

  res.cookie('token', token);
  res.cookie('refreshToken', refreshToken);

  return res.sendStatus(200);
};
