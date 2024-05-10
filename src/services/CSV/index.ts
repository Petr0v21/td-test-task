import { CSVGeneratedModel } from '../../db/models/Generated.model';
import { LogType } from '../../utils/LogType';

export const insertMany = async (data: Record<string, string>[]) => {
  try {
    const result = await CSVGeneratedModel.insertMany(data);
    return !!result;
  } catch (err) {
    console.error(
      `[${LogType.Server}]: Error insertMany CSV data - ` + err.message
    );
    return false;
  }
};

export const findAll = async () => {
  try {
    return await CSVGeneratedModel.find();
  } catch (err) {
    console.error(`[${LogType.Server}]: Error clearUp DB - ` + err.message);
    return [];
  }
};

export const clearUp = async () => {
  try {
    const result = await CSVGeneratedModel.deleteMany();
    return !!result;
  } catch (err) {
    console.error(`[${LogType.Server}]:  Error clearUp DB - ` + err.message);
    return false;
  }
};
