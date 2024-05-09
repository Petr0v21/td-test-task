import dotenv from 'dotenv';
import { Router, Request, Response } from 'express';
import authMiddleware from './middeware/auth.middleware';

dotenv.config();

const router = Router();

router.get('/login', authMiddleware, (req: Request, res: Response) => {
  return res.status(200).json({
    success: true
  });
});

export default router;
