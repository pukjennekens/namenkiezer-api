import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';

dotenv.config();

import routes from './routes';
import logger from './util/logger';

import { User as UserEntity } from './entity/User';

const app = express();

app.use(bodyParser.json());

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
      entities: [UserEntity],
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
