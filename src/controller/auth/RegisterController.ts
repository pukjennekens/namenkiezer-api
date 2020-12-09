import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User as UserEntity } from '../../entity/User';

export default async (req: Request, res: Response) => {
  const userRepository = getRepository(UserEntity);

  const { username, password } = req.body;

  const user = userRepository.create({
    username,
    password,
  });

  await userRepository.save(user);

  res.json({
    ...user,
    password: null,
  });
};
