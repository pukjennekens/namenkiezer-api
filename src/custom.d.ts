import { Request } from 'express';

import { User } from './entity/User';

export interface IRequest extends Request {
  user?: User;
}
