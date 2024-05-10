import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { TokenPayloadType } from '../../types';
dotenv.config();

export const generateToken = async (_id: string) => {
  try {
    const payload: TokenPayloadType = { _id };
    const accessToken = jwt.sign(payload, process.env.SECRET_TOKEN_KEY);
    return Promise.resolve({ accessToken });
  } catch (err) {
    return Promise.reject(err);
  }
};
