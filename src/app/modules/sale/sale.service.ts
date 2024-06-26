import mongoose from "mongoose";
import httpStatus from "../../constants/httpStatus";
import AppError from "../../errors/AppError";
import ProductModel from "../product/product.model";
import SaleModel from "./sale.model";

const markAsSell = async (
  productId: string,
  payload: { quantity: number; buyerName: string; dateOfSale: string }
) => {
  const product = await ProductModel.findById(productId);
  // console.log({ product });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  if (payload?.quantity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Product quantity must be greater than 0"
    );
  }
  if (payload?.quantity > product.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Product quantity must be greater less than or equal current stock."
    );
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const productUpdateRes = await ProductModel.findByIdAndUpdate(
      productId,
      { quantity: product.quantity - payload.quantity },
      { runValidators: true, session: session }
    );

    const salesPayload = {
      buyerName: payload.buyerName,
      quantity: payload.quantity,
      dateOfSale: new Date(payload.dateOfSale),
      price: product.price,
      totalPrice: product.price * payload.quantity,
    };
    console.log("salesPayload", salesPayload);
    const saleRes = await SaleModel.create([salesPayload], {
      session: session,
    });
    console.log("saleRes", saleRes);
    await session.commitTransaction();
    await session.endSession();
    return saleRes;
  } catch (error) {
    console.log("markAs Sell error=>", error);
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const viewSalesHistory = async (category: string, year: string) => {
  const currentYear = Number(year) || new Date().getFullYear();
  console.log("currentYear", currentYear);
  const categoryArray = ["daily", "weekly", "monthly", "yearly"];
  let groupId: any = {
    $dateToString: { format: "%d-%m-%Y", date: "$dateOfSale" },
  };
  let matchFilter: any = { yearOfSale: { $eq: currentYear } };
  if (category === categoryArray[1]) {
    groupId = { $week: "$dateOfSale" };
  } else if (category === categoryArray[2]) {
    groupId = { $month: "$dateOfSale" };
  } else if (category === categoryArray[3]) {
    groupId = { $year: "$dateOfSale" };
    matchFilter = {};
  }
  console.log("groupId=>", groupId);
  const result = await SaleModel.aggregate([
    { $addFields: { yearOfSale: { $year: "$dateOfSale" } } },
    {
      $match: matchFilter,
    },
    {
      $group: {
        _id: groupId,
        salesCount: {
          $sum: "$quantity",
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  return result;
};

export const saleService = {
  markAsSell,
  viewSalesHistory,
};
