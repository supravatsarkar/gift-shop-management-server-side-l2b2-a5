import { z } from "zod";

const userProfileUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    isDeleted: z.boolean().optional(),
    isEnabled: z.boolean().optional(),
    isVerified: z.boolean().optional(),
  }),
});

export const UserValidation = { userProfileUpdateSchema };
