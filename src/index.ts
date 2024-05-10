import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiController from './controllers';
import dbConnect from './db';
import { LogType } from './utils/LogType';

dotenv.config();

dbConnect();

const app: Express = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'Too many requests from this IP, please try again later.'
    });
  }
});

app.use(express.json());
app.use(limiter);
app.use('/api', apiController);

app.listen(port, () => {
  console.log(
    `[${LogType.Server}]: Server is running at http://localhost:${port}`
  );
});
