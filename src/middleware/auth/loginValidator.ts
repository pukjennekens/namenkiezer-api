import { Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';
import { getRepository } from 'typeorm';
import { compareSync } from 'bcryptjs';

import { IRequest } from '../../custom';
import { LoginUser } from '../validator/LoginUser';
import { User as UserEntity } from '../../entity/User';

export default async (req: IRequest, res: Response, next: NextFunction) => {
  const userRepository = getRepository(UserEntity);
  const user = new LoginUser();

  user.username = req.body.username;
  user.password = req.body.password;

  try {
    await validateOrReject(user);

    const foundUser = await userRepository.findOne({
      username: req.body.username,
    });
    req.user = foundUser;

    if (!foundUser) return res.sendStatus(401);

    const passwordIsValid = await compareSync(
      req.body.password,
      foundUser.password
    );

    if (!passwordIsValid) return res.sendStatus(401);

    return next();
  } catch (errors) {
    return res.status(400).json(errors);
  }
};
