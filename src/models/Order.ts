import { z } from "zod";

// export interface IOrder {
//   id: number;
//   farmerId: number;
//   cropType: string;
//   address: string;
//   location: Location;
//   farmlandArea: number;
//   desiredDate: number;
//   totalCost: number;
//   timeSlot: string;
//   status: string;
//   paymentStatus: boolean;
//   assignedSprayerIds: any[];
//   createdAt: number;
//   updatedAt: number;
// }

export const IOrderSchema = z.object({
  id: z.number(),
  farmerId: z.number(),
  cropType: z.string(),
  address: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  farmlandArea: z.number(),
  desiredDate: z.number(),
  totalCost: z.number(),
  timeSlot: z.string(),
  status: z.string(),
  paymentStatus: z.boolean(),
  assignedSprayerIds: z.array(z.number()),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type IOrder = z.infer<typeof IOrderSchema>;
