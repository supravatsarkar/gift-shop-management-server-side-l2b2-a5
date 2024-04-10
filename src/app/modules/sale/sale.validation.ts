import { z } from "zod";

const markAsSell = z.object({
  body: z.object({
    quantity: z.number({ required_error: "Quantity is required" }),
    buyerName: z.string({ required_error: "BuyerName is required" }),
    dateOfSale: z.string(),
  }),
});
const viewSalesHistory = z.object({
  query: z.object({
    category: z.enum(["daily", "weekly", "monthly", "yearly"]),
    year: z.string().optional(),
  }),
});

export const saleValidation = {
  markAsSell,
  viewSalesHistory,
};
