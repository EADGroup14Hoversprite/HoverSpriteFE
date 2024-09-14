import { z } from "zod";

export const IFeedbackSchema = z.object({
  id: z.number(),
  content: z.string(),
  orderId: z.number(),
  satisfactionRating: z.string(),
});

export type IFeedback = z.infer<typeof IFeedbackSchema>;
