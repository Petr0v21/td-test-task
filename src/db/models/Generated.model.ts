import mongoose from 'mongoose';

const generatedSchema = new mongoose.Schema({}, { strict: false });

export const CSVGeneratedModel = mongoose.model(
  'CSVGeneratedModel',
  generatedSchema
);
