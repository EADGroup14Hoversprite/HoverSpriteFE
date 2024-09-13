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
