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
  /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{6,}$/,
);
const phoneValidation = new RegExp(
  /^((\+84\s\d{3}\s\d{3}\s\d{3})|(0\d{3}\s\d{3}\s\d{3})|((\+84|0)\d{9}))$/,
);
const nameValidation = new RegExp(
  /^(?=\b[A-Za-z]*[A-Z][a-z]*[A-Z]?[a-z]*\b)[A-Za-z ]+$/,
);
const emailValidation = new RegExp(
  /^[\w.-]+@(hoversprite\.(com|vn)|gmail\.com)$/,
);

export const SignUpSchema = z
  .object({
    googleId: z.string().nullable(),
    facebookId: z.string().nullable(),
    fullName: z
      .string()
      .min(2, { message: "Name is too short" })
      .regex(nameValidation, {
        message:
          "Full name cannot have more than 2 capitalized letters in a word and must contain only letters and spaces",
      }),
    emailAddress: z
      .string()
      .email({
        message:
          "Email must follow the format with a domain of @hoversprite.com, @hoversprite.vn, or @gmail.com.",
      })
      .min(10, { message: "Invalid email format" })
      .regex(emailValidation, {
        message:
          "Email must follow the format with a domain of @hoversprite.com, @hoversprite.vn, or @gmail.com.",
      }),
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
      .min(6, { message: "Password must have at least 6 characters" })
      .regex(passwordValidation, {
        message:
          "Password must be at least 6 characters long, contain at least 1 number, and 1 special character",
      }),
    location: z.object({
      longitude: z.number(),
      latitude: z.number(),
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUp = z.infer<typeof SignUpSchema>;

export const feedbackCreateSchema = z.object({
  content: z.string().min(1, "Content is required"),
  satisfactionRating: z.nativeEnum(FeedbackType),
  attentive: z.number().min(1).max(5),
  friendly: z.number().min(1).max(5),
  professional: z.number().min(1).max(5),
  images: z
    .array(z.any())
    .refine((images) => images.length <= 5, { message: "Maximum 5 images" }),
});

export type FeedbackCreateType = z.infer<typeof feedbackCreateSchema>;
