import { User } from '../../db/models/User.model';

export const userFindById = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (err) {
    console.error(err);
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
    console.error(err);
    return undefined;
  }
};
