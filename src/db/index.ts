import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const dbConnect = () => {
  mongoose.connect(process.env.DB_ACCESS_URL, {});

  mongoose.connection.on('connected', () => {
    console.log('Connected to database sucessfully');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error while connecting to database :' + err);
    process.exit(1);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongodb connection disconnected');
  });
};

export default dbConnect;
