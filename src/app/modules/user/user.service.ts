import { isValidObjectId } from "mongoose";
import { pagination } from "../../constants";
import httpStatus from "../../constants/httpStatus";
import AppError from "../../errors/AppError";
import ProductModel from "../product/product.model";
import SaleModel from "../sale/sale.model";
import { TUser } from "./user.interface";
import UserModel from "./user.model";

const findUserByFilter = async (filter: Partial<TUser>) => {
  filter.isDeleted = false;
  //   if(filter.id){
  //     filter.id = new
  //   }
  return await UserModel.findOne(filter).select("-password");
};
const findUsersByFilter = async ({
  filter,
  page,
  limit,
}: {
  filter: Partial<TUser>;
  page: number;
  limit: number;
}) => {
  page <= 0 ? (page = 1) : page;
  page = Number(page || pagination.page);
  console.log("page=>", page);
  limit = Number(limit || pagination.limit);

  const skip = (page - 1) * limit;
  // filter.isDeleted = false;
  //   if(filter.id){
  //     filter.id = new
  //   }

  const count = await UserModel.countDocuments(filter);
  const countPage = Math.ceil(count / limit);
  const users = await UserModel.find(filter)
    .skip(skip)
    .limit(limit)
    .select("-password");
  return { users, page, limit, count, countPage };
};
const getDashboardSummary = async () => {
  const totalListedProducts = await ProductModel.countDocuments();
  const totalActiveProducts = await ProductModel.countDocuments({
    deletedAt: null,
  });
  const totalDeletedProducts = totalListedProducts - totalActiveProducts;
  const totalAvailableProduct = await ProductModel.countDocuments({
    quantity: { $gt: 0 },
    deletedAt: null,
  });

  const totalOutOfStockProducts = totalActiveProducts - totalAvailableProduct;
  const [{ salesCount: totalSalesCount }] = await SaleModel.aggregate([
    {
      $group: { _id: "", salesCount: { $sum: "$quantity" } },
    },
  ]);

  const [{ salesAmount: totalSalesAmount }] = await SaleModel.aggregate([
    {
      $group: { _id: "", salesAmount: { $sum: "$totalPrice" } },
    },
  ]);
  console.log({ totalSalesAmount });

  return {
    totalListedProducts,
    totalActiveProducts,
    totalDeletedProducts,
    totalAvailableProduct,
    totalOutOfStockProducts,
    totalSalesCount,
    totalSalesAmount,
  };
};

const updateUserProfile = async (id: string, payload: Partial<TUser>) => {
  try {
    if (!isValidObjectId(id)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid user id!");
    }
    const userExist = await UserModel.findById(id);
    if (!userExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User does not exist!");
    }
    if (userExist.role === "admin") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Not allow to update admin data!"
      );
    }
    console.log("payload=>", payload);
    return await UserModel.findByIdAndUpdate(id, payload, {
      runValidators: true,
      returnDocument: "after",
    }).select("-password");
  } catch (error) {
    throw error;
  }
};
export const userService = {
  findUserByFilter,
  findUsersByFilter,
  getDashboardSummary,
  updateUserProfile,
};
