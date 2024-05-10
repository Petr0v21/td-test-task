import { User } from '../../db/models/User.model';
import { LogType } from '../../utils/LogType';

export const userFindById = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (err) {
    console.error(`[${LogType.Server}]: Error userFindById - ` + err.message);
    return undefined;
  }
};

export const checkUser = async (login: string, password: string) => {
  try {
    return await User.findOne({
      login,
      password
    });
  } catch (err) {
    console.error(`[${LogType.Server}]: Error checkUser - ` + err.message);
    return undefined;
  }
};
