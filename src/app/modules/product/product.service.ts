import { SortOrder } from "mongoose";
import { pagination } from "../../constants";
import { TProduct } from "./product.interface";
import ProductModel from "./product.model";
import { _sortOrder } from "../../utils";
import AppError from "../../errors/AppError";
import httpStatus from "../../constants/httpStatus";

const createProduct = async (payload: TProduct) => {
  return await ProductModel.create(payload);
};
const createBulkProduct = async (payloads: TProduct[]) => {
  return await ProductModel.create(payloads);
};
const getProductById = async (id: string) => {
  return await ProductModel.findById(id);
};
// const getAllProductByFilter = async ({
//   page,
//   limit,
//   sortby,
//   order,
//   ...rest
// }: {
//   page: number;
//   limit: number;
//   sortby: string;
//   order: string;
//   rest: Record<string, unknown>;
// }) => {
//   // let {page, limit, ...rest}:{page:number, limit:number, rest:Partial<TProduct>} = query;
//   page <= 0 ? (page = 1) : page;
//   page = Number(page || pagination.page);
//   limit = Number(limit || pagination.limit);
//   sortby = sortby;

//   const skip = (page - 1) * limit;
//   const filter = { ...rest } as Partial<TProduct>;
//   // filter.deletedAt = { $eq: null };

//   const sortObject = _sortOrder(sortby, order);
//   console.log("sortObject=>", sortObject);
//   const count = await ProductModel.countDocuments(filter);
//   const countPage = Math.ceil(count / limit);
//   const products = await ProductModel.find(filter)
//     .skip(skip)
//     .limit(limit)
//     // .sort([[`${sortby}`, order]]);
//     .sort(sortObject);
//   return {
//     page,
//     limit,
//     count,
//     countPage,
//     products,
//   };
// };
const getAllProductByFilter = async ({
  isActive = false,
  page,
  limit,
  sortby,
  order,
  ...rest
}: {
  isActive: boolean;
  page: number;
  limit: number;
  sortby: string;
  order: string;
  rest: Record<string, unknown>;
}) => {
  page <= 0 ? (page = 1) : page;
  console.log("page=>", page);
  page = Number(page || pagination.page);
  limit = Number(limit || pagination.limit);

  const skip = (page - 1) * limit;
  let filter = { ...rest } as Partial<TProduct>;
  const newFilter: any = filter;
  for (const key in newFilter) {
    console.log("key", key);
    if (!(key == "price" || key == "quantity")) {
      newFilter[key] = { $regex: new RegExp(newFilter[key], "i") };
    } else {
      newFilter[key] = Number(newFilter[key]);
    }
  }
  if (isActive) {
    newFilter.deletedAt = { $eq: null };
  }
  filter = newFilter;
  console.log("skip=>", skip);
  console.log("filter=>", filter);
  const sortObject = _sortOrder(sortby as string, order as string);
  console.log("sortObject", sortObject);
  const count = await ProductModel.countDocuments({
    ...filter,
    // deletedAt: { $eq: null },
  });
  const countPage = Math.ceil(count / limit);
  const products = await ProductModel.find({
    ...filter,
    // deletedAt: { $eq: null },
  })
    .sort(sortObject)
    .skip(skip)
    .limit(limit);
  return {
    page,
    limit,
    count,
    countPage,
    products,
  };
};
const getInventory = async ({
  page,
  limit,
  sortby,
  order,
  search,
}: {
  page: number;
  limit: number;
  sortby: string;
  order: string;
  search: string;
}) => {
  page <= 0 ? (page = 1) : page;
  page = Number(page || pagination.page);
  console.log("page=>", page);
  limit = Number(limit || pagination.limit);

  const skip = (page - 1) * limit;

  const sortObject = _sortOrder(sortby as string, order as string);
  console.log("sortObject", sortObject);
  const orQuery = [
    {
      name: { $regex: new RegExp(search, "i") },
    },
    {
      category: { $regex: new RegExp(search, "i") },
    },
    {
      occasion: { $regex: new RegExp(search, "i") },
    },
    {
      theme: { $regex: new RegExp(search, "i") },
    },
    {
      brand: { $regex: new RegExp(search, "i") },
    },
    {
      recipient: { $regex: new RegExp(search, "i") },
    },
  ];
  const count = await ProductModel.countDocuments({
    quantity: { $gt: 0 },
    deletedAt: { $eq: null },
  }).or(orQuery);
  const countPage = Math.ceil(count / limit);
  const products = await ProductModel.find({
    quantity: { $gt: 0 },
    deletedAt: { $eq: null },
  })
    .or(orQuery)
    .skip(skip)
    .limit(limit)
    .sort(sortObject);
  return {
    page,
    limit,
    count,
    countPage,
    products,
  };
};
const deleteProductById = async (id: string) => {
  const product = await ProductModel.findById(id);
  // console.log({ product });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return await ProductModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { runValidators: true }
  );
};
const restoreProductById = async (id: string) => {
  const product = await ProductModel.findById(id);
  // console.log({ product });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return await ProductModel.findByIdAndUpdate(
    id,
    { deletedAt: null },
    { runValidators: true, returnDocument: "after" }
  );
};
const deleteBulkProductByIds = async (ids: string[]) => {
  // const products = await ProductModel.find({ _id: { $in: ids } });
  // console.log("products", products)
  return await ProductModel.updateMany(
    { _id: { $in: ids } },
    { deletedAt: new Date() },
    { runValidators: true }
  );
};
const updateProductById = async (id: string, payload: Partial<TProduct>) => {
  const product = await ProductModel.findById(id);
  // console.log({ product });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return await ProductModel.findByIdAndUpdate(
    id,
    { ...payload },
    { runValidators: true }
  );
};

export const productService = {
  createProduct,
  getProductById,
  deleteProductById,
  restoreProductById,
  deleteBulkProductByIds,
  updateProductById,
  getAllProductByFilter,
  // getAllActiveProductByFilter,
  createBulkProduct,
  getInventory,
};
