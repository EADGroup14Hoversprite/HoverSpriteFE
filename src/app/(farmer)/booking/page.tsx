"use client";

import CalendarContext from "@/context/CalendarContext";
import { useState } from "react";
import { BookingScheduleProps } from "@/models/BookingScheduleProps";
import { BookingCalendar } from "@/components/booking-calendar";

export default function Page() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [calendarProps, setCalendarProps] = useState<BookingScheduleProps>({
    endAfternoon: 19,
    endMorning: 9,
    hourChunk: 1,
    startAfternoon: 16,
    startMorning: 4,
    numDays: 7,
    startDate: new Date(),
    colGap: "4px",
    rowGap: "4px",
    dateFormat: "EEEE",
    timeFormat: "ha",
  });
  return (
    <CalendarContext.Provider
      value={{
        ...calendarProps,
        startDate: startDate,
        setScheduleProps: setCalendarProps,
        setStartDate: setStartDate,
      }}
    >
      <BookingCalendar></BookingCalendar>
    </CalendarContext.Provider>
  );
}
