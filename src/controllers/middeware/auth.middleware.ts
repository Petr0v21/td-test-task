import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.Authorization?.toString().replace('Barer ', '');
    console.log('token', token);

    if (!token) {
      return res
        .status(401)
        .json({ error: true, payload: 'Auth Token not provided!' });
    }
    // else if (typeof token === 'object') {
    //     return res.status(401).json({ error: true, payload: 'Invalid token!' });
    //   }
    if (!process.env.SECRET_TOKEN_KEY) {
      console.error('Error SECRET_TOKEN_KEY not exist!');
      process.exit(1);
    }
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    console.log(
      new Date().toISOString(),
      'Auth',
      req.originalUrl,
      req.method,
      decoded
    );
    next();
  } catch (e) {
    res.status(401).json({ error: true, payload: 'Invalid token!' });
  }
};

export default authMiddleware;
