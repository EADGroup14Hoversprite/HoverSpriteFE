import { SlotCell } from "@/hooks/useDateMatrix";

export interface BookingScheduleProps {
  startDate: Date;
  hourChunk: number;
  startMorning: number;
  endMorning: number;
  startAfternoon: number;
  endAfternoon: number;
  numDays: number;
  rowGap: string;
  colGap: string;
  dateFormat: string;
  timeFormat: string;
  selectedSlot: SlotCell | undefined;
}
