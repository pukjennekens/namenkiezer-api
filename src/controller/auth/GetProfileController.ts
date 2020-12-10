import { Response } from 'express';

import { IRequest } from '../../custom';

export default async (req: IRequest, res: Response) => {
  res.send(req.user);
};
