import { createContext, Dispatch, SetStateAction } from "react";
import { BookingScheduleProps } from "@/models/BookingScheduleProps";
import { SlotCell } from "@/hooks/useDateMatrix";

export type CalendarContextProps = {
  setScheduleProps: Dispatch<SetStateAction<BookingScheduleProps>>;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setSelectedSlot: Dispatch<SetStateAction<SlotCell | undefined>>;
} & BookingScheduleProps;

const CalendarContext = createContext<CalendarContextProps>({
  endAfternoon: 0,
  endMorning: 0,
  hourChunk: 0,
  startAfternoon: 0,
  startMorning: 0,
  numDays: 7,
  startDate: new Date(),
  colGap: "4px",
  rowGap: "4px",
  dateFormat: "EEEE",
  timeFormat: "ha",
  selectedSlot: undefined,
  setStartDate: () => null,
  setScheduleProps: () => null,
  setSelectedSlot: () => null,
});

export default CalendarContext;
