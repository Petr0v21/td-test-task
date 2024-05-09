import { CSVGenericModel } from '../../db/models/Generic.model';

export const insertMany = async (data: any[]) => {
  try {
    const result = await CSVGenericModel.insertMany(data);
    return !!result;
  } catch (err) {
    console.error('Error insertMany CSV data', err.message);
    return false;
  }
};

export const findAll = async () => {
  try {
    return await CSVGenericModel.find();
  } catch (err) {
    console.error('Error clearUp DB', err.message);
    return [];
  }
};

export const clearUp = async () => {
  try {
    const result = await CSVGenericModel.deleteMany();
    return !!result;
  } catch (err) {
    console.error('Error clearUp DB', err.message);
    return false;
  }
};
