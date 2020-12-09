import { Request, Response } from 'express';

export default (_req: Request, res: Response) => {
  return res.send('Hallo');
};
