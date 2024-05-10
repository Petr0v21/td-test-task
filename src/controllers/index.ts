import dotenv from 'dotenv';
import { Router, Request, Response } from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import authMiddleware from '../middewares/auth.middleware';
import { checkUser } from '../services/User';
import { generateToken } from '../services/Token';
import { clearUp, findAll, insertMany } from '../services/CSV';

dotenv.config();

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/login', async (req: Request, res: Response) => {
  try {
    const { login, password } = req.query as Record<string, string>;

    if (!login || !password) {
      return res.status(400).json({
        message: 'query params "login" && "password" required!'
      });
    }

    const user = await checkUser(login, password);

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials!'
      });
    }
    const { accessToken } = await generateToken(user._id.toString());

    return res.status(200).json({
      success: true,
      accessToken
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post(
  '/csv',
  authMiddleware,
  upload.single('csvFile'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }
      const result = await clearUp();
      if (!result) {
        throw new Error('Error on clean up DB');
      }
      const csvData: Record<string, string>[] = [];
      fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (row) => {
          csvData.push(row);
        })
        .on('end', async () => {
          const result = await insertMany(csvData);
          if (result) {
            return res.status(200).json({
              success: true,
              message: 'CSV data uploaded and saved to MongoDB'
            });
          }
          throw new Error('Something went wrong!');
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
);

router.get('/data', authMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await findAll();
    return res.status(200).json({
      success: true,
      payload: result.map((item) => {
        const { _id, __v, ...args } = item['_doc'];
        return args;
      })
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

export default router;
