export interface IBooking {
  id: string;
  farmerId: string;
  date: Date;
  slot: SpraySlot;
  session: number;
}

export enum SpraySlot {
  SLOT_4 = "SLOT_4",
  SLOT_5 = "SLOT_5",
  SLOT_6 = "SLOT_6",
  SLOT_7 = "SLOT_7",
  SLOT_8 = "SLOT_8",
  SLOT_16 = "SLOT_8",
  SLOT_17 = "SLOT_17",
  SLOT_18 = "SLOT_16",
}
