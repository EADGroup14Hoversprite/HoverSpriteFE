import { z } from "zod";
import { CropType } from "@/types/crop-type";
import { SpraySlot, toSlotNum } from "@/models/Booking";
import { PaymentType } from "@/types/payment";
import { FeedbackType } from "@/types/feedback-type";

export const orderSchema = z
  .object({
    farmerId: z.string(),
    cropType: z.nativeEnum(CropType),
    farmlandArea: z
      .number()
      .min(1, "Area must be non-negative")
      .max(500000, "Area cannot exceed 500,000 hectares")
      .nonnegative()
      .finite(),
    desiredDate: z.date(),
    timeSlot: z.nativeEnum(SpraySlot),
    location: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    address: z.string(),
    paymentMethod: z.nativeEnum(PaymentType),
  })
  .refine(
    (data) => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      if (
        currentDate.getDate() === data.desiredDate.getDate() &&
        currentDate.getMonth() === data.desiredDate.getMonth() &&
        currentDate.getFullYear() === data.desiredDate.getFullYear()
      )
        return toSlotNum(data.timeSlot) > currentHour;

      if (data.desiredDate.getTime() > currentDate.getTime()) {
        return true;
      }
      return toSlotNum(data.timeSlot) > currentHour;
    },
    {
      message: "The selected date and time slot must be in the future",
      path: ["desireDate", "timeSlot"], // This will show the error on both fields
    },
  );

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
export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  operator: z.enum(["and", "or"]).optional(),
});

export const feedbackCreateSchema = z.object({
  content: z.string().min(1, "Content is required"),
  satisfactionRating: z.nativeEnum(FeedbackType),
  attentive: z.number().min(1).max(5),
  friendly: z.number().min(1).max(5),
  professional: z.number().min(1).max(5),
});

export type FeedbackCreateType = z.infer<typeof feedbackCreateSchema>;
