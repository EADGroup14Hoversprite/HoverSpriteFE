import { createContext, Dispatch, SetStateAction } from "react";
import { BookingScheduleProps } from "@/models/BookingScheduleProps";

export type CalendarContextProps = {
  setScheduleProps: Dispatch<SetStateAction<BookingScheduleProps>>;
  setStartDate: Dispatch<SetStateAction<Date>>;
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
  setStartDate: () => null,
  setScheduleProps: () => null,
});

export default CalendarContext;
