export interface IOrder {
  id: number;
  farmerId: number;
  cropType: string;
  sprayLocation: Location;
  farmlandArea: number;
  desiredDate: string;
  timeSlot: string;
  status: string;
  session: number;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
  assignedSprayerIds: number[];
}
