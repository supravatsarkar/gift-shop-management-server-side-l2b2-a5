import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Product name must be require" }),
    price: z.number({ required_error: "Product price must be require" }),
    quantity: z.number({ required_error: "Product quantity must be require" }),
    occasion: z.string({ required_error: "Product occasion must be require" }),
    recipient: z.string({
      required_error: "Product recipient must be require",
    }),
    category: z.string({ required_error: "Product category must be require" }),
    theme: z.string({ required_error: "Product theme must be require" }),
    brand: z.string({ required_error: "Product brand must be require" }),
  }),
});
const createBulkProductValidationSchema = z.object({
  body: z.array(
    z.object({
      name: z.string({ required_error: "Product name must be require" }),
      price: z.number({ required_error: "Product price must be require" }),
      quantity: z.number({
        required_error: "Product quantity must be require",
      }),
      occasion: z.string({
        required_error: "Product occasion must be require",
      }),
      recipient: z.string({
        required_error: "Product recipient must be require",
      }),
      category: z.string({
        required_error: "Product category must be require",
      }),
      theme: z.string({ required_error: "Product theme must be require" }),
      brand: z.string({ required_error: "Product brand must be require" }),
    })
  ),
});

// const deleteProductByIdValidationSchema = z.object({
//   body: z.object({
//     _id: z.string(),
//   }),
// });
const deleteBulkProductByIdValidationSchema = z.object({
  body: z.object({
    ids: z.array(z.string(), { required_error: "Array of id is required" }),
  }),
});

export const productValidation = {
  createProductValidationSchema,
  createBulkProductValidationSchema,
  deleteBulkProductByIdValidationSchema,
};
