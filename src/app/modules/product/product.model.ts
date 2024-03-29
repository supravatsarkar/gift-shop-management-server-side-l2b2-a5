import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    occasion: { type: String, required: true },
    recipient: { type: String, required: true },
    category: { type: String, required: true },
    theme: { type: String, required: true },
    brand: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = model<TProduct>("product", productSchema);

export default ProductModel;
