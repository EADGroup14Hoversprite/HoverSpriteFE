import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

const phoneValidation = new RegExp(/^(0|\+84)\s?\d{2,3}\s?\d{3}\s?\d{3,4}$/);

const nameValidation = new RegExp(/^(?!.*[A-Z]{2}).*$/);

export const signupSchema = z
  .object({
    lastName: z
      .string()
      .min(2, { message: "Invalid name" })
      .regex(nameValidation, { message: "Invalid name" }),
    middleName: z.string().regex(nameValidation, { message: "Invalid name" }),
    firstName: z
      .string()
      .min(2, { message: "Invalid name" })
      .regex(nameValidation, { message: "Invalid name" }),
    email: z
      .string()
      .email({ message: "invalid email" })
      .min(6, { message: "invalid email" }),
    phone: z
      .string()
      .min(1, { message: "Please enter your phone number" })
      .regex(phoneValidation, {
        message:
          "Invalid phone number. Phone number must start with 0 or +84, followed by nine or ten digits",
      }),
    address: z.string().min(1, { message: "Please enter your address" }),
    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters" })
      .regex(passwordValidation, {
        message:
          "Your password must contain at least one lowercase, one uppercase and one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type Signup = z.infer<typeof signupSchema>;
