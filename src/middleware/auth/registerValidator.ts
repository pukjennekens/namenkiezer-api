import { Request, Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';

import { User } from '../validator/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  const user = new User();

  user.username = req.body.username;
  user.password = req.body.password;

  try {
    await validateOrReject(user);
    return next();
  } catch (errors) {
    return res.status(400).json(errors);
  }
};
