import express, { Express, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiController from './controllers';

dotenv.config();

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

app.get('/', (req: Request, res: Response) => {
  res.send('TD TEST TASK');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
