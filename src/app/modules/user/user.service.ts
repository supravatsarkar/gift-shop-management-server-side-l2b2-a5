import { TUser } from "./user.interface";
import UserModel from "./user.model";

const createUser = async (userData: TUser) => {
  const user = await UserModel.create(userData);
  return user;
};

export const userService = { createUser };
