import * as dotenv from 'dotenv';

dotenv.config();

import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT!,
  username: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_USER_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['./entities/*.js'],
  logging: true,
  synchronize: true,
});
