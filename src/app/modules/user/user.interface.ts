import { ObjectId } from "mongoose";
import { TRoles } from "../../interface/types";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: TRoles;
  lastLogin: Date;
  isVerified: boolean;
  isEnabled: boolean;
  isDeleted: boolean;
}
