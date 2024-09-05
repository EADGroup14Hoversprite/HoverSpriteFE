import { Solar } from "lunar-typescript";

export function useLunarDate(date: Date) {
  const solar = Solar.fromYmd(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  const lunar = solar.getLunar();
  return new Date(lunar.getYear(), lunar.getMonth() - 1, lunar.getDay());
}
