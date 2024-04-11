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
const findUsersByFilter = async (filter: Partial<TUser>) => {
  filter.isDeleted = false;
  //   if(filter.id){
  //     filter.id = new
  //   }
  return await UserModel.find(filter).select("-password");
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

export const userService = {
  findUserByFilter,
  findUsersByFilter,
  getDashboardSummary,
};
