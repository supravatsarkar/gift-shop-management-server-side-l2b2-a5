import { ObjectId } from "mongoose";

export interface TUser {
  id: ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
}
