export function getCurrentTime(): string {
  const now = new Date();

  return now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTimeFromDatetime(datetimeStr: string) {
  // Parse the datetime string
  const dt = new Date(datetimeStr);
  // Extract hours and minutes
  const hours = dt.getHours().toString().padStart(2, "0");
  const minutes = dt.getMinutes().toString().padStart(2, "0");
  // Concatenate hours and minutes
  const time = hours + ":" + minutes;
  return time;
}
