import { SlotCell } from "@/hooks/useDateMatrix";
import { create } from "zustand";
import { startOfWeek } from "date-fns";

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
  selectedDate: Date;
}

type CalendarState = {
  initialState: BookingScheduleProps;
};

type CalendarStateAction = {
  setScheduleProps: (scheduleProps: BookingScheduleProps) => void;
  setSelectedSlot: (slot: SlotCell | undefined) => void;
  setStartDate: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
  setNumDays: (numDays: number) => void;
};

type CalendarStore = CalendarState & CalendarStateAction;

export const useCalendarStore = create<CalendarStore>(
  (set): CalendarStore => ({
    initialState: {
      endAfternoon: 18,
      endMorning: 8,
      hourChunk: 1,
      startAfternoon: 16,
      startMorning: 4,
      numDays: 7,
      startDate: startOfWeek(new Date()),
      selectedDate: new Date(),
      colGap: "4px",
      rowGap: "4px",
      dateFormat: "EEEE",
      timeFormat: "ha",
      selectedSlot: undefined,
    },
    setScheduleProps: (scheduleProps: BookingScheduleProps) =>
      set((state) => {
        return { ...state, initialState: scheduleProps };
      }),
    setSelectedSlot: (selectedSlot: SlotCell | undefined) =>
      set((state) => {
        return {
          initialState: { ...state.initialState, selectedSlot: selectedSlot },
        };
      }),
    setStartDate: (date: Date) =>
      set((state) => ({
        initialState: { ...state.initialState, startDate: date },
      })),
    setSelectedDate: (date: Date) =>
      set((state) => ({
        initialState: { ...state.initialState, selectedDate: date },
      })),
    setNumDays: (numDays: number) =>
      set((state) => {
        return {
          initialState: { ...state.initialState, numDays: numDays },
        };
      }),
  }),
);
