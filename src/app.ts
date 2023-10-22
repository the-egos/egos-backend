import 'reflect-metadata';
import * as express from 'express';
import { myDataSource } from './appDataSource';

myDataSource
  .initialize()
  .then(() => {
    console.log('DataSource is initialized!!!');
  })
  .catch((err:any) => {
    console.error('DataSource Error', err);
  });

const app = express();
app.use(express.json());

app.listen(8080);
