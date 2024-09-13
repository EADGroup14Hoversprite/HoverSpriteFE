import * as React from "react";
import { PropsWithChildren, useCallback, useContext } from "react";
import CalendarContext from "@/context/CalendarContext";
// import {Solar, Lunar, HolidayUtil} from 'lunar-typescript';
// Import only the methods we need from date-fns in order to keep build size small
import { SlotCell, useDateMatrix } from "@/hooks/useDateMatrix";
import { formatDate } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import LucideIcon from "../lucide-icon";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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

// interface BookingCalendarProps {
//   bookingForm: ReactNode;
// }

export function BookingCalendar() {
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
    endAfternoon,
    setStartDate,
    setSelectedSlot,
  } = useContext(CalendarContext);

  const matchesMin568 = useMediaQuery("max-width: 568px");

  const dateMatrix = useDateMatrix({
    numDays,
    startDate,
    hourChunk,
    startMorning,
    endMorning,
    startAfternoon,
    endAfternoon,
  });

  // const getTimeFromTouchEvent = (event: React.TouchEvent<any>): Date | null => {
  //   const { touches } = event;
  //   if (!touches || touches.length === 0) return null;
  //   const { clientX, clientY } = touches[0];
  //   const targetElement = document.elementFromPoint(clientX, clientY);
  //   if (targetElement) {
  //     const cellTime = cellToDate.current.get(targetElement);
  //     return cellTime ?? null;
  //   }
  //   return null;
  // };
  //
  // const updateAvailabilityDraft = (
  //   selectionEnd: Date | null,
  //   callback?: () => void,
  // ) => {
  //   if (selectionType === null || selectionStart === null) return;
  //
  //   let newSelection: Array<Date> = [];
  //   if (selectionStart && selectionEnd && selectionType) {
  //     newSelection = selectionSchemeHandlers[selectionScheme](
  //       selectionStart,
  //       selectionEnd,
  //       dates,
  //     );
  //   }
  //
  //   let nextDraft = [...selection];
  //   if (selectionType === "add") {
  //     nextDraft = Array.from(new Set([...nextDraft, ...newSelection]));
  //   } else if (selectionType === "remove") {
  //     nextDraft = nextDraft.filter(
  //       (a) => !newSelection.find((b) => isSameMinute(a, b)),
  //     );
  //   }
  //
  //   setSelectionDraft(nextDraft);
  //   if (callback) callback();
  // };
  //
  // const handleSelectionStartEvent = (startTime: Date) => {
  //   const timeSelected = selection.find((a) => isSameMinute(a, startTime));
  //   setSelectionType(timeSelected ? "remove" : "add");
  //   setSelectionStart(startTime);
  // };
  //
  // const handleMouseEnterEvent = (time: Date) => {
  //   updateAvailabilityDraft(time);
  // };
  //
  // const handleMouseUpEvent = (time: Date) => {
  //   updateAvailabilityDraft(time);
  // };
  //
  // const handleTouchMoveEvent = (event: React.TouchEvent) => {
  //   setIsTouchDragging(true);
  //   const cellTime = getTimeFromTouchEvent(event);
  //   if (cellTime) {
  //     updateAvailabilityDraft(cellTime);
  //   }
  // };
  //
  // const handleTouchEndEvent = () => {
  //   if (!isTouchDragging) {
  //     updateAvailabilityDraft(null, () => {
  //       setSelectionType(null);
  //       setSelectionStart(null);
  //     });
  //   } else {
  //     setSelectionType(null);
  //     setSelectionStart(null);
  //   }
  //   setIsTouchDragging(false);
  // };

  // const renderDateCellWrapper = (time: Date): JSX.Element => {
  //   // const startHandler = () => handleSelectionStartEvent(time);
  //   // const selected = Boolean(selectionDraft.find((a) => isSameMinute(a, time)));
  //
  //   return (
  //     <GridCell
  //       className="rgdp__grid-cell"
  //       role="presentation"
  //       key={time.toISOString()}
  //       onMouseDown={startHandler}
  //       onMouseEnter={() => handleMouseEnterEvent(time)}
  //       onMouseUp={() => handleMouseUpEvent(time)}
  //       onTouchStart={startHandler}
  //       onTouchMove={handleTouchMoveEvent}
  //       onTouchEnd={handleTouchEndEvent}
  //     >
  //       {renderDateCell ? (
  //         renderDateCell(time, selected, (element: HTMLElement) =>
  //           cellToDate.current.set(element, time),
  //         )
  //       ) : (
  //         <DateCell
  //           selected={selected}
  //           selectedColor={selectedColor}
  //           unselectedColor={unselectedColor}
  //           hoveredColor={hoveredColor}
  //           ref={(el) => {
  //             if (el) cellToDate.current.set(el, time);
  //           }}
  //         />
  //       )}
  //     </GridCell>
  //   );
  // };
  const renderTimeLabel = (time: Date) => {
    return <div>{formatDate(time, timeFormat)}</div>;
  };

  const renderDateLabel = (date: Date, lunarDate: Date) => {
    if (matchesMin568) {
      return (
        <div className="flex flex-col justify-center items-start uppercase font-semibold p-2">
          {formatDate(date, dateFormat)}
          <p className="text-lg font-bold">{date.getDate()}</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col justify-center items-start uppercase font-semibold border border-solid border-primary p-2">
        {formatDate(date, "EEE")}
        <p className="text-lg font-bold flex items-center justify-between w-full">
          {date.getDate()}
          <span className="font-normal text-sm">{lunarDate.getDate()}</span>
        </p>
      </div>
    );
  };

  const renderFullDateGrid = useCallback(() => {
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
        <ContextMenu>
          <ContextMenuTrigger className="">
            {/*<BookingDialog date={date.solar} slot={1} form={bookingForm}>*/}
            <div
              className="w-full h-full flex relative bg-green-300"
              role="button"
              onClick={() => {
                setSelectedSlot(slot);
              }}
            >
              <p className="absolute bottom-0 left-0 my-1 mx-2">1/2</p>
              {selectedSlot?.solar === slot.solar && (
                <LucideIcon
                  name="Heart"
                  size={24}
                  fill="#d1001f"
                  stroke="#d1001f"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
            {/*</BookingDialog>*/}
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuItem
              inset
              className="flex items-center justify-between w-full pl-4 py-2 pr-2"
            >
              Add to cart
              <LucideIcon
                name="ShoppingCart"
                size={16}
                className="font-semibold"
              />
            </ContextMenuItem>
            <ContextMenuItem
              inset
              className="flex items-center justify-between w-full pl-4 py-2 pr-2"
            >
              Book
              <LucideIcon name="Heart" size={16} className="font-semibold" />
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
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
        React.cloneElement(
          renderDateLabel(dayOfTimes[0].solar, dayOfTimes[0].lunar),
          {
            key: `date-${index}`,
          },
        ),
      ),
      // Every row after that
      ...dateGridElements.map((element, index) =>
        React.cloneElement(element, { key: `time-${index}` }),
      ),
    ];
  }, [dateMatrix, selectedSlot]);

  return (
    <div className="w-full">
      <div className=" flex flex-col xl:flex-row gap-8 items-start w-full select-none">
        <div className="flex flex-col gap-2">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={(date) => {
              if (date) {
                setStartDate(date);
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
            </div>
          )}
        </div>

        <CalendarBody colGap={"4px"} numCol={numDays} numRow={7} rowGap={"4px"}>
          {renderFullDateGrid()}
        </CalendarBody>
      </div>
    </div>
  );
}
