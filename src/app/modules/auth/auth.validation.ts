import { z } from "zod";

const userRegisterSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name must be required",
      invalid_type_error: "Name must be a string",
    }),
    email: z.string({ required_error: "Email must be required" }).email(),
    phone: z.string({ required_error: "Phone must be required" }),
    password: z.string({ required_error: "Password must be required" }),
  }),
});
const loginSchema = z.object({
  body: z
    .object({
      email: z.string().email().optional(),
      phone: z.string().optional(),
      password: z.string({ required_error: "Password must be required" }),
    })
    .refine(
      ({ phone, email }) => {
        if (phone && email) return false;
        return phone || email;
      },
      { message: "Please provide one of email or phone" }
    ),
});

const renewAccessTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required!" }),
  }),
});

export const authValidation = {
  userRegisterSchema,
  loginSchema,
  renewAccessTokenSchema,
};
