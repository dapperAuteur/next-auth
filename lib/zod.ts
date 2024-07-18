import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Emails Is Required"})
    .min(1, "Email Is Required")
    .email("Email Is Invalid"),
  password: string({ required_error: "Password Is Required"})
    .min(1, "Password Is Required")
    .min(6, "Password Must Be At Least 6 Characters")
    .max(32, "Password must be less than 32 characters"),
})