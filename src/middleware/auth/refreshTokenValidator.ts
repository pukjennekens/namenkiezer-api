import { Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import { IRequest } from '../../custom';
import { User as UserEntity } from '../../entity/User';

export default async (req: IRequest, res: Response, next: NextFunction) => {
  const userRepository = getRepository(UserEntity);

  if (!req.cookies.refreshToken) {
    return res.sendStatus(401);
  }

  try {
    const decoded = await jwt.verify(
      req.cookies.refreshToken,
      process.env.JWT_SECRET_2!
    );

    const foundUser = await userRepository.findOne(1);

    if (!foundUser) {
      return res.sendStatus(401);
    }

    req.user = foundUser;

    if (foundUser!.tokenVersion !== (<any>decoded).tokenVersion) {
      return res.sendStatus(401);
    }

    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
