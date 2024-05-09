import mongoose from 'mongoose';

const genericSchema = new mongoose.Schema({}, { strict: false });

export const CSVGenericModel = mongoose.model('CSVGenericModel', genericSchema);
