import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';

dotenv.config();

import routes from './routes';
import logger from './util/logger';

import { User as UserEntity } from './entity/User';
import { Group as GroupEntity } from './entity/Group';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

routes.forEach((route) => {
  (app as any)[route.method](
    route.path,
    [...route.middleware],
    route.controller
  );
});

(async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      url: process.env.CONNECTION_STRING,
      entities: [UserEntity, GroupEntity],
      synchronize: true,
    });

    logger.info(`ORM Connected: ${connection.isConnected}`);

    app.listen(process.env.PORT, () =>
      logger.info(`App running on port ${process.env.PORT}`)
    );
  } catch (error) {
    logger.error(error);
  }
})();
