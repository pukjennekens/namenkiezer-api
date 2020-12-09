import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { IRequest } from '../../custom';

export default (roles?: string[]) => async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.token) {
    try {
      const decoded = await jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET_1!
      );

      const hasRoles = () => {
        for (let i: number = 0; i < roles!.length; i++) {
          if (!_.includes(JSON.parse((<any>decoded).roles), roles![i]))
            return false;
        }
        return true;
      };

      if (!_.isEmpty(roles)) {
        if (!hasRoles()) return res.sendStatus(401);
      }

      return next();
    } catch (error) {
      return res.sendStatus(401);
    }
  } else {
    return res.sendStatus(401);
  }
};
