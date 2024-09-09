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
