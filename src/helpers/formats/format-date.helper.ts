import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(
  value?: Date | string | number,
  format: string = "DD/MM/YYYY"
): string {
  if (typeof value === "string" && value.includes("/")) {
    const [day, month, year] = value.split("/");
    value = `${year}-${month}-${day}`;
  }

  if (value === undefined || isNaN(new Date(value).getTime())) {
    return "";
  }

  try {
    return dayjs(value).tz("America/Sao_Paulo").utc(true).format(format);
  } catch (error) {
    console.error("Error formatting date", error);

    return "";
  }
}
