import { format, formatISO } from "date-fns";

export const formatDateForBe = (date: Date) =>
  formatISO(date, { representation: "date" });

export const formatDateForUi = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return format(dateObj, "dd.MM.yyyy");
};
