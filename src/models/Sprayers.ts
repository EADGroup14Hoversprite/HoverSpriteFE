import { z } from "zod";

export const ISprayerSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  phoneNumber: z.string(),
  emailAddress: z.string(),
  expertise: z.string(),
});

export type ISprayer = z.infer<typeof ISprayerSchema>;
