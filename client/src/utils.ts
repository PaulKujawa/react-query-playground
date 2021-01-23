import { format, formatISO } from "date-fns";

export const formatDateForBe = (date: Date) =>
  formatISO(date, { representation: "date" });

export const formatDateForUi = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return format(dateObj, "dd.MM.yyyy");
};

export function buildQueryParams(queryParams: {
  [key: string]: string | number | boolean | undefined | null;
}): string {
  const query = Object.entries(queryParams)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return encodeURI(query);
}
