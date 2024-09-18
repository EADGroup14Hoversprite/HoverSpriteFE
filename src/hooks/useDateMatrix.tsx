import { addDays, addHours, addMinutes, isBefore, startOfDay } from "date-fns";
import { useMemo } from "react";
import { Solar } from "lunar-typescript";
import { IOrder } from "@/models/Order";
import { SpraySlot, toSlotNum } from "@/models/Booking";

interface DateMatrixProps {
  numDays: number;
  startDate: Date;
  hourChunk: number;
  startMorning: number;
  endMorning: number;
  startAfternoon: number;
  endAfternoon: number;
  ordersRange: IOrder[];
}

export interface SlotCell {
  lunar: Date;
  solar: Date;
  isAvailable: boolean;
}

export const getLunarDate = (solar: Date) => {
  const solarFrom = Solar.fromYmd(
    solar.getFullYear(),
    solar.getMonth() + 1,
    solar.getDate(),
  );
  const lunar = solarFrom.getLunar();
  return new Date(lunar.getYear(), lunar.getMonth() - 1, lunar.getDay());
};

export const getSolarLunar = (
  startDate: Date,
  hourIdx: number,
  chunkIdx: number,
  dayIdx: number,
  chunk: number,
) => {
  const solarDate = addMinutes(
    addHours(addDays(startDate, dayIdx), hourIdx),
    chunkIdx * chunk,
  );
  const solar = Solar.fromYmd(
    solarDate.getFullYear(),
    solarDate.getMonth() + 1,
    solarDate.getDate(),
  );
  const lunar = solar.getLunar();
  const lunarDate = new Date(
    lunar.getYear(),
    lunar.getMonth() - 1,
    lunar.getDay(),
  );
  return {
    solar: solarDate,
    lunar: lunarDate,
  };
};

const createSlotCells = (
  start: number,
  end: number,
  startTime: Date,
  hourChunk: number,
  d: number,
  minutesInChunk: number,
  slots: Map<number, number>,
) => {
  let currentDay: SlotCell[] = [];
  for (let h = start; h < end; h += 1) {
    for (let c = 0; c < hourChunk; c += 1) {
      const solarLunar = getSolarLunar(startTime, h, c, d, minutesInChunk);
      if (isBefore(solarLunar.solar, new Date())) {
        currentDay.push({
          ...solarLunar,
          isAvailable: false,
        });
      } else {
        const date = addHours(addDays(startTime, d), h).getTime();

        if (slots.get(date) === 2) {
          currentDay.push({
            ...solarLunar,
            isAvailable: false,
          });
        } else {
          currentDay.push({
            ...solarLunar,
            isAvailable: true,
          });
        }
      }
    }
  }
  return currentDay;
};

export function transformBookings(bookings: IOrder[]) {
  let slotsMap: Map<number, number> = new Map();
  bookings.forEach((booking) => {
    const date = addHours(
      new Date(booking.desiredDate * 1000),
      toSlotNum(booking.timeSlot as SpraySlot) - 7,
    );
    if (slotsMap.has(date.getTime())) {
      slotsMap.set(date.getTime(), slotsMap.get(date.getTime())! + 1);
    } else {
      slotsMap.set(date.getTime(), 1);
    }
  });
  return slotsMap;
}
export const useDateMatrix = ({
  numDays,
  startDate,
  hourChunk,
  startMorning,
  endMorning,
  startAfternoon,
  endAfternoon,
  ordersRange,
}: DateMatrixProps) => {
  const occupiedSlots = transformBookings(ordersRange);
  return useMemo(() => {
    const startTime = startOfDay(startDate);
    const dates: Array<Array<SlotCell>> = [];
    const minutesInChunk = Math.floor(60 / hourChunk);
    for (let d = 0; d < numDays; d += 1) {
      const currentDay: SlotCell[] = [];
      currentDay.push(
        ...createSlotCells(
          startMorning,
          endMorning,
          startTime,
          hourChunk,
          d,
          minutesInChunk,
          occupiedSlots,
        ),
      );
      currentDay.push(
        ...createSlotCells(
          startAfternoon,
          endAfternoon,
          startTime,
          hourChunk,
          d,
          minutesInChunk,
          occupiedSlots,
        ),
      );
      dates.push(currentDay);
    }
    return dates;
  }, [
    startDate,
    numDays,
    startAfternoon,
    endAfternoon,
    hourChunk,
    startMorning,
    endMorning,
    ordersRange,
  ]);
};
