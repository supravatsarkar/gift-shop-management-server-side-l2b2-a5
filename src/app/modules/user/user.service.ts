import { TUser } from "./user.interface";
import UserModel from "./user.model";

const findUserByFilter = async (filter: Partial<TUser>) => {
  filter.isDeleted = false;
  //   if(filter.id){
  //     filter.id = new
  //   }
  return await UserModel.findOne(filter);
};

export const userService = {
  findUserByFilter,
};
