import 'reflect-metadata';
import express from 'express';
import { myDataSource } from './app-data-source.js';

myDataSource
  .initialize()
  .then(() => {
    console.log('DataSource is initialized!!!');
  })
  .catch(err => {
    console.error('DataSource Error', err);
  });

const app = express();
app.use(express.json());

app.listen(8080);
