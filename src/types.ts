export type UserBody = {
  login: string;
  password: string;
  username: string;
};

export type UserType = UserBody & {
  _id: string;
};

export type TokenPayloadType = Pick<UserType, '_id'>;
