import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { LogType } from '../utils/LogType';

dotenv.config();

const dbConnect = () => {
  mongoose.connect(process.env.DB_ACCESS_URL, {});

  mongoose.connection.on('connected', () => {
    console.log(`[${LogType.Mongoose}]: Connected to database sucessfully`);
  });

  mongoose.connection.on('error', (err) => {
    console.error(
      `[${LogType.Mongoose}]: Error while connecting to database :` + err
    );
    process.exit(1);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn(`[${LogType.Mongoose}]: Mongodb connection disconnected`);
  });
};

export default dbConnect;
