import { CropType } from "@/types/crop-type";

export interface IBooking {
  id: string;
  farmerId: string;
  desiredDate: string;
  slot: SpraySlot;
  cropType: CropType;
  farmlandArea: 0;
  timeSlot: SpraySlot;
}

export enum SpraySlot {
  SLOT_4 = "SLOT_4",
  SLOT_5 = "SLOT_5",
  SLOT_6 = "SLOT_6",
  SLOT_7 = "SLOT_7",
  SLOT_8 = "SLOT_8",
  SLOT_16 = "SLOT_16",
  SLOT_17 = "SLOT_17",
  SLOT_18 = "SLOT_18",
}
const dictSprayToString: Record<SpraySlot, string> = {
  SLOT_4: "4 AM - 5 AM",
  SLOT_5: "5 AM - 6 AM",
  SLOT_6: "6 AM - 7 AM",
  SLOT_7: "7 AM - 8 AM",
  SLOT_8: "8 AM - 9 AM",
  SLOT_16: "4 PM - 5 PM",
  SLOT_17: "5 PM - 6 PM",
  SLOT_18: "6 PM - 7 PM",
};

export const slots = [
  SpraySlot.SLOT_4,
  SpraySlot.SLOT_5,
  SpraySlot.SLOT_6,
  SpraySlot.SLOT_7,
  SpraySlot.SLOT_16,
  SpraySlot.SLOT_17,
];

const dictDateToSpay: Record<number, SpraySlot> = {
  4: SpraySlot.SLOT_4,
  5: SpraySlot.SLOT_5,
  6: SpraySlot.SLOT_6,
  7: SpraySlot.SLOT_7,
  8: SpraySlot.SLOT_8,
  16: SpraySlot.SLOT_16,
  17: SpraySlot.SLOT_17,
  18: SpraySlot.SLOT_18,
};

const dictSprayToNum: Record<SpraySlot, number> = {
  SLOT_4: 4,
  SLOT_5: 5,
  SLOT_6: 6,
  SLOT_7: 7,
  SLOT_8: 8,
  SLOT_16: 16,
  SLOT_17: 17,
  SLOT_18: 18,
};

export function toSlotString(spraySlot: SpraySlot): string {
  return dictSprayToString[spraySlot];
}

export function toSlotNum(slot: SpraySlot): number {
  return dictSprayToNum[slot];
}

export function toSlot(hour: number) {
  return dictDateToSpay[hour];
}
