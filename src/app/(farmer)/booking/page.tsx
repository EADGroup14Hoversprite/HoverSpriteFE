"use client";

import CalendarContext from "@/context/CalendarContext";
import { useState } from "react";
import { BookingScheduleProps } from "@/models/BookingScheduleProps";
import { useForm } from "react-hook-form";
import { orderSchema, OrderType } from "@/schema";
import { CropType } from "@/models/CropType";
import { SpraySlot } from "@/models/Booking";
import { zodResolver } from "@hookform/resolvers/zod";
import BookingComponent from "@/app/(farmer)/booking/_component/BookingComponent";
import { SlotCell } from "@/hooks/useDateMatrix";

export default function Page() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<SlotCell | undefined>(
    undefined,
  );
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
    selectedSlot: undefined,
  });

  const defaultValues: OrderType = {
    farmerId: "",
    area: 0,
    cropType: CropType.FRUIT,
    desireDate: new Date(),
    slot: SpraySlot.SLOT_4,
  };

  const bookingForm = useForm<OrderType>({
    defaultValues,
    resolver: zodResolver(orderSchema),
    mode: "onChange",
  });

  return (
    <CalendarContext.Provider
      value={{
        ...calendarProps,
        startDate: startDate,
        selectedSlot: selectedSlot,
        setSelectedSlot: setSelectedSlot,
        setScheduleProps: setCalendarProps,
        setStartDate: setStartDate,
      }}
    >
      <div className="m-auto max-w-7xl p-4 gap-4 h-full flex justify-center items-start flex-col w-full">
        {/*<BookingForm bookingForm={bookingForm} />*/}
        {/*<div className="w-full space-y-2">*/}
        {/*  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">*/}
        {/*    Spaying slot*/}
        {/*  </Label>*/}
        {/*  <p className="text-sm text-muted-foreground">*/}
        {/*    Select a time slot you want us to spray*/}
        {/*  </p>*/}
        {/*  <BookingCalendar*/}
        {/*    bookingForm={*/}
        {/*      <div>*/}
        {/*        <Form {...bookingForm}>*/}
        {/*          <form action="">*/}
        {/*            <FormField*/}
        {/*              name="date"*/}
        {/*              control={bookingForm.control}*/}
        {/*              render={({ field }) => <FormItem></FormItem>}*/}
        {/*            />*/}
        {/*          </form>*/}
        {/*        </Form>*/}
        {/*      </div>*/}
        {/*    }*/}
        {/*  ></BookingCalendar>*/}
        {/*</div>*/}

        <BookingComponent methods={bookingForm} />
      </div>
    </CalendarContext.Provider>
  );
}
