import { z } from "zod";
import { CropType } from "@/models/CropType";
import { SpraySlot } from "@/models/Booking";

export const orderSchema = z.object({
  farmerId: z.string(),
  cropType: z.nativeEnum(CropType),
  area: z
    .number()
    .min(0, "Area must be non-negative")
    .max(500000, "Area cannot exceed 500,000 hectares")
    .nonnegative()
    .finite(),
  date: z.date(),
  slot: z.nativeEnum(SpraySlot),
  session: z.number(),
});

export type OrderType = z.infer<typeof orderSchema>;

export const signInSchema = z.object({
  emailOrPhone: z.string(),
  password: z.string(),
});

export type SignIn = z.infer<typeof signInSchema>;

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/
);
const phoneValidation = new RegExp(/^(0|\+84)\s?\d{2,3}\s?\d{3}\s?\d{3,4}$/);
const nameValidation = new RegExp(/^(?!.*[A-Z]{2}).*$/);

export const SignUpSchema = z
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
    emailAddress: z
      .string()
      .email({ message: "invalid email" })
      .min(6, { message: "invalid email" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Please enter your phone number" })
      .regex(phoneValidation, {
        message:
          "Invalid phone number. Phone number must start with 0 or +84, followed by nine or ten digits",
      }),
    homeAddress: z.string().min(1, { message: "Please enter your address" }),
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

export type SignUp = z.infer<typeof SignUpSchema>;
