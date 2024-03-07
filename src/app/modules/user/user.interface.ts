import { ObjectId } from "mongoose";
import { TRoles } from "../../interface/types";

export interface TUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: TRoles;
  isDeleted: boolean;
}
