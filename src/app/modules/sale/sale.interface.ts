import { ObjectId } from "mongoose";
import { TRoles } from "../../interface/types";

export interface TSale {
  quantity: number;
  buyerName: string;
  dateOfSale: Date;
  price: number;
  totalPrice: number;
}
