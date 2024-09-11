import * as React from "react";
import { PropsWithChildren, useCallback, useEffect } from "react";

import { SlotCell, useDateMatrix } from "@/hooks/useDateMatrix";
import { addMonths, formatDate, startOfWeek, subMonths } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import LucideIcon from "../lucide-icon";
import { UseFormReturn } from "react-hook-form";
import { OrderType } from "@/schema";
import { DateInput } from "@/app/(farmer)/booking/_component/FormField";
import { useCalendarStore } from "@/store/calendar-store";
import { SpraySlot, toSlot, toSlotNum } from "@/models/Booking";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Form, FormField } from "@/components/ui/form";

function compareDateSlot(first: SlotCell, second: SlotCell) {
  return (
    first?.solar.getDate() === second.solar.getDate() &&
    first?.solar.getMonth() === second.solar.getMonth() &&
    first?.solar.getFullYear() === second.solar.getFullYear() &&
    first?.solar.getHours() === second.solar.getHours()
  );
}

const CalendarDateCell = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        placeSelf: "stretch",
        touchAction: "none",
      }}
      className={`border border-solid cursor-pointer`}
    >
      {children}
    </div>
  );
};

const CalendarBody = ({
  numCol,
  colGap,
  numRow,
  rowGap,
  children,
}: PropsWithChildren<{
  numCol: number;
  numRow: number;
  rowGap: string;
  colGap: string;
}>) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `auto repeat(${numCol}, 1fr)`,
        gridTemplateRows: `auto repeat(${numRow}, 1fr)`,
        columnGap: `${colGap}`,
        rowGap: `${rowGap}`,
        width: "100%",
      }}
      className="justify-center items-center"
    >
      {children}
    </div>
  );
};

interface BookingCalendarProps {
  bookingForm: UseFormReturn<OrderType>;
}

