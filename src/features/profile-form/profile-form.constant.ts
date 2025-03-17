import { z } from "zod";

export const patterns = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  zipcode: /^[0-9\-]+$/,
};

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  username: z.string().min(2, "Username is required"),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((text) => patterns.email.test(text), {
      message: "Invalid email format",
    }),
  phone: z.string().min(10, "Phone number is required"),
  address: z.object({
    street: z.string().min(2, "Street is required"),
    suite: z.string().min(2, "Suite is required"),
    city: z.string().min(2, "City is required"),
    zipcode: z
      .string()
      .min(2, "Zipcode is required")
      .refine((zipcode) => patterns.zipcode.test(zipcode), {
        message: "Invalid zipcode format.",
      }),
  }),
  company: z.object({
    name: z.string().min(2, "Company name is required"),
    catchPhrase: z.string().min(2, "Catch Phrase is required"),
    bs: z.string().min(2, "BS is required"),
  }),
});
