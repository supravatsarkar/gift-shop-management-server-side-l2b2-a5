import { z } from "zod";

const markAsSell = z.object({
  body: z.object({
    quantity: z.number({ required_error: "Quantity is required" }),
    buyerName: z.string({ required_error: "BuyerName is required" }),
    dateOfSale: z.string(),
  }),
});

export const saleValidation = {
  markAsSell,
};