export function BookingCalendar({ bookingForm }: BookingCalendarProps) {
  const {
    numDays,
    rowGap,
    colGap,
    startDate,
    hourChunk,
    startMorning,
    endMorning,
    startAfternoon,
    timeFormat,
    dateFormat,
    selectedSlot,
    selectedDate,
    endAfternoon,
  } = useCalendarStore.getState().initialState;

  const { setStartDate, setSelectedSlot, setSelectedDate } = useCalendarStore();

  // const matchesMin568 = useMediaQuery("max-width: 568px");

  const dateMatrix = useDateMatrix({
    numDays,
    startDate,
    hourChunk,
    startMorning,
    endMorning,
    startAfternoon,
    endAfternoon,
  });

  const renderTimeLabel = (time: Date) => {
    return <div>{formatDate(time, timeFormat)}</div>;
  };

  const renderDateLabel = (slotCell: SlotCell) => {
    // if (matchesMin568) {
    //   return (
    //     <div className="flex flex-col justify-center items-start uppercase font-semibold p-2">
    //       {formatDate(date, dateFormat)}
    //       <p className="text-lg font-bold">{date.getDate()}</p>
    //     </div>
    //   );
    // }
    return (
      <div
        className={`flex flex-col justify-center items-start uppercase font-semibold border border-solid border-primary p-2 `}
      >
        {formatDate(slotCell.solar, "EEE")}
        <p className="text-lg font-bold flex items-center justify-between w-full">
          {slotCell.solar.getDate()}
          <span className="font-normal text-sm">
            {slotCell.lunar.getDate()}
          </span>
        </p>
      </div>
    );
  };

  const renderFullDateGrid = useCallback(
    (onSlotUpdate: (slot: SpraySlot) => void) => {
      const flattenedDates: SlotCell[] = [];
      const numDays = dateMatrix.length;
      const numTimes = dateMatrix[0].length;
      for (let j = 0; j < numTimes; j += 1) {
        for (let i = 0; i < numDays; i += 1) {
          flattenedDates.push(dateMatrix[i][j]);
        }
      }
      const dateGridElements = flattenedDates.map((slot) => (
        <CalendarDateCell>
          <div
            className={`w-full h-full flex relative ${slot?.solar.getHours() > 15 ? "bg-slate-300" : "bg-secondary"} ${slot.isAvailable ? "" : "!bg-black/50"}`}
            role="button"
            onClick={() => {
              if (slot.isAvailable) {
                bookingForm.setValue("desiredDate", slot.solar);
                onSlotUpdate(toSlot(slot.solar.getHours()));
                setSelectedSlot(slot);
              }
            }}
          >
            <p className={`absolute bottom-0 left-0 my-1 mx-2`}>1/2</p>
            {selectedSlot && compareDateSlot(selectedSlot, slot) && (
              <LucideIcon
                name="Heart"
                size={24}
                fill="#d1001f"
                stroke="#d1001f"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </CalendarDateCell>
      ));
      for (let i = 0; i < numTimes; i += 1) {
        const index = i * numDays;
        const time = dateMatrix[0][i];
        // Inject the time label at the start of every row
        dateGridElements.splice(index + i, 0, renderTimeLabel(time.solar));
      }
      return [
        // Empty top left corner
        <div key="topleft" />,
        // Top row of dates
        ...dateMatrix.map((dayOfTimes, index) =>
          React.cloneElement(renderDateLabel(dayOfTimes[0]), {
            key: `date-${index}`,
          }),
        ),
        // Every row after that
        ...dateGridElements.map((element, index) =>
          React.cloneElement(element, { key: `time-${index}` }),
        ),
      ];
    },
    [dateMatrix, selectedSlot],
  );

  useEffect(() => {
    const desireDates = bookingForm.getValues("desiredDate");
    const slot = bookingForm.getValues("timeSlot");
    if (selectedSlot) {
      if (desireDates.getHours() > toSlotNum(slot)) {
        bookingForm.setValue(
          "timeSlot",
          toSlot(selectedSlot?.solar.getHours()),
        );
      }
    }
  });

  return (
    <div className="w-full">
      <div className=" flex flex-col xl:flex-row gap-8 items-start w-full select-none">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-md font-semibold">Enter your desire date:</p>
            <DateInput
              onChange={(date) => {
                if (date) {
                  setSelectedDate(date);
                  setStartDate(startOfWeek(selectedDate));
                }
              }}
              value={selectedDate}
            />
          </div>

          <Calendar
            mode="single"
            selected={selectedDate}
            // defaultMonth={startOfMonth(selectedDate)}
            fromDate={new Date()}
            components={{
              IconLeft: ({ ...props }) => (
                <ChevronLeft
                  onClick={() => {
                    setSelectedDate(subMonths(selectedDate, 1));
                    setStartDate(startOfWeek(selectedDate));
                  }}
                  className="h-4 w-4"
                />
              ),
              IconRight: ({ ...props }) => (
                <ChevronRight
                  onClick={() => {
                    setSelectedDate(addMonths(selectedDate, 1));
                    setStartDate(startOfWeek(selectedDate));
                  }}
                  className="h-4 w-4"
                />
              ),
            }}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setStartDate(startOfWeek(date));
              }
            }}
            className="self-start rounded-md border shadow hidden xl:block"
          />
          {selectedSlot && (
            <div className="border border-solid border-border rounded-md p-2 shadow">
              <p className="text-md font-semibold">
                Selected slot's information
              </p>
              <p>
                <span className="font-semibold">Gregorian Date: </span>
                {selectedSlot.solar.toDateString()}
              </p>
              <p>
                <span className="font-semibold">Lunar Date: </span>
                {selectedSlot.lunar.toDateString()}
              </p>
              <p>
                <span className="font-semibold">Time: </span>
                {selectedSlot.solar.getHours()}
              </p>
              <Button
                className="mt-2"
                onClick={() => {
                  setSelectedDate(selectedSlot.solar);
                  setStartDate(startOfWeek(selectedSlot.solar));
                }}
              >
                Focus selected slot
              </Button>
            </div>
          )}
        </div>
        <Form {...bookingForm}>
          <form className="w-full">
            <FormField
              render={({ field }) => (
                <CalendarBody
                  colGap={"4px"}
                  numCol={numDays}
                  numRow={7}
                  rowGap={"4px"}
                >
                  {renderFullDateGrid(field.onChange)}
                </CalendarBody>
              )}
              name="timeSlot"
              control={bookingForm.control}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
