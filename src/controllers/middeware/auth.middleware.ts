import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { TokenPayloadType } from '../../types';
import { userFindById } from '../../services/User';
dotenv.config();

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers['authorization']
      ?.toString()
      .replace('Bearer ', '');

    if (!token) {
      return res
        .status(401)
        .json({ error: true, payload: 'Auth Token not provided!' });
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET_TOKEN_KEY
    ) as TokenPayloadType;

    if (!decoded._id) {
      return res
        .status(401)
        .json({ error: true, payload: 'Auth Token invalid!' });
    }

    const user = await userFindById(decoded._id);
    if (!user) {
      return res
        .status(401)
        .json({ error: true, payload: 'Auth Token invalid!' });
    }

    next();
  } catch (e) {
    res.status(401).json({ error: true, payload: 'Invalid token!' });
  }
};

export default authMiddleware;
