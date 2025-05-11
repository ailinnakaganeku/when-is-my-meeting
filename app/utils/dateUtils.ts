export function manualZonedTimeToUtc(date: Date, timeZone: string): Date {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const year = parseInt(parts.find((p) => p.type === "year")?.value || "0", 10);
  const month =
    parseInt(parts.find((p) => p.type === "month")?.value || "1", 10) - 1;
  const day = parseInt(parts.find((p) => p.type === "day")?.value || "1", 10);
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
  const minute = parseInt(
    parts.find((p) => p.type === "minute")?.value || "0",
    10
  );
  const second = parseInt(
    parts.find((p) => p.type === "second")?.value || "0",
    10
  );

  const localDate = new Date(year, month, day, hour, minute, second);

  const offset = localDate.getTime() - date.getTime();
  const utcDate = new Date(date.getTime() - offset);

  return utcDate;
}
