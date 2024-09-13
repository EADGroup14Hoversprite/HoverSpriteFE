import { addDays, addHours, addMinutes, startOfDay } from "date-fns";
import { useMemo } from "react";
import { Solar } from "lunar-typescript";

interface DateMatrixProps {
  numDays: number;
  startDate: Date;
  hourChunk: number;
  startMorning: number;
  endMorning: number;
  startAfternoon: number;
  endAfternoon: number;
}

export interface SlotCell {
  lunar: Date;
  solar: Date;
  isAvailable: boolean;
}

const getSolarLunar = (
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

export const useDateMatrix = ({
  numDays,
  startDate,
  hourChunk,
  startMorning,
  endMorning,
  startAfternoon,
  endAfternoon,
}: DateMatrixProps) => {
  return useMemo(() => {
    const startTime = startOfDay(startDate);
    const dates: Array<Array<SlotCell>> = [];
    const minutesInChunk = Math.floor(60 / hourChunk);
    for (let d = 0; d < numDays; d += 1) {
      const currentDay: SlotCell[] = [];
      for (let h = startMorning; h < endMorning; h += 1) {
        for (let c = 0; c < hourChunk; c += 1) {
          currentDay.push({
            ...getSolarLunar(startTime, h, c, d, minutesInChunk),
            isAvailable: true,
          });
        }
      }
      for (let h = startAfternoon; h < endAfternoon; h += 1) {
        for (let c = 0; c < hourChunk; c += 1) {
          currentDay.push({
            ...getSolarLunar(startTime, h, c, d, minutesInChunk),
            isAvailable: true,
          });
        }
      }
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
  ]);
};
