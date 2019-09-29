import { config as envConfig } from 'dotenv';
envConfig();

import express from 'express';
import { rootRouter } from './routes/api';

const app = express();
const port = process.env.API_PORT || 9000; 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', rootRouter);

app.use(function (req, res, next) {
  res.status(404).json({message: "Path not exist."});
})

app.listen(port, () => console.log(`App start on port ${port}!`));