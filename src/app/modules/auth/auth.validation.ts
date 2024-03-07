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

export { userRegisterSchema };
