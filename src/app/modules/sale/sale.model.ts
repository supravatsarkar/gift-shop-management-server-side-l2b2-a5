import { Schema, model } from "mongoose";
import { TSale } from "./sale.interface";

const saleSchema = new Schema<TSale>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    dateOfSale: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SaleModel = model<TSale>("sale", saleSchema);

export default SaleModel;
