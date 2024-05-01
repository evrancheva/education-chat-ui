export function getCurrentTime(): string {
  const now = new Date();

  return now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTimeFromISOString(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);
  const options = { hour12: false, hour: "2-digit", minute: "2-digit" };
  const timeString = dateTime.toLocaleTimeString("en-US", options);
  return timeString;
}
