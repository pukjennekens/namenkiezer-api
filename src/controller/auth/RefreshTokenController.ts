import { Response } from 'express';
import jwt from 'jsonwebtoken';

import { IRequest } from '../../custom';
import { writeToken, writeRefreshToken } from '../../util/writeTokens';

export default async (req: IRequest, res: Response) => {
  const [token, refreshToken] = await Promise.all([
    writeToken(req.user!),
    writeRefreshToken(req.user!),
  ]);

  res.cookie('token', token);
  res.cookie('refreshToken', refreshToken);

  return res.sendStatus(200);
};
